type T_Mapping = Record<string, Record<string, Record<'functionID' | 'toInfluxDB', any>>>;

export const Mapping: T_Mapping = {
    Tor: {
        connected: {
            functionID: 'enum.functions.Verbunden',
            toInfluxDB: false,
        },
        dimmer: {
            functionID: 'enum.functions.Dimmer',
            toInfluxDB: false,
        },
        illumination: {
            functionID: 'enum.functions.Beleuchtungsstärke',
            toInfluxDB: true,
        },
        on: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        rgb: {
            functionID: 'enum.functions.Farbe',
            toInfluxDB: false,
        },
        volume: {
            functionID: 'enum.functions.Lautstärke',
            toInfluxDB: false,
        },
    },
    Wetter: {
        doublePress: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        humidity: {
            functionID: 'enum.functions.Luftfeuchtigkeit',
            toInfluxDB: true,
        },
        percent: {
            functionID: 'enum.functions.BatterieStatus',
            toInfluxDB: false,
        },
        pressure: {
            functionID: 'enum.functions.Luftdruck',
            toInfluxDB: true,
        },
        temperature: {
            functionID: 'enum.functions.Temperatur',
            toInfluxDB: true,
        },
    },
    Steckdose: {
        load_power: {
            functionID: 'enum.functions.Leistung',
            toInfluxDB: true,
        },
        power_consumed: {
            functionID: 'enum.functions.Energie',
            toInfluxDB: false,
        },
        state: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
    },
    Bewegung: {
        lux: {
            functionID: 'enum.functions.Beleuchtungsstärke',
            toInfluxDB: true,
        },
        percent: {
            functionID: 'enum.functions.Bewegung',
            toInfluxDB: true,
        },
        state: {
            functionID: 'enum.functions.BatterieStatus',
            toInfluxDB: false,
        },
    },
    Fenster: {
        percent: {
            functionID: 'enum.functions.BatterieStatus',
            toInfluxDB: false,
        },
        state: {
            functionID: 'enum.functions.Fenster',
            toInfluxDB: true,
        },
    },
    Türe: {
        percent: {
            functionID: 'enum.functions.BatterieStatus',
            toInfluxDB: false,
        },
        state: {
            functionID: 'enum.functions.Türe',
            toInfluxDB: true,
        },
    },
    Dachfenster: {
        percent: {
            functionID: 'enum.functions.BatterieStatus',
            toInfluxDB: true,
        },
        state: {
            functionID: 'enum.functions.Fenster',
            toInfluxDB: true,
        },
    },
    Mobilerschalter: {
        percent: {
            functionID: 'enum.functions.BatterieStatus',
            toInfluxDB: false,
        },
        click: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        double: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        long: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        channel_0: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        channel_0_double: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        channel_0_long: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        channel_1: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        channel_1_double: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        channel_1_long: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
        dual_channel: {
            functionID: 'enum.functions.Schalter',
            toInfluxDB: false,
        },
    },
};
