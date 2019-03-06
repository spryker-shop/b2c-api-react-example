import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        height: '100%',
        boxShadow: 'none',
        alignItems: 'center'
    },
    media: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        maxWidth: '90%',
        maxHeight: '90%'
    },
    actionArea: {
        maxWidth: theme.appFixedDimensions.card.actionAreaWidth,
        minHeight: theme.appFixedDimensions.card.actionAreaHeight,
        borderRadius: theme.appFixedDimensions.borderRadius,
        position: 'relative',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            minHeight: 350
        }
    },
    actionAreaOverlay: {
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.10)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 350
    },
    cardContent: {
        padding: theme.spacing.unit + theme.spacing.unit / 2,
        letterSpacing: '0.5px',
        width: '100%',
        maxWidth: theme.appFixedDimensions.card.actionAreaWidth
    },
    productName: {
        fontSize: '1rem',
        color: theme.appColors.black
    },
    productPrice: {},
    newPrice: {
        color: theme.appColors.red
    },
    oldPrice: {
        fontSize: 14,
        lineHeight: 1.47
    }
});
