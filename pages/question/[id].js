import prisma from 'lib/prisma';
import Head from 'next/head';
import Router from 'next/router';
import useAuth from 'hooks/useAuth'
import moment from 'utiles/moment';
import usePost from 'hooks/usePost'
import { useEffect, useState, useContext } from 'react';
import { MainLayout } from 'layouts';
import { Content, Tags, Vote, Skeleton } from 'components/question';
import { Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography, Divider, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useSWRConfig } from 'swr';
import { vote} from 'hooks/usePost'
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
    const [alert, setAlert] = useState('')
    const [loading, setLoading] = useState(true)
    // Auth
    const { user } = useAuth()

    // useContext Reload page when update Answer
    const {reloading, setReloading} = useContext(StateContext)

    // Hook get data
    const {data: post, answer} = usePost(params?.id)
    const {mutate} = useSWRConfig()

    useEffect(() => {
        if (!params?.id) Router.push('/404')
        mutate(`/api/post/${params?.id}`)
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

    const voteCount = (votes=[]) => {
        const vote = votes.map(v => v.type) 
        let total = 0;
        for (let item of vote) total += item;
        return total;
    };

    return (
        <MainLayout title={post?.item?.title}>
            <Head>
                <title>{post?.item?.title}</title>
            </Head> 
            <Box display='flex' m={2}>
                {
                    <Vote votesTotal={voteCount(post?.item?.votePost)} auth={user? true : false} vote={(type) => handlarVote(type)}/>
                }
                <Content html={post?.item?.content}/>
            </Box>
            <Skeleton loading={loading}>
        
            </Skeleton>
        </MainLayout>
    )
}



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
        }
    })
    return {
        props: {
            params: JSON.parse(JSON.stringify(item))
        }
    }
}