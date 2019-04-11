import { Theme, createStyles } from '@material-ui/core';

const dotChange = (theme: Theme) => ({
    width: '10px',
    height: '10px',
    backgroundColor: theme.appColors.lightGrey
});

const animationDuration = '0.15s';

export const styles = (theme: Theme) => createStyles({
    wrapper: {},
    layout: {
        overflow: 'hidden'
    },
    root: {
        position: 'relative',
        margin: '0 -5px',
        [theme.breakpoints.up('md')]: {
            margin: '0 -16px'
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 -10px'
        },
        '& .slick-slide': {
            transition: `opacity ${ animationDuration }`,

            '&:not(.slick-active)': {
                [theme.breakpoints.up('lg')]: {
                    opacity: 0.3,
                }
            }
        },
        '& .slick-arrow': {
            position: 'absolute',
            top: 0,
            zIndex: 2,
            display: 'flex !important',
            alignItems: 'center',
            width: '150px',
            padding: '0 20px',
            height: '100%',
            cursor: 'pointer',
            [theme.breakpoints.down('md')]: {
                top: '50%',
                transform: 'translate3d(0, -50%, 0)',
                width: 'auto',
                height: 'auto'
            },
            '&.slick-prev': {
                left: 0
            },
            '&.slick-next': {
                right: 0,
                justifyContent: 'flex-end'
            }
        }
    },
    rootSimpleSlider: {
        paddingBottom: 0,
    },
    slideArrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: theme.appColors.weekWhite,
        transition: `box-shadow ${ animationDuration }`,
        boxShadow: '0 5px 13px 0 rgba(187, 187, 187, 0.5)',
        [theme.breakpoints.up('lg')]: {
            boxShadow: 'none',
            '&:hover': {
                boxShadow: '0 5px 5px 0 rgba(187, 187, 187, 0.5)'
            },
            '@media (hover: none)': {
                '&:hover': {
                    boxShadow: 'none'
                }
            }
        }
    },
    slide: {
        padding: '4px 5px',
        [theme.breakpoints.up('md')]: {
            paddingLeft: '16px',
            paddingRight: '16px'
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '10px',
            paddingRight: '10px'
        },
        '&:focus': {
            outline: 'none'
        }
    },
    dotsContainer: {
        width: '100%',
        padding: '22px 0 0',
        margin: 0,
        textAlign: 'center',
        listStyleType: 'none',
        [theme.breakpoints.only('md')]: {
            paddingTop: 42
        },
        [theme.breakpoints.only('lg')]: {
            paddingTop: 52
        },
        '& li': {
            margin: '4px 8px',
            display: 'inline-block',

            '&.slick-active': {
                '& span': {
                    ...dotChange(theme)
                }
            }
        }
    },
    dotWrapper: {
        position: 'relative',
        width: '10px',
        height: '10px',
        cursor: 'pointer',
        '&:hover': {
            '& span': {
                ...dotChange(theme)
            }
        }
    },
    dot: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 0)',
        display: 'inline-block',
        width: '7px',
        height: '7px',
        border: 'none',
        borderRadius: '50%',
        background: theme.appColors.softGrey,
        transition: `width ${ animationDuration }, height ${ animationDuration }, 
            background ${ animationDuration }`
    },
    image: {
        [theme.breakpoints.between('xs', 'sm')]: {
            height: 260
        }
    }
});
