/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Box, Button, CheckBox } from 'grommet';
import { Skeleton } from '../..';

export interface I_TestComponent_Props {
    name: string;
    subFrames: number;
}

export const TestComponent: FC<any> = ({ name, subFrames }: I_TestComponent_Props) => {
    const sfcState = Skeleton.States.useComponentFrameState();
    const scope = name;

    useEffect(() => {
        for (let i = 0; i < subFrames; i++) {
            sfcState.setTitle(scope, i.toString(), `${name}${i.toString()}`);
        }
    }, []);

    return (
        <Box>
            {name === 'Hallo' && (
                <Box direction="column" gap="xsmall">
                    <Box direction="row" gap="xsmall">
                        <CheckBox
                            label="All Collapsable"
                            onChange={(event) => sfcState.setScopeCollapsible(scope, event.target.checked)}
                        />
                        <Button
                            size="small"
                            label="Collapse all"
                            onClick={() => sfcState.setScopeCollapsed(scope, true)}
                        />
                        <Button
                            size="small"
                            label="Expand all"
                            onClick={() => sfcState.setScopeCollapsed(scope, false)}
                        />
                    </Box>
                    <Box direction="row" gap="xsmall">
                        <CheckBox
                            label="All Closable"
                            onChange={(event) => sfcState.setScopeClosable(scope, event.target.checked)}
                        />
                        <Button size="small" label="Close all" onClick={() => sfcState.setScopeClosed(scope, true)} />
                        <Button size="small" label="Open all" onClick={() => sfcState.setScopeClosed(scope, false)} />
                    </Box>
                    <Box direction="row" gap="xsmall">
                        <CheckBox
                            label="Hide All Bodies"
                            onChange={(event) => sfcState.setScopeShowBody(scope, !event.target.checked)}
                        />
                    </Box>
                    <Box direction="row" gap="xsmall">
                        <Button
                            size="small"
                            label="Only Show Hallo0"
                            onClick={() => {
                                sfcState.setClosed(scope, '0', false);
                                sfcState.setClosed(scope, '1', true);
                            }}
                        />
                        <Button
                            size="small"
                            label="Only Show Hallo1"
                            onClick={() => {
                                sfcState.setClosed(scope, '0', true);
                                sfcState.setClosed(scope, '1', false);
                            }}
                        />
                    </Box>
                </Box>
            )}
            {Array.from(Array(subFrames).keys()).map((e) => (
                <Skeleton.Parts.ContentFrame margin={{ top: 'small' }} key={e} id={e.toString()} scope={scope}>
                    <Box>{e}</Box>
                    <Box>{e}</Box>
                    <Box>{e}</Box>
                    <Box>{e}</Box>
                </Skeleton.Parts.ContentFrame>
            ))}
        </Box>
    );
};
