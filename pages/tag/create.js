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
            {alert.map((alert, index) => (
                <Alert key={index} severity='error' sx={{mb:2}}>
                    {alert}
                </Alert>
            ))}

            <div className="min-h-screen md:px-20 pt-6">
                <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
                <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">إضافة التصنيف</h1>
                <div className="space-y-4">
                    <div>
                    <label className="text-lx">إسم التصنيف :</label>
                    <input type="text" placeholder="إسم التصنيف" onChange={(text) => changeFormValue('name', text)} id="title" className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
                    <label className="text-lx">إسم لطيف :</label>
                    <input type="text" placeholder="إسم لطيف" onChange={(text) => changeFormValue('slug', text)} id="title" className="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" />
                    </div>
                    <div>
                    <label className="block mb-2 text-lg ">الوصف:</label>
                    <textarea id="description" cols="30" rows="10" onChange={(text) => changeFormValue('description', text)} placeholder="أكتب الوصف" className="w-full p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"></textarea>
                    </div>
                    <button className="px-6 py-2 mx-auto block rounded-md text-lg text-indigo-100 bg-blue-900" onClick={onSubmit}>إضافة التصنيف</button>
                </div>
                </div>
            </div>
      </MainLayout>
    )
}