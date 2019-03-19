import createStyles from '@material-ui/core/styles/createStyles';

export const styles = () => createStyles({
    title: {
        textTransform: 'uppercase',
        margin: '0 0 16px',
    },
    linkList: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    linkItem: {
        marginBottom: 16,
    },
    link: {
        textDecoration: 'none',
        color: '#000',
    },
});
