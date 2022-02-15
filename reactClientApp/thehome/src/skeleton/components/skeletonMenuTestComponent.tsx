import React, { FC } from 'react';
import { Box, Button } from 'grommet';
import { Skeleton } from '..';
import { Test, Compare } from 'grommet-icons';

const MenuTestComponent: FC<any> = () => {
    const selectedCompState = Skeleton.States.useSelectedComponent();
    const asState = Skeleton.States.useAppStructure();
    const messageState = Skeleton.States.useMessages();

    const NewSC: Skeleton.Types.T_AppComponentStructure = {
        menuName: 'New',
        component: (): JSX.Element => <div>Ich bin eine neue Componente</div>,
        parameters: {},
        default: false,
        menuIcon: Compare,
    };

    const setDefault = (t: string) => {
        selectedCompState.set(t);
    };

    const addMenu = () => {
        asState.addNewMenu('New', NewSC);
    };

    const delMenu = () => {
        asState.deleteMenu('New');
    };

    const setIFrameTest = () => {
        asState.addNewMenu('iFrameTest', {
            menuName: 'iFrameTest',
            default: false,
            moreMenu: false,
            mainMenu: false,
            isEmbedded: true,
            embeddedLink: '/?appVariant=embedded',
        });
        selectedCompState.set('iFrameTest');
    };

    return (
        <Box gap="small">
            <Skeleton.Parts.ContentFrameSimple title="Menu Tests">
                <Box direction="row" gap="small" wrap>
                    <Button size="small" label="Add Menu" onClick={() => addMenu()} margin={{ bottom: 'xsmall' }} />
                    <Button size="small" label="Delete Menu" onClick={() => delMenu()} margin={{ bottom: 'xsmall' }} />
                    <Button
                        size="small"
                        label="Set Default - Info"
                        onClick={() => setDefault('AppInfo')}
                        margin={{ bottom: 'xsmall' }}
                    />
                    <Button
                        size="small"
                        label="Set Default Wrong"
                        onClick={() => setDefault('halloVelo')}
                        margin={{ bottom: 'xsmall' }}
                    />
                </Box>
            </Skeleton.Parts.ContentFrameSimple>
            <Skeleton.Parts.ContentFrameSimple title="Toast Tests">
                <Box direction="row" gap="small" wrap>
                    <Button
                        size="small"
                        label="Add Info"
                        onClick={() => messageState.addInfo('Info Title', 'Info Message')}
                        margin={{ bottom: 'xsmall' }}
                    />
                    <Button
                        size="small"
                        label="Add Critical"
                        onClick={() => messageState.addCritical('Info Critical', 'This is an Crtical Info')}
                        margin={{ bottom: 'xsmall' }}
                    />
                    <Button
                        size="small"
                        label="Add Critical To Popup"
                        onClick={() =>
                            messageState.addCritical(
                                'Info Critical with PopUp',
                                'This is an Crtical Info with PopUp',
                                true,
                            )
                        }
                        margin={{ bottom: 'xsmall' }}
                    />
                </Box>
            </Skeleton.Parts.ContentFrameSimple>
            <Skeleton.Parts.ContentFrameSimple title="IFrame Tests">
                <Button
                    size="small"
                    label="Open IFrame Comp"
                    onClick={() => setIFrameTest()}
                    margin={{ bottom: 'xsmall' }}
                />
            </Skeleton.Parts.ContentFrameSimple>
        </Box>
    );
};

export const MenuTestComponentStructure: Skeleton.Types.T_AppComponentStructure = {
    menuName: 'MenuTest',
    component: MenuTestComponent,
    parameters: {},
    default: true,
    menuIcon: Test,
};
