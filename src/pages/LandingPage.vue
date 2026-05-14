<template>
  <div class="landing-shell">
    <div class="landing-bg-shape landing-bg-1"></div>
    <div class="landing-bg-shape landing-bg-2"></div>
    <div class="landing-bg-shape landing-bg-3"></div>

    <div class="landing-wrapper">
      <header class="landing-topbar">
        <div class="landing-brand">
          <img
            src="/logo.png"
            alt="iCard logo"
            class="landing-brand-logo"
          />
          <div>
            <div class="landing-brand-subtitle">
              Developer documentation hub
            </div>
          </div>
        </div>

        <div class="landing-topbar-right">
          <nav class="landing-main-nav">
            <button @click="openSectionKey = 'online-payments'">
              Online payments
            </button>
            <button @click="openSectionKey = 'in-person-payments'">
              In person payments
            </button>
            <button @click="openSectionKey = 'cards'">
              Cards
            </button>
            <button @click="openBusinessModels = true">
              Business models
            </button>
          </nav>

          <button
            class="landing-explore-btn"
            @click="scrollToId('api-overview-section')"
          >
            <BookOpenCheck :size="18" />
            Browse docs
          </button>
        </div>
      </header>

      <main>
        <section class="landing-hero">
          <div class="landing-hero-copy">
            <div class="landing-kicker">iCard developer documentation</div>

            <h1>Payment integration docs for every flow</h1>

            <p>
              Find the right iCard API, compare implementation paths and move
              from sandbox setup to signed production requests with clear,
              versioned documentation.
            </p>

            <div class="landing-hero-actions">
              <button
                class="landing-primary-btn"
                @click="goToApi('IPG')"
              >
                <BookOpenCheck :size="18" />
                Open IPG 4.5 docs
                <ArrowRight :size="18" />
              </button>

              <button
                class="landing-secondary-btn"
                @click="openBusinessModels = true"
              >
                <GitCompare :size="18" />
                Choose business model
              </button>

              <button
                class="landing-secondary-btn"
                @click="scrollToId('api-overview-section')"
              >
                <LayoutGrid :size="18" />
                Browse all APIs
              </button>
            </div>

            <div class="landing-hero-proof">
              <div v-for="metric in heroMetrics" :key="metric.label">
                <strong>{{ metric.value }}</strong>
                <span>{{ metric.label }}</span>
              </div>
            </div>
          </div>

          <div class="landing-hero-panel">
            <div class="landing-hero-panel-kicker">
              Recommended starting points
            </div>
            <div class="landing-start-list">
              <RouterLink :to="apiRoute('IPG')" class="landing-start-link">
                <span>
                  <strong>Hosted checkout and IPG API</strong>
                  <small>Versioned methods, signatures, callbacks and models</small>
                </span>
                <ArrowRight :size="18" />
              </RouterLink>

              <RouterLink :to="apiRoute('WPA')" class="landing-start-link">
                <span>
                  <strong>Direct gateway control</strong>
                  <small>WPA commands for authorization, capture and refund</small>
                </span>
                <ArrowRight :size="18" />
              </RouterLink>

              <button class="landing-start-link" @click="openBusinessModels = true">
                <span>
                  <strong>Business model selection</strong>
                  <small>Gambling, financial institution and e-commerce flows</small>
                </span>
                <ArrowRight :size="18" />
              </button>

              <RouterLink :to="apiRoute('Issuing API')" class="landing-start-link">
                <span>
                  <strong>Card issuing operations</strong>
                  <small>Clients, cards, status, limits and issuer events</small>
                </span>
                <ArrowRight :size="18" />
              </RouterLink>
            </div>
          </div>
        </section>

        <section class="landing-intro-section">
          <div>
            <div class="landing-kicker">Integration map</div>
            <h2>Start from the workflow, then open the exact reference.</h2>
          </div>
          <p>
            Use the product-family cards to narrow the documentation by payment
            channel. Each explorer keeps implementation steps, request fields,
            examples, callbacks and version notes close together, so teams can
            move through integration without hunting across separate files.
          </p>
        </section>

        <section id="product-families-section" class="landing-product-families">
          <div class="landing-section-head">
            <div class="landing-kicker">Product families</div>
            <h2>Choose the area you are integrating</h2>
          </div>

          <div class="landing-main-sections">
            <article
              class="landing-section-card"
              @click="openSectionKey = 'online-payments'"
            >
              <div class="landing-section-icon">
                <Globe :size="28" />
              </div>
              <h3>Online payments</h3>
              <p>{{ sections[0].description }}</p>
              <div class="landing-pill-row">
                <span v-for="item in sections[0].items" :key="item">
                  {{ item }}
                </span>
              </div>
            </article>

            <article
              class="landing-section-card"
              @click="openSectionKey = 'in-person-payments'"
            >
              <div class="landing-section-icon">
                <Store :size="28" />
              </div>
              <h3>In person payments</h3>
              <p>{{ sections[1].description }}</p>
              <div class="landing-pill-row">
                <span v-for="item in sections[1].items" :key="item">
                  {{ item }}
                </span>
              </div>
            </article>

            <article
              class="landing-section-card"
              @click="openSectionKey = 'cards'"
            >
              <div class="landing-section-icon">
                <CreditCard :size="28" />
              </div>
              <h3>Cards</h3>
              <p>{{ sections[2].description }}</p>
              <div class="landing-pill-row">
                <span v-for="item in sections[2].items" :key="item">
                  {{ item }}
                </span>
              </div>
            </article>
          </div>
        </section>

        <section id="get-started-section" class="landing-get-started">
          <div class="landing-section-head">
            <div class="landing-kicker">Implementation path</div>
            <h2>A cleaner way to begin</h2>
          </div>

          <div class="landing-get-started-grid">
            <article
              v-for="(step, index) in getStartedSteps"
              :key="step.title"
              class="landing-step-card"
            >
              <div class="landing-step-number">{{ index + 1 }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </article>
          </div>
        </section>

        <section class="landing-contact-section">
          <div class="landing-section-head">
            <div class="landing-kicker">Contact us</div>
            <h2>Need help with your integration?</h2>
          </div>

          <div class="landing-contact-card">
            <p>
              For product, onboarding or technical questions, use the official
              iCard Direct contact form.
            </p>

            <a
              href="https://icard.direct/en/contact-us"
              target="_blank"
              rel="noreferrer"
              class="landing-contact-link"
            >
              Open iCard Direct contact form
            </a>
          </div>
        </section>

        <section id="api-overview-section" class="highlights-section">
          <div class="section-head">
            <div class="section-kicker">API library</div>
            <h2>Open the documentation by product</h2>
            <p class="section-intro">
              Every card opens the relevant explorer page, with the headline
              matching the documentation it leads to.
            </p>
          </div>

          <div class="api-grid">
            <RouterLink
              v-for="api in apiHighlights"
              :key="api.name"
              :to="apiRoute(api.name)"
              class="api-card api-card-link"
              :aria-label="`Open ${api.name} documentation`"
            >
              <div class="api-card-topline">{{ api.group }}</div>
              <h3>{{ api.name }}</h3>
              <p>{{ api.text }}</p>
              <span class="api-card-cta">
                Open documentation
                <ArrowRight :size="16" />
              </span>
            </RouterLink>
          </div>
        </section>
      </main>

      <SiteFooter
        :onOpenApi="goToApi"
        :onOpenSection="openSectionFromFooter"
        :onOpenBusinessModels="() => (openBusinessModels = true)"
      />
    </div>

    <ApiModal
      v-if="openSection"
      :open-section="openSection"
      @close="openSectionKey = null"
      @open-api="goToApi"
    />

    <BusinessModelsModal
      :open="openBusinessModels"
      @close="openBusinessModels = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowRight,
  BookOpenCheck,
  CreditCard,
  GitCompare,
  Globe,
  LayoutGrid,
  Store,
} from "lucide-vue-next";
import "../style.css";
import SiteFooter from "../components/SiteFooter.vue";
import ApiModal from "../components/ApiModal.vue";
import BusinessModelsModal from "../components/BusinessModelsModal.vue";

const router = useRouter();

const sections = [
  {
    key: "online-payments",
    title: "Online payments",
    description:
      "Hosted checkout, direct gateway APIs, wallet methods and cart plugins for browser-based payment journeys.",
    items: [
      "WPA",
      "IPG",
      "Payment Methods",
      "Carts",
      "Apple Pay",
      "Google Pay",
    ],
  },
  {
    key: "in-person-payments",
    title: "In person payments",
    description:
      "Merchant setup and terminal-driven protocols for physical point-of-sale payment operations.",
    items: ["Merchant API", "IPP"],
  },
  {
    key: "cards",
    title: "Cards",
    description:
      "Issuer-side APIs for client onboarding, card creation, limits, statuses and lifecycle events.",
    items: ["Issuing API"],
  },
];

const apiHighlights = [
  {
    name: "WPA",
    group: "Online payments",
    text: "Direct gateway commands for server-side payment control, including authorization, capture, reversal, refund, recurring payments and transaction status.",
  },
  {
    name: "IPG",
    group: "Online payments",
    text: "Hosted and embedded payment gateway documentation with versioned methods, signatures, callbacks, implementation types and business model rules.",
  },
  {
    name: "Payment Methods",
    group: "Online payments",
    text: "Customer-facing payment options for cards and wallets, organized by checkout experience, supported flows and implementation notes.",
  },
  {
    name: "Carts",
    group: "Online payments",
    text: "Shopping-cart plugin documentation for commerce platforms, configuration steps, test credentials, production setup and refund behavior.",
  },
  {
    name: "Apple Pay",
    group: "Online payments",
    text: "Apple Pay JS SDK and IPG wallet flows for device-native checkout, tokenized card handling and reduced manual card entry.",
  },
  {
    name: "Google Pay",
    group: "Online payments",
    text: "Google Pay integration paths for fast browser checkout, tokenized wallet payloads and IPG purchase execution.",
  },
  {
    name: "Merchant API",
    group: "In person payments",
    text: "Administrative and provisioning API for merchant hierarchy, company setup, merchant records and terminal management.",
  },
  {
    name: "IPP",
    group: "In person payments",
    text: "Terminal communication protocol for card-present purchase, refund, reversal, complete, cancel and transaction-state operations.",
  },
  {
    name: "Issuing API",
    group: "Cards",
    text: "Issuer-side platform APIs for clients, physical and virtual cards, limits, status changes, security retrieval and events.",
  },
];

const getStartedSteps = [
  {
    title: "Choose the payment context",
    text: "Start with online payments, in-person acceptance or card issuing, then narrow the flow by product and business model.",
  },
  {
    title: "Confirm the version and model",
    text: "For IPG, select the protocol version and business model first so mandatory fields, methods and differences stay aligned.",
  },
  {
    title: "Build from the reference",
    text: "Use each explorer for request fields, response fields, signing rules, callbacks, examples and go-live environment details.",
  },
];

const heroMetrics = [
  {
    value: "4.5",
    label: "latest IPG version",
  },
  {
    value: "3",
    label: "IPG business models",
  },
  {
    value: "9",
    label: "documentation areas",
  },
];

const openSectionKey = ref(null);
const openBusinessModels = ref(false);

const openSection = computed(() => {
  return sections.find((section) => section.key === openSectionKey.value) || null;
});

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function openSectionFromFooter(sectionKey) {
  openSectionKey.value = sectionKey;
}

function goToApi(apiName) {
  openSectionKey.value = null;
  router.push(apiRoute(apiName));
}

function apiRoute(apiName) {
  if (apiName === "WPA") {
    return "/wpa";
  }

  if (apiName === "IPG") {
    return { path: "/ipg", query: { section: "ipg-overview" } };
  }

  if (apiName === "Payment Methods") {
    return { path: "/ipg", query: { section: "pm-overview" } };
  }

  if (apiName === "Apple Pay") {
    return { path: "/ipg", query: { section: "pm-apple-overview" } };
  }

  if (apiName === "Google Pay") {
    return { path: "/ipg", query: { section: "pm-google-overview" } };
  }

  if (apiName === "Carts") {
    return { path: "/carts", query: { section: "carts-overview" } };
  }

  if (apiName === "Merchant API") {
    return {
      path: "/merchant-api",
      query: { section: "merchant-overview" },
    };
  }

  if (apiName === "IPP") {
    return { path: "/ipp", query: { section: "ipp-overview" } };
  }

  if (apiName === "Issuing API") {
    return {
      path: "/issuing-api",
      query: { section: "issuing-overview" },
    };
  }

  return "/";
}
</script>
