import * as React from 'react';
import ImgPreview from '../imgPreview';
import StatusComp from '../StatusComp';
import ImgOptions from '../imgOptions';
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
}

class App extends React.Component<Props, State> 
{
    constructor(props: Props)
    {
        super(props);
        this.state =  {
            elemRet: <></>,
            isPreviewReady: false,
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

    handleImgOptions = (obj: Object) => {
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
        return (
            <> 
                <input type="file" id="image-file-input" accept='image/*' onChange={this.handleFiles} />
                {this.state.elemRet}
                {options}
            </>
        );
    }
    
}

export default App;
