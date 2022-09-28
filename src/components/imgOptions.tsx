import * as React from "react";

interface Props
{
    parentCallback: Function,
}

interface State
{
}

type ImageValues = {
    bg_color?: string,
}

class ImgOptions extends React.Component<Props, State> 
{
    constructor(props: Props){
        super(props);
        this.state = {
        } as State;

    this.selectedColor = this.selectedColor.bind(this);
    }
    builtObj: ImageValues = {};
    
    selectedColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        
        this.builtObj.bg_color = e.target.value;
    }

    submitValues = () => {
        this.props.parentCallback(this.builtObj);
    }


    render() {
        return (
                <>
                <input type='radio' value="white" name="bg_color" onChange={this.selectedColor}/>white
                <input type='radio' value="transparent" name="bg_color" onChange={this.selectedColor}/>transparent
                <button onClick={this.submitValues}>Remove Background</button>
                </>
            );
    }
}

export default ImgOptions;
