import axios from "axios";
export const fetchBoardDetails_API = async (boardId) => {
  const response = await axios.get(`http://localhost:8017/v1/boards/${boardId}`)
  return response.data
}