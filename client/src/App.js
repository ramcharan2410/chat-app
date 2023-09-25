import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <ProtectedRoute exact component={Home} path="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
