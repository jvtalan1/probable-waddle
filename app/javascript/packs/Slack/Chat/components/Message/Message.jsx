import React, { Component } from "react" 
import PropTypes from "prop-types"
import MessageInput from "./MessageInput"

export default class Message extends Component {
 
  renderMessages() {
    const { messages } = this.props

    return messages.map( (message) => {
      return (
        <p key={message.id}>{message.content}</p>
      )
    })
  }

  render() {
    const { messages, currentChannel, onSendMessage } = this.props

    return (
      <div>
        { this.renderMessages() }
        <MessageInput
          onSendMessage={ onSendMessage }
          currentChannel={ currentChannel }/>
      </div>
    )
  }
}
