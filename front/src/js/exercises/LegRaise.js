import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const concentric = {
    leftHip: 45,
    // rightHip: deg45
}

const eccentric = {
    leftHip: 10,
    // rightHip: deg10
}

const legRaise = new Exercise({
    name: 'Elevação de pernas',
    sets: 3,
    leftReps: 2,
    rightReps: 2,
    rest: 3,
    concentric,
    eccentric,
    margin: 5
},
    angles
);

init(legRaise);