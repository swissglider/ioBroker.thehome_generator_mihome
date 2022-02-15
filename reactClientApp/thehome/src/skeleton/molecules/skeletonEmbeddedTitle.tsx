import React from 'react';
import { Header, Heading } from 'grommet';
import { useState } from '@hookstate/core';
import { S_landscapeState } from '../states/frameworkStates';
import { Skeleton } from '..';
import SkeletonMenu from './skeletonMenu';

const SkeletonEmbeddedTitle = (): JSX.Element => {
    const landscapeState = useState(S_landscapeState);
    const titleState = Skeleton.States.useTitleState();
    return (
        <Header background="dark-2" pad="xsmall">
            <Heading level="5" margin={{ horizontal: 'small', vertical: 'none' }} alignSelf="center">
                {titleState.get()}
            </Heading>
            {landscapeState.get() && <SkeletonMenu mainMenu={false} />}
        </Header>
    );
};

export default SkeletonEmbeddedTitle;
