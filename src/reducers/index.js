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


export default combineReducers({
    subjectReducer:subject,
    themeReducer:theme,
    topicReducer:topic,
    contentReducer:content,
    objectiveReducer:objective,
    instructionReducer:instruction,
    questionReducer:question,
    answerReducer:answer,  
    distractorReducer:distractor
});