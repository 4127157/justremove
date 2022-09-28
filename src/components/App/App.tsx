import * as React from 'react';
import ImgPreview from '../imgPreview';
import StatusComp from '../StatusComp';
import ImgOptions from '../imgOptions';


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
        this.sendToRemove = this.sendToRemove.bind(this);
    }

    resetStateElem = () => {
        this.setState(()=>({
            elemRet:<></>,
        }));
    }

    handleImgOptions = (obj: Object) => {
        this.sendToRemove;
    }
        
    
    sendToRemove = () => {
        //Fetch here for removal of bg also test fetch
        let dataJson = { "image_data": this.state.imgData, };
        let bodyData = JSON.stringify(dataJson);
        fetch(`${this.serverURL}/image`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: bodyData,
            // cache: 'no-cache',
        })
        .then(res => {
                this.resetStateElem();
                return res.json(); 
            })
        .then(
                (result) => {
                    let str = result.converted;
                    this.setState(() => ({
                        elemRet: <ImgPreview base64={str}/>
                    }));
                },
                (error) => {
                    console.error(error);
                }
        );
    }

    handleFiles = (e: any) => 
    {
        let retUrl;
        let sizeStr = `Sorry, files larget than ${this.MAX_SIZE_STR} are not supported. Consider resizing.`;
        e.stopPropagation();
        e.preventDefault();
        let uploadedFile: File = e.target.files[0];
        if(uploadedFile){
            if(uploadedFile.size > this.MAX_IMAGE_SIZE){
                this.setState((state, props) => (
                {
                    elemRet: <StatusComp error={sizeStr}/>
                }));
                return;
            }
            if( uploadedFile.type === `image/png`
                || uploadedFile.type === `image/jpeg`
                || uploadedFile.type === `image/jpg`)
            {
                let FR = new FileReader();
                FR.onloadstart = () => 
                {
                    this.setState((state, props) =>( 
                        {
                            elemRet: <StatusComp loader="preview"/>
                        })
                    );
                }
                FR.onloadend = () =>
                {
                    retUrl = FR.result;
                    if(retUrl){
                        this.setState(
                            {
                                imgData: retUrl,
                                elemRet: <ImgPreview base64={retUrl}/>,
                                isPreviewReady: true,
                            }
                        );
                    }
                }
                FR.readAsDataURL(uploadedFile);
            } else 
            {
                this.setState((state, props) => (
                {
                    elemRet: <StatusComp error="Please upload an image file in .png, .jpg or .jpeg format"/>
                }));
            }
        }
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
