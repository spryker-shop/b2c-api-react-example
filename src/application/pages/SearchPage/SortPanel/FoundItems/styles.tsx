import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
    root: {},
    paragraph: {
        fontSize: theme.appFixedDimensions.fontSize.small,
        letterSpacing: -0.4,
        lineHeight: 1,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            marginBottom: theme.spacing.unit * 2,
        },
    },
});
