import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    blockControl: {
        paddingTop: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 3,
        borderTop: `1px solid ${theme.appColors.blockDivider}`,
    },
    controlsGroupQuantity: {
        paddingTop: 0,
    },
    formQuantity: {
        '&:first-child': {
            paddingTop: 0,
        },
        '& [data-form-column="0-0"]': {
            maxWidth: 142,
            [theme.breakpoints.down('sm')]: {
                maxWidth: '100%',
                flexBasis: '100%',
                paddingRight: 0,
            },
        }
    },
    buyBtnParent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buyBtn: {
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        boxShadow: 'none',
        '&:hover': {
            color: theme.appColors.black,
            backgroundColor: 'transparent',
            border: `1px solid ${theme.appColors.deepBlack}`,
        },
        '&:disabled': {
            cursor: 'not-allowed',
        },
    }
});
