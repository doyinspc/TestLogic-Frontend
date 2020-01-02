import React from "react";
import { connect }from 'react-redux';
import PropTypes from "prop-types";
import ReactHtmlParser from 'react-html-parser'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/TableQuestion.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import QuestionAdd from './QuestionAdd.js';
import QuestionNavbar from '../../components/Navbars/QuestionNavbar.js';
import { getQuestions } from '../../actions/question';
import { getInstructions } from '../../actions/instruction';

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
  constructor(props) {
    super(props);
    this.state = {
      checks:[]
    };
   
  }

componentDidMount = () =>{
  this.props.getQuestions(this.props.id);
}

checkQuestion = value => {
  const currentIndex = this.state.checks.indexOf(value);
  const newChecked = [...this.state.checks];

  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }
  this.setState({checks:newChecked});
}
render(){
  const { checks } = this.state;
  const { classes, question, instruction, instructions, themes, topics, subjects, id } = this.props;
  let headAr =  question.showActions ? ["SN","Question", "Action"]: ["SN","Question"];
  let inst = instructions && Array.isArray(instructions) && instructions.length > 0 ? instructions.filter((alu)=> alu.id == id)[0]:{};
 
  let top = topics && Array.isArray(topics) && topics.length > 0 ? topics.filter((alu)=> alu.id == inst.topicID)[0]:{};
  let the = themes && Array.isArray(themes) && themes.length > 0 ? themes.filter((alu)=> alu.id == top.themeID)[0]:{};
  let sub = subjects && Array.isArray(subjects) && subjects.length > 0 ? subjects.filter((alu)=> alu.id == the.subjectID)[0]:{};
  
  return (
    <GridContainer>
      { question.isForm === true ?
      <GridItem xs={12} sm={12} md={12}><QuestionAdd instructionID = {inst.id} rows={checks}/></GridItem>: null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader  style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}} color="primary">
            <div className="col-md-5">
            <p className={classes.cardCategoryWhite}>
              {sub.name+' | '+the.name+' | '+top.name}
            </p>
            <h4 className={classes.cardTitleWhite}>{inst.name || ''}</h4>
            </div>
            <div>
              <QuestionNavbar id={top.id}/>
            </div>
          </CardHeader>
          <CardBody>
            <div>
              <div>
              {inst.contenttitle || ''}
              </div>
               { ReactHtmlParser (inst.content)}
            </div>
            <Table 
                tableHeaderColor="primary" 
                tableHead={''}
                tableData={question.questions}
                instructionID = {inst.id}
                checkQuestion ={this.checkQuestion}
                />
          </CardBody>
        </Card>
      </GridItem>
  </GridContainer>
  );
}
}

TableList.propTypes = {
  instruction: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({ 
    question: state.questionReducer,
    instruction: state.instructionReducer,
    instructions: state.instructionReducer.instructions,
    topics: state.topicReducer.topics,
    themes: state.themeReducer.themes,
    subjects: state.subjectReducer.subjects,
    id : ownProps.match.params.id
})
export default connect(mapStateToProps, { getQuestions, getInstructions })(withStyles(styles)(TableList));

