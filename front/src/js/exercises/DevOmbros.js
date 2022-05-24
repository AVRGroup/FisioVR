import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg5 = Math.PI / 36;
const deg90 = Math.PI / 2;
const deg180 = Math.PI;
const deg160 = 130 * Math.PI / 180;

let rightShoulder = 0, leftShoulder = 0;
let rightElbow, leftElbow;
const DevOmbros = new Exercise({ name: 'Desenvolvimento de ombros', sets: 3, leftReps: 2, rightReps: 2, rest: 3 });

let vleft = false, vright = false;

DevOmbros.verify = (keipoints) => {
    rightShoulder = angles[4];
    leftShoulder = angles[5];
    rightElbow = angles[0];
    leftElbow = angles[1];

    return {
        left: (leftShoulder >= deg160 && leftElbow >= deg160),
        right: (rightShoulder >= deg160 && rightElbow >= deg160)
    }
}

DevOmbros.reset = () => {
    rightShoulder = angles[4];
    leftShoulder = angles[5];
    rightElbow = angles[0];
    leftElbow = angles[1];


    vleft = (leftShoulder > (deg90 - deg5) && leftShoulder < (deg90 + deg5) && leftElbow > (deg90 - deg5 - deg5 - deg5) && leftElbow < (deg90 + deg5));
    vright = (rightShoulder > (deg90 - deg5) && rightShoulder < (deg90 + deg5) && rightElbow > (deg90 - deg5 - deg5 - deg5 ) && rightElbow < (deg90 + deg5))

    return {
        left: vleft,
        right: vright
    }
}

init(DevOmbros);