import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    creditCardForm: {
        '& div[data-form-row=\'2\']': {
            [theme.breakpoints.down('xs')]: {
                justifyContent: 'space-between',
            },
            '& div[data-form-column=\'2-0\']': {
                '& .spryker-select': {
                    position: 'relative',
                    '&:after': {
                        content: `"/"`,
                        position: 'absolute',
                        display: 'block',
                        right: -theme.spacing.unit * 2,
                        top: 11,
                        fontSize: 21,
                    },
                },
            },
            '&>div': {
                maxWidth: 141,
                [theme.breakpoints.down('xs')]: {
                    maxWidth: `calc(50% - ${theme.spacing.unit * 1.5}px)`,
                },
                '&:last-child': {
                    paddingLeft: theme.spacing.unit * 3,
                    [theme.breakpoints.down('xs')]: {
                        paddingLeft: 0
                    },
                }
            }
        },
    },
});
