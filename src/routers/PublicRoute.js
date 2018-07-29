import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = props => {
  const { isAuthenticated, component: ComponentToRender, ...rest } = props;
  const decideIfShouldShowComponent = props => {
    return isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <ComponentToRender {...props} />
    );
  };

  return <Route {...rest} component={decideIfShouldShowComponent} />;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.uid
  };
};

export default connect(mapStateToProps)(PublicRoute);
