import { Route, Switch } from 'wouter'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { MyProfile } from './pages/MyProfile'

export function App () {
  return (
    <>
      <Header />
      <div className='mt-20' />
      <Switch>
        <Route path='/profile' component={MyProfile} />
        <Route path='/' component={Home} />
      </Switch>
      <Footer />
    </>
  )
}
