import * as React from "react";
//import { render } from "react-dom";

interface State {
    msg: JSX.Element
}

interface Props {
    loader?: string
    error?: string
}

class StatusComp extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
    }
    

    render(): JSX.Element{
        let retElem: JSX.Element = <></>;
        if(this.props.loader){
            if(this.props.loader === "preview"){
                retElem = <p>Loading image...</p>;
            }
        }

        if(this.props.error){
            retElem = <p>{this.props.error}</p>;
        }
        return (retElem);
    }

}

export default StatusComp;
