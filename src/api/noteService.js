import axios from 'axios'

const API_BASE_URL = 'https://memo-be.up.railway.app/api'

// 获取所有笔记
export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getnotes`)
    return response.data
  } catch (error) {
    console.error('获取笔记失败:', error)
    throw error
  }
}

// 添加新笔记
export const addNote = async (time, content) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/postnote`,
      {
        time,
        content
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    console.error('添加笔记失败:', error)
    throw error
  }
}
