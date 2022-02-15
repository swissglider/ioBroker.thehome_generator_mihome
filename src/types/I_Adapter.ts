export const ChannelTypes = [
    'Wetter',
    'Dachfenster',
    'Fenster',
    'Türe',
    'Mobilerschalter',
    'Steckdose',
    'Tor',
    'Bewegung',
    'Wandschalter',
    'Lichtschalter',
    'Storen',
    'Wärme',
    'Sonnenstoren',
    'Heizung',
    'Rauchwarnmelder',
    'Shelly',
    'Switch',
    '4CH',
    'RelaisSchalter',
    'Zimmer',
    'Zone',
    'Lichtgruppe',
    'Aktualles_Wetter',
    'ForecastNächsteStunde_Wetter',
    'Lampe_Color',
    'Lampe_Dimmer',
    'Lampe_Switch',
] as const;
export type T_ChannelTypes = typeof ChannelTypes[number];

const IOBTypes = ['StateObject', 'Channel', 'Device', 'Instance', 'Adapter'];
export type T_IOBTypes = typeof IOBTypes[number];

export default interface I_IOBObject {
    id: string;
    parentID?: string;
    displayName: string;
    iobType: T_IOBTypes;
    iobName?: string;
    iobID?: string;
    channelType?: T_ChannelTypes;
    roomEnumID?: string;
    functionEnumID?: string;
    role?: string;
    write?: boolean;
    read?: boolean;
    unit?: string;
    valueType?: ioBroker.CommonType;
    icon?: string;
    desc?: any;
    min?: any;
    max?: any;
    step?: any;
    def?: any;
    defAck?: any;
    states?: any;
    workingID?: any;
    custom?: any;
    history?: any;
    native?: any;
    saveToHistory?: boolean;
    additionalPositionInfo?: string[];
}
