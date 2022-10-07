using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using HtmlAgilityPack;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

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
                
                string rowsLayerCountXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[2]/td[1]/table/tbody/tr[1]/td";
                string colsLayerCountXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[1]/td[2]/table/tbody/tr";

                string dimensionsXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[1]/tbody/tr/td[1]";

                string dimText = FindElement(driver, dimensionsXPath).Text;
                string dimensions = dimText.Substring("Size: ".Length);

                int colCount = int.Parse(dimensions.Split('x')[0]);
                int rowCount = int.Parse(dimensions.Split('x')[1]);

                int rowsLayerCount = FindElements(driver, rowsLayerCountXPath).Count;
                int colsLayerCount = FindElements(driver, colsLayerCountXPath).Count;

                Console.WriteLine($"Rows: {rowCount}\nRow Layers: {rowsLayerCount}\nCols: {colCount}\nCol Layers: {colsLayerCount}");

                // Now that we've navigated to the site and the nonogram is populated, we can scrape the html values without holding onto the webdriver

                NonogramsDriver.ReturnControl();

                // scrap the table

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(data);

                string nonogramData = doc.DocumentNode.SelectSingleNode("//div[@class='" + "content" + "']").ChildNodes[17].InnerText;
                string jsonData = nonogramData.Substring(nonogramData.IndexOf("var d=") + 6, nonogramData.Length - 9);

                List<List<int?>?>? nonogram = JsonConvert.DeserializeObject<List<List<int?>?>?>(jsonData);

                return Json(nonogram);

                return new EmptyResult();
            } catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500);
            }
        }
    }
}
