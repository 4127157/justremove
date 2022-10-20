import * as React from 'react';
import StatusComp from "./StatusComp";
import ImgPreview from './imgPreview';

function finaliseOptions(this: any, obj: Object){
    //Fetch here for removal of bg also test fetch
    let dataJson = {
        options: obj,
        image_data: this.state.imgData,
    };
    let bodyData = JSON.stringify(dataJson);
    
    this.setState({
        elemRet: <StatusComp loader='processing'/>,
    });

    fetch(`${this.serverURL}/image`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: bodyData,
        // cache: 'no-cache',
    })
    .then((res) => {
            if(res.ok){
                this.resetStateElem();
            }
            return res.blob();
        })
    .then((result) => {
        let tempURL = URL.createObjectURL(result);
        this.setState(() => ({
            elemRet: <ImgPreview setUrl={tempURL}/>,
            isPreviewReady: false,
            isImageConverted: true,
            imgBlobUrl: tempURL,
        }));
                // if(!result.error){
                //     let str = result.converted;
                //     this.setState(() => ({
                //         elemRet: <ImgPreview base64={str}/>,
                //         isPreviewReady: false,
                //         isImageConverted: true,
                //     }));
                // } else if(result.error){
                //     console.log(result.error);
                //     this.setState({
                //         elemRet: <StatusComp error={result.error}/>,
                //     });
                // }
        })
    .catch((error) => {
                console.error(error);
                this.setState({
                    elemRet: <StatusComp error="Invalid input or server encountered an error"/>,
                });
            }
        );
}

export { finaliseOptions }; 
