const getIOBName = (adapter: ioBroker.Adapter, name: ioBroker.StringOrTranslated): string => {
    const systemLanguage: ioBroker.Languages = adapter.systemConfig?.language ?? 'en';
    if (typeof name === 'string') {
        return name;
    } else if (
        typeof name === 'object' &&
        typeof systemLanguage === 'string' &&
        systemLanguage &&
        systemLanguage in name &&
        name[systemLanguage]
    ) {
        return name[systemLanguage] as string;
    } else if (typeof name === 'object' && 'en' in name && name.en) {
        return name.en;
    } else if (typeof name === 'object' && 'de' in name && name.de) {
        return name.de;
    } else {
        return name.toString();
    }
};

export default getIOBName;
