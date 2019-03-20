import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { SuperAttributeBlock } from './SuperAttributeBlock';
import { IProductSuperAttributeProps as Props, IProductSuperAttributeState as State } from './types';
import { ISuperAttribute } from '@helpers/product/types';
import { styles } from './styles';

export class ProductSuperAttributeComponent extends React.Component<Props, State> {
    public state: State = {
        selectedValues: null
    };

    protected onChange = ({ name, value }: { name: string, value: string }): void => {
        const { selectedValues } = this.state;
        const updatedValues = selectedValues === null
            ? { [name]: value }
            : {
                ...selectedValues,
                [name]: value
            };

        this.props.onChange({ name, value });
        this.setState({ selectedValues: updatedValues });
    };

    public render(): JSX.Element {
        const { productData } = this.props;

        return (
            <>
                { productData.map((attribute: ISuperAttribute, index) => (
                    <SuperAttributeBlock
                        attributeData={ attribute }
                        onValueChanged={ this.onChange }
                        key={ attribute.name }
                    />
                )) }
            </>
        );
    }
}

export const ProductSuperAttribute = withStyles(styles)(ProductSuperAttributeComponent);
