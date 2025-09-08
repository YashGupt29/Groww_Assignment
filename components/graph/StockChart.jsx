import React from "react";
import { View ,StyleSheet} from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import {
  DashPathEffect,
  Path,
  Skia,
} from "@shopify/react-native-skia";
import { Tooltip } from "../ToolTip";
import { useTimeSeriesData } from '../../hooks/useTimeSeriesData';
import { ActivityIndicator, Text } from 'react-native';


const StockChart = ({ symbol, duration }) => {
  const { data: chartData, isLoading, error } = useTimeSeriesData(symbol, duration);
  const { state, isActive } = useChartPressState({ x: 0, y: { close: 0 } });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading chart data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading chart data: {error.message}</Text>
      </View>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No chart data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartBox}>
      <CartesianChart
          data={chartData}
          xKey="date"
          yKeys={["close"]}
          domain={{ 
            y: [Math.min(...chartData.map(d => d.close)) * 0.9, Math.max(...chartData.map(d => d.close)) * 1.1]
          }}
          domainPadding={{ top: 20, bottom: 0 }}
          chartPressState={state}
          xAxis={{
            lineColor: "black",   
            labelColor: "black",
            min:0,
            tickCount:1,
            axisSide:"bottom",
          }}
          yAxis={[{
            yKeys: ["close"],
            min: 0,
            lineColor: "black",   
            labelColor: "black",
            tickValues: [0],
            axisSide: "left", 
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
                points={points.close}
                color="red"
                strokeWidth={3}
                animate={{ duration: 500, onLoad: { duration: 500 } }}
              />
              {isActive && ( 
                <Tooltip
                  x={state.x.position}
                  y={state.y.close.position}
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

export default StockChart;

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});