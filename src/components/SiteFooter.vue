<template>
  <footer class="site-footer">
    <div class="site-footer-grid">
      <div class="site-footer-brand">
        <img
          src="/logo.png"
          alt="iCard logo"
          class="site-footer-logo"
        />
        <p class="site-footer-brand-text">
          Structured developer documentation for online payments, in person
          payments, cards and business models.
        </p>
      </div>

      <div class="site-footer-column">
        <h4>Fast links</h4>
        <button @click="onOpenApi?.('WPA')">WPA</button>
        <button @click="onOpenApi?.('IPG')">IPG</button>
        <button @click="onOpenApi?.('Payment Methods')">
          Payment Methods
        </button>
        <button @click="onOpenApi?.('Carts')">Carts</button>
        <button @click="onOpenApi?.('Merchant API')">
          Merchant API
        </button>
        <button @click="onOpenApi?.('IPP')">IPP</button>
        <button @click="onOpenApi?.('Issuing API')">
          Issuing API
        </button>
      </div>

      <div class="site-footer-column">
        <h4>General info</h4>
        <button @click="onOpenSection?.('online-payments')">
          Online payments
        </button>
        <button @click="onOpenSection?.('in-person-payments')">
          In person payments
        </button>
        <button @click="onOpenSection?.('cards')">Cards</button>
        <button @click="onOpenBusinessModels?.()">
          Business models
        </button>
      </div>

      <div class="site-footer-column">
        <h4>Contact us</h4>
        <p>
          For product, onboarding and technical questions, use the official
          iCard Direct contact page.
        </p>
        <a
          href="https://icard.direct/en/contact-us"
          target="_blank"
          rel="noreferrer"
          class="site-footer-contact-link"
        >
          Open contact form
        </a>
      </div>
    </div>

    <div class="site-footer-bottom">
      <div>© 2026 iCard Developer Documentation. All rights reserved.</div>
      <div>Built for product, marketing and engineering use.</div>
    </div>
  </footer>
</template>

<script setup>
import "./SiteFooter.css";

defineProps({
  onOpenApi: Function,
  onOpenSection: Function,
  onOpenBusinessModels: Function,
});
</script>