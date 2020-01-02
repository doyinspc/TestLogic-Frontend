import React from 'react';

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridContainer from "./../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";

// import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
//import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";
// const useStyles = makeStyles(styles);
const useStyles = '';//makeStyles(customInputStyle);

export default function Example(props){
  const [multipleSelect, setMultipleSelect] = React.useState([]);
  const handleMultiple = event => {
    setMultipleSelect(event.target.value);
  };
  const classes = {};
  const { data, name, labelText } = props;
  let menus = data && data.length > 0 ? data.map((alu)=> <MenuItem classes={{root: classes.selectMenuItem, selected: classes.selectMenuItemSelectedMultiple }} key={alu.id} value={alu.id} 
  >{alu.name}</MenuItem>) : null ;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <FormControl fullWidth className={classes.selectFormControl}>
          <InputLabel
            htmlFor="multiple-select"
            className={classes.selectLabel}
          >
            Select {labelText}
          </InputLabel>
          <Select
            multiple
            value={props.value}
            onChange={props.onChange}
            MenuProps={{
              className: classes.selectMenu,
              classes: { paper: classes.selectPaper }
            }}
            classes={{ select: classes.select }}
            inputProps={{
              name: name,
              id: "multiple-select"
            }}
          >
            <MenuItem
              disabled
              classes={{
                root: classes.selectMenuItem
              }}
            >
              Select {labelText}
            </MenuItem>
            { menus }
          </Select>
        </FormControl>
      </GridItem>
    </GridContainer>
  );
            }