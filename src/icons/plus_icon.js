import React, { Component, Fragment, useState } from "react";

function AddIcon() {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "22px", height: "26px" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 0V13.5H0V16.5H13.5V30H16.5V16.5H30V13.5H16.5V0H13.5Z"
        fill="white"
        style={{ fill: "#42526d" }}
      />
    </svg>
  );
}

export default AddIcon;
