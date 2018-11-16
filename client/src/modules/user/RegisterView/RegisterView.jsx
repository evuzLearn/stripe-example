import React, { PureComponent } from 'react';

import './RegisterView.css';

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
          <button type="button" onClick={() => console.log('click')}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default RegisterView;
