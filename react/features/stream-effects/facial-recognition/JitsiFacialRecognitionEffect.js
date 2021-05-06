// @flow

import * as faceapi from 'face-api.js';
import React from 'react';

import {
    CLEAR_INTERVAL,
    INTERVAL_TIMEOUT,
    POLL_INTERVAL,
    SET_INTERVAL
} from './constants';
import { timerWorkerScript } from './worker';

export default class JitsiFacialRecognitionEffect {
    _captureFacialExpression: Function;
    _inputVideo: HTMLVideoElement;
    _onWorkerMessage: Function;
    // _outputCanvas: HTMLCanvasElement;
    // _outputCanvasContext: CanvasRenderingContext2D;
    _worker: Worker;

    /**
     Initialises a new {@code JitsiFacialRecognitionEffect} instance.
     */
    constructor() {
        this._inputVideo = document.createElement('video');
        // this._outputCanvas = document.createElement('canvas');
        // this._outputCanvasContext = this._outputCanvas.getContext('2d');

        // Bind handlers such that they access the same instance.
        this._onWorkerMessage = this._onWorkerMessage.bind(this);
    }

    /**
     * Starts loop to capture facial expressions.
     *
     * @param {MediaStream} stream - Stream to be used for processing.
     * @returns {void}
     */
    startEffect(stream: MediaStream) {
        this._worker = new Worker(timerWorkerScript, { name: 'Facial recognition effect worker' });
        this._worker.onmessage = this._onWorkerMessage;

        const firstVideoTrack = stream.getVideoTracks()[0];
        const { height, width } = firstVideoTrack.getSettings() ?? firstVideoTrack.getConstraints();

        // this._outputCanvas.width = parseInt(width, 10);
        // this._outputCanvas.height = parseInt(height, 10);
        this._inputVideo.width = parseInt(width, 10);
        this._inputVideo.height = parseInt(height, 10);
        this._inputVideo.autoplay = true;
        this._inputVideo.srcObject = stream;
        this._inputVideo.onloadeddata = () => {
            this._worker.postMessage({
                id: SET_INTERVAL,
                timeMs: POLL_INTERVAL
            });
        };
    }

    stopEffect() {
        this._inputVideo.onloadeddata = null;
        this._worker.postMessage({ id: CLEAR_INTERVAL });
        this._worker.terminate();
    }

    /**
     * Checks if the local track supports this effect.
     *
     * @param {JitsiLocalTrack} jitsiLocalTrack - Track to apply effect.
     * @returns {boolean} - Returns true if this effect can run on the specified track
     * false otherwise.
     */
    isEnabled(jitsiLocalTrack: Object) {
        return jitsiLocalTrack.isVideoTrack() && jitsiLocalTrack.videoType === 'camera';
    }

    /**
     * Onmessage handler for the WebWorker.
     *
     * @param {Object} message - Message received from the Worker.
     * @returns {void}
     */
    _onWorkerMessage(message: Object) {
        if (message.data.id === INTERVAL_TIMEOUT) {
            this._captureFacialExpression()
        }
    }

    /**
     * Captures the facial expression from the video stream.
     *
     * @returns {void}
     */
    async _captureFacialExpression() {
        const detections = await faceapi.detectSingleFace(
            this._inputVideo,
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceExpressions();

        // $FlowFixMe - Flow does not (yet) support method calls in optional chains.
        console.log(detections?.expressions.asSortedArray()[0].expression);
    }
}
