import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-refetch'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Article extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.articleFetch.value) {
      const lastRevision = _.last(nextProps.articleFetch.value.revisions)
      this.setState({
        lastRevisionNo: lastRevision,
      })
    axios.get(`http://0.0.0.0:5003/page/${this.props.match.params.articleTitle}/${lastRevision}`)
    .then(res => {
      this.setState({
        lastRevisionData: res.data.data,
      })
    })
    .catch(error => {
      console.log(error)
    })
    }
  }

  handleChange = event => {
    this.setState({newData: event.target.value});
  }

  handleSubmit = event => {
    const data = {
      page: this.state.lastRevisionData
    }
    event.preventDefault();
    axios.post(`http://0.0.0.0:5003/page/${this.props.match.params.articleTitle}`,
    data,
    ).then(res => {
      if (res.data === 'success') {
        window.location.reload()
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  renderLatest () {
    const {lastRevisionData, lastRevisionNo} = this.state
    if (lastRevisionData) {
      return (
        <div>
          <div>
            <div className='header'>
              Last revision
            </div>
            <Link to={`/${this.props.match.params.articleTitle}/revisions/${lastRevisionNo}`} className='revision'>{lastRevisionNo}</Link>
          </div>
          <div className='header'>
            Content
          </div>
          <div className='revisionBox'>
            {lastRevisionData}
          </div>
        </div>
      )
    }
  }

  renderFirstRevisions () {
    let {revisions} = this.props.articleFetch.value
    var firstRevisions = revisions.slice(0, -1)

    return firstRevisions.map((revision, i) => {
      return (
        <div>
          <Link to={`/${this.props.match.params.articleTitle}/revisions/${revision}`} key={i}>{revision}</Link>
        </div>
      )
    })
  }

  renderNewInput () {
    return (
      <form>
        <label>
          <div className='header'>
            Make a new revision
          </div>
          <input
            className='input'
            type='text'
            value={this.state.newData}
            onChange={this.handleChange}
            />
        </label>
        <button className='input' onClick={this.handleSubmit}>Submit new revision</button>
      </form>
    )
  }

  render() {
    const { articleFetch } = this.props
    const { articleTitle } = this.props.match.params
    if (articleFetch.pending) {
      return (
        <div>
          Loading...
        </div>
      )
    } else if (articleFetch.rejected) {
      return (
        <div>
          Rejected...
        </div>
      )
    } else if (articleFetch.fulfilled) {
      return (
        <div>
          <Link to='/'>Home</Link>
          <div className='header'>
            Title
          </div>
          <strong>{articleTitle}</strong>
          {this.renderLatest()}
          <div className='header'>
            Other revisions
          </div>
          <div className='firstRevisions'>
            {this.renderFirstRevisions()}
          </div>
          {this.renderNewInput()}
        </div>
      )
    }
  }
}
export default connect(props => ({
  articleFetch: `http://0.0.0.0:5003/page/${props.match.params.articleTitle}`,
}))(Article)
