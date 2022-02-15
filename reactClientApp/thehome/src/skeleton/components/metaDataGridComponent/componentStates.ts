import { createState, useState } from '@hookstate/core';

export type T_DetailType = {
    id: string;
    parentID?: string;
    displayName?: string;

    iobType?: string;
    iobName?: string;
    iobID?: string;

    channelType?: string;
    roomEnumID?: string;
    functionEnumID?: string;

    role?: string;
    write?: boolean;
    read?: boolean;
    unit?: string;
    valueType?: string;
    icon?: string;
    desc?: any;
    min?: any;
    max?: any;

    saveToHistory?: boolean;
    additionalPositionInfo?: string[];
};

const S_GridComponentDetail = createState<T_DetailType>({} as T_DetailType);
export const useGridComponentDetail = () => useState(S_GridComponentDetail);

const S_MetaDataGridComponent = createState<T_DetailType[]>([]);
export const useMetaDataGridComponent = () => useState(S_MetaDataGridComponent);
