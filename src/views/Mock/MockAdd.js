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

import { getMock, editMock, updateMock, registerMock, toggleForm } from  "../../actions/mock";
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
    const {theme,  name } = this.state;
    const mock = { themeID:theme, name };
    if(this.props.mock.isEdit > 0 )
    {
      this.props.updateMock(mock, this.props.mock.isEdit); 
    }else
    {
      this.props.registerMock(mock); 
    }
  }

  
  render() {
    if(this.props.isEdit > 0){
      this.reloadData()
    }
    const { classes, mock }  = this.props;
    const { errors, name } = this.state;
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
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Mock"
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