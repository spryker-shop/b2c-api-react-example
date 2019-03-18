import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/SquareImage/styles';

interface ISquareImageProps extends WithStyles<typeof styles> {
    image: string;
    size: number;
    extraOverlayClassName?: string;
    alt: string | undefined;
}
