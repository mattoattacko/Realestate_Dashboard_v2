import React from "react";

import { Refine, AuthProvider } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

// our imports
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined
} from "@mui/icons-material";

import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
import routerProvider from "@pankod/refine-react-router-v6";
import axios, { AxiosRequestConfig } from "axios";
import { ColorModeContextProvider } from "contexts";
import { Title, Sider, Layout, Header } from "components/layout";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";

//list items represent resources, while the dashboard we made represents the stand alone home page
import { 
  Login,
  Home,
  Agents,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  // login functionality
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      //~~~ Save user to MongoDB ~~~//

      // first check if there is a profile object, meaning the user is logged in
      // the first param (http://localhost:8080/api/v1/users) is the endpoint we created in the backend and triggers our api. 
      // the second parameter is an object with options. In the options object, we specify the method as POST. We also need to provide headers and a body.
      if (profileObj) {
        const response = await fetch('http://localhost:8080/api/v1/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          })
        })

        //once we get a response back from the DB we can save the data we got as a variable
        const data = await response.json()    

        //we can then save the data (user) to local storage
        //we also need to pass the avatar to the user object
        if(response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );      
        } else {
          return Promise.reject()
        }     
      }

      //~~~ need to save token to Local Storage or MongoDB ~~~//
      localStorage.setItem("token", `${credential}`);

      return Promise.resolve();
    },

    //~~~ logout user ~~~//
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          //dataProvider is the API endpoint we created in the backend
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}

          //~~~ these are all the sidebar resources ~~~//
          resources={[
            {
              // all these MUI components simulate our stock layout that comes default with refine
              // but since we want our own look and feel for the app, we will use our own components
              // name: "posts",    
              // list: MuiInferencer,
              // edit: MuiInferencer,
              // show: MuiInferencer,
              // create: MuiInferencer,
              // canDelete: true,

              // "list: MuiInferencer" this is a dummy property
              // Refine gives us all of the following by default (list, show, create, edit).
              // So we don't have to worry about CRUD functionality, we just create pages that implement it.
              // All of these are pages we created
              // all this is our own layout
              name: "properties",      
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: "agents",
              list: Agents,
              show: AgentProfile,
              icon: <PeopleAltOutlined />,
            }, 
            {            
              name: "reviews",
              list: Home,
              icon: <StarOutlineRounded />,
            },            
            {
              name: "messages",
              list: Home,
              icon: <ChatBubbleOutline />,
            },            
            {
              name: "my-profile",
              //we provide an additional options object and set the label to "My Profile". This keeps it from automatically adding an "s" to the end of the name
              options: {
                label: "My Profile",
              },
              list: MyProfile,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home} //we made this
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
