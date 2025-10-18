<template>
  <div class="app">
    <header class="header">
      <h1>Memoria</h1>
      <p class="subtitle"></p>
    </header>

    <main class="main-content">
      <div class="container">
        <!-- 添加笔记表单 -->
        <div class="add-note-section">
          <h2></h2>
          <form @submit.prevent="handleAddNote" class="note-form">
            <div class="form-group">
              <label for="time">时间</label>
              <input
                id="time"
                v-model="newNote.time"
                type="text"
                placeholder="例如: 2025-10-18 20:00:00"
                required
              />
            </div>
            <div class="form-group">
              <label for="content">内容</label>
              <textarea
                id="content"
                v-model="newNote.content"
                placeholder="输入笔记内容..."
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              {{ isSubmitting ? '提交中...' : '发送' }}
            </button>
          </form>
        </div>

        <!-- 笔记列表 -->
        <div class="notes-section">
          <div class="notes-header">
            <h2></h2>
            <button @click="loadNotes" class="btn-refresh" :disabled="isLoading">
              {{ isLoading ? '加载中...' : '刷新' }}
            </button>
          </div>

          <div v-if="isLoading && notes.length === 0" class="loading">
            加载中...
          </div>

          <div v-else-if="error" class="error">
            {{ error }}
          </div>

          <div v-else-if="notes.length === 0" class="empty">
            暂无笔记，快来添加第一条吧！
          </div>

          <div v-else class="notes-list">
            <NoteCard
              v-for="note in sortedNotes"
              :key="note.id || note.time"
              :note="note"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NoteCard from './components/NoteCard.vue'
import { getNotes, addNote } from './api/noteService'

const notes = ref([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref(null)

const newNote = ref({
  time: '',
  content: ''
})

// 按 id 降序排列笔记（新的在上）
const sortedNotes = computed(() => {
  return [...notes.value].sort((a, b) => {
    return b.id - a.id
  })
})

// 加载笔记
const loadNotes = async () => {
  isLoading.value = true
  error.value = null
  try {
    const data = await getNotes()
    notes.value = data || []
  } catch (err) {
    error.value = '加载笔记失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

// 添加笔记
const handleAddNote = async () => {
  isSubmitting.value = true
  try {
    await addNote(newNote.value.time, newNote.value.content)
    // 清空表单
    newNote.value = {
      time: '',
      content: ''
    }
    // 重新加载笔记列表
    await loadNotes()
  } catch (err) {
    alert('添加笔记失败，请检查输入格式')
  } finally {
    isSubmitting.value = false
  }
}

// 组件挂载时加载笔记
onMounted(() => {
  loadNotes()
  // 自动填充当前时间
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  newNote.value.time = `${year}-${month}-${day}`
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.main-content {
  padding: 40px 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.add-note-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.add-note-section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.note-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.notes-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.notes-header h2 {
  color: #333;
  font-size: 1.5rem;
}

.btn-refresh {
  background: #4a90e2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-refresh:hover:not(:disabled) {
  background: #357abd;
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 40px;
  color: #888;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .main-content {
    padding: 20px 12px;
  }

  .add-note-section,
  .notes-section {
    padding: 20px;
  }

  .add-note-section h2,
  .notes-header h2 {
    font-size: 1.3rem;
  }

  .notes-header {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-refresh {
    width: 100%;
  }
}
</style>
