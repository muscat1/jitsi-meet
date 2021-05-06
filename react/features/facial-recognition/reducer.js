// @flow

import { PersistenceRegistry, ReducerRegistry } from '../base/redux';

import { SET_FACIAL_RECOGNITION_ENABLED } from './actionTypes';

PersistenceRegistry.register('features/facial-recognition', true, {
    facialRecognitionEnabled: false
});

ReducerRegistry.register('features/facial-recognition', (state = {}, action) => {
    switch (action.type) {
    case SET_FACIAL_RECOGNITION_ENABLED: {
        return {
            ...state,
            facialRecognitionEnabled: action.payload
        };
    }
    }

    return state;
});
