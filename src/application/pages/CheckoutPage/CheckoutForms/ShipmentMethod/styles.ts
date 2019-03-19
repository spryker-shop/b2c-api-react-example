import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    shipmentMethodsParentForms: {
        '& form': {
            marginBottom: theme.spacing.unit * 3,
        },
        '& form:last-child': {
            marginBottom: 0,
        },
        '& label': {
            minWidth: 130,
            minHeight: 70,
            alignItems: 'flex-start',
            [theme.breakpoints.down('xs')]: {
                minWidth: '100%',
                minHeight: 'auto',
            },
            '&>span:not(:first-child)': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: theme.spacing.unit * 2,
                paddingBottom: theme.spacing.unit * 1.5,
                [theme.breakpoints.down('xs')]: {
                    flexDirection: 'row',
                },
                '&>*': {
                    marginBottom: theme.spacing.unit,
                    lineHeight: 1,
                    [theme.breakpoints.down('xs')]: {
                        marginRight: theme.spacing.unit,
                    },
                    '&:last-child': {
                        marginBottom: 0,
                    },
                },
            },
        },
        '& legend svg': {
            height: 15,
            minWidth: 100,
            '& path': {
                fill: theme.appColors.black,
                opacity: 1,
            },
        }
    }
});
