using HtmlAgilityPack;

namespace NonogramsVisualizerAPI.Data {
    [Serializable]
    public class NonogramData {
        public bool hasColor;
        public int columns, rows, colors;
        public int columnLayers, rowLayers;
        public List<string> colorCodes;
        public List<int> rowData, columnData;


        public NonogramData(HtmlDocument doc) {
            string colorTableXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr";
            

            string rowsLayerCountXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[2]/td[1]/table/tbody/tr[1]/td";
            string colsLayerCountXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[1]/td[2]/table/tbody/tr";

            string rowDataXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[1]/td[2]/table/tbody/tr";
            string columnDataXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[2]/tbody/tr[2]/td[1]/table/tbody/tr";

            HtmlNode colorTable = doc.DocumentNode.SelectSingleNode(colorTableXPath);

            hasColor = colorTable != null;

            colors = 0;
            colorCodes = new List<string>();

            if (hasColor) {
                rowsLayerCountXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[3]/tbody/tr[2]/td[1]/table/tbody/tr[1]/td";
                colsLayerCountXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[3]/tbody/tr[1]/td[2]/table/tbody/tr";

                rowDataXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[3]/tbody/tr[2]/td[1]/table/tbody/tr";
                columnDataXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[3]/tbody/tr[1]/td[2]/table/tbody/tr";

                colors = colorTable!.ChildNodes.Count;

                foreach (var color in colorTable.ChildNodes) {
                    colorCodes.Add(color.GetAttributeValue("style", "").Substring("background:#".Length, 6));
                }
            }

            string dimensionsXPath = "/html/body/table/tbody/tr[1]/td[2]/div[2]/table[1]/tbody/tr/td[1]";

            string dimText = doc.DocumentNode.SelectSingleNode(dimensionsXPath).InnerText;
            string dimensions = dimText.Substring("Size: ".Length);

            columns = int.Parse(dimensions.Split('x')[0]);
            rows = int.Parse(dimensions.Split('x')[1]);

            rowLayers = doc.DocumentNode.SelectNodes(rowsLayerCountXPath).Count;
            columnLayers = doc.DocumentNode.SelectNodes(colsLayerCountXPath).Count;

            rowData = new List<int>();
            columnData = new List<int>();


            foreach (var row in doc.DocumentNode.SelectNodes(rowDataXPath)) {
                foreach (var tile in row.ChildNodes) {
                    if (tile.ChildNodes.Count > 0) {
                        if (tile.ChildNodes[0].InnerText.Equals("&nbsp;")) {
                            rowData.Add(-1);
                        } else {
                            rowData.Add(int.Parse(tile.ChildNodes[0].InnerText));
                        }
                    } else {
                        Console.WriteLine("Iterated over tile without child element");
                    }
                }
            }

            foreach (var col in doc.DocumentNode.SelectNodes(columnDataXPath)) {
                foreach (var tile in col.ChildNodes) {
                    if (tile.ChildNodes.Count > 0) {
                        if (tile.ChildNodes[0].InnerText.Equals("&nbsp;")) {
                            columnData.Add(-1);
                        } else {
                            columnData.Add(int.Parse(tile.ChildNodes[0].InnerText));
                        }
                    } else {
                        Console.WriteLine("Iterated over tile without child element");
                    }
                }
            }
        }
    }
}
