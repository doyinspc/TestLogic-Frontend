import React from "react";
import { connect }from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/TableResource.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import ResourceAdd from './ResourceAdd.js';
import ResourceNavbar from '../../components/Navbars/ResourceNavbar.js';
import { getResources } from '../../actions/resource';
import { getTopics } from '../../actions/topic';

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
  this.props.getResources(this.props.id);
}

render(){

  const { classes, resource, topic, topics, themes, subjects, id } = this.props;
  let headArr =  resource.showActions ? ["SN","Resource", "Action"]: ["SN","Resource"];
  let top = topics && Array.isArray(topics) && topics.length > 0 ? topics.filter((alu)=> alu.id == id)[0]: {name:'None'};
  let the = themes && Array.isArray(themes) && themes.length > 0 && top ? themes.filter((alu)=> alu.id == top.themeID)[0]:  {name:'None'};
  let sub = subjects && Array.isArray(subjects) && subjects.length > 0 && the ? subjects.filter((alu)=> alu.id == the.subjectID)[0]: {name:'None'};
  
  return (
    <GridContainer>
      { resource.isForm === true ?
      <GridItem xs={12} sm={12} md={12}><ResourceAdd id={id} /></GridItem>: null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader  style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}} color="primary">
            <div className="col-md-5">
            <h4 className={classes.cardTitleWhite}>{top ? top.name: '' || ''}</h4>
            <p className={classes.cardCategoryWhite}>{sub ? sub.name: ''  +' | '+ the  ? the.name: ''}</p>
            </div>
            <div>
              <ResourceNavbar id={top? top.themeID : ''}/>
            </div>
          </CardHeader>
          <CardBody>
            <Table 
                tableHeaderColor="primary" 
                tableHead={headArr}
                tableData={resource.resources}
                />
          </CardBody>
        </Card>
      </GridItem>
  </GridContainer>
  );
}
}

TableList.propTypes = {
  topic: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({ 
    resource: state.resourceReducer,
    topic: state.topicReducer,
    topics: state.topicReducer.topics,
    themes: state.themeReducer.themes,
    subjects: state.subjectReducer.subjects,
    id : ownProps.match.params.id
})
export default connect(mapStateToProps, { getResources, getTopics })(withStyles(styles)(TableList));

