import { useQuery } from "react-query";
import API from "../API";

async function getMovements({by = 'desc', sort = 'timestamp', page = 1, filter = {}}) {
    try {
      const { data, headers } = await  API.get('/movement', {params: {by, sort, page, filter: filter},   headers: {
        'Authorization': `JWT ${localStorage.AuthToken}`
      }});
      return data;
    } catch(e) {
      return e.message;
    }
  }

  async function getMovement(id) {
    try {
      const { data, headers } = await  API.get(`/movement/${id}`, {   headers: {
        'Authorization': `JWT ${localStorage.AuthToken}`
      }});
      return data;
    } catch(e) {
      return e.message;
    }
  }

  export function FetchMovement(id) {

   
      return useQuery(['movement', id], () => getMovement(id), {
        staleTime: 1000 * 60 * 1
      });
    }


export function FetchMovements({by = 'desc', sort = 'timestamp', page = 1, filter = {}, options}) {

    let  params = {by , sort, page, filter };
      return useQuery(['movements', {by , sort, page, filter }], () => getMovements(params), {
        staleTime: 1000 * 60 * 5,
        ...options,
      });
    }