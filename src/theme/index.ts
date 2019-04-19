import { createMuiTheme } from '@material-ui/core/styles';
import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { IAppContainerStyles } from './properties/new/appContainerStyles';
import { IAppFixedDimensions } from './properties/new/appFixedDimensions';
import { IAppColors } from './properties/new/appColors';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        appContainerStyles: IAppContainerStyles;
        appFixedDimensions: IAppFixedDimensions;
        appColors: IAppColors;
    }

    interface ThemeOptions {
        appContainerStyles?: IAppContainerStyles;
        appFixedDimensions?: IAppFixedDimensions;
        appColors?: IAppColors;
    }

    interface TypographyOptions {
        typography?: ThemeOptions['typography'];
    }
}

export function createSprykerTheme(options: ThemeOptions): Theme {
    return createMuiTheme({
        ...options,
    });
}
