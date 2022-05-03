import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg5 = Math.PI / 36;
const deg90 = Math.PI / 2;
let rightShoulder = 0, leftShoulder = 0;
const lateralRaise = new Exercise({ name: 'Elevação Lateral', sets: 3, leftReps: 2, rightReps: 2, rest: 3 });

let vleft = false, vright = false;

lateralRaise.verify = (keipoints) => {
    rightShoulder = angles[4];
    leftShoulder = angles[5];

    vleft = (leftShoulder > (deg90 - deg5) && leftShoulder < (deg90 + deg5));
    vright = (rightShoulder > (deg90 - deg5) && rightShoulder < (deg90 + deg5))

    return {
        left: vleft,
        right: vright
    }
}

lateralRaise.reset = () => {
    rightShoulder = angles[4];
    leftShoulder = angles[5];

    return {
        left: (leftShoulder < deg90 - deg5 - deg5),
        right: (rightShoulder < deg90 - deg5 - deg5)
    }
}

init(lateralRaise);