import * as React from "react"
import Svg, {
    G,
    Path,
} from 'react-native-svg';

const HelpSvg = (props) => {
  return (
    <Svg viewBox="0 0 56.57 56.58" {...props}>
      <G data-name="Layer 2">
        <G data-name="Layer 1" fill={props.color ? props.color : "#27265f"} fillRule="evenodd">
          <Path d="M0 30v-3.37c.05-.4.09-.79.14-1.19A27.93 27.93 0 017 9.68 27.77 27.77 0 0123.42.44c1.06-.19 2.14-.3 3.21-.44H30l.53.1c1.24.18 2.49.28 3.71.54a27.69 27.69 0 0116.47 10.45 27.55 27.55 0 015.72 20 27.44 27.44 0 01-6.87 15.81 27.84 27.84 0 01-16.4 9.24c-1.06.19-2.14.29-3.21.44h-3.32l-1.2-.14a28 28 0 01-16-7.1 27.76 27.76 0 01-9-16.18C.25 32.1.15 31 0 30zm52.86-1.64a24.57 24.57 0 10-24.62 24.5 24.58 24.58 0 0024.62-24.55z" />
          <Path d="M37.32 21.9a9 9 0 01-6.59 8.71c-.45.12-.6.3-.59.77v4.09a1.86 1.86 0 01-2.38 1.88 1.81 1.81 0 01-1.33-1.77v-6.46a1.8 1.8 0 011.87-1.84 5.32 5.32 0 10-5.3-5.4 1.86 1.86 0 11-3.7-.19 9 9 0 0118-.42c-.02.22 0 .44.02.63zM26 41a2.32 2.32 0 114.64 0A2.32 2.32 0 0126 41z" />
        </G>
      </G>
    </Svg>
  )
}

export default HelpSvg