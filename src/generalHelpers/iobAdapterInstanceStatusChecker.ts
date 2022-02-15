import { T_IOBAdapterStates } from '../types/T_IOBAdapterState';

const IOBAdapterInstanceStateChecker = async (
    adapter: ioBroker.Adapter,
    instance: ioBroker.GetObjectViewItem,
): Promise<T_IOBAdapterStates> => {
    let result: T_IOBAdapterStates = 'none';

    const instancePath = instance.id.replace(/system.adapter./g, '');

    const results = await Promise.all([
        adapter.getForeignStatesAsync(`${instance.id}.alive`),
        adapter.getForeignStatesAsync(`${instance.id}.connected`),
        adapter.getForeignStatesAsync(`${instancePath}.info.connection`),
    ]);
    if (`${instance.id}.alive` in results[0]) {
        result = 'installed';
    }
    if (
        `${instance.id}.connected` in results[1] &&
        results[1][`${instance.id}.connected`].val === true &&
        `${instance.id}.alive` in results[0] &&
        results[0][`${instance.id}.alive`].val === true
    ) {
        result = 'running';
    }
    if (
        (result === 'running' &&
            `${instancePath}.info.connection` in results[2] &&
            (results[2][`${instancePath}.info.connection`].val === true ||
                (typeof results[2][`${instancePath}.info.connection`].val === 'string' &&
                    results[2][`${instancePath}.info.connection`].val !== ''))) ||
        (result === 'running' && Object.keys(results[2]).length === 0)
    ) {
        result = 'connected';
    }

    if (result === 'connected') return result;
    return result;
};

export default IOBAdapterInstanceStateChecker;
