<template>
  <div class="wpa-page">
    <header class="wpa-topbar">
      <div class="wpa-topbar-left">
        <button class="back-btn" @click="goBackToLanding">
          Back to landing
        </button>

        <div>
          <div class="small-topline">Online payments</div>
          <div class="top-title">WPA Explorer</div>
        </div>
      </div>

      <div class="top-tags">
        <span class="top-tag">{{ wpaVersion.label }}</span>
        <span class="top-tag">{{ wpaVersion.status }}</span>
        <span class="top-tag">Detailed guide</span>
      </div>
    </header>

    <div :class="['wpa-layout', !hasCodeContent ? 'wpa-layout-no-code' : '']">
      <aside class="wpa-sidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="iCard logo" class="sidebar-logo" />
          <div>
            <div class="sidebar-brand-subtitle">WPA documentation</div>
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
                :key="item.id || item.key"
                :class="[
                  'sidebar-item',
                  activeId === (item.id || item.key) ? 'sidebar-item-active' : '',
                ]"
                @click="selectSection(item.id || item.key)"
              >
                <TypeBadge :type="item.type || item.kind" />
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main class="wpa-main">
        <div class="content-hero">
          <div class="content-topline">
            <span class="hero-chip">WPA</span>
            <span class="hero-separator">/</span>
            <span class="hero-subtitle">{{ active?.subtitle }}</span>
          </div>

          <h1>{{ active?.title }}</h1>
          <p>{{ active?.description }}</p>

          <div v-if="active?.facts?.length" class="facts-row">
            <div
              v-for="fact in active.facts"
              :key="fact"
              class="fact-pill"
            >
              {{ fact }}
            </div>
          </div>
        </div>

        <section v-if="active?.body?.length" class="doc-section">
          <h2>Details</h2>
          <div class="paragraphs">
            <p v-for="paragraph in active.body" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </section>

        <section
          v-for="section in active?.detailSections || []"
          :key="section.title"
          class="doc-section"
        >
          <h2>{{ section.title }}</h2>
          <p v-if="section.description" class="section-copy">
            {{ section.description }}
          </p>
          <div class="detail-list">
            <article
              v-for="item in section.items"
              :key="item.title"
              class="detail-item"
            >
              <strong>{{ item.title }}</strong>
              <span>{{ item.description }}</span>
            </article>
          </div>
        </section>

        <section v-if="active?.steps?.length" class="doc-section">
          <h2>Integration Steps</h2>
          <div class="integration-step-grid">
            <article
              v-for="(step, index) in active.steps"
              :key="step.title"
              class="integration-step-card"
            >
              <div class="integration-step-number">{{ index + 1 }}</div>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </article>
          </div>
        </section>

        <section
          v-if="active?.fields?.length && !active?.fieldSections?.length"
          class="doc-section"
        >
          <h2>Fields</h2>
          <FieldsTable :fields="active.fields" />
        </section>

        <section
          v-for="section in active?.fieldSections || []"
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
          v-for="table in active?.tables || []"
          :key="table.title"
          class="doc-section"
        >
          <h2>{{ table.title }}</h2>
          <p v-if="table.description" class="section-copy">
            {{ table.description }}
          </p>
          <ContentTable :headers="table.headers" :rows="table.rows" />
        </section>

        <section v-if="active?.notes?.length" class="doc-section">
          <h2>Notes</h2>
          <div class="paragraphs">
            <p v-for="note in active.notes" :key="note">
              {{ note }}
            </p>
          </div>
        </section>

        <section v-if="active?.examples?.length" class="doc-section">
          <h2>{{ active.examplesTitle || "Examples" }}</h2>
          <div class="callback-example-grid">
            <article
              v-for="example in active.examples"
              :key="example.title"
              class="callback-example-card"
            >
              <div class="callback-example-header">
                <strong>{{ example.title }}</strong>
                <span v-if="example.description">{{ example.description }}</span>
              </div>
              <pre><code>{{ example.code }}</code></pre>
            </article>
          </div>
        </section>
      </main>

      <aside v-if="hasCodeContent" class="wpa-codebar">
        <div class="codebar-sticky">
          <div v-if="hasRequestSnippet" class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Request</div>
              <TypeBadge :type="activeMeta?.type || activeMeta?.kind" />
            </div>
            <pre><code>{{ active.request }}</code></pre>
          </div>

          <div v-if="hasResponseSnippet" class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Response</div>
              <span class="mini-label">Example</span>
            </div>
            <pre><code>{{ active.response }}</code></pre>
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
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import "./WpaExplorer.css";
import { wpaMenu, wpaContent, wpaVersion } from "../data/wpaData";
import SiteFooter from "../components/SiteFooter.vue";
import TypeBadge from "../components/TypeBadge.vue";
import FieldsTable from "../components/FieldsTable.vue";
import ContentTable from "../components/ContentTable.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  initialActiveId: {
    type: String,
    default: "overview",
  },
  onOpenApi: Function,
  onOpenSection: Function,
  onOpenBusinessModels: Function,
});

function goBackToLanding() {
  router.push("/");
}

function onOpenApi(apiName) {
  if (apiName === "WPA") router.push({ path: "/wpa", query: { section: activeId.value } });
  else if (apiName === "IPG") router.push({ path: "/ipg", query: { section: "ipg-overview" } });
  else if (apiName === "Payment Methods") router.push({ path: "/ipg", query: { section: "pm-overview" } });
  else if (apiName === "Apple Pay") router.push({ path: "/ipg", query: { section: "pm-apple-overview" } });
  else if (apiName === "Google Pay") router.push({ path: "/ipg", query: { section: "pm-google-overview" } });
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

function normalizeSectionId(value) {
  const sectionId = Array.isArray(value) ? value[0] : value;
  return wpaContent[sectionId] ? sectionId : "overview";
}

const activeId = ref(normalizeSectionId(route.query.section || props.initialActiveId));
const query = ref("");

const filteredMenu = computed(() => {
  if (!query.value.trim()) return wpaMenu;

  const q = query.value.toLowerCase();

  return wpaMenu
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q)
      ),
    }))
    .filter((group) => group.items.length > 0);
});

const allItems = computed(() => wpaMenu.flatMap((group) => group.items));

const activeMeta = computed(() => {
  return (
    allItems.value.find((item) => (item.id || item.key) === activeId.value) ||
    allItems.value[0]
  );
});

const active = computed(() => wpaContent[activeId.value] || wpaContent.overview);

watch(
  () => props.initialActiveId,
  (newValue) => {
    activeId.value = normalizeSectionId(newValue);
  }
);

watch(
  () => route.query.section,
  (newValue) => {
    activeId.value = normalizeSectionId(newValue || activeId.value);
  }
);

function selectSection(sectionId) {
  const normalized = normalizeSectionId(sectionId);
  activeId.value = normalized;
  router.replace({
    path: "/wpa",
    query: { section: normalized },
  });
}

function hasSnippet(value) {
  return typeof value === "string" && value.trim().length > 0;
}

const hasRequestSnippet = computed(() => hasSnippet(active.value?.request));
const hasResponseSnippet = computed(() => hasSnippet(active.value?.response));
const hasCodeContent = computed(
  () => hasRequestSnippet.value || hasResponseSnippet.value
);
</script>
