import { createState, useState } from '@hookstate/core';

export type T_CountryDeviceListType = Record<string, any>;

const S_CountryDeviceListGridComponentDetail = createState<T_CountryDeviceListType>({} as T_CountryDeviceListType);
export const useCountryDeviceListGridComponentDetail = () => useState(S_CountryDeviceListGridComponentDetail);

const S_countryDeviceListGridComponent = createState<T_CountryDeviceListType[]>([]);
export const useCountryDeviceListGridComponent = () => useState(S_countryDeviceListGridComponent);
