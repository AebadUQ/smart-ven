import { Pagination } from './pagination'

export interface ApiResponse<T> {
    data: T
    msg: string
    page?: Pagination
}
