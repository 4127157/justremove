import * as React from 'react';

interface Props {
}

class DownloadBtn extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render() {
        return(
            <div className='action-btn-container'>
                <button className='action-btn' id='download-img-btn'>Download Image</button>
            </div>
        );
    }
} 

export default DownloadBtn;
