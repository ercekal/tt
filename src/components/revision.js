import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect, PromiseState} from 'react-refetch'
import { Link } from 'react-router-dom'

class Revision extends Component {
  static propTypes = {
    revisionFetch: PropTypes.instanceOf(PromiseState).isRequired,
  }

  state = {}

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.revisionFetch.value) {
      const {data} = nextProps.revisionFetch.value
      this.setState({
        data: data,
        updated: true,
      })
    }
  }

  _renderRevisions () {
    const {title} = this.props.revisionFetch.value
    if (this.state.updated) {
      return (
        <div>
          <div className='title'>
          §title =>  <Link to={`/articles/${title}`}>{title}</Link>
          </div>
          <div className='revisionNo'>
            revision no =>  {this.props.match.params.revisionNo}
          </div>
          <br/>
          <div className='revisionBox'>
            {this.state.data}
          </div>
        </div>
      )
    }
  }

  render() {
    const { revisionFetch } = this.props
    if (revisionFetch.pending) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (revisionFetch.rejected) {
      return (
        <div>
          Rejected...
        </div>
      )
    } else if (revisionFetch.fulfilled) {
      return <div>
        <div>
          {this._renderRevisions()}
        </div>
      </div>
    }
  }
}

export default connect(props => ({
  revisionFetch: `http://0.0.0.0:5003/page/${props.match.params.articleTitle}/${props.match.params.revisionNo}`,
}))(Revision)
