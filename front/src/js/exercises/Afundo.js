import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg5 = Math.PI / 36;
const deg15 = 15 * Math.PI / 180;
const deg150 = 150 * Math.PI / 180;
const deg180 = 180 * Math.PI / 180;

function deg2rad(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

const concentric = {
    leftHip: deg2rad(20),
    rightHip: deg2rad(90),
    leftKnee: deg2rad(100),
    rightKnee: deg2rad(70)
}

const eccentric = {
    leftHip: deg2rad(50),
    rightHip: deg2rad(32),
    leftKnee: deg2rad(130),
    rightKnee: deg2rad(160)
}

const Afundo = new Exercise({
    name: 'Afundo',
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

init(Afundo);