import React, { Component } from 'react';

export default class Homepage extends Component {
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

          </div>
        </div>
      </div>
    )
  }
}
