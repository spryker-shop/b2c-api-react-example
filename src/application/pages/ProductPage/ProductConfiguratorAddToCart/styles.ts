import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 30,
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20
        }
    },
    counter: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingBottom: 30,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            paddingBottom: 20
        },
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 30,
        }
    },
    icon: {
        paddingLeft: 8,
        lineHeight: 0
    },
    title: {
        padding: '5px 24px 5px 0',
        fontSize: 14,
        lineHeight: 1.3,
        [theme.breakpoints.up('md')]: {
            padding: '0 0 10px',
            display: 'block'
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: 15,
            paddingBottom: 15
        }
    }
});
