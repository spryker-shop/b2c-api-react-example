import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    imgWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        position: 'relative',
        textIndent: -9999,
        width: 80,
        minWidth: 80,
        height: 80
    },
    actionAreaOverlay: {
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 4,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 350
    },
    image: {
        maxWidth: '82%',
        maxHeight: '82%'
    }
});
