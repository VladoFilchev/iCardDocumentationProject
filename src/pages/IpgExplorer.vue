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

        <section v-if="activeGuidance.length" class="doc-section">
          <h2>Implementation Guidance</h2>
          <p class="section-copy">
            Practical checks for understanding and implementing this IPG 4.5 section.
          </p>
          <div class="guidance-grid">
            <article
              v-for="item in activeGuidance"
              :key="item.title"
              class="guidance-card"
            >
              <strong>{{ item.title }}</strong>
              <span>{{ item.description }}</span>
            </article>
          </div>
        </section>

        <section
          v-for="section in active.detailSections || []"
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

        <section v-if="activeExamples.length" class="doc-section">
          <h2>{{ active.examplesTitle || "Examples" }}</h2>
          <div class="callback-example-grid">
            <article
              v-for="example in activeExamples"
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

          <div v-if="hasDifferenceContent" class="difference-panel">
            <div class="code-panel-header">
              <div class="code-label">Version Differences</div>
              <span class="mini-label">{{ selectedVersionMeta.label }}</span>
            </div>
            <div class="difference-list">
              <div
                v-for="item in activeDifferences"
                :key="item.title"
                class="difference-item"
              >
                <strong>{{ item.title }}</strong>
                <span>{{ item.description }}</span>
              </div>
            </div>
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

function getSingleQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
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
    const normalized = normalizeVersion(newValue);
    selectedVersion.value = normalized;
    const version = getSingleQueryValue(newValue);
    if (version && version !== normalized) {
      updateIpgRoute({ version: normalized });
    }
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

const callbackExampleTitles = [
  "Declined 3DS - frictionless flow",
  "Failed merchant validation",
  "Declined 3DS - challenge flow",
  "Declined payment",
  "Success payment",
];

function getCallbackExampleDescription(title) {
  if (title === "Success payment") return "Successful authorization callback.";
  if (title === "Declined payment") return "Authorization declined by the provider or issuer.";
  if (title === "Failed merchant validation") return "Merchant validation failure callback with an Errors array.";
  if (title.includes("challenge")) return "3DS challenge decline callback.";
  return "3DS frictionless decline callback.";
}

function splitCallbackExamples(value) {
  if (!hasSnippet(value)) return [];

  return callbackExampleTitles
    .map((title, index) => {
      const start = value.indexOf(title);
      if (start === -1) return null;

      const nextTitlePosition = callbackExampleTitles
        .slice(index + 1)
        .map((nextTitle) => value.indexOf(nextTitle, start + title.length))
        .find((position) => position !== -1);
      const end = nextTitlePosition ?? value.length;

      return {
        title,
        description: getCallbackExampleDescription(title),
        code: value.slice(start + title.length, end).trim(),
      };
    })
    .filter(Boolean);
}

const activeExamples = computed(() => {
  if (Array.isArray(active.value?.examples)) return active.value.examples;
  if (activeId.value === "ipg-callback-examples") {
    return splitCallbackExamples(active.value?.example);
  }
  return [];
});

const hasRequestSnippet = computed(() => hasSnippet(active.value?.request));
const hasResponseSnippet = computed(() => hasSnippet(active.value?.response));
const hasExampleSnippet = computed(
  () => activeId.value !== "ipg-callback-examples" && hasSnippet(active.value?.example)
);
const activeDifferences = computed(() =>
  Array.isArray(active.value?.differences) ? active.value.differences.filter(Boolean) : []
);
const hasDifferenceContent = computed(() => activeDifferences.value.length > 0);
const hasCodeContent = computed(
  () =>
    hasRequestSnippet.value ||
    hasResponseSnippet.value ||
    hasExampleSnippet.value ||
    hasDifferenceContent.value
);

const callbackSourceSummary =
  "Allow the active environment source address before testing: Production IPv4 185.161.233.7, Production IPv6 2a07:c881::7, or Sandbox IPv4 82.119.81.211.";

const guidanceBySection = {
  general: [
    {
      title: "Confirm scope first",
      description:
        "Confirm the selected business model, protocol version, enabled methods, MID, Originator, and supported currencies with iCard before implementation.",
    },
    {
      title: "Build in Sandbox",
      description:
        "Use Sandbox credentials and endpoints until request signing, callback processing, error handling, and the required test scenarios are validated.",
    },
    {
      title: "Keep environments separate",
      description:
        "Store Sandbox and Production endpoints, credentials, keys, MIDs, and callback allowlists in separate configuration profiles.",
    },
    {
      title: "Prepare operational logging",
      description:
        "Log OrderID, IPG method, environment, response status, callback status, and IPG transaction reference without logging sensitive card data or private keys.",
    },
  ],
  security: [
    {
      title: "Protect private keys",
      description:
        "Keep the merchant private key in a secrets manager or protected key store. Never expose it to browser code, source control, logs, or support messages.",
    },
    {
      title: "Canonicalize exactly",
      description:
        "Small differences in key casing, natural sorting, Boolean conversion, empty values, UTF-8 encoding, or semicolon joining will produce an invalid signature.",
    },
    {
      title: "Verify before processing",
      description:
        "Verify every signed response and callback with the iCard public key before updating orders, storing CardToken values, or initiating follow-up operations.",
    },
    {
      title: "Plan key rotation",
      description:
        "Use KeyIndex and KeyIndexResp consistently and maintain a controlled rotation procedure so old and new keys can be handled during transition periods.",
    },
  ],
  callbacks: [
    {
      title: "Allow the correct source",
      description: callbackSourceSummary,
    },
    {
      title: "Verify and process idempotently",
      description:
        "Verify Signature first, then process the event idempotently using stable identifiers such as OrderId and provider transaction references.",
    },
    {
      title: "Acknowledge only after acceptance",
      description:
        "Return HTTP 200 OK only after the callback is parsed, verified, and durably accepted for processing. Non-200 responses trigger retries.",
    },
    {
      title: "Use callbacks as the source of truth",
      description:
        "Do not mark a payment successful from the browser redirect alone. Use the verified backend callback to determine the final payment outcome.",
    },
  ],
  implementation: [
    {
      title: "Choose one primary checkout flow",
      description:
        "Select Redirect, Embedded, Modal, or a wallet-specific SDK flow according to the required customer experience and supported business model.",
    },
    {
      title: "Keep signing on the backend",
      description:
        "Create signatures, hold credentials, and communicate with IPG from the merchant backend. Browser code should never receive private signing material.",
    },
    {
      title: "Implement the complete lifecycle",
      description:
        "Cover initiation, synchronous response verification, callback handling, cancellation or retry behavior, and the model-specific backend methods.",
    },
    {
      title: "Test failure paths",
      description:
        "Test declines, invalid signatures, unavailable wallets, customer cancellation, callback retries, duplicate callbacks, and temporary network failures.",
    },
  ],
  methods: [
    {
      title: "Validate every mandatory field",
      description:
        "Build requests from the parameter table, enforce documented formats and lengths, and reject missing or malformed values before signing.",
    },
    {
      title: "Use a unique OrderID",
      description:
        "Generate and persist a unique OrderID before sending the request. Use it to correlate the request, response, callback, support case, and reconciliation data.",
    },
    {
      title: "Verify synchronous responses",
      description:
        "Verify the response Signature and inspect Status and StatusMsg before using returned URLs, tokens, transaction references, or other response data.",
    },
    {
      title: "Design retry-safe behavior",
      description:
        "Do not blindly resend payment or payout operations after timeouts. Check the documented status or reversal path and protect against duplicate execution.",
    },
  ],
  models: [
    {
      title: "Use only model-supported methods",
      description:
        "The selected business model determines which wallet flows and backend methods are permitted. Do not assume a method available in another model is enabled.",
    },
    {
      title: "Check field differences",
      description:
        "Review model-specific mandatory fields, OrderID length rules, payout or refund references, and wallet implementation differences before coding.",
    },
    {
      title: "Test the real model workflow",
      description:
        "Certification should cover the exact business flow: deposits and OCT for Gambling, disbursement for Financial Institution, or purchases and refunds for E-commerce.",
    },
    {
      title: "Document operational ownership",
      description:
        "Define who monitors callbacks, investigates timeouts, performs reversals or refunds, and contacts iCard support after launch.",
    },
  ],
};

const activeGuidance = computed(() => {
  if (selectedVersion.value !== "4.5") return [];

  if (activeId.value.startsWith("ipg-callback")) return guidanceBySection.callbacks;
  if (active.value?.subtitle === "Security & Signatures") return guidanceBySection.security;
  if (active.value?.subtitle === "Implementation Types" || active.value?.subtitle === "Wallet Deposits") {
    return guidanceBySection.implementation;
  }
  if (active.value?.subtitle === "API Methods" || active.value?.subtitle === "Backend Methods") {
    return guidanceBySection.methods;
  }
  if (active.value?.subtitle === "Business Models" || active.value?.subtitle === "Business Model") {
    return guidanceBySection.models;
  }
  return guidanceBySection.general;
});

function updateIpgRoute(nextQuery) {
  router.replace({
    path: "/ipg",
    query: {
      ...route.query,
      ...nextQuery,
    },
  });
}

const initialVersionQuery = getSingleQueryValue(route.query.version);
if (initialVersionQuery && initialVersionQuery !== selectedVersion.value) {
  updateIpgRoute({ version: selectedVersion.value });
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
