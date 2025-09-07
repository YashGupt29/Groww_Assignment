import React, { useState } from "react";
import { View ,StyleSheet} from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import {
  DashPathEffect,
  Path,
  Skia,
} from "@shopify/react-native-skia";
import { Tooltip } from "../ToolTip";

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
        domainPadding={{ top: 40, bottom: 40 }}
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
          topLinePath.moveTo(chartBounds.left, chartBounds.top + 70);
          topLinePath.lineTo(chartBounds.right, chartBounds.top + 70);

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
    </View>
  );
};

export default VictoryLineChart;

const styles = StyleSheet.create({
  chartBox: {
    height: 240,
    margin: 16,
    borderWidth: 1,
    borderColor: "light-gray",
    borderRadius: 8,
    backgroundColor: "white",
  },
});