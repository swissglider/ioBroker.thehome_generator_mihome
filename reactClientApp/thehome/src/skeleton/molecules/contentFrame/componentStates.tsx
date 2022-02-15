import { createState, useState } from '@hookstate/core';
import { Icon } from 'grommet-icons';

// SFSC = SkeletonFrameStructConfigurations
// SFSC = SkeletonFrameStruct

const SFSC: string[] = [
    'scope',
    'id',
    'title',
    'collapsible',
    'collapsed',
    'closable',
    'closed',
    'showBody',
    'titleIcon',
];

type T_SFCS = typeof SFSC[number];
type T_SFS_Scope = string;
type T_SFS_ID = string;
export type T_SFCs = Record<T_SFCS, any>;
export type T_SFC_IDs = Record<T_SFS_ID, T_SFCs>;
export type T_SFC_Scopes = Record<T_SFS_Scope, T_SFC_IDs>;

export const S_SFC_State = createState<T_SFC_Scopes>({});
const wrapS_SFC_State = (state: T_SFC_Scopes) => ({
    isClosed: (scope: string, id: string) => state[scope][id]?.value?.closed ?? false,
    isCollapsed: (scope: string, id: string) => state[scope][id]?.value?.collapsed ?? false,
    isShowBody: (scope: string, id: string) => state[scope][id]?.value?.showBody ?? true,
    isCollapsible: (scope: string, id: string) => state[scope][id]?.value?.collapsible ?? false,
    isClosable: (scope: string, id: string) => state[scope][id]?.value?.closable ?? false,

    getTitle: (scope: string, id: string) => state[scope][id]?.value?.title ?? id,
    setTitle: (scope: string, id: string, title: string) => state[scope][id]?.title.set(title),

    getTitleIcon: (scope: string, id: string) => state[scope][id]?.value?.titleIcon ?? undefined,
    setTitleIcon: (scope: string, id: string, titleIcon: Icon) => state[scope][id]?.titleIcon.set(titleIcon),

    setCollapsible: (scope: string, id: string, collapsible: boolean) => state[scope][id]?.collapsible.set(collapsible),
    toggleCollapsible: (scope: string, id: string) => state[scope][id]?.collapsible.set((p: boolean) => !p),

    setCollapsed: (scope: string, id: string, collapsed: boolean) => state[scope][id]?.collapsed.set(collapsed),
    toggleCollapsed: (scope: string, id: string) => state[scope][id]?.collapsed.set((p: boolean) => !p),
    setClosed: (scope: string, id: string, closed: boolean) => state[scope][id]?.closed.set(closed),
    toggleClosed: (scope: string, id: string) => state[scope][id]?.closed.set((p: boolean) => !p),
    setShowBody: (scope: string, id: string, showBody: boolean) => state[scope][id]?.showBody.set(showBody),
    setClosable: (scope: string, id: string, closable: boolean) => state[scope][id]?.closable.set(closable),

    setScopeCollapsible: (scope: string, collapsible: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].collapsible.set(collapsible)),
    setScopeCollapsed: (scope: string, collapsed: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].collapsed.set(collapsed)),
    setScopeClosable: (scope: string, closable: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].closable.set(closable)),
    setScopeClosed: (scope: string, closed: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].closed.set(closed)),
    setScopeShowBody: (scope: string, showBody: boolean) =>
        state[scope].keys?.forEach((e: string) => state[scope][e].showBody.set(showBody)),
});
export const useComponentFrameState = () => wrapS_SFC_State(useState(S_SFC_State));
