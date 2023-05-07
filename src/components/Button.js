import React from "react";

export default function Button(props){

    let styles
    let func = props.handleNumClick

    if(props.isOp){
        styles = `button`
    }else{
        styles = `button operator`
    }

    if(props.id === 16) {
        styles = styles+ ` span-four`
        func = props.clear
    }

    return(
        <div className={styles} onClick={func}>{props.value}</div>
    )
}
