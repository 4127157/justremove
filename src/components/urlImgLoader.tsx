
/* TODO: 
 * Limit Fetch Size
 * Limit MIME types
 * Limit image types
 * Validate URL*/
async function urlImgLoader(val: any){
    let imgUrl = val;

        return fetch(imgUrl)
        .then( res => res.blob())
        .then( myBlob => {
            // imgBlobUrl = URL.createObjectURL(myBlob);
            // console.log(imgBlobUrl);
            // return imgBlobUrl;
            // let base64Str = btoa(String.fromCharCode(...file));
            return new Promise((resolve, reject) => {
                let FR = new FileReader();
                FR.onloadstart = () => {
                    console.log("Loading file begins...");
                }
                FR.onloadend = () => {
                    resolve(FR.result);
                }
                FR.onerror = reject;
                FR.readAsDataURL(myBlob);
            });
        });
}

export { urlImgLoader };
