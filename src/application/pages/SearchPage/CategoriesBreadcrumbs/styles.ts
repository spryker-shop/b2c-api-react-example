import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    layout: {
        background: theme.appColors.weekWhite
    },
    list: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: '12px 0',
        margin: 0,
        ...theme.appContainerStyles
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px 0',
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
        width: 37,
        color: theme.appColors.grey,
        textAlign: 'center',
        pointerEvents: 'none'
    }
});
