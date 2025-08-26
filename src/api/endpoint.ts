const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const AUTH = {
    SUPERAMIN_LOGIN: `${BASE_URL}/Admin/login`,
};

export const STUDENT ={
    GET_ALL_STUDENTS:'/school/getKidsProfile'
}
export const SCHOOL ={
    GET_ALL_SCHOOL:'/Admin/getAllSchools'
}
export const DRIVER = {
        GET_ALL_DRIVER:'/school/getDriversProfile'

}