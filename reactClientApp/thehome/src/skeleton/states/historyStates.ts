import { createState, State, useState } from '@hookstate/core';
import { S_appSelectedComponent } from './appStructureStates';

// ************************************************************************************************************
// History States
// ************************************************************************************************************

export const S_appCurrentShownComponentHistoryID = createState<number | 'last'>('last');
export const S_appComponentHistory = createState<string[]>([]);
const wrapS_appComponentHistory = (state: State<string[]>) => ({
    changeComponent: (scID: string) => {
        if (S_appCurrentShownComponentHistoryID.get() === 'last') {
            state[state.length].set(scID);
        } else {
            const index = S_appCurrentShownComponentHistoryID.get() as number;
            state.set((p) => {
                p.splice(index + 1, p.length, scID);
                return p;
            });
        }
        S_appCurrentShownComponentHistoryID.set('last');
    },
    back: (steps = 1) => {
        const tIndex = S_appCurrentShownComponentHistoryID.get();
        const index: number = tIndex === 'last' ? state.length - 1 : tIndex;
        const newIndex = index < steps ? 0 : index - steps;
        const scID = state[newIndex].get();
        S_appCurrentShownComponentHistoryID.set(newIndex);
        S_appSelectedComponent.set(scID);
    },
    forward: (steps = 1) => {
        const tIndex = S_appCurrentShownComponentHistoryID.get();
        const index: number = tIndex === 'last' ? state.length - 1 : tIndex;
        if (state.length - 1 < steps + index) {
            S_appCurrentShownComponentHistoryID.set('last');
            S_appSelectedComponent.set(state[state.length - 1].get());
            return;
        }
        const newIndex = steps + index;
        const scID = state[newIndex].get();
        S_appCurrentShownComponentHistoryID.set(newIndex);
        S_appSelectedComponent.set(scID);
    },
});

export const useComponentHistory = () => wrapS_appComponentHistory(useState(S_appComponentHistory));
