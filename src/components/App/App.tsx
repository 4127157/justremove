import * as React from 'react';
import ImgPreview from '../imgPreview';
import StatusComp from '../StatusComp';


interface Props {
}

interface State {
    base64?: string | ArrayBuffer,
    elemRet: JSX.Element
}

class App extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state =  {
            elemRet: <></>,
        } as State;

        this.handleFiles = this.handleFiles.bind(this);
    }
    
    handleFiles = (e: any) => {
        let retUrl;
        e.stopPropagation();
        e.preventDefault();
        let uploadedFile: File = e.target.files[0];
        if(uploadedFile){
            if( uploadedFile.type === `image/png`
                || uploadedFile.type === `image/jpeg`
                || uploadedFile.type === `image/jpg`)
            {
                let FR = new FileReader();
                FR.onloadstart = () => {
                    this.setState({
                        elemRet: <StatusComp loader="preview"/>
                    });
                }
                FR.onloadend = ()=>{
                    retUrl =FR.result;
                    if(retUrl){
                        this.setState({
                            elemRet: <ImgPreview base64={retUrl}/>
                        });
                    }
                }
                FR.readAsDataURL(uploadedFile);
            } else {
                console.log("Please upload an image file in .png, .jpg or .jpeg format");
            }
        }
    }
    
    render (): JSX.Element {
        return (
            <> 
                <input type="file" id="image-file-input" accept='image/*' onChange={this.handleFiles}/>
                {this.state.elemRet}
            </>
        );
    }
    
}

export default App;
