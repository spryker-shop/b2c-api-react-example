import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const dotChange = (theme: Theme) => ({
    width: '10px',
    height: '10px',
    backgroundColor: theme.appColors.lightGrey
});

const animationDuration = '0.15s';
const thumbnailsDimensions = 80;

export const styles = (theme: Theme) => createStyles({
    thumbnailsCol: {
        width: thumbnailsDimensions
    },
    mainSliderCol: {
        paddingLeft: 20,
        width: `calc(100% - ${thumbnailsDimensions}px)`
    },
    mainSliderFullWidth: {
        width: '100%',
        padding: 0
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
                left: 20
            },

            '&.slick-next': {
                right: 20
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
            margin: '-10px 0',
        },
        '& .slick-slide': {
            transition: `opacity ${ animationDuration }`,
            opacity: 0.3,
            border: 0,

            '&.slick-current': {
                opacity: 1,
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

        '& .slick-list': {
            margin: '0'
        },
    },
    thumbnailItem: {
        padding: '10px 0',

        '&:focus': {
            outline: 'none'
        },
    },

    mainSliderItem: {
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
        height: 630
    },
    imageThumbnail: {
        width: '100%',
        minWidth: '100%',
        height: thumbnailsDimensions,
        cursor: 'pointer',
    },
    slideArrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: `1px solid ${theme.appColors.lightGrey}`,
        transition: `box-shadow ${ animationDuration }, border ${ animationDuration }, stroke ${ animationDuration }, background-color ${ animationDuration }`,
        cursor: 'pointer',
        stroke: theme.appColors.lightGrey,

        '&:hover': {
            backgroundColor: theme.appColors.weekWhite,
            stroke: theme.appColors.weakGrey,
            borderColor: 'transparent',
            boxShadow: '0 5px 13px 0 rgba(187, 187, 187, 0.5)'
        }
    },
    slideArrowThumbs: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 15,
        stroke: theme.appColors.lightGrey,
        transition: `stroke ${ animationDuration }`,
        cursor: 'pointer',

        '&:hover': {
            stroke: theme.appColors.blue
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
        padding: '0 20px',

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
        transition: `width ${ animationDuration }, height ${ animationDuration }, 
            background-color ${ animationDuration }`
    }
});
