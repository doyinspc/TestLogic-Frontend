import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomSelect from "components/CustomInput/CustomSelect";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Move from "@material-ui/icons/Adjust";
import Close from "@material-ui/icons/Close";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Report from "@material-ui/icons/BarChart";
import Dashboard from "@material-ui/icons/Dashboard";
import Storage from "@material-ui/icons/Storage";
import Cloud from "@material-ui/icons/Cloud";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CalendarViewDay from "@material-ui/icons/CalendarViewDay";
import axios from 'axios';
import { API_PATH } from './../../actions/types';
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import {
  getResourcesList,
  editResource, 
  deleteResource, 
  toggleResource, 
  updateResource, 
  activateResource, 
  groupResource,
  moveResource 
} from  "../../actions/resource";

import { getThemesList } from  "../../actions/theme";
import { getTopicsList, updateTopic } from  "../../actions/topic";
import { Grid } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function CustomTable({ ...props }) {
  
  const { classes, tableHead, tableData, tableHeaderColor, subject } = props;
  
  const [open, setOpen] = React.useState(false);
  const [moveID, setMoveID] = React.useState(null);
  const [subjectName, setsubjectName] = React.useState({});
  const [themeName, setthemeName] = React.useState({});
  const [topicName, settopicName] = React.useState({});
  const [resourceName, setResourceName] = React.useState({});
  const [themessList, setThemessList] = React.useState([]);
  const [topicssList, setTopicssList] = React.useState([]);
  const [resourcessList, setResourcessList] = React.useState([]);
  const [selectedResource, setSelectedResource] = React.useState([]);

  const tableCellClasses = classnames(classes.tableCell, {
    
  });

 const updateThemesList = (e) =>{
    let a = e.target.value;
    setsubjectName(a);
    let paths = `${API_PATH}/theme/cat/${a}` ;
      axios.get(paths, {})
      .then(res => {
        setThemessList(res.data);
      })
      .catch(err => {
        console.log(err)
    })
  }
const updateTopicsList = (e) =>{
  let a = e.target.value;
  setthemeName(a);
  let paths = `${API_PATH}/topic/cat/${a}` ;
    axios.get(paths, {})
    .then(res => {
      setTopicssList(res.data);
    })
    .catch(err => {
      console.log(err)
  })
  }
const updateResourcesList = (e) =>{
  let a = e.target.value;
  settopicName(a);
  let paths = `${API_PATH}/resource/cat/${a}` ;
    axios.get(paths, {})
    .then(res => {
      setResourcessList(res.data);
    })
    .catch(err => {
      console.log(err)
  })
  }
  const updateResourcesSelect = (e) =>{
    let a = e.target.value;
    setResourceName(a);
    setSelectedResource(a);
    }
  const handleOpen = (num) => {
    setMoveID(num);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (num) => {
     props.editResource(num)
  }
  const handleDelete = (num) => {
    props.deleteResource(num)
  }
  const handleMove = () => {
    if(moveID && topicName && topicName > 0){
      props.moveResource(moveID, topicName);
    }
  }
  const handleShift = () => {
    if(moveID && topicName && topicName > 0){
      props.updateResource({topicID:topicName}, moveID);
    }
  }
  const handleToggle= (num, active) => {
    if(active == 1)
    {
      props.updateResource({active:0}, num);
    }
    else
    {
      props.updateResource({active:1}, num);
    }
  }

  const handleGroup= (resourceID, num) => {
      props.groupResource(resourceID, num);
  }

  const activeID= (num) => {
    props.activateResource(num)
  }

  let j = 0;
  let ali = tableData && Array.isArray(tableData) && tableData.length > 0 ?
  tableData.map(alu => (
    <TableRow key={alu.id} className={classes.tableRow }>
        <TableCell className={tableCellClasses}>{++j}</TableCell>
        <TableCell className={tableCellClasses}>
          <span style={{color: alu.active != 0 ? 'blue' : 'black'}}>{alu.name}</span>
          <div>{alu.contenttitle}
          </div>
          <div dangerouslySetInnerHTML={ { __html: alu.content} }></div>
          <div style={{fontSize:9, float:'right'}}>{alu.contentsource}</div>
        </TableCell>
        { props.resourcex.showActions ?
        <TableCell className={classes.tableActions}>
        
                <NavLink to={`/admin/Question/${alu.id}`}>
                <Tooltip
                  id="tooltip-top"
                  title="Terms"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Edit" className={classes.tableActionButton}>
                    <CalendarViewDay className={ classes.tableActionButtonIcon + " text-info"  }/>
                  </IconButton>
                </Tooltip>
                </NavLink>
                <span onClick={() => handleOpen(alu.id)}>
                <Tooltip
                  id="tooltip-top"
                  title="Move Questions"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton  aria-label="Move" className={classes.tableActionButton}>
                    <Move className={ classes.tableActionButtonIcon + " " + classes.edit}/>
                  </IconButton>
                </Tooltip>
                </span>
              <NavLink to={`/Question/${alu.id}`}>
                <Tooltip
                  id="tooltip-top"
                  title="Report"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Report" className={classes.tableActionButton}>
                    <Report className={ classes.tableActionButtonIcon + " text-info"  }/>
                  </IconButton>
                </Tooltip>
                </NavLink>
                
                <span onClick={() => handleClick(alu.id)}>
                <Tooltip
                  id="tooltip-top"
                  title="Edit Resource"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton  aria-label="Edit" className={classes.tableActionButton}>
                    <Edit className={ classes.tableActionButtonIcon + " " + classes.edit}/>
                  </IconButton>
                </Tooltip>
                </span>
                <span onClick={() => handleDelete(alu.id)}>
                <Tooltip
                  id="tooltip-top-start"
                  title="Remove"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip>
                </span>
                <span onClick={() => handleToggle(alu.id, alu.active)}>
                <Tooltip
                  id="tooltip-top-start"
                  title="Activate/Deactivate"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Close"
                    className={classes.tableActionButton}
                  >
                    { alu.active != 0 ? <LockOpen className={classes.tableActionButtonIcon + " " + classes.close} />:
                    <Lock className={classes.tableActionButtonIcon + " " + classes.close} />}
                  </IconButton>
                </Tooltip>
                </span>
                <NavLink to={`/Term/${alu.id}`}>
                <Tooltip
                  id="tooltip-top"
                  title="Download"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Edit" className={classes.tableActionButton}>
                    <Storage className={ classes.tableActionButtonIcon + " text-info"  }/>
                  </IconButton>
                </Tooltip>
                </NavLink>
                <NavLink to={`/Term/${alu.id}`}>
                <Tooltip
                  id="tooltip-top"
                  title="Cloud Storage"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Edit" className={classes.tableActionButton}>
                    <Cloud className={ classes.tableActionButtonIcon + " text-info"  }/>
                  </IconButton>
                </Tooltip>
                </NavLink>
                <NavLink to={`/Term/${alu.id}`}>
                <Tooltip
                  id="tooltip-top"
                  title="Cloud Download"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Edit" className={classes.tableActionButton}>
                    <CloudDownload className={ classes.tableActionButtonIcon + " text-info"  }/>
                  </IconButton>
                </Tooltip>
                </NavLink>
              </TableCell>:null}
    </TableRow>
  )) : null;
 
  let  inst = moveID ? props.resourcex.resources.filter((row)=>row.id == moveID)[0]:{};
  return (
    <div className={classes.tableResponsive}>
     { open ?
      <CardBody>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h3>{inst.name}</h3>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
        <CustomSelect
        labelText="Subject"
        id="subject"
        record = {[ 'name', '']}
        name = 'subject'
        data = {props.subject.subjects}
        value = {subjectName}
        onChange = {updateThemesList}
      />
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <CustomSelect
        labelText="Themes"
        id="theme"
        record = {[ 'name', '']}
        name = 'theme'
        data = {themessList}
        value = {themeName}
        onChange = {updateTopicsList}
      />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <CustomSelect
        labelText="Topics"
        id="topic"
        record = {[ 'name', '']}
        name = 'topic'
        data = {topicssList}
        value = {topicName}
        onChange = {updateResourcesList}
      />
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <CustomSelect
        labelText="Resources"
        id="resource"
        record = {[ 'name', '']}
        name = 'resource'
        data = {resourcessList}
        value = {resourceName}
        onChange = {updateResourcesSelect}
      />
      </GridItem>
      </GridContainer>
      <CardFooter style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                  <div>
                  <Button type="button" onClick={handleMove} color="primary">{'Move Questions'}</Button>
                  <Button type="button" onClick={handleShift} color="primary">{'Move Resource & Questions'}</Button>
                  </div>
                  <div>
                  <Button type="button" color="info" onClick={handleClose}>Close</Button>
                  </div>
                </CardFooter>
      </CardBody>
     : null}

      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
         {ali}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

const mapStateToProps = state => ({ 
  resourcex: state.resourceReducer,
  topicx: state.topicReducer,
  themex: state.themeReducer,
  subject: state.subjectReducer
})
export default connect(mapStateToProps, {
  editResource, 
  deleteResource, 
  toggleResource, 
  updateResource,  
  activateResource, 
  groupResource,
  moveResource,
  getResourcesList,
  getThemesList,
  getTopicsList,
  updateTopic
})(withStyles(tableStyle)(CustomTable));