import React from "react";
import { connect }from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/TableMock.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import MockAdd from './MockAdd.js';
import MockNavbar from '../../components/Navbars/MockNavbar.js';
import { getMocks } from '../../actions/mock';
import { getThemes } from '../../actions/theme';

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
  this.props.getMocks(this.props.id);
}

render(){

  const { classes, mock, theme, themes, subjects, id } = this.props;
 
  let headArr =  mock.showActions ? ["SN","Mock", "Action"]: ["SN","Mock"];
  let the = themes && Array.isArray(themes) && themes.length > 0 ? themes.filter((alu)=> alu.id == id)[0]:{};
  let ses = subjects && Array.isArray(subjects) && subjects.length > 0 ? subjects.filter((alu)=> alu.id == id)[0]:{};
  return (
    <GridContainer>
      { mock.isForm === true ?
      <GridItem xs={12} sm={12} md={12}><MockAdd /></GridItem>: null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader  style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}} color="primary">
            <div className="col-md-5">
            <p className={classes.cardCategoryWhite}>{ses.name || 'None'}</p>
            <h4 className={classes.cardTitleWhite}>{the.name || 'None'} Mocks</h4>
            
            </div>
            <div>
              <MockNavbar id={the.subjectID}/>
            </div>
          </CardHeader>
          <CardBody>
            <Table 
                tableHeaderColor="primary" 
                tableHead={headArr}
                tableData={mock.mocks}
                />
          </CardBody>
        </Card>
      </GridItem>
  </GridContainer>
  );
}
}

TableList.propTypes = {
  mock: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({ 
    mock: state.mockReducer,
    theme: state.themeReducer,
    themes: state.themeReducer.themes,
    subjects: state.subjectReducer.subjects,
    id : ownProps.match.params.id
})
export default connect(mapStateToProps, { getMocks, getThemes })(withStyles(styles)(TableList));

