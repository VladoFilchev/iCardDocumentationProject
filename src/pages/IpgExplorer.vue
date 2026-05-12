<template>
  <div
    :class="[
      'ipg-page',
      selectedVersion !== '4.5' ? 'ipg-page-legacy' : '',
      selectedBusinessModel !== 'all' ? 'ipg-page-focused-model' : '',
    ]"
  >
    <header class="ipg-topbar">
      <div class="ipg-topbar-left">
        <button class="back-btn" @click="goBackToLanding">
          Back to landing
        </button>

        <div>
          <div class="small-topline">Online payments</div>
          <div class="top-title">IPG Explorer</div>
        </div>
      </div>

      <div class="top-tags">
        <div class="version-select">
          <button
            class="version-button"
            type="button"
            :aria-expanded="isVersionMenuOpen"
            aria-haspopup="listbox"
            @click="toggleVersionMenu"
          >
            <span>{{ selectedVersionMeta.label }}</span>
            <strong>{{ selectedVersionMeta.status }}</strong>
            <span class="version-caret">v</span>
          </button>

          <div
            v-if="isVersionMenuOpen"
            class="version-menu"
            role="listbox"
          >
            <button
              v-for="version in ipgVersions"
              :key="version.id"
              type="button"
              :class="[
                'version-option',
                selectedVersion === version.id ? 'version-option-active' : '',
              ]"
              role="option"
              :aria-selected="selectedVersion === version.id"
              @click="selectVersion(version.id)"
            >
              <span>
                <strong>{{ version.label }}</strong>
                <small>{{ version.description }}</small>
              </span>
              <em>{{ version.status }}</em>
            </button>
          </div>
        </div>

        <div class="version-select model-select">
          <button
            class="version-button model-button"
            type="button"
            :aria-expanded="isBusinessModelMenuOpen"
            aria-haspopup="listbox"
            @click="toggleBusinessModelMenu"
          >
            <span>{{ selectedBusinessModelMeta.label }}</span>
            <strong>{{ selectedBusinessModelMeta.status }}</strong>
            <span class="version-caret">v</span>
          </button>

          <div
            v-if="isBusinessModelMenuOpen"
            class="version-menu model-menu"
            role="listbox"
          >
            <button
              v-for="model in ipgBusinessModels"
              :key="model.id"
              type="button"
              :class="[
                'version-option',
                selectedBusinessModel === model.id ? 'version-option-active' : '',
              ]"
              role="option"
              :aria-selected="selectedBusinessModel === model.id"
              @click="selectBusinessModel(model.id)"
            >
              <span>
                <strong>{{ model.label }}</strong>
                <small>{{ model.description }}</small>
              </span>
              <em>{{ model.status }}</em>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div :class="['ipg-layout', !hasCodeContent ? 'ipg-layout-no-code' : '']">
      <aside class="ipg-sidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="iCard logo" class="sidebar-logo" />
          <div>
            <div class="sidebar-brand-subtitle">IPG documentation</div>
          </div>
        </div>

        <div class="sidebar-search-wrap">
          <input
            v-model="query"
            class="sidebar-search"
            placeholder="Search commands or guides"
          />
        </div>

        <div class="sidebar-scroll">
          <div
            v-for="group in filteredMenu"
            :key="group.title"
            class="sidebar-group"
          >
            <div class="sidebar-group-title">{{ group.title }}</div>

            <div class="sidebar-items">
              <button
                v-for="item in group.items"
                :key="item.id"
                :class="[
                  'sidebar-item',
                  activeId === item.id ? 'sidebar-item-active' : '',
                ]"
                @click="selectSection(item.id)"
              >
                <TypeBadge :type="item.type" />
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main class="ipg-main">
        <div class="content-hero">
          <div class="content-topline">
            <span class="hero-chip">IPG</span>
            <span class="hero-separator">/</span>
            <span class="hero-subtitle">{{ active.subtitle }}</span>
          </div>

          <h1>{{ active.title }}</h1>
          <p>{{ active.description }}</p>

          <a
            v-if="active.link"
            :href="active.link.href"
            target="_blank"
            rel="noreferrer"
            class="doc-link"
          >
            {{ active.link.label }}
          </a>

          <div v-if="active.facts?.length" class="facts-row">
            <div
              v-for="fact in active.facts"
              :key="fact"
              class="fact-pill"
            >
              {{ fact }}
            </div>
          </div>

          <div v-if="active.availability?.length" class="availability-row">
            <div
              v-for="item in active.availability"
              :key="item.label"
              :class="[
                'availability-pill',
                item.available ? 'availability-yes' : 'availability-no',
              ]"
            >
              <span>{{ item.label }}</span>
              <strong>{{ item.available ? "Available" : "Not available" }}</strong>
            </div>
          </div>
        </div>

        <section v-if="active.body?.length" class="doc-section">
          <h2>Details</h2>
          <div class="paragraphs">
            <p v-for="paragraph in active.body" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </section>

        <section v-if="active.resources?.length" class="doc-section">
          <h2>Resources</h2>
          <div class="resource-grid">
            <a
              v-for="resource in active.resources"
              :key="resource.href"
              :href="resource.href"
              target="_blank"
              rel="noreferrer"
              class="resource-card"
            >
              <span class="resource-type">{{ resource.type || "PDF" }}</span>
              <strong>{{ resource.title }}</strong>
              <span>{{ resource.description }}</span>
            </a>
          </div>
        </section>

        <section v-if="active.media?.length" class="doc-section">
          <h2>Visuals</h2>
          <div class="media-grid">
            <figure
              v-for="item in active.media"
              :key="item.src"
              class="media-frame"
            >
              <img :src="item.src" :alt="item.alt || item.title" />
              <figcaption>
                <strong>{{ item.title }}</strong>
                <span v-if="item.description">{{ item.description }}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section v-if="active.fields?.length" class="doc-section">
          <h2>Fields</h2>
          <FieldsTable
            :fields="active.fields"
            firstHeader="Field"
            secondHeader="Type"
          />
        </section>

        <section
          v-for="section in active.fieldSections || []"
          :key="section.title"
          class="doc-section"
        >
          <h2>{{ section.title }}</h2>
          <p v-if="section.description" class="section-copy">
            {{ section.description }}
          </p>
          <FieldsTable
            :fields="section.fields"
            firstHeader="Property"
            secondHeader="Type"
            :showSample="section.showSample ?? true"
          />
        </section>

        <section
          v-for="table in active.tables || []"
          :key="table.title"
          class="doc-section"
        >
          <h2>{{ table.title }}</h2>
          <p v-if="table.description" class="section-copy">
            {{ table.description }}
          </p>
          <ContentTable :headers="table.headers" :rows="table.rows" />
        </section>

        <section v-if="active.notes?.length" class="doc-section">
          <h2>Notes</h2>
          <div class="paragraphs">
            <p v-for="note in active.notes" :key="note">
              {{ note }}
            </p>
          </div>
        </section>
      </main>

      <aside v-if="hasCodeContent" class="ipg-codebar">
        <div class="codebar-sticky">
          <div v-if="hasRequestSnippet" class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Request</div>
              <span class="mini-label">Request To Send</span>
            </div>
            <pre><code>{{ active.request }}</code></pre>
          </div>

          <div v-if="hasResponseSnippet" class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Response</div>
              <span class="mini-label">Response Message</span>
            </div>
            <pre><code>{{ active.response }}</code></pre>
          </div>

          <div v-if="hasExampleSnippet" class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Example</div>
              <span class="mini-label">Example message</span>
            </div>
            <pre><code>{{ active.example }}</code></pre>
          </div>
        </div>
      </aside>
    </div>

    <SiteFooter
      :onOpenApi="onOpenApi"
      :onOpenSection="onOpenSection"
      :onOpenBusinessModels="onOpenBusinessModels"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import "./IpgExplorer.css";
import {
  ipgMenu,
  ipgContent,
  ipgVersions,
  ipgVersionDocuments,
  ipgBusinessModels,
  ipgBusinessModelDocuments,
} from "../data/ipgData";
import SiteFooter from "../components/SiteFooter.vue";
import TypeBadge from "../components/TypeBadge.vue";
import FieldsTable from "../components/FieldsTable.vue";
import ContentTable from "../components/ContentTable.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function goBackToLanding() {
  router.push("/");
}

const props = defineProps({
  initialActiveId: {
    type: String,
    default: "ipg-overview",
  },
  onOpenApi: Function,
  onOpenSection: Function,
  onOpenBusinessModels: Function,
});

const sectionAliases = {
  "pm-overview": "ipg-wallet-overview",
  "pm-availability": "ipg-payment-availability",
  "pm-sdk": "ipg-wallet-sdk",
  "pm-apple-overview": "ipg-apple-pay",
  "pm-apple-domain": "ipg-apple-domain",
  "pm-token-provider-session": "ipg-token-provider-session",
  "pm-tokenized-purchase-apple": "ipg-tokenized-card-purchase",
  "pm-google-overview": "ipg-google-pay",
  "pm-tokenized-purchase-google": "ipg-tokenized-card-purchase",
  "pm-config": "ipg-wallet-sdk",
  "pm-callbacks": "ipg-tokenized-card-purchase",
};

const versionSummaryId = "ipg-version-summary";

function normalizeSectionId(value) {
  return sectionAliases[value] || value || "ipg-overview";
}

function normalizeVersion(value) {
  const version = Array.isArray(value) ? value[0] : value;
  return ipgVersions.some((item) => item.id === version) ? version : "4.5";
}

function normalizeBusinessModel(value) {
  const model = Array.isArray(value) ? value[0] : value;
  return ipgBusinessModels.some((item) => item.id === model) ? model : "all";
}

const activeId = ref(normalizeSectionId(props.initialActiveId));
const selectedVersion = ref(normalizeVersion(route.query.version));
const selectedBusinessModel = ref(normalizeBusinessModel(route.query.model));
const isVersionMenuOpen = ref(false);
const isBusinessModelMenuOpen = ref(false);
const query = ref("");

const selectedVersionMeta = computed(() => {
  return ipgVersions.find((version) => version.id === selectedVersion.value) || ipgVersions[0];
});

const selectedBusinessModelMeta = computed(() => {
  return ipgBusinessModels.find((model) => model.id === selectedBusinessModel.value) || ipgBusinessModels[0];
});

const selectedBusinessModelConfig = computed(() => {
  return ipgBusinessModelDocuments[selectedBusinessModel.value] || ipgBusinessModelDocuments.all;
});

const selectedBusinessModelDocument = computed(() => {
  const modelConfig = selectedBusinessModelConfig.value;
  const versionDocument =
    modelConfig.versions?.[selectedVersion.value] ||
    modelConfig.versions?.[modelConfig.defaultVersion] ||
    ipgBusinessModelDocuments.all.versions?.[selectedVersion.value] ||
    ipgBusinessModelDocuments.all.versions["4.5"];

  return {
    ...versionDocument,
    defaultSection: modelConfig.defaultSection || versionDocument.defaultSection || "ipg-overview",
    summary:
      modelConfig.summaries?.[selectedVersion.value] ||
      versionDocument.summary ||
      ipgVersionDocuments[selectedVersion.value]?.summary ||
      ipgVersionDocuments["4.5"].summary,
  };
});

const currentMenu = computed(() => selectedBusinessModelDocument.value.menu || ipgMenu);
const currentContent = computed(() => selectedBusinessModelDocument.value.content || ipgContent);

function isSectionAvailable(sectionId) {
  if (sectionId === versionSummaryId) return true;
  return (
    Boolean(currentContent.value[sectionId]) &&
    currentMenu.value.some((group) => group.items.some((item) => item.id === sectionId))
  );
}

function getDefaultSection() {
  return selectedBusinessModelDocument.value.defaultSection || currentMenu.value[0]?.items?.[0]?.id || "ipg-overview";
}

function coerceSection(sectionId) {
  const normalized = normalizeSectionId(sectionId);
  return isSectionAvailable(normalized) ? normalized : getDefaultSection();
}

activeId.value = coerceSection(activeId.value);

watch(
  () => props.initialActiveId,
  (newValue) => {
    activeId.value = coerceSection(newValue);
  }
);

watch(
  () => route.query.version,
  (newValue) => {
    selectedVersion.value = normalizeVersion(newValue);
  }
);

watch(
  () => route.query.model,
  (newValue) => {
    selectedBusinessModel.value = normalizeBusinessModel(newValue);
  }
);

watch([selectedBusinessModel, selectedVersion], () => {
  activeId.value = coerceSection(activeId.value);
});

const versionedMenu = computed(() => [
  ...currentMenu.value,
  {
    title: "Version Summary",
    items: [
      {
        id: versionSummaryId,
        label:
          selectedBusinessModel.value === "all"
            ? `${selectedVersionMeta.value.label} summary`
            : `${selectedBusinessModelMeta.value.label} ${selectedVersionMeta.value.label} summary`,
        type: "schema",
      },
    ],
  },
]);

const filteredMenu = computed(() => {
  if (!query.value.trim()) return versionedMenu.value;

  const q = query.value.toLowerCase();

  return versionedMenu.value
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q)
      ),
    }))
    .filter((group) => group.items.length > 0);
});

const allItems = computed(() => versionedMenu.value.flatMap((group) => group.items));

const activeMeta = computed(() => {
  return allItems.value.find((item) => item.id === activeId.value) || allItems.value[0];
});

const active = computed(() => {
  if (activeId.value === versionSummaryId) {
    return selectedBusinessModelDocument.value.summary;
  }

  const fallbackId = activeMeta.value?.id || getDefaultSection();
  return currentContent.value[activeId.value] || currentContent.value[fallbackId] || currentContent.value[getDefaultSection()];
});

function hasSnippet(value) {
  return typeof value === "string" && value.trim().length > 0;
}

const hasRequestSnippet = computed(() => hasSnippet(active.value?.request));
const hasResponseSnippet = computed(() => hasSnippet(active.value?.response));
const hasExampleSnippet = computed(() => hasSnippet(active.value?.example));
const hasCodeContent = computed(
  () => hasRequestSnippet.value || hasResponseSnippet.value || hasExampleSnippet.value
);

function updateIpgRoute(nextQuery) {
  router.replace({
    path: "/ipg",
    query: {
      ...route.query,
      ...nextQuery,
    },
  });
}

function selectSection(sectionId) {
  const normalized = coerceSection(sectionId);
  activeId.value = normalized;
  updateIpgRoute({
    section: normalized,
    version: selectedVersion.value,
    model: selectedBusinessModel.value,
  });
}

function selectVersion(versionId) {
  const normalized = normalizeVersion(versionId);
  selectedVersion.value = normalized;
  isVersionMenuOpen.value = false;
  const nextSection = coerceSection(activeId.value);
  activeId.value = nextSection;
  updateIpgRoute({
    section: nextSection,
    version: normalized,
    model: selectedBusinessModel.value,
  });
}

function selectBusinessModel(modelId) {
  const normalized = normalizeBusinessModel(modelId);
  selectedBusinessModel.value = normalized;
  isBusinessModelMenuOpen.value = false;
  const nextSection = coerceSection(activeId.value);
  activeId.value = nextSection;
  updateIpgRoute({
    section: nextSection,
    version: selectedVersion.value,
    model: normalized,
  });
}

function toggleVersionMenu() {
  isVersionMenuOpen.value = !isVersionMenuOpen.value;
  if (isVersionMenuOpen.value) isBusinessModelMenuOpen.value = false;
}

function toggleBusinessModelMenu() {
  isBusinessModelMenuOpen.value = !isBusinessModelMenuOpen.value;
  if (isBusinessModelMenuOpen.value) isVersionMenuOpen.value = false;
}

function onOpenApi(apiName) {
  if (apiName === "WPA") router.push("/wpa");
  else if (apiName === "IPG") router.push({ path: "/ipg", query: { section: getDefaultSection(), version: selectedVersion.value, model: selectedBusinessModel.value } });
  else if (apiName === "Payment Methods") router.push({ path: "/ipg", query: { section: "ipg-payment-availability", version: selectedVersion.value, model: selectedBusinessModel.value } });
  else if (apiName === "Apple Pay") router.push({ path: "/ipg", query: { section: "ipg-apple-pay", version: selectedVersion.value, model: selectedBusinessModel.value } });
  else if (apiName === "Google Pay") router.push({ path: "/ipg", query: { section: "ipg-google-pay", version: selectedVersion.value, model: selectedBusinessModel.value } });
  else if (apiName === "Carts") router.push({ path: "/carts", query: { section: "carts-overview" } });
  else if (apiName === "Merchant API") router.push({ path: "/merchant-api", query: { section: "merchant-overview" } });
  else if (apiName === "IPP") router.push({ path: "/ipp", query: { section: "ipp-overview" } });
  else if (apiName === "Issuing API") router.push({ path: "/issuing-api", query: { section: "issuing-overview" } });
}

function onOpenSection(sectionKey) {
  router.push({ path: "/", query: { section: sectionKey } });
}

function onOpenBusinessModels() {
  router.push({ path: "/", query: { businessModels: "open" } });
}
</script>
