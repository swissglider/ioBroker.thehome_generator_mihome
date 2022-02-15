/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Box } from 'grommet';
import { DetailBox } from './detailView';
import { MetaDataGrid } from './metaDataGrid';
import { Skeleton } from '../..';
import { DocumentStore, Menu } from 'grommet-icons';
import { useGridComponentDetail, useMetaDataGridComponent } from './componentStates';
import testJsonData from '../../../testStack/metaData.json';

const MetaDataGridComponentOrg: FC<any> = () => {
    const sizeState = Skeleton.States.useSizeState();
    const frameState = Skeleton.States.useComponentFrameState();
    const scope = 'metaDataBrowser';
    const frame1 = 'metaDataBrowserF1';
    const frame2 = 'metaDataBrowserF2';
    const details = useGridComponentDetail();

    useEffect(() => {
        frameState.setTitle(scope, frame1, 'Meta Data Browser');
        frameState.setTitle(scope, frame2, 'Details');
        frameState.setTitleIcon(scope, frame1, DocumentStore);
        frameState.setTitleIcon(scope, frame2, Menu);
        frameState.setClosed(scope, frame2, true);
    }, []);

    useEffect(() => {
        // if (details.get().displayName && sizeState.get() === 'small') {
        if (details.get().displayName) {
            frameState.setClosed(scope, frame2, false);
            frameState.setClosable(scope, frame2, true);
            frameState.setCollapsible(scope, frame2, true);
            frameState.setTitle(scope, frame2, `${details.get().displayName}`);
        }
    }, [details.get()]);
    return (
        <Box gap="small" direction={sizeState.get() === 'large' ? 'row-reverse' : 'column'} flex={true}>
            <Skeleton.Parts.ContentFrame scope={scope} id={frame2}>
                <DetailBox />
            </Skeleton.Parts.ContentFrame>
            <Skeleton.Parts.ContentFrame scope={scope} id={frame1} flex={true}>
                <MetaDataGrid />
            </Skeleton.Parts.ContentFrame>
        </Box>
    );
};

export const MetaDataGridComponent: FC<any> = () => {
    const legacyAdapterState = Skeleton.States.useIOBLegacyAdapter();

    const [loadedData] = Skeleton.Hooks.useLoadJsonDataWithSendTo(
        useMetaDataGridComponent,
        'getMetaData',
        {
            config: { instance: legacyAdapterState.instance.get(), country: '' },
        },
        10000,
        testJsonData.result,
    );

    return <>{loadedData.get() !== true ? <Skeleton.Parts.SkeletonLoader /> : <MetaDataGridComponentOrg />}</>;
};
