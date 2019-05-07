import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    menu: {
        display: 'flex',
        padding: '2rem 0'
    },
    menuItem: {
        padding: '0',
        fontSize: '0.875rem',
        cursor: 'default',
        '&:not(:last-child)': {
            cursor: 'pointer',
            '&:after': {
                padding: '0 0.3125rem',
                content: '">"'
            }
        },
        '&:hover': {
            backgroundColor: 'transparent'
        },
        '&:last-of-type': {
            textDecoration: 'underline'
        }
    },
    link: {
        color: theme.palette.common.black,
        textDecoration: 'none',
        transition: 'color 0.5s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
    },
});
