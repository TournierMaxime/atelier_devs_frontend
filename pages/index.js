import { Fragment, useContext } from "react";
import { loginContext } from "../components/Context/context";
import Login from "../components/Auth/Login";
import Profil from "../components/Profil/Profil";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
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
