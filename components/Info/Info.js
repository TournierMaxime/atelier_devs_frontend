import Create from "./Create";
import UpdateOne from "./UpdateOne";
import DeleteOne from "./DeleteOne";
import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { loginContext } from "../Context/context";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chip } from "primereact/chip";
import parse from "html-react-parser";
import moment from "moment/moment";
import { Paginator } from "primereact/paginator";
import { Message } from "primereact/message";
import GetOne from "./GetOne";
import Link from "next/link";
export default function Info() {
  const { isLogged, token, isAdmin, userId } = useContext(loginContext);
  const [data, setData] = useState([]);
  const [dataloaded, setDataLoaded] = useState(true);
  const [createDialog, setCreateDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(10);
  const onBasicPageChange = (event) => {
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    setCurrentPage(event.page + 1);
  };
  const toggleCreate = () => {
    setCreateDialog(!createDialog);
  };

  useEffect(() => {
    //Retrieve data post
    async function getData() {
      try {
        const request = await fetch(
          `${process.env.URL_BACKEND}/api/posts?page=${currentPage}`,
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
  }, [currentPage]);

  return (
    <Fragment>
      {dataloaded ? (
        <ProgressSpinner />
      ) : (
        <Fragment>
          <Divider />
          {isLogged ? (
            <div className="col-6 offset-col-3 m-auto flex justify-content-center">
              <Button onClick={toggleCreate}>Poster du contenu</Button>
            </div>
          ) : null}
          <Divider />
          <Fragment>
            {data?.posts?.rows?.length > 0 ? (
              <Fragment>
                {" "}
                <Paginator
                  first={basicFirst}
                  rows={basicRows}
                  totalRecords={data?.posts?.count}
                  onPageChange={onBasicPageChange}
                  pageLinkSize={3}
                />
                <Divider />
                {data?.posts?.rows?.map((i, index) => (
                  <Fragment key={index}>
                    <Card
                      className="boxShadow m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1"
                      title={i.title}
                    >
                      <Link href={`/${i.userId}`}>
                        <a>
                          <Chip
                            label={`${
                              i.User?.firstname +
                              " - " +
                              moment(i.created).format("DD/MM/YYYY à HH:MM:SS")
                            }`}
                            image={i.User?.image}
                          />
                        </a>
                      </Link>
                      {parse(`${i.message}`)}
                      {i.image !== "null" ? (
                        <Image src={i.image} alt={i.image} />
                      ) : null}
                      <Divider />
                      <Fragment>
                        <div>
                          {i.Comments?.length > 0 ? (
                            i.Comments?.length > 1 ? (
                              <Button
                                className="p-button-sm p-button-outlined"
                                label="Commentaires"
                                badge={i.Comments?.length}
                              />
                            ) : (
                              <Button
                                className="p-button-sm p-button-outlined"
                                label="Commentaire"
                                badge={i.Comments?.length}
                              />
                            )
                          ) : null}
                          &nbsp;
                          {isLogged ? (
                            <Link href={`/info/${i.id}`}>
                              <Button
                                className="p-button-sm p-button-outlined p-button-success p-menubar-end-spacing"
                                label="Commenter"
                              />
                            </Link>
                          ) : (
                            <Message
                              text="Vous devez &ecirc;tre connecté pour poster un commentaire"
                              severity="warn"
                            />
                          )}
                          &nbsp;
                          <UpdateOne
                            postId={i.id}
                            author={i.userId}
                            token={token}
                            setData={setData}
                            title={i.title}
                            message={i.message}
                            image={i.image ? i.image : null}
                          />
                          <DeleteOne
                            setData={setData}
                            postId={i.id}
                            author={i.userId}
                          />
                        </div>
                      </Fragment>
                    </Card>
                    <Divider />
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <Fragment>
                <Message
                  className="col-2 m-auto flex justify-content-center"
                  severity="info"
                  text="Aucune info postée"
                />
                <Divider />
              </Fragment>
            )}
          </Fragment>

          <Divider />

          {createDialog ? (
            <Dialog
              className="dialog"
              header="Creer une info"
              modal
              closeOnEscape
              draggable={false}
              onHide={toggleCreate}
              visible={createDialog}
            >
              <Create isLogged={isLogged} token={token} setData={setData} />
            </Dialog>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
