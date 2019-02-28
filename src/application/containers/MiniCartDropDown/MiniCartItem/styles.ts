import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    productItem: {
        padding: '15px 20px 15px 62px',
        position: 'relative',
        flexWrap: 'nowrap'
    },
    content: {
        height: '100%'
    },
    imageOuter: {
        flexShrink: 0
    },
    contentOuter: {
        flexGrow: 1,
        paddingLeft: 40
    },
    name: {
        color: theme.appColors.grey,
        paddingRight: 8
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
    actionArea: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    quantity: {
        fontSize: 13,
        letterSpacing: 0.1
    },
    quantityValue: {
        color: theme.appColors.grey,
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
            color: theme.appColors.blue,
            backgroundColor: 'transparent'
        }

    }
});
