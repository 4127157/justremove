import * as React from 'react';
// import * as ReactIs from 'react-is';
/*import * as ReactDOM from 'react-dom';*/
import * as ReactDOMClient from 'react-dom/client';
import * as _ from 'lodash';

import InputComp from './inputComp';
import App from './App';
import "./styles.less";


const appElement: HTMLElement = document.createElement('div');
document.body.appendChild<HTMLElement>(appElement);
appElement.id = "app" as string;


const tester: React.ReactNode =  (
<>
    <App name="Aryansh"/>
    <InputComp/>
</>
);
const container = document.getElementById("app") as HTMLElement;
if(!container){
    throw new Error("Failed to find the root element!");
}
const root = ReactDOMClient.createRoot(container) as ReactDOMClient.Root;
root.render(tester);
