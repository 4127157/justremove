import * as React from 'react';

interface Props {
    base64: string
}

class ImgPreview extends React.Component<Props>{
    
    render(): JSX.Element{
        const { base64 }= this.props;
        return (
            <>
                <p>{base64}</p>
            </>
        );
    }
}

export default ImgPreview;
