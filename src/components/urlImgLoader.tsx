
/* TODO: 
 * Choose traditional fetch or axios
 * GET image from URL as blob
 * return image and set to state then send to preview comps
 * Update state*/
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
