import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';
import { TAppLocale } from '@interfaces/locale';

export type TLanguage = {
    name: React.ReactNode,
    code: TAppLocale,
};

export interface ILangProps extends WithStyles<typeof styles> {
    appLocale: TAppLocale;
    switchLocaleAction: (payload: ILocaleActionPayload) => void;
}

export interface ILangState {
    anchorElement: HTMLElement | null;
}
