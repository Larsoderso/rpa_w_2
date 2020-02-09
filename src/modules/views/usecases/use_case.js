import React, { Component, Fragment, useState, useEffect } from "react";
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
import Avatar from "@atlaskit/avatar";
import MyDropzone from "./../../dropz";
//import axios from "axios";
import Comment, {
  CommentAuthor,
  CommentTime,
  CommentAction,
  CommentEdited
} from "@atlaskit/comment";

import { BreadcrumbsStateless, BreadcrumbsItem } from "@atlaskit/breadcrumbs";

import PageHeader from "@atlaskit/page-header";
import DropdownMenu, {
  DropdownItemGroupRadio,
  DropdownItemRadio
} from "@atlaskit/dropdown-menu";

import "../../../../node_modules/react-vis/dist/style.css";
import {
  FlexibleWidthXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  ChartLabel,
  LabelSeries,
  MarkSeries
} from "react-vis";
import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import UserPicker from "@atlaskit/user-picker";
import EvaluationItem from "../../components/evaluation";

function getAdorableAvatar(id: string, size: number = 80) {
  return `https://api.adorable.io/avatars/${size}/${id}.png`;
}
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
function SingleUseCase(props) {
  // Send Login Credentials to Server
  //let { path, url } = useRouteMatch(props);

  // Variablen
  const [anmloading, setanmloading] = useState(false);
  const [email, setemail] = useState("");
  const [pword, setpword] = useState("");

  const [status, setStatus] = useState(1);
  //Modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [updateRatingsModal, setupdateRatingsModal] = useState(false);

  const [name, setname] = useState("Name the use case");
  const [description, setdescription] = useState("");
  const [team, setteam] = useState("");
  const [teamListing, setTeamListing] = useState("");

  const [Uc, setUc] = useState({});

  const [parsedJWT, setJWT] = useState(false);
  const [comments, setComments] = useState([
    { Author: "user@rpa.rocks", text: "tesckoooomentar" }
  ]);
  const [teams, updateTeams] = useState([{}]);

  const [commentBox, setCommentbox] = useState("");
  const [evaluations, setEvaluations] = useState(undefined);

  const [UpdateName, setUpdateName] = useState();
  const [UpdateDescription, setUpdateDescription] = useState();
  const [selected_teams, setteams] = useState([]);

  // Evaluations
  const [frequency, setfrequency] = useState(3);
  const [duration, setDuration] = useState(3);
  const [fte, setFTE] = useState(3);
  const [quality, setQuality] = useState(3);
  const [func, setFunc] = useState(3);
  const [tech, setTech] = useState(3);

  //Redirect
  const [red, setredir] = useState(<div />);
  //update dialog

  const [files, setfiles] = useState([]);

  const StatusArray = [
    "Idea",
    "Concept",
    "Development",
    "Testing",
    "Operation"
  ];

  useEffect(() => getUseCase(props), []);

  useEffect(() => setJWT(parseJwt(localStorage.getItem("knock"))), []);
  useEffect(() => getAllFiles(), []);

  useEffect(() => getComments(props), []);
  useEffect(() => getEvaluations(props), []);
  useEffect(() => getTeams(), []);

  useEffect(() => console.log(props), []);

  const actions_update = [
    {
      text: "Cancel",
      appearance: "default",
      onClick: () => setupdateModal(false)
    },
    {
      text: "Update use case",
      appearance: "primary",
      onClick: () => console.log("hey")
    }
  ];
  const actions_evaluations = [
    {
      text: "Cancel",
      appearance: "default",
      onClick: () => setupdateRatingsModal(false)
    },
    {
      text: "Update evaluation",
      appearance: "primary",
      onClick: () => console.log("hey")
    }
  ];

  function getTeams() {
    console.log("--- Load teams----");
    axios
      .get(
        `https://api.rpa.rocks/teams`
        // { user }
      )
      .then(res => {
        console.log(res.data);
        var conv = [];
        for (var i = 0; i < res.data.length; i++) {
          conv.push({ id: res.data[i].ID, name: res.data[i].Name });
        }

        setTeamListing(conv);
        console.log("teams----", teams);
      });
  }

  function getComments() {
    console.log("--- Load comments----");
    axios
      .get(
        `https://api.rpa.rocks/uc/` + props.props.match.params.id + `/comments`
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);

        setComments(res.data);
      });
  }

  function getEvaluations() {
    console.log("--- Load Evaluations----");
    axios
      .get(
        `https://api.rpa.rocks/uc/` +
          props.props.match.params.id +
          `/evaluatiions`
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log("Evaluations", res.data);

        setEvaluations(res.data);
      });
  }
  function getAllFiles() {
    console.log("--- Load Files----");
    axios
      .get(`https://api.rpa.rocks/uc/` + props.props.match.params.id + `/files`)
      .then(res => {
        console.log(res);

        setfiles(res.data);

        console.log("files", files);
      });
  }

  function getUseCase() {
    console.log("--- Load comments----");
    axios
      .get(`https://api.rpa.rocks/uc/` + props.props.match.params.id + `/`)
      .then(res => {
        console.log(res);
        console.log(res.data);

        setUc(res.data);

        setStatus(res.data.Status);
        setUpdateName(res.data.Name);
        setUpdateDescription(res.data.Description);
      });
  }
  function dropUseCase() {
    console.log("--- Load comments----");
    axios
      .delete(
        `https://api.rpa.rocks/uc/` + props.props.match.params.id + `/`
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log("deleted");
      });
  }

  function newComment() {
    const d = {
      text: commentBox,
      author: parsedJWT.uid,
      usecase: props.props.match.params.id
    };
    axios
      .post(
        `https://api.rpa.rocks/uc/` + props.props.match.params.id + `/comments`,
        d
        // { user }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);

        getComments();
      });
  }
  const actionsContent = (
    <ButtonGroup>
      <Button onClick={() => setupdateModal(true)} appearance="primary">
        Update
      </Button>{" "}
      <Button onClick={() => setupdateRatingsModal(true)} appearance="primary">
        Update evaluations
      </Button>{" "}
      {parsedJWT.role == "admin" && (
        <Button onClick={() => setDeleteModal(true)} appearance="danger">
          Delete
        </Button>
      )}
      <Button>...</Button>
    </ButtonGroup>
  );
  const actions = [
    {
      text: "Cancel",
      appearance: "default",
      onClick: () => setDeleteModal(false)
    },
    {
      text: "Delete Use Case",
      appearance: "danger",
      onClick: () => dropUseCase()
    }
  ];

  const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {}}>
      <BreadcrumbsItem
        onClick={() =>
          setredir(
            <Redirect
              to={{
                pathname: "/ui/"
              }}
            />
          )
        }
        text="Use Cases"
        key="Some project"
      />
      <BreadcrumbsItem text={Uc.Name} key="Parent page" />
    </BreadcrumbsStateless>
  );

  function changeStatus(val) {
    setStatus(val);
    axios
      .put(
        `https://api.rpa.rocks/uc/` +
          props.props.match.params.id +
          `
/status`,
        {
          Uc: parseInt(props.props.match.params.id),
          status: val
        }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  function onInputChange() {}

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {red}
      <ModalTransition>
        {deleteModal && (
          <Modal
            actions={actions}
            onClose={() => setDeleteModal(false)}
            heading="Do you really want to delete the use case ?"
          />
        )}
      </ModalTransition>

      <ModalTransition>
        {updateModal && (
          <Modal
            width="large"
            actions={actions_update}
            onClose={() => setupdateModal(false)}
            heading="Update use case"
          >
            {" "}
            <div>
              Name <br />
              <TextField
                placeholder="Name"
                value={UpdateName}
                onChange={e => {
                  setUpdateName(e.target.value);
                }}
              />
              <br />
              Description <br />
              <TextArea
                placeholder="Describe your Use Case"
                value={UpdateDescription}
                onChange={e => {
                  setUpdateDescription(e.target.value);
                }}
              />
              <br />
              Team
              <br />
              <UserPicker
                placeholder="Enter Team"
                value={selected_teams}
                fieldId="example"
                options={teams}
                onChange={(value, action) => {
                  setteam(value);
                }}
                onInputChange={onInputChange}
                isMulti
              />
            </div>
          </Modal>
        )}
      </ModalTransition>

      <ModalTransition>
        {updateRatingsModal && (
          <Modal
            width="large"
            actions={actions_evaluations}
            onClose={() => setupdateRatingsModal(false)}
            heading="Update use case"
          >
            <EvaluationItem
              question="Frequency"
              value={frequency}
              onChange={e => setfrequency(e)}
              bottom={1}
              top={5}
            />
            <EvaluationItem
              question="Duration"
              value={duration}
              onChange={e => setDuration(e)}
              bottom={1}
              top={5}
            />
            <EvaluationItem
              question="FTE"
              value={fte}
              onChange={e => setFTE(e)}
              bottom={1}
              top={5}
            />
            <EvaluationItem
              question="Quality"
              value={quality}
              onChange={e => setQuality(e)}
              bottom={1}
              top={5}
            />
            <EvaluationItem
              question="Functional complexity"
              value={func}
              onChange={e => setFunc(e)}
              bottom={1}
              top={5}
            />
            <EvaluationItem
              value={tech}
              onChange={e => setTech(e)}
              question="Technical complexity"
              bottom={1}
              top={5}
            />{" "}
          </Modal>
        )}
      </ModalTransition>

      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "6fr 2fr",
          gap: "12px 32px",
          overflow: "hidden"
        }}
      >
        <div>
          <div style={{ paddingLeft: "12px" }}>
            <PageHeader breadcrumbs={breadcrumbs} actions={actionsContent}>
              {Uc.Name}
            </PageHeader>
          </div>
          <div style={{ padding: "12px", width: "200px" }}>
            <Select
              style={{ maxWidth: "200px" }}
              value={{ label: StatusArray[status - 1], value: status }}
              options={[
                { label: "Idea", value: 1 },
                { label: "Concept", value: 2 },
                { label: "Development", value: 3 },
                { label: "Testing", value: 4 },
                { label: "Operation", value: 5 }
              ]}
              onChange={value => changeStatus(value.value)}
            />
          </div>

          <div style={{ paddingLeft: "12px", paddingTop: "22px" }}>
            <FlexibleWidthXYPlot xDomain={[0, 5]} yDomain={[0, 5]} height={300}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <ChartLabel
                text="high"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.9}
                yPercent={0.95}
              />
              <ChartLabel
                text="high"
                className="alt-y-label"
                includeMargin={false}
                xPercent={0.005}
                yPercent={0.1}
              />
              <XAxis title="Complexity" position="middle" />
              <YAxis title="Benefit" position="middle" />

              {evaluations != undefined && (
                <MarkSeries
                  className="mark-series-example"
                  strokeWidth={2}
                  opacity="0.8"
                  sizeRange={[5, 15]}
                  color="#172B4D"
                  fill="#172B4D"
                  data={[
                    {
                      x: evaluations.Complexity.Value,
                      y: evaluations.Use.Value,
                      size: 10
                    }
                  ]}
                />
              )}
              {evaluations != undefined && (
                <LabelSeries
                  allowOffsetToBeReversed
                  data={[
                    { x: -1, y: 10, size: 30, label: "UC1", xOffset: 35 },
                    { x: 1.7, y: 12, size: 10, label: "UC1", xOffset: 25 },
                    { x: 2, y: 5, size: 1, fill: "#FFAB00" },
                    { x: 3, y: 15, size: 12, fill: "#FFAB00" },
                    { x: 2.5, y: 7, size: 4, fill: "#FFAB00" }
                  ]}
                />
              )}
            </FlexibleWidthXYPlot>

            <div style={{ fontSize: "20px", color: "#42526d" }}>Files</div>
          </div>
          <MyDropzone
            uploadedFiles={() => getAllFiles()}
            props={{ usecase: props.props.match.params.id, files: files }}
          />
        </div>
        <div style={{ background: "#f1f7f9", width: "100%", height: "100vh" }}>
          <div
            style={{
              background: "rgb(241, 247, 249)",
              width: "100%",
              height: "100vh",
              paddingLeft: "12px",
              paddingTop: "22px"
            }}
          >
            <div style={{ height: "calc(100vh - 150px)", overflowY: "scroll" }}>
              {comments.map(function(object, i) {
                return (
                  <Comment
                    avatar={
                      <Avatar
                        label="Atlaskit avatar"
                        size="medium"
                        src={getAdorableAvatar(object.Author)}
                      />
                    }
                    author={<CommentAuthor>{object.Author}</CommentAuthor>}
                    time={
                      <CommentTime>
                        {new Date(object.Date).toLocaleDateString("de-DE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric"
                        })}
                      </CommentTime>
                    }
                    content={<p>{object.Text}</p>}
                    actions={[]}
                  />
                );
              })}
            </div>

            <div style={{ height: "150px", background: "#ecf1f3" }}>
              <div
                style={{
                  boxSizing: "border-box",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginLeft: "-12px"
                }}
              >
                <TextArea
                  value={commentBox}
                  onChange={e => setCommentbox(e.target.value)}
                  resize="auto"
                  height="120px"
                  name="area"
                  isCompact
                />
                <div style={{ paddingTop: "12px" }}>
                  <ButtonGroup style={{ paddingTop: "12px" }}>
                    <Button
                      onClick={() => setCommentbox("")}
                      appearance="default"
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => newComment()} appearance="primary">
                      Post comment
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUseCase;
