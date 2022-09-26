import * as React from 'react';
import ImgPreview from '../imgPreview';
import StatusComp from '../StatusComp';


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

    componentDidMount(): void {
        this.sendToRemove = this.sendToRemove.bind(this);
    }
    
    sendToRemove = () => {
        //Fetch here for removal of bg also test fetch
        // let encoded = '';
        // if(this.state.imgData){
        //     let tempURI = this.state.imgData.toString();
        //     encoded = encodeURIComponent(tempURI);
        // }
        fetch(`${this.serverURL}/image`, {
            method: 'POST',
            // cache: 'no-cache',
        })
        .then(res => res.text())
        .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.error(error);
                }
        );
    }
    handleFiles = (e: any) => 
    {
        let retUrl;
        e.stopPropagation();
        e.preventDefault();
        let uploadedFile: File = e.target.files[0];
        if(uploadedFile){
            if(uploadedFile.size > 5242880){
                this.setState((state, props) => (
                {
                    elemRet: <StatusComp error="Sorry, files larger than 5 MiB are not supported. Consider resizing."/>
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
        let sendBtn;
        if(this.state.isPreviewReady === true){
            sendBtn = <button onClick={this.sendToRemove}>Remove Background</button>;
        }
        return (
            <> 
                <input type="file" id="image-file-input" accept='image/*' onChange={this.handleFiles} />
                {this.state.elemRet}
                {sendBtn}
            </>
        );
    }
    
}

export default App;
