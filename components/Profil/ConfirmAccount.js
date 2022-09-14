import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
export default function ConfirmAccount({ data, id }) {
  //Variables
  const [datas, setDatas] = useState(data);
  const [dataLoaded, setDataLoaded] = useState(true);
  //Retrieve data for a single movie
  async function getDatas() {
    try {
      const response = await axios.get(`
${process.env.URL_BACKEND}/api/auth/confirm/${id}`);
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

  useEffect(() => {
    getDatas();
  }, []); //eslint-disable-line
  return (
    <Fragment>
      {dataLoaded ? (
        <ProgressSpinner />
      ) : (
        <Fragment>
          <Message severity="success" text={datas.message} />
        </Fragment>
      )}
    </Fragment>
  );
}
