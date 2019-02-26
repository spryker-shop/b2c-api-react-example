import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    product: {
        display: 'flex'
    },
    wrapProductImage: {
        position: 'relative',
        maxHeight: '3.5rem',
        maxWidth: '3.5rem',
        padding: '0.4375rem',
        '&:before': {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            content: '""',
        }
    },
    productDescription: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1rem'
    },
    attributes: {
        display: 'block',
        textTransform: 'capitalize',
        color: theme.appColors.grey
    },
    tableAction: {
        cursor: 'pointer',
        transition: 'color .5s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        },
    },
});
