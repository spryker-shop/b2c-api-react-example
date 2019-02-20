import * as React from 'react';
import { baseTheme } from '@theme/';
import { appColors } from '@theme/properties/new/appColors';

export interface IAppModules {
    chip: {
        margin: React.CSSProperties['margin'];
        display: React.CSSProperties['display'];
        justifyContent: React.CSSProperties['justifyContent'];
    };
    selectedItem: {
        backgroundColor: React.CSSProperties['backgroundColor'];
        color: React.CSSProperties['color'];
    };
}

export const appModules: IAppModules = {
    chip: {
        margin: baseTheme.spacing.unit / 2,
        display: 'flex',
        justifyContent: 'space-between',
    },
    selectedItem: {
        backgroundColor: `${appColors.black} !important`,
        color: appColors.white,
    },
};
