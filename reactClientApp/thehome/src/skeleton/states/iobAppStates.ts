import { createState, State, useState } from '@hookstate/core';
import Connection from '@iobroker/adapter-react/Connection';

type T_IOBLegacyAdapter = {
    instance: number;
};
const S_appIOBLegacyAdapter = createState<T_IOBLegacyAdapter>({ instance: 0 });
export const useIOBLegacyAdapter = () => useState(S_appIOBLegacyAdapter);

type T_IOBStateType = {
    adapterName: string;
    instance: number;
    instanceName: string;
    socket: Connection | undefined;
};

const S_iobGenericApp = createState<T_IOBStateType>({
    socket: undefined,
    adapterName: '',
    instance: 0,
    instanceName: `.0`,
});
const wrapS_iobGenericApp = (state: State<T_IOBStateType>) => ({
    isSocketOK: () =>
        state.value &&
        state.value.socket !== undefined &&
        state.value.socket.isConnected() &&
        state.value.socket.connected,
    getSocket: () => state.socket.value,
    getAdapterName: () => state.adapterName.value,
    getInstance: () => state.instance.value,
    getInstanceName: () => state.instanceName.value,
});
export const useIOBGenericApp = () => wrapS_iobGenericApp(useState(S_iobGenericApp));
export const useIOBGenericAppFull = () => useState(S_iobGenericApp);

const S_iobAppTest = createState<boolean>(true);
export const useIOBAppTest = () => useState(S_iobAppTest);
