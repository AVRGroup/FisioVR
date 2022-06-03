import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const concentric = {
    leftShoulder: 165,
    leftElbow: 165,
}

const eccentric = {
    leftShoulder: 90,
    leftElbow: 90,
}

const DevOmbros = new Exercise({
    name: 'DevOmbros',
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

init(DevOmbros);