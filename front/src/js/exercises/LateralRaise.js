import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const lateralRaise = new Exercise({
    name: 'Elevação Lateral',
    sets: 1,
    leftReps: 2,
    rightReps: 2,
    rest: 3,
    concentric: {
        leftShoulder: 90,
        // rightShoulder: deg90
    },
    eccentric: {
        leftShoulder: 20,
        // rightShoulder: deg90 * 0.25
    },
    margin: 5
}, angles);

init(lateralRaise);