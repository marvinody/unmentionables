import {combineReducers} from 'redux'
import lobby from './lobby'
import room from './room'
export default combineReducers({
  lobby,
  room
})
export * from './lobby'
export * from './room'
