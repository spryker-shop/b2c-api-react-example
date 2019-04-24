import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    icon: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fill: theme.appColors.lightGrey,
        margin: 0,
        maxHeight: 'none',
        width: 20,
        height: 20,
        justifyContent: 'center',
        lineHeight: 0,
        pointerEvents: 'none'
    },
    iconHoverable: {
        pointerEvents: 'auto',
        cursor: 'pointer'
    },
    iconPositionStart: {
        left: 20
    },
    iconPositionEnd: {
        right: 20
    },
    tooltipWrapper: {
        position: 'relative',
        margin: '10px -5px 10px 0',
        boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
        background: theme.appColors.white,
        fontSize: 13,
        color: theme.appColors.grey,
        lineHeight: 1.5,
        letterSpacing: 0.1,
        padding: '16px 20px 12px',
        maxWidth: 336,
        borderRadius: 4
    },
    tooltipArrow: {
        position: 'absolute',
        top: 0,
        right: 8,
        transform: 'translateY(-100%)',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 6px 8px 6px',
        borderColor: `transparent transparent ${theme.appColors.white} transparent`
    }
});
