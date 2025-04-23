import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'
import { logout } from './authSlice';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/auth`,
        credentials: 'include',
    }),
    tagTypes: ["user"],
    endpoints : (builder) =>({
        registerUser: builder.mutation({
            query: (newuser) => ({
                url: '/register',
                method: "POST",
                body: newuser
            })
        }),
        loginUser: builder.mutation ({
            query: (credentials) =>({
                url:'/login',
                method: "POST",
                body: credentials
            })
        }),
        logoutUser: builder.mutation ({
            query: () =>({
                url:'/logout',
                method: "POST",
                
            }) 
        }),
        getUser: builder.query ({
            query: () =>({
                url:'/users',
                method: "GET",
                
            }), 
            refectchOnMount: true,
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation({
            query: (userId) =>({
                url:`/users/${userId}`,
                method: "DELETE",
            }),
          invalidatesTags: ["Users"]     
        }),
        updateRole: builder.mutation({
            query: ({userId, role}) =>({
                url:`/users/${userId}`,
                method: "PUT",
                body: {role}
                
            }), 
            refectchOnMount: true,
            invalidatesTags: ["Users"]
        }),
        editProfile: builder.mutation ({
            query: (profileData) =>({
                url:'/edit-profile',
                method: "PATCH",
                body: profileData
            }) 
        }),
        
    }),
})

export const {useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation,
useUpdateRoleMutation, useEditProfileMutation} = authApi;
export default authApi;