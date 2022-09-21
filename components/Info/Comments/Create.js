//Imports
import { useState, Fragment, useContext } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { Editor } from "primereact/editor";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { headerTemplate } from "../../Functions/Toolbar";
import axios from "axios";
import { loginContext } from "../../Context/context";

export default function Create({ setData, postId }) {
  //Variables
  const { isLogged, token } = useContext(loginContext);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [createDialog, setCreateDialog] = useState(false);
  //Call to action
  const toggleCreate = () => {
    setCreateDialog(!createDialog);
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
      if (data) {
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Form for create a comment
  const onSubmit = (e) => {
    e.preventDefault();
    //Data send
    const formData = { message };

    fetch(`${process.env.URL_BACKEND}/api/posts/${postId}/comment/new`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        }
        setSuccess(res.message);
        setData(formData);
        getData();
        toggleCreate();
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
      {isLogged ? (
        <Fragment>
          <Divider />

          <div className="m-auto">
            <Button onClick={toggleCreate}>Poster un commentaire</Button>
          </div>

          {createDialog ? (
            <Dialog
              className="dialog"
              header="Poster un commentaire"
              modal
              closeOnEscape
              draggable={false}
              onHide={toggleCreate}
              visible={createDialog}
            >
              <Card className="card flex justify-content-center w-auto m-auto xl:col-8 col-offset-2 lg:col-8 col-offset-2 md:col-8 col-offset-2 sm:col-10 col-offset-1">
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

                  <Button type="submit" label="Commenter" className="mt-2" />
                  <Divider />

                  {error ? <Message severity="error" text={error} /> : null}
                  {success ? (
                    <Message severity="success" text={success} />
                  ) : null}
                </form>
              </Card>
            </Dialog>
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  );
}
