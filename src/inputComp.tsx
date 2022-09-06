import * as React from 'react';
import * as ReactIs from 'react-is';


// interface Props {
//     name: string,
// }

class InputComp extends React.Component<any, any>{
    render(){
        return (
            <>
            <input type="file" id= "image-file-input"/>
            </>
        );
    }
}

export default InputComp;
