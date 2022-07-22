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
                {this.state.users.map((genre) => {
                    return (
                        <div key={genre.id} className="col-lg-6 mb-4">
                            <div className="card bg-dark text-white shadow">
                                <div className="card-body">{genre.name}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    async componentDidMount() {
        const response = await fetch("http://localhost:3001/api/users");
        const usersListData = await response.json();
        this.setState({
            users: usersListData.data,
        });
    }
}

export default UsersInDb;
