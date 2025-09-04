const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const AUTH = {
    SUPERAMIN_LOGIN: `${BASE_URL}/Admin/login`,
};

export const STUDENT ={
    GET_ALL_STUDENTS:'/Admin/Get-Students',
    CREATE_STUDENT:'/Admin/addStudent'
}
export const SCHOOL ={
    GET_ALL_SCHOOL:'/Admin/getAllSchools'
}
export const DRIVER = {
        GET_ALL_DRIVER:'/school/getDriversProfile'

}