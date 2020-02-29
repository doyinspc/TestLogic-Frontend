import React from "react";
import PropTypes from "prop-types";
import { connect }from 'react-redux';
import CKEditor from 'ckeditor4-react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { getMock, editMock, updateMock, registerMock, toggleForm } from  "../../actions/mock";
import avatar from "assets/img/faces/marc.jpg";
import { Label } from "reactstrap";

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
      subject: null,
      exam_title: null,
      exam_date: null,
      exam_objective: null,
      exam_info: null,
      errors: {}
    };
   
  }

  onInfoChange = ( evt )=>{
    this.setState( {
        content: evt.exam_info.getData()
    } );
  }
  onObjectiveChange = ( evt )=>{
    this.setState( {
        content: evt.exam_objective.getData()
    } );
  }
  onChange = e => {
    this.setState({[e.target.name] : e.target.value})
  }
  handleClose = () => {
    this.props.toggleForm(false);
    this.handleReset();
  }
  handleReset = () => {
    this.setState({
      name :  ''
    })
  }
  reloadData = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : MOCK
      this.setState({
        theme: this.props.mock.theme,
        name :  this.props.mock.mock.name
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        theme: this.props.mock.theme,
        name :  ''
      })
    }
    
  }
  componentDidMount = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : MOCK
      this.setState({
        theme: this.props.mock.theme,
        name :  this.props.mock.mock.name
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        theme: this.props.mock.theme,
        name :  ''
      })
    }
    
  }
  componentWillReceiveProps = (nextProps) => {
      if(this.props.mock.isEdit !== nextProps.mock.isEdit){
      this.setState({
        name :  nextProps.mock.mock.name
      })
    }
     
  }
  onSubmit = e => {
    e.preventDefault();
    const {subject, exam_title,  exam_date, exam_info, exam_objective } = this.state;
    const mock = { subjectID:subject, exam_title, exam_date, exam_info, exam_objective };
    if(this.props.mock.isEdit > 0 )
    {
      this.props.updateMock(mock, this.props.mock.isEdit); 
    }else
    {
      this.props.registerMock(mock); 
    }
  }

  
  render() {
    if(this.props.isEdit > 0)
    {
      this.reloadData()
    }
    const { classes, mock }  = this.props;
    const { errors, exam_title, exam_objective, exam_date, exam_info } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <form onSubmit={this.onSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{ mock.isEdit > 0 ? 'Edit' : 'Add'} Mock</h4>
                  <p className={classes.cardCategoryWhite}>
                    New mock
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Mock Title"
                        id="exam_title"
                        type="text"
                        onChange={this.onChange}
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: exam_title || '',
                          name: "exam_title"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Exam Date"
                        id="exam_date"
                        type="datetime"
                        onChange={this.onChange}
                        error={errors.exam_date}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: exam_date || '',
                          name: "exam_date",
                          type: 'datetime'
                        }}
                      />
                    </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}><Label >Exam Objective</Label></GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <CKEditor 
                    data={exam_objective}
                    onChange={this.onObjectiveChange}
                    mathJaxLib={'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML'}
                    config={{
                      extraPlugins: ['mathjax']
                    }}
                     />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={12}><Label >Exam Full Details</Label></GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <CKEditor 
                    data={exam_info}
                    name='Full Info.'
                    onChange={this.onObjectiveChange}
                    mathJaxLib={'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML'}
                    config={{
                      extraPlugins: ['mathjax']
                    }}
                     />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                  <div>
                  <Button type="submit"  color="primary">{ mock.isEdit > 0? 'Update' : 'Submit'}</Button>
                  </div>
                  <div>
                  <Button type="reset" color="info" onClick={this.handleReset}>Reset</Button>
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
  mock: PropTypes.object,
  name: PropTypes.string
};


const mapStateToProps = state => ({ 
  mock: state.mockReducer
})
export default connect(mapStateToProps, {getMock, editMock, updateMock, registerMock, toggleForm})(withStyles(styles)(Form));