import * as React from "react"
import Svg, {
    G,
    Path,
    Image
} from 'react-native-svg';

const IntermediateBadge = (props) => {
  return (
    <Svg viewBox="0 0 23.67 23.67" {...props}>
      <G data-name="Layer 2">
        <Image
          width={93}
          height={95}
          transform="scale(.25)"
          xlinkHref="data:image/png;base64,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"
          data-name="Layer 1"
        />
      </G>
    </Svg>
  )
}

export default IntermediateBadge
