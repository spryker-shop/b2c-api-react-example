import { createSprykerTheme } from '.';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { appContainerStyles } from './properties/new/appContainerStyles';
import { appPalette } from './properties/overwritten/appPalette';
import { appButtons } from './properties/overwritten/appButtons';
import { appBreakpoints } from './properties/overwritten/appBreakpoints';
import { appTypographyStyles } from './properties/overwritten/appTypography';
import { appFixedDimensions } from './properties/new/appFixedDimensions';
import { appColors } from './properties/new/appColors';

export const sprykerTheme: Theme = createSprykerTheme({
    appContainerStyles,
    appFixedDimensions,
    appColors,
    palette: appPalette,
    typography: appTypographyStyles,
    breakpoints: appBreakpoints,
    overrides: {
        ...appButtons
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});
