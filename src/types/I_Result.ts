import I_IOBObject from './I_Adapter';

export const IsReadyErrorTypes = ['connection', 'configuration', 'adapter', 'auth', 'other', 'generating'] as const;
export type T_IsReadyErrorTypes = typeof IsReadyErrorTypes[number];

export interface I_IsReadyResult {
    result: boolean;
    error?: {
        errorType: T_IsReadyErrorTypes;
        errorInfo: string;
    };
}

export type T_IsReadyResults = I_IsReadyResult[];

export interface I_GetMetaDataResult {
    result: I_IOBObject[] | undefined;
    error?: {
        errorType: T_IsReadyErrorTypes;
        errorInfo: string;
    };
}
