import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 80
    },
    sliderWrapper: {
        paddingTop: 80
    },
    slider: {
        paddingBottom: 0
    },
    layout: {
        padding: '32px 20px 20px',
        background: theme.appColors.weekWhite,
        borderRadius: 4
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 18
    },
    title: {
        fontWeight: 700
    },
    amount: {
        padding: '5px 14px',
        lineHeight: 1,
        color: theme.appColors.weakGrey,
        background: theme.appColors.white,
        borderRadius: 4
    },
    subtotal: {
        padding: '6px 0 8px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    subtotalText: {
        paddingRight: 6
    }
});
