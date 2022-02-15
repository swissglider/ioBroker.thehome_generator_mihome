import React, { FC } from 'react';
import { useCountryDeviceListGridComponentDetail } from './componentStates';
import JqxDataTable, { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxdatatable';
import { Downgraded } from '@hookstate/core';

export const DetailBox: FC<any> = React.memo(() => {
    const details = useCountryDeviceListGridComponentDetail();

    const source: any = {
        dataFields: [
            { name: 'key', type: 'string' },
            { name: 'value', type: 'string' },
        ],
        dataType: 'json',
        id: 'key',
        localData: Object.entries(details.attach(Downgraded).get()).map(([key, value]) => ({
            key,
            value: typeof value === 'object' ? JSON.stringify(value) : value,
        })),
    };
    const dataAdapter: any = new jqx.dataAdapter(source);

    const columns = [
        { dataField: 'key', text: 'Key', width: 100 },
        { dataField: 'value', text: 'Value' },
    ];

    return (
        <>
            <JqxDataTable
                // @ts-ignore
                width="100%"
                height="100%"
                source={dataAdapter}
                columns={columns}
                columnsResize={true}
                theme="metrodark"
            />
        </>
    );
});
