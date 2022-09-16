import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import axios from "axios";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";
export default function DeleteAccount({ id, setDatas, token, setIsLogged }) {
  //Variables
  const router = useRouter();
  const [deleteAccount, setDeleteAccount] = useState(false);
  const deleteAction = () => {
    setDeleteAccount(!deleteAccount);
  };

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
        localStorage.clear();
        setIsLogged(false);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Fragment>
      <Card className="flex col-4 col-offset-4">
        <Fragment>
          <h3>Suppression du compte</h3>
          <Divider />
          <Button
            className="p-button-sm p-button-outlined p-button-danger p-menubar-end-spacing"
            label="Supprimer"
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
      </Card>
    </Fragment>
  );
}
