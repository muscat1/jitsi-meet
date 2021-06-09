// @flow

import React, { useState } from 'react';

import { translate } from '../../../base/i18n';
import { Icon, IconArrowUpWide, IconArrowDownWide } from '../../../base/icons';

type Props = {

    /**
     * Whether the drawer should have a button that expands its size or not.
     */
    canExpand: ?boolean,

    /**
     * The component(s) to be displayed within the drawer menu.
     */
    children: React$Node,

    /**
     Whether the drawer should be shown or not.
     */
    isOpen: boolean,

    /**
     Function that hides the drawer.
     */
    onClose: Function,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
};

/**
 * Component that displays the mobile friendly drawer on web.
 *
 * @returns {ReactElement}
 */
function Drawer({
    canExpand,
    children,
    isOpen,
    onClose,
    t }: Props) {
    const [ expanded, setExpanded ] = useState(false);

    /**
     * Handles clicks within the menu, preventing the propagation of the click event.
     *
     * @param {Object} event - The click event.
     * @returns {void}
     */
    function handleInsideClick(event) {
        event.stopPropagation();
    }

    /**
     * Handles clicks outside of the menu, closing it, and also stopping further propagation.
     *
     * @param {Object} event - The click event.
     * @returns {void}
     */
    function handleOutsideClick(event) {
        event.stopPropagation();
        onClose();
    }

    /**
     * Toggles the menu state between expanded/collapsed.
     *
     * @returns {void}
     */
    function toggleExpanded() {
        setExpanded(!expanded);
    }

    /**
     * KeyPress handler for accessibility.
     *
     * @param {React.KeyboardEventHandler<HTMLDivElement>} e - The key event to handle.
     *
     * @returns {void}
     */
    function onKeyPress(e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            toggleExpanded();
        }
    }

    return (
        isOpen ? (
            <div
                className = 'drawer-menu-container'
                onClick = { handleOutsideClick }>
                <div
                    className = { `drawer-menu${expanded ? ' expanded' : ''}` }
                    onClick = { handleInsideClick }>
                    {canExpand && (
                        <div
                            aria-expanded = { expanded }
                            aria-label = { expanded ? t('toolbar.accessibilityLabel.collapse')
                                : t('toolbar.accessibilityLabel.expand') }
                            className = 'drawer-toggle'
                            onClick = { toggleExpanded }
                            onKeyPress = { onKeyPress }
                            role = 'button'
                            tabIndex = { 0 }>
                            <Icon
                                size = { 24 }
                                src = { expanded ? IconArrowDownWide : IconArrowUpWide } />
                        </div>
                    )}
                    {children}
                </div>
            </div>
        ) : null
    );
}

export default translate(Drawer);
