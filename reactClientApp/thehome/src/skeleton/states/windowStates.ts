import { createState, useState } from '@hookstate/core';
import { Skeleton } from '..';

// ************************************************************************************************************
// Size of the Window
// ************************************************************************************************************

const S_sizeState = createState<Skeleton.Types.T_Size>('small');
export const useSizeState = () => useState(S_sizeState);
