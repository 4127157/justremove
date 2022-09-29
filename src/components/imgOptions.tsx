import * as React from "react";

interface Props
{
    parentCallback: Function,
}

interface State
{
}

type ImageValues = {
    [key: string]: string,
}

class ImgOptions extends React.Component<Props, State> 
{
    constructor(props: Props){
        super(props);
        this.state = {
        } as State;

    this.selectedOptions = this.selectedOptions.bind(this);
    }
    builtObj: ImageValues = {};
    
    selectedOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        this.builtObj[e.target.name] = e.target.value;
    }

    submitValues = () => {
        this.props.parentCallback(this.builtObj);
    }


    render() {
        return (
                <div onChange={this.selectedOptions}>
                    <input type='radio' value="white" name="bg_color" />white
                    <input type='radio' value="transparent" name="bg_color" />transparent
                    <button onClick={this.submitValues}>Remove Background</button>
                </div>
            );
    }
}

export default ImgOptions;
