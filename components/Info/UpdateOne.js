import { Fragment, useState, useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Editor } from "primereact/editor";
import { Dialog } from "primereact/dialog";
import { headerTemplate } from "../Functions/Toolbar";
import { loginContext } from "../Context/context";
import { useRouter } from "next/router";
export default function UpdateOne({
  postId,
  token,
  setData,
  title,
  message,
  image,
  author,
}) {
  const [titlePost, setTitlePost] = useState(title);
  const [messagePost, setMessagePost] = useState(message);
  const [imagePost, setImagePost] = useState(image);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { isLogged, userId } = useContext(loginContext);
  const router = useRouter();

  const [updateDialog, setUpdateDialog] = useState(false);
  const toggleUpdate = () => {
    setUpdateDialog(!updateDialog);
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
    const formData = new FormData();
    formData.append("title", titlePost);
    formData.append("message", messagePost);
    if (imagePost !== null) {
      formData.append("image", imagePost);
    }

    fetch(`${process.env.URL_BACKEND}/api/posts/${postId}`, {
      method: "PUT",
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
        router.push(`/info/${postId}`);
      })
      .catch((error) => {
        console.log(error);
      });
    setTitlePost("");
    setMessagePost("");
    setImagePost("");
  };

  return (
    <Fragment>
      {isLogged && author === userId ? (
        <Fragment>
          <Button
            className="p-button-sm p-button-outlined p-button-info p-menubar-end-spacing"
            label="Modifier"
            onClick={toggleUpdate}
          />
          &nbsp;
          <Dialog
            className="dialog flex justify-content-center"
            header="Modification d'une info"
            modal
            closeOnEscape
            draggable={false}
            onHide={toggleUpdate}
            visible={updateDialog}
          >
            <Divider />
            <Card className="m-auto w-auto flex justify-content-center xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
              <form onSubmit={onSubmit} className="p-fluid">
                <div className="field">
                  <label>Titre</label>
                  <InputText
                    name="title"
                    value={titlePost}
                    type="text"
                    onChange={(e) => setTitlePost(e.target.value)}
                    placeholder="Titre du post*"
                  />
                  <Divider />
                  <label>Message</label>
                  <Editor
                    value={messagePost}
                    name="message"
                    type="text"
                    className="editor"
                    placeholder="Contenu du message*"
                    onTextChange={(e) => setMessagePost(e.htmlValue)}
                    headerTemplate={headerTemplate}
                    style={{ height: "200px" }}
                  />
                  <Divider />
                  <Divider />
                  <label>Fichier Image</label>
                  <FileUpload
                    mode="basic"
                    name="image"
                    uploadLabel={image}
                    chooseLabel="Ajouter une image"
                    onSelect={(e) => setImagePost(e.files[0])}
                    value={imagePost?.name}
                    type="file"
                  />
                </div>
                <Divider />

                <Button type="submit" label="Poster" className="mt-2" />
                <Divider />
                {error ? <Message severity="error" text={error} /> : null}
                {success ? <Message severity="success" text={success} /> : null}
              </form>
            </Card>
          </Dialog>
        </Fragment>
      ) : null}
    </Fragment>
  );
}
