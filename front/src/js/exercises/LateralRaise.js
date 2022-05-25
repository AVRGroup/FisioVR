import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg5 = Math.PI / 36;
const deg90 = Math.PI / 2;

const lateralRaise = new Exercise({
    name: 'Elevação Lateral',
    sets: 1,
    leftReps: 2,
    rightReps: 2,
    rest: 3,
    concentric: {
        leftShoulder: deg90,
        rightShoulder: deg90
    },
    eccentric: {
        leftShoulder: deg90 * 0.25,
        rightShoulder: deg90 * 0.25
    },
    margin: deg5
}, angles);

init(lateralRaise);