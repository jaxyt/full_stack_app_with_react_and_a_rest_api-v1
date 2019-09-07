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
import CourseDetail from './components/CourseDetail';
import NotFound from './components/NotFound';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';

// New Imports
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Contexts
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Public);
const CourseDetailWithContext = withContext(CourseDetail);

function App() {
  return (
    <Router>
      <div>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <PrivateRoute path="/authenticated" component={AuthWithContext} />
          <Route path='/signin' component={UserSignInWithContext} />
          <Route path='/signup' component={UserSignUpWithContext} />
          <Route path='/signout' component={UserSignOutWithContext} />
          <Route component={NotFound} />
        </Switch>
      </div> 
    </Router>

  );
}

export default App;
