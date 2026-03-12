<template>
  <div v-if="open" class="landing-modal-overlay" @click="resetAndClose">
    <div class="landing-modal-box business-modal-box" @click.stop>
      <div class="landing-modal-head">
        <div>
          <div class="landing-modal-kicker">Business models</div>
          <h3>{{ modalTitle }}</h3>
        </div>

        <div class="business-modal-actions">
          <button
            v-if="selectedModel || selectedProvider"
            class="business-back-btn"
            @click="handleBack"
          >
            ← Back
          </button>
          <button class="landing-modal-close" @click="resetAndClose">×</button>
        </div>
      </div>

      <div v-if="!selectedModel" class="landing-modal-grid">
        <button
          v-for="item in businessModels"
          :key="item.key"
          class="landing-modal-card landing-modal-card-button"
          @click="selectedModel = item.key"
        >
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </button>
      </div>

      <div v-else-if="!selectedProvider" class="landing-modal-grid">
        <button
          v-for="item in providerOptions"
          :key="item.key"
          class="landing-modal-card landing-modal-card-button"
          @click="selectedProvider = item.key"
        >
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </button>
      </div>

      <div v-else class="business-model-result" v-html="renderedHtml"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  open: Boolean,
  onClose: Function,
  businessModels: Array,
  providerOptions: Array,
});

const selectedModel = ref(null);
const selectedProvider = ref(null);

function resetAndClose() {
  selectedModel.value = null;
  selectedProvider.value = null;
  props.onClose?.();
}

function handleBack() {
  if (selectedProvider.value) {
    selectedProvider.value = null;
    return;
  }

  if (selectedModel.value) {
    selectedModel.value = null;
    return;
  }

  props.onClose?.();
}

const modalTitle = computed(() => {
  if (!selectedModel.value) return "Choose a business model";
  if (!selectedProvider.value) return "Choose a 3DS provider";
  return "Business model flow";
});

const renderedHtml = computed(() => {
  if (!selectedModel.value || !selectedProvider.value) return "";

  if (selectedModel.value === "gambling") {
    if (selectedProvider.value === "external-3ds") {
      return `
        <div class="business-tree">
          <div class="business-tree-level">
            <div class="business-tree-node">Gambling</div>
            <div class="business-tree-arrow">→</div>
            <div class="business-tree-node">External 3DS provider</div>
          </div>
          <div class="business-tree-branch-grid">
            <div class="business-tree-branch-card">IPG - Gambling</div>
            <div class="business-tree-branch-card">WPA - Gambling</div>
          </div>
        </div>
      `;
    }

    return `
      <div class="business-tree">
        <div class="business-tree-level">
          <div class="business-tree-node">Gambling</div>
          <div class="business-tree-arrow">→</div>
          <div class="business-tree-node">iCard 3DS provider</div>
          <div class="business-tree-arrow">→</div>
          <div class="business-tree-node">IPG</div>
        </div>
      </div>
    `;
  }

  if (selectedModel.value === "financial") {
    if (selectedProvider.value === "external-3ds") {
      return `
        <div class="business-tree">
          <div class="business-tree-level">
            <div class="business-tree-node">Financial / Credit institution</div>
            <div class="business-tree-arrow">→</div>
            <div class="business-tree-node">External 3DS provider</div>
          </div>
          <div class="business-tree-branch-grid">
            <div class="business-tree-branch-card">IPG - Financial / Credit institution</div>
            <div class="business-tree-branch-card">WPA - Financial / Credit institution</div>
          </div>
        </div>
      `;
    }

    return `
      <div class="business-tree">
        <div class="business-tree-level">
          <div class="business-tree-node">Financial / Credit institution</div>
          <div class="business-tree-arrow">→</div>
          <div class="business-tree-node">iCard 3DS provider</div>
          <div class="business-tree-arrow">→</div>
          <div class="business-tree-node">IPG</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="business-tree">
      <div class="business-tree-stack">
        <div class="business-tree-main-title">Ecommerce</div>

        <div class="business-subtree">
          <div class="business-subtree-title">Single purchase model</div>
          ${
            selectedProvider.value === "external-3ds"
              ? `
            <div class="business-tree-level">
              <div class="business-tree-node">Single purchase model</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">External 3DS provider</div>
            </div>
            <div class="business-tree-branch-grid">
              <div class="business-tree-branch-card">IPG - ECommerce</div>
              <div class="business-tree-branch-card">WPA - ECommerce</div>
            </div>
          `
              : `
            <div class="business-tree-level">
              <div class="business-tree-node">Single purchase model</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">iCard 3DS provider</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">IPGEcommerce</div>
            </div>
          `
          }
        </div>

        <div class="business-subtree">
          <div class="business-subtree-title">Subscription model</div>
          ${
            selectedProvider.value === "external-3ds"
              ? `
            <div class="business-tree-level">
              <div class="business-tree-node">Subscription model</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">Single purchase model</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">External 3DS provider</div>
            </div>
            <div class="business-tree-branch-grid">
              <div class="business-tree-branch-card">IPG - ECommerce</div>
              <div class="business-tree-branch-card">WPA - ECommerce</div>
            </div>
          `
              : `
            <div class="business-tree-level">
              <div class="business-tree-node">Subscription model</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">Single purchase model</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">iCard 3DS provider</div>
              <div class="business-tree-arrow">→</div>
              <div class="business-tree-node">IPGEcommerce</div>
            </div>
          `
          }
        </div>
      </div>
    </div>
  `;
});
</script>
