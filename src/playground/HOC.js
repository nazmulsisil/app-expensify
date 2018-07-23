import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => {
  return (
    <div>
      <h1>Info</h1>
      <p>{props.info}</p>
    </div>
  );
};

const withWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>Don't share the following information.</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const AdminInfo = withWarning(Info);

const withAuthentication = WrappedComponent => {
  return props => {
    return (
      <div>
        {props.isAuthenticated ? (
          <WrappedComponent {...props} />
        ) : (
          <p>Please log in to see the details</p>
        )}
      </div>
    );
  };
};

const AuthInfo = withAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info={'This is confidential information'} />,
  document.getElementById('app')
);

// ReactDOM.render(
//   <AdminInfo isAdmin={true} info={'This is confidential information'} />,
//   document.getElementById('app')
// );
