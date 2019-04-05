import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    content: {
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 80,
            boxShadow: `inset 0 -50px 80px 0 ${theme.appColors.weekWhite}`,
            [theme.breakpoints.up('sm')]: {
                display: 'none'
            }
        }
    },
    triggerHolder: {
        paddingTop: 20,
        display: 'none'
    },
    triggerHolderLimited: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    button: {
        paddingTop: 11,
        paddingBottom: 11,
        minWidth: 150,
        fontSize: 14
    }
});
