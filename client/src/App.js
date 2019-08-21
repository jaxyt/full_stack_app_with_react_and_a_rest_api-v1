import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// global components
import Header from './components/Header';

// route components
import Public from './components/Public';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Public} />
          <Route path="/authenticated" component={Authenticated} />
          <Route path='/signin' component={UserSignIn} />
          <Route path='/signup' component={UserSignUp} />
          <Route path='/signout' component={UserSignOut} />
          <Route component={NotFound} />
        </Switch>
      </div> 
    </Router>

  );
}

export default App;
