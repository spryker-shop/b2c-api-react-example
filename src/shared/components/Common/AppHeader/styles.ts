import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  header: {
    borderBottom: '1px solid #d8d8d8',
  },
  headerTop: {
    background: theme.palette.primary.main,
    padding: '26px 0',
  },
  headerSearchContainer: {
    width: '50%',
    minWidth: 200,
  },
  headerContainer: {
    ...theme.appContainerStyles,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBottom: {
    padding: '8px 0',
  },
});