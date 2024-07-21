interface APIResponse<T> {
    data: T;
    message?: string;
}

export default APIResponse;
