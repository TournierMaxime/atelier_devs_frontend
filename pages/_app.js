//Imports
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import { loginContext } from "../components/Context/context";
import { useState, useEffect } from "react";
import Nav from "../components/Base/Nav";
import Footer from "../components/Base/Footer";

function MyApp({ Component, pageProps }) {
  //Variables
  const [isLogged, setIsLogged] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);

  //Login check
  const loggedCheck = () => {
    //localStorage data user
    const userConnected = localStorage.getItem("userConnected");

    //If data we check the content
    if (userConnected) {
      const getUserConnected = JSON.parse(
        localStorage.getItem("userConnected")
      );
      setIsLogged(true);
      setToken(getUserConnected.data.token);
      setIsAdmin(getUserConnected.data.isAdmin);
      setFirstname(getUserConnected.data.firstname);
      setLastname(getUserConnected.data.lastname);
      setUserId(getUserConnected.data.userId);
      setImage(getUserConnected.data.image);
    }

    //else all states are reset
    if (!userConnected) {
      setIsLogged(false);
      setToken(null);
      setIsAdmin(null);
      setFirstname(null);
      setLastname(null);
      setUserId(null);
      setImage(null);
    }
  };

  //Update the state
  useEffect(loggedCheck, [
    isLogged,
    token,
    isAdmin,
    firstname,
    lastname,
    userId,
    image,
  ]);

  return (
    <loginContext.Provider
      value={{
        isLogged,
        setIsLogged,
        token,
        setToken,
        userId,
        isAdmin,
        firstname,
        lastname,
        image,
      }}
    >
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </loginContext.Provider>
  );
}

export default MyApp;
