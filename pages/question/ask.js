import React, { useState, useEffect } from 'react'; 
import { MainLayout } from "layouts";
import { Box, Button, Grid, Alert } from '@mui/material';
import { TextInput, TagsInput } from 'components/inputs';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTags } from 'hooks/useTags';
import { ask as askApi } from 'hooks/usePost';
import { useRouter } from 'next/router';
import useAuth from "hooks/useAuth";


export default function Ask() {
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [content, setContent] = useState('')
    const [alert, setAlert] = useState({ messages: null, type: '' });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
          setAlert({ messages: null });
        }, 3000);
        return () => clearTimeout(timer);
    }, [alert.messages]);
    
    const router = useRouter()
    const {formatMessage} = useIntl()

    // check auth 
    const { user } = useAuth({
        redirectTo: '/login', redirectIfFound: false
    })

    // get the tags from database
    const {data: tagsList} = useTags()

   // On Change for data
   const changeContenthandler = (event) => {
    setContent(event.target.value);
   }

    const validate = () => {
        let validationErrors = [];
        let passed = true;

        if (title === '') {
        validationErrors.push('الرجاء إدخال العنوان');
        passed = false;
        }

        if (content === '') {
        validationErrors.push('الرجاء إدخال المحتوى');
        passed = false;
        }

        if (validationErrors.length > 0) {
        setAlert({ messages: validationErrors, type: 'danger' });
        }

        return passed;
    };

    const onSubmit = async event => {
        event.preventDefault()
        if (!validate()) return;
        setLoading(true)

        /**
         *  tages = {label: e.name, value: e.id}
         *  need {tagId : 1}, {tagId : 2}, {tagId : 3} 
         *  needs the prisma tage as figure of top data 
        */

        tags.map(tag => {
            delete tag.label
            tag.tagId = tag.value
        })
        
        // tags = {value: , tagId}
        const data = {
            title,
            content,
            tags: tags.map(e => {
                delete e.value
                return e
            })
            // tags = {tagId:}
        }
        const id = await askApi(data)
        router.push(`/question/${id}`) 
    }

    return (
        <MainLayout title='أضف مشاركة'>
            <Box p={2}>
                {
                    alert.messages == null ? '': (
                        <Alert>
                            {alert.messages.map(e => (<li>{e}</li>))}
                        </Alert>
                    )
                }
                <form onSubmit={onSubmit}>
                    <TextInput
                        variant="outlined"
                        name="title"
                        value={title}
                        onChange={setTitle}
                        label="input.title"
                        inputProps={{
                            autoComplete: 'off'
                        }}
                    />
                    <TagsInput
                        sx={{my:2}}
                        label='input.tags'
                        onChange={setTags}
                        value={tags}
                        options={tagsList.map(e => ({label: e.name, value: e.id}))}
                    />

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            >
                            <FormattedMessage id='btn.continue'/>
                        </Button>
                    </Grid>
                </form>
            </Box>
        </MainLayout>
    )
}