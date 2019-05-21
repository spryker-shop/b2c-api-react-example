import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';

export type TLanguage = {
    name: JSX.Element,
    code: string | null
};

export interface ILangProps extends WithStyles<typeof styles> {
    appLocale?: string | null;
    switchLocaleAction?: (payload: ILocaleActionPayload) => void;
}

export interface ILangState {
    anchorElement: HTMLElement | null;
}
