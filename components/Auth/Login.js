//Imports
import { useState, useContext, Fragment } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { loginContext } from "../Context/context";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";
import { useRouter } from "next/router";
import { Card } from "primereact/card";

export default function Login() {
  //Variables
  const router = useRouter();
  const { setIsLogged, userId } = useContext(loginContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [signUpDialog, setSignUpDialog] = useState(false);
  const [resetPasswordDialog, setResetPasswordDialog] = useState(false);
  //Call to actions
  const toggleSignUp = () => {
    setSignUpDialog(!signUpDialog);
  };
  const toggleResetPassword = () => {
    setResetPasswordDialog(!resetPasswordDialog);
  };
  //onChange values for data
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  //Login form
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
    };
    axios({
      method: "post",
      url: `${process.env.URL_BACKEND}/api/auth/login`,
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        localStorage.setItem("userConnected", JSON.stringify(res));
        setSuccess("Connexion réussie");
        setIsLogged(true);
        router.push(`/${res.data.userId}`);
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
    <Fragment>
      <div className="flex justify-content-center login m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
        <Card className="card">
          <h5 className="text-center">Connexion</h5>

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
                <label>Email*</label>
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
                  feedback={false}
                />
                <label>Password*</label>
              </span>
            </div>

            <div className="field text-center">
              <a onClick={toggleSignUp}>Inscription</a>
            </div>

            <div className="field text-center">
              <a onClick={toggleResetPassword}>Mot de passe oublié ?</a>
            </div>

            <Button type="submit" label="Submit" className="mt-2" />

            <Divider />

            {error ? <Message severity="error" text={error} /> : null}
            {success ? <Message severity="success" text={success} /> : null}
          </form>
        </Card>
      </div>

      {signUpDialog ? (
        <Dialog
          className="dialog"
          header="Formulaire d'inscription"
          modal
          closeOnEscape
          draggable={false}
          onHide={toggleSignUp}
          visible={signUpDialog}
        >
          <SignUp />
        </Dialog>
      ) : null}

      {resetPasswordDialog ? (
        <Dialog
          className="dialog"
          header="Formulaire de récupération de mot de passe"
          modal
          closeOnEscape
          draggable={false}
          onHide={toggleResetPassword}
          visible={resetPasswordDialog}
        >
          <ResetPassword />
        </Dialog>
      ) : null}
    </Fragment>
  );
}
