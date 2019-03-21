import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        paddingBottom: 130
    },
    productBtn: {
        width: '100%',
        fontSize: 18,
        margin: 0,
    },
    generalInfoParent: {
        [theme.breakpoints.down('sm')]: {
            order: 1,
            marginBottom: theme.spacing.unit * 3,
        },
    },
    sliderParent: {
        [theme.breakpoints.down('sm')]: {
            order: 2,
        },
    },
    sliderParentContainer: {
        marginBottom: 30,
        '& .slide': {
            background: 'transparent',
        },
        '& img': {
            width: 'auto !important',
            height: 'auto',
            maxHeight: '100%',
            maxWidth: '100%',
        },
        '& .slider-wrapper': {
            margin: '0 auto',
            width: 'auto',
            maxWidth: '370px',
        },
        '& .control-prev': {
            '&:before': {
                transform: 'scale(-1, 1)',
            },
        },
        '& .control-arrow': {
            width: 68,
            '&:before': {
                border: 'none !important',
                // tslint:disable:max-line-length
                content: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAAXNSR0IArs4c6QAAAO5JREFUGBljNjY2bpSWll4uKSkpnJ6evv/AgQP/GZAAI1DBAyBfHiq2SklJKXb16tW/YGqYGBkZS4Cc31CBsPv37291cHDggSlgBDFMTU09/v37txbI5ALxgZrOcHJyeh0+fPg1WAFI0MzMzBKoaMv///+FoIpusbGxucEVgASBJmkDFe0EMqWhio4zgRj4ANwEXFaATQA58u/fv3tg9gNNPAt0pM2xY8ceMpmYmIQA7d0EFAT7AEjv4+DgcAT5AGQ1E1BXD5BmBXGA3lsrJibmdfTo0c8gPgiArFgIlHgJxF0+Pj5h27dv/wmWgRIADAlXCagfJNEAAAAASUVORK5CYII=') !important`,
                // tslint:enable:max-line-length
            },
        },
    },
    productMain: {
        marginBottom: theme.spacing.unit * 14,
        paddingTop: '1.25rem',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing.unit * 3,
        },
    },
});
