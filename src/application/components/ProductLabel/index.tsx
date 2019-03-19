import * as React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { IProductLabelProps as Props } from './types';
import { styles } from './styles';

export const ProductLabelBase: React.SFC<Props> = (props): JSX.Element => {
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
            <div key={ label.type } className={ `${classes.label}` }>
                <Typography
                    component="span"
                    className={ `${classes.labelText} ${colorClassName}` }
                >
                    { label.text }
                </Typography>
            </div>
        </div>
    );
};

export const ProductLabel = withStyles(styles)(ProductLabelBase);
