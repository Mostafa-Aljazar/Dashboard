export interface GetInterestsResponse {
    status:     number;
    success:    boolean;
    message:    string;
    data:       Interest[];
    pagination: Pagination;
}

export interface Interest {
    id:        number;
    title:     string;
    icon:      string;
    is_active: boolean;
}

export interface Pagination {
    total:        number;
    per_page:     number;
    current_page: number;
    last_page:    number;
}
