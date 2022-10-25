import * as React from 'react';

interface Props {
    handleFiles: Function,
}
interface State {
    url_value?: string,
}

class ActionItem extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            url_value: '',
        } as State;

        this.handleUrlUpdate = this.handleUrlUpdate.bind(this);
    }

    handleUrlUpdate = (e: any) => {
        this.setState(
        {
            url_value: e.target.value,
        });
    }

    handleFiles = (e: any) => {
        this.props.handleFiles(e);
    }

    render(){
        
        let inputStyle = {
            opacity: 0,
        };

        return(<>
                <div className='img-preview-options'>
                    <div>
                        <label htmlFor='image-file-input'>Choose image to upload (PNG, JPG)</label>
                        <input type="file" name='image-file-input' id="image-file-input" accept='image/*' onChange={this.handleFiles} style={inputStyle}/>
                    </div>
                    <span className='block-span'>OR</span>
                    <div>
                        <div>
                            <label htmlFor='url_field'>Enter link: </label>
                            <input type='text' id='url_input' name="url_field" size={30} value={this.state.url_value} onChange={this.handleUrlUpdate} placeholder="Enter image link..."/>
                        </div>
                        <button id='load-img-btn' className='action-btn'>Load Image</button>
                    </div>
                    <span className='block-span'>OR</span>
                    <div id='drag_and_drop_block'>
                        <span className='block-span'>Drag & Drop</span>
                    </div>
                </div>
               </>); 
    }
}

export default ActionItem;
