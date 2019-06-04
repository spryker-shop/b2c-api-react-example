import * as React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { CatalogSearch } from '@containers/CatalogSearch';
import { PopoverWrapper } from '@components/PopoverWrapper';
import { SearchIcon, CrossIcon } from './icons';
import { ClickEvent } from '@interfaces/common';
import { IUserDropNavigationProps as Props, IUserDropNavigationState as State } from './types';
import { styles } from './styles';
import { resolutionChecker } from '@helpers/common';

@(withRouter as Function)
class CatalogSearchDropComponent extends React.Component<Props, State> {
    public readonly state: State = {
        anchorElement: null
    };

    protected iconButton: React.RefObject<HTMLDivElement> = React.createRef();

    public componentDidUpdate = (prevProps: Props): void => {
        if (this.props.location !== prevProps.location) {
            this.closePopover();
        }
    };

    protected openPopover = ({ currentTarget }: ClickEvent): void => this.setState({ anchorElement: currentTarget });

    protected closePopover = (): void => this.setState({ anchorElement: null });

    public render(): JSX.Element {
        const { anchorElement } = this.state;
        const { classes } = this.props;
        const anchorReference = resolutionChecker(window.innerWidth, 'lg') ? 'anchorPosition' : 'anchorEl';

        return (
            <>
                <IconButton
                    buttonRef={ this.iconButton }
                    aria-label="person"
                    onClick={ this.openPopover }
                    className={ classes.iconButton }
                >
                    <span className={ classes.icon }>
                        <SearchIcon />
                    </span>
                </IconButton>

                <PopoverWrapper
                    anchorElement={ anchorElement }
                    anchorReference={ anchorReference }
                    hideBackdrop={ false }
                    closePopoverHandler={ this.closePopover }
                    classes={{
                        backdrop: classes.backdrop,
                        content: classes.content,
                        customCoordinates: classes.overlayCustomCoordinates,
                        contentCustomCoordinates: classes.contentCustomCoordinates
                    }}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right'
                    }}
                >
                    <div className={ classes.searchLayout }>
                        <IconButton
                            aria-label="close"
                            onClick={ this.closePopover }
                            className={ classes.searchCloseButton }
                        >
                            <CrossIcon />
                        </IconButton>
                        <CatalogSearch id={ '2' } extraInputClassName={ classes.searchComponent } />
                    </div>
                </PopoverWrapper>

            </>
        );
    }
}

export const CatalogSearchDrop = withStyles(styles)(CatalogSearchDropComponent);
