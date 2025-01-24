
import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from '@reduxjs/toolkit/query/react';
  import { RootState } from '../store';
import { logOut, setUser } from '../features/auth/authSlice';
import { toast } from 'sonner';

  
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => { //prepareHeaders er kaj ta kora hyse karon proti ta request er 7e jeno accessToken ta pathate pari.
      const token = (getState() as RootState).auth.token;
  
      if (token) {
        headers.set('authorization', `${token}`);
      }
      return headers;
    },
  });
  
  const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
  > = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
  
    if(result?.error?.status===404){
      toast.error(result.error.data.message)
    }

    if (result?.error?.status === 401) {
      //* Send Refresh
      console.log('Sending refresh token');
  
      const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
        method: 'POST',
        credentials: 'include'//js diya cookies theke data niya jai na tai eti use korte hoi
      });
  
      const data = await res.json();

  
      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
  
        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );
  
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }
  
    return result;
  };
  
  export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
  });