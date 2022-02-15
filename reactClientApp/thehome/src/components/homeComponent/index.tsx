/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { Skeleton } from '../../skeleton';
import { Home } from 'grommet-icons';

const HomeComponent: FC<any> = () => {
    const frameState = Skeleton.States.useComponentFrameState();
    const scope = 'home';

    useEffect(() => {
        frameState.setTitle(scope, 'Home1', 'Home');
        frameState.setTitleIcon(scope, 'Home1', Home);
    }, []);

    return (
        <Skeleton.Parts.ContentFrame scope={scope} id="Home1">
            <Box>Home</Box>
        </Skeleton.Parts.ContentFrame>
    );
};

export default HomeComponent;
