import * as faceapi from 'face-api.js';

import JitsiFacialRecognitionEffect from './JitsiFacialRecognitionEffect';

export async function createFacialRecognitionEffect() {
    if (!MediaStreamTrack.prototype.getSettings && !MediaStreamTrack.prototype.getConstraints) {
        throw new Error('JitsiFacialRecognitionEffect not supported!');
    }

    await faceapi.nets.tinyFaceDetector.loadFromUri('/libs');
    await faceapi.nets.faceExpressionNet.loadFromUri('/libs');

    return new JitsiFacialRecognitionEffect();
}