import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withRouter, NavLink } from 'react-router-dom';
import { withStyles, Badge, IconButton } from '@material-ui/core';
import { pathCartPage } from '@constants/routes';
import { PopoverWrapper } from '@components/PopoverWrapper';
import { MiniCartDrop } from './MiniCartDrop';
import { CartIcon } from './icons';
import { IMiniCartDropDownProps as Props, IMiniCartDropDownState as State } from './types';
import { styles } from './styles';

@connect
@(withRouter as Function)
class MiniCartDropDownComponent extends React.Component<Props, State> {
    public readonly state: State = {
        isCartNotificationOpen: true,
        isPopupOpened: false,
        isContentHovered: false,
        isButtonHovered: false
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const isSameLocation = this.props.location.pathname !== prevProps.location.pathname;
        const isCartEmpty = this.props.cartProductsQuantity === 0 && prevProps.cartProductsQuantity > 0;
        const isQuantityChanged = this.props.cartProductsQuantity > prevProps.cartProductsQuantity;

        if (isSameLocation || isCartEmpty) {
            this.setState({ isPopupOpened: false });
        }

        if (isQuantityChanged) {
            this.handleOpenCartNotification();
        }
    };

    protected closePopover = (): void => {
        const { isButtonHovered, isContentHovered } = this.state;

        if (!isButtonHovered && !isContentHovered) {
            this.setState({ isPopupOpened: false });
        }
    };

    protected onHoverButtonHandler = (): void => {
        const { isTouch } = this.props;

        if (!isTouch) {
            const { cartItemsQuantity } = this.props;

            this.setState({
                isPopupOpened: cartItemsQuantity !== 0,
                isButtonHovered: true
            });
        }
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
        const { isPopupOpened } = this.state;
        const { classes, cartItemsQuantity, isTouch } = this.props;

        const cartButton = (
            <IconButton
                aria-label="cart"
                color="inherit"
                component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathCartPage } /> }
                onMouseEnter={ this.onHoverButtonHandler }
                onMouseLeave={ this.onUnhoverButtonHandler }
                className={`${classes.iconButton} ${isPopupOpened ? classes.isPopupOpened : ''}`}
            >
                <Badge
                    badgeContent={ cartItemsQuantity }
                    classes={{
                        colorPrimary: classes.badge,
                        badge: cartItemsQuantity === 0 && classes.hideBadge
                    }}
                    color="primary"
                >
                    <span className={ classes.icon }>
                        <CartIcon />
                    </span>
                </Badge>
            </IconButton>
        );

        if (cartItemsQuantity === 0) {
            return (
                <div className={`${classes.wrapper} ${!isTouch ? classes.wrapperHoverable : ''}`}>
                    { cartButton }
                    <span className={ classes.tooltip }>
                        <FormattedMessage id={ 'empty.cart.title' } />
                    </span>
                </div>
            );
        }

        return (
            <div className={ classes.wrapper }>
                { cartButton }

                <PopoverWrapper
                    openPopup={ isPopupOpened }
                    closePopoverHandler={ this.closePopover }
                    classes={{ popover: classes.cartPopover }}
                >
                    <MiniCartDrop
                        onMouseEnter={ this.onHoverContentHandler }
                        onMouseLeave={ this.onUnhoverContentHandler }
                    />
                </PopoverWrapper>
            </div>
        );
    }
}

export const MiniCartDropDown = withStyles(styles)(MiniCartDropDownComponent);
