import React from "react";
import PropTypes from "prop-types";
import { connect }from 'react-redux';
import axios from 'axios';
import { API_PATH } from './../../actions/types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomSelect from "components/CustomInput/CustomSelect";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { getQuestion, editQuestion, updateQuestion, registerQuestion, moveQuestion, toggleForm } from  "../../actions/question";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


class Form extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rows:[],
      values:{},
      name:{},
      errors: {}
    }; 
  }


  onChange = e => {
    let fil = {
      'subject':'theme',
      'theme':'topic',
      'topic':'instruction'
    }

    let newV = {...this.state.values};
    let newN = {...this.state.name};
    newV[e.target.name] = e.target.value;
    this.setState({values : newV});
    let paths = `${API_PATH}/${fil[e.target.name]}/cat/${e.target.value}` ;
      axios.get(paths, {})
      .then(res => {
        newN[fil[e.target.name]] = res.data;
        this.setState({name : newN});
      })
      .catch(err => {
        console.log(err)
    })
  }

  handleClose = () => {
    this.props.toggleForm(false);
    this.handleReset();
  }
 
  componentDidMount = () => {
   this.setState({rows:this.props.rows}) 
   let newS = {...this.state.values};
   newS['subject'] = this.props.subjects;
   this.setState({name : newS})
  }
  
  onSubmit = e => {
    e.preventDefault();
    const newInstruction = this.state.values.instruction;
    const currentInstruction = this.props.instructionID;
    if(newInstruction && this.state.rows.length > 0)
    {
      this.props.moveQuestion({currentInstruction: currentInstruction, instructionID:newInstruction, questionID:this.state.rows });
    }   
  }

  
  render() {
    const { classes, question, rows, instructionID }  = this.props;
    const { errors, name, values } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <form onSubmit={this.onSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Move Question{` ( ${rows.length} )`}</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={3} md={3}>
                      <CustomSelect
                        labelText="Subject"
                        id="subject"
                        record = {[ 'name', '']}
                        name = 'subject'
                        data = {name.subject}
                        value = {values.subject}
                        onChange = {this.onChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <CustomSelect
                        labelText="theme"
                        id="theme"
                        record = {['name', '']}
                        name = 'theme'
                        data = {name.theme}
                        value = {values.theme}
                        onChange = {this.onChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <CustomSelect
                        labelText="topic"
                        id="topic"
                        record = {['name', '']}
                        name = 'topic'
                        data = {name.topic}
                        value = {values.topic}
                        onChange = {this.onChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                      <CustomSelect
                        labelText="instruction"
                        id="instruction"
                        record = {['name', '']}
                        name = 'instruction'
                        data = {name.instruction}
                        value = {values.instruction}
                        onChange = {this.onChange}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                  <div>
                  <Button type="submit"  color="primary">Move</Button>

                  <Button type="button"  color="primary">Copy</Button>
                  </div>
                  <div>
                  <Button type="button" color="info" onClick={this.handleClose}>Close</Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object,
  name: PropTypes.string
};


const mapStateToProps = (state, ownProps) => ({ 
  question: state.questionReducer,
  subjects: state.subjectReducer.subjects,
  instructionID: ownProps.instructionID
})
export default connect(mapStateToProps, {getQuestion, editQuestion, moveQuestion, updateQuestion, registerQuestion, toggleForm})(withStyles(styles)(Form));