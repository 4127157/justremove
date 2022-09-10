import * as React from "react";
import { render } from "react-dom";

interface Props {
    loader: string
}

class StatusComp extends React.Component<Props> {
    constructor(props: Props){
        super(props);
    }
    
        render(): JSX.Element{
            if(this.props.loader && this.props.loader === "preview"){
            return (
                <p>Loading image...</p>
                );
            }
            return (<></>);
        }

}

export default StatusComp;
