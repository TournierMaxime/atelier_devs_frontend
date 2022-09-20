import { useEffect, useState, Fragment, useContext } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Chip } from "primereact/chip";
import UpdateData from "./UpdateData";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";
import axios from "axios";
import moment from "moment/moment";
import { loginContext } from "../Context/context";
export default function Profil({ id }) {
  //Variables
  const { isLogged, token, userId, setIsLogged } = useContext(loginContext);
  const [datas, setDatas] = useState({});
  const [dataLoaded, setDataLoaded] = useState(true);

  useEffect(() => {
    //Retrieve data for a single movie
    async function getDatas() {
      try {
        const response = await axios.get(`
  ${process.env.URL_BACKEND}/api/users/${id}`);
        const data = response.data;
        if (data) {
          setDatas(data);
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
        <div className="flex justify-content-center login">
          <ProgressSpinner />
        </div>
      ) : (
        <Fragment>
          <Divider />
          <div className="grid">
            <Card className="boxShadow flex justify-content-center m-auto xl:col-4 col-offset-4 lg:col-6 col-offset-3 md:col-8 col-offset-2 sm:col-10 col-offset-1">
              <Chip
                label={`${datas.user?.firstname} ${datas.user?.lastname}`}
                image={datas.user?.image}
              />
              <div className="flex align-items-center flex-wrap text-sm">
                <div className="mr-5 mt-3">
                  <span className="font-medium text-500">POSTS</span>
                  <div className="text-700 mt-2 text-center">
                    {datas.user?.Posts.length}
                  </div>
                </div>
                <div className="mr-5 mt-3">
                  <span className="font-medium text-500">COMMENTAIRES</span>
                  <div className="text-700 mt-2 text-center">
                    {datas.user?.Comments.length}
                  </div>
                </div>
                <div className="mr-5 mt-3">
                  <span className="font-medium text-500">INSCRIPTION</span>
                  <div className="text-700 mt-2 text-center">
                    {moment(datas.user?.created).format("DD/MM/YYYY")}
                  </div>
                </div>
              </div>
            </Card>
            <Divider />
            {isLogged && Number(id) === userId ? (
              <Fragment>
                <UpdateData
                  id={id}
                  datas={datas}
                  setDatas={setDatas}
                  token={token}
                />
                <Divider />
                <UpdateEmail
                  id={id}
                  datas={datas}
                  setDatas={setDatas}
                  token={token}
                />
                <Divider />
                <UpdatePassword
                  id={id}
                  datas={datas}
                  setDatas={setDatas}
                  token={token}
                />
                <Divider />
                <DeleteAccount
                  id={id}
                  setDatas={setDatas}
                  token={token}
                  setIsLogged={setIsLogged}
                />
              </Fragment>
            ) : null}
            <Divider />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
