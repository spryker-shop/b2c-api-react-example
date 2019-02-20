import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const sprykerFormStyles = (theme: Theme) => createStyles({
    form: {
        paddingBottom: 0,
        paddingTop: 0,
        '&:first-child': {
            paddingTop: theme.spacing.unit * 1.5,
        },
    },
    controlsGroup: {
        paddingBottom: theme.spacing.unit * 1.5,
        paddingTop: theme.spacing.unit * 2.5,
        '&:last-child': {
            paddingBottom: 0,
        },
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            paddingTop: 0,
        },
    },
    control: {
        paddingLeft: theme.spacing.unit * 1.5,
        paddingRight: 0,
        '&:first-child': {
            paddingRight: theme.spacing.unit * 1.5,
            paddingLeft: 0,
            [theme.breakpoints.down('xs')]: {
                paddingRight: 0,
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing.unit * 2,
            paddingLeft: 0,
        },
    },
    controlFullWidthOnlyChild: {
        '&:only-child': {
            paddingRight: 0,
            paddingLeft: 0,
        },
    },
    controlFullWidth: {
        '&:only-child': {
            paddingRight: 0,
            paddingLeft: 0,
        },
    },
    root: {},
    textField: {
        marginBottom: 0,
        marginTop: 0,
    },
    menu: {},
    label: {
        position: 'relative',
        paddingBottom: theme.spacing.unit,
        color: theme.appColors.black,
        top: 'auto',
        left: 'auto',
        width: '100%',
        fontWeight: 600,
    },
    labelCheckbox: {
        paddingBottom: 0,
    },
    inputRoot: {
        'label + &': {
            marginTop: 0,
        }
    },
    input: {
        borderRadius: theme.appFixedDimensions.borderRadius,
        border: `solid 1px ${theme.appColors.weakGrey}`,
        backgroundColor: theme.appColors.white,
        padding: theme.spacing.unit * 1.5,
        width: '100%',
        height: 'auto',
        lineHeight: 'normal',
        letterSpacing: 0.5,
        color: theme.appColors.black,
        fontSize: theme.appFixedDimensions.fontSize.small,
        fontWeight: 'normal',
        [theme.breakpoints.down('sm')]: {
            width: 100,
        },

        '&:focus': {
            border: `solid 1px ${theme.appColors.blue}`,
        },
    },
    radioGroupLabel: {
        marginBottom: theme.spacing.unit * 3,
    },
    inputRadio: {
        padding: 0,
        border: `solid 1px ${theme.appColors.weakGrey}`,
        borderRadius: theme.appFixedDimensions.borderRadius,
        marginBottom: theme.spacing.unit * 1.5,
        paddingRight: theme.spacing.unit * 1.5,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
    },
    radioGroupInRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    radioGroupNoLabel: {
        marginTop: 0,
    },
    inputItemsInRow: {
        display: 'flex',
        width: 'auto',
        marginRight: theme.spacing.unit * 3,
    },
    checkedInputRadio: {
        border: `solid 1px ${theme.appColors.blue}`,
        backgroundColor: theme.appColors.blueTransparent,
    },
    checkedRadioLabel: {
        color: theme.appColors.blue,
    },
    radio: {
        color: theme.appColors.weakGrey,
        paddingRight: theme.spacing.unit,
        letterSpacing: 0.5,
    },
    checkedRadio: {
        '& svg': {
            color: theme.appColors.blue,
        }
    },
    inputCheckbox: {
        padding: 0,
        paddingRight: theme.spacing.unit,
        borderRadius: theme.appFixedDimensions.borderRadius,
        color: theme.appColors.weakGrey,
        '& svg': {
            fontSize: 30,
        }
    },
    checkedCheckbox: {
        '& svg': {
            color: theme.appColors.blue,
        }
    },
    outerCheckbox: {
        marginLeft: 0,
    },
    selectRoot: {
        paddingLeft: 0,
        display: 'flex',
    },
    selectClassName: {},
    selectFormControlClassName: {
        display: 'flex',
        flexDirection: 'column',
    },
    selectInputRootClassName: {
        width: '100%',
    },
    selectLabel: {
        display: 'flex',
    },
    selectInputRoot: {
        display: 'flex',
    },
    menuItemClassName: {},
    btnSubmitOuter: {},
    error: {
        color: theme.palette.error.main,
        '& input': {
            borderColor: theme.palette.error.main,
        },
        '& [role="button"]': {
            borderColor: theme.palette.error.main,
        }
    },
    placeholder: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '0',
        right: '0',
        overflow: 'hidden',
        margin: '12px 14px 0',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        zIndex: 3,
        pointerEvents: 'none',
        lineHeight: '20px',
        fontWeight: 500,
        color: '#111111',
        opacity: 0.43
    },
    filled: {
        display: 'none'
    }
});
