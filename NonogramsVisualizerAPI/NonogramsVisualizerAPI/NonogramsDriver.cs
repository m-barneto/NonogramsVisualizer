using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace NonogramsVisualizerAPI {
    public class NonogramsDriver {
        private static NonogramsDriver instance = null!;
        public static NonogramsDriver getInstance() {
            if (instance == null) {
                instance = new NonogramsDriver();
            }
            return instance;
        }
        private IWebDriver driver;
        private static bool isAvailable;

        private NonogramsDriver() {
            ChromeOptions options = new ChromeOptions();
            //options.AddArgument("--headless");
            options.AddArgument("--log-level=3");
            options.BinaryLocation = "C:\\Apps\\Chrome\\chrome.exe";
            

            driver = new ChromeDriver(ChromeDriverService.CreateDefaultService(), options, TimeSpan.FromSeconds(180));
            isAvailable = true;
        }

        public static async Task<IWebDriver> AwaitDriverControl() {
            await Task.Run(async () => {
                while (!isAvailable) await Task.Delay(25);
            });
            isAvailable = false;
            return getInstance().driver;
        }

        public static void ReturnControl() {
            isAvailable = true;
        }

    }
}
