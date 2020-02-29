import { combineReducers } from 'redux';
import subject from'./subject';
import theme from'./theme';
import topic from'./topic';
import content from'./content';
import objective from'./objective';
import instruction from'./instruction';
import question from'./question';
import answer from'./answer';
import distractor from'./distractor';
import mock from'./mock';
import mockscore from'./mockscore';
import test from'./test';
import score from'./score';
import resource from './resource';

export default combineReducers({
    subjectReducer:subject,
    themeReducer:theme,
    topicReducer:topic,
    contentReducer:content,
    objectiveReducer:objective,
    instructionReducer:instruction,
    questionReducer:question,
    answerReducer:answer,  
    distractorReducer:distractor,
    mockReducer:mock,  
    mockscoreReducer:mockscore,  
    testReducer:test,  
    scoreReducer:score, 
    resourceReducer:resource 
});