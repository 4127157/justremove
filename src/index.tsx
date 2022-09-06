import * as React from 'react';
import * as ReactIs from 'react-is';
/*import * as ReactDOM from 'react-dom';*/
import * as ReactDOMClient from 'react-dom/client';
import * as _ from 'lodash';

import InputComp from './inputComp';
// import printMe from './print';
import App from './App';
import "./styles.less";


const placeHolderDiv = document.createElement('div');
const appElement = document.body.appendChild(placeHolderDiv);
appElement.id = "app";


const tester = (
<>
    <App name="Aryansh"/>
    <InputComp/>
</>
);
const container = document.getElementById("app");
if(!container){
    throw new Error("Failed to find the root element!");
}
const root = ReactDOMClient.createRoot(container);
root.render(tester);
