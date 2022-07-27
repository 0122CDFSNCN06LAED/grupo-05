import React, { Component } from "react";

class UsersInDb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      bgColor: "",
    };
  }

  render() {
    if (!this.state.users) {
      return "Cargando...";
    }

    return (
      <div className={`row ${this.state.bgColor}`}>


        {this.state.users.map((user) => {

          return (
            <div key={user.id} className="col-lg-6 mb-4">
              <div className="card bg-dark text-white shadow">
                <div className="card-body">{user.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/api/userApiRouter");
    const usersListData = await response.json();

    this.setState({
      users: usersListData.data,
    });
  }
}

export default UsersInDb;
