import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import Cancel from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles =  {
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
    },
    root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: '',
          }
  };

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function CheckboxListSecondary(props) {
  const classes = useStyles;
  const [checked, setChecked] = React.useState([1]);
  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleEdit = (num, status) => {
    if(status === 1){
     // props.editQuestion(num)
    }
    else if(status == 0){
      //props.editQuestion(num)
    }
    
  }
  const handleDelete = (num) => {
   //props.deleteQuestion(num)
  }

  return (
    <List dense className={classes.root} style={{ width: '100%' }}>
      {props.data.map(value => {
        const labelId = `checkbox-list-secondary-label-${value[0]}`;
        return (
            <ListItem key={value} button>
                <ListItemIcon>
                 { props.status == 1 ? <Done style={{color:'teal'}}/> : <Cancel style={{color:'salmon'}}/>}
                </ListItemIcon>
                <ListItemText id={labelId} style={{fontSize:'17px'}} >
                { ReactHtmlParser (value[1])}
                </ListItemText> 
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={()=>props.onEdit(value[0], props.qid )}>
                      <EditIcon style={{color:  props.status == 1 ? 'teal': 'maroon' }}/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={()=>props.onDelete(value[0], props.qid )}>
                      <DeleteIcon style={{color:  props.status == 1 ? 'teal': 'maroon' }} />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
      })}
    </List>
  );
}