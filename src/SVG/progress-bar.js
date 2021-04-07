import * as React from "react"
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Svg, {
    Defs,
    G,
    Mask,
    Path,
    Rect,
    Text
} from 'react-native-svg';

const ProgressBar = (props) => {

    let percentage = `${(((props.percentage * 85) / 100) - 85)}%`


    return (
        <Svg height={15} width={wp(70)} viewBox={`0 0 ${wp(75)} 15`} {...props}>
            <Defs>
                <Mask id="prefix__a">
                    <Rect width="85%" height={15} x={percentage} fill="#fff" />
                    <Rect width="85%" height={15} y={200} fill="#fff" />
                </Mask>
            </Defs>
            <Rect width="85%" height={15} fill="#fff" stroke="#0A0343" rx={7.5} strokeWidth="1" />
            <G mask="url(#prefix__a)">
                <Rect width="85%" height={15} fill="#0A0343" rx={7.5} />
            </G>
            <Text x="88%" y="12.5" fill="#0A0343" style={{fontFamily: 'SemiBold', fontSize: wp(3.2)}}>{props.percentage + '%'}</Text>
        </Svg>
    )
}

export default ProgressBar