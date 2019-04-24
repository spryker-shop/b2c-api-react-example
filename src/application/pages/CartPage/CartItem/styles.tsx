import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    productItem: {
        padding: '20px 20px 20px 62px',
        marginBottom: 10,
        position: 'relative',
        flexWrap: 'nowrap',
        background: theme.appColors.white,
        border: `1px solid ${theme.appColors.weekWhite}`,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
            boxShadow: ' 0 2px 10px 0 rgba(216, 216, 216, 0.5)'
        }
    },
    imageOuter: {
        flexShrink: 0
    },
    imgWrapper: {
        width: 132,
        minWidth: 132,
        height: 132
    },
    contentOuter: {
        flexGrow: 1,
        paddingLeft: 20
    },
    info: {
        display: 'flex',
        flexDirection: 'column'
    },
    growedBlock: {
        flexGrow: 1
    },
    name: {
        padding: '5px 0 13px'
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
        paddingBottom: 4,
        fontSize: 13,
        letterSpacing: 0.1,
        lineHeight: 1.69,
        '&:first-letter': {
            textTransform: 'uppercase'
        }
    },
    attributesQty: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 6
    },
    attributesTitle: {
        marginRight: 15
    },
    attributesValue: {
        color: theme.appColors.grey
    },
    price: {
        fontWeight: 500,
        textAlign: 'right',
        lineHeight: 1.4
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
        textAlign: 'right',
        color: theme.appColors.lightGrey,
        fontSize: 14,
        padding: '7px 0'
    },
    removeBtn: {
        position: 'absolute',
        left: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        padding: 0,
        borderRadius: '50%',
        minWidth: 'auto',
        width: 20,
        height: 20,
        color: theme.appColors.lightGrey,
        border: '1px solid currentColor',
        transition: 'color 0.3s ease-in-out',
        cursor: 'pointer',
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
        '&:hover': {
            color: theme.appColors.red,
            backgroundColor: 'transparent'
        }

    },
    fullHeight: {
        height: '100%'
    }
});
