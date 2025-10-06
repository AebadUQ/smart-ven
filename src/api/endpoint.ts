const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const AUTH = {
    SUPERAMIN_LOGIN: `${BASE_URL}/Admin/login`,
    SCHOOL_ADMIN: `${BASE_URL}/Admin/login`,
    FORGET_PASSWORD:`${BASE_URL}/Admin/forgot-password`,
    RESET_PASSWORD:`${BASE_URL}/Admin/reset-password`,
    RESEND_OTP:`${BASE_URL}/Admin/resend-otp`

};

export const STUDENT ={
    GET_ALL_STUDENTS:'/Admin/Get-Students',
    CREATE_STUDENT:'/Admin/addStudent',
    DELETE_STUDENT:'/Admin/removeKids',
    GET_STUDENT_BY_ID:'/Admin/getStudentById',
    ASSIGN_VAN:'/Admin/assignVanToStudent'
}
export const SCHOOL ={
    GET_ALL_SCHOOL:'/Admin/getAllSchools'
}
export const DRIVER = {
        GET_ALL_DRIVER:'/school/getDriversProfile'

}
export const VAN = {
        GET_ALL_VANS:'/school/'

}