import * as React from 'react';
import ImgPreview from '../imgPreview';
import StatusComp from '../StatusComp';
import ImgOptions from '../imgOptions';
import DownloadBtn from '../downloadBtn';
import { fileHandler } from '../FileHandlerComp';
import { finaliseOptions } from '../finaliseOptions';

interface Props 
{
}

interface State 
{
    imgData?: string | ArrayBuffer,
    elemRet: JSX.Element,
    isPreviewReady: boolean,
    isImageConverted: boolean,
    uploadedFilename?: string,
}

type AnyObj = {
    [key: string]: string,
}
class App extends React.Component<Props, State> 
{
    constructor(props: Props)
    {
        super(props);
        this.state =  {
            elemRet: <></>,
            isPreviewReady: false,
            isImageConverted: false,
        } as State;

        this.handleFiles = this.handleFiles.bind(this);
    }

    serverURL: string = "http://localhost:7979";
    MAX_IMAGE_SIZE: number = 9_437_184;
    MAX_SIZE_STR: string = '9 MiB';

    componentDidMount(): void {
        this.handleImgOptions = this.handleImgOptions.bind(this);
    }

    resetStateElem = () => {
        this.setState(()=>({
            elemRet:<></>,
        }));
    }

    handleImgOptions = (obj: AnyObj) => {
        if(this.state.uploadedFilename){
            obj.filename = this.state.uploadedFilename;
        }
        console.log(obj);
        finaliseOptions.call(this, obj);
    }
        
    

    handleFiles = (e: any) => 
    {
        fileHandler.call(this, e);
    }
    
    render (): JSX.Element 
    {
        let options;
        if(this.state.isPreviewReady === true){
            options = <ImgOptions parentCallback = {this.handleImgOptions}/>;
        }
        if(this.state.isImageConverted === true){
            options = <DownloadBtn/>;
        }
        let inputStyle = {
            opacity: 0,
        };
        return (
            <>
                <div className='img-preview-container'>
                    {this.state.elemRet}
                    <label htmlFor='image-file-input'>Choose image to upload (PNG, JPG)</label>
                    <input type="file" name='image-file-input' id="image-file-input" accept='image/*' onChange={this.handleFiles} style={inputStyle} />
                </div>
                {options}
            </>
        );
    }
    
}

export default App;
