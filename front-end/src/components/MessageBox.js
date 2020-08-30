import React from 'react';

const MessageBox = (props) => {
    var {messages,type} = props;
    var key = 1;
    messages = messages? messages.length? messages.map(message => {
        return <div className="msg" key={key++}>{message}<br/></div>
    }) : null : null
    return(
            displayContent(messages,type)
    )
}

const displayContent = (messages,type) => {
    return messages!=null ?
        <div className={`msgbox ${type}`} >
            {messages}
        </div> :
        <div></div> 
}

export default MessageBox;