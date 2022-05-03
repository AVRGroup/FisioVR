import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg45 = Math.PI / 4;
const deg5 = Math.PI / 36;

const legRaise = new Exercise({ name: 'Elevação de pernas', sets: 3, leftReps: 2, rightReps: 2, rest: 3 });
let rightHip, leftHip;

legRaise.verify = () => {
    rightHip = angles[6];
    leftHip = angles[7];

    return {
        left: (leftHip > (deg45 - deg5) && leftHip < (deg45 + deg5)),
        right: (rightHip > (deg45 - deg5) && rightHip < (deg45 + deg5))
    }
}

legRaise.reset = () => {
    rightHip = angles[6];
    leftHip = angles[7];

    return {
        left: (leftHip < (deg5 + deg5)),
        right: (rightHip < (deg5 + deg5)),
    }
}

init(legRaise);