//Imports
import { Fragment, useState } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Editor } from "primereact/editor";
import { headerTemplate } from "../Functions/Toolbar";
import { Dialog } from "primereact/dialog";

export default function Create({ isLogged, token, setData }) {
  //Variables
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [createDialog, setCreateDialog] = useState(false);

  //Call to action
  const toggleCreate = () => {
    setCreateDialog(!createDialog);
  };

  //Retrieve data post
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
      const res = await response.json();
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Creation post form
  const onSubmit = (e) => {
    e.preventDefault();
    //Data send
    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("image", image);

    if (title === "" || message === null) {
      return setError(
        "Le titre et le contenu du post n'ont pas été renseignés"
      );
    }

    fetch(`${process.env.URL_BACKEND}/api/posts/new`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(res.message);
        }
        setData(formData);
        getData();
        setError("");
        setSuccess("");
        if (title !== "" || message !== null) {
          toggleCreate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTitle("");
    setMessage("");
    setImage("");
  };
  return (
    <Fragment>
      {isLogged ? (
        <Fragment>
          <Divider />
          <div className="col-6 offset-col-3 m-auto flex justify-content-center">
            <Button onClick={toggleCreate}>Poster du contenu</Button>
          </div>
          {createDialog ? (
            <Dialog
              className="dialog"
              header="Creer une info"
              modal
              closeOnEscape
              draggable={false}
              onHide={toggleCreate}
              visible={createDialog}
            >
              <Card className="card w-auto flex justify-content-center m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
                <form onSubmit={onSubmit} className="p-fluid">
                  <div className="field">
                    <label>Titre</label>
                    <InputText
                      name="title"
                      value={title}
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Titre du post*"
                    />
                    <Divider />

                    <label>Message</label>
                    <Editor
                      value={message}
                      name="message"
                      type="text"
                      className="editor"
                      placeholder="Contenu du message*"
                      onTextChange={(e) => setMessage(e.htmlValue)}
                      headerTemplate={headerTemplate}
                      style={{ height: "320px" }}
                    />

                    <Divider />
                    <Divider />

                    <label>Fichier Image</label>
                    <FileUpload
                      mode="basic"
                      name="image"
                      chooseLabel="Ajouter une image"
                      onSelect={(e) => setImage(e.files[0])}
                      value={image.name}
                      type="file"
                    />
                  </div>
                  <Divider />

                  <Button type="submit" label="Poster" className="mt-2" />
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
