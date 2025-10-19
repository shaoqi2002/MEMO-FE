<template>
  <div class="note-card">
    <div class="note-time">{{ formattedTime }}</div>
    <div class="note-content">{{ note.content }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

const formattedTime = computed(() => {
  try {
    const date = new Date(props.note.time)
    // 格式化为：2025-10-19 14:48:37
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } catch (e) {
    return props.note.time
  }
})
</script>

<style scoped>
.note-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid #4a90e2;
}

.note-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.note-time {
  font-size: 13px;
  color: #888;
  margin-bottom: 12px;
  font-weight: 500;
}

.note-content {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
}

@media (max-width: 768px) {
  .note-card {
    padding: 16px;
  }

  .note-time {
    font-size: 12px;
  }

  .note-content {
    font-size: 14px;
  }
}
</style>
