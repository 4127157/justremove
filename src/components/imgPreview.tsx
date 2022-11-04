import * as React from 'react';

interface Props {
    setUrl: string | ArrayBuffer
}

interface State {
    image?: JSX.Element 
}

class ImgPreview extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
        }
    }
    render(): JSX.Element{
        return (
            <>
                <img className='preview-img'src={this.props.setUrl.toString()}/>
                <p>Your image is above</p>
            </>
        );
    }
}

export default ImgPreview;
