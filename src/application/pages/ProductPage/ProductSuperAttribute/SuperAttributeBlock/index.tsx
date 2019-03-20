import * as React from 'react';
import { Button, Typography, withStyles } from '@material-ui/core';
import { ISuperAttributeBlockProps as Props, ISuperAttributeBlockState as State } from './types';
import { styles } from './styles';

export class SuperAttributeBlockComponent extends React.Component<Props, State> {
    public state: State = {
        selectedItemValue: ''
    };

    protected selectAttribute = (selectedValue: string) => {
        const { onValueChanged, attributeData: { name } } = this.props;
        const value: string = selectedValue.length > 0 ? selectedValue : name;

        onValueChanged({ name, value });
        this.setState(() => ({ selectedItemValue: value }));
    };

    protected renderProductAttributes = (): JSX.Element[] => {
        const { classes, attributeData } = this.props;
        const { selectedItemValue } = this.state;

        return attributeData.data.map(attribute => {
            const isSelected = attribute.value.length > 0 ? attribute.value === selectedItemValue
                : attribute.name === selectedItemValue;

            return (
                <div
                    className={ classes.attributesItem }
                    key={ attribute.value.length > 0 ? attribute.value : attribute.name }
                >
                    <Button
                        variant="outlined"
                        className={ `${ classes.button } ${ isSelected ? classes.buttonSelected : '' }` }
                        onClick={ () => this.selectAttribute(attribute.value) }
                        fullWidth
                    >
                        { attribute.name }
                    </Button>
                </div>
            );
        });
    };

    public render(): JSX.Element {
        const { classes, attributeData } = this.props;

        return (
            <div className={ classes.attributeBlock }>
                <Typography
                    variant="subheading"
                    component="span"
                    color="textSecondary"
                    className={ classes.attributeTitle }
                >
                    { attributeData.nameToShow }
                </Typography>

                <div className={ classes.attributesList }>
                    { this.renderProductAttributes() }
                </div>
            </div>
        );
    }
}

export const SuperAttributeBlock = withStyles(styles)(SuperAttributeBlockComponent);
