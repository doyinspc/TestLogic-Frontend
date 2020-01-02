import React from "react";
import { connect }from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/TableInstruction.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import InstructionAdd from './InstructionAdd.js';
import InstructionNavbar from '../../components/Navbars/InstructionNavbar.js';
import { getInstructions } from '../../actions/instruction';
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
  this.props.getInstructions(this.props.id);
}

render(){

  const { classes, instruction, topic, topics, themes, subjects, id } = this.props;
  let headArr =  instruction.showActions ? ["SN","Instruction", "Action"]: ["SN","Instruction"];
  let top = topics && Array.isArray(topics) && topics.length > 0 ? topics.filter((alu)=> alu.id == id)[0]:{};
  let the = themes && Array.isArray(themes) && themes.length > 0 ? themes.filter((alu)=> alu.id == top.themeID)[0]:{};
  let sub = subjects && Array.isArray(subjects) && subjects.length > 0 ? subjects.filter((alu)=> alu.id == the.subjectID)[0]:{};
  
  return (
    <GridContainer>
      { instruction.isForm === true ?
      <GridItem xs={12} sm={12} md={12}><InstructionAdd id={id} /></GridItem>: null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader  style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}} color="primary">
            <div className="col-md-5">
            <h4 className={classes.cardTitleWhite}>{top.name || ''}</h4>
            <p className={classes.cardCategoryWhite}>
              {sub.name+' | '+the.name}
            </p>
            </div>
            <div>
              <InstructionNavbar id={top.themeID}/>
            </div>
          </CardHeader>
          <CardBody>
            <Table 
                tableHeaderColor="primary" 
                tableHead={headArr}
                tableData={instruction.instructions}
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
    instruction: state.instructionReducer,
    topic: state.topicReducer,
    topics: state.topicReducer.topics,
    themes: state.themeReducer.themes,
    subjects: state.subjectReducer.subjects,
    id : ownProps.match.params.id
})
export default connect(mapStateToProps, { getInstructions, getTopics })(withStyles(styles)(TableList));

