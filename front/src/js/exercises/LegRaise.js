import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg5 = Math.PI / 36;
const deg45 = Math.PI / 4;
const deg10 = Math.PI / 18;

const concentric = {
    leftHip: deg45,
    rightHip: deg45
}

const eccentric = {
    leftHip: deg10,
    rightHip: deg10
}

const legRaise = new Exercise({
    name: 'Elevação de pernas',
    sets: 3,
    leftReps: 2,
    rightReps: 2,
    rest: 3,
    concentric,
    eccentric,
    margin: deg5
},
    angles
);

init(legRaise);