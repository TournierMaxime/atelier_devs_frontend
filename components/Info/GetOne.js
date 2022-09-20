import { Card } from "primereact/card";
import { Fragment, useContext, useEffect, useState } from "react";
import { Divider } from "primereact/divider";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import moment from "moment";
import parse from "html-react-parser";
import { loginContext } from "../Context/context";
import UpdateOne from "./UpdateOne";
import DeleteOne from "./DeleteOne";
import Comments from "./Comments/Comments";
import { BreadCrumb } from "primereact/breadcrumb";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";
export default function GetOne({ data, id }) {
  const { isLogged, userId, token } = useContext(loginContext);
  const [datas, setData] = useState({});
  const [dataloaded, setDataLoaded] = useState(true);
  //Items for breadcrumb
  const items = [
    {
      label: data.title,
      url: `/info/${id}`,
    },
  ];
  const home = { icon: "pi pi-home", url: "/info" };

  useEffect(() => {
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
          setData(res);
          setDataLoaded(false);
        } else {
          setDataLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [id]);

  return (
    <Fragment>
      <Divider />
      <BreadCrumb
        className="m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1"
        model={items}
        home={home}
      />
      {dataloaded ? (
        <ProgressSpinner />
      ) : (
        <Fragment>
          <Divider />
          <div className="grid">
            <Card
              title={data.title}
              className="boxShadow flex m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1"
            >
              <Link href={`/${data.userId}`}>
                <a>
                  <Chip
                    label={`${
                      data.User?.firstname +
                      " - " +
                      moment(data.created).format("DD/MM/YYYY à HH:MM:SS")
                    }`}
                    image={data.User?.image}
                  />
                </a>
              </Link>
              {parse(data.message)}
              {data.image ? <Image src={data.image} alt={data.image} /> : null}
              <Divider />
              {isLogged && userId === data.userId ? (
                <>
                  <UpdateOne
                    postId={data.id}
                    author={data.userId}
                    token={token}
                    setData={setData}
                    title={data.title}
                    message={data.message}
                    image={data.image ? data.image : null}
                  />
                  <DeleteOne
                    setData={setData}
                    postId={data.id}
                    author={data.userId}
                  />
                </>
              ) : null}
            </Card>
            <Comments postId={data.id} author={data.userId} />
          </div>
          <Divider />
        </Fragment>
      )}
    </Fragment>
  );
}
