import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as _ from 'lodash';
import App from './components/App/App';
import "./styles.less";

const appElement: HTMLElement = document.createElement('div');
document.body.appendChild<HTMLElement>(appElement);
appElement.id = "app" as string;

const container = document.getElementById("app") as HTMLElement;

if(!container){
    throw new Error("Failed to find the root element!");
}

const root = ReactDOMClient.createRoot(container) as ReactDOMClient.Root;
root.render(<App />);
