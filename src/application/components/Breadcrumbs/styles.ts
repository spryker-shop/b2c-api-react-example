import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    layout: {
        background: theme.appColors.weekWhite
    },
    container: {
        padding: '17px 0',
        ...theme.appContainerStyles,
    },
    list: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    item: {
        display: 'inline',
        fontSize: 13
    },
    link: {
        color: theme.appColors.grey,
        letterSpacing: 0.3,
        textDecoration: 'none',
        transition: 'color .2s ease-in-out',
        '&:hover': {
            color: theme.appColors.black
        }
    },
    current: {
        color: theme.appColors.black,
        pointerEvents: 'none'
    },
    separator: {
        margin: '0 15px',
        color: theme.appColors.grey,
        textAlign: 'center',
        pointerEvents: 'none'
    }
});
