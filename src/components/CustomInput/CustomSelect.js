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
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const handleSimple = event => {
    setSimpleSelect(event.target.value);
  };
  const classes = {};
  const { data, name, labelText, record } = props;
  const labelNum = record.length || 0 ;
  
  let menus = data && data.length > 0 ? data.map((alu)=> <MenuItem classes={{root: classes.selectMenuItem, selected: classes.selectMenuItemSelected }} key={alu.id} value={alu.id} >{labelNum == 0 ? alu.name: alu[record[0]] +' '+record[1] }</MenuItem>) :null;
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <FormControl fullWidth className={classes.selectFormControl}>
          <InputLabel
            htmlFor="simple-select"
            className={classes.selectLabel}
          >
            Select {labelText}
          </InputLabel>
          <Select
            MenuProps={{
              className: classes.selectMenu
            }}
            classes={{
              select: classes.select
            }}
            value={props.value}
            onChange={props.onChange}
            inputProps={{
              name: name,
              id: "simple-select"
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