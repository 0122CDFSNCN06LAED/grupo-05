import React, { Component } from "react";
import UsersInDbCard from "./UsersInDbCard"

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      bgColor: "",
    };
  }

  render() {
    if (!this.state.user) {
      return "Cargando...";
    }
    return (
      <UsersInDbCard title="Detalle Usuario"> 
        <h3>{this.state.user.name}</h3>
        <div className="text-center">
        </div>
        <p>
          {this.state.user}
        </p>
      </UsersInDbCard>
    );
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/userApiRouter");
    const usersListData = await response.json();
    console.log('usuarioss', usersListData)

    this.setState({
      users: usersListData.data,
    });
  }
  
}

export default UserDetail;