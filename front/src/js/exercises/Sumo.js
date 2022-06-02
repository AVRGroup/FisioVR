import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg45 = Math.PI / 4;
const deg5 = Math.PI / 36;
const deg15 = 15 * Math.PI / 180;
const deg90 = Math.PI / 2;
const deg165 = 165 * Math.PI / 180;

const concentric = {
    leftHip: deg45,
    leftKnee: deg90  + deg15 + deg5,
    // rightHip: deg45,
    // rightKnee: deg90 + deg15 + deg5
}

const eccentric = {
    leftHip: deg15,
    leftKnee: deg165,
    // rightHip: deg15,
    // rightKnee: deg165
}

const Exercicio4 = new Exercise({
    name: 'Agachamento Sumô',
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


init(Exercicio4);