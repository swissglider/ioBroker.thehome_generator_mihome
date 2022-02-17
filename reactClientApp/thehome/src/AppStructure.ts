import { Skeleton } from '@swissglider/react_skeleton_framework';
import { Add, DocumentStore, Home, Organization, Technology } from 'grommet-icons';
import CountryDeviceListComponent from './components/countryDeviceListComponent';
import HomeComponent from './components/homeComponent';
import testJsonData from './testStack/metaData.json';

export const APP_NAME: string = 'TheHome MiHome Generator';

export const IS_IOB_APP: boolean = true;
export const IOB_ADAPTER_NAME: string = 'thehome_generator_mihome';

export const AppStructure: Skeleton.Types.T_AppStructure = {
    Home: {
        menuName: 'Home',
        component: HomeComponent,
        mainMenu: true,
        moreMenu: false,
        default: true,
        menuIcon: Home,
    },
    MetaData: {
        menuName: 'Meta Data',
        component: Skeleton.Components.MetaDataGridComponent,
        parameters: { testJsonData: testJsonData },
        mainMenu: true,
        moreMenu: false,
        default: false,
        menuIcon: DocumentStore,
    },
    XiaomiDevices: {
        menuName: 'Xiaomi Devices',
        component: CountryDeviceListComponent,
        mainMenu: true,
        moreMenu: false,
        default: false,
        menuIcon: Technology,
    },
    Test1: {
        menuName: 'Test1',
        component: Skeleton.Components.TestComponent,
        parameters: { name: 'Hallo', subFrames: 2 },
        mainMenu: false,
        moreMenu: true,
        default: false,
        menuIcon: Add,
    },
    Test2: {
        menuName: 'Test2',
        component: Skeleton.Components.TestComponent,
        parameters: { name: 'hallo2', subFrames: 20 },
        mainMenu: false,
        moreMenu: true,
        default: false,
        menuIcon: Organization,
    },
    AppInfo: { ...{ mainMenu: false }, ...Skeleton.Components.InfoStateComponentStructure },
    MenuTest: { ...{ mainMenu: false, moreMenu: true }, ...Skeleton.Components.MenuTestComponentStructure },
};
