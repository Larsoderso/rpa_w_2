import React, {
  Component,
  Fragment,
  useState,
  type ComponentType,
  type Node
} from "react";
import Range from "@atlaskit/range";
import { isPopupUserPickerByProps } from "@atlaskit/user-picker/dist/cjs/components/utils";
import { defaultProps } from "react-select/async";

function EvaluationItem(props) {
  return (
    <div
      style={{
        width: "620px",
        marginTop: "22px"
      }}
    >
      {props.question}
      <br />

      <Range
        min={props.bottom}
        max={props.top}
        step={1}
        value={props.value}
        onChange={value => props.onChange(value)}
      />
    </div>
  );
}

export default EvaluationItem;
