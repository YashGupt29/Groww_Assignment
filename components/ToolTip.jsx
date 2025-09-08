import { Circle,Line as SkiaLine,Text, useFont } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import React from "react";
const roboto = require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf");
// import { ThemeContext } from '../App';


export const Tooltip = ({ x, y, chartBounds ,state, theme, currentColors}) => {
  
    const p1 = useDerivedValue(() => ({ x: x.value, y: chartBounds.top }));
    const p2 = useDerivedValue(() => ({ x: x.value, y: chartBounds.bottom }));
    const font = useFont(roboto, 14);
    const label = useDerivedValue(() => {
        const close = state.y.close.value.value ?? 'N/A';
        return `Close: ₹${close}`;
      });
    // const { theme } = React.useContext(ThemeContext);
    // const currentColors = Colors[theme];

  
    return (
      <>
        <SkiaLine p1={p1} p2={p2} color={currentColors.red} strokeWidth={1} opacity={0.6} />
        <Circle cx={x} cy={y} r={6} color={currentColors.red} opacity={0.9} />
        <Circle cx={x} cy={y} r={3} color={currentColors.white} />
        <Text
        x={x}
        y={useDerivedValue(() => y.value - 50, [y])} 
        text={label}
        color={currentColors.text}
        size={12}
        font={font} 
        fontStyle={{ fontWeight: currentColors.fontWeight }} 
        align="center"
      />
      </>
    );
}
