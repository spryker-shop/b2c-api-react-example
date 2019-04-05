import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const dotChange = (theme: Theme) => ({
    width: '10px',
    height: '10px',
    backgroundColor: theme.appColors.lightGrey
});

const animationDuration = '0.15s';
const thumbnailSizeLg = 80;
const thumbnailSizeMd = 50;

export const styles = (theme: Theme) => createStyles({
    thumbnailsCol: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: thumbnailSizeMd
        },
        [theme.breakpoints.up('lg')]: {
            width: thumbnailSizeLg
        }
    },
    mainSliderCol: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            paddingLeft: 10,
            width: `calc(100% - ${thumbnailSizeMd}px)`
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 20,
            width: `calc(100% - ${thumbnailSizeLg}px)`
        }
    },
    mainSliderFullWidth: {
        width: '100%',
        padding: 0
    },
    sliderWrapper: {
        position: 'relative'
    },
    mainSlider: {
        minHeight: 0,
        minWidth: 0,
        '& .slick-arrow': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            '&.slick-prev': {
                left: 10,
                [theme.breakpoints.up('lg')]: {
                    left: 20
                }
            },
            '&.slick-next': {
                right: 10,
                [theme.breakpoints.up('lg')]: {
                    right: 20
                }
            }
        }
    },
    thumbnailsHidden: {
        display: 'none'
    },
    thumbnailSlider: {
        maxHeight: 630,
        overflow: 'hidden',
        '& .slick-list': {
            margin: '-5px 0',
            [theme.breakpoints.up('lg')]: {
                margin: '-10px 0',
            }
        },
        '& .slick-slide': {
            transition: `opacity ${animationDuration}`,
            opacity: 0.3,
            border: 0,
            '&.slick-current': {
                opacity: 1
            },
            '&:not(.slick-current):hover': {
                opacity: 0.7
            }
        },

        '& .slick-arrow': {
            position: 'absolute',
            left: 0,
            width: '100%',
            zIndex: 2,
            '&.slick-prev': {
                top: 0
            },
            '&.slick-next': {
                bottom: 0
            }
        }
    },
    thumbnailSliderScrolled: {
        padding: '15px 0',
        marginTop: -15,
        [theme.breakpoints.up('lg')]: {
            marginTop: 0
        },
        '& .slick-list': {
            margin: '0'
        }
    },
    thumbnailItem: {
        padding: '5px 0',
        [theme.breakpoints.up('lg')]: {
            padding: '10px 0',
        },
        '&:focus': {
            outline: 'none'
        }
    },

    mainSliderItem: {
        padding: '0 5px',
        [theme.breakpoints.up('sm')]: {
            padding: 0
        },
        '&:focus': {
            outline: 'none'
        }
    },
    imageWrapper: {
        borderRadius: 4,
        position: 'relative',
        width: '100%',
        flexShrink: 0
    },
    imageMain: {
        width: '100%',
        minWidth: '100%',
        height: 320,
        [theme.breakpoints.up('md')]: {
            height: 360
        },
        [theme.breakpoints.up('lg')]: {
            height: 630
        }
    },
    imageThumbnail: {
        width: '100%',
        minWidth: '100%',
        height: thumbnailSizeMd,
        cursor: 'pointer',
        [theme.breakpoints.up('lg')]: {
            height: thumbnailSizeLg,
        }
    },
    slideArrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: `1px solid ${theme.appColors.lightGrey}`,
        transition: `box-shadow ${animationDuration}, border ${animationDuration}, stroke ${animationDuration}, background-color ${animationDuration}`,
        cursor: 'pointer',
        stroke: theme.appColors.lightGrey,
        [theme.breakpoints.up('lg')]: {
            width: '40px',
            height: '40px'
        },
        '&:hover': {
            backgroundColor: theme.appColors.weekWhite,
            stroke: theme.appColors.weakGrey,
            borderColor: 'transparent',
            boxShadow: '0 5px 13px 0 rgba(187, 187, 187, 0.5)'
        },
        '@media (hover: none)': {
            '&:hover': {
                boxShadow: 'none',
                backgroundColor: 'transparent',
                stroke: theme.appColors.lightGrey,
                borderColor: theme.appColors.lightGrey
            }
        }
    },
    slideArrowIcon: {
        height: 10,
        width: 6,
        [theme.breakpoints.up('lg')]: {
            height: 13,
            width: 7,
        },
    },
    slideArrowThumbs: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 15,
        stroke: theme.appColors.lightGrey,
        transition: `stroke ${animationDuration}`,
        cursor: 'pointer',
        '&:hover': {
            stroke: theme.appColors.blue
        }
    },
    slideArrowThumbsIcon: {
        width: 13,
        height: 7
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        listStyleType: 'none',
        padding: '0 40px',
        margin: 0,
        [theme.breakpoints.up('sm')]: {
            padding: '0 10px'
        },
        [theme.breakpoints.up('md')]: {
            margin: '5px 0'
        },
        [theme.breakpoints.up('lg')]: {
            margin: '16px 0',
            padding: '0 20px'
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
        backgroundColor: theme.appColors.softGrey,
        transition: `width ${animationDuration}, height ${animationDuration}, 
            background-color ${animationDuration}`
    },
    label: {
        top: 10,
        left: 40,
        [theme.breakpoints.up('sm')]: {
            left: 5
        },
        [theme.breakpoints.up('md')]: {
            top: 20,
            left: 15
        }
    },
    labelSingleSlide: {
        left: 5,
        [theme.breakpoints.up('md')]: {
            left: 15
        }
    }
});
