import * as React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { ISuperAttributeItemProps as Props } from './types';
import { styles } from './styles';

export const SuperAttributeItemComponent: React.SFC<Props> = (props): JSX.Element => {
    const {classes, attributeItemData, isSelected, onSelect} = props;

    const onSelectValue = () => {
        const {value, name} = attributeItemData;

        onSelect(value.length > 0 ? value : name);
    };

    return (
        <Button
            variant="outlined"
            color={isSelected ? 'primary' : null}
            className={`${classes.button} ${isSelected ? classes.buttonSelected : ''}`}
            onClick={onSelectValue}
        >
            {attributeItemData.name}
        </Button>
    );
};

export const SuperAttributeItem = withStyles(styles)(SuperAttributeItemComponent);
