import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    productItem: {
        padding: 15,
        marginBottom: 10,
        position: 'relative',
        background: theme.appColors.white,
        border: `1px solid ${theme.appColors.weekWhite}`,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
            boxShadow: ' 0 2px 10px 0 rgba(216, 216, 216, 0.5)'
        },

        [theme.breakpoints.up('md')]: {
            padding: '20px 20px 20px 62px'
        }
    },
    imageOuter: {
        flexShrink: 0
    },
    imgWrapper: {
        width: 100,
        minWidth: 100,
        height: 100,

        [theme.breakpoints.up('md')]: {
            width: 132,
            minWidth: 132,
            height: 132,
        }
    },
    contentOuter: {
        maxWidth: 'calc(100% - 100px)',
        flexGrow: 1,
        paddingLeft: 10,

        [theme.breakpoints.up('md')]: {
            paddingLeft: 20,
        }
    },
    info: {
        display: 'flex',
        flexDirection: 'column',

        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    growedBlock: {
        flexGrow: 1
    },
    name: {
        padding: '5px 0',

        [theme.breakpoints.up('md')]: {
            paddingBottom: 13
        }
    },
    nameLink: {
        textDecoration: 'none',
        color: theme.appColors.grey,
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    attributes: {
        dispay: 'block',
        fontSize: 12,
        letterSpacing: 0.1,
        lineHeight: 1.7,
        '&:first-letter': {
            textTransform: 'uppercase'
        },

        [theme.breakpoints.up('md')]: {
            paddingBottom: 4,
            fontSize: 13
        }
    },
    attributesQty: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 6,

        [theme.breakpoints.down('sm')]: {
            paddingBottom: 12,
        }
    },
    attributesTitle: {
        display: 'none',

        [theme.breakpoints.up('md')]: {
            display: 'inline-block',
            marginRight: 15
        }
    },
    attributesValue: {
        color: theme.appColors.grey
    },
    price: {
        fontWeight: 500,
        lineHeight: 1.4,

        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        }
    },
    newPrice: {
        color: theme.appColors.red
    },
    oldPrice: {
        fontSize: 15,
        letterSpacing: 0.3,
        fontWeight: 400
    },
    eachPrice: {
        color: theme.appColors.lightGrey,
        fontSize: 14,
        padding: '7px 0',

        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        }
    },
    removeBtnColumn: {
        maxWidth: 'calc(100% - 110px)',
        marginLeft: 'auto',

        [theme.breakpoints.down('sm')]: {
            paddingTop: 5
        },
    },
    removeBtn: {
        color: theme.appColors.lightGrey,
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',

        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
        },

        '&:hover': {
            color: theme.appColors.red,
            backgroundColor: 'transparent',
        }
    },
    removeBtnIcon: {
        position: 'relative',
        display: 'inline-block',
        padding: 0,
        borderRadius: '50%',
        minWidth: 'auto',
        width: 20,
        height: 20,
        border: '1px solid currentColor',
        verticalAlign: 'middle',

        '&:after, &:before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 12,
            height: 1,
            backgroundColor: 'currentColor'
        },
        '&:after': {
            transform: 'translate(-50%, -50%) rotate(45deg)'
        },
        '&:before': {
            transform: 'translate(-50%, -50%) rotate(-45deg)'
        },
    },
    removeBtnText: {
        marginLeft: '10px',
        fontSize: '13px',
        verticalAlign: 'middle',

        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    fullHeight: {
        height: '100%'
    }
});
