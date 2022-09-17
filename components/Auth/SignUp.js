//Imports
import { useState, Fragment } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { regexNames, regexEmail, regexPassword } from "../Functions/Regex";
import axios from "axios";
export default function SignUp() {
  //Variables
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  //onChange data
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  //SignUp form
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    };
    axios({
      method: "post",
      url: `${process.env.URL_BACKEND}/api/auth/signup`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      //.then((response) => response.json())
      .then((res) => {
        if (res.data.message) {
          setSuccess(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response.data.error) {
          setError(error.response.data.error);
        }
      });
    setError("");
    setSuccess("");
  };
  const footer = (
    <Fragment>
      <Divider />
      <p className="mt-2">Le mot de passe doit contenir au moins :</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Au moins une majuscule</li>
        <li>Au moins une minuscule</li>
        <li>Au moins un chiffre</li>
        <li>Au moins un caractère spécial : (@, #, !, ?...)</li>
        <li>8 caractères minimum</li>
      </ul>
    </Fragment>
  );
  return (
    <div className="flex justify-content-center login m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
      <Card className="card">
        <h5 className="text-center">Inscription</h5>
        <form onSubmit={onSubmit} className="p-fluid">
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-user" />
              <InputText
                name="lastname"
                value={data.lastname}
                type="text"
                onChange={handleChange}
                placeholder="Nom*"
              />
              <label>Nom</label>
              {regexNames.test(data.lastname) === false ? (
                <small
                  className="p-error"
                  style={{ display: data.lastname ? null : "none" }}
                >
                  <Message
                    className="message"
                    severity="error"
                    text="Merci de vérifier votre nom, 3 caractères minimum requis avec des lettres uniquement"
                  />
                </small>
              ) : (
                <small className="p-success">Nom valide</small>
              )}
            </span>
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-user" />
              <InputText
                name="firstname"
                value={data.firstname}
                type="text"
                onChange={handleChange}
                placeholder="Prénom*"
              />
              <label>Prénom</label>
              {regexNames.test(data.firstname) === false ? (
                <small
                  className="p-error"
                  style={{ display: data.firstname ? null : "none" }}
                >
                  <Message
                    className="message"
                    severity="error"
                    text="Merci de vérifier votre prénom, 3 caractères minimum requis avec des lettres uniquement"
                  />
                </small>
              ) : (
                <small className="p-success">Prénom valide</small>
              )}
            </span>
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-envelope" />
              <InputText
                name="email"
                value={data.email}
                type="email"
                onChange={handleChange}
                placeholder="Email*"
              />
              <label>Email</label>
              {regexEmail.test(data.email) === false ? (
                <small
                  className="p-error"
                  style={{ display: data.email ? null : "none" }}
                >
                  <Message
                    className="message"
                    severity="error"
                    text="Merci de vérifier votre email, format invalide"
                  />
                </small>
              ) : (
                <small className="p-success">Email valide</small>
              )}
            </span>
          </div>
          <div className="field">
            <span className="p-float-label">
              <Password
                name="password"
                value={data.password}
                onChange={handleChange}
                toggleMask
                type="password"
                placeholder="Password*"
                footer={footer}
              />
              <label>Password</label>
              {regexPassword.test(data.password) === false ? (
                <small
                  className="p-error"
                  style={{ display: data.password ? null : "none" }}
                >
                  <Message
                    className="message"
                    severity="error"
                    text="Le mot de passe doit contenir au moins : 8 caractères minimum, une majuscule, une minuscule, un chiffre, et un caractère spécial"
                  />
                </small>
              ) : (
                <small className="p-success">Password valide</small>
              )}
            </span>
          </div>

          <Button type="submit" label="Submit" className="mt-2" />
          <Divider />
          {error ? <Message severity="error" text={error} /> : null}
          {success ? <Message severity="success" text={success} /> : null}
        </form>
      </Card>
    </div>
  );
}
