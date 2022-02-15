import { createState, none, State, useState } from '@hookstate/core';
import { DummyComponentStructure } from '../components/skeletonDummyComponent';
import { ShowMSGComponentStructure } from '../components/skeletonShowMSGComponent';
import { T_AppComponentStructure, T_AppStructure } from '../types/frameworkTypes';
import { S_appComponentHistory, S_appCurrentShownComponentHistoryID } from './historyStates';

// ************************************************************************************************************
// Components --> Components and Menu defined in AppStructure.ts
// ************************************************************************************************************

export const S_appSelectedComponent = createState<string>('');
const wrapS_appSelectedComponent = (s: State<string>) => ({
    get: () => s.value,
    getComponent: () => {
        if (s.value === 'ShowMSG') return ShowMSGComponentStructure;
        return S_appAppStructure[s.value].get() ?? DummyComponentStructure;
    },
    set: (sc: string) => {
        s.set(sc);

        if (S_appCurrentShownComponentHistoryID.get() === 'last') {
            S_appComponentHistory[S_appComponentHistory.length].set(sc);
        } else {
            const index = S_appCurrentShownComponentHistoryID.get() as number;
            S_appComponentHistory.set((p) => {
                p.splice(index + 1, p.length, sc);
                return p;
            });
        }
        S_appCurrentShownComponentHistoryID.set('last');
    },
});
export const useSelectedComponent = () => wrapS_appSelectedComponent(useState(S_appSelectedComponent));

// ************************************************************************************************************
// AppStructure --> Components and Menu defined in AppStructure.ts
// ************************************************************************************************************

const S_appAppStructure = createState<T_AppStructure>({} as T_AppStructure);
const wrapS_appAppStructure = (state: State<T_AppStructure>) => ({
    get: () => state.value,
    set: (as: T_AppStructure) => {
        state.set(as);
    },
    addNewMenu: (title: string, acs: T_AppComponentStructure) => {
        state[title].set(acs);
    },
    deleteMenu: (title: string) => {
        state[title].set(none);
    },
    isMenuAvailable: (title: string): boolean => {
        const available = state[title].value;
        return available !== undefined;
    },
});
export const useAppStructure = () => wrapS_appAppStructure(useState(S_appAppStructure));
