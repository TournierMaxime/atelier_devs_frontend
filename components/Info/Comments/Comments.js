//Imports
import { useEffect, useState, Fragment, useContext } from "react";
import moment from "moment";
import Create from "./Create";
import parse from "html-react-parser";
import DeleteOne from "./DeleteOne";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import UpdateOne from "./UpdateOne";
import { Chip } from "primereact/chip";
import { Card } from "primereact/card";
import { Paginator } from "primereact/paginator";
import { loginContext } from "../../Context/context";
import Link from "next/link";

export default function Comments({ postId, author }) {
  //Variables
  const { isLogged, userId, token } = useContext(loginContext);
  const [data, setData] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(10);
  const onBasicPageChange = (event) => {
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  //Update the state for the comments
  useEffect(() => {
    fetch(
      `${process.env.URL_BACKEND}/api/posts/${postId}/comments?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setDataLoaded(true);
      })
      .catch((error) => console.log(error));
  }, [postId, currentPage]);

  return (
    <Fragment>
      <Divider />
      {dataloaded ? (
        <Fragment>
          {isLogged ? (
            <Fragment>
              <Create setData={setData} postId={postId} />
              &nbsp;
            </Fragment>
          ) : null}

          <Divider />

          {data?.comments?.rows?.length > 0 ? (
            <Fragment>
              <div className="flex justify-content-center m-auto">
                <Paginator
                  first={basicFirst}
                  rows={basicRows}
                  totalRecords={data?.comments?.count}
                  onPageChange={onBasicPageChange}
                  pageLinkSize={3}
                />
              </div>

              <Divider />

              {data?.comments?.rows?.map((i, index) => {
                return (
                  <Fragment key={index}>
                    <Card className="boxShadow m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
                      <Link href={`/${i.userId}`}>
                        <a>
                          <Chip
                            label={`${i.User?.firstname} ${moment(i.created)
                              .startOf("YYYYMMDD")
                              .fromNow()}`}
                            image={i.User?.image}
                          />
                        </a>
                      </Link>

                      <Divider />

                      {parse(`${i.message}`)}

                      <Divider />

                      {isLogged && userId === i.userId ? (
                        <Fragment>
                          <DeleteOne
                            setData={setData}
                            commentId={i.id}
                            postId={i.postId}
                            author={i.userId}
                          />
                          <UpdateOne
                            setData={setData}
                            commentId={i.id}
                            postId={i.postId}
                            author={i.userId}
                            comment={i.message}
                          />
                        </Fragment>
                      ) : null}
                    </Card>
                    <Divider />
                  </Fragment>
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              <Message
                className="m-auto"
                severity="info"
                text="Aucun commentaire"
              />
              <Divider />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <ProgressSpinner />
      )}
    </Fragment>
  );
}
