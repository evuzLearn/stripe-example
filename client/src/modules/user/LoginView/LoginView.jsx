import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import './LoginView.css';

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

class LoginView extends PureComponent {
  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation mutation={loginMutation}>
        {mutate => (
          <div className="LoginView">
            <div>
              <input
                type="text"
                placeholder="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={async () => {
                  const response = await mutate({
                    variables: this.state,
                  });
                  console.log(response);
                  this.props.history.push('/me');
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default LoginView;
