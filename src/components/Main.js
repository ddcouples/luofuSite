require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Start from './start';

// let yeomanImage = require('../images/yeoman.png');
//         <img src={yeomanImage} alt="Yeoman Generator" />

class AppComponent extends React.Component {
  render() {
    return (
      <Start />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
