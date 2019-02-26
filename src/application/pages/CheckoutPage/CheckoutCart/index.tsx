import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withStyles, List, Button } from '@material-ui/core';
import { CartTotal } from '@application/components/CartTotal';
import { CustomerPageTitle } from '@application/components/CustomerPageTitle';
import { CheckoutCartProductList } from './CheckoutCartProductList';
import {
    ICartDataProps as Props,
    ICartDataState as State
} from './types';
import { styles } from './styles';

@connect
export class CheckoutCartBase extends React.Component<Props, State> {
    protected containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    protected designImgWidth: number = 0.33;

    public readonly state: State = {
        listItemHeight: 100,
        products: [],
        totals: null,
        order: null
    };

    public static getDerivedStateFromProps = (nextProps: Props, prevState: State): State => {
        if (prevState.order !== nextProps.order) {
            const { order, products, totals } = nextProps;
            const { products: prevProducts, totals: prevTotals } = prevState;
            const productList = order ? prevProducts : products;
            const totalsList = order ? prevTotals : totals;

            if (order) {
                nextProps.isUserLoggedIn
                    ? nextProps.updateCart()
                    : nextProps.updateGuestCart(nextProps.anonymId);
            }

            return {
                order,
                products: productList,
                totals: totalsList
            };
        }

        return null;
    }

    public componentDidMount = (): void => {
        window.addEventListener('resize', this.setListItemHeight);
        this.setListItemHeight();
    }

    public componentWillUnmount = (): void => {
        window.removeEventListener('resize', this.setListItemHeight);
    }

    protected setListItemHeight = (): void => {
        if (this.containerRef && this.containerRef.current) {
            this.setState({ listItemHeight: this.containerRef.current.offsetWidth * this.designImgWidth });
        }
    };

    public render(): JSX.Element {
        const { classes, order, isSendBtnDisabled, sendData } = this.props;
        const { products, totals, listItemHeight } = this.state;

        return (
            <div className={ classes.root } ref={ this.containerRef }>
                <CustomerPageTitle
                    title={ order
                        ? <FormattedMessage id={ 'word.total.title' } />
                        : <FormattedMessage id={ 'word.cart.title' } /> }
                />
                <List>
                    <CheckoutCartProductList
                        products={ products }
                        listItemHeight={ listItemHeight }
                    />
                </List>

                { !order &&
                    <CustomerPageTitle title={ <FormattedMessage id={ 'word.total.title' } /> } />
                }

                <CartTotal
                    totals={ totals }
                    title={ <FormattedMessage id={ `${order ? 'order.amount' : 'grand.total.title'}` } /> }
                />

                { !order &&
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={ isSendBtnDisabled }
                        fullWidth
                        className={ classes.btnWrapper }
                        onClick={ sendData }
                >
                    { <FormattedMessage id={ 'place.order.title' } /> }
                </Button>
                }
            </div>
        );
    }
}

export const CheckoutCart = withStyles(styles)(CheckoutCartBase);
