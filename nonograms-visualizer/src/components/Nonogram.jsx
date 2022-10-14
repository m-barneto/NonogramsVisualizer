import React, { Component } from 'react';

export default class Nonogram extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount() {
    this.state.data = "{\u0022hasColor\u0022:false,\u0022columns\u0022:9,\u0022rows\u0022:10,\u0022colors\u0022:0,\u0022columnLayers\u0022:3,\u0022rowLayers\u0022:2,\u0022colorCodes\u0022:[],\u0022rowData\u0022:[-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,2,4,1,-1,6,3,-1,1,1,2,1,5,7,2,1,2],\u0022columnData\u0022:[-1,1,-1,4,-1,4,-1,5,-1,4,-1,5,-1,6,1,3,1,1,3,2],\u0022rowColorData\u0022:[],\u0022columnColorData\u0022:[]}"
  }

  render() {
    return (
      <div>
      <table className="nonogram_table" id="nonogram_table" oncontextmenu="fc1(event)" onselectstart="fc1(event)">
            <tbody>
                <tr>
                <td style="background:#f0f0f0;cursor:default;" id="nmti">&nbsp;</td>
                <td className="nmtt">
                    <table>
                    <tbody>
                        <tr>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmv3_0" onmousedown="fc7(event,3,0)" className="num">
                            <div>1</div>
                        </td>
                        <td className="num_empty nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmv5_0" onmousedown="fc7(event,5,0)" className="num">
                            <div>1</div>
                        </td>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmv1_0" onmousedown="fc7(event,1,0)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv2_0" onmousedown="fc7(event,2,0)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv3_1" onmousedown="fc7(event,3,1)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv4_0" onmousedown="fc7(event,4,0)" className="num nmt_td5">
                            <div>1</div>
                        </td>
                        <td id="nmv5_1" onmousedown="fc7(event,5,1)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv6_0" onmousedown="fc7(event,6,0)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv7_0" onmousedown="fc7(event,7,0)" className="num">
                            <div>1</div>
                        </td>
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr>
                        <td id="nmv0_0" onmousedown="fc7(event,0,0)" className="num">
                            <div>5</div>
                        </td>
                        <td id="nmv1_1" onmousedown="fc7(event,1,1)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv2_1" onmousedown="fc7(event,2,1)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv3_2" onmousedown="fc7(event,3,2)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv4_1" onmousedown="fc7(event,4,1)" className="num nmt_td5">
                            <div>3</div>
                        </td>
                        <td id="nmv5_2" onmousedown="fc7(event,5,2)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv6_1" onmousedown="fc7(event,6,1)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv7_1" onmousedown="fc7(event,7,1)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmv8_0" onmousedown="fc7(event,8,0)" className="num">
                            <div>5</div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
                <tr>
                <td className="nmtl">
                    <table>
                    <tbody>
                        <tr>
                        <td class="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmh0_0" onmousedown="fca(event,0,0)" className="num">
                            <div>9</div>
                        </td>
                        </tr>
                        <tr>
                        <td id="nmh0_1" onmousedown="fca(event,0,1)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmh1_1" onmousedown="fca(event,1,1)" className="num">
                            <div>1</div>
                        </td>
                        </tr>
                        <tr>
                        <td id="nmh0_2" onmousedown="fca(event,0,2)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmh1_2" onmousedown="fca(event,1,2)" className="num">
                            <div>1</div>
                        </td>
                        </tr>
                        <tr>
                        <td id="nmh0_3" onmousedown="fca(event,0,3)" className="num">
                            <div>1</div>
                        </td>
                        <td id="nmh1_3" onmousedown="fca(event,1,3)" className="num">
                            <div>1</div>
                        </td>
                        </tr>
                        <tr className="nmt_tr5">
                        <td className="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmh0_4" onmousedown="fca(event,0,4)" class="num">
                            <div>9</div>
                        </td>
                        </tr>
                        <tr>
                        <td class="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmh0_5" onmousedown="fca(event,0,5)" class="num">
                            <div>1</div>
                        </td>
                        </tr>
                        <tr>
                        <td class="num_empty">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmh0_6" onmousedown="fca(event,0,6)" class="num">
                            <div>3</div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                <td class="nmtc">
                    <table onmouseup="fc3(event)" onmouseout="fc10()">
                    <tbody>
                        <tr id="l0">
                        <td id="nmf0_0" onmousedown="fc2(event,0,0)" onmouseover="fc4(event,0,0)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf1_0" onmousedown="fc2(event,1,0)" onmouseover="fc4(event,1,0)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf2_0" onmousedown="fc2(event,2,0)" onmouseover="fc4(event,2,0)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf3_0" onmousedown="fc2(event,3,0)" onmouseover="fc4(event,3,0)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf4_0" onmousedown="fc2(event,4,0)" onmouseover="fc4(event,4,0)" class="nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf5_0" onmousedown="fc2(event,5,0)" onmouseover="fc4(event,5,0)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf6_0" onmousedown="fc2(event,6,0)" onmouseover="fc4(event,6,0)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf7_0" onmousedown="fc2(event,7,0)" onmouseover="fc4(event,7,0)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf8_0" onmousedown="fc2(event,8,0)" onmouseover="fc4(event,8,0)">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr id="l1">
                        <td id="nmf0_1" onmousedown="fc2(event,0,1)" onmouseover="fc4(event,0,1)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf1_1" onmousedown="fc2(event,1,1)" onmouseover="fc4(event,1,1)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf2_1" onmousedown="fc2(event,2,1)" onmouseover="fc4(event,2,1)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf3_1" onmousedown="fc2(event,3,1)" onmouseover="fc4(event,3,1)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf4_1" onmousedown="fc2(event,4,1)" onmouseover="fc4(event,4,1)" class="nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf5_1" onmousedown="fc2(event,5,1)" onmouseover="fc4(event,5,1)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf6_1" onmousedown="fc2(event,6,1)" onmouseover="fc4(event,6,1)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf7_1" onmousedown="fc2(event,7,1)" onmouseover="fc4(event,7,1)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf8_1" onmousedown="fc2(event,8,1)" onmouseover="fc4(event,8,1)">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr id="l2">
                        <td id="nmf0_2" onmousedown="fc2(event,0,2)" onmouseover="fc4(event,0,2)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf1_2" onmousedown="fc2(event,1,2)" onmouseover="fc4(event,1,2)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf2_2" onmousedown="fc2(event,2,2)" onmouseover="fc4(event,2,2)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf3_2" onmousedown="fc2(event,3,2)" onmouseover="fc4(event,3,2)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf4_2" onmousedown="fc2(event,4,2)" onmouseover="fc4(event,4,2)" class="nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf5_2" onmousedown="fc2(event,5,2)" onmouseover="fc4(event,5,2)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf6_2" onmousedown="fc2(event,6,2)" onmouseover="fc4(event,6,2)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf7_2" onmousedown="fc2(event,7,2)" onmouseover="fc4(event,7,2)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf8_2" onmousedown="fc2(event,8,2)" onmouseover="fc4(event,8,2)">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr id="l3">
                        <td id="nmf0_3" onmousedown="fc2(event,0,3)" onmouseover="fc4(event,0,3)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf1_3" onmousedown="fc2(event,1,3)" onmouseover="fc4(event,1,3)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf2_3" onmousedown="fc2(event,2,3)" onmouseover="fc4(event,2,3)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf3_3" onmousedown="fc2(event,3,3)" onmouseover="fc4(event,3,3)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf4_3" onmousedown="fc2(event,4,3)" onmouseover="fc4(event,4,3)" class="nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf5_3" onmousedown="fc2(event,5,3)" onmouseover="fc4(event,5,3)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf6_3" onmousedown="fc2(event,6,3)" onmouseover="fc4(event,6,3)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf7_3" onmousedown="fc2(event,7,3)" onmouseover="fc4(event,7,3)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf8_3" onmousedown="fc2(event,8,3)" onmouseover="fc4(event,8,3)">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr class="nmt_tr5" id="l4">
                        <td id="nmf0_4" onmousedown="fc2(event,0,4)" onmouseover="fc4(event,0,4)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf1_4" onmousedown="fc2(event,1,4)" onmouseover="fc4(event,1,4)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf2_4" onmousedown="fc2(event,2,4)" onmouseover="fc4(event,2,4)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf3_4" onmousedown="fc2(event,3,4)" onmouseover="fc4(event,3,4)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf4_4" onmousedown="fc2(event,4,4)" onmouseover="fc4(event,4,4)" class="nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf5_4" onmousedown="fc2(event,5,4)" onmouseover="fc4(event,5,4)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf6_4" onmousedown="fc2(event,6,4)" onmouseover="fc4(event,6,4)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf7_4" onmousedown="fc2(event,7,4)" onmouseover="fc4(event,7,4)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf8_4" onmousedown="fc2(event,8,4)" onmouseover="fc4(event,8,4)">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr id="l5">
                        <td id="nmf0_5" onmousedown="fc2(event,0,5)" onmouseover="fc4(event,0,5)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf1_5" onmousedown="fc2(event,1,5)" onmouseover="fc4(event,1,5)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf2_5" onmousedown="fc2(event,2,5)" onmouseover="fc4(event,2,5)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf3_5" onmousedown="fc2(event,3,5)" onmouseover="fc4(event,3,5)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf4_5" onmousedown="fc2(event,4,5)" onmouseover="fc4(event,4,5)" class="nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf5_5" onmousedown="fc2(event,5,5)" onmouseover="fc4(event,5,5)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf6_5" onmousedown="fc2(event,6,5)" onmouseover="fc4(event,6,5)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf7_5" onmousedown="fc2(event,7,5)" onmouseover="fc4(event,7,5)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf8_5" onmousedown="fc2(event,8,5)" onmouseover="fc4(event,8,5)">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                        <tr id="l6">
                        <td id="nmf0_6" onmousedown="fc2(event,0,6)" onmouseover="fc4(event,0,6)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf1_6" onmousedown="fc2(event,1,6)" onmouseover="fc4(event,1,6)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf2_6" onmousedown="fc2(event,2,6)" onmouseover="fc4(event,2,6)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf3_6" onmousedown="fc2(event,3,6)" onmouseover="fc4(event,3,6)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf4_6" onmousedown="fc2(event,4,6)" onmouseover="fc4(event,4,6)" class="nmt_td5">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf5_6" onmousedown="fc2(event,5,6)" onmouseover="fc4(event,5,6)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf6_6" onmousedown="fc2(event,6,6)" onmouseover="fc4(event,6,6)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf7_6" onmousedown="fc2(event,7,6)" onmouseover="fc4(event,7,6)">
                            <div>&nbsp;</div>
                        </td>
                        <td id="nmf8_6" onmousedown="fc2(event,8,6)" onmouseover="fc4(event,8,6)">
                            <div>&nbsp;</div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </td>
                </tr>
            </tbody>
            </table>
      </div>
    )
  }
}
