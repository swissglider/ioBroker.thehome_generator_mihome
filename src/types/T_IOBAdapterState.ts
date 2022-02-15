export const IOBAdapterStates = ['none', 'installed', 'running', 'connected'] as const;
export type T_IOBAdapterStates = typeof IOBAdapterStates[number];
