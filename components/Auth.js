import React from "react";
import Router from "next/router";
const Auth = () => {
    return (
        <div className="flex justify-center bg-gray-50 flex-col sm:p-24 md:p-10">
            <h1 className="text-gray-600 text-center text-4xl font-bold mt-9">لم يسمح لك بدخول لهذي صفحة</h1>
            <h1 className="text-gray-500 text-center text-xl mt-1">قم بتسجيل الدخول في حالة كان يوجد لديك حساب او إنشاء حساب جديد</h1>
            <div className="m-auto my-10 ">
                <button onClick={() => Router.push('/login')} className="p-4 bg-gray-500 text-center text-white font-bold rounded-sm">تسجيل الدخول</button>
                <button onClick={() => Router.push('/register')} className="p-4 bg-green-500 text-center text-white font-bold rounded-sm mx-3">إنشاء حساب</button>

            </div>
        </div>
    )
}

export default Auth;