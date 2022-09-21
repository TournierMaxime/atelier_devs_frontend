//Imports
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Fragment, useState, useContext } from "react";
import { loginContext } from "../../Context/context";
import { Message } from "primereact/message";
import axios from "axios";
import { useRouter } from "next/router";

export default function DeleteOne({
  setData,
  setDatas,
  commentId,
  author,
  postId,
}) {
  //Variables
  const router = useRouter();
  const [deleteComment, setDeleteComment] = useState(false);
  const { isLogged, token, userId, isAdmin } = useContext(loginContext);
  const [error, setError] = useState(null);
  //Call to action for delete a comment
  const deleteAction = () => {
    setDeleteComment(!deleteComment);
  };

  //Retrieve data comments
  async function getData() {
    try {
      const request = await fetch(
        `${process.env.URL_BACKEND}/api/posts/${postId}/comments?page=1`,
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
      setDatas(data.comments);
    } catch (error) {
      console.log(error);
    }
  }
  //Form delete comment
  const handleDelete = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${process.env.URL_BACKEND}/api/posts/comment/${commentId}`,
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
      .then((data) => {
        if (isAdmin === true) {
          setData(data);
          getData();
          if (router.route === "/admin") {
            router.push("/admin");
          } else {
            router.push(router.asPath);
          }
        } else {
          setData(data);
          getData();
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
          &nbsp;
          <Dialog
            className="dialog"
            header="Supprimer un commentaire"
            modal
            closeOnEscape
            draggable={false}
            onHide={deleteAction}
            visible={deleteComment}
          >
            <Message
              className="message"
              severity="warn"
              text={`La suppression de ce commentaire entrainera la perte définitive de celui-ci`}
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
