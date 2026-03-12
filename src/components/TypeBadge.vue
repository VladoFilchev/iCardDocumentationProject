<template>
  <span :class="['type-badge', item.className]">
    {{ item.label }}
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "guide",
  },
});

const item = computed(() => {
  const map = {
    overview: { label: "Overview", className: "badge-overview" },
    guide: { label: "Guide", className: "badge-guide" },
    post: { label: "POST", className: "badge-post" },
    schema: { label: "Schema", className: "badge-schema" },
  };

  return map[props.type] || map.guide;
});
</script>