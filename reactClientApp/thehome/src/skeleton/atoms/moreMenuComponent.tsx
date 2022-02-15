/* eslint-disable react-hooks/exhaustive-deps */
import React, { createElement, FC, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { Skeleton } from '..';
import { Share, Menu } from 'grommet-icons';

const MoreMenuComponent: FC<any> = () => {
    const frameState = Skeleton.States.useComponentFrameState();
    const scope = 'home';
    const appStructure = Skeleton.States.useAppStructure();
    const selectedComponentState = Skeleton.States.useSelectedComponent();

    useEffect(() => {
        frameState.setTitle(scope, 'MoreMenu', 'More Menu Entries');
        frameState.setTitleIcon(scope, 'MoreMenu', Menu);
    }, []);

    return (
        <Skeleton.Parts.ContentFrame scope={scope} id="MoreMenu">
            <Box direction="row-responsive" justify="center" align="center" pad="xlarge" gap="medium">
                {Object.entries(appStructure.get())
                    .filter(([, e]) => e.moreMenu && e.moreMenu === true)
                    .map(([appComonentKey, appComonentValue]) => (
                        <Box
                            key={appComonentKey}
                            pad="large"
                            align="center"
                            background={{ color: 'light-2', opacity: 'strong' }}
                            round
                            gap="small"
                            onClick={() => selectedComponentState.set(appComonentKey)}
                        >
                            {appComonentValue.menuIcon !== undefined ? (
                                createElement(appComonentValue.menuIcon, {
                                    size: 'medium',
                                })
                            ) : (
                                <Share size="medium" />
                            )}
                            <Text>{appComonentValue.menuName}</Text>
                        </Box>
                    ))}
            </Box>
        </Skeleton.Parts.ContentFrame>
    );
};

export default MoreMenuComponent;
