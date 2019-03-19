import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {},
    contentHelper: {
        [theme.breakpoints.up('xs')]: {
            width: '98.7vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
        },
        background: theme.appColors.greyBG,
        padding: '12vmin 2vmin',
    },
    contentContainer: {
        fontSize: theme.appFixedDimensions.fontSize.medium,
        color: theme.appColors.black,
        ...theme.appContainerStyles,
    },
    productDetailsBlock: {
        maxWidth: 435,
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            marginRight: 0,
            marginLeft: 0,
        },
    },
    descriptionBlock: {
        maxWidth: 435,
        marginLeft: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
            marginRight: 0,
            marginLeft: 0,
        },
    },
    descriptionTitle: {
        fontSize: theme.appFixedDimensions.fontSize.xxl,
        margin: '0 0 38px',
    },
    descriptionSku: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        color: theme.appColors.grey,
        textTransform: 'uppercase',
        paddingTop: 25,
    },
});
