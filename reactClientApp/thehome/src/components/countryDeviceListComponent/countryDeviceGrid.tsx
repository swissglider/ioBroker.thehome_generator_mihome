import React, { FC } from 'react';
import JqxTreeGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtreegrid';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.darkblue.css';
import { useCountryDeviceListGridComponentDetail, useCountryDeviceListGridComponent } from './componentStates';
import { Downgraded } from '@hookstate/core';
import { CountryDeviceListScope } from '.';
import { Skeleton } from '../../skeleton';

export const CountryDeviceGrid: FC<any> = React.memo(() => {
    const details = useCountryDeviceListGridComponentDetail();
    const countryDeviceGridState = useCountryDeviceListGridComponent();
    const sizeState = Skeleton.States.useSizeState();
    const myTreeGrid = React.useRef<any>();
    const sfcState = Skeleton.States.useComponentFrameState();
    const source: any = {
        dataType: 'json',
        dataFields: [
            { name: 'did', type: 'string' },
            { name: 'parent_id', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'isOnline', type: 'boolean' },
            { name: 'token', type: 'string' },
            { name: 'model', type: 'string' },
            { name: 'localip', type: 'string' },
            { name: 'desc_time', type: 'time' },
            { name: 'desc', type: 'string' },
            { name: 'all', type: 'any', map: (o: any) => o },
        ],
        hierarchy: {
            keyDataField: { name: 'did' },
            parentDataField: { name: 'parent_id' },
        },
        id: 'did',
        localData: countryDeviceGridState.attach(Downgraded).get(),
    };
    const dataAdapter: any = new jqx.dataAdapter(source);

    const columns =
        sizeState.get() === 'small'
            ? [{ dataField: 'name', text: 'Name' }]
            : sizeState.get() === 'medium'
            ? [
                  { dataField: 'name', text: 'Name', width: 250 },
                  { dataField: 'isOnline', text: 'Is Online' },
              ]
            : [
                  { dataField: 'name', text: 'Name', width: 400 },
                  { dataField: 'isOnline', text: 'Is Online', width: 70 },
                  { dataField: 'token', text: 'Token' },
              ];

    const rowDoubleClick = (event: any) => {
        details.set(event.args.row.all);
        if (sizeState.get() === 'small') {
            sfcState.setClosable(CountryDeviceListScope, 'detailView', true);
            sfcState.setClosed(CountryDeviceListScope, 'listView', true);
            sfcState.setClosed(CountryDeviceListScope, 'detailView', false);
        }
        sfcState.setTitle(CountryDeviceListScope, 'detailView', `Detail View - ${event.args.row.all.name}`);
    };

    return (
        <JqxTreeGrid
            ref={myTreeGrid}
            // @ts-ignore
            width="100%"
            height="100%"
            source={dataAdapter}
            showHeader={sizeState.get() === 'small' ? false : true}
            sortable={sizeState.get() === 'small' ? false : true}
            columns={columns}
            altRows={true}
            filterable={sizeState.get() === 'small' ? false : true}
            theme="metrodark"
            onRowDoubleClick={rowDoubleClick}
        />
    );
});
