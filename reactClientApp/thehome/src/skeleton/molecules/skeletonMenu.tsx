/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Footer } from 'grommet';
import { useState } from '@hookstate/core';
import { S_landscapeState, S_isMobileState } from '../states/frameworkStates';
import MoreMenuComponent from '../atoms/moreMenuComponent';
import { More } from 'grommet-icons';
import { Skeleton } from '..';
import SkeletonMenuPart from '../atoms/skeletonMenuPart';

export interface I_SkeletonMenu_Props {
    mainMenu: boolean;
}

const SkeletonMenu = ({ mainMenu }: I_SkeletonMenu_Props): JSX.Element => {
    const landscapeState = useState(S_landscapeState);
    const isMobileState = useState(S_isMobileState);
    const appStructure = Skeleton.States.useAppStructure();

    const MoreMenu: Skeleton.Types.T_AppComponentStructure = {
        menuName: 'More',
        component: MoreMenuComponent,
        menuIcon: More,
        mainMenu: true,
    };

    useEffect(() => {
        if (Object.values(appStructure.get()).some((e) => e.moreMenu !== undefined && e.moreMenu === true)) {
            if (appStructure.isMenuAvailable('MoreMenu') === false) appStructure.addNewMenu('MoreMenu', MoreMenu);
        } else {
            if (appStructure.isMenuAvailable('MoreMenu') === true) appStructure.deleteMenu('MoreMenu');
        }
    }, [appStructure]);

    return (
        <Footer
            pad={
                mainMenu
                    ? { horizontal: 'medium', vertical: 'small' }
                    : !landscapeState.get()
                    ? { horizontal: 'small', vertical: 'xsmall' }
                    : { right: 'small' }
            }
            background={!landscapeState.get() && !mainMenu ? 'dark-2' : ''}
            // height={landscapeState.get() && isMobileState.get() && mainMenu ? 'xxsmall' : ''}
            round={!landscapeState.get() && !mainMenu ? 'small' : ''}
            border={!landscapeState.get() && !mainMenu ? { color: 'brand', size: 'small' } : { size: 'none' }}
            margin={
                !landscapeState.get() && !mainMenu ? { bottom: 'medium' } : { horizontal: 'none', vertical: 'none' }
            }
            justify={!mainMenu && landscapeState.get() && isMobileState.get() ? 'end' : 'around'}
        >
            {Object.entries(appStructure.get())
                .filter(([k, e]) => e.mainMenu === undefined || e.mainMenu === true)
                .map(([appComonentKey, appComonentValue]) => (
                    <SkeletonMenuPart
                        key={appComonentValue.menuName}
                        appComonentValue={appComonentValue}
                        appComonentKey={appComonentKey}
                        mainMenu={mainMenu}
                    />
                ))}
        </Footer>
    );
};

export default SkeletonMenu;
