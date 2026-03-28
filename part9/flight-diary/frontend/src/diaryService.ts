import axios from 'axios'
import type { Diary, NewDiary } from './types'

const baseUrl = '/api/diaries'

const getAll = async () => {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === 'string') {
      return error.response.data
    }
    return error.message
  }
  return 'unknown error'
}

const create = async (object: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, object)
    return response.data
  } catch (error: unknown) {
    throw new Error(getErrorMessage(error))
  }
}

export default { getAll, create }
