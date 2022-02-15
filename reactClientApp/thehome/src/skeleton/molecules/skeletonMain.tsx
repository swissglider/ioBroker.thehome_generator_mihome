import React, { createElement } from 'react';
import { Box, Main } from 'grommet';
import { S_landscapeState, useVariantState } from '../states/frameworkStates';
import { useState } from '@hookstate/core';
import SkeletonMenu from './skeletonMenu';
import { Skeleton } from '..';

const SkeletonMain = (): JSX.Element => {
    const landscapeState = useState(S_landscapeState);
    const variantState = useVariantState();
    const selectedComponentState = Skeleton.States.useSelectedComponent();

    if (selectedComponentState.getComponent().isEmbedded)
        return (
            <iframe
                src={selectedComponentState.getComponent().embeddedLink}
                width="100%"
                height="100%"
                frameBorder="0"
                title="iframe"
                scrolling="no"
            />
        );

    return (
        <Box flex={true} margin={{ vertical: 'xsmall' }} pad="none">
            <Main
                overflow={{ horizontal: 'hidden', vertical: 'auto' }}
                pad={{
                    horizontal: 'medium',
                    top: 'medium',
                    bottom: 'none',
                }}
                margin={{ vertical: 'none' }}
            >
                {/* subMenu - only used if embedded */}
                {!landscapeState.get() && variantState.get() === 'embedded' && <SkeletonMenu mainMenu={false} />}

                {selectedComponentState.getComponent().component ? (
                    createElement(
                        selectedComponentState.getComponent().component as React.FunctionComponent<{}>,
                        selectedComponentState.getComponent().parameters,
                    )
                ) : (
                    <div>No Component set</div>
                )}
            </Main>
        </Box>
    );
};

export default SkeletonMain;
