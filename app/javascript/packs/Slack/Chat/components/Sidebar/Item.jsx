import React, { Component } from "react"
import PropTypes from "prop-types"

export default class Item extends Component {

  render() {
    return (
      <li>
        <div
          onClick={ (val) => this.props.onSelectChannel(this.props.name) }>
          { this.props.name }
        </div>
      </li>
    )
  }
}
