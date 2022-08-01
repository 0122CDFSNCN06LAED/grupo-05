import UsersInDbCard from "./UsersInDbCard";
import LastProyectInDb from "./LastProyectCard";

function BigCardRow() {
  return (
    <div className="row">
      {/* <!-- Last Proyect in DB --> */}
      <LastProyectInDb />
      <UsersInDbCard/>

    </div>
  );
}

export default BigCardRow;
