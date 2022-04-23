import React, {useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Chip,
    Skeleton
} from '@mui/material'

import Link from 'next/link'
import moment from 'utiles/moment'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    tags: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    answers: {
        color: theme.palette.background.paper,
        backgroundColor: 'blue',
    },
    link: {
        cursor: 'pointer'
    }
}))

function QItem({ item }) {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const answers = item.answers.map(answer => answer.answersCount)
    const ansCount = () => {
        let total = 0;
        for (let item of answers) total += item;
        return total;
    };
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    })

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                { loading ? (
                    <Skeleton animation="wave" variant="rectangular" width={40} height={40} />
                    ) : (
                        <Avatar sx={{backgroundColor: '#281cd8'}} variant="rounded" className={classes.answers}>
                            {
                            ansCount()
                            }
                        </Avatar>
                    )
                }
                
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Link href={`/question/${item.id}`} passHref>
                        { loading ? (
                            <Skeleton animation="wave" variant="text" width={'50%'} height={20} />
                            ) : (
                                <Typography className={classes.link}>
                                    {/* { item.question.title } */}
                                    { item.title }
                                </Typography>
                            )
                        }                       
                    </Link> 
                }
                secondary={
                    <Box display="flex">
                        <Box paddingY={1} flexGrow={1} className={classes.tags}>
                        { loading ? (
                            <div className='flex'>
                                <Skeleton variant="text" width={50} height={20} />
                                <Skeleton sx={{ml:0.5}}  variant="text" width={50} height={20} />
                            </div>
                            ) : (
                               <Tags tags={item.tags} />
                            )
                        }             
                        </Box>
                        { loading ? (
                            <Skeleton variant="text" width={50} height={20} />
                            ) : (
                                <Box marginY={'auto'}>
                                    { moment(item.createdAt).fromNow()}
                                </Box>
                            )
                        }        

                    </Box>
                }
            />
        </ListItem>
    )
}

 function Tags({ tags = {} }) {
    return (
        <Box>
            {
                tags.map(e =>
                    (
                        <Link href={`/tag/${e.tag.slug}`} passHref key={e.tag.id}>
                           <Chip label={e.tag.name} color="primary" size='small' sx={{ mr:0.5 }}/>
                        </Link>
                    )
                )
            }
        </Box>
      
    )
} 

export default function QList({ items = []}) {
    return (
        <List sx={{py: 3}}>
            {
                items.map((e, index) =>
                    <div key={index}>
                        <QItem item={e}/>
                        <Divider variant="inset" component="li"/>
                    </div>
                )
            }
        </List>
    )
}