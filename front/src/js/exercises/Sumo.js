import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const concentric = {
    leftHip: 45,
    leftKnee: 110,
    // rightHip: deg45,
    // rightKnee: deg90 + deg15 + deg5
}

const eccentric = {
    leftHip: 15,
    leftKnee: 165,
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
    margin: 10
},
    angles
);


init(Exercicio4);