import React, { useState, useEffect } from 'react';
import { MainLayout } from 'layouts';
import { Alert } from '@mui/material'
import { tag } from 'hooks/useTags'
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';


export default function Tag() {
    const router = useRouter()
    const [data, setData] = useState({
        name: '',
        slug: '',
        description: ''
    })
    const [alert, setAlert] = useState([])

    const { user } = useAuth()

    const changeFormValue = (key, event) => {
        setData({...data, [key]: event.target.value});
    }

    useEffect(() => {
        if(!user) router.replace(`/login`) 
        setTimeout(() => {
            setAlert([])
        }, 10000)
    }, [alert])

    const validate = () => {
        let validationErrors = [];
        let passed = true;
        const { name, slug, description} = data;

        if (name === '') {
          validationErrors.push('الرجاء إدخال العنوان');
          passed = false;
        }
    
        if (slug === '') {
          validationErrors.push('الرجاء إدخال اسم لطيف');
          passed = false;
        }
    
        if (description === '') {
          validationErrors.push('الرجاء إدخال الوصف');
          passed = false;
        }
    
        if (validationErrors.length > 0) {
            setAlert(validationErrors);
        }
        return passed;
    };

    const onSubmit = async () => {  
        if(!user) return
        if (!validate()) return;
        try {
            await tag(data)
            router.push(`/tag`) 
        } catch(e) {
            setAlert(["اسم لطيف يجب يكون فريد"])
        }
   
    }

    
  
    return (
        <MainLayout>
            {alert.map(alert => (
                <Alert severity='error' sx={{mb:2}}>
                    {alert}
                </Alert>
            ))}


      </MainLayout>
    )
}