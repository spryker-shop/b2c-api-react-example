import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    attributeBlock: {
        padding: '24px 0',
        '&:not(:last-child)': {
            borderBottom: `1px solid ${theme.appColors.blockDivider}`,
        },
    },
    attributesList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    attributeTitle: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        fontWeight: 'normal',
        color: theme.appColors.black,
        margin: '0 0 7px',
    },
});
