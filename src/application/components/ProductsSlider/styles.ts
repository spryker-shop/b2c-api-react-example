import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const dotChange = {
    width: '10px',
    height: '10px',
    backgroundColor: '#ceced0'
};

const animationDuration = '0.15s';

export const styles = (theme: Theme) => createStyles({
    root: {
        position: 'relative',
        paddingBottom: '82px',

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
        backgroundColor: '#f4f4f4',
        transition: `box-shadow ${animationDuration}`,

        '&:hover': {
            boxShadow: '0 5px 13px 0 rgba(187, 187, 187, 0.5)'
        }
    },
    slide: {
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        listStyleType: 'none',

        '& li': {
            margin: '8px',
            display: 'inline-block',

            '&.slick-active': {
                '& span': {
                    ...dotChange
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
                ...dotChange
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
