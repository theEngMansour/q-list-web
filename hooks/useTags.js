import useSWR from 'swr'
import axios from 'axios'

const url = '/api/tag'

const fetcher = url => axios.get(url).then(({ data }) => data?.data)

export function useTags() {
   const { data } = useSWR( url, fetcher)
   return {
       data: data || []
   }
}

export default function useTag(slug, id) {
    const { data, error } = useSWR(`/api/tag/${slug}?id=${id}`, fetcher)
    return {
        data,
        error
    } 
}

export const tag = async (params) => {
    const { data } = await axios.post('/api/tag', params)
    return data?.data?.id
}

 