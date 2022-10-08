using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using HtmlAgilityPack;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using NonogramsVisualizerAPI.Data;

namespace NonogramsVisualizerAPI.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class NonogramsController : Controller {
        HttpClient client = new HttpClient();


        public IActionResult Index() {
            return View();
        }

        IReadOnlyList<IWebElement> FindElements(IWebDriver driver, string xpath) {
            return driver.FindElements(By.XPath(xpath));
        }

        IWebElement FindElement(IWebDriver driver, string xpath) {
            return driver.FindElement(By.XPath(xpath));
        }

        [HttpPost]
        [Route("{nonogramCode}")]
        public async Task<IActionResult> GetDataFromId(string nonogramCode) {
            try {
                IWebDriver driver = await NonogramsDriver.AwaitDriverControl();

                bool hasColor = nonogramCode.Contains("-c");
                string code = nonogramCode.Split('-')[0];
                string url = $"https://www.nonograms.org/nonograms{(hasColor ? "2" : "")}/i/{code}";
                string data = await client.GetStringAsync($"https://www.nonograms.org/nonograms{(hasColor ? "2" : "")}/i/{code}");

                driver.Navigate().GoToUrl(url);

                IWebElement nonogramTable = new WebDriverWait(driver, TimeSpan.FromSeconds(10)).Until(
                    elem => elem.FindElement(By.Id("nonogram_table"))
                );

                // Now that we've navigated to the site and the nonogram is populated, we can scrape the html values without holding onto the webdriver
                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(driver.PageSource);
                NonogramData nonogram = new NonogramData(doc);

                NonogramsDriver.ReturnControl();

                return Json(nonogram);

                return new EmptyResult();
            } catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500);
            }
        }
    }
}
