const getLegacyAdapterInstances = async (adapter: ioBroker.Adapter): Promise<ioBroker.GetObjectViewItem[]> => {
    const adapterName = adapter.config.iobLegacyAdapterName;
    try {
        const instances = await adapter.getObjectViewAsync('system', 'instance', {
            startkey: `system.adapter.${adapterName ? adapterName + '.' : ''}`,
            endkey: `system.adapter.${adapterName ? adapterName + '.' : ''}\u9999`,
        });
        if (!(instances && instances.rows && instances.rows[0])) {
            throw new Error(`There is no ${adapterName} Adapter`);
        }
        return instances.rows;
    } catch (error) {
        throw error;
    }
};

export default getLegacyAdapterInstances;
