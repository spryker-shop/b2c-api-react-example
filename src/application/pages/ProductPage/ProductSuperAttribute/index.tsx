import * as React from 'react';
import { IProductSuperAttributeProps as Props } from './types';
import { ISuperAttribute } from '@interfaces/product';
import { Button, Typography, withStyles } from '@material-ui/core';
import { styles } from './styles';

const ProductSuperAttributeComponent: React.SFC<Props> = (props): JSX.Element => {
    const { superAttributes, classes } = props;

    const renderProductAttributes = (attributeData: ISuperAttribute): JSX.Element[] => {
        const { superAttrSelected, onChange } = props;

        return attributeData.data.map(attribute => {
            const isSelected = attribute.value === superAttrSelected[attributeData.name];

            return (
                <div
                    className={ classes.attributesItem }
                    key={ attribute.value.length > 0 ? attribute.value : attribute.name }
                >
                    <Button
                        variant="outlined"
                        className={`${ classes.button } ${ isSelected ? classes.buttonSelected : '' }`}
                        onClick={ () => onChange(attributeData.name, attribute.value) }
                        fullWidth
                    >
                        { attribute.name }
                    </Button>
                </div>
            );
        });
    };

    return (
        <>
            { superAttributes.map((attribute: ISuperAttribute) => (
                <div className={ classes.attributeBlock } key={ attribute.name }>
                    <Typography
                        variant="h6"
                        component="span"
                        color="textSecondary"
                        className={ classes.attributeTitle }
                    >
                        { attribute.nameToShow }
                    </Typography>

                    <div className={ classes.attributesList }>
                        { renderProductAttributes(attribute) }
                    </div>
                </div>

            )) }
        </>
    );
};

export const ProductSuperAttribute = withStyles(styles)(ProductSuperAttributeComponent);
