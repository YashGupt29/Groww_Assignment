import React, { useState } from "react";
import { View } from "react-native";
import { CartesianChart, Line, Area, useChartPressState } from "victory-native";
import { LinearGradient, vec } from "@shopify/react-native-skia";
import {Tooltip} from "../ToolTip"



// Sample DATA
const DATA = Array.from({ length: 100 }, (_, i) => ({
  day: i,
  highTmp: Math.sin(i / 10) * 50 + Math.random() * 20 + 100,
}));

 const VictoryLineChart = () => {
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const [chartData] = useState(DATA);

  return (
    <View style={{ height: 300, padding: 16 }}>
      <CartesianChart
        data={chartData}
        xKey="day"
        yKeys={["highTmp"]}
        domainPadding={{ top: 30 }}
        chartPressState={state}
      >
        {({ points, chartBounds }) => {
          return (
            <>
              <Line 
              points={points.highTmp} 
              color="lightgreen" 
              strokeWidth={3} 
              animate={{ duration: 500, onLoad: { duration: 500 } }}
              />
              <Area 
              points={points.highTmp} 
              y0={chartBounds.bottom} 
              color="rgba(0,255,0,0.3)"
              animate={{ duration: 500, onLoad: { duration: 500 } }}
              >
                <LinearGradient 
                  start={vec(chartBounds.bottom,200)}
                  end={vec(chartBounds.bottom,chartBounds.bottom)}
                  colors={["green","#90ee9050"]}
                />
              </Area>
              {isActive && <Tooltip x={state.x.position} y={state.y.highTmp.position}  chartBounds={chartBounds}  state={state}
              />}
            </>
          );
        }}
      </CartesianChart>
    </View>
  );
};
export default VictoryLineChart;
