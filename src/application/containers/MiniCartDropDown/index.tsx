import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { withStyles, Badge, Tooltip } from '@material-ui/core';
import { pathCartPage } from '@constants/routes';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { BreakpointsSM } from '@constants/breakpoints';
import { MiniCartDrop } from './MiniCartDrop';
import { CartIcon } from './icons';
import IconButton from '@material-ui/core/IconButton';
import { ClickEvent } from '@interfaces/common';
import { IMiniCartDropDownProps as Props, IMiniCartDropDownState as State } from './types';
import { styles } from './styles';

@(withRouter as Function)
@connect
export class MiniCartDropDownComponent extends React.Component<Props, State> {
    public readonly state: State = {
        anchorElement: null,
        isCartNotificationOpen: true
    };

    public componentDidUpdate = (prevProps: Props): void => {
        if (this.props.location !== prevProps.location) {
            this.closePopover();
        }

        if (this.props.cartProductsQuantity > prevProps.cartProductsQuantity) {
            this.handleOpenCartNotification();
        }

        if (this.props.cartProductsQuantity === 0 && prevProps.cartProductsQuantity > 0) {
            this.closePopover();
        }
    }

    protected openPopover = ({currentTarget}: ClickEvent): void => {
        const {cartItemsQuantity} = this.props;

        if (window.innerWidth < BreakpointsSM) {
            if (cartItemsQuantity !== 0) {
                this.props.history.push(pathCartPage);
            }
        } else {
            this.setState(() => ({anchorElement: cartItemsQuantity !== 0 ? currentTarget : null}));
        }
    };
    protected closePopover = (): void => this.setState(() => ({anchorElement: null}));

    protected handleOpenCartNotification = (): void => {
        this.setState(() => ({isCartNotificationOpen: true}));
    };

    public render(): JSX.Element {
        const {anchorElement} = this.state;
        const {classes, cartItemsQuantity, popoverPosLeft, popoverPosTop} = this.props;

        const cartButton = (
            <IconButton aria-label="cart" onClick={this.openPopover} color="inherit">
                <Badge
                    badgeContent={cartItemsQuantity}
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
            <div>
                {cartItemsQuantity === 0
                    ? (<Tooltip disableFocusListener
                                placement="top"
                                title={<FormattedMessage id={'empty.cart.title'} />}>
                        {cartButton}
                    </Tooltip>)
                    : cartButton
                }

                <PopoverWrapper
                    popoverPosLeft={popoverPosLeft}
                    popoverPosTop={popoverPosTop}
                    anchorElement={anchorElement}
                    closePopoverHandler={this.closePopover}
                    extraContentClassName={classes.cartContent}
                    extraHelperClassName={classes.popoverTriangle}
                >
                    <MiniCartDrop />
                </PopoverWrapper>
            </div>
        );
    }
}

export const MiniCartDropDown = withStyles(styles)(MiniCartDropDownComponent);
