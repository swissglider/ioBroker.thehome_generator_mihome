import Connection from '@iobroker/adapter-react/Connection';

const sendTo = async (
    socket: Connection,
    instance: string,
    command: string,
    data: ioBroker.MessagePayload = {},
    time: number = 1000,
): Promise<any | undefined> => {
    const timeout = (prom: any, time: number, exception: any) => {
        let timer: any;
        return Promise.race([prom, new Promise((_r, rej) => (timer = setTimeout(rej, time, exception)))]).finally(() =>
            clearTimeout(timer),
        );
    };
    const fn = async () => {
        return await socket.sendTo(instance, command, data);
    };

    const timeoutError = Symbol();
    try {
        return await timeout(fn(), time, timeoutError);
        // handle result
    } catch (e) {
        if (e === timeoutError) {
            console.log('timeoutError2');
            return {
                error: {
                    errorType: 'timeout',
                    time: time,
                    instance: instance,
                    command: command,
                    errorInfo: `Timeout reached after ${time / 1000}sec. for sendTo(${instance} - ${command})`,
                },
            };
        } else {
            // other error
            throw e;
        }
    }
};

export const SocketHelper = {
    sendTo: sendTo,
};
