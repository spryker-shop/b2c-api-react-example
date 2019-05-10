import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    preloader: {
        position: 'relative',
        flexGrow: 1,
        height: '100%',
        width: '100%',
        minHeight: 100,
        '&:after': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            background: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
            zIndex: 999
        }
    },
    preloaderStatic: {
        '&:after': {
            display: 'none'
        }
    },
    preloaderImage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 50,
        height: 50,
        zIndex: 9999
    }
});
