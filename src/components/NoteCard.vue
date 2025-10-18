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
  return props.note.time
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
