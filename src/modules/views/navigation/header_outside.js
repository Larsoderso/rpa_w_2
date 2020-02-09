import React, { Component, Fragment, useState } from "react";

function PublicHeader() {
  return (
    <div
      style={{
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "44px",
        boxSizing: "border-box",
        display: "flex"
      }}
    >
      <svg
        width={84}
        height={96}
        viewBox="0 0 84 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "34px", height: "34px" }}
      >
        <path
          d="M28.8358 95.9104L0 79.6119V16.2985L28.8358 0L84 31.3433V63.9403L28.8358 95.9104Z"
          fill="#1E23A3"
        />
        <path
          d="M23.8233 87.1358L3.76355 75.2254V52.6582L23.8233 63.9418V87.1358Z"
          fill="white"
        />
        <path
          d="M23.8233 57.0421L3.76355 45.1316V22.5645L23.8233 33.848V57.0421Z"
          fill="white"
        />
        <path
          d="M50.1553 73.3428L30.0956 61.4324V38.8652L50.1553 50.1488V73.3428Z"
          fill="white"
        />
        <path
          d="M47.6366 16.9261L28.2038 28.2097L7.97018 16.56L27.5769 5.01562L47.6366 16.9261Z"
          fill="white"
        />
        <path
          d="M73.345 30.7191L53.9122 42.0026L33.6786 30.353L53.2853 18.8086L73.345 30.7191Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default PublicHeader;
