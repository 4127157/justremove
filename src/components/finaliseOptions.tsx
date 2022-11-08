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
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'origin'
            },
        body: bodyData,
        // cache: 'no-cache',
    })
    .then((res) => {
            if(res.ok){
                this.resetStateElem();
            }
            return res.json();
        })
    .then((result) => {
        let str = result.converted;
        let match = str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        function b64toBlob(dataStr: string, typeStr: string){
            let byteStr = window.atob(dataStr);
            let arrBfr = new ArrayBuffer(byteStr.length);
            let iArr = new Uint8Array(arrBfr);

            for (let i=0; i<byteStr.length; i++){
                iArr[i] = byteStr.charCodeAt(i);
            }

            return new Blob([arrBfr], { type: typeStr });
        }

        let tempURL = URL.createObjectURL(b64toBlob(match[2], match[1]));
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
