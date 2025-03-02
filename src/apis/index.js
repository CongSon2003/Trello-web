import axios from "axios";
// API BOARD
export const fetchBoardDetails_API = async (boardId) => {
  const response = await axios.get(`http://localhost:8017/v1/boards/${boardId}`)
  return response.data
}
// CALL API UPDATE WHEN MOVE CARD
export const fetchMoveCardsBetweenColumns = async (data) => {
  const response = await axios.put(`http://localhost:8017/v1/boards/supports/moving_card`, data)
  return response.data
}
// Call API Columns
export const fetchColumnCreate_API = async (data) => {
  console.log(data);
  const { boardId, title } = data
  const response = await axios.post(`http://localhost:8017/v1/columns`, { boardId, title })
  return response.data
}
// Call API card
export const fetchCardCreate_API = async (data) => {
  const { boardId, columnId, title } = data
  const response = await axios.post(`http://localhost:8017/v1/cards`, { boardId, columnId, title })
  return response.data
}
// Call Api update Board 
export const fetchBoardUpdate_API = async (boardId, dataUpdate) => {
  console.log(dataUpdate);
  const response = await axios.put(`http://localhost:8017/v1/boards/${boardId}`, dataUpdate )
  return response.data
}
// call Api update Column
export const fetchColumnUpdate_API = async (columnId, dataUpdate) => {
  const response = await axios.put(`http://localhost:8017/v1/columns/${columnId}`,dataUpdate)
  return response.data
}