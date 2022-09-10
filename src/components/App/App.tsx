import * as React from 'react';
import ImgPreview from '../imgPreview';


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
        let FR = new FileReader();
        FR.onloadend = ()=>{
                retUrl =FR.result;
                if(retUrl){
                    this.setState({
                        elemRet: <ImgPreview base64={retUrl}/>
                    });
                }
        }
        FR.readAsDataURL(uploadedFile);
    }
    
    render () {
        return (
            <> 
                <input type="file" id="image-file-input" accept='image/*' onChange={this.handleFiles}/>
                {this.state.elemRet}
            </>
        );
    }
    
}

export default App;
