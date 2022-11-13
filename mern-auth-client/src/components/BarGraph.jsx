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

const BarGraph = ({ data, yAxis, xAxis, xName, yName, indexValue }) => (
  <div style={styles}>
    <h1>Bar Graph of Priorities</h1>
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={data}
        keys={yAxis}
        indexBy={xAxis}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: xName,
        //   legendPosition: "middle",
        //   legendOffset: 32,
        // }}
        // axisLeft={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: yName,
        //   legendPosition: "middle",
        //   legendOffset: -40,
        // }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        role="application"
        ariaLabel="Bar Graph of Priorities"
        // barAriaLabel={function (e) {
        //   return (
        //     e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        //   );
        // }}
        colorBy={indexValue}
      />
    </div>
  </div>
);

export default BarGraph;
