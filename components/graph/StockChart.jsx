import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryArea, VictoryScatter, VictoryTooltip } from 'victory-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import Colors from '../../constants/Colors';
import VView from '../VView';

const { width } = Dimensions.get('window');

const StockChart = ({ data }) => {
  const [activePoint, setActivePoint] = useState(null);


  if (!data || data.length === 0) {
    return (
      <VView style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <Text>No chart data available</Text>
      </VView>
    );
  }

  const formattedData = data.map(point => ({
    x: new Date(point.date),
    y: point.close,
  }));

  // Get min and max dates for the domain
  const minDate = formattedData[0].x;
  const maxDate = formattedData[formattedData.length - 1].x;

  return (
    <VView>
      <VictoryChart
        width={width}
        height={300}
        padding={{ top: 20, bottom: 50, left: 50, right: 20 }}
        scale={{ x: 'time' }}
        domain={{ x: [minDate, maxDate] }}
      >
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={Colors.green} stopOpacity={0.4} />
            <Stop offset="100%" stopColor={Colors.green} stopOpacity={0.05} />
          </LinearGradient>
        </Defs>

        <VictoryAxis
          tickFormat={(x) => {
            const date = new Date(x);
            return `${date.getDate()}/${date.getMonth() + 1}`;
          }}
          style={{
            axis: { stroke: Colors.borderColor },
            tickLabels: { fontSize: 10, padding: 5, fill: Colors.lightText },
          }}
        />

        <VictoryAxis
          dependentAxis
          tickFormat={(y) => `₹${y.toFixed(2)}`}
          style={{
            axis: { stroke: Colors.borderColor },
            tickLabels: { fontSize: 10, padding: 5, fill: Colors.lightText },
            grid: { stroke: Colors.borderColor, strokeDasharray: '5, 5' },
          }}
        />

        <VictoryArea
          data={formattedData}
          interpolation="natural"
          style={{
            data: { fill: "url(#gradient)" },
          }}
        />

        <VictoryLine
          data={formattedData}
          interpolation="natural"
          style={{
            data: { stroke: Colors.green, strokeWidth: 2 },
          }}
        />

        {activePoint && (
          <VictoryScatter
            data={[activePoint]}
            size={5}
            style={{ data: { fill: Colors.primary } }}
            labels={({ datum }) => `Date: ${datum.x.getDate()}/${datum.x.getMonth() + 1}\nClose: ₹${datum.y.toFixed(2)}`}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                flyoutStyle={{ fill: Colors.cardBackground, stroke: Colors.borderColor }}
                orientation="top"
                pointerWidth={10}
                cornerRadius={5}
                centerOffset={{ y: -20 }}
              />
            }
          />
        )}
      </VictoryChart>
    </VView>
  );
};

export default StockChart;
