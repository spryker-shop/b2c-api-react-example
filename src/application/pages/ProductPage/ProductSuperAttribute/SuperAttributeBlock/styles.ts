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
    }
});
