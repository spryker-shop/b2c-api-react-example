import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {sendLoginAction, customerRegisterAction} from '../../../actions/Pages/Login';
import {Home, IProps} from '../Home';

import {AppMain} from '../../Common/AppMain';
import {AppHeader} from '../../Common/AppHeader';
import {LoginForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';

import {styles} from './styles/page';

interface LoginPageProps extends WithStyles<typeof styles> {
  dispatch?: Function;
  location?: Location;
  customer?: any;
  isAuth?: boolean;
}

interface LoginPageState {

}

export interface RegisterFormState {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptedTerms: boolean;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  public state: LoginPageState = {

  };

  public componentDidMount() {
    toast.success('Uraaaaaaaaaa');
  }

  public handleSubmitLoginForm = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log('handleSubmitLoginForm submitted');
  }

  public handleSubmitRegisterForm = (data: any): void => {
    this.props.dispatch(customerRegisterAction(data));
  }


  public render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppHeader />
        <AppMain>
          <Grid item
                xs={12}
                container
                direction="row"
                alignItems="flex-start"
                className={classes.container}
          >
            <Grid item xs={12} sm={6}
                  direction="column"
                  container
                  justify="center"
                  alignItems="center">
              <LoginForm action={sendLoginAction} />
            </Grid>
            <div className={classes.divider}></div>
            <Grid item xs={12} sm={6}
                  direction="column"
                  container
                  justify="center"
                  alignItems="center">
              <RegisterForm handleSubmit={this.handleSubmitRegisterForm} />
            </Grid>
          </Grid>
        </AppMain>
      </React.Fragment>
    );
  }
}

const DecoratedClass = withStyles(styles)(LoginPage);

export const ConnectedLogin = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: IProps = state.routing ? state.routing : {};
    const pagesLoginProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        customer: pagesLoginProps && pagesLoginProps.data.customer ? pagesLoginProps.data.customer : ownProps.customer,
        isAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
      }
    );
  }
)(DecoratedClass);
