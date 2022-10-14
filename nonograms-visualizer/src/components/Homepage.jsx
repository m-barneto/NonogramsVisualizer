import React, { Component } from 'react';
import Nonogram from './Nonogram';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount() {
    let jsonData = "{\u0022hasColor\u0022:false,\u0022columns\u0022:9,\u0022rows\u0022:10,\u0022colors\u0022:0,\u0022columnLayers\u0022:3,\u0022rowLayers\u0022:2,\u0022colorCodes\u0022:[],\u0022rowData\u0022:[-1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,2,4,1,-1,6,3,-1,1,1,2,1,5,7,2,1,2],\u0022columnData\u0022:[-1,1,-1,4,-1,4,-1,5,-1,4,-1,5,-1,6,1,3,1,1,3,2],\u0022rowColorData\u0022:[],\u0022columnColorData\u0022:[]}"
    this.setState({data: jsonData});
    return;
    fetch('http://localhost:5026/nonograms/52908', {
      method: "POST"
    }).then(resp => resp.json())
      .then(data => {
        console.log(data);
      });

  }

  render() {
    return (
      <div className='body'>
        <div className='topbar'>
          <input id='search' type='text' autoComplete='off' />
          <button id='start' aria-label='Start' />
        </div>
        <div id='content'>
          <div id='left'>

          </div>
          <div id='right'>
            <Nonogram></Nonogram>
          </div>
        </div>
      </div>
    )
  }
}
