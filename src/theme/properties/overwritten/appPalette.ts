import { PaletteOptions } from '@material-ui/core/es/styles/createPalette';
import { appColors } from '@theme/properties/new/appColors';

export const appPalette: PaletteOptions = {
    primary: {
        main: '#282c3d',
    },
    secondary: {
        main: '#ededed'
    },
    text: {
        primary: appColors.black,
        secondary: appColors.grey
    }
};
