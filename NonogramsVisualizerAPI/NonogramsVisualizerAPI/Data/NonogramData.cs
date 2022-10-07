using HtmlAgilityPack;

namespace NonogramsVisualizerAPI.Data {
    [Serializable]
    public class NonogramData {
        public int columns, rows;
        public int columnLayers, rowLayers;
        public List<int> rowData, columnData;

        public NonogramData(HtmlDocument doc) {

        }
    }
}
