import React, { FC } from 'react';
import { Box, Header, Main, Text } from 'grommet';
import { Skeleton } from '..';
import { Checkmark } from 'grommet-icons';
import { T_AppSeverity } from '../types/frameworkTypes';

const colorMap: Record<T_AppSeverity, string> = {
    info: 'status-unknown',
    success: 'status-ok',
    warning: 'status-warning',
    critical: 'status-critical',
    error: 'status-error',
};

type T_MessageBox_Props = {
    msg: Skeleton.Types.T_AppMessage;
};

export const MessageBox: FC<T_MessageBox_Props> = ({ msg }: T_MessageBox_Props) => {
    const sizeState = Skeleton.States.useSizeState();
    const messageState = Skeleton.States.useMessages();
    return (
        <Box
            border={{ color: 'light-1' }}
            key={msg.time}
            gap="xsmall"
            margin={{ bottom: sizeState.get() === 'small' ? '' : 'small' }}
        >
            <Header pad="xsmall" background={colorMap[msg.severity]}>
                {msg.msgTitle}
                {msg.new && (
                    <Box onClick={() => messageState.setAsReaded(msg.time)}>
                        <Checkmark />
                    </Box>
                )}
            </Header>
            {/* <Main pad="xsmall">{msg.severity}</Main> */}
            <Main pad="xsmall">
                <Box gap="xsmall">
                    <Text size="xsmall">Severity: {msg.severity}</Text>
                    <Text size="xsmall">
                        Time:{' '}
                        {`${new Date(msg.time).toLocaleTimeString()} : ${new Date(msg.time).toLocaleDateString()}`}
                    </Text>
                </Box>
                <Text size="small">{msg.msgMessage}</Text>
                {/* {msg.msgError && msg.msgError.stack && <Text size="xsmall">{msg.msgError.stack}</Text>} */}
            </Main>
        </Box>
    );
};
