import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import { appTypographyStyles } from '@theme/properties/overwritten/appTypography';

export const styles = (theme: Theme) => createStyles({
    userDrop: {
        ...appTypographyStyles,
        width: theme.appFixedDimensions.userDrop.width,
        padding: theme.spacing.unit * 3,
        borderBottom: `1px solid ${theme.appColors.weakGrey}`,
        borderLeft: `1px solid ${theme.appColors.weakGrey}`,
        borderRight: `1px solid ${theme.appColors.weakGrey}`,
    },
    title: {
        fontSize: theme.appFixedDimensions.fontSize.big,
        lineHeight: 'normal',
        fontWeight: 500,
        color: theme.appColors.black,
        letterSpacing: '-.5px',
        margin: 0,
        borderBottom: `1px solid ${theme.appColors.weakGrey}`,
        paddingBottom: 10,
        paddingTop: 10,
    },
    userDropNav: {
        listStyle: 'none',
        margin: 0,
        paddingTop: theme.spacing.unit * 3,
        paddingLeft: 0,
        '& li': {
            marginBottom: 10,
        },
        '& a': {
            fontSize: theme.appFixedDimensions.fontSize.small,
            color: theme.appColors.black,
            textDecoration: 'none',
            '&:hover': {
                color: theme.appColors.blue
            }
        },
    },
    userBtns: {
        ...appTypographyStyles,
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'space-between',
    },
    action: {
        flex: 1,
        fontSize: theme.appFixedDimensions.fontSize.small,
        textTransform: 'uppercase',
        fontWeight: 500,
        justifyContent: 'center',
        maxWidth: 140,
        width: '100%',
        paddingRight: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 1.5,
    },
    actionLogOut: {
        width: '100%',
    },
});
