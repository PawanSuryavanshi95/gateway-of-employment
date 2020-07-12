import React from 'react';

const MessageBox = (props) => {
    var {messages,type} = props;
    var key = 1;
    messages = messages? messages.length? messages.map(message => {
        return <div className="msg" key={key++}>{message}<br/></div>
    }) : null : null
    return(
        <div className={`msgbox ${type}`} >
            {messages}
        </div>
    )
}

export default MessageBox;//{`msgbox ${type}`}