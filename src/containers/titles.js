import React, { Component } from 'react';
import { connect } from 'react-refetch'
import { Link } from 'react-router-dom'

class Titles extends Component {

  _renderTitles () {
    if (this.props.titles) {
      return this.props.titles.value.titles.map((title, i) => {
        return (
          <div>
            <Link to={`/articles/${title}`} key={i}>{title}</Link>
          </div>
        )
      })
    }
  }

  render() {
    const { titles } = this.props

    if (titles.pending) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (titles.rejected) {
      return (
        <div>
          Rejected...
        </div>
      )
    } else if (titles.fulfilled) {
      return (
        <div>
          Articles:
          {this._renderTitles()}
        </div>
      )
    }
  }
}

export default connect(props => ({
  titles: `http://0.0.0.0:5003/pages`,
}))(Titles)
