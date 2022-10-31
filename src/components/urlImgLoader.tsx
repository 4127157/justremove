
/* TODO: 
 * Choose traditional fetch or axios
 * GET image from URL as blob
 * return image and set to state then send to preview comps
 * Update state*/
function urlImgLoader(val?: any){
    let imgUrl = val;
    
    if(val){
        fetch(imgUrl)
        .then( res => res.blob())
        .then( myBlob => {
            let imgBlobUrl = URL.createObjectURL(myBlob);
            console.log(imgBlobUrl);
        });
    }
}

export { urlImgLoader };
