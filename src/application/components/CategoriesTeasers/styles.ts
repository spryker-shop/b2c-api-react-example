import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    list: {
        paddingBottom: 80
    },
    item: {
        height: 800,
        background: theme.appColors.darkWhite,
        marginBottom: 50,
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.down('lg')]: {
            height: 600
        },
        [theme.breakpoints.down('md')]: {
            padding: 0,
            height: 450
        },
        [theme.breakpoints.down('xs')]: {
            height: 'auto',
            marginBottom: 16
        }
    },
    itemDifferentBg: {
        background: theme.appColors.weekWhite
    },
    container: {
        ...theme.appContainerStyles,
        position: 'static',
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    oddImage: {
        order: 2,
        [theme.breakpoints.down('xs')]: {
            order: 'inherit'
        }
    },
    contentHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    content: {
        flexBasis: 0,
        padding: 37
    },
    thumbnail: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
        width: 'calc(50% - 20px)',
        height: '100%',
        [theme.breakpoints.down('md')]: {
            width: '50%'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    transparentThumbnail: {
        backgroundSize: 'contain',
        [theme.breakpoints.down('lg')]: {
            height: '95%'
        }
    },
    oddThumbnail: {
        left: 'calc(50% + 20px)',
        backgroundPosition: 'right bottom',
        [theme.breakpoints.down('lg')]: {
            top: '5%'
        },
        [theme.breakpoints.down('md')]: {
            left: '50%'
        }
    },
    title: {
        paddingBottom: 20,
        color: theme.appColors.grey
    },
    text: {
        color: theme.appColors.grey,
        paddingBottom: 30
    },
    btn: {
        minWidth: 260,
        background: theme.appColors.white
    }
});
