import React, { Component, Fragment, useState } from "react";
import TableTree from "@atlaskit/table-tree";
import {
  XYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  Hint,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from "react-vis";

function UseCases() {
  const value = 2;

  const Title = <span>Title</span>;
  const Numbering = <span>Number</span>;

  return (
    <div>
      <div
        style={{
          width: "320px",
          background: "#FFFFFF",
          boxShadow: "0px 1px 19px rgba(157, 172, 202, 0.45)",
          borderRadius: "8px",
          padding: "12px",
          marginLeft: "22px",
          marginTop: "22px"
        }}
      />
      <div
        style={{
          width: "320px",
          background: "#FFFFFF",
          boxShadow: "0px 1px 19px rgba(157, 172, 202, 0.45)",
          borderRadius: "8px",
          padding: "12px",
          marginLeft: "22px",
          marginTop: "22px",
          textShadow: "0 0 black"
        }}
      >
        <XYPlot width={300} height={300}>
          <XAxis />
          <YAxis />
          <HeatmapSeries
            className="heatmap-series-example"
            onValueMouseOver={v => this.setState({ value: v })}
            onSeriesMouseOut={v => this.setState({ value: false })}
            data={[
              { x: 1, y: 0, color: 10 },
              { x: 1, y: 5, color: 10 },
              { x: 1, y: 10, color: 6 },
              { x: 1, y: 15, color: 7 },
              { x: 2, y: 0, color: 12 },
              { x: 2, y: 5, color: 2 },
              { x: 2, y: 10, color: 1 },
              { x: 2, y: 15, color: 12 },
              { x: 3, y: 0, color: 9 },
              { x: 3, y: 5, color: 2 },
              { x: 3, y: 10, color: 6 },
              { x: 3, y: 15, color: 12 }
            ]}
          />
          {value !== false && <Hint value={value} />}
        </XYPlot>
      </div>

      <div
        style={{
          width: "320px",
          background: "#FFFFFF",
          boxShadow: "0px 1px 19px rgba(157, 172, 202, 0.45)",
          borderRadius: "8px",
          padding: "12px",
          marginLeft: "22px",
          marginTop: "22px",
          textShadow: "0 0 black"
        }}
      >
        <XYPlot width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries
            className="mark-series-example"
            strokeWidth={2}
            opacity="0.8"
            sizeRange={[5, 15]}
            data={[
              { x: -11, y: 10, size: 30 },
              { x: -1.7, y: -12, size: 10 },
              { x: 2, y: 5, size: 1 },
              { x: 3, y: 15, size: 12 },
              { x: 2.5, y: 7, size: 4 }
            ]}
          />
        </XYPlot>
      </div>
    </div>
  );
}

export default UseCases;
