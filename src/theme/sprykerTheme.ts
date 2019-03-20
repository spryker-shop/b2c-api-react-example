import { createSprykerTheme } from '.';
import { appContainerStyles } from './properties/new/appContainerStyles';
import { appPalette } from './properties/overwritten/appPalette';
import { appButtons } from './properties/overwritten/appButtons';
import { appBreakpoints } from './properties/overwritten/appBreakpoints';
import { appTypographyStyles } from './properties/overwritten/appTypography';
import { appFixedDimensions } from './properties/new/appFixedDimensions';
import { appColors } from './properties/new/appColors';
import { appModules } from './properties/new/appModules';

export const sprykerTheme = createSprykerTheme({
    // New
    appContainerStyles,
    appFixedDimensions,
    appColors,
    appModules,

    // Overwritten
    palette: appPalette,
    typography: appTypographyStyles,
    breakpoints: appBreakpoints,
    overrides: {
        ...appButtons
    },
    // Customization props
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});
