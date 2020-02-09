import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
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
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Report from "@material-ui/icons/BarChart";
import Dashboard from "@material-ui/icons/Dashboard";
import Storage from "@material-ui/icons/Storage";
import Cloud from "@material-ui/icons/Cloud";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CalendarViewDay from "@material-ui/icons/CalendarViewDay";

// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import { editTopic, deleteTopic, toggleTopic, activateTopic, updateTopic } from  "../../actions/topic";



function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  const tableCellClasses = classnames(classes.tableCell, {
    
  });
  const handleClick = (num) => {
     props.editTopic(num)
  }
  const handleDelete = (num) => {
    props.deleteTopic(num)
  }

  const handleToggle= (num, active) => {
    if(active == 1)
    {
      props.updateTopic({active:0}, num);
    }
    else
    {
      props.updateTopic({active:1}, num);
    }
  }
  const activeID= (num) => {
    props.activateTopic(num)
  }

  let j = 0;
  let ali = tableData && Array.isArray(tableData) && tableData.length  > 0 ?
  tableData.map(alu => (
    <TableRow key={alu.id} className={classes.tableRow }>
        <TableCell className={tableCellClasses}>{++j}</TableCell>
        <TableCell className={tableCellClasses}><span style={{color: alu.active != 0 ? 'blue' : 'black'}}>{alu.name}</span></TableCell>

        { props.topic.showActions ?
        <TableCell className={classes.tableActions}>
                <NavLink to={`/admin/Instruction/${alu.id}`} >
                <Tooltip
                  id="tooltip-top"
                  title="Instructions"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton aria-label="Edit" className={classes.tableActionButton}>
                    <CalendarViewDay className={ classes.tableActionButtonIcon + " text-info"  }/>
                  </IconButton>
                </Tooltip>
                </NavLink>
              <NavLink to={`/Term/${alu.id}`}>
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
                  title="Edit Topic"
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
               
              </TableCell>:null}
    </TableRow>
  )) : null;

  return (
    <div className={classes.tableResponsive}>
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
  topic: state.topicReducer
})
export default connect(mapStateToProps, {editTopic, deleteTopic, toggleTopic, activateTopic, updateTopic})(withStyles(tableStyle)(CustomTable));