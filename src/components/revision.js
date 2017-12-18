import React, { Component } from 'react';
import { connect } from 'react-refetch'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

class Revision extends Component {

  constructor() {
    super()
    this.state = {}
  }

  handleChange = event => {
    this.setState({data: event.target.value});
  }

  handleSubmit = event => {
    const data = {
      page: this.state.data
    }

    event.preventDefault();
    axios.post(`http://0.0.0.0:5003/page/${this.props.match.params.articleTitle}`,
    data,
    ).then(res => {
      if (res.data === 'success') {
        this.props.history.push(`/articles/${this.props.match.params.articleTitle}`)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

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
          <div>
          title =>  <Link to={`/articles/${title}`}>{title}</Link>
          </div>
          <div>
            revision no =>  {this.props.match.params.revisionNo}
          </div>
          <form>
            <label>
              Input =>  <input type="text" value={this.state.data} onChange={this.handleChange} />
            </label>
            <button onClick={this.handleSubmit}>press</button>
          </form>
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
  postRevision: subject => ({
    postRevisionResponse: {
      url: `http://0.0.0.0:5003/page/${props.match.params.articleTitle}`,
      method: 'POST',
      body: {
        // data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
        page: JSON.stringify(subject)
      }
    }
  })
}))(Revision)
