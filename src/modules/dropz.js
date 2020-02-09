import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import TableTree from "@atlaskit/table-tree";
import { DynamicTableStateless } from "@atlaskit/dynamic-table";
import FolderFilledIcon from "@atlaskit/icon/glyph/folder-filled";
import FileIcon from "@atlaskit/icon/glyph/file";
function MyDropzone(props) {
  const Title = (props: ExampleItemData) => <span>{props.title}</span>;
  const Numbering = (props: ExampleItemData) => <span>{props.numbering}</span>;

  const fileList = [{}, {}];
  const isLoading = false;
  const head = {
    cells: [
      {
        key: "name",
        content: "Name"
      },
      {
        key: "party",
        content: "Filesize"
      },
      {
        key: "party",
        content: "Created"
      }
    ]
  };

  function downloadEmployeeData() {
    fetch("https://ipv4.download.thinkbroadband.com/10MB.zip").then(
      response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "employees.json";
          a.click();
        });
        //window.location.href = response.url;
      }
    );
  }

  const rows = props.props.files.map((file, index) => ({
    key: 1,
    cells: [
      {
        content: (
          <div style={{ display: "flex" }}>
            <FileIcon />{" "}
            <div style={{ paddingLeft: "12px", lineHeight: "20px" }}>
              {file.Filename}
            </div>
          </div>
        )
      },

      {
        content: <div>128KB</div>
      },
      {
        content: <div>{new Date(file.Created).toLocaleDateString("de-De")}</div>
      },
      {
        content: (
          <a href={"https://api.rpa.rocks/files/" + file.ID}>
            <div onClick={() => downloadEmployeeData()}>
              {" "}
              <svg
                width={22}
                height={22}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31 22C30.448 22 30 22.448 30 23V30H2V23C2 22.448 1.552 22 1 22C0.448 22 0 22.448 0 23V31C0 31.552 0.448 32 1 32H31C31.552 32 32 31.552 32 31V23C32 22.448 31.552 22 31 22Z"
                  fill="#4E7E94"
                />
                <path
                  d="M15.2708 23.707C15.6598 24.092 16.3108 24.096 16.6998 23.707L23.6988 16.807C24.0938 16.416 24.0928 15.783 23.6988 15.393C23.3048 15.002 22.6648 15.002 22.2708 15.393L16.9958 20.593V1C16.9958 0.448 16.5438 0 15.9858 0C15.4278 0 14.9758 0.448 14.9758 1V20.593L9.70081 15.393C9.30581 15.002 8.66681 15.002 8.27281 15.393C7.87781 15.784 7.87781 16.417 8.27281 16.807L15.2708 23.707Z"
                  fill="#4E7E94"
                />
              </svg>
            </div>
          </a>
        )
      }
    ]
  }));

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    // Do something with the files
    const data = new FormData();
    data.append("file", acceptedFiles[0]);
    axios
      .post(
        "https://api.rpa.rocks/uc/" + props.props.usecase + "/files",
        data,
        {
          // receive two    parameter endpoint url ,form data
        }
      )
      .then(() => {
        props.uploadedFiles();
      });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        borderRadius: "4px",
        background: "#f1f7f96b",
        border: "1px solid #e3e9ef",
        margin: "16px 0",
        padding: "22px",
        marginLeft: "12px",
        width: "94%"
      }}
      {...getRootProps({ onClick: event => event.stopPropagation() })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ... {props.usecase}</p>
      ) : (
        <div>
          <DynamicTableStateless
            head={head}
            rows={rows}
            isLoading={isLoading}
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      )}
    </div>
  );
}

export default MyDropzone;
