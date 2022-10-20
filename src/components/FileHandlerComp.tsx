import * as React from 'react';
import StatusComp from './StatusComp'
import ImgPreview from './imgPreview';

function fileHandler(this:any, e: any){
    let retUrl;
    let sizeStr = `Sorry, files larger than ${this.MAX_SIZE_STR} are not supported. Consider resizing.`;
    e.stopPropagation();
    e.preventDefault();
    let uploadedFile: File = e.target.files[0];
    let uploadedFilename: string = e.target.value;
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
