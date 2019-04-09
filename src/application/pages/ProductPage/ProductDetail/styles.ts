import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    tabIndicator: {
        display: 'none'
    },
    tabTriggerRoot: {
        minHeight: 50,
        height: '100%',
        padding: '10px 33px',
        fontSize: 14,
        letterSpacing: 0.2,
        lineHeight: 1.1,
        fontWeight: 500,
        color: theme.appColors.lightGrey,
        textTransform: 'none',
        borderRadius: '4px 4px 0 0',
        maxWidth: 'none',
        minWidth: 0,
        flexGrow: 1,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
        [theme.breakpoints.up('sm')]: {
            flexGrow: 'initial'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '10px 40px',
            minHeight: 60,
            fontSize: 16,
            letterSpacing: 0.2
        }
    },
    tabTriggerSelected: {
        pointerEvents: 'none',
        background: theme.appColors.weekWhite,
        color: theme.appColors.black,
        '&:hover': {
            color: theme.appColors.black
        }
    },
    tabTriggerWrapper: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    tabTriggerLabelContainer: {
        padding: 0
    },
    tabContent: {
        padding: '30px 15px',
        background: theme.appColors.weekWhite,
        [theme.breakpoints.up('md')]: {
            padding: '30px 20px'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '47px 49px 47px 40px'
        }
    },
    descriptionContent: {
        maxWidth: 980
    },
    description: {
        paddingBottom: 30,
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: 16
        }
    },
    descriptionSku: {
        display: 'inline-block',
        padding: '17px 20px 15px',
        background: theme.appColors.white,
        borderRadius: 4,
        fontSize: 14,
        letterSpacing: 0.1,
        lineHeight: 1.2,
        color: theme.appColors.grey,
        [theme.breakpoints.up('lg')]: {
            fontSize: 15,
            letterSpacing: 0.2
        }
    },
    attributes: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: theme.appColors.white,
        borderRadius: 4,
        padding: '17px 15px',
        minHeight: 80,
        [theme.breakpoints.up('md')]: {
            paddingLeft: 20,
            paddingRight: 20,
            minHeight: 90
        }
    },
    attributesName: {
        flexGrow: 1,
        fontSize: 14,
        letterSpacing: 0.1,
        lineHeight: 1.2,
        paddingBottom: 8,
        color: theme.appColors.grey,
        [theme.breakpoints.up('lg')]: {
            fontSize: 16,
            letterSpacing: 0.2
        }
    },
    attributesValue: {
        fontSize: 14,
        letterSpacing: 0.1,
        lineHeight: 1.2,
        color: theme.appColors.weakGrey,
        [theme.breakpoints.up('lg')]: {
            fontSize: 16,
            letterSpacing: 0.2
        }
    }
});
