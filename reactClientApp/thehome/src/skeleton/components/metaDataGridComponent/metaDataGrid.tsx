import React, { FC } from 'react';
import JqxTreeGrid, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtreegrid';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css';
import { useGridComponentDetail, useMetaDataGridComponent } from './componentStates';
import { Downgraded } from '@hookstate/core';
import { Skeleton } from '../..';

export const MetaDataGrid: FC<any> = React.memo(() => {
    const details = useGridComponentDetail();
    const metaDataState = useMetaDataGridComponent();
    const sizeState = Skeleton.States.useSizeState();
    const source: any = {
        dataType: 'json',
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'parentID', type: 'string' },
            { name: 'displayName', type: 'string' },
            { name: 'iobType', type: 'string' },
            { name: 'iobName', type: 'string' },
            { name: 'iobID', type: 'string' },
            { name: 'channelType', type: 'string' },
            { name: 'roomEnumID', type: 'string' },
            {
                name: 'room',
                type: 'string',
                map: (o: any) => (o.roomEnumID ? o.roomEnumID.substring(o.roomEnumID.lastIndexOf('.') + 1) : ''),
            },
            { name: 'functionEnumID', type: 'string' },
            {
                name: 'function',
                type: 'string',
                map: (o: any) =>
                    o.functionEnumID ? o.functionEnumID.substring(o.functionEnumID.lastIndexOf('.') + 1) : '',
            },
            { name: 'role', type: 'string' },
            { name: 'unit', type: 'string' },
            { name: 'valueType', type: 'string' },
            { name: 'icon', type: 'string' },
            { name: 'desc', type: 'string' },
            { name: 'min', type: 'string' },
            { name: 'max', type: 'string' },
            { name: 'saveToHistory', type: 'boolean' },
            { name: 'additionalPositionInfo', type: 'array' },
            { name: 'all', type: 'any', map: (o: any) => o },
        ],
        hierarchy: {
            keyDataField: { name: 'id' },
            parentDataField: { name: 'parentID' },
        },
        // root: 'result',
        id: 'id',
        // localData: metaData,
        localData: metaDataState.attach(Downgraded).get(),
    };
    const dataAdapter: any = new jqx.dataAdapter(source);

    const columns =
        sizeState.get() === 'small'
            ? [{ dataField: 'displayName', text: 'Display name' }]
            : [
                  { dataField: 'displayName', text: 'Display name', width: 400 },
                  { dataField: 'iobType', text: 'IOB Type' },
                  { dataField: 'channelType', text: 'Channel Type' },
                  { dataField: 'room', text: 'Room', width: 120 },
                  { dataField: 'function', text: 'Function', width: 120 },
                  { dataField: 'role', text: 'Role', width: 120 },
                  { dataField: 'unit', text: 'Unit' },
                  { dataField: 'valueType', text: 'Value Type' },
                  { dataField: 'saveToHistory', text: 'Save to History' },
                  { dataField: 'additionalPositionInfo', text: 'additionalPositionInfo' },
              ];

    const rowDoubleClick = (event: any) => {
        details.set(event.args.row.all);
    };

    return (
        <JqxTreeGrid
            // @ts-ignore
            width="100%"
            height="100%"
            source={dataAdapter}
            showHeader={sizeState.get() === 'small' ? false : true}
            sortable={sizeState.get() === 'small' ? false : true}
            columns={columns}
            altRows={true}
            filterable={sizeState.get() === 'small' ? false : true}
            filterMode="simple"
            theme="metrodark"
            onRowDoubleClick={rowDoubleClick}
        />
    );
});
