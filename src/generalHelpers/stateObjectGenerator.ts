import { Mapping } from '../config/stateObjectMapping';
import I_IOBObject from '../types/I_Adapter';
import getRandomString from './GetRandomKey';
import getIOBName from './iobNameGetter';

const generateStateOnject = async (
    adapter: ioBroker.Adapter,
    channel: I_IOBObject,
    metaData: I_IOBObject[],
): Promise<void> => {
    const iobStates = await adapter.getForeignObjectsAsync(channel.iobID + '*', 'state');
    if (channel.channelType) {
        for (const iobState of Object.values(iobStates)) {
            // check if needed
            const stateName = iobState._id.split('.').pop();
            if (!(stateName && Mapping[channel.channelType] && Mapping[channel.channelType][stateName])) continue;

            // generate stateObject
            const iobName = getIOBName(adapter, iobState.common.name);
            const stateObject: I_IOBObject = {
                displayName: `${channel.displayName} - ${iobName}`,
                iobName: iobName,
                iobID: iobState._id,
                roomEnumID: channel.roomEnumID,
                functionEnumID: Mapping[channel.channelType][stateName].functionID as string,
                role: iobState.common.role,
                write: iobState.common.write,
                read: iobState.common.read,
                unit: iobState.common.unit,
                valueType: iobState.common.type,
                icon: iobState.common.icon,
                desc: iobState.common.desc,
                min: iobState.common.min,
                max: iobState.common.max,
                step: iobState.common.step,
                def: iobState.common.step,
                defAck: iobState.common.defAck,
                states: iobState.common.states,
                workingID: iobState.common.workingID,
                custom: iobState.common.custom,
                history: iobState.common.history,
                native: iobState.native,
                saveToHistory: Mapping[channel.channelType][stateName].toInfluxDB as boolean,
                additionalPositionInfo: channel.additionalPositionInfo,
                iobType: 'StateObject',
                id: getRandomString(),
                parentID: channel.id,
            };
            metaData.push(stateObject);
        }
    }
};

export default generateStateOnject;
