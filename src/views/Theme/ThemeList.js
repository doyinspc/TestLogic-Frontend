import React from "react";
import { connect }from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/TableTheme.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import ThemeAdd from './ThemeAdd.js';
import ThemeNavbar from '../../components/Navbars/ThemeNavbar.js';
import { getThemes } from '../../actions/theme';
import { getSubjects } from '../../actions/subject';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};



class TableList extends React.Component {

componentDidMount = () =>{
  this.props.getThemes(this.props.id);
}

render(){

  const { classes, theme, subject, subjects, id } = this.props;
  let headArr =  theme.showActions ? ["SN","Theme", "Action"] : ["SN","Theme"];
  let ses = subjects && Array.isArray(subjects) && subjects.length > 0 ? subjects.filter((alu)=> alu.id == id)[0]:{};
  
  return (
    <GridContainer>
      { theme.isForm === true ?
      <GridItem xs={12} sm={12} md={12}><ThemeAdd /></GridItem>: null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader  style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}} color="primary">
            <div className="col-md-5">
            <h4 className={classes.cardTitleWhite}>{ses.name} Themes</h4>
            <p className={classes.cardCategoryWhite}> </p>
            </div>
            <div>
              <ThemeNavbar/>
            </div>
          </CardHeader>
          <CardBody>
            <Table 
                tableHeaderColor="primary" 
                tableHead={headArr}
                tableData={theme.themes}
                />
          </CardBody>
        </Card>
      </GridItem>
  </GridContainer>
  );
}
}

TableList.propTypes = {
  subject: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({ 
    theme: state.themeReducer,
    subject: state.subjectReducer,
    subjects: state.subjectReducer.subjects,
    id : ownProps.match.params.id
})
export default connect(mapStateToProps, { getThemes, getSubjects })(withStyles(styles)(TableList));

