import React, { FC } from 'react';
import { Box, Text } from 'grommet';
import { Skeleton } from '..';
import { S_landscapeState, S_totalHeightState, S_totalWidthState } from '../states/frameworkStates';
import { useState } from '@hookstate/core';
import { StatusInfo } from 'grommet-icons';

const InfoStateComponent: FC<any> = () => {
    const totalWidthState = useState(S_totalWidthState);
    const totalHeightState = useState(S_totalHeightState);
    const landscapeState = useState(S_landscapeState);
    const sizeState = Skeleton.States.useSizeState();
    const titleState = Skeleton.States.useTitleState();

    return (
        <Box gap="small">
            <Skeleton.Parts.ContentFrameSimple title="App General infos">
                <Box pad="xlarge" direction="column">
                    <Text>Size: {sizeState.get()}</Text>
                    <Text>totalWidth: {totalWidthState.get()}</Text>
                    <Text>totalHeight: {totalHeightState.get()}</Text>
                    <Text>landscape: {landscapeState.get().toString()}</Text>
                    <Text>appTitle: {titleState.get()}</Text>
                </Box>
            </Skeleton.Parts.ContentFrameSimple>
        </Box>
    );
};

export const InfoStateComponentStructure: Skeleton.Types.T_AppComponentStructure = {
    menuName: 'AppInfo',
    component: InfoStateComponent,
    parameters: {},
    default: true,
    menuIcon: StatusInfo,
    moreMenu: false,
};
