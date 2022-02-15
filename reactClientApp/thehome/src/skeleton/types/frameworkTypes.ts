const sizeValues: string[] = ['small', 'medium', 'large'];
export type T_Size = typeof sizeValues[number];

const appVariantValues: string[] = ['full', 'embedded'];
export type T_AppVariant = typeof appVariantValues[number];

export type T_AppComponentStructure = {
    menuName: string;
    component?: React.FunctionComponent;
    parameters?: Record<string, any>;
    mainMenu?: boolean; // standard true
    moreMenu?: boolean; // standard false
    default?: boolean; // standard false
    menuIcon?: React.ComponentType<any>;
    isEmbedded?: boolean; // if iFrame embedded
    embeddedLink?: string; // html link to the embedded Site for the iFrame
};

export type T_AppStructure = Record<string, T_AppComponentStructure>;

const appSevirityValues: string[] = ['info', 'success', 'warning', 'critical', 'error'];
export type T_AppSeverity = typeof appSevirityValues[number];

export type T_AppMessage = {
    time: number; // millisecond
    severity: T_AppSeverity;
    msgTitle: string;
    msgMessage: string;
    new: boolean;
    msgError?: Error;
    popUpOnSkeleton?: boolean;
};
