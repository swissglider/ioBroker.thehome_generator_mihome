import getRandomString from '../generalHelpers/GetRandomKey';
import IOBAdapterInstanceStateChecker from '../generalHelpers/iobAdapterInstanceStatusChecker';
import getIOBName from '../generalHelpers/iobNameGetter';
import getLegacyAdapter from '../generalHelpers/legacyAdapterGetter';
import getLegacyAdapterInstances from '../generalHelpers/legacyAdapterInstanceGetter';
import generateStateOnject from '../generalHelpers/stateObjectGenerator';
import I_IOBObject from '../types/I_Adapter';
import { I_GetMetaDataResult, T_IsReadyResults } from '../types/I_Result';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AuthMiIO, ApiMiIO } = require('miio-token-extractor');

const _getPerCountryDeviceList = async (login: string, password: string, country = ''): Promise<any> => {
    try {
        const authMiIO = new AuthMiIO();
        const apiMiIO = new ApiMiIO();
        const { userId, token, ssecurity } = await authMiIO.login(login, password);
        const devices = await apiMiIO.getDeviceList(userId, ssecurity, token, country);
        return devices;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

const _getGatewayToken = async ({ login, password, country }: Record<string, any>): Promise<string | undefined> => {
    const devices = await _getPerCountryDeviceList(login, password, country);
    const gateway = devices.find((e: any) => e.parent_id === '' && e.token && e.model === 'lumi.gateway.v3');
    return gateway ? gateway.token : undefined;
};

const _getParamsPerInstanceAndCountry = (adapter: ioBroker.Adapter, instance: number, country?: string): string[] => {
    const login =
        adapter.config[
            instance === 0
                ? 'mihome_cloud_username_0'
                : instance === 1
                ? 'mihome_cloud_username_1'
                : instance === 2
                ? 'mihome_cloud_username_2'
                : 'mihome_cloud_username_3'
        ];
    const password =
        adapter.config[
            instance === 0
                ? 'mihome_cloud_password_0'
                : instance === 1
                ? 'mihome_cloud_password_1'
                : instance === 2
                ? 'mihome_cloud_password_2'
                : 'mihome_cloud_password_3'
        ];
    const _country =
        country !== undefined
            ? country
            : adapter.config[
                  instance === 0
                      ? 'mihome_country_0'
                      : instance === 1
                      ? 'mihome_country_1'
                      : instance === 2
                      ? 'mihome_country_2'
                      : 'mihome_country_3'
              ];
    return [login, password, _country];
};

const getMetaData = async (
    adapter: ioBroker.Adapter,
    instance: number,
    country?: string,
): Promise<I_GetMetaDataResult> => {
    const legacyAdapterName = adapter.config.iobLegacyAdapterName;
    const metaData: I_IOBObject[] = [];
    try {
        // generate adapter
        const iobLegacyAdapter = await getLegacyAdapter(adapter);
        const iobAdapter: I_IOBObject = {
            displayName: iobLegacyAdapter.value?.common?.title ?? '',
            iobName: iobLegacyAdapter.value?.common?.name
                ? getIOBName(adapter, iobLegacyAdapter.value.common.name)
                : '',
            iobID: legacyAdapterName,
            iobType: 'Adapter',
            id: getRandomString(),
        };

        metaData.push(iobAdapter);

        // generate instances
        const iobLegacyAdapterInstances = await getLegacyAdapterInstances(adapter);
        let iobLegacyAdapterInstanceIndex = 0;
        for (const iobLegacyAdapterInstance of iobLegacyAdapterInstances) {
            const iobIDInstance =
                `${legacyAdapterName}.${iobLegacyAdapterInstance.value?._id.split('.').pop()}` ??
                `${legacyAdapterName}.${iobLegacyAdapterInstanceIndex}`;
            const iobInstance: I_IOBObject = {
                displayName:
                    `${iobLegacyAdapterInstance.value?.common?.title} - Instance ${iobLegacyAdapterInstance.value?._id
                        .split('.')
                        .pop()}` ?? `${legacyAdapterName}.${iobLegacyAdapterInstanceIndex}`,
                iobName: iobLegacyAdapterInstance.value?.common?.name
                    ? `${getIOBName(
                          adapter,
                          iobLegacyAdapterInstance.value.common.name,
                      )} - Instance ${iobLegacyAdapterInstance.value?._id.split('.').pop()}`
                    : `${legacyAdapterName}.${iobLegacyAdapterInstanceIndex}`,
                iobID: iobIDInstance,
                iobType: 'Instance',
                id: getRandomString(),
                parentID: iobAdapter.id,
            };
            metaData.push(iobInstance);

            // generate Device & Channel
            const iobChannels = await adapter.getForeignObjectsAsync(legacyAdapterName + '*', 'channel');
            const [login, _password, _country] = _getParamsPerInstanceAndCountry(adapter, instance, country);

            const miDevices = await _getPerCountryDeviceList(login, _password, _country);
            for (const channel of Object.values(iobChannels)) {
                if (channel._id === 'mihome.0.info') continue;
                const miDevice = channel._id.includes('.gateway_')
                    ? miDevices.find((e: any) => e.model && e.model.includes('lumi.gateway.'))
                    : miDevices.find(
                          (e: any) => channel.native?.sid && e.did && e.did.split('.').pop() === channel.native?.sid,
                      );
                try {
                    const [channelType, roomName, ...additionalPositionInfo] = miDevice.name.split(' ');
                    const iobDevices: I_IOBObject = {
                        displayName: miDevice.name ?? '',
                        iobType: 'Device',
                        id: getRandomString(),
                        parentID: iobInstance.id,
                    };
                    const iobChannel: I_IOBObject = {
                        iobID: channel._id,
                        displayName: miDevice.name ?? '',
                        iobName: getIOBName(adapter, channel.common.name),
                        roomEnumID: 'enum.rooms.' + roomName,
                        channelType: channelType,
                        additionalPositionInfo: additionalPositionInfo,
                        iobType: 'Channel',
                        id: getRandomString(),
                        parentID: iobDevices.id,
                    };
                    // generate and add stateObject to channel
                    await generateStateOnject(adapter, iobChannel, metaData);

                    // add to device and interface
                    metaData.push(iobChannel);
                    metaData.push(iobDevices);
                } catch (error) {
                    return {
                        result: undefined,
                        error: {
                            errorType: 'generating',
                            errorInfo: `Error on ${legacyAdapterName} channel ${channel} - ${error}`,
                        },
                    };
                }
            }

            // add one to the index ;-
            iobLegacyAdapterInstanceIndex = iobLegacyAdapterInstanceIndex + 1;
        }
        return { result: metaData };
    } catch (error) {
        return {
            result: undefined,
            error: {
                errorType: 'generating',
                errorInfo: `Error on ${legacyAdapterName} - ${error}`,
            },
        };
    }
};

const getToken = async (obj: ioBroker.Message, adapter: ioBroker.Adapter): Promise<void> => {
    const token = await _getGatewayToken((obj.message as any).config).catch((e: Error) => {
        adapter.sendTo(obj.from, obj.command, { error: e.message }, obj.callback);
        return;
    });
    const returnValue = token ? { result: { 'Standard-Gateway-Token': token } } : { error: 'no token found' };
    adapter.sendTo(obj.from, obj.command, returnValue, obj.callback);
};

const getDeviceList = async (obj: ioBroker.Message, adapter: ioBroker.Adapter): Promise<void> => {
    const [login, _password, country] = _getParamsPerInstanceAndCountry(
        adapter,
        (obj.message as any).config.instance,
        (obj.message as any).config.country,
    );
    const devices = await _getPerCountryDeviceList(login, _password, country).catch((e: Error) => {
        adapter.sendTo(obj.from, obj.command, { error: e.message }, obj.callback);
        return;
    });
    adapter.sendTo(obj.from, obj.command, { result: devices }, obj.callback);
};

const isReady = async (adapter: ioBroker.Adapter): Promise<T_IsReadyResults> => {
    const adapterInstances = await getLegacyAdapterInstances(adapter);
    const results: T_IsReadyResults = [];
    for (const adapterInstance of adapterInstances) {
        // check settings
        if (!(adapter && adapter.config.mihome_cloud_username && adapter.config.mihome_cloud_password)) {
            results.push({
                result: false,
                error: {
                    errorType: 'configuration',
                    errorInfo: 'Please check configuration on admin for username and password',
                },
            });
            continue;
        }

        // check connection
        const login = adapter.config.mihome_cloud_username;
        const password = adapter.config.mihome_cloud_password;
        const country = adapter.config.mihome_country ?? '';
        let authMiIO: any;
        let apiMiIO: any;
        try {
            authMiIO = new AuthMiIO();
            apiMiIO = new ApiMiIO();
        } catch (error) {
            results.push({
                result: false,
                error: { errorType: 'connection', errorInfo: `${error}` },
            });
            continue;
        }

        // check authentication
        try {
            await authMiIO.login(login, password);
        } catch (error) {
            results.push({
                result: false,
                error: { errorType: 'auth', errorInfo: `${error}` },
            });
            continue;
        }

        // check country config
        try {
            const { userId, token, ssecurity } = await authMiIO.login(login, password);
            await apiMiIO.getDeviceList(userId, ssecurity, token, country);
        } catch (error) {
            results.push({
                result: false,
                error: { errorType: 'configuration', errorInfo: 'Please check configuration on admin for country' },
            });
            continue;
        }

        // check status legacy adapter
        const iobAdapterStateChecker = await IOBAdapterInstanceStateChecker(adapter, adapterInstance);
        results.push(
            iobAdapterStateChecker === 'connected'
                ? { result: true }
                : {
                      result: false,
                      error: {
                          errorType: 'adapter',
                          errorInfo: `Legacy Adapter [${adapter.config.iobLegacyAdapterName}] State: "${iobAdapterStateChecker}"- not connected`,
                      },
                  },
        );
        continue;
    }
    return results;
};

const MiHomeCloudConnector = {
    getToken: getToken,
    isReady: isReady,
    getMetaData: getMetaData,
    getDeviceList: getDeviceList,
};

export default MiHomeCloudConnector;
