import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    attributeBlock: {
        paddingBottom: 30
    },
    attributesList: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: -5
    },
    attributeTitle: {
        paddingBottom: 15
    },
    attributesItem: {
        padding: 5,
        minWidth: '25%'
    },
    button: {
        height: 42,
        background: theme.appColors.weekWhite,
        border: 0,
        fontSize: 14,
        fontWeight: 400,
        color: theme.appColors.grey,
        letterSpacing: 0,
        transition: 'color 0.3s ease-in-out, background 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:active, &:hover': {
            border: 0,
            boxShadow: 'inset 0 1px 9px 0 rgba(229, 229, 229, 0.5)',
            background: '#eaeaea',
            color: theme.appColors.grey
        }
    },
    buttonSelected: {
        pointerEvents: 'none',
        background: theme.appColors.blue,
        color: theme.appColors.white,
        '&:active, &:hover': {
            boxShadow: 'none',
            background: theme.appColors.blue,
            color: theme.appColors.white
        }
    }
});
