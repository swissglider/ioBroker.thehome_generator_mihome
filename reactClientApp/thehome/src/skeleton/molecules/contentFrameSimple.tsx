import React from 'react';
import { Box, Button, Header, Main, Text } from 'grommet';
import SkeletonDivider from '../atoms/skeletonDivider';
import { FormDown, FormUp } from 'grommet-icons';

export interface I_ContentFrame_Props {
    title: string;
    children: React.ReactNode;
    collapsible?: boolean;
    defaultOpen?: boolean;
    showBody?: boolean;
}

export const ContentFrameSimple = ({
    title,
    children,
    collapsible = false,
    defaultOpen = true,
    showBody = true,
}: I_ContentFrame_Props) => {
    const [open, setOpenFrame] = React.useState(defaultOpen);
    return (
        <Box border={[{ color: 'brand', size: 'small' }]} flex={false} round="small">
            <Header pad="small">
                <Text>{title}</Text>
                {collapsible && (
                    <Button
                        disabled={!showBody}
                        icon={open ? <FormUp /> : <FormDown />}
                        onClick={() => setOpenFrame(!open)}
                        plain
                    />
                )}
            </Header>
            {open && showBody && <SkeletonDivider skeleton={false} />}
            {open && showBody && <Main pad="small">{children}</Main>}
        </Box>
    );
};
