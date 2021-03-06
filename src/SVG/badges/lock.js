import * as React from "react"
import Svg, {
    G,
    Defs,
    Image,
    ClipPath,
    Path
} from 'react-native-svg';

const LockBadge = (props) =>  {
  return (
    <Svg viewBox="0 0 62.16 88.41" {...props}>
      <G data-name="Layer 2">
        <Path
          d="M62.15 87.59v-47a2.54 2.54 0 000-.39c0-.44-.15-.56-.57-.6H58.2c-.33 0-.48-.13-.45-.46v-.48-12a26 26 0 00-1.09-7.74 26.47 26.47 0 00-8.1-12.56A26 26 0 0038.44.87a18.25 18.25 0 00-3.88-.76c-.67 0-1.35 0-2-.11h-2.35c-.3.17-.63.05-.95.08V0a14.9 14.9 0 00-2.32.13 26.26 26.26 0 00-14.65 7.43A26.53 26.53 0 004.41 26v13.12c0 .52 0 .54-.53.54H1.19C0 39.64 0 39.64 0 40.84v47.09a.6.6 0 00.16.48H62c.21-.24.15-.54.15-.82zm-13.9-47.78H13.94c-.56 0-.56 0-.56-.56V26.69a17.68 17.68 0 013.84-11.14 17.49 17.49 0 015.63-4.66 16.93 16.93 0 016.59-2 17.66 17.66 0 0119.09 14.84 22.84 22.84 0 01.25 3.51v12c0 .46-.11.57-.53.57z"
          fill="#a7a9ac"
          fillRule="evenodd"
          data-name="Layer 1"
        />
      </G>
    </Svg>
  )
}

export default LockBadge
