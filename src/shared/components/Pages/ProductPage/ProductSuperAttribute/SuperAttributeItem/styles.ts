import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { rgba } from 'src/shared/helpers/common/hextorgba';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  button: {
    margin: `0 ${theme.spacing.unit}px ${theme.spacing.unit}px 0`,
    padding: theme.spacing.unit * 1.7,
    textTransform: 'uppercase',
    fontSize: theme.appFixedDimensions.fontSize.small,
    '&:last-child': {
      marginRight: 'auto',
    },
  },
  buttonSelected: {
    pointerEvents: 'none',
    borderColor: theme.appColors.blue,
    color: theme.appColors.blue,
    background: rgba(theme.appColors.blue, .1),
  },
});
