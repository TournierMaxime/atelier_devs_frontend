import { Fragment, useState } from "react";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { regexEmail } from "../Functions/Regex";
import axios from "axios";
export default function UpdateEmail({ id, datas, setDatas, token }) {
  const [email, setEmail] = useState("");
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
  const onSubmitEmail = (e) => {
    e.preventDefault();
    const formData = { email };
    if (email === "") {
      return setError("Veuillez renseigner le champs email");
    }
    axios({
      url: `${process.env.URL_BACKEND}/api/users/${id}/setEmail`,
      method: "PUT",
      data: formData,
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSuccess(res.data.message);
        setDatas(email);
        getData();
      })
      .catch((error) => {
        if (error.response.data.error) {
          setError(error.response.data.error);
        }
      });
    setEmail("");
    setError("");
    setSuccess("");
  };
  return (
    <Fragment>
      <Card className="flex p-0 m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
        <form onSubmit={onSubmitEmail} className="p-fluid">
          <h3>Modifier Email</h3>
          <Divider />
          <div className="field">
            <label>Email</label>
            <InputText
              name="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nouvelle adresse mail"
            />
            {regexEmail.test(email) === false ? (
              <small
                className="p-error"
                style={{ display: email ? null : "none" }}
              >
                Erreur email non valide
              </small>
            ) : (
              <small className="p-success">Email valide.</small>
            )}
          </div>
          <Divider />
          <Button type="submit" label="Modifier Email" className="mt-2" />
          <Divider />
          {error ? <Message severity="error" text={error} /> : null}
          {success ? <Message severity="success" text={success} /> : null}
        </form>
      </Card>
    </Fragment>
  );
}
