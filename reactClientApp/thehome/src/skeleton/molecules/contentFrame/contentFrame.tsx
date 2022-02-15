/* eslint-disable react-hooks/exhaustive-deps */
import React, { createElement, useEffect } from 'react';
import { Box, Button, Header, Main, Text } from 'grommet';
import { FormDown, FormUp, FormClose } from 'grommet-icons';
import SkeletonDivider from '../../atoms/skeletonDivider';
import { S_SFC_State, T_SFCs, T_SFC_IDs, useComponentFrameState } from './componentStates';
import { useState } from '@hookstate/core';

export interface I_ContentFrame_Props {
    scope: string; // for example pageName --> all Frames can be collapsed or closed togehter etc...
    id: string; // unique
    children: React.ReactNode;
    pad?: any;
    margin?: any;
    flex?: boolean;
    height?: any;
}

export const ContentFrame = ({
    scope,
    id,
    children,
    pad = 'none',
    margin = 'none',
    flex = false,
}: I_ContentFrame_Props) => {
    const sfcOrgState = useState(S_SFC_State);
    const frameState = useComponentFrameState();

    useEffect(() => {
        const initSRCS: T_SFCs = {
            scope,
            id,
            title: id,
            collapsible: false,
            collapsed: false,
            closable: false,
            closed: false,
            showBody: true,
            badgeNumbe: undefined,
        };
        const initSFCID: T_SFC_IDs = {};
        initSFCID[id] = initSRCS;
        sfcOrgState[scope].merge(initSFCID);
    }, []);

    return (
        <Box
            border={!frameState.isClosed(scope, id) && [{ color: 'brand', size: 'small' }]}
            flex={
                !frameState.isClosed(scope, id) &&
                !frameState.isCollapsed(scope, id) &&
                frameState.isShowBody(scope, id)
                    ? flex
                    : false
            }
            round="small"
            margin={
                !frameState.isClosed(scope, id) &&
                !frameState.isCollapsed(scope, id) &&
                frameState.isShowBody(scope, id)
                    ? margin
                    : 'none'
            }
            pad={
                !frameState.isClosed(scope, id) &&
                !frameState.isCollapsed(scope, id) &&
                frameState.isShowBody(scope, id)
                    ? pad
                    : 'none'
            }
            // height={!frameState.isClosed(scope, id) ? height : 0}
        >
            {!frameState.isClosed(scope, id) && (
                <Header pad="small">
                    <Box direction="row" gap="small">
                        {frameState.getTitleIcon(scope, id) &&
                            createElement(frameState.getTitleIcon(scope, id), {
                                size: 'medium',
                            })}
                        <Text>{frameState.getTitle(scope, id)}</Text>
                    </Box>
                    <Box direction="row" gap="xsmall">
                        {frameState.isCollapsible(scope, id) && (
                            <Button
                                disabled={!frameState.isShowBody(scope, id)}
                                icon={frameState.isCollapsed(scope, id) ? <FormDown /> : <FormUp />}
                                onClick={() => frameState.toggleCollapsed(scope, id)}
                                plain
                            />
                        )}
                        {frameState.isClosable(scope, id) && (
                            <Button
                                disabled={!frameState.isShowBody(scope, id)}
                                icon={<FormClose />}
                                onClick={() => frameState.toggleClosed(scope, id)}
                                plain
                            />
                        )}
                    </Box>
                </Header>
            )}
            {!frameState.isClosed(scope, id) &&
                !frameState.isCollapsed(scope, id) &&
                frameState.isShowBody(scope, id) && <SkeletonDivider skeleton={false} />}
            {!frameState.isClosed(scope, id) && !frameState.isCollapsed(scope, id) && frameState.isShowBody(scope, id) && (
                <Main pad="small" flex={flex}>
                    {children}
                </Main>
            )}
        </Box>
    );
};
