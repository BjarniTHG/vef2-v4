const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export type ApiResponse<T> = {
    ok: boolean;
    data?: T;
    error?: string;
    status: number;
};

async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const url = new URL(endpoint, API_BASE_URL).toString();
        console.log('Fetching URL:', url);
        
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        let data;
        try {
            data = await response.json();
            console.log('Response data:', data);
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            data = null;
        }

        if (response.ok){
            return {
                ok: true,
                data: data,
                status: response.status,
            };
        } else {
            return { 
                ok: false,
                error: data?.message || 'Villa hefur skéð',
                status: response.status,
            };
        }
    } catch(error){
        console.error('Fetch error:', error);
        return {
            ok: false,
            error: error instanceof Error ? error.message : 'Network error',
            status: 0,
        };
    }
}

const api = {
    get: <T>(endpoint: string) => fetchApi<T>(endpoint),

    post: <T>(endpoint: string, data: unknown) => 
        fetchApi<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
    patch: <T>(endpoint: string, data: unknown) => 
        fetchApi<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
    delete: <T>(endpoint: string) =>
        fetchApi<T>(endpoint, {
            method: 'DELETE',
        }),
};

export default api;