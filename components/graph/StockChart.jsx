import React, { useState } from "react";
import { View ,StyleSheet} from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import {
  DashPathEffect,
  Path,
  Skia,
} from "@shopify/react-native-skia";
import { Tooltip } from "../ToolTip";
import DurationSelector from "../DurationSelector"


const DATA = Array.from({ length: 100 }, (_, i) => ({
  day: i,
  highTmp: Math.sin(i / 10) * 50 + Math.random() * 20 + 100,
}));

const VictoryLineChart = () => {
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const [chartData] = useState(DATA);

  return (
    <View style={styles.chartBox}>
      <CartesianChart
        data={chartData}
        xKey="day"
        yKeys={["highTmp"]}
        domainPadding={{ top: 20, bottom: 20 }}
        chartPressState={state}
        yAxis={[{
          yKeys: ["highTmp"],
          min: 80, 
          max: 200, 
          lineColor: "black",
          labelColor: "black",
          tickCount: 0,
          axisSide: "right",
        }]}
        
      >
        {({ points, chartBounds }) => {
          const topLinePath = Skia.Path.Make();
          topLinePath.moveTo(chartBounds.left, chartBounds.top + 50);
          topLinePath.lineTo(chartBounds.right, chartBounds.top + 50);

          return (
            <>
              <Path
                path={topLinePath}
                color="black"
                style="stroke"
                strokeWidth={1}
                strokeCap="butt"
              >
                <DashPathEffect intervals={[3, 3]} />
              </Path>
              <Line
                points={points.highTmp}
                color="red"
                strokeWidth={3}
                animate={{ duration: 500, onLoad: { duration: 500 } }}
              />
              {isActive && (
                <Tooltip
                  x={state.x.position}
                  y={state.y.highTmp.position}
                  chartBounds={chartBounds}
                  state={state}
                />
              )}
            </>
          );
        }}
      </CartesianChart>
      <DurationSelector/>
    </View>
  );
};

export default VictoryLineChart;

const styles = StyleSheet.create({
  chartBox: {
    height: 250,
    margin: 10,
    borderWidth: 2,
    borderColor: "#eeeeee",
    borderRadius: 8,
    backgroundColor: "white",
    paddingTop:5,
    paddingBottom:10
  },
});