import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg45 = Math.PI / 4;
const deg5 = Math.PI / 36;
const deg90 = Math.PI / 2;
const deg180 = Math.PI;

const Exercicio4 = new Exercise({ name: 'Exercicio 4', sets: 3, leftReps: 2, rightReps: 2, rest: 3 });
let rightHip, leftHip, rightKnee, leftKnee;

Exercicio4.verify = () => {
    rightHip = angles[6];
    leftHip = angles[7];
    rightKnee = angles[2];
    leftKnee = angles[3];

    return {
        left: (leftHip > (deg45 - deg5 - deg5 - deg5 - deg5) && leftHip < (deg45 + deg5 + deg5 + deg5) && leftKnee > (deg90 - deg5 - deg5) && leftKnee < (deg90 + deg5 + deg5 + deg5)),
        right: (rightHip > (deg45 - deg5 - deg5 - deg5 - deg5) && rightHip < (deg45 + deg5 + deg5 + deg5) && rightKnee > (deg90 - deg5 - deg5) && rightKnee < (deg90 + deg5 + deg5 + deg5)),
    }
}

Exercicio4.reset = () => {
    rightHip = angles[6];
    leftHip = angles[7];
    rightKnee = angles[2];
    leftKnee = angles[3];

    return {
        left: (leftHip < (deg5 + deg5 + deg5 + deg5) && leftHip > (deg5 + deg5) && leftKnee > (deg180 - deg5 - deg5 - deg5 - deg5 - deg5)),
        right: (rightHip < (deg5 + deg5 + deg5 + deg5) && rightHip > (deg5 + deg5) && rightKnee > (deg180 - deg5 - deg5 - deg5 - deg5 - deg5)),
    }
}

init(Exercicio4);