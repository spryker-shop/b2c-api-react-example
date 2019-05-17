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
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 42
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
        paddingBottom: 5,
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
            fontSize: 15,
            paddingBottom: 13
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: 5
        }
    },
    nameLink: {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        fontWeight: 'inherit',
        padding: 0,
        minWidth: 0,
        border: 'none',
        background: 'none',
        textDecoration: 'none',
        color: theme.appColors.grey,
        '&:hover': {
            border: 'none',
            background: 'none',
            color: theme.appColors.blue
        }
    },
    attributes: {
        display: 'block',
        fontSize: 12,
        letterSpacing: 0.1,
        lineHeight: 1.7,
        '&:first-letter': {
            textTransform: 'uppercase'
        },
        [theme.breakpoints.up('sm')]: {
            paddingBottom: 4,
            fontSize: 13
        }
    },
    attributesQty: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 12,
        [theme.breakpoints.up('sm')]: {
            paddingBottom: 0
        }
    },
    attributesTitle: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline-block',
            marginRight: 15
        }
    },
    attributesValue: {
        color: theme.appColors.grey
    },
    pricesHoler: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    price: {
        fontWeight: 500,
        lineHeight: 1.4,
        fontSize: 16,
        [theme.breakpoints.up('sm')]: {
            textAlign: 'right',
            fontSize: 18
        }
    },
    newPrice: {
        paddingRight: 8,
        color: theme.appColors.red,
        [theme.breakpoints.up('sm')]: {
            paddingRight: 0
        }
    },
    oldPrice: {
        fontSize: 13,
        letterSpacing: 0.3,
        fontWeight: 400,
        [theme.breakpoints.up('sm')]: {
            fontSize: 15
        }
    },
    eachPrice: {
        display: 'none',
        color: theme.appColors.lightGrey,
        fontSize: 14,
        padding: '7px 0',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            textAlign: 'right',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '7px 0',
            display: 'inline-flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexGrow: 1
        }
    },
    removeBtnColumn: {
        display: 'inline-block',
        paddingTop: 12,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 0
        },
    },
    removeBtn: {
        color: theme.appColors.lightGrey,
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            left: 10,
            top: 53
        },
        [theme.breakpoints.up('md')]: {
            left: 20,
            top: 70
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
        marginLeft: 10,
        fontSize: 13,
        verticalAlign: 'middle',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    fullHeight: {
        height: '100%'
    }
});
