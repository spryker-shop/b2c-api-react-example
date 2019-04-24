import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    wrapper: {
        paddingBottom: 20
    },
    link: {
        fontSize: 15,
        textDecoration: 'none',
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    }
});
