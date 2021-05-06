// @flow

import { getLocalVideoTrack } from '../base/tracks';
import { createFacialRecognitionEffect } from '../stream-effects/facial-recognition';

import { SET_FACIAL_RECOGNITION_ENABLED } from './actionTypes';
import logger from './logger';

let ongoingFacialRecognitionEffect;

/**
 * Marks whether facial recognition is enabled.
 *
 * @param {boolean} enabled - Whether to turn facial recognition on or off.
 * @returns {{
    *      type: SET_FACIAL_RECOGNITION_ENABLED,
    *      payload: enabled
    * }}
*/
function setFacialRecognitionEnabled(enabled: boolean) {
    return {
        type: SET_FACIAL_RECOGNITION_ENABLED,
        payload: enabled
    };
}

/**
* Action that toggles the facial recognition effect.
*
* @param {boolean} enabled - Whether to turn facial capture on or off.
* @returns {Promise}
*/
function toggleFacialRecognitionEffect(enabled: boolean) {
    return async function(dispatch: (Object) => Object, getState: () => any) {
        const state = getState();
        const { facialRecognitionEnabled } = state['features/facial-recognition'];

        if (facialRecognitionEnabled !== enabled) {
            if (enabled) {
                const { jitsiTrack } = getLocalVideoTrack(state['features/base/tracks']);

                try {
                    if (!ongoingFacialRecognitionEffect) {
                        ongoingFacialRecognitionEffect = await createFacialRecognitionEffect();
                    }
                    ongoingFacialRecognitionEffect.startEffect(jitsiTrack.getgetOriginalStream());
                    dispatch(setFacialRecognitionEnabled(enabled));
                } catch {
                    logger.error('Failed to create facial recognition effect');
                }
                
            } else {
                ongoingFacialRecognitionEffect.stopEffect();
                dispatch(setFacialRecognitionEnabled(enabled))
            }
            

        }
    }
}
