import * as React from 'react';
import { connect } from './connect';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { pathCustomerPage, pathCustomerProfilePage, pathLoginPage } from '@constants/routes';
import { UserDrop } from './UserDrop';
import { PopoverWrapper } from '@application/components/PopoverWrapper';
import { BreakpointsSM } from '@constants/breakpoints';
import { logoutSetTimeoutTime } from '@constants/customer';
import { UserIcon } from './icons';
import { ClickEvent } from '@interfaces/common';
import { IUserDropNavigationProps as Props, IUserDropNavigationState as State } from './types';
import { styles } from './styles';

@connect
@(withRouter as Function)
class UserDropNavigationComponent extends React.Component<Props, State> {
    public readonly state: State = {
        isPopupOpened: false,
        isContentHovered: false,
        isButtonHovered: false
    };

    public componentDidUpdate = (prevProps: Props): void => {
        const isSameLocation = this.props.location.pathname !== prevProps.location.pathname;

        if (isSameLocation) {
            this.setState({ isPopupOpened: false });
        }
    };

    protected openPopover = (): void => {
        if (window.innerWidth < BreakpointsSM) {
            if (this.props.isUserLoggedIn) {
                this.props.history.push(pathCustomerProfilePage);
            } else {
                this.props.history.push(pathLoginPage);
            }
        }
    };

    protected closePopover = (): void => {
        const { isButtonHovered, isContentHovered } = this.state;

        if (!isButtonHovered && !isContentHovered) {
            this.setState({ isPopupOpened: false });
        }
    };

    protected onHoverButtonHandler = (): void => {
        this.setState({ isPopupOpened: true, isButtonHovered: true });
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

    protected handleLogout = (event: ClickEvent): void => {
        event.preventDefault();
        if (this.props.location.pathname.includes(pathCustomerPage)) {
            this.props.logout();
        } else {
            this.props.history.push(pathCustomerPage);
            setTimeout(this.props.logout, logoutSetTimeoutTime);
        }
    };

    public render(): JSX.Element {
        const { isPopupOpened } = this.state;
        const { classes, isUserLoggedIn } = this.props;

        return (
            <div className={ classes.wrapper }>
                <IconButton
                    aria-label="person"
                    onClick={ this.openPopover }
                    onMouseEnter={ this.onHoverButtonHandler }
                    onMouseLeave={ this.onUnhoverButtonHandler }
                    className={`${classes.iconButton} ${isPopupOpened ? classes.isPopupOpened : '' }`}
                >
                    <UserIcon />
                </IconButton>

                <PopoverWrapper
                    openPopup={ isPopupOpened }
                    closePopoverHandler={ this.closePopover }
                    classes={{ popover: classes.userPopover }}
                >
                    <UserDrop
                        onLogoutClick={ this.handleLogout }
                        isUserLoggedIn={ isUserLoggedIn }
                        onMouseEnter={ this.onHoverContentHandler }
                        onMouseLeave={ this.onUnhoverContentHandler }
                    />
                </PopoverWrapper>

            </div>
        );
    }
}

export const UserDropNavigation = withStyles(styles)(UserDropNavigationComponent);
