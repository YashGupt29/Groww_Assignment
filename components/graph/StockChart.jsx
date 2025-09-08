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
import Colors from '../../constants/Colors';
import { ThemeContext } from '../../App';


const StockChart = ({ symbol, duration }) => {
  const { data: chartData, isLoading, error } = useTimeSeriesData(symbol, duration);
  const { state, isActive } = useChartPressState({ x: 0, y: { close: 0 } });

  const { theme } = React.useContext(ThemeContext);
  const currentColors = Colors[theme];

  if (isLoading) {
    return (
      <View style={styles(currentColors).loadingContainer}>
        <ActivityIndicator size="large" color={currentColors.primary} />
        <Text style={{color: currentColors.text}}>Loading chart data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles(currentColors).errorContainer}>
        <Text style={{color: currentColors.red}}>Error loading chart data: {error.message}</Text>
      </View>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <View style={styles(currentColors).noDataContainer}>
        <Text style={{color: currentColors.lightText}}>No chart data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles(currentColors).chartBox}>
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
            lineColor: currentColors.borderColor,   
            labelColor: currentColors.text,
            min:0,
            tickCount:1,
            axisSide:"bottom",
          }}
          yAxis={[{
            yKeys: ["close"],
            min: 0,
            lineColor: currentColors.borderColor,   
            labelColor: currentColors.text,
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
                color={currentColors.text}
                style="stroke"
                strokeWidth={1}
                strokeCap="butt"
              >
                <DashPathEffect intervals={[3, 3]} />
              </Path>
              <Line
                points={points.close}
                color={currentColors.red}
                strokeWidth={3}
                animate={{ duration: 500, onLoad: { duration: 500 } }}
              />
              {isActive && ( 
                <Tooltip
                  x={state.x.position}
                  y={state.y.close.position}
                  chartBounds={chartBounds}
                  state={state}
                  theme={theme}
                  currentColors={currentColors}
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

const styles = (currentColors) => StyleSheet.create({
  chartBox: {
    height: 250,
    margin: 10,
    borderWidth: 2,
    borderColor: currentColors.borderColor,
    borderRadius: 8,
    backgroundColor: currentColors.cardBackground,
    paddingTop:5,
    paddingBottom:10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentColors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: currentColors.background,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: currentColors.background,
  },
});