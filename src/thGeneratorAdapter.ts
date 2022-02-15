import MiHomeCloudConnector from './adapterSpecifig/miHomeCloudConnector';
import { I_GetMetaDataResult, T_IsReadyResults } from './types/I_Result';

/**
 * implement here the TheHome getMetaData function
 * @param adapter
 * @returns romise<I_GetMetaDataResult>
 */
const getMetaData = async (
    adapter: ioBroker.Adapter,
    instance: number,
    country?: string,
): Promise<I_GetMetaDataResult> => {
    const result = await MiHomeCloudConnector.getMetaData(adapter, instance, country);
    return result;
};

/**
 * implement here the TheHome isReady function
 * @param adapter
 * @returns Promise<T_IsReadyResults>
 */
const isReady = async (adapter: ioBroker.Adapter): Promise<T_IsReadyResults> => {
    const result = await MiHomeCloudConnector.isReady(adapter);
    return result;
};

const THGeneratorAdapter = {
    getMetaData: getMetaData,
    isReady: isReady,
};

export default THGeneratorAdapter;
