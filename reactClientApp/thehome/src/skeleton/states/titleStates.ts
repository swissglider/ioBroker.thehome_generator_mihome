import { createState, useState } from '@hookstate/core';

// ************************************************************************************************************
// Titel Shown --> should be set on App.tsx
// ************************************************************************************************************

const S_appTitleState = createState<string>('');
export const useTitleState = () => useState(S_appTitleState);
