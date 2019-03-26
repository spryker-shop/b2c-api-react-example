import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { IProductLabelProps as Props } from './types';
import { styles } from './styles';
import { IProductLabel } from '@interfaces/product';

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

    const renderLabels = (): JSX.Element[] => (
        label.map((item: IProductLabel, index: number) => {
            if (!item) {
                return null;
            }

            // console.log(item);

            const colorClassName: string = labelData[item.type].className;

            return (
                <span className={ classes.labelItem } key={`${index}+${item.text}`}>
                    <span className={`${classes.labelText} ${colorClassName}`}>
                        { item.text }
                    </span>
                </span>
            );
        })
    );

    return (
        <div className={ `${classes.labelsOuter}` }>
            { renderLabels() }
        </div>
    );
};

export const ProductLabel = withStyles(styles)(ProductLabelComponent);
