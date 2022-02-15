import React, { FC } from 'react';
import { Table, TableBody, TableCell, TableRow, Text } from 'grommet';
import { useGridComponentDetail } from './componentStates';

export const DetailBox: FC<any> = React.memo(() => {
    const details = useGridComponentDetail();
    return (
        <Table>
            <TableBody>
                {Object.entries(details.get()).map(
                    ([key, value]) =>
                        key !== 'displayName' &&
                        value !== undefined && (
                            <TableRow key={key}>
                                <TableCell>
                                    <Text size="small">{key}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text size="small">
                                        {typeof value === 'string'
                                            ? value ?? ''
                                            : typeof value === 'number'
                                            ? value.toString()
                                            : JSON.stringify(value) ?? ''}
                                    </Text>
                                </TableCell>
                            </TableRow>
                        ),
                )}
            </TableBody>
        </Table>
    );
});
