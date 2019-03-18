import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        background: theme.appColors.white,
        paddingBottom: 40,
        [theme.breakpoints.up('sm')]: {
            background: theme.appColors.weekWhite,
            paddingBottom: 110
        }
    },
    layout: {
        padding: 0,
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            ...theme.appContainerStyles,
            padding: '40px 16px 0'
        }
    },
    box: {
        background: theme.appColors.white,
        borderRadius: 4,
        padding: '20px 16px',
        [theme.breakpoints.up('sm')]: {
            padding: '35px 50px 35px'
        }
    }
});
