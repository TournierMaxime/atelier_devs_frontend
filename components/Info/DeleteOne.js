//Imports
import { loginContext } from "../Context/context";
import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import { Fragment, useState, useContext } from "react";
import { useRouter } from "next/router";

export default function DeleteOne({ setData, setDatas, postId, author }) {
  //Variables
  const router = useRouter();
  const { isLogged, token, userId, isAdmin } = useContext(loginContext);
  const [deletePost, setDeletePost] = useState(false);
  const [error, setError] = useState("");

  //Call to action
  const deleteAction = () => {
    setDeletePost(!deletePost);
  };

  //Retrieve data posts
  async function getData() {
    try {
      const request = await fetch(
        `${process.env.URL_BACKEND}/api/posts?page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = request;
      const data = await response.json();
      setData(data);
      setDatas(data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  //Delete button form
  const handleDelete = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${process.env.URL_BACKEND}/api/posts/${postId}`,
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
      .then((data) => {
        setData(data);
        getData();
        if (isAdmin === true) {
          if (router.route === "/admin") {
            router.push("/admin");
          } else {
            router.push("/info");
          }
        } else {
          router.push("/info");
          return alert("Post supprimé avec succès");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      {(isLogged && userId === author) || isAdmin === true ? (
        <Fragment>
          <Button
            className="p-button-sm p-button-outlined p-button-danger p-menubar-end-spacing"
            label="Supprimer"
            onClick={deleteAction}
          />

          <Dialog
            className="dialog"
            header="Supprimer un post"
            modal
            closeOnEscape
            draggable={false}
            onHide={deleteAction}
            visible={deletePost}
          >
            <Message
              className="message"
              severity="warn"
              text="La suppression de ce post entrainera la perte définitive de tous contenus y compris les réponses liés à celui-ci"
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

              {error ? <Message severity="error" text={error} /> : null}
            </form>
          </Dialog>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
