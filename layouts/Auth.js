import { makeStyles } from '@mui/styles';
import { Container, Paper, CssBaseline, Box, Typography, Link as MuiLink} from '@mui/material';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import useAuth from 'hooks/useAuth'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#fafafa'
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))

export default function Auth({children, width = 'xs'}) {
    useAuth({
        redirectTo: '/', redirectIfFound: true
    })
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Container component="main" maxWidth={width}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    {/* start: Content */}
                    {children}
                    {/* end: Content */}
                    {/* start: Copyright */}
                    <Box mt={5}>
                        <Typography variant="body2" color="textSecondary" align="center">
                            <FormattedMessage id='copyright'/>
                            {' '}
                            <Link href="/" passHref>
                                <MuiLink color="inherit" href="/">
                                    <FormattedMessage id='app.name'/>
                                </MuiLink>
                            </Link>
                        </Typography>
                    </Box>
                    {/* end: Copyright */}
                </Paper>
            </Container>
        </div>
    )
}