import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    formItem: {
        paddingBottom: 12
    },
    formInner: {
        margin: '10px 0 8px',
        border: `1px solid ${theme.appColors.weekWhite}`,
        borderRadius: 4,
        padding: '30px 20px'
    },
    inputRadio: {
        padding: '12px 20px',
        minHeight: 80,
        border: `solid 1px ${theme.appColors.weekWhite}`,
        borderRadius: 4,
        margin: 0,
        width: '100%',
        background: theme.appColors.weekWhite,
        color: theme.appColors.grey,
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
        pointerEvents: 'none'
    },
    radioLabel: {
        color: theme.appColors.grey,
        paddingLeft: 20,
        letterSpacing: 0.2,
        fontSize: 15,
        fontWeight: 500,
        transition: 'color 0.2s ease-in-out',
        textTransform: 'capitalize',
        flexGrow: 1
    },
    checkedRadioLabel: {
        color: theme.appColors.white,
        '& $labelIcon': {
            fill: theme.appColors.white
        }
    },
    label: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10
    },
    labelIcon: {
        transition: 'fill 0.2s ease-in-out',
        lineHeight: 0,
        fill: theme.appColors.lightGrey
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
