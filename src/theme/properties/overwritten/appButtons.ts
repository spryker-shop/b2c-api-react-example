import { appColors } from '@theme/properties/new/appColors';
import { Overrides } from '@material-ui/core/styles/overrides';

export const appButtons: Overrides = {
    MuiButton: {
        root: {
            fontSize: 16,
            lineHeight: 1.4,
            fontWeight: 500,
            borderRadius: 4,
            minHeight: 0,
            padding: '13px 15px',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'transparent',
            textTransform: 'none',

            '&$disabled': {
                backgroundColor: appColors.lightGrey,
                color: appColors.white,
                borderColor: appColors.lightGrey
            }
        },
        text: {
            padding: 0,
            minWidth: 0,
            border: 0,
            borderRadius: 0,
            '&:hover': {
                background: 'none'
            }
        },
        contained: {
            borderRadius: 4,
            boxShadow: 'none',
            backgroundColor: appColors.red,
            color: appColors.white,

            '&:hover': {
                backgroundColor: appColors.darkRed
            },

            '&:active': {
                backgroundColor: appColors.weekRed,
                boxShadow: 'none'
            },

            '&$disabled': {
                backgroundColor: appColors.lightGrey,
                color: appColors.white,
                borderColor: appColors.lightGrey
            }
        },
        containedPrimary: {
            borderRadius: 4,
            backgroundColor: appColors.blue,
            color: appColors.white,

            '&:hover': {
                backgroundColor: appColors.darkBlue
            },

            '&:active': {
                backgroundColor: appColors.weekBlue,
            }
        },
        outlined: {
            borderRadius: 4,
            backgroundColor: 'transparent',
            color: appColors.blue,
            borderColor: appColors.lightGrey,

            '&:hover': {
                backgroundColor: appColors.blue,
                color: appColors.white,
                borderColor: appColors.blue,
            },

            '&:active': {
                backgroundColor: appColors.darkBlue,
                color: appColors.white,
                borderColor: appColors.darkBlue,
            }
        }
    }
};
