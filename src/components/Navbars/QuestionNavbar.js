import React from "react";
import { NavLink, Redirect }from "react-router-dom";
import { connect }from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Add from "@material-ui/icons/AddToQueueTwoTone";
import Settings from "@material-ui/icons/Settings";
import Backward from "@material-ui/icons/ArrowLeft";
// core components
import Button from "../CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { toggleForm, hideActions } from '../../actions/question';

class HeaderLinks extends React.Component {
  state = {
    isEdit:false,
    open: false,
    profilePopupOpen: false,
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open, profilePopupOpen: false }));
  };

  handleToggleProfile = () => {
    this.setState(state => ({ profilePopupOpen: !state.profilePopupOpen, open: false }));
  };

  toggleAdd = (num) => {
    this.setState({ isEdit: !num });
    this.props.toggleForm(!num);
  };

  toggleReturn = () => {
    return <Redirect to='/admin/Session'/>;
  };

  toggleAction = () => {
    this.props.hideActions();
  };

  

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false, profilePopupOpen: false });
  };


  render() {
    const { classes } = this.props;
    const { open, isEdit } = this.state;
    return (
      <div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
          onClick={e => this.toggleAdd(isEdit)}
        >
          <Add className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Add</p>
          </Hidden>
        </Button>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Actions"
          className={classes.buttonLink}
          onClick={e => this.toggleAction(isEdit)}
        >
          <Settings className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Action</p>
          </Hidden>
        </Button>

        <NavLink to={`/admin/Instruction/${this.props.id}`}>
        <Button
          color={"white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Backward"
          className={classes.buttonLink}
        >
          <Backward className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Back</p>
          </Hidden>
        </Button>
        </NavLink>
        </div>
    );
  }
}

const mapStateToProps = state => ({ 
    datas: state.assessmentReducer
})
export default connect(mapStateToProps, { toggleForm, hideActions })(withStyles(headerLinksStyle)(HeaderLinks));

