import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ISquareImageProps as Props } from './types';

export const SquareImageComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, image, alt = '' } = props;

    return (
        <div className={ classes.imgWrapper }>
            <img src={ image } alt={ alt.toString() } className={ classes.image } />
            <div className={ classes.actionAreaOverlay } />
        </div>
    );
};

export const SquareImage = withStyles(styles)(SquareImageComponent);
