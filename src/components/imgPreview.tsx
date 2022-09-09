import * as React from 'react';

interface Props {
    base64: string | ArrayBuffer
}

class ImgPreview extends React.Component<Props>{
    
    render(): JSX.Element{
        let base64Str = this.props.base64.toString();
        const { base64 }= this.props;

        return (
            <>
                <p>{base64Str}</p>
            </>
        );
    }
}

export default ImgPreview;
