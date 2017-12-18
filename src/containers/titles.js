import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect, PromiseState } from 'react-refetch'
import { Link } from 'react-router-dom'

class Titles extends Component {
  static propTypes = {
    titlesFetch: PropTypes.instanceOf(PromiseState).isRequired,
  }
  _renderTitles () {
    if (this.props.titlesFetch) {
      return this.props.titlesFetch.value.titles.map((title, i) => {
        return (
          <div>
            <Link to={`/articles/${title}`} key={i}>{title}</Link>
          </div>
        )
      })
    }
  }

  render() {
    const { titlesFetch } = this.props

    if (titlesFetch.pending) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (titlesFetch.rejected) {
      return (
        <div>
          Rejected...
        </div>
      )
    } else if (titlesFetch.fulfilled) {
      return (
        <div className='articles'>
          Articles:
          {this._renderTitles()}
        </div>
      )
    }
  }
}

export default connect(props => ({
  titlesFetch: `http://0.0.0.0:5003/pages`,
}))(Titles)
