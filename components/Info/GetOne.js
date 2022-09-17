import { Card } from "primereact/card";
import { Fragment, useContext, useState } from "react";
import { Divider } from "primereact/divider";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import moment from "moment";
import parse from "html-react-parser";
import { loginContext } from "../Context/context";
import { Message } from "primereact/message";
import UpdateOne from "./UpdateOne";
import DeleteOne from "./DeleteOne";
export default function GetOne({ data, id }) {
  const { isLogged, userId, token } = useContext(loginContext);
  const [datas, setDatas] = useState([]);
  const [dataloaded, setDataLoaded] = useState(true);

  //Retrieve data post
  async function getData() {
    try {
      const request = await fetch(
        `${process.env.URL_BACKEND}/api/posts/${id}`,
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
        setDatas(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <Divider />
      <div className="grid">
        <Card
          title={data.title}
          style={{ width: "50em" }}
          className="flex justify-content-center m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1"
        >
          <Chip
            label={`${
              data.User?.firstname +
              " - " +
              moment(data.created).format("DD/MM/YYYY à HH:MM:SS")
            }`}
            image={data.User?.image}
          />
          {parse(data.message)}
          {data.image ? <Image src={data.image} alt={data.image} /> : null}
          <Divider />
          {isLogged ? (
            <>
              <Button
                className="p-button-sm p-button-outlined p-button-success p-menubar-end-spacing"
                label="Commenter"
              />
              &nbsp;
            </>
          ) : (
            <Message
              text="Vous devez &ecirc;tre connecté pour poster un commentaire"
              severity="warn"
            />
          )}
          {isLogged && userId === data.userId ? (
            <>
              <UpdateOne
                postId={data.id}
                author={data.userId}
                token={token}
                setData={setDatas}
                title={data.title}
                message={data.message}
                image={data.image ? data.image : null}
              />
              <DeleteOne
                setData={setDatas}
                postId={data.id}
                author={data.userId}
              />
            </>
          ) : null}
        </Card>
      </div>
      <Divider />
    </Fragment>
  );
}
