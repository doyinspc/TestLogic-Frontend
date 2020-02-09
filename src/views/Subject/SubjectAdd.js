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

import { getSubject, editSubject, updateSubject, registerSubject, toggleForm } from  "../../actions/subject";
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
      name: null,
      abbrv: null,
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
      abbrv: null
    })
  }

  componentDidMount = (nextProps) => {
    if(this.props.isEdit > 0 )
    {
      //EDIT LOAD ROW TO BE EDITED FROM PROPS : SUBJECT
      this.setState({
        name :  this.props.subject.subject.name,
        abbrv:  this.props.subject.subject.abbrv,
      })
    }else
    {
      //ADD CLEAR RECORD TO BLANK
      this.setState({
        name :  '',
        abbrv: null
      })
    }
    
  }
  

  componentWillReceiveProps = (nextProps) => {
      if(this.props.subject.isEdit && this.props.subject.isEdit !== nextProps.subject.isEdit){
      this.setState({
        name : nextProps.subject.subject.name,
        abbrv: nextProps.subject.subject.abbrv
      })
    }
     
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, abbrv } = this.state;
    const subject = { name, abbrv };
    if(this.props.subject.isEdit > 0 )
    {
      this.props.updateSubject(subject, this.props.subject.isEdit); 
    }else
    {
      this.props.registerSubject(subject); 
    }
  }

  
  render() {
    const { classes, subject }  = this.props;
    const { errors, name, abbrv  } = this.state;
    
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <form onSubmit={this.onSubmit}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{ subject.isEdit > 0 ? 'Edit' : 'Add'} Subject</h4>
                  <p className={classes.cardCategoryWhite}>
                    Start a new subject
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Subject"
                        id="subject"
                        type="text"
                        onChange={this.onChange}
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: name || '',
                          name: "name",
                          defaultValue: this.props.data.name
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Abbreviation"
                        id="abbrv"
                        type="text"
                        onChange={this.onChange}
                        error={errors.name}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          required: true,
                          value: abbrv || '',
                          name: "abbrv"
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                  <div>
                  <Button type="submit"  color="primary">{ subject.isEdit > 0? 'Update' : 'Submit'}</Button>
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
  subject: PropTypes.object,
  name: PropTypes.string,
  stdate: PropTypes.string,
  endate: PropTypes.string
};


const mapStateToProps = state => ({ 
  subject: state.subjectReducer
})
export default connect(mapStateToProps, {getSubject, editSubject, updateSubject, registerSubject, toggleForm})(withStyles(styles)(Form));