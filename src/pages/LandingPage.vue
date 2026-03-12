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
              Developer documentation
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
            @click="scrollToId('get-started-section')"
          >
            Explore documentation
          </button>
        </div>
      </header>

      <main>
        <section class="landing-hero">
          <div class="landing-hero-copy">
            <div class="landing-kicker">Developer documentation</div>

            <h1>Everything for payments</h1>

            <p>
              Structured product documentation for online payments, in person
              payments, cards and business-specific payment models. Use this
              landing page as the main entry point to each explorer section.
            </p>

            <div class="landing-hero-actions">
              <button
                class="landing-primary-btn"
                @click="scrollToId('get-started-section')"
              >
                Get started
              </button>

              <button
                class="landing-secondary-btn"
                @click="goToApi('WPA')"
              >
                Open WPA explorer
              </button>
            </div>
          </div>

          <div class="landing-hero-panel">
            <div class="landing-hero-panel-kicker">
              Documentation structure
            </div>
            <div class="landing-hero-panel-list">
              <div>Online payments</div>
              <div>In person payments</div>
              <div>Cards</div>
              <div>Business models</div>
            </div>
          </div>
        </section>

        <section class="landing-main-sections">
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
        </section>

        <section id="get-started-section" class="landing-get-started">
          <div class="landing-section-head">
            <div class="landing-kicker">Get started</div>
            <h2>How to begin</h2>
          </div>

          <div class="landing-get-started-grid">
            <div
              v-for="(step, index) in getStartedSteps"
              :key="step.title"
              class="landing-step-card"
            >
              <div class="landing-step-number">{{ index + 1 }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </div>
          </div>
        </section>

        <section class="landing-short-explanations">
          <div class="landing-section-head">
            <div class="landing-kicker">Overview</div>
            <h2>Short explanations</h2>
          </div>

          <div class="landing-short-grid">
            <div
              v-for="item in shortHighlights"
              :key="item.title"
              class="landing-info-card"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
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

        <section class="highlights-section">
          <div class="section-head">
            <div class="section-kicker">APIs overview</div>
            <h2>What is unique about each API</h2>
          </div>

          <div class="api-grid">
            <article
              v-for="api in apiHighlights"
              :key="api.name"
              class="api-card"
            >
              <div class="api-card-topline">{{ api.group }}</div>
              <h3>{{ api.name }}</h3>
              <p>{{ api.text }}</p>
            </article>
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
import { Globe, Store, CreditCard } from "lucide-vue-next";
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
      "Web-based payment flows for hosted checkout, direct gateway requests, payment methods and cart-driven journeys.",
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
      "Terminal and merchant-side integrations for physical point-of-sale payment operations.",
    items: ["Merchant API", "IPP"],
  },
  {
    key: "cards",
    title: "Cards",
    description:
      "Card issuing and lifecycle management for card programs, limits, status updates and issuer-side operations.",
    items: ["Issuing API"],
  },
];

const apiHighlights = [
  {
    name: "WPA",
    group: "Online payments",
    text: "WPA is the direct XML-based gateway for merchants that want deeper server-side control over the payment flow. It is best suited for authorizations, captures, reversals, refunds, recurring scenarios and transaction retrieval. Its main strength is the low-level command-based model with JWT-secured requests.",
  },
  {
    name: "IPG",
    group: "Online payments",
    text: "IPG is the hosted payment gateway for merchants who want iCard to handle the checkout page, card data entry and callback flow. It is ideal for hosted checkout, stored cards, recurring payments and redirect-based customer journeys. Its key advantage is faster implementation with a structured front-end and back-office model.",
  },
  {
    name: "Payment Methods",
    group: "Online payments",
    text: "Payment Methods is the presentation layer for supported payment options across regions and use cases. It helps structure how methods like cards and wallets are exposed to the customer at checkout. Its value is in making the payment experience easier to organize and scale.",
  },
  {
    name: "Carts",
    group: "Online payments",
    text: "Carts focuses on the payment-ready cart and checkout composition side of the e-commerce journey. It can be used to structure item-based checkout presentation before payment execution. Its role is to connect commerce data with payment-facing flows.",
  },
  {
    name: "Apple Pay",
    group: "Online payments",
    text: "Apple Pay is a wallet-based payment experience designed for Apple ecosystem users. It is used when merchants want a faster, device-native checkout flow with tokenized card handling. Its uniqueness is the streamlined customer experience with reduced manual card entry.",
  },
  {
    name: "Google Pay",
    group: "Online payments",
    text: "Google Pay is a wallet payment method designed for fast checkout across supported devices and browsers. It is useful when merchants want a modern, low-friction payment option alongside traditional card flows. Its main strength is convenience and token-based wallet processing.",
  },
  {
    name: "Merchant API",
    group: "In person payments",
    text: "Merchant API is the onboarding and hierarchy-management interface for merchant and terminal setup. It is used to create and manage company, merchant and terminal entities inside the iCard operational structure. Its uniqueness is that it serves the administrative and provisioning side of in-person acceptance.",
  },
  {
    name: "IPP",
    group: "In person payments",
    text: "IPP is the terminal communication protocol for card-present transactions and device-driven payment stages. It is used for purchase, refund, reversal, complete, cancel and transaction-state interactions with payment terminals. Its strength is the stage-based communication model for physical payment devices.",
  },
  {
    name: "Issuing API",
    group: "Cards",
    text: "Issuing API is the platform interface for card program operations on the issuer side. It is used for onboarding clients, creating physical or virtual cards, controlling limits, managing status and handling authorization or 3DS-related events. Its uniqueness is that it supports full card lifecycle management rather than merchant acquiring.",
  },
];

const getStartedSteps = [
  {
    title: "Choose the product family",
    text: "Start from Online payments, In person payments, Cards or Business models depending on your project scope.",
  },
  {
    title: "Open the right integration path",
    text: "Move into WPA, IPG, Payment Methods, Carts, Merchant API, IPP or Issuing API depending on your implementation.",
  },
  {
    title: "Build with endpoint references",
    text: "Use the explorer pages for commands, fields, request snippets, callbacks and response examples.",
  },
];

const shortHighlights = [
  {
    title: "Online payments",
    text: "Hosted checkout, direct payment APIs, wallet methods and cart plugins for browser-based payment journeys.",
  },
  {
    title: "In person payments",
    text: "Merchant onboarding, terminal control and point-of-sale transaction communication for physical acceptance.",
  },
  {
    title: "Cards",
    text: "Client onboarding, card issuing, card status management, security retrieval and event-based issuer operations.",
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

  if (apiName === "WPA") {
    router.push("/wpa");
    return;
  }

  if (apiName === "IPG") {
    router.push({ path: "/ipg", query: { section: "ipg-overview" } });
    return;
  }

  if (apiName === "Payment Methods") {
    router.push({ path: "/ipg", query: { section: "pm-overview" } });
    return;
  }

  if (apiName === "Apple Pay") {
    router.push({ path: "/ipg", query: { section: "pm-apple-overview" } });
    return;
  }

  if (apiName === "Google Pay") {
    router.push({ path: "/ipg", query: { section: "pm-google-overview" } });
    return;
  }

  if (apiName === "Carts") {
    router.push({ path: "/carts", query: { section: "carts-overview" } });
    return;
  }

  if (apiName === "Merchant API") {
    router.push({
      path: "/merchant-api",
      query: { section: "merchant-overview" },
    });
    return;
  }

  if (apiName === "IPP") {
    router.push({ path: "/ipp", query: { section: "ipp-overview" } });
    return;
  }

  if (apiName === "Issuing API") {
    router.push({
      path: "/issuing-api",
      query: { section: "issuing-overview" },
    });
  }
}
</script>