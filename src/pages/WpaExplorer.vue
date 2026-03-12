<template>
  <div class="wpa-page">
    <header class="wpa-topbar">
      <div class="wpa-topbar-left">
      <button class="back-btn" @click="goBackToLanding">
  ← Back to landing
</button>

        <div>
          <div class="small-topline">Online payments</div>
          <div class="top-title">WPA Explorer</div>
        </div>
      </div>

      <div class="top-tags">
        <span class="top-tag">API explorer layout</span>
        <span class="top-tag">iCard blue theme</span>
      </div>
    </header>

    <div class="wpa-layout">
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
                @click="activeId = item.id || item.key"
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
          <FieldsTable :fields="active.fields" />
        </section>
      </main>

      <aside class="wpa-codebar">
        <div class="codebar-sticky">
          <div class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Request</div>
              <TypeBadge :type="activeMeta?.type || activeMeta?.kind" />
            </div>
            <pre><code>{{ active?.request || active?.code || "No request snippet for this section." }}</code></pre>
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
import { ref, computed } from "vue";
import "./WpaExplorer.css";
import { wpaMenu, wpaContent } from "../data/wpaData";
import SiteFooter from "../components/siteFooter.vue";
import TypeBadge from "../components/TypeBadge.vue";
import FieldsTable from "../components/FieldsTable.vue";

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
  onOpenApi: Function,
  onOpenSection: Function,
  onOpenBusinessModels: Function,
});

const activeId = ref("overview");
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

const active = computed(() => wpaContent[activeId.value]);
</script>