//Imports
import DeleteAccount from "../Profil/DeleteAccount";
import { useEffect, useState, useContext, Fragment } from "react";
import { loginContext } from "../../components/Context/context";
import { ProgressSpinner } from "primereact/progressspinner";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import IsAdmin from "./IsAdmin";

export default function Users({ setDatas }) {
  //Variables
  const { token, setIsLogged } = useContext(loginContext);
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
    //Retrieve data users
    async function getData() {
      try {
        const request = await fetch(
          `${process.env.URL_BACKEND}/api/users?page=${currentPage}`,
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
          setDataLoaded(true);
        } else {
          setDataLoaded(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [currentPage, token, setDatas]); //eslint-disable-line

  //Data in tbody
  const tbody = data?.rows?.map((i, index) => {
    return (
      <tbody key={index} className="p-datatable-tbody">
        <tr role="row">
          <td role="cell">{i.id}</td>
          <td role="cell">{i.firstname}</td>
          <td role="cell">{i.lastname}</td>
          <td role="cell">
            {moment(i.created).format("DD/MM/YYYY à HH:mm:ss")}
          </td>
          <td role="cell">
            <IsAdmin adminRights={i} setData={setData} />
          </td>
          <td role="cell">
            <DeleteAccount
              id={i.id}
              setDatas={setData}
              setData={setData}
              setIsLogged={setIsLogged}
              token={token}
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

          <div className="p-datatable p-component p-datatable-responsive-scroll">
            <div className="p-datatable-wrapper">
              <table
                role="table"
                className="p-datatable-table m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1"
              >
                <thead className="p-datatable-thead">
                  <tr role="row">
                    <th className role="columnheader">
                      <div className="p-column-header-content">
                        <span>ID</span>
                      </div>
                    </th>
                    <th className role="columnheader">
                      <div className="p-column-header-content">
                        <span>Prénom</span>
                      </div>
                    </th>
                    <th className role="columnheader">
                      <div className="p-column-header-content">
                        <span>Nom</span>
                      </div>
                    </th>
                    <th className role="columnheader">
                      <div className="p-column-header-content">
                        <span>Création</span>
                      </div>
                    </th>
                    <th className role="columnheader">
                      <div className="p-column-header-content">
                        <span>Administrateur</span>
                      </div>
                    </th>
                    <th className role="columnheader">
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
