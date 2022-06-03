import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const concentric = {
    leftHip: 15,
    leftKnee: 150,
    // rightHip: deg15,
    // rightKnee: deg150
}

const eccentric = {
    leftHip: 15,
    leftKnee: 180,
    // rightHip: deg15,
    // rightKnee: deg180
}

const Agachamento = new Exercise({
    name: 'Agachamento',
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

init(Agachamento);