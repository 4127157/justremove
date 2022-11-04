import * as React from 'react';
import StatusComp from './StatusComp'
import ImgPreview from './imgPreview';

function fileHandler(this:any, dragged: boolean, file?:any ){
    let retUrl;
    let sizeStr = `Sorry, files larger than ${this.MAX_SIZE_STR} are not supported. Consider resizing.`;
    let uploadedFile: File | undefined = undefined; 
    let uploadedFilename: string | undefined = undefined;
    if(dragged === false){
        file.stopPropagation();
        file.preventDefault();
        uploadedFile = file.target.files[0];
        uploadedFilename = file.target.value;
    } 

    if(dragged === true){
        uploadedFile = file;
        uploadedFilename = file.name;
    }

    if(uploadedFile){
        if(uploadedFile.size > this.MAX_IMAGE_SIZE){
            this.setState( 
                {
                    elemRet: <StatusComp error={sizeStr}/>,
                    isPreviewReady: false,
                }
            );
            return;
        }
        if( uploadedFile.type === `image/png`
            || uploadedFile.type === `image/jpeg`
            || uploadedFile.type === `image/jpg`)
        {
            let FR = new FileReader();
            FR.onloadstart = () => 
            {
                this.setState( 
                    {
                        elemRet: <StatusComp loader="preview"/>
                    }
                );
            }
            FR.onloadend = () =>
            {
                retUrl = FR.result;
                if(retUrl){
                    this.setState(
                        {
                            imgData: retUrl,
                            elemRet: <ImgPreview setUrl={retUrl}/>,
                            uploadedFilename: uploadedFilename,
                            isPreviewReady: true,
                        }
                    );
                }
            }
            FR.readAsDataURL(uploadedFile);
        } else 
        {
            this.setState(
                {
                    elemRet: <StatusComp error="Please upload an image file in .png, .jpg or .jpeg format"/>
                }
            );
        }
    }
}

export { fileHandler };
