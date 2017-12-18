import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch'
import { Link } from 'react-router-dom'
import axios from 'axios'

const DOMAIN = 'http://0.0.0.0:5003/page/'
class Article extends Component {

  static propTypes = {
    articleFetch: PropTypes.instanceOf(PromiseState).isRequired,
    postRevision: PropTypes.func.isRequired,
    postRevisionResponse: PropTypes.instanceOf(PromiseState),
  }

  state = {
    newData: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.articleFetch.value) {
      const lastRevisionNo = _.last(nextProps.articleFetch.value.revisions)
      this.setState({
        lastRevisionNo,
      })
    axios.get(`${DOMAIN}${this.props.match.params.articleTitle}/${lastRevisionNo}`)
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

  _checkResponse () {
    const {postRevisionResponse} = this.props
    console.log(postRevisionResponse.fulfilled)
    // if (postRevisionResponse) {
    //   if (postRevisionResponse.meta.response.status === 200) {
    //     window.location.reload()
    //   } else {
    //     console.log(postRevisionResponse.meta.response.status)
    //   }
    // }
  }

  handleSubmit = event => {
    event.preventDefault();
    // const data ={
    //   page: this.state.newData
    // }
    // axios.post(`${DOMAIN}${this.props.match.params.articleTitle}`,
    // data
    // ).then(res => {
    //   if (res.data === 'success') {
    //     window.location.reload()
    //   }
    // })
    // .catch(err => {
    //   console.log(err)
    // })

    this.props.postRevision(this.state.newData)
    setTimeout(() => {
      this._checkResponse, 4000
    })
    const {postRevisionResponse} = this.props
    console.log(postRevisionResponse)
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
            <Link
              className='revision'
              to={`/${this.props.match.params.articleTitle}/revisions/${lastRevisionNo}`}>
              {lastRevisionNo}
            </Link>
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
          <Link
            key={i}
            to={`/${this.props.match.params.articleTitle}/revisions/${revision}`}
            >
            {revision}
          </Link>
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
        <button
          className='input'
          onClick={this.handleSubmit}
          >
          Submit new revision
        </button>
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
  articleFetch: `${DOMAIN}${props.match.params.articleTitle}`,
  postRevision: page => ({
    postRevisionResponse: {
      url: `${DOMAIN}${props.match.params.articleTitle}`,
      method: 'POST',
      body: JSON.stringify({ page }),
    }
  })
}))(Article)
