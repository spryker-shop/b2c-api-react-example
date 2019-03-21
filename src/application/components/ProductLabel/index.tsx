import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { IProductLabelProps as Props } from './types';
import { styles } from './styles';

const ProductLabelComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, label } = props;
    if (!label) {
        return null;
    }

    const labelData: { [key: string]: { className: string } } = {
        '1': {
            className: classes.alternativeLabel
        },
        '2': {
            className: classes.discontinuedLabel
        },
        '3': {
            className: classes.standardLabel
        },
        '4': {
            className: classes.newLabel
        },
        '5': {
            className: classes.saleLabel
        }
    };
    const colorClassName: string = labelData[label.type].className;

    return (
        <div className={ `${classes.labelsOuter}` }>
            <span className={`${classes.labelText} ${colorClassName}`}>{ label.text }</span>
        </div>
    );
};

export const ProductLabel = withStyles(styles)(ProductLabelComponent);
