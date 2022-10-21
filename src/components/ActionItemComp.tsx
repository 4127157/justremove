import * as React from 'react';

interface Props {
    handleFiles: Function,
}
interface State {}

class ActionItem extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {} as State;
    }

    handleFiles = (e: any) => {
        this.props.handleFiles(e);
    }

    render(){
        
        let inputStyle = {
            opacity: 0,
        };

        return(<>
                    <label htmlFor='image-file-input'>Choose image to upload (PNG, JPG)</label>
                    <input type="file" name='image-file-input' id="image-file-input" accept='image/*' onChange={this.handleFiles} style={inputStyle}/>
               </>); 
    }
}

export default ActionItem;
