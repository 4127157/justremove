import * as React from 'react';
import * as ReactDOM from "react-dom";
import * as _ from 'lodash';

import App from './App';
import "./styles.css";

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);
