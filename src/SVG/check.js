import * as React from "react"
import Svg, {
    G,
    Path,
    Defs,
    LinearGradient,
    Circle,
    Stop
} from 'react-native-svg';


const CheckSvg = (props) => {
  return (
    <Svg viewBox="0 0 107.79 107.79" {...props}>
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={60.23}
          y1={49.53}
          x2={96.6}
          y2={85.9}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0} stopColor="#046938" />
          <Stop offset={0.26} stopColor="#046938" stopOpacity={0.62} />
          <Stop offset={0.53} stopColor="#046938" stopOpacity={0.28} />
          <Stop offset={0.75} stopColor="#046938" stopOpacity={0.08} />
          <Stop offset={0.9} stopColor="#046938" stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <G data-name="Layer 2">
        <G data-name="Layer 1">
          <Circle
            cx={53.9}
            cy={53.9}
            r={53.9}
            transform="rotate(-67.5 53.894 53.892)"
            fill="#8cc541"
          />
          <Path
            d="M107.72 54a54.53 54.53 0 00-.92-10L89.17 26.51 50.12 62.79l-7.81 20.9 23 23A53.92 53.92 0 00107.72 54z"
            fill="url(#prefix__a)"
          />
          <Path
            d="M42.42 83.7l-24-24a7.7 7.7 0 0110.86-10.9L42.47 62l35.92-35.54a7.7 7.7 0 1110.83 10.95z"
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
  )
}

export default CheckSvg
