import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { withStyles, Badge, Tooltip } from '@material-ui/core';
import { pathCartPage } from '@constants/routes';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { MiniCartDrop } from './MiniCartDrop';
import { CartIcon } from './icons';
import IconButton from '@material-ui/core/IconButton';
import { ClickEvent } from '@interfaces/common';
import { IMiniCartDropDownProps as Props, IMiniCartDropDownState as State } from './types';
import { styles } from './styles';

@connect
@(withRouter as Function)
class MiniCartDropDownComponent extends React.Component<Props, State> {
    public readonly state: State = {
        anchorElement: null,
        isCartNotificationOpen: true,
        isPopupOpened: false,
        isContentHovered: false,
        isButtonHovered: false
    };

    protected iconButton: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidUpdate = (prevProps: Props): void => {
        const isSameLocation = this.props.location.pathname !== prevProps.location.pathname;
        const isCartEmpty = this.props.cartProductsQuantity === 0 && prevProps.cartProductsQuantity > 0;
        const isQuantityChanged = this.props.cartProductsQuantity > prevProps.cartProductsQuantity;

        if (isSameLocation) {
            this.setState({ anchorElement: null, isPopupOpened: false });
        }

        if (isQuantityChanged) {
            this.handleOpenCartNotification();
        }

        if (isCartEmpty) {
            this.setState({ anchorElement: null, isPopupOpened: false });
        }
    };

    protected onRedirectHandler = (): void => {
        const { cartItemsQuantity } = this.props;

        if (cartItemsQuantity !== 0) {
            this.props.history.push(pathCartPage);
        }
    };

    protected closePopover = (): void => {
        const { isButtonHovered, isContentHovered } = this.state;

        if (!isButtonHovered && !isContentHovered) {
            this.setState({ anchorElement: null, isPopupOpened: false });
        }
    };

    protected onHoverButtonHandler = ({ currentTarget }: ClickEvent): void => {
        const { cartItemsQuantity } = this.props;

        this.setState({
            anchorElement: currentTarget,
            isPopupOpened: cartItemsQuantity !== 0,
            isButtonHovered: true
        });
    };

    protected onHoverContentHandler = (): void => {
        this.setState({ isButtonHovered: false, isContentHovered: true });
    };

    protected onUnhoverButtonHandler = (): void => {
        this.setState({ isButtonHovered: false }, (): void => {
            this.closePopover();
        });
    };

    protected onUnhoverContentHandler = (): void => {
        this.setState({ isContentHovered: false }, (): void => {
            this.closePopover();
        });
    };

    protected handleOpenCartNotification = (): void => {
        this.setState({ isCartNotificationOpen: true });
    };

    public render(): JSX.Element {
        const { anchorElement, isPopupOpened } = this.state;
        const { classes, cartItemsQuantity } = this.props;

        const cartButton = (
            <IconButton
                buttonRef={ this.iconButton }
                aria-label="cart"
                color="inherit"
                onClick={ this.onRedirectHandler }
                onMouseEnter={ this.onHoverButtonHandler }
                onMouseLeave={ this.onUnhoverButtonHandler }
                className={`${classes.iconButton} ${!!anchorElement ? classes.isPopupOpened : '' }`}
            >
                <Badge
                    badgeContent={ cartItemsQuantity }
                    classes={{
                        colorPrimary: classes.badge,
                        badge: cartItemsQuantity === 0 && classes.hideBadge
                    }}
                    color="primary"
                >
                    <CartIcon />
                </Badge>
            </IconButton>
        );

        return (
            <>
                { cartItemsQuantity === 0
                    ? (<Tooltip disableFocusListener
                                placement="top"
                                title={ <FormattedMessage id={ 'empty.cart.title' } /> }>
                        { cartButton }
                    </Tooltip>)
                    : cartButton
                }

                <PopoverWrapper
                    openPopup={ isPopupOpened }
                    anchorElement={ anchorElement }
                    closePopoverHandler={ this.closePopover }
                    classes={{
                        popover: classes.cartPopover,
                        content: classes.cartContent
                    }}
                >
                    <MiniCartDrop
                        onMouseEnter={ this.onHoverContentHandler }
                        onMouseLeave={ this.onUnhoverContentHandler }
                    />
                </PopoverWrapper>
            </>
        );
    }
}

export const MiniCartDropDown = withStyles(styles)(MiniCartDropDownComponent);
