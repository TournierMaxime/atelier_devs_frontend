//Imports
import { Fragment, useState, useContext } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Users from "../components/Admin/Users";
import Posts from "../components/Admin/Posts";
import Comments from "../components/Admin/Comments";
import { Divider } from "primereact/divider";
import { loginContext } from "../components/Context/context";
import { Message } from "primereact/message";

export default function Admin() {
  //Variables
  const { isLogged, isAdmin } = useContext(loginContext);

  //Tabs array data
  const data = [
    {
      id: "1",
      tabTitle: "Users",
      tabContent: <Users />,
    },
    {
      id: "2",
      tabTitle: "Posts",
      tabContent: <Posts />,
    },
    {
      id: "3",
      tabTitle: "Comments",
      tabContent: <Comments />,
    },
  ];

  //Return the content of Tabs
  const Tab = () => {
    //Variables
    const [visibleTab, setVisibleTab] = useState(data[0].id);

    //Titles tabs category
    const listTitles = data.map((item, index) =>
      visibleTab === item.id ? (
        <TabView key={index} onTabChange={() => setVisibleTab(item.id)}>
          <TabPanel header={item.tabTitle} />
        </TabView>
      ) : (
        <TabView
          key={index}
          onTabChange={() => setVisibleTab(item.id)}
          activeIndex={visibleTab}
        >
          <TabPanel header={item.tabTitle} />
        </TabView>
      )
    );

    //Contents tabs category
    const listContent = data.map((item, index) => (
      <div
        key={index}
        className="tabViewContainer__Content"
        style={visibleTab === item.id ? {} : { display: "none" }}
      >
        {item.tabContent}
      </div>
    ));

    return (
      <Fragment>
        {isLogged && isAdmin === true ? (
          <>
            <div className="flex justify-content-center">{listTitles}</div>
            <Divider />
            <div className="tabViewContainer">{listContent}</div>
          </>
        ) : (
          <>
            <Divider />
            <div className="flex justify-content-center m-auto">
              <Message severity="warn" text="Accès non autorisé" />
            </div>
          </>
        )}
      </Fragment>
    );
  };
  return Tab();
}
