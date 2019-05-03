import { WithStyles } from '@material-ui/core';
import { styles } from '@components/SquareImage/styles';

interface ISquareImageProps extends WithStyles<typeof styles> {
    image: string;
    alt: string | undefined | number;
}
