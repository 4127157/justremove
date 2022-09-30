import { type } from "os";
import * as React from "react";

interface Props
{
    parentCallback: Function,
}

interface State
{
    [key: string]: string,
}


class ImgOptions extends React.Component<Props, State> 
{
    constructor(props: Props){
        super(props);
        this.state = {
            to_remove: 'background',
            bg_color: 'transparent',
            fg_options: '',
        } as State;

    this.selectedOptions = this.selectedOptions.bind(this);
    }

    selectedOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        let sKey = e.target.name;
        let val = e.target.value;
        if(val === 'foreground' || val === 'white'){
            this.setState({
                fg_options: '',
            });
        }
        this.setState({    
           [sKey] : val,
        });
    }

    submitValues = () => {
        this.props.parentCallback(this.state);
    }

    fgDropdown = () => {
        let retElem =
        <>
            <label htmlFor='fg_options'>FG Options: </label>
            <select name='fg_options' id='fg_options'aria-disabled disabled>
                <option value="">--Select an Option--</option>
            </select>
        </>;
        if(this.state.to_remove === 'background' && this.state.bg_color !== 'white'){
            retElem =
            <>
                <label htmlFor='fg_options'>FG Options: </label>
                <select name='fg_options' id='fg_options' >
                    <option value="">--Select an Option--</option>
                    <option value="fg-image">No Change</option>
                    <option value="fg-image-shadow">Shadowed Foreground</option>
                    <option value="fg-image-hideclp">Hide Clip Foreground</option>
                    <option value="fg-image-shadow-hideclp">Hide Clip FG Shadowed</option>
                    <option value="fg-mask">Mask Foreground</option>
                </select>
            </>
        } 
        return retElem;
    }

    render() {
        return (
                <>
                <div onChange={this.selectedOptions}>
                    <div>
                        <label htmlFor="to_remove">Remove: </label>
                        <input type='radio' value='foreground' name='to_remove' />Foreground
                        <input type='radio' value='background' name='to_remove' defaultChecked />Background
                    </div>
                    <div>
                        <label htmlFor="bg_color">Replace With: </label>
                        <input type='radio' value="white" name="bg_color" />White
                        <input type='radio' value="transparent" name="bg_color" defaultChecked />Transparent
                    </div>
                    <div>
                        {this.fgDropdown()}
                    </div>
                    <button onClick={this.submitValues}>Remove Background</button>
                </div>
                </>
            );
    }
}

export default ImgOptions;
