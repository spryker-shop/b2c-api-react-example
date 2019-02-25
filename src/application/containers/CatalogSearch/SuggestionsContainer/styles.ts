import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    insideContWrapper: {
        overflowY: 'auto',
        background: theme.appColors.weekWhite,
        maxHeight: '85vh'
    },
    completionList: {
        paddingBottom: 15,
        marginBottom: 15,
        borderBottom: '1px solid rgba(206, 206, 208, 0.3)',
        '&:last-child': {
            border: 'none',
            paddingBottom: 0
        }
    },
    completion: {
        display: 'block',
        marginBottom: 0,
        color: theme.appColors.grey,
        letterSpacing: 0.2,
        fontSize: 15,
        lineHeight: 1.4,
        padding: '10px 30px',
        textDecoration: 'none',
        textTransform: 'capitalize',
        '&:hover': {
            background: theme.appColors.white
        }
    },
    completionInner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    completionTip: {
        display: 'flex',
        alignItems: 'flex-end',
        fontSize: 13,
        color: theme.appColors.darkGrey,
        letterSpacing: 0.1,
        fontWeight: 500
    },
    matchedText: {
        color: theme.appColors.black
    },
    completionTipIcon: {
        paddingLeft: 10,
        lineHeight: 1
    },
    linkAll: {
        display: 'inline-block',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 500,
        color: theme.appColors.blue,
        letterSpacing: 0.2,
        margin: '0 24px',
        textDecoration: 'none',
        '&:hover': {
            color: theme.appColors.darkBlue
        }
    }
});
