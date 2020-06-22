import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Auth from '../components/auth/Auth';
import NotFoundPage from '../components/notFoundPage/NotFoundPage';
import FormsList from '../components/formsList/FormsList';
import FormBuilder from '../components/formBuilder/FormBuilder';
import Submit from '../components/submit/Submit';
import Submissions from '../components/submissions/Submissions';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

function AppRouter() {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/" component={Auth} exact />
        <PrivateRoute path="/forms-list" component={FormsList} exact />
        <PrivateRoute path="/form-builder" component={FormBuilder} exact />
        <PrivateRoute path="/forms/submit/:formID" component={Submit} exact />
        <PrivateRoute path="/forms/submissions/:formID" component={Submissions} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
