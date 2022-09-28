import * as React from "react";

interface Props
{
    parentCallback: Function,
}

interface State
{
}

class ImgOptions extends React.Component<Props, State> 
{
    constructor(props: Props){
        super(props);
        this.state = {
        } as State;
    }
}

export default ImgOptions;
