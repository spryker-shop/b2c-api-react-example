import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    box: {
        background: theme.appColors.white,
        borderRadius: 4
    },
    inner: {
        padding: '35px 50px 35px'
    },
    heading: {
        display: 'flex',
        margin: 0,
        padding: 0,
        listStyle: 'none'
    },
    headingItem: {
        width: '50%',
        borderRight: `1px solid ${theme.appColors.weekWhite}`,
        borderBottom: `1px solid ${theme.appColors.weekWhite}`,
        color: theme.appColors.lightGrey,
        transition: 'color 0.3s ease-in-out',
        '&:last-child': {
            borderRight: 0
        },
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    headingItemActive: {
        borderBottom: 0,
        color: theme.appColors.black,
        pointerEvents: 'none'
    },
    redirectLink: {
        height: '100%',
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 5px',
        color: 'inherit',
        fontWeight: 500,
        textDecoration: 'none'
    },
    formWrapper: {
        paddingBottom: 20
    },
    link: {
        textDecoration: 'none',
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    }
});
