import * as React from 'react';
import ImgPreview from '../imgPreview';
import StatusComp from '../StatusComp';
import ImgOptions from '../imgOptions';
import DownloadBtn from '../downloadBtn';
import { fileHandler } from '../FileHandlerComp';
import { finaliseOptions } from '../finaliseOptions';
import { urlImgLoader } from '../urlImgLoader';
import ActionItem from '../ActionItemComp';

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
    imgBlobUrl?: string,
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
        this.loadImgFmUrl = this.loadImgFmUrl.bind(this);
    }

    // serverURL: string = "http://localhost:7979";
    serverURL: string = "https://justremove-api.onrender.com";
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

    resetStateInitial = (e: any) => {
        e.preventDefault();
        this.resetStateElem();
        this.setState(() => ({
            isImageConverted: false,
            isPreviewReady: false,
        }));
    }

    handleImgOptions = (obj: AnyObj) => {
        if(this.state.uploadedFilename){
            obj.filename = this.state.uploadedFilename;
        }
        console.log(obj);
        finaliseOptions.call(this, obj);
    }
        
    handleFiles = (dragged: boolean, file: any) => 
    {
        fileHandler.call(this,dragged, file);
    }

    loadImgFmUrl = (urlVal: string) => {
        this.setState({
            imgData: urlVal,
            elemRet: <ImgPreview setUrl={urlVal}/>,
            isPreviewReady: true,
        });
    }
    
    render (): JSX.Element 
    {

        let options;

        let actionButton = <ActionItem handleFiles={this.handleFiles} parentPreview={this.loadImgFmUrl}/>

        if(this.state.isPreviewReady === true){
            options = <ImgOptions parentCallback = {this.handleImgOptions}/>;
            actionButton = <button className='action-btn' onClick={this.resetStateInitial}>Change Image?</button>;
        }

        if(this.state.isImageConverted === true && this.state.imgBlobUrl){
            options = <DownloadBtn targetUrl={this.state.imgBlobUrl}/>;
            actionButton = <button className='action-btn' onClick={this.resetStateInitial}>Convert another?</button>
        }

        return (
            <>
                <div className='img-preview-container'>
                    {this.state.elemRet}
                    {actionButton}
                </div>
                {options}
            </>
        );
    }
    
}

export default App;
