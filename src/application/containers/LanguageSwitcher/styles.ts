import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
    langBtn: {
        padding: '2px 15px',
        textTransform: 'capitalize',
        fontSize: '14px',
        lineHeight: 1.4,
        color: theme.appColors.grey,
        width: 123,
        background: theme.appColors.white,
    },
    langBtnInner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    langBtnText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    content: {
        minWidth: 123
    }
});
