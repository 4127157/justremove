import * as React from 'react';
import ImgPreview from '../imgPreview';


interface Props {
}

interface State {
    input?: JSX.Element,
    base64: string | ArrayBuffer
}

class App extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state =  {
            base64: 'yayayay'
        }

    }

    handleFiles = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        let uploadedFile: File = e.target.files[0];
        if(uploadedFile){
            if(uploadedFile.type == "image/jpeg"
                || uploadedFile.type == "image/png")
            {
                console.log("your file is valid 😏");
                let FR = new FileReader();
                FR.onloadend = () => {
                    if(FR.result){
                        this.setState( { base64: FR.result});
                    }
                }
                FR.readAsDataURL(uploadedFile);
            } else {
                console.log("invalid file");
            }
        }
    }

    render(){
        return (
            <> 
                <input type="file" id="image-file-input" accept='image/*' onChange={this.handleFiles}/>
                <ImgPreview base64={this.state.base64}/>
            </>
        );
    }
}

export default App;
