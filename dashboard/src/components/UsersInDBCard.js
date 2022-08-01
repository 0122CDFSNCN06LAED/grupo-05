// userInDb
import BigCard from "./BigCard";
import UsersInDb from "./UsersInDb";
import UsersDetail from "./UserDetail";
import { Route, Switch } from "react-router-dom";

export default function UsersInDbCard() {
  return (
    <BigCard title=" in database">
      <UsersInDb />
      <Switch>
        <Route path="/users/:id" exact component={UsersDetail} />
      </Switch>
    </BigCard>
  );
}
