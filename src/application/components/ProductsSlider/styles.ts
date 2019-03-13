import { Theme, createStyles } from '@material-ui/core';

const dotChange = (theme: Theme) => ({
    width: '10px',
        height: '10px',
        backgroundColor: theme.appColors.lightGrey
});

const animationDuration = '0.15s';

export const styles = (theme: Theme) => createStyles({
    root: {
        position: 'relative',
        paddingBottom: '82px',
        margin: '0 -10px',

        [theme.breakpoints.only('md')]: {
            margin: '0 -16px'
        },

        [theme.breakpoints.down('sm')]: {
            paddingBottom: '60px'
        },

        '& .slick-slide': {
            transition: `opacity ${animationDuration}`,

            '&:not(.slick-active)': {
                opacity: 0.3
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
            height: 'calc(100% - 82px)',
            cursor: 'pointer',

            [theme.breakpoints.down('md')]: {
                top: 'calc((100% - 82px) / 2)',
                transform: 'translate3d(0, -50%, 0)',
                width: 'auto',
                height: 'auto',
            },

            [theme.breakpoints.down('sm')]: {
                top: 'calc((100% - 60px) / 2)'
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
    slideArrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: theme.appColors.weekWhite,
        transition: `box-shadow ${animationDuration}`,

        [theme.breakpoints.down('md')]: {
            boxShadow: '0 5px 13px 0 rgba(187, 187, 187, 0.5)'
        },

        [theme.breakpoints.up('lg')]: {
            '&:hover': {
                boxShadow: '0 5px 5px 0 rgba(187, 187, 187, 0.5)'
            }
        },
    },
    slide: {
        paddingLeft: '10px',
        paddingRight: '10px',

        [theme.breakpoints.only('md')]: {
            paddingLeft: '16px',
            paddingRight: '16px'
        }
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        paddingLeft: 0,
        textAlign: 'center',
        listStyleType: 'none',

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
        backgroundColor: '#eaeaea',
        transition: `width ${animationDuration}, height ${animationDuration}, background-color ${animationDuration}`
    }
});
