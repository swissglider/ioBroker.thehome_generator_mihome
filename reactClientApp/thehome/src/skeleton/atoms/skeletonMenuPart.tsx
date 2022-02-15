import React, { createElement } from 'react';
import { Box, Text } from 'grommet';
import { useState } from '@hookstate/core';
import { S_landscapeState, S_isMobileState } from '../states/frameworkStates';

import { Skeleton } from '..';

const SkeletonMenuPart = ({
    appComonentKey,
    appComonentValue,
    mainMenu,
}: {
    appComonentKey: string;
    appComonentValue: Skeleton.Types.T_AppComponentStructure;
    mainMenu: boolean;
}): JSX.Element => {
    const selectedComponentState = Skeleton.States.useSelectedComponent();
    const landscapeState = useState(S_landscapeState);
    const isMobileState = useState(S_isMobileState);
    const sizeState = Skeleton.States.useSizeState();
    return (
        <Box
            border={
                appComonentValue.menuName === selectedComponentState.getComponent().menuName
                    ? [{ side: 'bottom', color: 'accent-1', size: 'xsmall' }]
                    : [{ side: 'bottom', size: 'xsmall' }]
            }
            direction="column"
            align="center"
            alignSelf="end"
            onClick={() => selectedComponentState.set(appComonentKey)}
            focusIndicator={false}
        >
            {appComonentValue.menuIcon &&
                createElement(appComonentValue.menuIcon, {
                    size: mainMenu ? (landscapeState.get() && isMobileState.get() ? 'medium' : 'large') : 'medium',
                    color:
                        appComonentValue.menuName === selectedComponentState.getComponent().menuName ? 'accent-1' : '',
                })}
            <Text
                alignSelf="center"
                size={mainMenu ? (sizeState.get() === 'small' ? 'xsmall' : 'small') : 'xsmall'}
                color={appComonentValue.menuName === selectedComponentState.getComponent().menuName ? 'accent-1' : ''}
            >
                {appComonentValue.menuName}
            </Text>
        </Box>
    );
};

export default SkeletonMenuPart;
