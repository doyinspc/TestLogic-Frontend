import React from "react";
import PropTypes from "prop-types";
import { connect }from 'react-redux';
import CKEditor from 'ckeditor4-react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui//core/Input";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { getInstruction, editInstruction, updateInstruction, registerInstruction, toggleForm } from  "../../actions/instruction";
import avatar from "assets/img/faces/marc.jpg";

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
      theme: null,
      name: null,
      content:null,
      contenttitle:null,
      contentsource:null,
      errors: {}
    };
   
  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value})
  }

  onEditorChange = ( evt )=>{
    this.setState( {
        content: evt.editor.getData()
    } );
  }

handleChange=( changeEvent )=>{
    this.setState( {
        data: changeEvent.target.value
    } );
}

  handleClose = () => {
    this.props.toggleForm(false);
    this.handleReset();
  }

  handleReset = () => {
    this.setState({
      name :  '',
      content: '',
      contenttitle: '',
      contentsource:''
    })
  }


  reloadData = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : INSTRUCTION
      this.setState({
        theme: this.props.instruction.theme,
        name :  this.props.instruction.instruction.name,
        content :  this.props.instruction.instruction.content,
        contenttitle :  this.props.instruction.instruction.contenttitle,
        contentsource :  this.props.instruction.instruction.contentsource
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        theme: this.props.instruction.theme,
        name :  '',
        content: '',
        contenttitle: '',
        contentsource: ''
      })
    }
    
  }
  componentDidMount = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : INSTRUCTION
      this.setState({
        theme: this.props.instruction.theme,
        name :  this.props.instruction.instruction.name,
        content :  this.props.instruction.instruction.content,
        contenttitle :  this.props.instruction.instruction.contenttitle,
        contentsource :  this.props.instruction.instruction.contentsource
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        theme: this.props.instruction.theme,
        name :  '',
        content :  '',
        contenttitle :  '',
        contentsource:  ''
      })
    }
    
  }
  

  componentWillReceiveProps = (nextProps) => {
      if(this.props.instruction.isEdit !== nextProps.instruction.isEdit){
      this.setState({
        name :  nextProps.instruction.instruction.name,
        content :  nextProps.instruction.instruction.content,
        contenttitle :  nextProps.instruction.instruction.contenttitle,
        contentsource :  nextProps.instruction.instruction.contentsource
      })
    }
     
  }

  onSubmit = e => {
    e.preventDefault();
    const {theme,  name, content, contentsource, contenttitle } = this.state;
    const instruction = { theme, name, content, contentsource, contenttitle };
    if(this.props.instruction.isEdit > 0 )
    {
      this.props.updateInstruction(instruction, this.props.instruction.isEdit); 
    }else
    {
      this.props.registerInstruction(instruction); 
    }
  }

  
  render() {
    if(this.props.isEdit > 0){
      this.reloadData()
    }
    const { classes, instruction }  = this.props;
    const { errors, name, content, contentsource, contenttitle } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <form onSubmit={this.onSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{ instruction.isEdit > 0 ? 'Edit' : 'Add'} Instruction</h4>
                  <p className={classes.cardCategoryWhite}>
                    Start a new instruction
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Instruction"
                        id="name"
                        type="text"
                        onChange={this.onChange}
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: name || '',
                          name: "name"
                        }}
                      />
                      
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Content Title"
                        id="contenttitle"
                        type="text"
                        onChange={this.onChange}
                        error={errors.contenttitle}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          value: contenttitle || '',
                          name: "contenttitle"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Content Source"
                        id="contentsource"
                        type="text"
                        onChange={this.onChange}
                        error={errors.contentsource}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          value: contentsource || '',
                          name: "contentsource"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    {/* <Input
                        labelText="Content"
                        id="content"
                        type="text"
                        onChange={this.onChange}
                        error={errors.content}
                        multiline
                        className={classes.input}
                        placeholder="Add Passage, Essay, Poem etc"
                        inputProps={{ 'aria-label': 'add question' }}
                        value={content}
                        defaultValue={content}
                        margin='dense'
                        rows="10"
                        fullWidth
                      />
                     */}
                    <CKEditor 
                    data={content}
                    onChange={this.onEditorChange}
                    
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
                  <Button type="submit"  color="primary">{ instruction.isEdit > 0? 'Update' : 'Submit'}</Button>
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
  instruction: PropTypes.object,
  name: PropTypes.string,
  contentitle: PropTypes.string,
  content: PropTypes.string
};


const mapStateToProps = state => ({ 
  instruction: state.instructionReducer
})
export default connect(mapStateToProps, {getInstruction, editInstruction, updateInstruction, registerInstruction, toggleForm})(withStyles(styles)(Form));