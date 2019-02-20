import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
    },
    value: {
        display: 'inline',
    },
    element: {
        paddingBottom: theme.spacing.unit * 2,
        '&:nth-child(even)': {
            paddingLeft: '10%',

            [theme.breakpoints.down('sm')]: {
                paddingLeft: 0,
            },
        }
    },
    attributesTitle: {
        fontSize: theme.appFixedDimensions.fontSize.xxl,
        margin: '0 0 38px',
    },
    valuesBlock: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
        '& strong': {
            fontWeight: 'bold',
            textTransform: 'capitalize',
        },
        '& p': {
            margin: 0,
        },
    },
});
