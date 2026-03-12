export const cartsMenu = [
  {
    title: "General",
    items: [
      { id: "carts-overview", label: "Overview", type: "overview" },
      { id: "carts-supported-platforms", label: "Supported platforms", type: "guide" },
      { id: "carts-how-it-works", label: "How it works", type: "guide" },
      { id: "carts-currencies-countries", label: "Currencies & countries", type: "guide" },
      { id: "carts-security", label: "Security features", type: "guide" },
      { id: "carts-troubleshooting", label: "Troubleshooting", type: "guide" },
    ],
  },
  {
    title: "WooCommerce",
    items: [
      { id: "carts-woo-installation", label: "Installation", type: "guide" },
      { id: "carts-woo-configuration", label: "Configuration", type: "guide" },
      { id: "carts-woo-refunds", label: "Refund management", type: "guide" },
      { id: "carts-woo-statuses", label: "Order status management", type: "guide" },
      { id: "carts-woo-requirements", label: "Requirements", type: "schema" },
    ],
  },
  {
    title: "Joomla VirtueMart",
    items: [
      { id: "carts-joomla-installation", label: "Installation", type: "guide" },
      { id: "carts-joomla-configuration", label: "Configuration", type: "guide" },
      { id: "carts-joomla-refunds", label: "Refund management", type: "guide" },
      { id: "carts-joomla-requirements", label: "Requirements", type: "schema" },
    ],
  },
  {
    title: "OpenCart",
    items: [
      { id: "carts-opencart-installation", label: "Installation", type: "guide" },
      { id: "carts-opencart-configuration", label: "Configuration", type: "guide" },
      { id: "carts-opencart-statuses", label: "Order statuses", type: "guide" },
      { id: "carts-opencart-requirements", label: "Requirements", type: "schema" },
    ],
  },
  {
    title: "Zen Cart",
    items: [
      { id: "carts-zencart-installation", label: "Installation", type: "guide" },
      { id: "carts-zencart-configuration", label: "Configuration", type: "guide" },
      { id: "carts-zencart-statuses", label: "Order statuses", type: "guide" },
      { id: "carts-zencart-requirements", label: "Requirements", type: "schema" },
    ],
  },
  {
  title: "PrestaShop",
  items: [
    { id: "carts-prestashop-installation", label: "Installation", type: "guide" },
    { id: "carts-prestashop-configuration", label: "Configuration", type: "guide" },
    { id: "carts-prestashop-refunds", label: "Refund management", type: "guide" },
    { id: "carts-prestashop-statuses", label: "Order status management", type: "guide" },
    { id: "carts-prestashop-requirements", label: "Requirements", type: "schema" },
  ],
},
];

export const cartsContent = {
  "carts-overview": {
  title: "Carts",
  subtitle: "Overview",
  description:
    "The Carts section covers ready-made iCard Checkout plugins for popular e-commerce platforms. These plugins follow the same core model: the customer selects iCard Checkout, is redirected to iCard’s secure payment page, completes the payment there, returns to the store, and the platform receives a secure notification so the order status can be updated automatically.",
  facts: [
    "Hosted checkout plugin model",
    "Redirect + notification flow",
    "Unified configuration pattern",
  ],
  body: [
    "The currently documented cart plugins are WooCommerce, Joomla VirtueMart, OpenCart, Zen Cart and PrestaShop.",
    "Across all five platforms, the plugin family supports major debit and credit cards, test mode, multi-currency setup, order status updates, secure signed requests and response verification.",
    "The main differences are in installation path, admin menu structure, field labels and platform-specific order/refund handling.",
  ],
  table: {
    headers: ["Supported plugin", "Platform", "Highlights"],
    rows: [
      ["iCard Checkout for WooCommerce", "WordPress / WooCommerce", "Plugin install, test mode, logging, refunds, order states"],
      ["iCard Checkout for Joomla VirtueMart", "Joomla / VirtueMart", "Extension install, test mode, refunds, order tracking"],
      ["iCard Checkout for OpenCart", "OpenCart", "Extension installer, payment statuses, logging, developer/production config"],
      ["iCard Checkout for Zen Cart", "Zen Cart", "Payment module install, test mode, order status mapping"],
      ["iCard Checkout for PrestaShop", "PrestaShop", "Addons marketplace install, test mode, logging, refunds, custom order states"],
    ],
  },
  request: `Supported plugins
- WooCommerce
- Joomla VirtueMart
- OpenCart
- Zen Cart
- PrestaShop`,
  response: `All plugins implement the same high-level checkout path:
Store checkout -> iCard secure payment page -> return URL -> secure notification -> order update`,
},

  "carts-supported-platforms": {
  title: "Supported platforms",
  subtitle: "General",
  description:
    "The available cart integrations documented in the current project are WooCommerce, Joomla VirtueMart, OpenCart, Zen Cart and PrestaShop.",
  facts: [
    "WooCommerce plugin",
    "Joomla VirtueMart plugin",
    "OpenCart plugin",
    "Zen Cart plugin",
    "PrestaShop plugin",
  ],
  body: [
    "WooCommerce documentation includes plugin installation through WordPress admin, payment settings, logging, full and partial refunds, custom order states and debug mode.",
    "Joomla VirtueMart documentation includes extension installation from Joomla, payment method activation, test/production credentials and refund management from the order page.",
    "OpenCart documentation covers extension installer flow, payment configuration, developer and production credentials, status mapping and log-based debugging.",
    "Zen Cart documentation covers plugin download, file upload, payment module install, credential configuration and order status setup.",
    "PrestaShop documentation covers Addons marketplace installation, Module Manager upload flow, test mode, logging, developer and production settings, refund management, translated order states and setup verification.",
  ],
  request: `Each platform has its own admin menu path and configuration screen.`,
  response: `Use the platform-specific section in the explorer for the exact installation and configuration flow.`,
},

  "carts-how-it-works": {
    title: "How it works",
    subtitle: "General",
    description:
      "The cart integrations share the same checkout behavior across platforms.",
    facts: [
      "Customer selects iCard Checkout",
      "Redirect to secure payment page",
      "Return + secure notification",
    ],
    body: [
      "On all documented platforms, the shopper chooses iCard Checkout during checkout and is redirected to iCard’s secure payment page.",
      "After payment completion, the customer is returned to the store’s thank-you or success page.",
      "Separately, iCard sends a secure notification so the store can confirm the transaction and update the order status automatically.",
    ],
    request: `1. Customer selects iCard Checkout
2. Redirect to iCard secure payment page
3. Customer completes payment
4. Customer returns to store
5. Store receives secure notification
6. Order status is updated`,
    response: `Result: hosted payment flow with automatic order synchronization`,
  },

  "carts-currencies-countries": {
    title: "Currencies & countries",
    subtitle: "General",
    description:
      "The documented cart plugins expose the same main supported currency and availability footprint.",
    facts: [
      "EUR, USD, GBP, CHF, RON, CZK",
      "Available across multiple European markets",
      "Same core list across the plugin docs",
    ],
    table: {
      headers: ["Currency", "Code"],
      rows: [
        ["EUR", "978"],
        ["USD", "840"],
        ["GBP", "826"],
        ["CHF", "756"],
        ["RON", "946"],
        ["CZK", "203"],
      ],
    },
    body: [
      "The country availability list in the documents includes Austria, Belgium, Bulgaria, Croatia, Republic of Cyprus, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain and Sweden.",
    ],
    request: `Currencies: EUR, USD, GBP, CHF, RON, CZK`,
    response: `Use the store currency field in each platform configuration with the ISO numeric format required by the plugin.`,
  },

  "carts-security": {
    title: "Security features",
    subtitle: "General",
    description:
      "The cart plugins are built around signed requests, secure notifications and standard payment-security protections.",
    facts: [
      "SHA256 request signing",
      "Response verification",
      "HTTPS + 3D Secure support",
    ],
    body: [
      "Across the uploaded plugin guides, the common security features include cryptographic request signing using SHA256, verification of payment notifications, HTTPS communication, PCI-DSS compliant processing and 3D Secure support.",
      "The documents also mention fraud protection, input validation and rate limiting. WooCommerce, Joomla and Zen Cart additionally mention prepared statements or escaped output protections in their broader security descriptions.",
    ],
    request: `Security layers
- Request signing
- Response verification
- HTTPS communication
- 3D Secure support`,
    response: `The merchant store should also keep valid SSL and correct callback accessibility.`,
  },

  "carts-troubleshooting": {
    title: "Troubleshooting",
    subtitle: "General",
    description:
      "The most common cart-plugin issues are configuration, signature, connection and order-status update problems.",
    facts: [
      "Invalid signature",
      "Connection errors",
      "Module not configured",
    ],
    table: {
      headers: ["Issue", "Typical fix"],
      rows: [
        ["Module not properly configured", "Check required fields, currency support and credentials"],
        ["Invalid signature", "Verify private key and iCard public certificate / public key"],
        ["Connection error", "Verify gateway URL, SSL and server cURL/OpenSSL support"],
        ["Order status not updating", "Check callback URL reachability and order-status mapping"],
      ],
    },
    request: `Typical debugging inputs:
- logging / debug mode
- credential validation
- callback URL accessibility`,
    response: `Start with environment setup, then keys/certificates, then callback reachability.`,
  },

  "carts-woo-installation": {
    title: "WooCommerce · Installation",
    subtitle: "WooCommerce",
    description:
      "Install the WooCommerce plugin through WordPress admin and activate it from the installed plugins list.",
    body: [
      "The WooCommerce guide states that the plugin can be found from the latest iCard plugin entry for WooCommerce, and that the documented environment requires WordPress 6.8 and is tested up to WordPress 6.8.3.",
      "The installation flow is: sign in to WordPress admin, open Plugins > Add New, search for iCard Checkout, download the WooCommerce zip package, upload the plugin and activate it.",
    ],
    request: `WordPress admin
1. Plugins > Add New
2. Search iCard Checkout
3. Download zip
4. Upload plugin
5. Activate plugin`,
    response: `After activation, the plugin appears in the Installed Plugins section.`,
  },

  "carts-woo-configuration": {
    title: "WooCommerce · Configuration",
    subtitle: "WooCommerce",
    description:
      "Configure the plugin from WooCommerce payment settings and choose test or production credentials.",
    table: {
      headers: ["Field", "Meaning"],
      rows: [
        ["Status", "Enable iCard Checkout as a payment method"],
        ["Test Mode", "Enable developer/testing environment"],
        ["Logging", "Enable debug logging"],
        ["Store MID", "Merchant ID"],
        ["Store Currency", "3-digit ISO currency"],
        ["CID - originator", "Originator / client ID"],
        ["Private Key", "Merchant private key"],
        ["iCard Public Certificate", "iCard public certificate"],
        ["Developer url / Production url", "Gateway endpoint"],
        ["Key Index / KeyResp Index", "Signing and response indexes"],
      ],
    },
    body: [
      "The WooCommerce admin path is Dashboard > WooCommerce > Settings > Payments > iCard Checkout > Manage.",
      "The guide separates Developer (Test) and Production configuration and explicitly mentions the sandbox URL and production URL.",
    ],
    request: `Developer URL:
https://dev-ipg.icards.eu/sandbox/

Production URL:
https://ipg.icard.com/`,
    response: `After entering all fields, save changes to apply the settings.`,
  },

  "carts-woo-refunds": {
    title: "WooCommerce · Refund management",
    subtitle: "WooCommerce",
    description:
      "WooCommerce includes the most detailed refund functionality in the uploaded cart guides.",
    facts: [
      "Full refunds",
      "Partial refunds",
      "Rate-limited refund attempts",
    ],
    body: [
      "The WooCommerce plugin supports full refunds and partial refunds directly from the order page. It also tracks refund history, validates the transaction ID, validates the refund amount against the order total and updates order status automatically.",
      "The document also notes a rate limit of 3 refund attempts per 5 minutes per order and support for multiple partial refunds, including partially refunded status and order slip generation.",
    ],
    request: `Refund flow
1. Open WooCommerce order details
2. Locate iCard Refund Management
3. Enter refund amount
4. Process refund`,
    response: `Result: order status and refund history are updated automatically.`,
  },

  "carts-woo-statuses": {
    title: "WooCommerce · Order status management",
    subtitle: "WooCommerce",
    description:
      "The WooCommerce plugin includes automatic payment and refund state mapping.",
    table: {
      headers: ["Status type", "Examples"],
      rows: [
        ["Payment statuses", "Payment accepted, Payment error, Payment declined"],
        ["Refund statuses", "Refunded, Partially refunded, Payment accepted"],
        ["Custom order states", "Plugin can create custom translated states if needed"],
      ],
    },
    request: `Automatic status management for successful, failed and refunded orders`,
    response: `WooCommerce can create custom order states and translations when needed.`,
  },

  "carts-woo-requirements": {
    title: "WooCommerce · Requirements",
    subtitle: "WooCommerce",
    description:
      "Minimum and tested WooCommerce / WordPress information exposed in the guide.",
    table: {
      headers: ["Requirement", "Value"],
      rows: [
        ["WooCommerce", "6.8 or higher"],
        ["WordPress required", "6.8"],
        ["Tested up to WordPress", "6.8.3"],
      ],
    },
    request: `Platform requirement: WooCommerce / WordPress`,
    response: `Use this section when building the requirements block in the page.`,
  },

  "carts-joomla-installation": {
    title: "Joomla VirtueMart · Installation",
    subtitle: "Joomla VirtueMart",
    description:
      "The Joomla guide uses the Joomla extensions directory and VirtueMart payment-method enablement flow.",
    body: [
      "The documented path is: log in to the official Joomla extensions directory, search for iCard Checkout, open the module page, download the VirtueMart zip package, upload it from Admin page > System > Extensions > Upload Package File, then enable the plugin from Extensions > Manage Extensions.",
      "After enabling it, a new payment method is added in VirtueMart.",
    ],
    request: `Joomla flow
1. Search in Joomla extensions
2. Download iCard Checkout for VirtueMart
3. Upload package file
4. Enable plugin
5. Add payment method in VirtueMart`,
    response: `After installation, proceed to the payment method configuration screen.`,
  },

  "carts-joomla-configuration": {
    title: "Joomla VirtueMart · Configuration",
    subtitle: "Joomla VirtueMart",
    description:
      "Joomla VirtueMart configuration includes test mode, refunds and developer/production credential blocks.",
    table: {
      headers: ["Field", "Meaning"],
      rows: [
        ["Merchant ID", "Test or production MID"],
        ["Client ID", "Originator ID"],
        ["Currency", "3-digit ISO currency code"],
        ["Private Key", "Merchant private key"],
        ["Public Key", "iCard public key"],
        ["Key Index", "Signing key index"],
        ["Key Response Index", "Response key index"],
        ["Development Gateway URL", "Sandbox endpoint"],
        ["Production Gateway URL", "Production endpoint"],
      ],
    },
    body: [
      "The Joomla guide explicitly says to enable Test Mode and Refunds first, then populate either Development or Production settings.",
      "Its sandbox gateway URL is documented as https://dev-ipg2.icards.eu/trunk/ and the production URL as https://ipg.icard.com/.",
    ],
    request: `Development Gateway URL:
https://dev-ipg2.icards.eu/trunk/

Production Gateway URL:
https://ipg.icard.com/`,
    response: `Save the payment method configuration after filling all credentials.`,
  },

  "carts-joomla-refunds": {
    title: "Joomla VirtueMart · Refund management",
    subtitle: "Joomla VirtueMart",
    description:
      "Joomla VirtueMart includes direct refund management from the admin order page.",
    facts: [
      "Full refunds",
      "Partial refunds",
      "Refund history tracking",
    ],
    body: [
      "The Joomla guide documents full refunds, partial refunds, automatic order status updates, transaction tracking, refund amount validation and transaction ID validation.",
      "The refund flow is: open the order details page in admin, locate the iCard Refund Management section, enter the refund amount and process the refund.",
    ],
    request: `Refund flow
1. Open admin order details
2. Locate iCard Refund Management
3. Enter refund amount
4. Process refund`,
    response: `The plugin validates and processes the refund, then updates the order.`,
  },

  "carts-joomla-requirements": {
    title: "Joomla VirtueMart · Requirements",
    subtitle: "Joomla VirtueMart",
    description:
      "Platform versions and basic operational requirements documented for the Joomla plugin.",
    table: {
      headers: ["Requirement", "Value"],
      rows: [
        ["Joomla", "5.4+"],
        ["VirtueMart", "4.4+"],
      ],
    },
    request: `Platform requirement: Joomla + VirtueMart`,
    response: `Use this section for the platform compatibility card.`,
  },

  "carts-opencart-installation": {
    title: "OpenCart · Installation",
    subtitle: "OpenCart",
    description:
      "OpenCart installation uses the official marketplace download and the built-in Extension Installer.",
    body: [
      "The guide says to search for iCard Checkout at opencart.com, open the extension page, download it, log in to the OpenCart account and store admin, then upload the zip file through Extensions >> Installer.",
      "Once the extension appears under Installed Extensions, it is installed with the green action button.",
    ],
    request: `OpenCart flow
1. Search at opencart.com
2. Download extension
3. Sign in to store admin
4. Extensions >> Installer
5. Upload zip
6. Install iCard Checkout`,
    response: `The extension then appears in the installed payment methods list.`,
  },

  "carts-opencart-configuration": {
    title: "OpenCart · Configuration",
    subtitle: "OpenCart",
    description:
      "OpenCart configuration includes status toggles, logging, developer/production settings and order-status mapping.",
    table: {
      headers: ["Field", "Meaning"],
      rows: [
        ["Status", "Enable payment method"],
        ["Test Mode", "Enable test environment"],
        ["Logging", "Enable logs"],
        ["Sort Order", "Display order at checkout"],
        ["Store MID", "Merchant ID"],
        ["Store Currency", "3-digit ISO currency"],
        ["CID - originator", "Originator ID"],
        ["Private Key", "Merchant private key"],
        ["iCard Public Certificate", "iCard public certificate"],
        ["Developer URL / Production URL", "Gateway URL"],
        ["Developer Key Index / KeyResp Index", "Test indexes"],
        ["Production Key Index / KeyResp Index", "Production indexes"],
      ],
    },
    body: [
      "The OpenCart path is Extensions >> Extensions, choose type Payments, then edit iCard Checkout.",
      "The developer URL is documented as https://dev-ipg.icards.eu/sandbox/ and the production URL as https://ipg.icard.com/.",
    ],
    request: `Developer URL:
https://dev-ipg.icards.eu/sandbox/

Production URL:
https://ipg.icard.com/`,
    response: `Order statuses are configured in a dedicated section after the credential fields.`,
  },

  "carts-opencart-statuses": {
    title: "OpenCart · Order statuses",
    subtitle: "OpenCart",
    description:
      "OpenCart explicitly documents configurable order states for each payment outcome.",
    table: {
      headers: ["Order state", "Use case"],
      rows: [
        ["Completed Status", "Successful payments"],
        ["Canceled Status", "Failed or cancelled payments"],
        ["Pending Status", "Pending payments"],
        ["Refunded Status", "Refunded payments"],
        ["Reversed Status", "Reversed payments"],
      ],
    },
    request: `Configure order status mapping after credential setup`,
    response: `Save after mapping the payment-state statuses.`,
  },

  "carts-opencart-requirements": {
    title: "OpenCart · Requirements",
    subtitle: "OpenCart",
    description:
      "Core platform and server prerequisites for the OpenCart plugin.",
    table: {
      headers: ["Requirement", "Value"],
      rows: [
        ["OpenCart", "4.x"],
        ["PHP", "8.0+"],
        ["OpenSSL", "Required"],
        ["cURL", "Required"],
        ["iCard merchant account", "Required"],
      ],
    },
    request: `Platform requirement: OpenCart 4.x`,
    response: `Server prerequisites include OpenSSL and cURL.`,
  },

  "carts-zencart-installation": {
    title: "Zen Cart · Installation",
    subtitle: "Zen Cart",
    description:
      "Zen Cart installation is file-based, followed by payment module installation inside admin.",
    body: [
      "The guide says to search for the plugin at the Plugins/Addons Directory at zen-cart.com, download it, upload the files into the Zen Cart installation directory, sign in as administrator, then install the payment module from Modules > Payment.",
      "Once installed, iCard Checkout appears in the list of available Payment Modules.",
    ],
    request: `Zen Cart flow
1. Search plugin at zen-cart.com
2. Download plugin
3. Upload files to installation directory
4. Sign in to admin
5. Modules > Payment
6. Install iCard Checkout`,
    response: `After installation, open the configuration tab to enter the credentials.`,
  },

  "carts-zencart-configuration": {
    title: "Zen Cart · Configuration",
    subtitle: "Zen Cart",
    description:
      "Zen Cart configuration is done from the payment modules screen and includes developer and production credential blocks.",
    table: {
      headers: ["Field", "Meaning"],
      rows: [
        ["Enable iCard Checkout", "Turn the method on"],
        ["Test Mode", "Use developer environment"],
        ["Sort Order", "Display order at checkout"],
        ["Developer Merchant ID", "Test MID"],
        ["Developer Client ID", "Test originator ID"],
        ["Developer Currency", "3-digit ISO currency"],
        ["Developer Private Key", "Test private key"],
        ["Developer Public Certificate", "iCard public certificate"],
        ["Development Gateway URL", "Sandbox endpoint"],
        ["Production Merchant ID / Client ID", "Production credentials"],
        ["Production Key Index / Response Index", "Production indexes"],
      ],
    },
    body: [
      "The guide says to open Modules > Payment > Payment Modules, then double-click iCard Checkout to open the configuration tab on the right.",
      "The Zen Cart sandbox URL is documented as https://dev-ipg2.icards.eu/trunk/ and the production URL as https://ipg.icard.com/.",
    ],
    request: `Development Gateway URL:
https://dev-ipg2.icards.eu/trunk/

Production Gateway URL:
https://ipg.icard.com/`,
    response: `After entering all details, click Update to save settings.`,
  },

  "carts-zencart-statuses": {
    title: "Zen Cart · Order statuses",
    subtitle: "Zen Cart",
    description:
      "Zen Cart exposes configurable order states directly in the payment module setup.",
    table: {
      headers: ["Order state", "Use case"],
      rows: [
        ["Default Status", "Status applied to new orders by default"],
        ["Pending Status", "Pending payments"],
        ["Processing Status", "Processing payments"],
        ["Delivered Status", "Delivered payments"],
        ["Update Status", "Payment-status update mapping"],
      ],
    },
    request: `Configure the order states inside the payment module setup`,
    response: `Use Update after adjusting the order-state mapping.`,
  },

  "carts-zencart-requirements": {
    title: "Zen Cart · Requirements",
    subtitle: "Zen Cart",
    description:
      "Platform and security prerequisites documented for the Zen Cart integration.",
    table: {
      headers: ["Requirement", "Value"],
      rows: [
        ["PHP", "7.4 or higher"],
        ["Zen Cart", "1.5.7 or higher"],
        ["HTTPS (SSL certificate)", "Required"],
      ],
    },
    request: `Platform requirement: Zen Cart + HTTPS`,
    response: `Use this section for the requirements card in the explorer.`,
  },
  "carts-prestashop-installation": {
  title: "PrestaShop · Installation",
  subtitle: "PrestaShop",
  description:
    "The PrestaShop plugin is installed through the official PrestaShop Addons marketplace and then uploaded through Module Manager.",
  body: [
    "The documented flow is: log in to the official PrestaShop Addons marketplace, search for iCard Checkout, open the module page, add it to cart, proceed to checkout and download the zip package from the Product section.",
    "Then go to Modules > Module Manager in PrestaShop admin, choose Upload a module and upload the downloaded zip file.",
    "After successful installation, the module appears in Module Manager and can be configured from the Configure action.",
  ],
  request: `PrestaShop flow
1. Log in to addons.prestashop.com
2. Search for iCard Checkout
3. Open module page
4. Add to Cart > Proceed to Checkout
5. Download the zip package
6. Modules > Module Manager
7. Upload a module
8. Upload the downloaded zip`,
  response: `After installation completes successfully, open Configure to continue with setup.`,
},

"carts-prestashop-configuration": {
  title: "PrestaShop · Configuration",
  subtitle: "PrestaShop",
  description:
    "PrestaShop configuration includes enablement, test mode, logging and separate developer and production settings.",
  table: {
    headers: ["Field", "Meaning"],
    rows: [
      ["Status", "Enable iCard Checkout as a payment method"],
      ["Test Mode", "Enable developer/test environment"],
      ["Logging", "Enable debug and transaction logs"],
      ["DEVELOPER MID", "Test merchant ID"],
      ["DEVELOPER CID", "Test originator ID"],
      ["DEVELOPER Currency", "3-digit ISO currency code"],
      ["DEVELOPER Private Key", "Developer private key"],
      ["DEVELOPER Public Certificate", "iCard public certificate for test mode"],
      ["DEVELOPER Key Index", "Developer signing key index"],
      ["DEVELOPER Key Response Index", "Developer response key index"],
      ["DEVELOPER URL", "Sandbox endpoint"],
      ["PRODUCTION MID", "Production merchant ID"],
      ["PRODUCTION CID", "Production originator ID"],
      ["PRODUCTION Currency", "3-digit ISO currency code"],
      ["PRODUCTION Private Key", "Production private key"],
      ["PRODUCTION Public Certificate", "Production iCard public certificate"],
      ["PRODUCTION Key Index", "Production signing key index"],
      ["PRODUCTION Key Response Index", "Production response key index"],
      ["PRODUCTION URL", "Production endpoint"],
    ],
  },
  body: [
    "The admin path is Modules > Module Manager > search for iCard Checkout > Configure.",
    "The guide first enables Status, Test Mode and Logging, then asks the merchant to choose developer settings or production settings.",
  ],
  request: `DEVELOPER URL:
https://dev-ipg.icards.eu/sandbox/

PRODUCTION URL:
https://ipg.icard.com/`,
  response: `Once all details are entered, click Save to apply the settings.`,
},

"carts-prestashop-refunds": {
  title: "PrestaShop · Refund management",
  subtitle: "PrestaShop",
  description:
    "The PrestaShop module includes full and partial refunds directly from the order page.",
  facts: [
    "Full refunds",
    "Partial refunds",
    "Rate-limited refund attempts",
  ],
  body: [
    "The guide documents full refunds, automatic order status updates, transaction tracking and logging, plus partial refunds for any amount up to the order total.",
    "It also supports multiple partial refunds per order, order status updates to Partially Refunded, order slip generation for accounting purposes and real-time refund processing via the iCard API.",
    "The refund process is rate-limited to a maximum of 3 attempts per 5 minutes, and includes transaction ID validation and refund amount validation.",
  ],
  request: `Refund flow
1. Open PrestaShop admin order details page
2. Locate the iCard Refund Management section
3. Enter the refund amount
4. Click Process Refund
5. System validates and processes the refund`,
  response: `Order status and refund history are updated automatically after successful processing.`,
},

"carts-prestashop-statuses": {
  title: "PrestaShop · Order status management",
  subtitle: "PrestaShop",
  description:
    "The PrestaShop plugin automatically manages payment and refund statuses and can create custom order states when needed.",
  table: {
    headers: ["Status type", "Examples"],
    rows: [
      ["Payment statuses", "Payment accepted, Payment error, Payment declined"],
      ["Refund statuses", "Refunded, Partially refunded, Payment accepted"],
      ["Custom order states", "Custom states created if needed, with translations"],
    ],
  },
  body: [
    "The guide explicitly states that the module creates custom order states if needed and provides translations for all order statuses in all available languages.",
  ],
  request: `Automatic payment and refund state mapping in PrestaShop admin`,
  response: `The plugin keeps order-state display consistent across installations and languages.`,
},

"carts-prestashop-requirements": {
  title: "PrestaShop · Requirements",
  subtitle: "PrestaShop",
  description:
    "Platform compatibility and operational requirements documented for the PrestaShop module.",
  table: {
    headers: ["Requirement", "Value"],
    rows: [
      ["PrestaShop", "9.x (recommended)"],
      ["HTTPS / SSL", "Required for secure operation"],
      ["iCard merchant account", "Required"],
    ],
  },
  request: `Platform requirement: PrestaShop 9.x`,
  response: `The guide also documents test mode, debug logging and setup verification as part of operational readiness.`,
},
};