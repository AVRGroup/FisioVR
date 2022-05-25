import Exercise from '../exercise';
import { init, angles } from '../poseNet';

const deg5 = Math.PI / 36;
const deg90 = Math.PI / 2;
const deg65 = Math.PI/180;
const deg165 = 160 * Math.PI / 180;

const concentric = {
    
    leftShoulder: deg165,
    rightElbow: deg165,
    leftShoulder: deg165,
    rightElbow: deg165
}


const eccentric = {
    leftShoulder: deg90,
    rightShoulder: deg90,
    leftElbow: deg90,
    rightElbow: deg90
}

const DevOmbros = new Exercise({
    name: 'DevOmbros',
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

init(DevOmbros);