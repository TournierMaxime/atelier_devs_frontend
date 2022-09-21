//Imports
import { Fragment, useState } from "react";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import axios from "axios";
import { regexPassword } from "../Functions/Regex";

export default function UpdatePassword({ id, datas, setDatas, token }) {
  //Variables
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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

  //Creation post form
  const onSubmitPassword = (e) => {
    e.preventDefault();
    //Data send
    const formData = {
      password: newPassword,
      confirmNewPassword: confirmNewPassword,
    };

    if (newPassword === "" && confirmNewPassword === "") {
      return setError("Veuillez renseigner tous les champs");
    }

    axios({
      url: `${process.env.URL_BACKEND}/api/users/${id}/setPassword`,
      method: "PUT",
      data: formData,
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSuccess(res.data.message);
        setDatas(newPassword);
        getData();
      })
      .catch((error) => {
        if (error.response.data.error) {
          setError(error.response.data.error);
        }
      });
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setSuccess("");
  };

  return (
    <Fragment>
      <Card className="boxShadow flex justify-content-center m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
        <form onSubmit={onSubmitPassword} className="p-fluid">
          <h3>Modifier Mot de Passe</h3>
          <Divider />

          <div className="field">
            <label>Nouveau mot de passe</label>
            <Password
              name="password"
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
              toggleMask
            />
            {regexPassword.test(newPassword) === false ? (
              <small
                className="p-error"
                style={{ display: newPassword ? null : "none" }}
              >
                Le mot de passe doit contenir au moins : 8 caractères minimum,
                une majuscule, une minuscule, un chiffre, et aucun espace
              </small>
            ) : (
              <small className="p-success">Password valide.</small>
            )}
            <Divider />

            <label>Confirmez mot de passe</label>
            <Password
              name="confirmNewPassword"
              value={confirmNewPassword}
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirmez mot de passe"
              toggleMask
            />
            {regexPassword.test(confirmNewPassword) === false ? (
              <small
                className="p-error"
                style={{ display: newPassword ? null : "none" }}
              >
                Le mot de passe doit contenir au moins : 8 caractères minimum,
                une majuscule, une minuscule, un chiffre, et aucun espace
              </small>
            ) : (
              <small className="p-success">Password valide.</small>
            )}
          </div>
          <Divider />

          <Button
            type="submit"
            label="Modifier mot de passe"
            className="mt-2"
          />

          <Divider />

          {error ? <Message severity="error" text={error} /> : null}
          {success ? <Message severity="success" text={success} /> : null}
        </form>
      </Card>
    </Fragment>
  );
}
