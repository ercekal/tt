import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Titles from './titles'
import Article from '../components/article'
import Revision from '../components/revision'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Titles}/>
      <Route path='/articles/:articleTitle' component={Article}/>
      <Route path='/:articleTitle/revisions/:revisionNo' component={Revision}/>
    </Switch>
  </main>
)

export default Main
