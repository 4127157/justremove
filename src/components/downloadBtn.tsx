import * as React from 'react';

interface Props {
}

class DownloadBtn extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render() {
        return(
            <button className='action-btn' id='download-img-button'>Download Image</button>
        );
    }
} 

export default DownloadBtn;
