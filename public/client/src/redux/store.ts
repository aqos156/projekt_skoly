import reducer from "./reducer"
import { applyMiddleware, createStore } from "redux"
import { createLogger } from "redux-logger"

const getMiddleware = () => {
  if (process.env.NODE_ENV != "production") {
    return applyMiddleware(createLogger())
  }
  return applyMiddleware()
}

const store = createStore(reducer, getMiddleware())

export default store
