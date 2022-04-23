import prisma from 'lib/prisma';
import Head from 'next/head';
import Router from 'next/router';
import useAuth from 'hooks/useAuth'
import moment from 'utiles/moment';
import { useEffect, useState, useContext } from 'react';
import { MainLayout } from 'layouts';
import { Content, Tags, Vote, Skeleton } from 'components/question';
import { Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography, Divider, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { usePost, vote } from 'hooks/usePost';
import { StateContext } from './../StateContext';

const useStyles = makeStyles((theme) => ({
    answersTitle: {
        background: theme.palette.background.title,
        padding: theme.spacing(2)
    },
    answerForm: {
        '& > *': {
            margin: theme.spacing(0, 0, 2, 0),
        },
        background: theme.palette.background.title
    }
}))

export default function Show({params}) {
    // params: from function getStaticProps

    const [alert, setAlert] = useState('')
    const [loading, setLoading] = useState(true)
    // Auth
    const { user } = useAuth()

    // useContext Reload page when update Answer
    const {reloading, setReloading} = useContext(StateContext)

    useEffect(() => {
        if (!params?.id) Router.push('/404')
        //Update page when Added new answer
        const id = Router.query.id;
        if(reloading){ 
            Router.push(`/question/${id}`)
            setTimeout(() => {
                setReloading(false)
            }, 1000);
        }
        //Skeleton
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [params, reloading])
    

    const handlarVote = async (type) => {
        //vote(postId, answerId, type)
        if(!user) return
        await vote(params?.id, '', type)
        await setReloading(true)
    }

    const voteCount = (votes) => {
        const vote = votes.map(v => v.type) 
        let total = 0;
        for (let item of vote) total += item;
        return total;
    };

    return (
        <MainLayout title={params.title}>
            <Head>
                <title>{params?.title}</title>
            </Head> 
            <Box display='flex' m={2}>
                {
                    <Vote votesTotal={voteCount(params.votePost)} auth={user? true : false} vote={(type) => handlarVote(type)}/>
                }
                <Content html={params?.content}/>
            </Box>
            <QuestionFooter user={params?.user} tags={params?.tags}/>
            <Skeleton loading={loading}>
                <Answers items={params.answers} /> 
                {
                 user && <AnswerForm/>
                }
            </Skeleton>
        </MainLayout>
    )
    
}


// Tags and User for Questions
function QuestionFooter({user, tags}) {
    return (
        <Box display="flex" m={2}>
            <Box flexGrow={1} display="flex">
                <Avatar>{user?.name?.charAt(0)}</Avatar>
                <Box marginY={'auto'} marginX={1}>
                    {user?.name}
                </Box>
            </Box>
            <Box marginY={'auto'} display="flex">
                <Tags items={tags}/>
            </Box>
        </Box>
    )
}



// Commponets Answers
function Answer({data: {id, content, createdAt, user}, voteCount, vote}) {
    return (
        <Box p={2}>
            <Box display="flex">
               <Vote votesTotal={voteCount} vote={vote}/>
               <Content html={content}/>
            </Box>
            <Box display="flex" marginTop={2}>
                <Avatar>{user.name.charAt(0)}</Avatar>
                <Box marginY={'auto'} marginX={1} flexGrow={1}>
                    {user.name}
                </Box>
                <Typography variant="caption" display="block" marginY={'auto'}>
                    {moment(createdAt).fromNow()} 
                </Typography>
            </Box>
        </Box>
    )
}


// Show according Data
function Answers({items}) {
    const classes = useStyles()

    // useContext Reload page when update Answer
    const {reloading, setReloading} = useContext(StateContext)

    // Auth
    const { user } = useAuth()
    
    const handlarVote = async (answerId, type) => {
        //vote(postId, answerId, type)
        if(!user) return
        await vote('', answerId, type)
        await setReloading(true)
    }

    const voteCount = (votes) => {
        const vote = votes.map(v => v.type) 
        let total = 0;
        for (let item of vote) total += item;
        return total;
    };

    return (
        <>
            <Box className={classes.answersTitle}>
                <Typography variant='h6'>
                    <FormattedMessage id='post.answers'/>
                </Typography>
            </Box>
            <Divider/>
            {
                items?.map(answer => {
                    return <>
                        <Answer data={answer} voteCount={voteCount(answer.voteAnswer)} vote={(type) => handlarVote(answer.id, type)}/>
                        <Divider/>
                    </>
                }) 
            }
        </>
    )
}


// Add new Answer
function AnswerForm() {
    const classes = useStyles()
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const changeContenthandler = (event) => {
        setContent(event.target.value);
    }
    
    const {id} = Router.query;
    const { reloading, setReloading } = useContext(StateContext)

    //Submit
    const onSubmitAnswer = async (event) => {
        event.preventDefault()
        //Loading
        setLoading(true)
        try {
            if(!content) return setLoading(false)
            await usePost(id, content)
        } catch (e) {
            setError(true)
        }
        setReloading(true)
        setContent('')
        // Resat the Value
        setTimeout(() => {
            setLoading(false)
            setReloading(false)
        }, 4000);
    }


    return (
        <Box p={2} className={classes.answerForm}>
            <form onSubmit={onSubmitAnswer}>
                <Box>
                    {   
                        !loading &&
                     
                        <input id="m" className="border-2 border-blue-900 w-2/5 h-28 mb-3 p-2 text-lg" placeholder='إدخل الجواب' value={content} onChange={changeContenthandler}></input>
                    }
                       {/* <Editor onChange={setContent} content={content} /> */}
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    >
                    <FormattedMessage id='btn.share'/>
                </Button>
            </form>
        </Box>
    )
}

// Server 
export async function getStaticPaths() {
    const items = await prisma.post.findMany()
    const paths = items.map(e => ({params: {id: e.id.toString()}}))
    return {
        paths,
        fallback: true // Reload any id new for post added
    }
}

export async function getStaticProps({params}) {
    const item = await prisma.post.findUnique({
        where: {
            id: Number(params.id),
        },
        include: {
            user: true,
            votePost: true,
            tags: {
                select: { 
                    tag: true 
                }
            },
            answers: {
                select: {
                    user: {
                        select: { name: true }
                    },
                    voteAnswer: true,
                    id: true,
                    content: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: 'asc'
                }
            }
        },         

    })
    return {
        props: {
            params: JSON.parse(JSON.stringify(item))
        }
    }
}