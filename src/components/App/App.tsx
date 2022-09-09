import * as React from 'react';
import ImgPreview from '../imgPreview';


interface Props {
}

interface State {
    input?: JSX.Element,
    base64: string
}

class App extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state =  {
            base64: 'yayayay'
        }

    }

    handleFiles = (e: any) => {
        e.preventDefault();
        let uploadedFile: File = e.target.files[0];
        if(uploadedFile){
            if(uploadedFile.type == "image/jpeg"
                || uploadedFile.type == "image/png")
            {
                console.log("your file is valid 😏");
                console.log(uploadedFile);
            } else {
                console.log("invalid file");
            }
        }
    }

    render(){
        return (
            <> 
                <input type="file" id="image-file-input" onChange={this.handleFiles}/>
                <ImgPreview base64={this.state.base64}/>
            </>
        );
    }
}

export default App;
