/* @flow */

import React, { Component } from 'react';

import { isBrowsersOptimal } from '../../base/environment';
import { translate } from '../../base/i18n';

import { CHROME, FIREFOX } from './browserLinks';

/**
 * The namespace of the CSS styles of UnsupportedDesktopBrowser.
 *
 * @private
 * @type {string}
 */
const _SNS = 'unsupported-desktop-browser';

/**
 * React component representing unsupported browser page.
 *
 * @class UnsupportedDesktopBrowser
 */
class UnsupportedDesktopBrowser extends Component<{}> {
    /**
     * Renders the component.
     *
     * @returns {ReactElement}
     */
    render() {
        return (
            <div className = { _SNS }>
                <div className = 'unsupported-browser-content'>
                    <img src = 'images/unsupported-browser/logo.png' />
                    <span className = 'unsupported-browser-title'>
                        Our meetings leverages best-of-breed WebRTC and the browser you are using doesn't support it.
                    </span>
                    <div className = 'unsupported-browser-apps-container'>
                        <span className = 'unsupported-browser-apps-header'>
                            Download our desktop app
                        </span>
                        <div className = 'unsupported-browser-apps'>
                            <a
                                className = 'unsupported-browser-app-button'
                                href = 'https://vod-updates.8x8.com/ga/meet-dmg-latest.dmg'
                                rel = 'noopener noreferrer'
                                target = '_blank'>
                                <img src = 'images/unsupported-browser/apple.svg' />
                                macOS
                            </a>
                            <a
                                className = 'unsupported-browser-app-button rightmost'
                                href = 'https://vod-updates.8x8.com/ga/meet-exe-latest.exe'
                                rel = 'noopener noreferrer'
                                target = '_blank'>
                                <img src = 'images/unsupported-browser/windows.svg' />
                                Windows
                            </a>
                        </div>
                    </div>
                    <span className = 'unsupported-browser-subtitle'>
                        Or use the latest version of&nbsp;
                        <a
                            className = 'unsupported-browser-link'
                            href = { CHROME }
                            rel = 'noopener noreferrer'
                            target = '_blank'>
                            Chrome
                        </a>
                        {
                            this._showFirefox()
                            && <>
                                &nbsp;or&nbsp;
                                <a
                                    className = 'unsupported-browser-link'
                                    href = { FIREFOX }
                                    rel = 'noopener noreferrer'
                                    target = '_blank'>
                                    Firefox
                                </a>
                            </>
                        }
                    </span>
                    <div className = 'unsupported-browser-separator' />
                    <span className = 'unsupported-browser-footer'>
                        Are you looking for&nbsp;
                        <a
                            className = 'unsupported-browser-link'
                            href = 'https://www.8x8.com/voip-business-phone-services/features/virtual-office-desktop'
                            rel = 'noopener noreferrer'
                            target = '_blank'>
                        8x8 Virtual Office?
                        </a>
                    </span>
                </div>
            </div>
        );
    }

    /**
     * Returns whether or not a link to download Firefox is displayed.
     *
     * @private
     * @returns {boolean}
     */
    _showFirefox() {
        return isBrowsersOptimal('firefox');
    }
}

export default translate(UnsupportedDesktopBrowser);
