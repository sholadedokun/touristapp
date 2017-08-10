import React from 'react';

export default ({url, width, height, type})=>{
    // console.log(parentSize[0])
    let style={
        productImage:{
            background: `url(${url}) no-repeat center`,
            width:'auto',
            height,
            overflow: 'hidden'
        },
        profileImage:{
            background: `url(${url}) no-repeat center`,
            width: 'auto',
            height,
            overflow: 'hidden',
            borderRadius: '50%'
        }

    }
    return(
        <div style={style[type]}></div>
    )

}
