import * as React from 'react';
import { urlImgLoader } from './urlImgLoader';
import Dropzone from 'react-dropzone';

interface Props {
    handleFiles: Function,
    parentPreview: Function,
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
        this.handleFiles = this.handleFiles.bind(this);
        this.loadUrlImage = this.loadUrlImage.bind(this);
    }

    MAX_IMAGE_SIZE: number = 9_437_184;

    handleUrlUpdate = (e: any) => {
        this.setState(
        {
            url_value: e.target.value,
        }, () => {
            //callback stuff
            //console.log(this.state.url_value);
        });
        //have to callback cause async state

    }

    handleFiles = (dragged: boolean, file?: any) => {
        if(dragged === false){
            this.props.handleFiles(dragged, file);
        }
        if(dragged === true){
            this.props.handleFiles(dragged, file[0]);
        }
    }

    loadUrlImage =async () => {
        console.log("loadUrlImage called");
        let tmpBlob = await urlImgLoader(this.state.url_value);
        console.log("Vale received from loadUrlImage is: " + tmpBlob);
        this.props.parentPreview(tmpBlob)
    }

    processDragged = (file: any) => {
        console.log(file[0]);
    }


    render(){
        
        let inputStyle = {
            opacity: 0,
        };

        return(<>
                <div className='img-preview-options'>
                    <div>
                        <label htmlFor='image-file-input'>Choose image to upload (PNG, JPG)</label>
                        <input type="file" name='image-file-input' id="image-file-input" accept='image/*' onChange={(e) => this.handleFiles(false, e)} style={inputStyle}/>
                    </div>
                    <span className='block-span'>OR</span>
                    <div>
                        <div>
                            <label htmlFor='url_field'>Enter link: </label>
                            <input type='text' id='url_input' name="url_field" size={30} value={this.state.url_value} onChange={this.handleUrlUpdate} placeholder="Enter image link..."/>
                        </div>
                        <button id='load-img-btn' className='action-btn' onClick={this.loadUrlImage}>Load Image</button>
                    </div>
                    <span className='block-span'>OR</span>
                    <Dropzone 
                        noClick={true}
                        accept={{
                            'image/jpeg':[],
                            'image/png':[],}}
                        maxFiles={1}
                        maxSize={this.MAX_IMAGE_SIZE}
                        onDropAccepted={acceptedFiles => this.handleFiles(true, acceptedFiles)}
                        onDropRejected={() => console.log("files were rejected")}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps({
                                    'aria-label': 'drag and drop area',
                                    'id':'drag_and_drop_block',
                                })} >
                                <input {...getInputProps({
                                    'multiple': false,
                                    })}/>
                                <span className='block-span'>Drag & Drop</span>
                            </div>
                        )}
                    </Dropzone>
                </div>
               </>); 
    }
}

export default ActionItem;
