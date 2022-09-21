//Imports
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Fragment, useState, useContext } from "react";
import { loginContext } from "../../Context/context";
import { Message } from "primereact/message";
import { Editor } from "primereact/editor";
import { headerTemplate } from "../../Functions/Toolbar";
import axios from "axios";

export default function UpdateOne({
  setData,
  postId,
  commentId,
  author,
  comment,
}) {
  //Variables
  const [updatePost, setUpdatePost] = useState(false);
  const [message, setMessage] = useState(comment);
  const { isLogged, token, userId } = useContext(loginContext);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  //Call to action update comment
  const updateAction = () => {
    setUpdatePost(!updatePost);
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
    } catch (error) {
      console.log(error);
    }
  }

  //Form update comment
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = { message };

    if (message === "") {
      return setError("Votre commentaire est vide");
    }

    axios({
      method: "put",
      url: `${process.env.URL_BACKEND}/api/posts/${postId}/comment/${commentId}`,
      data: formData,
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.data.message);
        }
        setData(formData);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    setMessage("");
    setSuccess("");
    setError("");
  };

  return (
    <Fragment>
      {isLogged && userId === author ? (
        <Fragment>
          <Button
            className="p-button-sm p-button-outlined p-button-info p-menubar-end-spacing"
            label="Modifier"
            onClick={updateAction}
          />
          <Dialog
            className="dialog"
            header="Modification du commentaire"
            modal
            closeOnEscape
            draggable={false}
            onHide={updateAction}
            visible={updatePost}
          >
            <form onSubmit={onSubmit} className="p-fluid">
              <div className="field">
                <label>Commentaire</label>
                <Editor
                  value={message}
                  name="message"
                  type="text"
                  className="editor"
                  onTextChange={(e) => setMessage(e.htmlValue)}
                  headerTemplate={headerTemplate}
                  style={{ height: "320px" }}
                />
                <Divider />
              </div>

              <Button type="submit" label="Submit" className="mt-2" />
              <Divider />

              {error ? <Message severity="error" text={error} /> : null}
              {success ? <Message severity="success" text={success} /> : null}
            </form>
          </Dialog>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
