import * as React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { SuperAttributeItem } from '../SuperAttributeItem';
import { ISuperAttributeBlockProps as Props, ISuperAttributeBlockState as State } from './types';
import { styles } from './styles';

export class SuperAttributeBlockComponent extends React.Component<Props, State> {
    public state: State = {
        selectedItemValue: ''
    };

    protected selectAttribute = (value: string) => {
        const {onValueChanged, attributeData: {name}} = this.props;

        onValueChanged({name, value});
        this.setState(() => ({selectedItemValue: value}));
    };

    public render(): JSX.Element {
        const {classes, attributeData} = this.props;
        const {selectedItemValue} = this.state;

        return (
            <div className={classes.attributeBlock}>
                <Typography
                    variant="subheading"
                    component="span"
                    color="textSecondary"
                    className={classes.attributeTitle}
                >
                    {attributeData.nameToShow}
                </Typography>

                <div className={classes.attributesList}>
                    {attributeData.data.map(attribute => (
                        <div className={classes.attributesItem}>
                            <SuperAttributeItem
                                key={attribute.value.length > 0 ? attribute.value : attribute.name}
                                attributeItemData={attribute}
                                onSelect={() => this.selectAttribute(attribute.value)}
                                isSelected={
                                    attribute.value.length > 0
                                        ? attribute.value === selectedItemValue
                                        : attribute.name === selectedItemValue
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export const SuperAttributeBlock = withStyles(styles)(SuperAttributeBlockComponent);
