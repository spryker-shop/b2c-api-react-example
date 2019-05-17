import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const generalInfoTitleWidth = 120;

export const styles = (theme: Theme) => createStyles({
    item: {
        padding: 15,
        background: theme.appColors.weekWhite,
        position: 'relative',
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.5,
        color: theme.appColors.black,
        marginBottom: 20,
        borderRadius: 4,
        '&:last-child': {
            marginBottom: 0
        },
        [theme.breakpoints.up('md')]: {
            background: theme.appColors.white,
            border: `1px solid ${theme.appColors.weekWhite}`,
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
            padding: '15px 100px 15px 22px'
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 22
        }
    },
    name: {
        paddingBottom: 10,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    nameLink: {
        display: 'inline-block',
        marginBottom: 1,
        textDecoration: 'none',
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        margin: -7,
        [theme.breakpoints.up('md')]: {
            margin: 0,
            position: 'absolute',
            right: 15,
            top: 17,
        }
    },
    actionItem: {
        padding: 7,
        flex: '1 1 100%',
        [theme.breakpoints.up('md')]: {
            flex: '0 1 auto',
            padding: 0
        }
    },
    actionButton: {
        fill: 'currentColor',
        lineHeight: 1,
        fontSize: 14,
        padding: 10,
        height: 50,
        minWidth: 0,
        [theme.breakpoints.up('md')]: {
            border: 'none',
            height: 'auto',
            background: 'none',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
                background: 'none',
                border: 'none'
            },
        }
    },
    actionItemDisabled: {
        opacity: 0.6
    },
    actionDelete: {
        color: theme.appColors.red,
        [theme.breakpoints.up('md')]: {
            color: theme.appColors.lightGrey,
        },
        '&:hover': {
            color: theme.appColors.red
        }
    },
    actionEdit: {
        color: theme.appColors.blue,
        [theme.breakpoints.up('md')]: {
            color: theme.appColors.lightGrey,
        },
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    actionText: {
        paddingLeft: 11,
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    generalInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        color: theme.appColors.grey,
        margin: 0,
        paddingBottom: 13,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 0
        }
    },
    generalInfoDescritption: {
        paddingBottom: 7,
        margin: 0,
        width: `calc(100% - ${generalInfoTitleWidth}px)`,
        paddingLeft: 20
    },
    generalInfoTitle: {
        paddingBottom: 7,
        color: theme.appColors.black,
        width: generalInfoTitleWidth
    },
    amount: {
        display: 'inline-block',
        padding: '5px 17px',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 0.1,
        color: theme.appColors.white,
        background: theme.appColors.weakGrey,
        borderRadius: 13,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        lineHeight: 1.4
    },
    inputRoot: {
        fontSize: 'inherit',
        background: 'inherit'
    },
    input: {
        padding: 0,
        fontSize: 'inherit',
        height: 'auto',
        border: 0,
        borderBottom: `1px solid ${theme.appColors.black}`,
        background: 'inherit',
        borderRadius: 0,
        '&:focus': {
            background: 'inherit'
        }
    }
});
