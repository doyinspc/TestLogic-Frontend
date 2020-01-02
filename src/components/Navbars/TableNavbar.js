import React from "react";
import classNames from "classnames";
import { connect }from 'react-redux';
import { NavLink } from "react-router-dom";
import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "../CustomInput/CustomInput.jsx";
import Button from "../CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";
import { getDatasCat, toggleForm } from '../../actions/data';


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

  handleClose = (event, num) => {
    this.props.getDatasCat(event)
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
        <div className={classes.searchWrapper}>
          <CustomInput style={{ color:'white'}}
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              color:"white",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
          onClick={e => this.toggleAdd(isEdit)}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
        <div className={classes.manager}>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.buttonLink}
          >
            <Notifications className={classes.icons} />
            <span className={classes.notifications}>5</span>
            <Hidden mdUp implementation="css">
              <p onClick={this.handleClick} className={classes.linkText}>
                Notification
              </p>
            </Hidden>
          </Button>
          <Poppers
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className={
              classNames({ [classes.popperClose]: !open }) +
              " " +
              classes.pooperNav
            }
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={e => this.handleClose(1)}
                        className={classes.dropdownItem}
                      >
                        Classes
                      </MenuItem>
                      <MenuItem
                        onClick={e => this.handleClose(4)}
                        className={classes.dropdownItem}
                      >
                        Subjects
                      </MenuItem>
                      <MenuItem
                        onClick={e=>this.handleClose(5)}
                        className={classes.dropdownItem}
                      >
                        Periods
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another Notification
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleClose}
                        className={classes.dropdownItem}
                      >
                        Another One
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
       </div>
    );
  }
}

const mapStateToProps = state => ({ 
    datas: state.datasReducer
})
export default connect(mapStateToProps, { getDatasCat, toggleForm })(withStyles(headerLinksStyle)(HeaderLinks));

