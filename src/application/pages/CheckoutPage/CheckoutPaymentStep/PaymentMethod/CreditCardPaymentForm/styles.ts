import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    label: {
        display: 'block',
        position: 'static',
        paddingBottom: 10,
        color: theme.appColors.grey,
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.26,
        fontWeight: 400,
        transform: 'none'
    },
    asterisk: {
        color: theme.appColors.blue
    },
    inputRadio: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 140,
        padding: 5,
        borderRadius: 4,
        margin: 0,
        border: `1px solid ${theme.appColors.lightGrey}`,
        color: theme.appColors.blue,
        transition: 'background 0.3s ease-in-out, border 0.3s ease-in-out, color 0.3s ease-in-out',
        '&:hover': {
            borderColor: theme.appColors.blue
        }
    },
    checkedInputRadio: {
        borderColor: theme.appColors.blue,
        color: theme.appColors.white,
        background: theme.appColors.blue
    },
    radio: {
        display: 'none'
    },
    radioLabel: {
        fill: 'currentColor',
        color: 'inherit'
    }
});
