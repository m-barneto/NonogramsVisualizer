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

                IWebElement xDataElem = driver.FindElement(By.XPath("/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[1]/td[2]/table/tbody/tr"));
                IWebElement yDataElem = driver.FindElement(By.XPath("/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[2]/td[1]/table/tbody"));

                foreach (var xItem in xDataElem.FindElements(By.ClassName(""))) {

                }


                Console.WriteLine(nonogramTable);

                NonogramsDriver.ReturnControl();

                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(data);

                string nonogramData = doc.DocumentNode.SelectSingleNode("//div[@class='" + "content" + "']").ChildNodes[17].InnerText;
                string jsonData = nonogramData.Substring(nonogramData.IndexOf("var d=") + 6, nonogramData.Length - 9);

                List <List<int?>?>? nonogram = JsonConvert.DeserializeObject<List<List<int?>?>?>(jsonData);
                
                return Json(nonogram);

                Console.WriteLine(nonogramCode);


                return new EmptyResult();
            }
            catch (Exception e) {
                Console.WriteLine(e);
                return StatusCode(500);
            }
        }
    }
}
