import { useContext } from "react";
import { loginContext } from "../components/Context/context";
import Login from "../components/Auth/Login";
export default function Home() {
  //Variables
  const { isLogged, setIsLogged } = useContext(loginContext);
  return isLogged ? null : <Login />;
}
