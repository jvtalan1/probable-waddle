import React, { Component } from "react"
import PropTypes from "prop-types"

import Item from "./Item";

export default class List extends Component {
  renderUsers() {
    const { items, onSelectChannel } = this.props

    return items.map( (item) => {
      return (
        <Item
          key={ item.id }
          name={ item.username || item.name }
          onSelectChannel={ onSelectChannel }/>
      )
    })
  }

  render() {
    const { type, items, onClickCreateChannel } = this.props

    return (
      <div>
        { type }
        { onClickCreateChannel === undefined ? "" :  
          <button onClick={ () => { onClickCreateChannel() } } >
            Create
          </button>
        }
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    )
  }
}
