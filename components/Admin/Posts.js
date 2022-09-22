//Imports
import DeleteOne from "../Info/DeleteOne";
import { useEffect, useState, Fragment } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import moment from "moment";
import { Paginator } from "primereact/paginator";

export default function Posts() {
  //Variables
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
          setData(res.posts);
          setDataLoaded(true);
        } else {
          setDataLoaded(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [currentPage]); //eslint-disable-line

  //Data in tbody
  const tbody = data?.rows?.map((i, index) => {
    return (
      <tbody key={index} className="p-datatable-tbody">
        <tr role="row">
          <td role="cell">{i.id}</td>
          <td role="cell">{i.title}</td>
          <td role="cell">
            {moment(i.created).format("DD/MM/YYYY à HH:mm:ss")}
          </td>
          <td role="cell">
            <DeleteOne postId={i.id} setData={setData} setDatas={setData} />
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

          <div className="p-datatable p-component p-datatable-responsive-scroll">
            <div className="p-datatable-wrapper">
              <table
                role="table"
                className="p-datatable-table m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1"
              >
                <thead className="p-datatable-thead">
                  <tr role="row">
                    <th role="columnheader">
                      <div className="p-column-header-content">
                        <span>ID</span>
                      </div>
                    </th>
                    <th role="columnheader">
                      <div className="p-column-header-content">
                        <span>Titre</span>
                      </div>
                    </th>
                    <th role="columnheader">
                      <div className="p-column-header-content">
                        <span>Création</span>
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
        </Fragment>
      ) : (
        <ProgressSpinner />
      )}
    </Fragment>
  );
}
