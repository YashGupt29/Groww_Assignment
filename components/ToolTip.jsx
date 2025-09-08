import { Circle,Line as SkiaLine,Text, useFont } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
const roboto = require("../assets/fonts/Roboto-VariableFont_wdth,wght.ttf");


export const Tooltip = ({ x, y, chartBounds ,state}) => {
  
    const p1 = useDerivedValue(() => ({ x: x.value, y: chartBounds.top }));
    const p2 = useDerivedValue(() => ({ x: x.value, y: chartBounds.bottom }));
    const font = useFont(roboto, 14);
    const label = useDerivedValue(() => {
        const close = state.y.close.value.value ?? 'N/A';
        return `Close: ₹${close}`;
      });

  
    return (
      <>
        <SkiaLine p1={p1} p2={p2} color="darkred" strokeWidth={1} opacity={0.6} />
        <Circle cx={x} cy={y} r={6} color="darkred" opacity={0.9} />
        <Circle cx={x} cy={y} r={3} color="white" />
        <Text
        x={x}
        y={useDerivedValue(() => y.value - 20, [y])} 
        text={label}
        color="black"
        size={12}
        font={font} 
        fontStyle="bold"
        align="center"
      />
      </>
    );
}
