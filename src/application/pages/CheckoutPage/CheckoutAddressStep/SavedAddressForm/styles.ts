import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    radioGroup: {
        marginBottom: 0,
    },
    inputRadio: {
        padding: '26px 20px',
        border: `solid 1px ${theme.appColors.weekWhite}`,
        borderRadius: 4,
        margin: '0 0 12px',
        width: '100%',
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey,
        transition: 'border-color 0.2s ease-in-out, background 0.2s ease-in-out, color 0.2s ease-in-out',
        '&:hover': {
            borderColor: theme.appColors.blue,
            background: theme.appColors.blue,
            color: theme.appColors.white,
            '& $radio': {
                color: theme.appColors.white,
            }
        }
    },
    checkedInputRadio: {
        borderColor: theme.appColors.blue,
        background: theme.appColors.blue
    },
    radioLabel: {
        color: 'inherit',
        paddingLeft: 20,
        letterSpacing: 0.2,
        fontSize: 15,
        fontWeight: 500
    },
    checkedRadioLabel: {
        color: theme.appColors.white
    },
    radio: {
        color: theme.appColors.grey,
        padding: 0,
        transition: 'color 0.2s ease-in-out',
        '& svg': {
            width: 18,
            height: 18
        }
    },
    checkedRadio: {
        color: theme.appColors.white
    }
});
