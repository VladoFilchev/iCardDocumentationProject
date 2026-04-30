<template>
  <div class="ipg-page">
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
        <span class="top-tag">Protocol 4.5</span>
        <span class="top-tag">All business models</span>
      </div>
    </header>

    <div class="ipg-layout">
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
                @click="activeId = item.id"
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

      <aside class="ipg-codebar">
        <div class="codebar-sticky">
          <div class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Request</div>
              <span class="mini-label">Request To Send</span>
            </div>
            <pre><code>{{ active.request || "No request snippet for this section." }}</code></pre>
          </div>

          <div class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Response</div>
              <span class="mini-label">Response Message</span>
            </div>
            <pre><code>{{ active.response || "No response snippet for this section." }}</code></pre>
          </div>

          <div class="code-panel">
            <div class="code-panel-header">
              <div class="code-label">Example</div>
              <span class="mini-label">Example message</span>
            </div>
            <pre><code>{{ active.example || "No example snippet for this section." }}</code></pre>
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
import { ipgMenu, ipgContent } from "../data/ipgData";
import SiteFooter from "../components/SiteFooter.vue";
import TypeBadge from "../components/TypeBadge.vue";
import FieldsTable from "../components/FieldsTable.vue";
import ContentTable from "../components/ContentTable.vue";
import { useRouter } from "vue-router";

const router = useRouter();

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

function normalizeSectionId(value) {
  return sectionAliases[value] || value || "ipg-overview";
}

const activeId = ref(normalizeSectionId(props.initialActiveId));
const query = ref("");

watch(
  () => props.initialActiveId,
  (newValue) => {
    activeId.value = normalizeSectionId(newValue);
  }
);

const filteredMenu = computed(() => {
  if (!query.value.trim()) return ipgMenu;

  const q = query.value.toLowerCase();

  return ipgMenu
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(q)
      ),
    }))
    .filter((group) => group.items.length > 0);
});

const allItems = computed(() => ipgMenu.flatMap((group) => group.items));

const activeMeta = computed(() => {
  return allItems.value.find((item) => item.id === activeId.value) || allItems.value[0];
});

const active = computed(() => {
  const fallbackId = activeMeta.value?.id || "ipg-overview";
  return ipgContent[activeId.value] || ipgContent[fallbackId] || ipgContent["ipg-overview"];
});

function onOpenApi(apiName) {
  if (apiName === "WPA") router.push("/wpa");
  else if (apiName === "IPG") router.push({ path: "/ipg", query: { section: "ipg-overview" } });
  else if (apiName === "Payment Methods") router.push({ path: "/ipg", query: { section: "ipg-payment-availability" } });
  else if (apiName === "Apple Pay") router.push({ path: "/ipg", query: { section: "ipg-apple-pay" } });
  else if (apiName === "Google Pay") router.push({ path: "/ipg", query: { section: "ipg-google-pay" } });
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
