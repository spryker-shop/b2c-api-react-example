import * as React from 'react';
import { SuperAttributeBlock } from './SuperAttributeBlock';
import { IProductSuperAttributeProps as Props, IProductSuperAttributeState as State } from './types';
import { ISuperAttribute } from '@helpers/product/types';

export class ProductSuperAttribute extends React.Component<Props, State> {
    // public state: State = {
    //     selectedValues: null
    // };

    // protected onChange = ({ name, value }: { name: string, value: string }): void => {
    //     const { selectedValues } = this.state;
    //     const updatedValues = selectedValues === null
    //         ? { [name]: value }
    //         : {
    //             ...selectedValues,
    //             [name]: value
    //         };
    //
    //
    //     // this.setState({ selectedValues: updatedValues });
    // };

    public render(): JSX.Element {
        const { productData, superAttrSelected } = this.props;
        // console.log(this.state.selectedValues, 'selectedValues selectedValues selectedValues selectedValues');

        return (
            <>
                { productData.map((attribute: ISuperAttribute) => (
                    <SuperAttributeBlock
                        superAttrSelected={ superAttrSelected[attribute.name] }
                        attributeData={ attribute }
                        onValueChanged={ this.props.onChange }
                        key={ attribute.name }
                    />
                )) }
            </>
        );
    }
}
