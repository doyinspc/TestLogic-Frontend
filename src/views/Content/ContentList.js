import React from "react";
import { connect }from 'react-redux';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/TableContent.js";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import ContentAdd from './ContentAdd.js';
import ContentNavbar from '../../components/Navbars/ContentNavbar.js';
import { getContents } from '../../actions/content';
import { getThemes } from '../../actions/theme';

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
  this.props.getThemes();
  this.props.getContents(this.props.id);
}

render(){

  const { classes, content, theme, themes, id } = this.props;
  let headArr =  content.showActions ? ["SN","Content", "Starts", "Ends", "Action"]: ["SN","Content", "Starts", "Ends"];
  let ses = themes && themes.length > 0 ? themes.filter((alu)=> alu.id == id)[0]:{};
  
  return (
    <GridContainer>
      { content.isForm === true ?
      <GridItem xs={12} sm={12} md={12}><ContentAdd /></GridItem>: null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader  style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}} color="primary">
            <div className="col-md-5">
            <h4 className={classes.cardTitleWhite}>{ses.name} Theme</h4>
            <p className={classes.cardCategoryWhite}>
              {new Date(ses.stdate).toDateString() + ' to ' + new Date(ses.endate).toDateString() }
            </p>
            </div>
            <div>
              <ContentNavbar/>
            </div>
          </CardHeader>
          <CardBody>
            <Table 
                tableHeaderColor="primary" 
                tableHead={headArr}
                tableData={content.contents}
                />
          </CardBody>
        </Card>
      </GridItem>
  </GridContainer>
  );
}
}

TableList.propTypes = {
  theme: PropTypes.object.isRequired
};
const mapStateToProps = (state, ownProps) => ({ 
    content: state.contentReducer,
    theme: state.themeReducer,
    themes: state.themeReducer.themes,
    id : ownProps.match.params.id
})
export default connect(mapStateToProps, { getContents, getThemes })(withStyles(styles)(TableList));

