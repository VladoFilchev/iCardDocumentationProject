<template>
  <div class="ipp-page">
    <header class="ipp-topbar">
      <div class="ipp-topbar-left">
     <button class="back-btn" @click="goBackToLanding">
  ← Back to landing
</button>

        <div>
          <div class="small-topline">In person payments</div>
          <div class="top-title">IPP Explorer</div>
        </div>
      </div>

      <div class="top-tags">
        <span class="top-tag">Terminal protocol</span>
        <span class="top-tag">iCard blue theme</span>
      </div>
    </header>

    <div class="ipp-layout">
      <aside class="ipp-sidebar">
        <div class="sidebar-brand">
          <img src="/logo.png" alt="iCard logo" class="sidebar-logo" />
          <div>
            <div class="sidebar-brand-subtitle">IPP documentation</div>
          </div>
        </div>

        <div class="sidebar-search-wrap">
          <input
            v-model="query"
            class="sidebar-search"
            placeholder="Search methods or guides"
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
                @click="activeId = item.id"
              >
                <TypeBadge :type="item.type" />
                <span>{{ item.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main class="ipp-main">
        <div class="content-hero">
          <div class="content-topline">
            <span class="hero-chip">IPP</span>
            <span class="hero-separator">/</span>
            <span class="hero-subtitle">{{ active?.subtitle }}</span>
          </div>

          <h1>{{ active?.title }}</h1>
          <p>{{ active?.description }}</p>

          <div class="facts-row">
            <div
              v-for="fact in active?.facts || []"
              :key="fact"
              class="fact-pill"
            >
              {{ fact }}
            </div>
          </div>
        </div>

        <section v-if="active?.body" class="doc-section">
          <h2>Details</h2>
          <div class="paragraphs">
            <p v-for="paragraph in active.body" :key="paragraph">
              {{ paragraph }}
            </p>
          </div>
        </section>

        <section v-if="active?.fields" class="doc-section">
          <h2>Fields</h2>
          <FieldsTable
            :fields="active.fields"
            firstHeader="Field"
            secondHeader="Type"
          />
        </section>

        <section v-if="active?.table" class="doc-section">
          <h2>Reference</h2>
          <ContentTable
            :headers="active.table.headers"
            :rows="active.table.rows"
          />
        </section>
      </main>

      <aside class="ipp-codebar">
        <div class="codebar-sticky">
          <div class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Request</div>
              <TypeBadge :type="activeMeta?.type" />
            </div>
            <pre><code>{{ active?.request || "No request snippet for this section." }}</code></pre>
          </div>

          <div class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Response</div>
              <span class="mini-label">Example</span>
            </div>
            <pre><code>{{ active?.response || "No response snippet for this section." }}</code></pre>
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
import "./IppExplorer.css";
import { ippMenu, ippContent } from "../data/ippData";
import SiteFooter from "../components/SiteFooter.vue";
import TypeBadge from "../components/TypeBadge.vue";
import FieldsTable from "../components/FieldsTable.vue";
import ContentTable from "../components/ContentTable.vue";
import {useRouter} from "vue-router"; 

const router = useRouter();

function goBackToLanding() {
  router.push("/");
}

function onOpenApi(apiName) {
  if (apiName === "WPA") router.push("/wpa");
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

const props = defineProps({
  initialActiveId: {
    type: String,
    default: "ipp-overview",
  },
  onOpenApi: Function,
  onOpenSection: Function,
  onOpenBusinessModels: Function,
});

const activeId = ref(props.initialActiveId);
const query = ref("");

watch(
  () => props.initialActiveId,
  (newValue) => {
    activeId.value = newValue;
  }
);

const filteredMenu = computed(() => {
  if (!query.value.trim()) return ippMenu;

  const q = query.value.toLowerCase();

  return ippMenu
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q)
      ),
    }))
    .filter((group) => group.items.length > 0);
});

const allItems = computed(() => ippMenu.flatMap((group) => group.items));

const activeMeta = computed(() => {
  return allItems.value.find((item) => item.id === activeId.value) || allItems.value[0];
});

const active = computed(() => ippContent[activeId.value]);
</script>