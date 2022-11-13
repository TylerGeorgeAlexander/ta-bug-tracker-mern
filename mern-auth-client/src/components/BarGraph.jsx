import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

// const data = [
//   { quarter: 1, earnings: 13000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },
//   { quarter: 4, earnings: 19000 },
// ];

// indexBy is the X axis
// keys is the Y axis

const BarGraph = ({ data, yAxis, xAxis }) => (
  <div style={styles}>
    <h1>Nivo basic demo</h1>
    <div style={{ height: "400px" }}>
      <ResponsiveBar data={data} keys={yAxis} indexBy={xAxis} />
    </div>
  </div>
);

export default BarGraph;
