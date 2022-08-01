import React, { Component } from "react";
import { useParams } from "react-router-dom"

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: null,
      username: null,
      email: null,
      bgColor: "",
    };
  }

  render() {
    /* if (!this.state.user) {
      return "Cargando...";
    } */
    return (
      <div>
        <div className="text-center">
        </div>
        <p>
          {this.state.name}
        </p>
        <p>
          {this.state.username}
        </p>
        <p>
          {this.state.email}
        </p>
      </div>
    );
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/userApiRouter");
    const usersListData = await response.json();

    console.log('usuarioss', usersListData)
    const users = usersListData.data;
    console.log('userrsss', users)
    const { id } = this.props.match.params;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        this.setState({
          name: users[i].name,
        });
        this.setState({
          username: users[i].username,
        });
        this.setState({
          email: users[i].email,
        });
      }
    }
    this.setState({
      users: usersListData.data,
    });

  }

}

export default UserDetail;