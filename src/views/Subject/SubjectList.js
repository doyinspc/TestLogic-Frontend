import React from "react";
import { connect }from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/TableSubject.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import SubjectAdd from './SubjectAdd.js';
import SubjectNavbar from '../../components/Navbars/SubjectNavbar.js';
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
    this.props.getSubjects()
}

render(){

  const { classes, subject } = this.props;
  let headArr =  this.props.subject.showActions ? ["SN","Subject", "Abbrv", "Action"]: ["SN","Subject", "Abbrv."];
  return (
    <GridContainer>
      { subject.isForm === true ?
      <GridItem xs={12} sm={12} md={12}><SubjectAdd  data={subject.subject}/></GridItem>: null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader  style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}} color="primary">
            <div className="col-md-5">
            <h4 className={classes.cardTitleWhite}>Subjects</h4>
            <p className={classes.cardCategoryWhite}>
              Note : a subject should span a year
            </p>
            </div>
            <div>
              <SubjectNavbar/>
            </div>
          </CardHeader>
          <CardBody>
            <Table 
                tableHeaderColor="primary" 
                tableHead={headArr}
                tableData={subject.subjects}
                />
          </CardBody>
        </Card>
      </GridItem>
  </GridContainer>
  );
}
}

const mapStateToProps = state => ({ 
    subject: state.subjectReducer
})
export default connect(mapStateToProps, { getSubjects })(withStyles(styles)(TableList));

