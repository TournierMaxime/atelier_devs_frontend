//Imports
import DeleteOne from "../Info/Comments/DeleteOne";
import { useEffect, useState, Fragment, useContext } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import parse from "html-react-parser";
import { loginContext } from "../../components/Context/context";
import Link from "next/link";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

export default function Comments() {
  //Variables
  const router = useRouter();
  const { token } = useContext(loginContext);
  const [data, setData] = useState([]);
  const [dataloaded, setDataLoaded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(10);
  const onBasicPageChange = (event) => {
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    setCurrentPage(event.page + 1);
  };

  //Update the state
  useEffect(() => {
    //Retrieve data post
    async function getData() {
      try {
        const request = await fetch(
          `${process.env.URL_BACKEND}/api/admin/comments?page=${currentPage}`,
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
          setData(res.comments);
          setDataLoaded(true);
        } else {
          setDataLoaded(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [currentPage, token]);

  //Data in tbody
  const tbody = data?.rows?.map((i, index) => {
    return (
      <tbody key={index} className="p-datatable-tbody">
        <tr role="row">
          <td role="cell">{i.id}</td>
          <td role="cell">{i.postId}</td>
          <td role="cell">{parse(i.message)}</td>
          <td role="cell">
            {moment(i.created).format("DD/MM/YYYY à HH:mm:ss")}
          </td>
          <td className="m-0 p-0" role="cell">
            <Link href={`/info/${i.postId}#id${i.id}`} scroll={false}>
              <a>
                <Button
                  className="p-button-sm p-button-outlined p-button-info p-menubar-end-spacing"
                  label="Voir"
                />
              </a>
            </Link>
          </td>
          <td className="m-0 p-0" role="cell">
            <DeleteOne
              commentId={i.id}
              postId={i.postId}
              author={i.userId}
              setData={setData}
              setDatas={setData}
            />
          </td>
        </tr>
      </tbody>
    );
  });
  return (
    <Fragment>
      {dataloaded ? (
        <Fragment>
          <Paginator
            first={basicFirst}
            rows={basicRows}
            totalRecords={data?.count}
            onPageChange={onBasicPageChange}
            pageLinkSize={3}
          />
          <div className="m-auto xl:col-8 col-offset-2 lg:col-12 md:col-12 sm:col-12">
            <div className="p-datatable p-component p-datatable-responsive-scroll">
              <div className="p-datatable-wrapper">
                <table role="table" className="p-datatable-table">
                  <thead className="p-datatable-thead">
                    <tr role="row">
                      <th role="columnheader">
                        <div className="p-column-header-content">
                          <span>ID</span>
                        </div>
                      </th>
                      <th role="columnheader">
                        <div className="p-column-header-content">
                          <span>PostID</span>
                        </div>
                      </th>
                      <th role="columnheader">
                        <div className="p-column-header-content">
                          <span>Message</span>
                        </div>
                      </th>
                      <th role="columnheader">
                        <div className="p-column-header-content">
                          <span>Création</span>
                        </div>
                      </th>
                      <th role="columnheader">
                        <div className="p-column-header-content">
                          <span>Consulter</span>
                        </div>
                      </th>
                      <th role="columnheader">
                        <div className="p-column-header-content">
                          <span>Suppression</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {tbody}
                </table>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <ProgressSpinner />
      )}
    </Fragment>
  );
}
