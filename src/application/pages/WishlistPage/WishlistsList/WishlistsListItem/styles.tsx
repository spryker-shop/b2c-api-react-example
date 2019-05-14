import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const generalInfoTitleWidth = 135;

export const styles = (theme: Theme) => createStyles({
    item: {
        padding: '22px 100px 15px 22px',
        background: theme.appColors.white,
        position: 'relative',
        fontSize: 16,
        letterSpacing: 0.2,
        lineHeight: 1.5,
        color: theme.appColors.black,
        marginBottom: 20,
        borderRadius: 4,
        boxShadow: '0 2px 10px 0 rgba(216, 216, 216, 0.5)',
        border: `1px solid ${theme.appColors.weekWhite}`,
        '&:last-child': {
            marginBottom: 0
        }
    },
    name: {
        paddingBottom: 10,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    nameLink: {
        display: 'inline-block',
        marginBottom: 1,
        textDecoration: 'none',
        color: theme.appColors.grey,
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
            color: theme.appColors.blue
        }
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: 17
    },
    actionItem: {
        padding: 10,
        fill: theme.appColors.lightGrey,
        background: 'none',
        transition: 'fill 0.3s ease-in-out',
        '&:hover': {
            background: 'none'
        }
    },
    actionItemDisabled: {
        opacity: 0.6
    },
    actionDelete: {
        '&:hover': {
            fill: theme.appColors.red
        }
    },
    actionEdit: {
        '&:hover': {
            fill: theme.appColors.blue
        }
    },
    generalInfo: {
        display: 'flex',
        flexWrap: 'wrap',
        color: theme.appColors.grey,
        margin: 0
    },
    generalInfoDescritption: {
        paddingBottom: 7,
        margin: 0,
        width: `calc(100% - ${ generalInfoTitleWidth }px)`,
        paddingLeft: 20
    },
    generalInfoTitle: {
        paddingBottom: 7,
        color: theme.appColors.black,
        width: generalInfoTitleWidth
    },
    amount: {
        display: 'inline-block',
        padding: '5px 17px',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: 0.1,
        color: theme.appColors.white,
        background: theme.appColors.weakGrey,
        borderRadius: 13,
        whiteSpace: 'nowrap',
        lineHeight: 1.4
    },
    inputRoot: {
        fontSize: 'inherit'
    },
    input: {
        padding: 0,
        fontSize: 'inherit',
        height: 'auto',
        border: 0,
        borderBottom: `1px solid ${theme.appColors.black}`,
        background: theme.appColors.white,
        borderRadius: 0
    }
});
