import { Container, Paper, Box, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from './partials/Header';
import Footer from './partials/Footer';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    container: {
        flexGrow: 1,
        display: 'flex',
    
    },
    title: {
        padding: theme.spacing(2),
        background: theme.palette.background.title
    },
    content: {
        flexGrow: 1,
        borderBottom: 'none',
        padding: "20px"
    }
}))

export default function Main({children, title}) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Header/>
            <Container maxWidth="lg" component="main" className={classes.container}>
                <Paper square elevation={0} variant="outlined" className={classes.content}>
                    {
                        title &&
                        <>
                            <Box className={classes.title}>
                                <Typography variant="h5">
                                    {title}
                                </Typography>
                            </Box>
                            <Divider/>
                        </>
                    }
                    {children}
                </Paper>
            </Container>
            <br></br>
            <Footer/>
        </div>
    )
}
