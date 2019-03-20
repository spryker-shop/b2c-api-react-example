import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        paddingBottom: 80
    },
    tabIndicator: {
        display: 'none'
    },
    tabTriggerRoot: {
        minHeight: 60,
        height: '100%',
        padding: '10px 40px',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 1.2,
        fontWeight: 500,
        color: theme.appColors.lightGrey,
        textTransform: 'none',
        borderRadius: '4px 4px 0 0',
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    tabTriggerSelected: {
        pointerEvents: 'none',
        background: theme.appColors.weekWhite,
        color: theme.appColors.black
    },
    tabTriggerWrapper: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    tabTriggerLabelContainer: {
        padding: 0
    },
    tabContent: {
        padding: '47px 49px 47px 40px',
        background: theme.appColors.weekWhite
    },
    descriptionContent: {
        maxWidth: 980
    },
    description: {
        paddingBottom: 30
    },
    descriptionSku: {
        display: 'inline-block',
        padding: '17px 20px 15px',
        background: theme.appColors.white,
        borderRadius: 4,
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.2,
        color: theme.appColors.grey
    },
    attributes: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: theme.appColors.white,
        borderRadius: 4,
        padding: '17px 20px',
        minHeight: 90
    },
    attributesName: {
        flexGrow: 1,
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 1.2,
        paddingBottom: 8,
        color: theme.appColors.grey
    },
    attributesValue: {
        fontSize: 15,
        letterSpacing: 0.2,
        lineHeight: 1.2,
        color: theme.appColors.weakGrey
    }
});
