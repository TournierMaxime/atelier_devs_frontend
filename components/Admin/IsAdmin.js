import { Fragment, useState, useContext } from "react";
import { Button } from "primereact/button";
import { loginContext } from "../../components/Context/context";
export default function IsAdmin({ adminRights, setData }) {
  const { token } = useContext(loginContext);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getData() {
    try {
      const request = await fetch(
        `${process.env.URL_BACKEND}/api/users?page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
        }
      );
      const response = request;
      const res = await response.json();
      if (res) {
        setData(res.users);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { isAdmin };
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ` + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(
      `${process.env.URL_BACKEND}/api/admin/${adminRights.id}/setRole`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsAdmin(!isAdmin);
        getData();
      })
      .catch((error) => console.log(error));
  };
  return (
    <Fragment>
      {adminRights.isAdmin === false ? (
        <Button
          onClick={handleSubmit}
          label="Ajouter"
          className="p-button-sm p-button-outlined p-button-success p-menubar-end-spacing"
        />
      ) : (
        <Button
          onClick={handleSubmit}
          label="Retirer"
          className="p-button-sm p-button-outlined p-button-danger p-menubar-end-spacing"
        />
      )}
    </Fragment>
  );
}
