import { Fragment, useContext } from "react";
import { Menubar } from "primereact/menubar";
import { loginContext } from "../Context/context";
import { home, logout, profil, info } from "../Functions/Icons";
import Link from "next/link";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
export default function Nav() {
  const router = useRouter();
  const { isLogged, setIsLogged, isAdmin } = useContext(loginContext);

  const logoutSession = () => {
    localStorage.clear();
    setIsLogged(false);
    router.push("/");
  };
  const adminPanel = () => {
    router.push("/admin");
  };
  const start = (
    <Link href="/">
      <a>{home}</a>
    </Link>
  );
  //Buttons navigations
  const end = (
    <div className="end">
      {isLogged ? (
        <Fragment>
          {isAdmin ? (
            <>
              <Button
                label="Admin"
                className="p-button-sm p-button-outlined p-button-info p-menubar-end-spacing"
                onClick={adminPanel}
              />
            </>
          ) : null}
          &nbsp;
          <Button
            label="Logout"
            className="p-button-sm p-button-outlined p-button-danger p-menubar-end-spacing"
            onClick={logoutSession}
          />
        </Fragment>
      ) : null}
    </div>
  );
  //Items for navbar
  const items = [
    {
      label: "Info",
      icon: info,
      url: "/info",
    },
  ];
  return (
    <Fragment>
      <Menubar className="flex" model={items} start={start} end={end} />
    </Fragment>
  );
}
