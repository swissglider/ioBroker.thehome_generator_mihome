/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { APP_NAME, IOB_ADAPTER_NAME, IS_IOB_APP, AppStructure } from './AppStructure';
import { Skeleton } from '@swissglider/react_skeleton_framework';

const App = (): JSX.Element => {
    const [newProps, setNewProps] = React.useState<any | undefined>(undefined);
    const titleState = Skeleton.States.useTitleState();
    const appStructureState = Skeleton.States.useAppStructure();
    const selectedComonent = Skeleton.States.useSelectedComponent();
    const iobTestState = Skeleton.States.useIOBAppTest();
    const legacyAdapterState = Skeleton.States.useIOBLegacyAdapter();

    useEffect(() => {
        titleState.set(APP_NAME);
        appStructureState.set(AppStructure);
        const entry = Object.entries(AppStructure).find(([, e]) => (e as any).default && (e as any).default === true);
        if (entry) selectedComonent.set(entry[0]);

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const appComp = urlParams.get('component');
        if (appComp) {
            selectedComonent.set(appComp);
        }

        const adapterName = urlParams.get('adapterName') || IOB_ADAPTER_NAME || '';
        const legacyAdapterInstance = urlParams.get('legacyAdapterInstance') || 0;
        iobTestState.set(urlParams.get('testIOBApp') === 'true' || false);

        setNewProps({ adapterName, socket: { port: window.location.port } });
        legacyAdapterState.instance.set(
            typeof legacyAdapterInstance === 'string' ? parseInt(legacyAdapterInstance) : legacyAdapterInstance,
        );
    }, []);

    return (
        <>
            {newProps &&
                React.createElement(
                    iobTestState.get() || !IS_IOB_APP ? Skeleton.SkeletonApp : Skeleton.Apps.IOBApp,
                    newProps,
                )}
        </>
    );
};

export default App;
