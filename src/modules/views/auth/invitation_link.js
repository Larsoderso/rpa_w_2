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
import Form, {
  CheckboxField,
  Field,
  FormFooter,
  HelperMessage,
  ErrorMessage,
  ValidMessage
} from "@atlaskit/form";

import PublicHeader from "./../navigation/header_outside";

function InvitationPage() {
  let { inv } = useParams();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div>
        <PublicHeader />
        <svg
          width={1600}
          height={618}
          viewBox="0 0 1600 618"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100vw", height: "auto", marginTop: "20px" }}
        >
          <path
            d="M717 533C436.161 529.692 0 589 0 589V193C0 193 66.113 187.805 108 181C248.186 158.225 315.387 101.829 452 62.9997C541.377 37.5962 590.743 17.0566 683 5.99967C874.818 -16.9897 984.296 32.6066 1173 73.9997C1343.19 111.332 1601 200 1601 200V490C1601 490 1467.58 567.018 1374 595C1127.09 668.83 974.697 536.035 717 533Z"
            fill="#E3F6F4"
          />
          <path
            d="M717 533C436.161 529.692 0 589 0 589L-15 418C-15 418 121.113 409.805 163 403C303.186 380.226 464.387 356.829 601 318C690.377 292.596 1007.74 228.056 1100 216.999C1291.82 194.01 1250.3 202.607 1439 244C1609.19 281.332 1783 387.001 1783 387.001L1601 490C1601 490 1467.58 567.018 1374 595C1127.09 668.83 974.697 536.035 717 533Z"
            fill="#CCECF2"
          />
          <path
            d="M0 502C0 502 910 409 1215 351C1520 293 1602 369 1602 369"
            stroke="white"
            strokeWidth={2}
          />
          <path
            d="M0 532C0 532 910 439 1215 381C1520 323 1602 399 1602 399"
            stroke="white"
            strokeWidth={2}
          />
          <path
            d="M0 560C0 560 910 467 1215 409C1520 351 1602 427 1602 427"
            stroke="white"
            strokeWidth={2}
          />
        </svg>
        <div
          style={{
            paddingLeft: "22px",
            paddingRight: "22px",
            paddingBottom: "42px",
            paddingTop: "62px",
            width: "632px",
            position: "absolute",
            background: "white",
            zIndex: 999,
            top: "100px",
            left: "40%",
            borderRadius: "6px",
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.11)"
          }}
        >
          {inv}
          <div style={{ paddingLeft: "12px", paddingTop: "22px" }}>
            <TextField autoComplete="off" disabled={true} />
            <div style={{ marginTop: "12px" }}>
              <TextField autoComplete="off" />
            </div>
            <div style={{ marginTop: "12px" }}>
              <TextField autoComplete="off" />
            </div>

            <FormFooter>
              <ButtonGroup>
                <Button type="submit" appearance="primary" isLoading={false}>
                  Anmelden
                </Button>
              </ButtonGroup>
            </FormFooter>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationPage;
