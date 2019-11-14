import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './components/App/index';
import Admin from './components/Admin/index';

export default router => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/Admin" component={Admin} />
    </div>
  </Router>
);
