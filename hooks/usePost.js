import useSWR from 'swr';
import axios from 'axios';
import Router from 'next/router';

const fetcher = url => axios.get(url).then(({ data }) => data?.data)

//Show posts in Index.js
export function usePosts({ page = 1, sort = 'asc'}) {
    const url = `/api/post?page=${page}&sort=${sort}`
    const { data, error } = useSWR(url, fetcher)
    return {
        data: data,
        error,
        loading: !data && !error,
    }
}
export default function usePost(id) {
    const url = `/api/post/${id}`
    const { data, error, mutate } = useSWR(url, fetcher)

    const answer = async (id, content) => {
        const postId = Number(id)
        await axios.post('/api/post/answer', {postId , content})
        await mutate({...data})
    }
    return {
        data,
        error,
        answer
    } 
}

/* // Added new Answer
export async function createAnswer(id, content){
    const url = `/api/post/answer`;
    const postId = Number(id)
    await axios.post(url, {postId , content})
} */

export async function vote(postId, answerId, type){
    const url = `/api/post/vote`;
    await axios.post(url, {postId , answerId, type})
}

export const ask = async (params) => {
    const { data } = await axios.post('/api/post/question', params)
    return data?.data?.id
}

