export const request = async (requestBody: RequestBody): Promise<any> => {
  try {
    const {
      baseUrl,
      endPoint,
      header = {},
      method = "get",
      data = {},
      params = null,
      responseType = "",
    } = requestBody;

    const token = localStorage.getItem("token");
    const headers = token
      ? { ...header, Authorization: `Bearer ${token}` }
      : header;
    const queryString = params ? params : "";
    const url = `${baseUrl}${endPoint}${queryString ? `?${queryString}` : ''}`;

    const fetchOptions: RequestInit = {
      method,
      headers: {
        ...headers,
        'Content-Type': method === 'post' ? 'application/json' : headers['Content-Type'],
      },
      body: method !== "get" ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}, ${await response.text()}`);
    }
    
    if (responseType === 'json') {
      return await response.json();
    } else if (responseType === 'text') {
      return await response.text();
    } else if (responseType === '') {
      return await response.json();
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

interface RequestBody {
  baseUrl: string;
  endPoint: string;
  header?: Record<string, string>;
  method?: string;
  data?: Record<string, any>;
  params?: string;
  responseType?: string;
}