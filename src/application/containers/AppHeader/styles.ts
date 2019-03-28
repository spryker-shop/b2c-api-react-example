import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import * as React from 'react';

export const styles = (theme: Theme) => createStyles({
    header: {
        position: 'relative',
        zIndex: 999,
        pointerEvents: 'all',
        flexShrink: 0
    },
    content: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '10px 0',
        background: theme.appColors.white,
        boxShadow: '0 2px 16px 0 rgba(193, 193, 193, 0.5)',
        zIndex: 5,
    },
    container: {
        ...theme.appContainerStyles,
        position: 'static',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navigationWrapper: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1
    },
    logoContainer: {
        ...theme.appFixedDimensions.sprykerLogo,
        marginRight: 40,
        [theme.breakpoints.down('md')]: {
            marginRight: 10,
            minWidth: 140,
            width: 140
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: 10,
        },
    },
    hamburger: {
        display: 'none',
        position: 'relative',
        width: 60,
        height: 40,
        cursor: 'pointer',
        zIndex: 11,
        '& span, &:before, &:after': {
            background: theme.palette.primary.main,
            transition: 'transform .3s .2s ease-in-out, opacity .4s .2s',
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: -15,
            width: 27,
            height: 2,
        },
        '&:before': {transform: 'translate3d(0, -9px, 0)'},
        '&:after': {transform: 'translate3d(0, 9px, 0)'},
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    hamburgerOpened: {
        '&:before, &:after': {
            transition: 'transform .3s ease-in-out, opacity .4s .1s',
            transform: 'translate3d(0, 0, 0)',
            opacity: 0,
        },
        '& span': {
            transition: 'transform .3s .3s ease-in-out',
            '&:first-child': {transform: 'rotate(45deg)'},
            '&:last-child': {transform: 'rotate(-45deg)'},
        },
    },
    checkout: {
        lineHeight: '20px',
        fontSize: theme.appFixedDimensions.fontSize.medium,
        letterSpacing: '0.3px',
    },
    mainNav: {
        display: 'flex',
        alignSelf: 'stretch',
        margin: '-10px 0',
        flexGrow: 1
    }
});
