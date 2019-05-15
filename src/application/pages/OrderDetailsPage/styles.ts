import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const generalInfoTitleWidth = 113;

export const styles = (theme: Theme) => createStyles({
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 20,
        fontSize: 20,
        lineHeight: 1.5,
        [theme.breakpoints.up('lg')]: {
            lineHeight: 1.7,
            fontSize: 30
        }
    },
    amount: {
        height: 28,
        padding: '5px 14px',
        fontSize: 15,
        letterSpacing: 0.2,
        color: theme.appColors.weakGrey,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        flexShrink: 0,
        lineHeight: 1.3,
        [theme.breakpoints.up('lg')]: {
            marginTop: 13
        }
    },
    block: {
        padding: 25,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        marginBottom: 20
    },
    generalInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 1.7,
        color: theme.appColors.grey,
        margin: 0,
        paddingBottom: 10
    },
    generalInfoDescritption: {
        paddingBottom: 7,
        margin: 0,
        width: `calc(100% - ${generalInfoTitleWidth}px)`
    },
    generalInfoTitle: {
        paddingBottom: 7,
        color: theme.appColors.black,
        width: generalInfoTitleWidth,
        fontWeight: 500
    },
    discountText: {
        color: theme.appColors.grey
    },
    blockTitle: {
        fontWeight: 700,
        paddingBottom: 20
    },
    totalWrapper: {
        paddingBottom: 0
    },
    back: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 20,
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 15,
        lineHeight: 1.5,
        letterSpacing: 0.2,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.grey
        }
    },
    icon: {
        width: 8,
        height: 14,
        stroke: 'currentColor',
        lineHeight: 0,
        marginRight: 16
    }
});
