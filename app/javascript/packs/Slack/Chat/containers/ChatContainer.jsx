import React, { Component } from "react"
import PropTypes from "prop-types"
import List from "../components/Sidebar/List"
import Message from "../components/Message/Message"
import MessageInput from "../components/Message/MessageInput"
import ChannelForm from "../components/Forms/ChannelForm"
 
import UsersAPI from "../services/UsersAPI"
import ChannelsAPI from "../services/ChannelsAPI"
import MessagesAPI from "../services/MessagesAPI"

export default class ChatContainer extends Component {
  constructor() {
    super()
    this.state = { users: [], channels: [], messages: [], currentChannel: {} }
  }

  componentWillMount() {
    UsersAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({users: response.data})
      }
    })

    ChannelsAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({ channels: response.data } )
      }
    })

    MessagesAPI.fetchAll({
      onSuccess: (response) => {
        this.setState({ messages: response.data })
      }
    })
  }

  createChannel(params, ref1, ref2) {
    const { channels } = this.state

    ChannelsAPI.create({
      data: params,
      onSuccess: (response) => {
        this.setState({ channels: channels.concat(response.data) })
        this.toggleChannelForm(ref1, ref2)
      }
    })
  }

  toggleChannelForm(ref1, ref2) {
    if (ref1.hasAttribute('hidden')) {
      ref1.removeAttribute('hidden')
      ref2.setAttribute('hidden', 'hidden')
    } else {
      ref2.removeAttribute('hidden')
      ref1.setAttribute('hidden', 'hidden')
    }
  }

  selectChannel(current) {
    const { channels } =  this.state
    let channel = channels.find( (member) => { return member.name === current })
    this.setState({ currentChannel: channel })
  }

  sendMessage(params) {
    const { messages } = this.state

    MessagesAPI.create({
      data: params,
      onSuccess: (response) => {
        this.setState({ messages: messages.concat(response.data) })
      }
    })
  }

  render() {
    const { users, channels, messages, currentChannel } = this.state
    const publicChannels = channels.filter( (member) => { return member.type === "PublicChannel" } )
    const privateChannels = channels.filter( (member) => { return member.type === "PrivateChannel" } )
    const groupChannels = channels.filter( (member) => { return member.type === "GroupChannel" } )
    let messagesChannel = messages.filter( (member) => { return member.receiveable_id == currentChannel.id } )
    let formRef, contentRef

    return (
      <div>
        <div 
          ref={ (el) => { formRef = el } }
          role="channel-form"
          hidden>
          <ChannelForm
            users={ users }
            onCreateChannel={ (value) => { this.createChannel(value, formRef, contentRef) } }
            onCancelCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }/>
        </div>
        <div 
          ref={ (el) => { contentRef = el } }
          role="main-content">
          <aside>
            <List 
              onClickCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }
              icon={ "hashtags" }
              type={ "Public Channels" }
              items={ publicChannels }
              onSelectChannel={ (value) => { this.selectChannel(value) } }/>
            <List 
              onClickCreateChannel={ () => { this.toggleChannelForm(formRef, contentRef) } }
              icon={ "lock" }
              type={ "Private Channels" }
              items={ privateChannels }
              onSelectChannel={ (value) => { this.selectChannel(value) } }/>
            <List 
              type={ "Direct Messages" }
              icon={ "circle" }
              items={ users }
              onSelectChannel={ (value) => { this.selectChannel(value) } }/>
          </aside>
          <article>
            <Message
              currentChannel={ currentChannel }
              onSendMessage={ (value) => { this.sendMessage(value) } }
              messages={ messagesChannel }/>
          </article>
        </div>
      </div>
    )
  }
}
