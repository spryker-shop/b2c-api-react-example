import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { IProductLabelProps as Props } from './types';
import { styles } from './styles';
import { IProductLabel } from '@interfaces/product';

const ProductLabelComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes, label } = props;

    if (!label) {
        return null;
    }

    const labelClass = (type: string): string => {
        switch (type) {
            case '1':
                return classes.alternativeLabel;
            case '2':
                return classes.discontinuedLabel;
            default:
            case '3':
                return classes.standardLabel;
            case '4':
                return classes.newLabel;
            case '5':
                return classes.saleLabel;
        }
    };

    const renderLabels = (): JSX.Element[] => (
        label.map((item: IProductLabel, index: number) => {
            if (!item) {
                return null;
            }

            const colorClassName: string = labelClass(item.type);

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
