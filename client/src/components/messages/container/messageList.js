import React from 'react';

export default (props) => {
  const renderMessage = (message={}, index) =>{
    const sender = message.sentBy || {};
   return (
    <div className="message flex flex-row" key={index}>
      <img src={sender.avatar || PLACEHOLDER} alt={sender.email} className="avatar" />
      <div className="message-wrapper">
        <p className="message-header">
          <span className="username font-600">{sender.email}</span>
          <span className="sent-date font-300">
            {moment(message.createdAt).format('MMM Do, hh:mm:ss')}
          </span>
        </p>
        <p className="message-content font-300">
          {message.text}
        </p>
      </div>
    </div>
    )
  }
  return (
    <main className="chat flex flex-column flex-1 clear">
      {props.messages.map(renderMessage)}
    </main>
    )
}