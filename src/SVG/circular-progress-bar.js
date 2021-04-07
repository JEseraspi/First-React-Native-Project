import * as React from "react"
import Svg, {
    G,
    Path,
} from 'react-native-svg';
import {
    Image,
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProgressCircle = ({ strokeWidth, percentage }) => {
    const radius = (50 - strokeWidth / 2);
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
        stroke: '#52831B',
        strokeDasharray: `${diameter} ${diameter}`,
        strokeDashoffset: `${((100 - percentage) / 100 * diameter)}`,
    };

    return (
        <Svg
            className={'CircularProgressbar'}
            viewBox="0 0 100 100"
            width={wp(40)}
            height={wp(40)}
        >
            <Path
                className="CircularProgressbar-trail"
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                style={{
                    stroke: '#78C01D',
                }}
            />
            <Path
                className="CircularProgressbar-path"
                d={pathDescription}
                strokeWidth={strokeWidth}
                fillOpacity={0}
                style={progressStyle}
            />
        </Svg>
    );
};

export default ProgressCircle