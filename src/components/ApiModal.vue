<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-box" @click.stop>
      <div class="modal-top">
        <div>
          <div class="modal-kicker">Supported APIs</div>
          <h3>{{ openSection.title }}</h3>
        </div>

        <button class="modal-close" @click="$emit('close')">×</button>
      </div>

      <p class="modal-description">{{ openSection.description }}</p>

      <div class="modal-items">
        <button
          v-for="item in openSection.items"
          :key="item"
          class="modal-api-button"
          @click="$emit('open-api', item)"
        >
          {{ item }}
        </button>
      </div>

      <div class="modal-note">
        Next step: each API button opens its own dedicated documentation page.
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  openSection: {
    type: Object,
    required: true,
  },
});

defineEmits(["close", "open-api"]);
</script>