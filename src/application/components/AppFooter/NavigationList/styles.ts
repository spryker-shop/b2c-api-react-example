import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
    title: {
        display: 'block',
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: 0.2,
        color: theme.appColors.black,
        paddingBottom: 18
    },
    linkList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    linkItem: {
        paddingBottom: 11,
    },
    link: {
        textDecoration: 'none',
        color: theme.appColors.grey,
        fontSize: 15,
        letterSpacing: 0.2
    },
});
