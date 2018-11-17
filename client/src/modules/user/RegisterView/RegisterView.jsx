import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import './RegisterView.css';

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`;

class RegisterView extends PureComponent {
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
      <Mutation mutation={registerMutation}>
        {mutate => (
          <div className="RegisterView">
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
                  this.props.history.push('/login');
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default RegisterView;
