import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import axios from "axios";
import { Fragment, useState, useContext } from "react";
import { useRouter } from "next/router";
import { loginContext } from "../Context/context";
export default function DeleteAccount({
  id,
  setDatas,
  setData,
  token,
  setIsLogged,
}) {
  //Variables
  const { isAdmin } = useContext(loginContext);
  const router = useRouter();
  const [deleteAccount, setDeleteAccount] = useState(false);
  const deleteAction = () => {
    setDeleteAccount(!deleteAccount);
  };

  async function getData() {
    try {
      const request = await fetch(
        `${process.env.URL_BACKEND}/api/users?page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
        }
      );
      const response = request;
      const res = await response.json();
      if (res) {
        setData(res.users);
        setDataLoaded(true);
      } else {
        setDataLoaded(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Delete form
  const handleDelete = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${process.env.URL_BACKEND}/api/users/${id}`,
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        setDatas(data);
        if (isAdmin === true) {
          if (router.route === "/admin") {
            router.push("/admin");
          } else {
            router.push("/");
            return alert("Compte supprimé avec succès");
          }
          getData();
        } else {
          setIsLogged(false);
          getData();
          localStorage.clear();
          router.push("/");
          return alert("Compte supprimé avec succès");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <div className="flex m-auto w-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
        <Fragment>
          <Button
            className="p-button-sm p-button-outlined p-button-danger p-menubar-end-spacing"
            label="Supprimer compte"
            onClick={deleteAction}
          />
          <Dialog
            className="dialog"
            header="Suppression du compte"
            modal
            closeOnEscape
            draggable={false}
            onHide={deleteAction}
            visible={deleteAccount}
          >
            <Message
              className="message"
              severity="warn"
              text="La suppression de votre compte entrainera la perte définitive de tous contenus liés à celui-ci"
            />
            <form className="p-fluid">
              <div className="field">
                <span className="p-buttonset">
                  <Button
                    type="submit"
                    label="Supprimer"
                    onClick={handleDelete}
                    className="p-button p-component p-button-outlined p-button-danger"
                  />
                  <Button
                    type="submit"
                    label="Annuler"
                    onClick={deleteAction}
                    className="p-button p-component p-button-outlined p-button-help"
                  />
                </span>
              </div>
              <Divider />
            </form>
          </Dialog>
        </Fragment>
      </div>
    </Fragment>
  );
}
