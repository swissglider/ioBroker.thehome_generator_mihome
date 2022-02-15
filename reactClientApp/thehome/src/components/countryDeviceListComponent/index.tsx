/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Box, Button } from 'grommet';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css';
import { DetailBox } from './detailView';
import { CountryDeviceGrid } from './countryDeviceGrid';
import { useCountryDeviceListGridComponent } from './componentStates';
import { Skeleton } from '../../skeleton';
import { DocumentStore, Menu } from 'grommet-icons';
import testJsonData from '../../testStack/CountryDeviceList.json';

export const CountryDeviceListScope = 'CountryDeviceList';

const CountryDeviceListComponentOrg: FC<any> = ({ refresh }: { refresh: any }) => {
    const sizeState = Skeleton.States.useSizeState();

    const frameState = Skeleton.States.useComponentFrameState();

    useEffect(() => {
        frameState.setScopeCollapsible(CountryDeviceListScope, false);
        frameState.setScopeClosable(CountryDeviceListScope, false);
        frameState.setTitle(CountryDeviceListScope, 'listView', `Xiaomi Device Browser - Cloud`);
        frameState.setTitle(CountryDeviceListScope, 'detailView', `Detail View`);
        frameState.setClosed(CountryDeviceListScope, 'listView', false);
        frameState.setClosed(CountryDeviceListScope, 'detailView', sizeState.get() === 'small' ? true : false);
        frameState.setTitleIcon(CountryDeviceListScope, 'listView', DocumentStore);
        frameState.setTitleIcon(CountryDeviceListScope, 'detailView', Menu);
    }, [sizeState.get()]);

    useEffect(() => {
        if (frameState.isClosed(CountryDeviceListScope, 'detailView')) {
            frameState.setClosed(CountryDeviceListScope, 'listView', false);
        }
    }, [frameState.isClosed(CountryDeviceListScope, 'detailView')]);

    return (
        <Box flex={true} direction="column">
            <Box justify="end" direction="row">
                <Button size="small" label="refresh" onClick={() => refresh()} />
            </Box>
            <Box flex={true}>
                {sizeState.get() === 'small' ? (
                    <Box flex={true}>
                        <Skeleton.Parts.ContentFrame
                            margin={{ top: 'small' }}
                            id="listView"
                            scope={CountryDeviceListScope}
                            flex={true}
                        >
                            <CountryDeviceGrid />
                        </Skeleton.Parts.ContentFrame>
                        <Skeleton.Parts.ContentFrame
                            margin={{ top: 'small' }}
                            id="detailView"
                            scope={CountryDeviceListScope}
                            flex={true}
                        >
                            <DetailBox />
                        </Skeleton.Parts.ContentFrame>
                    </Box>
                ) : (
                    <Box flex={true} direction="row" gap="small">
                        <Skeleton.Parts.ContentFrame
                            margin={{ top: 'small' }}
                            id="listView"
                            scope={CountryDeviceListScope}
                            flex={true}
                        >
                            <CountryDeviceGrid />
                        </Skeleton.Parts.ContentFrame>
                        <Skeleton.Parts.ContentFrame
                            margin={{ top: 'small' }}
                            id="detailView"
                            scope={CountryDeviceListScope}
                            flex={true}
                        >
                            <DetailBox />
                        </Skeleton.Parts.ContentFrame>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const CountryDeviceListComponent: FC<any> = () => {
    const legacyAdapterState = Skeleton.States.useIOBLegacyAdapter();

    const [loadedData, refresh] = Skeleton.Hooks.useLoadJsonDataWithSendTo(
        useCountryDeviceListGridComponent,
        'getDeviceList',
        {
            config: { instance: legacyAdapterState.instance.get(), country: '' },
        },
        10000,
        testJsonData,
    );

    return (
        <>
            {loadedData.get() !== true ? (
                <Skeleton.Parts.SkeletonLoader />
            ) : (
                <CountryDeviceListComponentOrg refresh={refresh} />
            )}
        </>
    );
};

export default CountryDeviceListComponent;
