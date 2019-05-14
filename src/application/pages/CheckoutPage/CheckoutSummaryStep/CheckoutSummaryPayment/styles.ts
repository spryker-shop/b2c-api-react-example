import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    container: {
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.4,
        color: theme.appColors.lightGrey
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingBottom: 20,
        '&:last-child': {
            paddingBottom: 0
        }
    },
    title: {
        paddingBottom: 10,
        width: '100%',
        fontSize: 14,
        [theme.breakpoints.up('sm')]: {
            paddingRight: 10,
            width: 170
        },
        [theme.breakpoints.up('lg')]: {
            width: 200,
            fontSize: 15
        }
    },
    value: {
        display: 'flex',
        alignItems: 'center',
        color: theme.appColors.black,
        textTransform: 'capitalize',
        fontWeight: 500
    },
    stars: {
        color: theme.appColors.lightGrey,
        paddingRight: 5
    },
    icon: {
        width: 20,
        height: 20,
        fill: theme.appColors.lightGrey,
        marginRight: 17,
        lineHeight: 0
    },
    provider: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
        height: 36,
        padding: 5,
        borderRadius: 4,
        margin: 0,
        background: theme.appColors.blue,
        fill: theme.appColors.white
    }
});
