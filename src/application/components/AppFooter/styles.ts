import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    footer: {
        position: 'relative',
        background: theme.appColors.weekWhite,
        paddingBottom: 92,
        flexShrink: 0,
        [theme.breakpoints.up('sm')]: {
            padding: '30px 0 8px'
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: 58
        }
    },
    container: {
        ...theme.appContainerStyles,
        position: 'static'
    },
    navigation: {
        paddingBottom: 6,
        marginBottom: 26,
        [theme.breakpoints.up('sm')]: {
            borderBottom: '1px solid rgba(206, 206, 208, 0.3)'
        }
    },
    row: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
        },
        [theme.breakpoints.up('lg')]: {
            flexWrap: 'nowrap'
        }
    },
    col: {
        [theme.breakpoints.up('sm')]: {
            padding: '0 15px 20px'
        }
    },
    colNavigation: {
        margin: '0 -16px',
        flexShrink: 0,
        paddingBottom: 5,
        [theme.breakpoints.up('sm')]: {
            margin: 0,
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            margin: 0,
            width: '56%'
        },
        [theme.breakpoints.up('lg')]: {
            paddingBottom: 20
        }
    },
    colLogo: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        height: 92,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: theme.appColors.darkWhite,
        [theme.breakpoints.up('sm')]: {
            position: 'static',
            height: 'auto',
            display: 'block',
            background: 'none'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
            width: '44%'
        }
    },
    colLanguage: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 27,
        [theme.breakpoints.up('sm')]: {
            paddingTop: 0
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        },
        [theme.breakpoints.up('lg')]: {
            width: 'auto'
        }
    },
    colNavigationList: {
        width: '100%',
        borderBottom: `1px solid ${theme.appColors.softerGrey}`,
        [theme.breakpoints.up('sm')]: {
            width: '50%',
            border: 0
        },
        [theme.breakpoints.only('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('lg')]: {
            width: 'auto'
        }
    },
    logo: {
        display: 'inline-block',
        width: 120,
        height: 50,
        minWidth: 120,
        [theme.breakpoints.up('sm')]: {
            width: 170,
            height: 60,
            minWidth: 170
        }
    },
    copyrightsIsHiddenOnDektop: {
        display: 'block',
        paddingLeft: 34,
        [theme.breakpoints.up('sm')]: {
            padding: '10px 0 0 43px'
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: 20
        },
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        }
    },
    copyrightsIsHiddenOnTablet: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block'
        }
    },
    copyrights: {
        color: theme.appColors.black,
        opacity: 0.4,
        fontSize: 11,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('sm')]: {
            fontSize: 14
        }
    },
    IsHiddenOnTablet: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block'
        }
    },
    colLogos: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 'auto'
        }
    }
});
