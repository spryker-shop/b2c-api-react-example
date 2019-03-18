import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    list: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 16
    },
    link: {
        color: theme.appColors.black,
        fontSize: 13,
        textDecoration: 'none',
        transition: 'color .2s ease-in-out',

        '&:hover': {
            color: theme.appColors.grey
        }
    },
    current: {
        pointerEvents: 'none'
    },
    separator: {
        width: 37,
        color: theme.appColors.grey,
        position: 'relative',

        '&:hover': {
            color: theme.appColors.grey
        },

        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 1,
            height: 9,
            transform: 'translate(-50%, -50%) rotate(-38deg)',
            borderRadius: 0.5,
            backgroundColor: theme.appColors.grey,
            marginTop: -2
        },

        '&::after': {
            content: '',
            transform: 'translate(-50%, -50%) rotate(38deg)',
            marginTop: 4
        }
    }
});
