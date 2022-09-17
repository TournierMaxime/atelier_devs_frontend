import { Fragment, useState } from "react";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { regexNames } from "../Functions/Regex";
export default function UpdateData({ id, datas, setDatas, token }) {
  //Variables
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //Retrieve data post
  async function getData() {
    try {
      const request = await fetch(
        `${process.env.URL_BACKEND}/api/users/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ` + token,
            "Content-Type": "application/json",
          },
        }
      );
      const response = request;
      const res = await response.json();
      setDatas(res);
    } catch (error) {
      console.log(error);
    }
  }

  //Maj data user
  const onSubmitUser = (e) => {
    e.preventDefault();
    const formData = new FormData();
    //Verifications des champs
    if (firstname !== "") {
      formData.append("firstname", firstname);
    }
    if (lastname !== "") {
      formData.append("lastname", lastname);
    }
    if (image !== "") {
      formData.append("image", image);
    }
    if (image === "" && firstname === "" && lastname === "") {
      return setError("Veuillez renseigner au moins un champs");
    }
    fetch(`${process.env.URL_BACKEND}/api/users/${id}`, {
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
        setDatas(formData);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    setFirstname("");
    setLastname("");
    setImage("");
    setError("");
    setSuccess("");
  };
  return (
    <Fragment>
      <Card className="flex m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
        <form onSubmit={onSubmitUser} className="p-fluid">
          <h3>Modifier Profil</h3>
          <Divider />
          <div className="field">
            <label>Prénom</label>
            <InputText
              name="firstname"
              value={firstname}
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Nouveau prénom"
            />
            {regexNames.test(firstname) === false && firstname !== null ? (
              <small
                className="p-error"
                style={{ display: firstname ? null : "none" }}
              >
                Merci de vérifier votre prénom, 3 caractères minimum requis avec
                des lettres et des chiffres
              </small>
            ) : (
              <small className="p-success">Prénom valide.</small>
            )}
            <Divider />
            <label>Nom</label>
            <InputText
              name="lastname"
              value={lastname}
              type="text"
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Nouveau nom"
            />
            {regexNames.test(lastname) === false && lastname !== null ? (
              <small
                className="p-error"
                style={{ display: lastname ? null : "none" }}
              >
                Merci de vérifier votre nom, 3 caractères minimum requis avec
                des lettres et des chiffres
              </small>
            ) : (
              <small className="p-success">Nom valide.</small>
            )}
            <Divider />
            <Fragment>
              <div className="flex align-items-center justify-content-start">
                <Avatar
                  shape="circle"
                  imageAlt={datas.user?.firstname}
                  image={datas.user?.image}
                />

                <Divider layout="vertical" />

                <FileUpload
                  className="col-5"
                  mode="basic"
                  name="image"
                  chooseLabel="Changer image profil"
                  onSelect={(e) => setImage(e.files[0])}
                  value={image.name}
                  type="file"
                />
              </div>
            </Fragment>
          </div>
          <Divider />
          <Button type="submit" label="Modifier" className="mt-2" />
          <Divider />
          {error ? <Message severity="error" text={error} /> : null}
          {success ? <Message severity="success" text={success} /> : null}
        </form>
      </Card>
    </Fragment>
  );
}
