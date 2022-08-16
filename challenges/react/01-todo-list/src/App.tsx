import { Fragment } from 'react'
import { Header } from './components/Header'
import { TodoList } from './components/TodoList'

import "./styles/global.css"

export const App = () => {
  return (
    <Fragment>
      <Header />
      <TodoList />
    </Fragment>
  )
}
