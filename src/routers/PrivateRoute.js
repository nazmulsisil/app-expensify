import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = props => {
  const { component: ComponentToRender, isAuthenticated, ...rest } = props;
  // console.log(<ComponentToRender />);
  const decideIfShouldShowComponent = props => {
    return isAuthenticated ? (
      <div>
        <Header />
        <ComponentToRender {...props} />
      </div>
    ) : (
      <Redirect to="/" />
    );
  };
  return (
    <div>
      <Route {...rest} component={decideIfShouldShowComponent} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.uid
  };
};

export default connect(mapStateToProps)(PrivateRoute);
