//Imports
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { regexPassword } from "../Functions/Regex";
import { Card } from "primereact/card";

export default function ResetPasswordAccount({ id }) {
  //Variables
  const [data, setData] = useState({
    password: "",
    confirmNewPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [dataLoaded, setDataLoaded] = useState(true);

  //onChange data
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  //Creation post form
  const onSubmitPassword = (e) => {
    e.preventDefault();
    //Data send
    const formData = {
      password: data.password,
      confirmNewPassword: data.confirmNewPassword,
    };

    if (data.password === "" && data.confirmNewPassword === "") {
      return setError("Veuillez renseigner tous les champs");
    }

    if (data.password !== data.confirmNewPassword) {
      return setError("Les mots de passe ne correspondent pas");
    }

    axios({
      url: `${process.env.URL_BACKEND}/api/auth/resetPassword/${id}`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSuccess(res.data.message);
        setData(data.password);
      })
      .catch((error) => {
        if (error.response.data.error) {
          setError(error.response.data.error);
        }
      });
    setError("");
    setSuccess("");
  };

  //Message password prerequires
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

  //Update the state
  useEffect(() => {
    //Retrieve data for a single movie
    async function getDatas() {
      try {
        const response = await axios.get(`
${process.env.URL_BACKEND}/api/auth/resetPassword/${id}`);
        const data = response.data;
        if (data) {
          setDataLoaded(false);
        } else {
          setDataLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDatas();
  }, []); //eslint-disable-line

  return (
    <Fragment>
      {dataLoaded ? (
        <div className="flex justify-content-center login m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
          <Message className="message" severity="error" text="Aucune donnée" />
        </div>
      ) : (
        <Fragment>
          <div className="flex justify-content-center login m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
            <Card className="card flex justify-content-center">
              <h5 className="text-center">Récupération de mot de passe</h5>

              <form onSubmit={onSubmitPassword} className="p-fluid">
                <div className="field">
                  <label>Nouveau mot de passe</label>
                  <Password
                    name="password"
                    value={data.password}
                    type="password"
                    onChange={handleChange}
                    toggleMask
                    placeholder="Nouveau mot de passe"
                  />
                  {regexPassword.test(data.password) === false ? (
                    <small
                      className="p-error"
                      style={{ display: data.password ? null : "none" }}
                    >
                      Le mot de passe doit contenir au moins : 8 caractères
                      minimum, une majuscule, une minuscule, un chiffre, et un
                      caractère spécial
                    </small>
                  ) : (
                    <small className="p-success">Password valide</small>
                  )}
                  <Divider />

                  <label>Confirmez mot de passe</label>
                  <Password
                    name="confirmNewPassword"
                    value={data.confirmNewPassword}
                    type="password"
                    onChange={handleChange}
                    toggleMask
                    placeholder="Confirmez mot de passe"
                  />
                  {regexPassword.test(data.confirmNewPassword) === false ? (
                    <small
                      className="p-error"
                      style={{
                        display: data.confirmNewPassword ? null : "none",
                      }}
                    >
                      Le mot de passe doit contenir au moins : 8 caractères
                      minimum, une majuscule, une minuscule, un chiffre, et un
                      caractère spécial
                    </small>
                  ) : (
                    <small className="p-success">Password valide</small>
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
