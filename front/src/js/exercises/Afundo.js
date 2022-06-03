import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const concentric = {
    leftHip: 45,
    leftKnee: 100,
    rightHip: 15,
    rightKnee: 130,
}

const eccentric = {
    leftHip: 35,
    leftKnee: 135,
    rightHip: 15,
    rightKnee: 165
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