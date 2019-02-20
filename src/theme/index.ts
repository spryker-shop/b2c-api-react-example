import { createMuiTheme } from '@material-ui/core/styles';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { IAppContainerStyles } from './properties/new/appContainerStyles';
import { IAppTypography } from './properties/overwritten/appTypography';
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

    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        appContainerStyles?: IAppContainerStyles;
        appFixedDimensions?: IAppFixedDimensions;
        appColors?: IAppColors;
        appModules?: IAppModules;
    }

    interface TypographyOptions {
        typography?: IAppTypography;
    }
}

export function createSprykerTheme(options: ThemeOptions) {
    return createMuiTheme({
        ...options,
    });
}

// Use it to get base properties (spacing etc) in the custom global solutions
export const baseTheme = createMuiTheme();
