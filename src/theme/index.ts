import { createMuiTheme } from '@material-ui/core/styles';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { IAppContainerStyles } from './properties/new/appContainerStyles';
import { IAppFixedDimensions } from './properties/new/appFixedDimensions';
import { IAppColors } from './properties/new/appColors';
import { IAppModules } from '@theme/properties/new/appModules';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        appContainerStyles: IAppContainerStyles;
        appFixedDimensions: IAppFixedDimensions;
        appColors: IAppColors;
        appModules: IAppModules;
    }

    interface ThemeOptions {
        appContainerStyles?: IAppContainerStyles;
        appFixedDimensions?: IAppFixedDimensions;
        appColors?: IAppColors;
        appModules?: IAppModules;
    }

    interface TypographyOptions {
        typography?: ThemeOptions['typography'];
    }
}

export function createSprykerTheme(options: ThemeOptions) {
    return createMuiTheme({
        ...options,
    });
}

export const baseTheme = createMuiTheme();
