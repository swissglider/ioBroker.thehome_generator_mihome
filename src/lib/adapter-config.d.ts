// This file extends the AdapterConfig type from "@types/iobroker"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            option1: boolean;
            option2: string;
            mihome_cloud_username: string;
            mihome_cloud_password: string;
            mihome_country: string;
            mihome_cloud_username_0: string;
            mihome_cloud_password_0: string;
            mihome_country_0: string;
            mihome_cloud_username_1: string;
            mihome_cloud_password_1: string;
            mihome_country_1: string;
            mihome_cloud_username_2: string;
            mihome_cloud_password_2: string;
            mihome_country_2: string;
            mihome_cloud_username_3: string;
            mihome_cloud_password_3: string;
            mihome_country_3: string;
            iobLegacyAdapterName: string;
        }
    }
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
