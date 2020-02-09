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
import Select from "@atlaskit/select";

import Button, { ButtonGroup } from "@atlaskit/button";
import TextField from "@atlaskit/textfield";
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";

import PublicHeader from "./../navigation/header_outside";

function UserMgmt() {
  const head = {
    cells: [
      {
        key: "name",
        content: "Team",
        isSortable: true
      },
      {
        key: "party",
        content: "E-Mail",
        shouldTruncate: true,
        isSortable: true
      },
      {
        key: "term",
        content: "Rolle",
        shouldTruncate: true,
        isSortable: true
      }
    ]
  };

  const isLoading = false;
  function createKey(input) {
    return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input;
  }

  const members = [
    {
      nm: "a",
      Team: "DTC Intern",
      mail: "john.doe@test.com",
      Role: "Admin"
    },
    {
      nm: "a",
      Team: "DTC Intern",
      mail: "Max.Mustermann@test.com",
      Role: "Team Member"
    }
  ];
  const rows = members.map((mem: Member, index: number) => ({
    key: 1,
    cells: [
      {
        key: createKey(mem.nm),
        content: <div>{mem.Team}</div>
      },

      {
        content: <div>{mem.mail}</div>
      },
      {
        content: (
          <div>
            <Select
              className="single-select"
              classNamePrefix="react-select"
              value={mem.Role}
              selected={mem.Role}
              options={[
                { label: "Admin", value: "Admin" },
                { label: "Team Admin", value: "Team Admin" },
                { label: "Team Member", value: "Team Member" }
              ]}
              placeholder="Role"
            />{" "}
          </div>
        )
      }
    ]
  }));

  return (
    <div style={{ width: "calc(90%)", paddingLeft: "48px" }}>
      <div
        style={{ paddingTop: "22px", display: "flex", paddingBottom: "22px" }}
      >
        <span style={{ fontSize: "18px", fontWeight: 500 }}>
          Team DTC Intern
        </span>

        <Button appearance="primary" style={{ marginLeft: "auto" }}>
          Add
        </Button>
      </div>

      <div>
        <DynamicTableStateless head={head} rows={rows} isLoading={isLoading} />
      </div>
    </div>
  );
}
export default UserMgmt;
