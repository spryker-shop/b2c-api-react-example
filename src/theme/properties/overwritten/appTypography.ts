import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { appColors } from '@theme/properties/new/appColors';
import { appBreakpoints } from '@theme/properties/overwritten/appBreakpoints';

export const appTypographyStyles: ThemeOptions['typography'] = {
    useNextVariants: true,
    fontFamily: [
        'Circular',
        'Segoe UI',
        'Roboto',
    ].join(','),
    h1: {
        fontSize: 22,
        lineHeight: 1.3,
        letterSpacing: 0.2,
        fontWeight: 700,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 30,
            lineHeight: 1.3,
            letterSpacing: 0.3,
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 40,
            lineHeight: 1.3,
            letterSpacing: 0.4,
        }
    },
    h2: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.4,
        letterSpacing: 0.2,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 24,
            lineHeight: 1.7,
            letterSpacing: 0.3,
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 30
        }
    },
    h3: {
        fontSize: 15,
        fontWeight: 500,
        lineHeight: 1.9,
        letterSpacing: 0.2,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 20,
            lineHeight: 1.4
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            letterSpacing: 0,
        }
    },
    h4: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.3,
        letterSpacing: 0.1,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 15,
            lineHeight: 1.9,
            letterSpacing: 0.2,
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 18,
            lineHeight: 1.4,
            fontWeight: 700
        }
    },
    h5: {
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.7,
        letterSpacing: 0.1,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 14,
            lineHeight: 1.6,
            letterSpacing: 0.2,
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 15,
            lineHeight: 1.5
        }
    },
    h6: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1.9,
        letterSpacing: 0.1,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 14,
            lineHeight: 1.7,
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 15,
            lineHeight: 1.5,
            letterSpacing: 0.2,
        }
    },
    body2: {
        fontSize: 13,
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: 0.1,
        marginLeft: 0,
        color: appColors.black,
        [`@media (min-width: ${appBreakpoints.values.md}px)`]: {
            fontSize: 14,
            lineHeight: 1.8
        },
        [`@media (min-width: ${appBreakpoints.values.lg}px)`]: {
            fontSize: 18,
            letterSpacing: 0.2,
        }
    }
};
