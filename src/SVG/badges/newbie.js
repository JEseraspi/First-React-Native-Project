import * as React from "react"
import Svg, {
    G,
    Path,
    Image
} from 'react-native-svg';

const NewbieBadge = (props) => {
  return (
    <Svg viewBox="0 0 23.67 23.67" {...props}>
      <G data-name="Layer 2">
        <Image
          width={127}
          height={126}
          transform="scale(.19)"
          xlinkHref="data:image/png;base64,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"
          data-name="Layer 1"
        />
      </G>
    </Svg>
  )
}

export default NewbieBadge