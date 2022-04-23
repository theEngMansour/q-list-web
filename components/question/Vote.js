import  React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowUpward from '@mui/icons-material/ExpandLess';
import ArrowDownward from '@mui/icons-material/ExpandMore';
import { useIntl } from 'react-intl';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
  
const useStyles = makeStyles((theme) => ({
    arrowUp: {
        padding: 5,
    },
    arrowDown: {
        padding: 5,
    },
}));



export default function Vote({votesTotal, vote, auth}){

    const classes = useStyles()
    const {formatMessage} = useIntl()
    // Alert
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState(null);
    const [transition, setTransition] = React.useState(undefined);

    React.useEffect(() => {
        setTimeout(() => setOpen(false), 3000)
    }, [open])
    
    const arrowUpward = (Transition) => () => {
        if(auth) {
            setMessage(formatMessage({
                id: 'auth.login.vote.update'
            }))
        } else {
            setMessage(formatMessage({
                id: 'auth.login.vote'
            }))
        }
        setTransition(() => Transition);
        vote(1)
        setOpen(true);
    };

    const arrowDownward = (Transition) => () => {
        if(auth) {
            setMessage(formatMessage({
                id: 'auth.login.vote.update'
            }))
        } else {
            setMessage(formatMessage({
                id: 'auth.login.vote'
            }))
        }
        setTransition(() => Transition);
        vote(-1)
        setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };


    return (
        <Box display='flex' flexDirection='column'>
            <IconButton onClick={arrowUpward(TransitionUp)} className={classes.arrowUp}>
                <ArrowUpward sx={{color: 'green'}} />
            </IconButton>
            {auth}
            <Typography variant="p" align="center">{votesTotal || 0}</Typography>
            <IconButton onClick={arrowDownward(TransitionUp)} className={classes.arrowDown}>
                <ArrowDownward sx={{color: 'red'}} />
            </IconButton>

            {/* Alert */}
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                message={message}
                key={transition ? transition.name : ''}
            />
        </Box>
    );
}

/*
when need send function into commpents
export default function Vote({vote}){
<Vote vote={type => {})}/>
    vote(type)
--------------------------------------
<Vote vote={(type, a) => {})}/>
export default function Vote({vote}){
    vote('valie type','value a')
*/

/*

import { Typography, IconButton, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowUpward from '@mui/icons-material/ExpandLess';
import ArrowDownward from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
    arrowUp: {
        padding: 5,
    },
    arrowDown: {
        padding: 5,
    },
}));


/*
when need send function into commpents
export default function Vote({vote}){
<Vote vote={type => {})}/>
    vote(type)
--------------------------------------
<Vote vote={(type, a) => {})}/>
export default function Vote({vote}){
    vote('valie type','value a')

export default function Vote({votesTotal, vote}){
    //vote = (type) => {}
    const classes = useStyles()
    return (
        <Box display='flex' flexDirection='column'>
            <IconButton onClick={() => vote(1)} className={classes.arrowUp}>
                <ArrowUpward sx={{color: 'green'}} />
            </IconButton>
            <Typography variant="p" align="center">{votesTotal || 0}</Typography>
            <IconButton onClick={() => vote(-1)} className={classes.arrowDown}>
                <ArrowDownward sx={{color: 'red'}} />
            </IconButton>
        </Box>
    );
}

*/
