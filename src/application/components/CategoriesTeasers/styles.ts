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
        marginBottom: 15,
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
        paddingBottom: 26,
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            padding: 25,
            textAlign: 'left'
        },
        [theme.breakpoints.up('lg')]: {
            padding: 37
        }
    },
    thumbnail: {
        display: 'block',
        height: 'auto',
        position: 'relative',
        margin: '0 -16px',
        '&:before': {
            content: '""',
            display: 'block',
            height: 0,
            paddingBottom: '72%'
        },
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '50%',
            margin: 0,
            '&:before': {
                display: 'none'
            }
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
        backgroundPosition: 'left center',
        [theme.breakpoints.up('xl')]: {
            backgroundPosition: 'left top'
        }
    },
    transparentThumbnail: {
        [theme.breakpoints.up('md')]: {
            height: '95%',
        },
        [theme.breakpoints.up('lg')]: {
            height: '100%'
        },
        '& $thumbnailInner': {
            backgroundSize: 'contain',
            [theme.breakpoints.up('md')]: {
                minWidth: 600
            }
        }
    },
    oddThumbnail: {
        backgroundPosition: 'center',
        [theme.breakpoints.up('md')]: {
            left: '50%'
        },
        [theme.breakpoints.up('lg')]: {
            top: 0,
            left: 'calc(50% + 20px)'
        },
        '& $thumbnailInner': {
            backgroundPosition: 'right center',
            [theme.breakpoints.up('md')]: {
                right: 'auto',
                left: 0
            },
            [theme.breakpoints.up('xl')]: {
                backgroundPosition: 'right bottom'
            }
        }
    },
    title: {
        paddingBottom: 13,
        color: theme.appColors.grey,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 20,
        }
    },
    text: {
        color: theme.appColors.grey,
        paddingBottom: 20,
        [theme.breakpoints.up('md')]: {
            paddingBottom: 30,
        }
    },
    btn: {
        minWidth: 200,
        background: theme.appColors.white,
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            minWidth: 260,
        }
    }
});
