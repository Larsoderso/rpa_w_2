import React, { Component, Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import Button, { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import TextArea from "@atlaskit/textarea";

import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";
import { Checkbox } from "@atlaskit/checkbox";
import PublicHeader from "./../navigation/header_outside";
import axios from "axios";

function ListUseCases() {
  // Send Login Credentials to Server
  let { path, url } = useRouteMatch();

  // Variablen
  const [anmloading, setanmloading] = useState(false);
  const [email, setemail] = useState("");
  const [pword, setpword] = useState("");

  function SendLoginCredentials() {
    setanmloading(true);

    const user = {
      mail: email,
      password: pword
    };

    axios
      .get(
        `https://9001-f0b438fa-b62e-477b-a8bb-e37c54fcfe8a.ws-eu01.gitpod.io/`
        // { user }
      )
      .then(res => {
        setanmloading(false);
        console.log(res);
        console.log(res.data);
      });
  }

  return (
    <div style={{ display: "flex", padding: "22px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "150px",
          marginTop: "22px",
          gridRowGap: "12px",
          gridColumnGap: "32px"
        }}
      >
        <Link
          to={path + "1"}
          style={{
            width: "240px",
            height: "140px",
            boxSizing: "border-box",
            borderRadius: "5px",
            background: "rgb(255, 255, 255)",
            boxShadow: "rgba(157, 172, 202, 0.45) 0px 1px 9px",
            padding: "12px"
          }}
        >
          <div style={{ color: "#5810F0", fontSize: "14px", fontWeight: 600 }}>
            {" "}
            Excel Data Import
          </div>
        </Link>
        <div
          style={{
            width: "240px",
            height: "140px",
            background: "#ffffff",
            border: "2px solid #5810F0",
            boxSizing: "border-box",
            borderRadius: "5px"
          }}
        />
        <div
          style={{
            width: "240px",
            height: "140px",
            background: "#ffffff",
            border: "2px solid #5810F0",
            boxSizing: "border-box",
            borderRadius: "5px"
          }}
        />
        <div
          style={{
            width: "240px",
            height: "140px",
            background: "#ffffff",
            border: "2px solid #5810F0",
            boxSizing: "border-box",
            borderRadius: "5px"
          }}
        />
      </div>
    </div>
  );
}

export default ListUseCases;
