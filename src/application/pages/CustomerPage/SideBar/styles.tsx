import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    rootPaper: {
        maxWidth: 282,
        backgroundColor: theme.appColors.weekWhite,
        padding: `${theme.spacing.unit * 6}px 70px`,
        [theme.breakpoints.down('md')]: {
            padding: `${theme.spacing.unit * 6}px 20px`,
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        },
        '& ul': {
            marginBottom: theme.spacing.unit * 5,
            marginTop: theme.spacing.unit * 5,
        },
        '& li': {
            padding: '4px 0',
        },
    },
    link: {
        width: '100%',
        fontSize: theme.appFixedDimensions.fontSize.medium,
        lineHeight: 2,
        letterSpacing: '0.5px',
        color: theme.appColors.black,
        textTransform: 'capitalize',
        textDecoration: 'none',
    },
    logoutLink: {
        marginTop: theme.spacing.unit * 5,
        cursor: 'pointer',
    },
});
