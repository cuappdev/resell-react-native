import { Circle, Svg, SvgProps } from "react-native-svg";

export default function FilledCircle(props: SvgProps) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Circle
        cx={15}
        cy={15}
        r={13.25}
        fill="#F4F4F4"
        stroke="#9E70F6"
        strokeWidth={2.5}
      />
      <Circle cx={14.9992} cy={15} r={8.68966} fill="#9E70F6" />
    </Svg>
  );
}
