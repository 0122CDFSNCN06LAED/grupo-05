import { Route, Switch } from "react-router-dom";
import DashboardContent from "./DashboardContent";
import Footer from "./Footer";
import UsersInDbCard from "./UsersInDbCard";
import LastProyectInDb from "./LastProyectCard";
import ProyectsList from "./ProyectsList";
import TopBar from "./TopBar";

function MainContent() {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <TopBar />

        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={DashboardContent} />
            <Route path="/users" component={UsersInDbCard} />
            <Route path="/last-proyect" component={LastProyectInDb} />
            <Route path="/proyects" component={ProyectsList} />
          </Switch>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainContent;
