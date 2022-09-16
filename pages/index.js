import { useContext } from "react";
import { loginContext } from "../components/Context/context";
import Login from "../components/Auth/Login";
import Profil from "../components/Profil/Profil";
export default function Home() {
  //Variables
  const { isLogged } = useContext(loginContext);
  return isLogged ? <Profil /> : <Login />;
}
