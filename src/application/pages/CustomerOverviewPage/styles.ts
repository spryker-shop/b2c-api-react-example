import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    title: {
        paddingBottom: 20
    },
    block: {
        padding: '21px 25px 25px',
        color: theme.appColors.grey,
        fontSize: 15,
        lineHeight: 1.9,
        letterSpacing: 0.2,
        fontWeight: 500,
        background: theme.appColors.weekWhite,
        borderRadius: 4,
        position: 'relative'
    },
    blockCustomer: {
        paddingRight: 50
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    subtitle: {
        fontWeight: 700,
        paddingBottom: 20,

        [theme.breakpoints.down('sm')]: {
            fontSize: 20
        }
    },
    actionItem: {
        position: 'absolute',
        right: 25,
        top: 10,
        padding: 10,
        fill: theme.appColors.lightGrey,
        background: 'none',
        transition: 'fill 0.3s ease-in-out',
        '&:hover': {
            fill: theme.appColors.blue,
            background: 'none'
        }
    },
    link: {
        fontSize: 16,
        fontWeight: 500,
        textDecoration: 'none',
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    orderItem: {
        background: theme.appColors.white
    },
    textAlternative: {
        color: theme.appColors.black
    },
    textHightlight: {
        color: theme.appColors.blue
    }
});
