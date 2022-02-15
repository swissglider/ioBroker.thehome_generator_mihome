const getLegacyAdapter = async (adapter: ioBroker.Adapter): Promise<ioBroker.GetObjectViewItem> => {
    const adapterName = adapter.config.iobLegacyAdapterName;
    try {
        const legacyAdapter = await adapter.getObjectViewAsync('system', 'adapter', {
            startkey: `system.adapter.${adapterName ? adapterName : ''}`,
            endkey: `system.adapter.${adapterName ? adapterName : ''}\u9999`,
        });
        if (!(legacyAdapter && legacyAdapter.rows && legacyAdapter.rows[0])) {
            throw new Error(`There is no ${adapterName} Adapter`);
        }
        return legacyAdapter.rows[0];
    } catch (error) {
        throw error;
    }
};

export default getLegacyAdapter;
