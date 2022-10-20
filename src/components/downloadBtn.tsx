import * as React from 'react';

interface Props {
    targetUrl: string,
}

interface State {
    clickedBool?: boolean,
}

class DownloadBtn extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {};
    }
    
    showManualLink = () => {
        this.setState({
            clickedBool: true,
        });
    }
    render() {
        let manualInfo;
        if(this.state.clickedBool){
            manualInfo = <p>Download did not begin? <a href={this.props.targetUrl} target="_blank">Click Here</a>.</p>;
        } else {
            manualInfo = <></>;
        }
        return(
            <div className='action-btn-container'>
                <a href={this.props.targetUrl} target="_blank" download>
                    <button className='action-btn' id='download-img-btn' onClick={this.showManualLink}>Download Image</button>
                </a>
                {manualInfo}
            </div>
        );
    }
} 

export default DownloadBtn;
