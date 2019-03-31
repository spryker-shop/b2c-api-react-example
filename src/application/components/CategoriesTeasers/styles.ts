import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    list: {
        paddingBottom: 56,
        [theme.breakpoints.up('xl')]: {
            paddingBottom: 80
        }
    },
    item: {
        background: theme.appColors.darkWhite,
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.up('md')]: {
            height: 720,
            marginBottom: 24
        },
        [theme.breakpoints.up('lg')]: {
            marginBottom: 50
        },
        [theme.breakpoints.up('xl')]: {
            height: 800
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
        [theme.breakpoints.up('md')]: {
            order: 2
        }
    },
    contentHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    content: {
        flexBasis: 0,
        [theme.breakpoints.up('md')]: {
            padding: 25
        },
        [theme.breakpoints.up('lg')]: {
            padding: 37
        }
    },
    thumbnail: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
        [theme.breakpoints.up('lg')]: {
            width: 'calc(50% - 20px)'
        }
    },
    thumbnailInner: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        [theme.breakpoints.up('md')]: {
            backgroundPosition: 'left center'
        },
        [theme.breakpoints.up('xl')]: {
            backgroundPosition: 'left top'
        }
    },
    transparentThumbnail: {
        height: '95%',
        [theme.breakpoints.up('lg')]: {
            height: '100%'
        },
        '& $thumbnailInner': {
            backgroundSize: 'contain',
            [theme.breakpoints.up('md')]: {
                minWidth: 600
            }
        },
    },
    oddThumbnail: {
        backgroundPosition: 'center',
        [theme.breakpoints.up('md')]: {
            top: '5%',
            left: '50%'
        },
        [theme.breakpoints.up('lg')]: {
            top: 0,
            left: 'calc(50% + 20px)'
        },
        '& $thumbnailInner': {
            [theme.breakpoints.up('md')]: {
                backgroundPosition: 'right center',
                ritgh: 'auto',
                left: 0
            },
            [theme.breakpoints.up('xl')]: {
                backgroundPosition: 'right bottom'
            }
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
        background: theme.appColors.white,
        textAlign: 'center'
    }
});
