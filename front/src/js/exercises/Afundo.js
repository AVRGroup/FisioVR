import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const concentric = {
    leftHip: 90,
    leftKnee: 70,
    rightHip: 20,
    rightKnee: 100,
}

const eccentric = {
    leftHip: 32,
    leftKnee: 160,
    rightHip: 50,
    rightKnee: 130
}

const Afundo = new Exercise({
    name: 'Afundo',
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

init(Afundo);