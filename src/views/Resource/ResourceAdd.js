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
import {Label} from "reactstrap";

import { getResource, editResource, updateResource, registerResource, toggleForm } from  "../../actions/resource";
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
      topic: props.id,
      data1: null,
      data2:null,
      sources:null,
      author:null,
      title:null,
      description: null,
      types: null,
      errors: {}
    };
   
  }

  onChange = e => {
    this.setState({[e.target.name] : e.target.value})
  }

  onData2Change = ( evt )=>{
    this.setState( {
        data2: evt.editor.getData()
    } );
  }
  onData1Change = ( evt )=>{
    this.setState( {
        data1: evt.editor.getData()
    } );
  }

  handleClose = () => {
    this.props.toggleForm(false);
    this.handleReset();
  }

  handleReset = () => {
    this.setState({
      title:  '',
      data1: '',
      data2: '',
      author:'',
      description:'',
      types:'',
      sources:'',
    })
  }


  reloadData = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : RESOURCE
      this.setState({
        title: this.props.resource.title,
        data1 :  this.props.resource.resource.data1,
        data2 :  this.props.resource.resource.data2,
        author :  this.props.resource.resource.author,
        description :  this.props.resource.resource.description,
        types :  this.props.resource.resource.types,
        sources :  this.props.resource.resource.sources,
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        title: '',
        data1: '',
        data2: '',
        author:'',
        description:'',
        types:'',
        sources:'',
        })
    }
    
  }
  componentDidMount = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : RESOURCE
      this.setState({
        title: this.props.resource.title,
        data1 :  this.props.resource.resource.data1,
        data2 :  this.props.resource.resource.data2,
        author :  this.props.resource.resource.author,
        description :  this.props.resource.resource.description,
        types :  this.props.resource.resource.types,
        sources :  this.props.resource.resource.sources,
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        title: '',
        data1: '',
        data2: '',
        author:'',
        description:'',
        types:'',
        sources:'',
      })
    }
    
  }
  

  componentWillReceiveProps = (nextProps) => {
      if(this.props.resource.isEdit !== nextProps.resource.isEdit){
      this.setState({
        title: nextProps.resource.resource.title,
        data1 :  nextProps.resource.resource.data1,
        data2 :  nextProps.resource.resource.data2,
        author :  nextProps.resource.resource.author,
        description :  nextProps.resource.resource.description,
        types :  nextProps.resource.resource.types,
        sources :  nextProps.resource.resource.sources,
      })
    }
     
  }

  onSubmit = e => {
    e.preventDefault();
    const {topic, title, data1, data2, author, description, types, sources } = this.state;
    const resource = { topicID:topic, title, data1, data2, author, description, types, sources};
    if(this.props.resource.isEdit > 0 )
    {
      this.props.updateResource(resource, this.props.resource.isEdit); 
    }else
    {
      this.props.registerResource(resource); 
    }
  }

  
  render() {
    if(this.props.isEdit > 0){
      this.reloadData();
    }
    const { classes, resource }  = this.props;
    const { errors, title, data1, data2, author, description, types, sources } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <form onSubmit={this.onSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{ resource.isEdit > 0 ? 'Edit' : 'Add'} Resource</h4>
                  <p className={classes.cardCategoryWhite}>
                    Start a new resource
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Resource Title"
                        id="title"
                        type="text"
                        onChange={this.onChange}
                        error={errors.title}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: title || '',
                          name: "title"
                        }}
                      />
                      
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Resource Author"
                        id="author"
                        type="text"
                        onChange={this.onChange}
                        error={errors.author}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          value: author || '',
                          name: "author"
                        }}
                      />
                    </GridItem>
                    </GridContainer>

                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Resource Source"
                        id="sources"
                        type="text"
                        onChange={this.onChange}
                        error={errors.sources}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          value: sources || '',
                          name: "sources"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="Resource Type"
                        id="types"
                        type="text"
                        onChange={this.onChange}
                        error={errors.types}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          value: types || '',
                          name: "types"
                        }}
                      />
                    </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                        labelText="Resource Description"
                        id="description"
                        type="text"
                        onChange={this.onChange}
                        error={errors.description}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: false,
                          value: description || '',
                          name: "description"
                        }}
                      />
                    </GridItem>
                    </GridContainer>

                    <GridContainer>
                    <GridItem xs={12} sm={12} md={12}><Label >Data 1</Label></GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <CKEditor 
                    id='data1'
                    name='data1'
                    data={data1}
                    onChange={this.onData1Change}
                    mathJaxLib={'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML'}
                    config={{
                      extraPlugins: ['mathjax']
                    }}
                     />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}><Label >Data 2</Label></GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    <CKEditor 
                    id='data2'
                    name='data2'
                    data={data1}
                    data={data2}
                    onChange={this.onData2Change}
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
                  <Button type="submit"  color="primary">{ resource.isEdit > 0? 'Update' : 'Submit'}</Button>
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
  resource: PropTypes.object,
  name: PropTypes.string,
  contentitle: PropTypes.string,
  content: PropTypes.string
};


const mapStateToProps = state => ({ 
  resource: state.resourceReducer
})
export default connect(mapStateToProps, {getResource, editResource, updateResource, registerResource, toggleForm})(withStyles(styles)(Form));