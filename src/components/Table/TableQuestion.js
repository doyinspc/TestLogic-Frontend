import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactHtmlParser from 'react-html-parser'
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from "@material-ui/core/Checkbox";
//import Check from "@material-ui/core/Check";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import InputBase from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import ResetIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import ListQuestion from "./../List/ListQuestion"
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import { registerQuestion, updateQuestion, editQuestion, deleteQuestion, toggleQuestion } from  "../../actions/question";
import { registerAnswer, updateAnswer, editAnswer, deleteAnswer, toggleAnswer } from  "../../actions/answer";
import { registerDistractor, updateDistractor, editDistractor, deleteDistractor, toggleDistractor } from  "../../actions/distractor";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardFooter from "../Card/CardFooter";
import CardBody from "../Card/CardBody";
import { FormHelperText } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = withStyles;

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, instructionID, checkQuestion } = props;
  const tableCellClasses = classnames(classes.tableCell, {
  });

  const [sids, setSids] = React.useState(null);
  const [checks, setChecks] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [questions, setQuestions] = React.useState({});
  const [distractors, setDistractors] = React.useState({});
  const [editanswerrow, setEditanswerrow] = React.useState({});
  const [editquestionrow, setEditquestionrow] = React.useState({});
  const [editdistractorrow, setEditdistractorrow] = React.useState({});


  const editQuestions = (qid) =>{
    let newQR = {...questions};
    newQR[`name${qid}`] = newQR[`name${qid}`] ? false : true;
    setQuestions(newQR);
  }
  const editAnswers = (sid, qid) =>{
    //extract row from questions
    //get all answers
    //pick selected answers
    let an = tableData.filter(alu => alu.id == qid);
    let answ = changeToArray(an[0].answers);
    let answe = answ && Object.keys(answ).length > 0 ? Object.entries(answ).filter(alu => alu[0] == sid)[0] : [] ;
    //save in object states with distinct name 
    let newA = {...answers};
    let newAR = {...editanswerrow};
    newA[`rig${qid}`] =  answe[1];
    newAR[`rig${qid}`] =  sid;
    setAnswers(newA);
    setEditanswerrow(newAR);
  }
  const editDistractors = (sid, qid) =>{
    //extract row from questions
    //get all distractors
    //pick selected distractors
    let an = tableData.filter(alu => alu.id == qid);
    let answ = changeToArray(an[0].distractors);
    let answe = answ && Object.keys(answ).length > 0 ? Object.entries(answ).filter(alu => alu[0] == sid)[0] : [] ;
    //save in object states with distinct name 
    let newD = {...distractors};
    let newDR = {...editdistractorrow};
    newD[`wrg${qid}`] =  answe[1];
    newDR[`wrg${qid}`] =  sid;
    setDistractors(newD);
    setEditdistractorrow(newDR);
  }

  const onchangeQuestion = (e, qid) =>{
    let newQ = {...editquestionrow};
    newQ[`name${qid}`] =  e.target.value;
    setEditquestionrow(newQ);
  }
  const onchangeAnswer = (e, qid) =>{
    let newA = {...answers};
    newA[`rig${qid}`] =  e.target.value;
    setAnswers(newA);
  }
  const onchangeDistractor = (e, qid) =>{
    let newA = {...editanswerrow};
    newA[`wrg${qid}`] =  e.target.value;
    setDistractors(newA);
  }
  const deleteAnswers = (e, qid) =>{
    let res = window.confirm('Are you sure you will not be able to recover deleted answer');
    if(res){
    props.deleteAnswer(e, qid);
    }
  }
  const deleteDistractors = (e, qid) =>{
    let res = window.confirm('Are you sure you will not be able to recover deleted answer');
    if(res){
      props.deleteDistractor(e, qid);
    }
  }
  const clearAnswer = qid =>{
    let newA = {...answers};
    let newAR = {...editanswerrow};
    newA[`rig${qid}`] =  '';
    newAR[`rig${qid}`] =  'nb';
    setAnswers(newA);
    setEditanswerrow(newAR);
  }
  const clearDistractor = qid =>{
    let newD = {...distractors};
    let newDR = {...editdistractorrow};
    newD[`wrg${qid}`] =  '';
    newDR[`wrg${qid}`] =  '';
    setDistractors(newD);
    setEditdistractorrow(newDR);
  }

  const submitQuestion = qid =>{
    let q = editquestionrow[`namenew`];
    if(qid && qid > 0){
        props.registerQuestion({instructionID:qid, question:q}, qid);
    }
  }

  const updateQuestion = qid =>{
    let q = editquestionrow[`name${qid}`];
    if(qid && qid > 0){
        props.updateQuestion({question:q}, qid);
    }
  }

  const updateAnswer = qid =>{
    let ans = answers[`rig${qid}`];
    let rid = editanswerrow[`rig${qid}`];
    if(qid && ans && qid > 0){
      if(rid && rid > 0)
      {
        props.updateAnswer({name:ans}, rid, qid);
      }else{
        props.registerAnswer({questionID:qid, name:ans});
      }
      
    }
  }
  const updateDistractor = qid =>{
    let dis = distractors[`wrg${qid}`];
    let rid = editdistractorrow[`wrg${qid}`];
    if(qid && dis && qid > 0){
      if(rid && rid > 0)
      {
        props.updateDistractor({name:dis}, rid, qid);
      }
      else
      {
        props.registerDistractor({questionID:qid, name:dis});
      }
    }
  }

  // const checkQuestion = value =>{
  //   const currentIndex = checks.indexOf(value);
  //   const newChecked = [...checks];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecks(newChecked);
  //   console.log(checks)
  // }

  const changeToArray = (data) =>{
    let arr = data.split(',');
    let newArr = {};
    arr.map((al)=>{
      let br = al.split(':::');
      newArr[br[0]] = br[1];
    })
    return newArr;
  }

  const changeToList = (id, data, changeToText, status) =>{
    if(data){
    let arr = data.split(',');
    let newArr = {};
    arr.map((al)=>{
      let br = al.split(':::');
      newArr[br[0]] = br[1];
    })
    return changeToText(id, newArr, status);
    }
    else
    {
      return changeToText(id, {}, status);
    }
  }

  const changeToText = (id, data, status) =>{
    let linkz = <ListQuestion 
                    qid ={id}
                    data={Object.entries(data)} 
                    status={status}
                    onEdit={status == 1? editAnswers : editDistractors }
                    onDelete={status == 1? deleteAnswers : deleteDistractors}
                    />
    return linkz;
  }

  let j = 0;
  let ali = tableData && Array.isArray(tableData) && tableData.length > 0 ?
  tableData.map(alu => (
    <Paper className={classes.paper } p={30} >
    <div p={10} >
    <Grid key={alu.id} container >
        <Grid container xs={12}>
        <Grid item xs={10}>
         
          <h5>
          <span>{ questions[`name${alu.id}`] ?  
          <div>
          <Grid container xs={12}>
          <Grid item xs={1}>
          {`${++j}. `}
          </Grid>
          <Grid item xs={9}>
          <InputBase 
              key={`${alu.id}que`}
              id={`${alu.id}que`}
              name={`que${alu.id}`}
              multiline
              className={classes.input}
              onChange={e=>onchangeQuestion(e, alu.id)}
              placeholder="Add Question"
              inputProps={{ 'aria-label': 'add question' }}
              value={editquestionrow[`name${alu.id}`]}
              defaultValue={alu.question}
              margin='dense'
              fullWidth
          />
          </Grid>
          <Grid item xs={2}>
          <IconButton className={classes.iconButton} aria-label="search" onClick={()=>updateQuestion(alu.id)}>
              <SaveIcon />
         </IconButton>
          </Grid>
         
          </Grid>
         </div>:  ReactHtmlParser (`${++j}. `+ alu.question)
          }
          </span>
          </h5>
          </Grid>
        <Grid item xs={2}>
        <IconButton className={classes.iconButton} aria-label="search" onClick={()=>editQuestions(alu.id)}>
              <EditIcon />
        </IconButton>
        <IconButton className={classes.iconButton} aria-label="search" onClick={()=>clearAnswer(alu.id)}>
              <DeleteIcon />
        </IconButton>
        <Checkbox 
            value={alu.id}
            onClick={()=>{checkQuestion(alu.id)}}
            />
        </Grid>
        
        </Grid>
        <Grid container  style ={{ display:'flex', justifyContent:'space-between', fontSize:'15px'}} xs={12} sm={12} md={12} >
        <Grid item xs={12} sm={6} md={6} >
          <Card  >
            <CardHeader>
            <IconButton className={classes.iconButton} aria-label="search" onClick={()=>clearAnswer(alu.id)}>
              <AddIcon />
            </IconButton>
            <InputBase
                    key={`${alu.id}ans`}
                    id={`${alu.id}ans`}
                    name={`rig${alu.id}`}
                    className={classes.input}
                    onChange={e=>onchangeAnswer(e, alu.id)}
                    placeholder="Add Answer"
                    inputProps={{ 'aria-label': 'add answer' }}
                    value={answers[`rig${alu.id}`]}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={()=>updateAnswer(alu.id)}>
              <SaveIcon />
            </IconButton>
            </CardHeader>
            <CardBody >
              { changeToList(alu.id, alu.answers, changeToText, 1)} 
            </CardBody>
          </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} >
          <Card  >
          <CardHeader>
            <IconButton className={classes.iconButton} aria-label="search" onClick={()=>clearDistractor(alu.id)}>
              <AddIcon />
            </IconButton>
          <InputBase
                  key={`${alu.id}dis`}
                  id={`${alu.id}dis`}
                  name={`wrg${alu.id}`}
                  className={classes.input}
                  onChange={e => onchangeDistractor(e, alu.id)}
                  placeholder="Add distractor"
                  inputProps={{ 'aria-label': 'add a distractor' }}
                  value={distractors[`wrg${alu.id}`]}
          />
          <IconButton className={classes.iconButton} aria-label="search" onClick={(e)=>updateDistractor(alu.id)}>
            <SaveIcon />
          </IconButton>
          </CardHeader>
          <CardBody>
            { changeToList(alu.id, alu.distractors, changeToText, 0)}
          </CardBody>
      </Card>
      </Grid>
    </Grid>
    </Grid>
    </div>
    </Paper>
    
  )) : null;

  return (
    <div className="m-10">
      <Grid item xs={12}>
          <IconButton className={classes.iconButton} aria-label="search" onClick={()=>clearDistractor(0)}>
                <AddIcon />
              </IconButton>
            <InputBase
                    key='question'
                    id='question'
                    name='namenew'
                    className={classes.input}
                    onChange={e => onchangeQuestion(e, 'new')}
                    placeholder="Add Question"
                    inputProps={{ 'aria-label': 'add a distractor' }}
                    value={questions[`namenew`]}
            />
              <IconButton className={classes.iconButton} aria-label="search" onClick={(e)=>submitQuestion(instructionID)}>
              <SaveIcon />
          </IconButton>
    </Grid>
         {ali}
     
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

const mapStateToProps = state => ({ 
  question: state.questionReducer
})
export default connect(mapStateToProps, 
  {
    registerQuestion, 
    updateQuestion,
    editQuestion, 
    deleteQuestion, 
    toggleQuestion,
    registerAnswer, 
    updateAnswer,
    editAnswer, 
    deleteAnswer, 
    toggleAnswer,
    registerDistractor, 
    updateDistractor,
    editDistractor, 
    deleteDistractor, 
    toggleDistractor
  })(withStyles(tableStyle)(CustomTable));