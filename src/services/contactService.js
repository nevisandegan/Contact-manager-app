import axios from "axios";


const SERVER_URL="http://localhost:9000"

export const getAllContact=()=>
{
    const url=`${SERVER_URL}/contact`
    return axios.get(url)
}

export const getContact=(contactId)=>
{
    const url=`${SERVER_URL}/contact/${contactId}`
    return axios.get(url)
}

export const getAllGroups=()=>
{
    const url=`${SERVER_URL}/groups`
    return axios.get(url)
}

export const getGropus=(groupId)=>
{
    const url=`${SERVER_URL}/groups/${groupId}`
    return axios.get(url)
}

export const createContact=(contact)=>
{
    const url=`${SERVER_URL}/contact`;
    return axios.post(url,contact)
}

export const updateContact=(contact,contactId)=>
{
    const url=`${SERVER_URL}/contact/${contactId}`
    return axios.put(url,contact)
}

export const deleteContact=(contactId)=>
{
    const url=`${SERVER_URL}/contact/${contactId}`
    return axios.delete(url)
}
