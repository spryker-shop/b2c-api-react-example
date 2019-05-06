import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles: any = (theme: Theme) => createStyles({
    '@global': {
        '@font-face': [
            {
                fontFamily: 'Circular',
                fontStyle: 'normal',
                fontWeight: 400,
                src: 'url("https://s3.eu-central-1.amazonaws.com/spryker/fonts/circular-pro/' +
                    'lineto-circular-pro-book.woff2") format("woff2")'
            },
            {
                fontFamily: 'Circular',
                fontStyle: 'normal',
                fontWeight: 500,
                src: 'url("https://s3.eu-central-1.amazonaws.com/spryker/fonts/circular-pro/' +
                    'lineto-circular-pro-medium.woff2") format("woff2")'
            },
            {
                fontFamily: 'Circular',
                fontStyle: 'normal',
                fontWeight: 700,
                src: 'url("https://s3.eu-central-1.amazonaws.com/spryker/fonts/circular-pro/' +
                    'lineto-circular-pro-bold.woff2") format("woff2")'
            }
        ] as any,
        body: {
            minWidth: 320,
            fontFamily: 'Circular'
        },
        '.app-wrapper': {
            overflow: 'hidden'
        }
    },
    root: {
        backgroundColor: theme.appColors.white,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    lockedPage: {
        [theme.breakpoints.between('xs', 'sm')]: {
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            overflow: 'hidden',
            height: '100%'
        }
    }
});
