//Imports
import { useState, Fragment } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { regexEmail } from "../Functions/Regex";
import axios from "axios";
export default function ResetPassword() {
  //Variables
  const [data, setData] = useState({
    email: "",
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
      email: data.email,
    };
    axios({
      method: "post",
      url: `${process.env.URL_BACKEND}/api/auth/emailResetPassword`,
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

  return (
    <div className="flex justify-content-center login">
      <div className="card">
        <h5 className="text-center">Récupération de mot de passe</h5>
        <form onSubmit={onSubmit} className="p-fluid">
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

          <Button type="submit" label="Submit" className="mt-2" />
          <Divider />
          {error ? <Message severity="error" text={error} /> : null}
          {success ? <Message severity="success" text={success} /> : null}
        </form>
      </div>
    </div>
  );
}
