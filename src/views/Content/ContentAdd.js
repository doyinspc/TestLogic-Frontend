import React from "react";
import PropTypes from "prop-types";
import { connect }from 'react-redux';
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

import { getContent, editContent, updateContent, registerContent, toggleForm } from  "../../actions/content";
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
      stdate: new Date().toISOString().split('T')[0],
      endate: new Date().toISOString().split('T')[0],
      errors: {}
    };
   
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
      name :  '',
      stdate : new Date().toISOString().split('T')[0],
      endate : new Date().toISOString().split('T')[0]
    })
  }
  reloadData = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : CONTENT
      this.setState({
        theme: this.props.content.theme,
        name :  this.props.content.content.name,
        stdate : new Date(this.props.content.content.stdate).toISOString().split('T')[0],
        endate : new Date(this.props.content.content.endate).toISOString().split('T')[0]
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        theme: this.props.content.theme,
        name :  '',
        stdate : new Date().toISOString().split('T')[0],
        endate : new Date().toISOString().split('T')[0]
      })
    }
    
  }
  componentDidMount = () => {
    if(this.props.isEdit > 0)
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : CONTENT
      this.setState({
        theme: this.props.content.theme,
        name :  this.props.content.content.name,
        stdate : new Date(this.props.content.content.stdate).toISOString().split('T')[0],
        endate : new Date(this.props.content.content.endate).toISOString().split('T')[0]
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        theme: this.props.content.theme,
        name :  '',
        stdate : new Date().toISOString().split('T')[0],
        endate : new Date().toISOString().split('T')[0]
      })
    }
    
  }
  

  componentWillReceiveProps = (nextProps) => {
      if(this.props.content.isEdit !== nextProps.content.isEdit){
      this.setState({
        name :  nextProps.content.content.name,
        stdate : new Date(nextProps.content.content.stdate).toISOString().split('T')[0],
        endate : new Date(nextProps.content.content.endate).toISOString().split('T')[0]
      })
    }
     
  }

  onSubmit = e => {
    e.preventDefault();
    const {theme,  name, stdate, endate } = this.state;
    const content = { theme, name, stdate, endate };
    if(this.props.content.isEdit > 0 )
    {
      this.props.updateContent(content, this.props.content.isEdit); 
    }else
    {
      this.props.registerContent(content); 
    }
  }

  
  render() {
    if(this.props.isEdit > 0){
      this.reloadData()
    }
    const { classes, content }  = this.props;
    const { errors, name, stdate, endate  } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <form onSubmit={this.onSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{ content.isEdit > 0 ? 'Edit' : 'Add'} Content</h4>
                  <p className={classes.cardCategoryWhite}>
                    Start a new content
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Content"
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
                        labelText="Start"
                        id="stdate"
                        type="date"
                        onChange={this.onChange}
                        error={errors.stdate}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: stdate || '',
                          name: "stdate"
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Ends"
                        id="endate"
                        type='date'
                        onChange={this.onChange}
                        error={errors.endate}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: endate || '',
                          name: "endate"
                        }}
                      />
                      
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                  <div>
                  <Button type="submit"  color="primary">{ content.isEdit > 0? 'Update' : 'Submit'}</Button>
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
  content: PropTypes.object,
  name: PropTypes.string,
  stdate: PropTypes.string,
  endate: PropTypes.string
};


const mapStateToProps = state => ({ 
  content: state.contentReducer
})
export default connect(mapStateToProps, {getContent, editContent, updateContent, registerContent, toggleForm})(withStyles(styles)(Form));