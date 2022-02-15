import React, { FC } from 'react';
import { T_AppComponentStructure } from '../types/frameworkTypes';

const DummyComponent: FC<any> = () => {
    return <div>No default set</div>;
};

export const DummyComponentStructure: T_AppComponentStructure = {
    menuName: 'No Default set of Component not configured',
    component: DummyComponent,
    parameters: {},
    default: true,
};
