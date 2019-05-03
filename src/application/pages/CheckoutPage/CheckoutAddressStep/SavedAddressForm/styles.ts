import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    radioGroup: {
        marginBottom: 0,
    },
    inputRadio: {
        padding: '18px 20px',
        border: `solid 1px ${theme.appColors.weekWhite}`,
        borderRadius: 4,
        margin: '0 0 12px',
        width: '100%',
        background: theme.appColors.weekWhite,
        transition: 'border-color 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
            borderColor: theme.appColors.white,
            background: theme.appColors.white,
            boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)'
        }
    },
    checkedInputRadio: {
        borderColor: theme.appColors.blue,
        background: theme.appColors.blue,
        pointerEvents: 'none',
        '& $radioIcon': {
            borderColor: theme.appColors.white,
            '&:after': {
                background: theme.appColors.white
            }
        }
    },
    radioLabel: {
        color: theme.appColors.grey,
        paddingLeft: 20,
        letterSpacing: 0.2,
        fontSize: 15,
        fontWeight: 500,
        transition: 'color 0.2s ease-in-out',
    },
    checkedRadioLabel: {
        color: theme.appColors.white
    },
    radio: {
        padding: 0,
    },
    radioIcon: {
        width: 14,
        height: 14,
        borderRadius: '50%',
        border: `1px solid ${theme.appColors.grey}`,
        position: 'relative',
        transition: 'border 0.2s ease-in-out',
        '&:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'transparent'
        }
    }
});
