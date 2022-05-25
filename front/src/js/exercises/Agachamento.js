import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg5 = Math.PI / 36;
const deg15 = 15 * Math.PI / 180;
const deg150 = 150 * Math.PI / 180;
const deg180 = 180 * Math.PI / 180;

const concentric = {
    leftHip: deg15,
    rightHip: deg15,
    leftKnee: deg150,
    rightKnee: deg150
}

const eccentric = {
    leftHip: deg15,
    rightHip: deg15,
    leftKnee: deg180,
    rightKnee: deg180
}

const Agachamento = new Exercise({
    name: 'Agachamento',
    sets: 3,
    leftReps: 2,
    rightReps: 2,
    rest: 3,
    concentric,
    eccentric,
    margin: deg5 + deg5
},
    angles
);

init(Agachamento);