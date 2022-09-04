import * as React from 'react';
import * as ReactIs from 'react-is';
/*import * as ReactDOM from 'react-dom';*/
import * as ReactDOMClient from 'react-dom/client';
import * as _ from 'lodash';


import printMe from './print';
import App from './App';
import "./styles.css";

/*function component () {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerText = _.join(['Hello', 'webpack'], ' ');

    btn.innerText = "Click me and check the console";
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}*/

const placeHolderDiv = document.createElement('div');
const appElement = document.body.appendChild(placeHolderDiv);
appElement.id = "app";


const btn = 
<button onClick={printMe}>
"Click me and check the console!"
</button>
;
const element = 
<div>
    {_.join(['Hello', 'webpack live'], ' ')}
    {btn}
</div>
;

const tester = (
<div>
    <App name="Aryansh"/>
    {element}
</div>
);
const container = document.getElementById("app");
if(!container){
    throw new Error("Failed to find the root element!");
}
const root = ReactDOMClient.createRoot(container);
root.render(tester);
