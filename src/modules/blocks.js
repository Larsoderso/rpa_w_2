import React, { Component, Fragment, useState } from "react";
import TableTree, {
  Rows,
  Row,
  Cell,
  Headers,
  Header
} from "@atlaskit/table-tree";
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
import MyDropzone from "./dropz";
function Blocks() {
  const value = 2;
  const DemoD = {
    children: [
      {
        id: "1",
        content: {
          title: "First top-level entry",
          numbering: "1",
          page: 2
        },
        hasChildren: true,
        children: [
          {
            id: "1.1.",
            content: {
              title: "First child",
              numbering: "1.1"
            },
            hasChildren: false
          },
          {
            id: "1.2",
            content: {
              title: "Second child",
              numbering: "1.2"
            },
            hasChildren: true,
            children: [
              {
                id: "1.2.1",
                content: {
                  title: "First grandchild",
                  numbering: "1.2.1"
                }
              }
            ]
          }
        ]
      },
      {
        id: "2",
        content: {
          title: "Second top-level entry",
          numbering: "2"
        },
        hasChildren: false
      }
    ]
  };

  const Title = <span>Title</span>;
  const Numbering = <span>Number</span>;

  return (
    <div>
      <div>Upload</div>

      <MyDropzone />
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
      >
        <TableTree />
        <TableTree>
          <Headers>
            <Header width={300}>Chapter title</Header>
            <Header width={100}>Numbering</Header>
            <Header width={100}>Page</Header>
          </Headers>
          <Rows
            items={DemoD.children}
            render={({ title, numbering, children }) => (
              <div>
                {" "}
                Hi {title} 
              </div>
            )}
          />
        </TableTree>
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

export default Blocks;
