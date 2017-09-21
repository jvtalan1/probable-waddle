import React, { Component } from "react" 
import PropTypes from "prop-types"

export default class MessageInput extends Component {

  handleSubmit(evt, { contentRef, currentChannel } = params) {
    evt.preventDefault()
    const { onSendMessage } = this.props

    let newParams = { message: {
      content: contentRef.value,
      receiveable_type: currentChannel.type,
      receiveable_id: currentChannel.id
    } }

    onSendMessage(newParams)
    contentRef.value = ""

  }

  render() {
    const { currentChannel } = this.props
    let contentRef

    return (
      <form onSubmit={ (evt) => { this.handleSubmit(evt, { contentRef, currentChannel }) } }>
        <label htmlFor="message_input">
          Message
        </label>
        <input
          ref={ (el) => { contentRef = el } }
          type="text" 
          id="message_input"/>
        <div>
          <button type="submit">
            Send
          </button>
        </div>
      </form>
    )
  }
}
