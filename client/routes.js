import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import Lobby from './components/Lobby'
import Room from './components/Room'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Lobby} />
        <Route path="/rooms/:id" component={Room} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = () => {
  return {}
}

const mapDispatch = () => {
  return {}
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
