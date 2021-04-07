import * as React from "react"
import Svg, {
    G,
    Path,
  } from 'react-native-svg';

export const HomeSvg =(props) => {
  return (
    <Svg viewBox="0 0 40.44 40.88" {...props}>
      <G data-name="Layer 2">
        <G
          data-name="Layer 1"
          fill="none"
          stroke={props.active ? '#27265f' : '#85c441'}
          strokeMiterlimit={10}
          strokeWidth={2.227}
        >
          <Path d="M36.29 39.77H4.06V21.41l16.16-13.4L36.29 21.7v18.07zM4.06 39.77H0M36.29 39.77h4.15" />
          <Path d="M10.52 22.68h6.15v6.15h-6.15zM22.5 26.99h7.99v12.77H22.5zM2.24 16.26L20.22 1.45l18.51 15.34M3.85 14.93V3.92h6.36v5.54" />
        </G>
      </G>
    </Svg>
  )
}

export const JournalSvg = (props) => {
  return (
    <Svg viewBox="0 0 39.51 41.69" {...props}>
      <G data-name="Layer 2">
        <G
          data-name="Layer 1"
          fill="none"
          stroke={props.active ? '#27265f' : '#85c441'}
          strokeMiterlimit={10}
          strokeWidth={2}
        >
          <Path d="M2.96 1h26.35v39.69H2.96z" />
          <Path d="M29.31 7.15h8.23l-1.39 1.91 1.39 2.25h-8.23M29.31 1h2.86v6.15M32.17 11.31v29.38h-2.86M32.17 1h3.03v6.15M35.2 11.31v29.38h-3.03M0 36.9h6.34M0 31.69h6.34M0 26.49h6.34M0 21.29h6.34M0 16.08h6.34M0 10.88h6.34M0 5.68h6.34M10.33 33.24h12.3M10.33 30.64h12.3M10.33 4.73h14.3v7.16h-14.3z" />
        </G>
      </G>
    </Svg>
  )
}

export const ProfileSvg = (props) => {
  return (
    <Svg viewBox="0 0 40.52 45.83" {...props}>
      <G data-name="Layer 2">
        <G
          data-name="Layer 1"
          fill="none"
          stroke={props.active ? '#27265f' : '#85c441'}
          strokeMiterlimit={10}
          strokeWidth={2}
        >
          <Path d="M39.52 44.83c0-8.56-8.62-15.5-19.26-15.5S1 36.27 1 44.83zM32.14 12.88A11.88 11.88 0 1120.26 1a11.88 11.88 0 0111.88 11.88z" />
        </G>
      </G>
    </Svg>
  )
}


export const ResourcesSvg = (props) => {
  return (
    <Svg viewBox="0 0 34.83 45.01" {...props}>
      <G data-name="Layer 2">
        <G
          data-name="Layer 1"
          fill="none"
          stroke={props.active ? '#27265f' : '#85c441'}
          strokeMiterlimit={10}
          strokeWidth={2}
        >
          <Path d="M6.85 1h21.89l5.09 4.88v32.93H6.85V1z" />
          <Path d="M28.74 1v5.31h5.09M11.62 27.77H28.3M11.62 22.89H28.3M11.62 18.01H28.3M11.62 13.13H28.3M6.85 6.31H1v37.7h27.74v-5.2" />
        </G>
      </G>
    </Svg>
  )
}

