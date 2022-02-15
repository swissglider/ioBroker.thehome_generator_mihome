import React, { FC } from 'react';
import { Box } from 'grommet';
import { Skeleton } from '..';

export const MessageBoxList: FC<any> = ({ state }: { state: string }) => {
    const messageState = Skeleton.States.useMessages();
    const sizeState = Skeleton.States.useSizeState();

    const getMsg = (): Skeleton.Types.T_AppMessage[] => {
        if (state === 'new') {
            return messageState.getNew();
        }
        if (state === 'readed') {
            return messageState.getReaded();
        }
        return messageState.get();
    };

    return (
        <Box direction={sizeState.get() === 'small' ? 'column' : 'row'} gap="small" wrap>
            {getMsg().map((msg) => (
                <Skeleton.Parts.MessageBox key={msg.time} msg={msg} />
            ))}
        </Box>
    );
};
