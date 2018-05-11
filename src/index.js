import React from 'react';
import ReactDOM from 'react-dom';
import * as Components from './components';

export default class BluewinWidgetFactory {
  constructor({ endpoint = 'https://www.bluewin.ch' } = {}) {
    this.endpoint = endpoint;
  }
  render(element, Component, aProps, callback) {
    ReactDOM.render(<Component url={this.endpoint} {...aProps} />, element, callback);
  }
}

export { Components };
