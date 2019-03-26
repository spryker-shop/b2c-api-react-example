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
        anchorElement: null,
        isPopupOpened: false,
        isContentHovered: false,
        isButtonHovered: false
    };

    protected iconButton: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidUpdate = (prevProps: Props): void => {
        const isSameLocation = this.props.location.pathname !== prevProps.location.pathname;

        if (isSameLocation) {
            this.setState({ anchorElement: null, isPopupOpened: false });
        }
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void => {
        if (window.innerWidth < BreakpointsSM) {
            if (this.props.isUserLoggedIn) {
                this.props.history.push(pathCustomerProfilePage);
            } else {
                this.props.history.push(pathLoginPage);
            }
        } else {
            this.setState({ anchorElement: currentTarget });
        }
    };

    protected closePopover = (): void => {
        const { isButtonHovered, isContentHovered } = this.state;

        if (!isButtonHovered && !isContentHovered) {
            this.setState({ anchorElement: null, isPopupOpened: false });
        }
    };

    protected onHoverButtonHandler = ({ currentTarget }: ClickEvent): void => {
        this.setState({ anchorElement: currentTarget, isPopupOpened: true, isButtonHovered: true });
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
        const { anchorElement, isPopupOpened } = this.state;
        const { classes, isUserLoggedIn } = this.props;

        return (
            <>
                <IconButton
                    buttonRef={ this.iconButton }
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
                    anchorElement={ anchorElement }
                    closePopoverHandler={ this.closePopover }
                    classes={{
                        popover: classes.userPopover,
                        content: classes.userContent
                    }}
                >
                    <UserDrop
                        onLogoutClick={ this.handleLogout }
                        isUserLoggedIn={ isUserLoggedIn }
                        onMouseEnter={ this.onHoverContentHandler }
                        onMouseLeave={ this.onUnhoverContentHandler }
                    />
                </PopoverWrapper>

            </>
        );
    }
}

export const UserDropNavigation = withStyles(styles)(UserDropNavigationComponent);
