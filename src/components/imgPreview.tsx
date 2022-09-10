import * as React from 'react';

interface Props {
    base64: string | ArrayBuffer
}

interface State {
    image?: JSX.Element 
}

class ImgPreview extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            //image: this.previewHere()
        }
        //this.previewHere = this.previewHere.bind(this);
    }

    
    // previewHere(){
    //     return (<img src={this.props.base64.toString()}/>);
    // }
    
    render(): JSX.Element{
        return (
            <>
                <img className='preview-img'src={this.props.base64.toString()}/>
                <p>Your image is above</p>
            </>
        );
    }
}

export default ImgPreview;
