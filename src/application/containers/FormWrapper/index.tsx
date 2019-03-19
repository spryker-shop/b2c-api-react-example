import * as React from 'react';
import {
    withStyles,
    Grid,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    IFormWrapperProps as Props,
    IFormWrapperState as State
} from './types';
import { styles } from './styles';

export class FormWrapperBase extends React.Component<Props, State> {
    public readonly state: State = {
        expanded: false,
    };

    public componentDidUpdate = (prevProps: Props): void => {
        if (!prevProps.isDisabled && this.props.isDisabled) {
            this.setState({expanded: false});
        }
    };

    protected handleShowing = (event: React.MouseEvent<{}>): void => {
        if (this.props.isDisabled) {
            return;
        }
        this.setState((prevState: State) => ({
            expanded: !prevState.expanded,
        }));
    };

    public render(): JSX.Element {
        const {classes, title, isDisabled, children} = this.props;
        const {expanded} = this.state;

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <ExpansionPanel
                        disabled={isDisabled}
                        classes={{
                            root: classes.panelRoot,
                            expanded: classes.panelExpanded,
                        }}
                        expanded={expanded}
                    >
                        <ExpansionPanelSummary
                            onClick={this.handleShowing}
                            expandIcon={<ExpandMoreIcon/>}
                            classes={{
                                expandIcon: classes.icon,
                                root: classes.panelSummaryRoot,
                                content: classes.panelSummaryContent,
                                expanded: classes.panelSummaryExpanded,
                            }}
                        >
                            <Typography className={classes.title} component="h3">{title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            classes={{root: classes.panelDetailRoot}}
                        >
                            <Grid container>
                                <Grid item xs={12} className={classes.formOuter}>
                                    {children}
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </Grid>
            </Grid>
        );
    }
}

export const FormWrapper = withStyles(styles)(FormWrapperBase);
