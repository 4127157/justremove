
/* TODO: 
 * Limit Fetch Size
 * Limit MIME types
 * Limit image types
 * Validate URL*/
async function urlImgLoader(val: any){
    let imgUrl = val;
    let imgBlobUrl = '';
    
        return fetch(imgUrl)
        .then( res => res.blob())
        .then( myBlob => {
            imgBlobUrl = URL.createObjectURL(myBlob);
            console.log(imgBlobUrl);
            return imgBlobUrl;
        });
}

export { urlImgLoader };
