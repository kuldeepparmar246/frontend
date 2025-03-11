import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObj) => {
  const config = {
    headers : {
      'Authorization' : token
    },
  }
  const response = await axios.post(baseUrl,newObj,config)
  return response.data
}

const update = (id,newObj) => {
  const request = axios.put(`${baseUrl}/${id}`,newObj)
  return request.then(response => response.data)
}

export default { getAll,create,update,setToken }