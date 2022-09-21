//Imports
import { Fragment, useContext } from "react";
import { loginContext } from "../components/Context/context";
import Login from "../components/Auth/Login";
import Profil from "../components/Profil/Profil";

export default function Home() {
  //Variables
  const { isLogged, userId } = useContext(loginContext);

  return isLogged ? (
    <Fragment>
      <Profil id={userId} />
    </Fragment>
  ) : (
    <Login />
  );
}
