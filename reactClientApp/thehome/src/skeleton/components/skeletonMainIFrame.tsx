import React, { FC } from 'react';
import { T_AppComponentStructure } from '../types/frameworkTypes';

const MainIFrame: FC<any> = () => {
    return (
        <iframe
            src="http://localhost:3001/?appVariant=embedded"
            width="100%"
            height="100%"
            title="embbed"
            frameBorder="0"
            style={{ border: 'none' }}
        />
    );
};

export const MainIFrameStructure: T_AppComponentStructure = {
    menuName: 'iFrame',
    component: MainIFrame,
    parameters: {},
    default: true,
};
