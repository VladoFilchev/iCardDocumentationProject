export const ipgPaymentMethodsMenuGroup = {
  title: "Payment Methods",
  items: [
    { id: "pm-overview", label: "Overview", type: "overview" },
    { id: "pm-availability", label: "Availability & requirements", type: "guide" },
    { id: "pm-sdk", label: "JS SDK", type: "guide" },

    { id: "pm-apple-overview", label: "Apple Pay overview", type: "guide" },
    { id: "pm-apple-domain", label: "Apple Pay domain verification", type: "guide" },
    { id: "pm-token-provider-session", label: "IPGTokenProviderSession", type: "post" },
    { id: "pm-tokenized-purchase-apple", label: "IPGTokenizedCardPurchase · Apple Pay", type: "post" },

    { id: "pm-google-overview", label: "Google Pay overview", type: "guide" },
    { id: "pm-tokenized-purchase-google", label: "IPGTokenizedCardPurchase · Google Pay", type: "post" },

    { id: "pm-config", label: "SDK config object", type: "schema" },
    { id: "pm-callbacks", label: "Frontend callbacks", type: "schema" },
  ],
};

export const ipgPaymentMethodsContent = {
  "pm-overview": {
    title: "Payment Methods",
    subtitle: "Payment Methods",
    description:
      "Payment Methods extends the IPG documentation with wallet-based checkout flows for Apple Pay and Google Pay. The browser uses the iCard JavaScript SDK to render wallet buttons and collect tokenized payment data, while the merchant backend forwards signed IPG requests for wallet session creation and tokenized purchase processing.",
    facts: [
      "Apple Pay + Google Pay",
      "Frontend SDK + backend IPG calls",
      "Tokenized wallet payment flow",
    ],
    body: [
      "The wallet flows are split between browser-side initialization and merchant-side API requests. The merchant page loads the iCard JS SDK, checks availability, renders the wallet button and receives tokenized wallet payment data from the provider.",
      "The merchant backend then submits signed requests to IPG for token-provider session handling and tokenized card purchase execution. This keeps wallet integration aligned with the broader IPG processing model.",
      "This section is placed inside the IPG explorer so Payment Methods can live under Online payments together with the rest of the checkout documentation.",
    ],
    request: `Frontend:
- Load iCard wallet SDK
- Check wallet availability
- Render Apple Pay / Google Pay button
- Collect tokenized payment payload

Backend:
- Create token-provider session when required
- Submit IPGTokenizedCardPurchase with signed request`,
    response: `Result:
- Wallet payment is authorized through IPG
- Merchant receives response / callback data according to the configured flow`,
  },

  "pm-availability": {
    title: "Availability & requirements",
    subtitle: "Payment Methods",
    description:
      "Wallet methods are available only when the cardholder device, browser and wallet enrollment support the selected method.",
    facts: [
      "HTTPS required",
      "Wallet/device compatibility required",
      "Merchant-side configuration required",
    ],
    body: [
      "Apple Pay requires HTTPS, valid SSL, TLS 1.2 support and merchant domain verification. The merchant domain must be registered and validated before Apple Pay can be used in production.",
      "Google Pay is available only when the customer device and browser support it and when the selected card is tokenized and usable through Google Pay.",
      "Both methods depend on the merchant account being configured for wallet processing inside IPG.",
    ],
    request: `Availability checks happen in the browser before the wallet button is rendered.`,
    response: `If the wallet is not available, the wallet button should not be displayed.`,
  },

  "pm-sdk": {
    title: "JS SDK",
    subtitle: "Payment Methods",
    description:
      "Apple Pay and Google Pay are initialized through the same iCard JavaScript SDK.",
    facts: [
      "Single SDK for both wallets",
      "Sandbox and production URLs",
      "Browser-side availability and button rendering",
    ],
    body: [
      "The merchant page loads the iCard wallet JavaScript bundle and then initializes a configuration object used for wallet availability checks and rendering.",
      "The SDK is responsible for opening the wallet sheet in the browser and collecting the tokenized payment payload that the merchant backend will forward to IPG.",
    ],
    request: `<!-- Sandbox -->
<script src="https://dev-ipg.icards.eu/sandbox/js/icard-g-a-pay.min.js"></script>

<!-- Production -->
<script src="https://ipg.icard.com/js/icard-g-a-pay.min.js"></script>`,
    response: `window.ICardIpgGAPay is available after the script is loaded.`,
  },

  "pm-apple-overview": {
    title: "Apple Pay overview",
    subtitle: "Payment Methods",
    description:
      "Apple Pay provides a device-native wallet checkout flow for supported Apple devices and browsers.",
    facts: [
      "Device-native Apple wallet checkout",
      "Requires domain verification",
      "Uses tokenized wallet payload",
    ],
    body: [
      "Apple Pay allows the customer to complete checkout without manually entering card data. The merchant page renders an Apple Pay button and, after customer authorization, receives tokenized wallet data.",
      "The merchant backend then forwards the signed request to IPG using tokenized payment processing.",
    ],
    request: `Frontend flow:
1. Verify Apple Pay availability
2. Render Apple Pay button
3. Open Apple Pay sheet
4. Receive tokenized payment payload
5. Send payload to merchant backend`,
    response: `Backend continues with tokenized IPG processing.`,
  },

  "pm-apple-domain": {
    title: "Apple Pay domain verification",
    subtitle: "Payment Methods",
    description:
      "Apple Pay requires merchant domain verification before production use.",
    facts: [
      "HTTPS only",
      "Domain verification required",
      "TLS 1.2 + valid SSL required",
    ],
    body: [
      "The merchant domain must host the Apple verification file and complete Apple domain registration before Apple Pay can be enabled.",
      "This step is mandatory because Apple Pay validates the merchant origin before allowing the payment sheet to open.",
    ],
    request: `Merchant domain requirements:
- HTTPS
- Valid SSL certificate
- TLS 1.2
- Apple domain verification`,
    response: `Once verified, Apple Pay can be used on the registered merchant domain.`,
  },

  "pm-token-provider-session": {
    title: "IPGTokenProviderSession",
    subtitle: "Payment Methods",
    description:
      "Creates a wallet-provider session used in Apple Pay-related initialization before the final tokenized payment request is sent.",
    facts: [
      "Backend signed request",
      "Wallet provider session creation",
      "Used before final tokenized purchase",
    ],
    fields: [
      ["IPGmethod", "string", "Mandatory", "Must be IPGTokenProviderSession."],
      ["KeyIndex", "int", "Mandatory", "Identifier of the merchant private key used for request signing."],
      ["KeyIndexResp", "int", "Mandatory", "Identifier of the key used for response signing."],
      ["IPGVersion", "string", "Mandatory", "Protocol version."],
      ["Originator", "int", "Mandatory", "Merchant company identifier assigned by iCard."],
      ["MID", "string", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string", "Mandatory", "Merchant order reference."],
      ["Amount", "double", "Mandatory", "Requested amount."],
      ["Currency", "string", "Mandatory", "ISO numeric currency code."],
      ["WalletType", "string", "Mandatory", "Wallet provider type. Example: ApplePay."],
      ["ValidationURL", "string", "Mandatory", "Wallet validation URL received during the Apple Pay session flow."],
      ["Signature", "BASE64", "Mandatory", "Signed hash for all request properties. Must be last."],
    ],
    request: `IPGmethod=IPGTokenProviderSession
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=APPLE-SESSION-10001
Amount=23.45
Currency=978
WalletType=ApplePay
ValidationURL=https://apple-pay-gateway.apple.com/paymentservices/startSession
Signature=<base64-signature>`,
    response: `method=IPGTokenProviderSession
status=0
status_msg=Success
session=<wallet-provider-session-payload>
Signature=<base64-signature>`,
  },

  "pm-tokenized-purchase-apple": {
    title: "IPGTokenizedCardPurchase · Apple Pay",
    subtitle: "Payment Methods",
    description:
      "Processes an Apple Pay payment using the tokenized wallet payload collected in the browser.",
    facts: [
      "Backend tokenized wallet purchase",
      "Apple Pay payment execution",
      "Signed IPG request",
    ],
    fields: [
      ["IPGmethod", "string", "Mandatory", "Must be IPGTokenizedCardPurchase."],
      ["KeyIndex", "int", "Mandatory", "Identifier of the merchant private key used for signing."],
      ["KeyIndexResp", "int", "Mandatory", "Identifier of the response-signing key."],
      ["IPGVersion", "string", "Mandatory", "Protocol version."],
      ["Originator", "int", "Mandatory", "Merchant company identifier assigned by iCard."],
      ["MID", "string", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string", "Mandatory", "Merchant order reference."],
      ["Amount", "double", "Mandatory", "Requested amount."],
      ["Currency", "string", "Mandatory", "ISO numeric currency code."],
      ["WalletType", "string", "Mandatory", "Wallet type. Example: ApplePay."],
      ["PaymentToken", "string", "Mandatory", "Tokenized payment payload received from Apple Pay."],
      ["CardholderName", "string", "Optional", "Cardholder name from the wallet payload when available."],
      ["Email", "string", "Optional", "Customer email address."],
      ["CustomerIP", "string", "Optional", "Customer IP address."],
      ["OutputFormat", "string", "Optional", "json or xml output."],
      ["Signature", "BASE64", "Mandatory", "Signed hash for all request properties. Must be last."],
    ],
    request: `IPGmethod=IPGTokenizedCardPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=APPLE-ORDER-10001
Amount=23.45
Currency=978
WalletType=ApplePay
PaymentToken=<apple-pay-tokenized-payload>
Email=customer@example.com
CustomerIP=127.0.0.1
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGTokenizedCardPurchase
status=0
status_msg=Success
Approval=123456
IPG_Trnref=20250418090000123456
Signature=<base64-signature>`,
  },

  "pm-google-overview": {
    title: "Google Pay overview",
    subtitle: "Payment Methods",
    description:
      "Google Pay provides fast wallet checkout on supported devices and browsers using tokenized card credentials.",
    facts: [
      "Fast browser wallet checkout",
      "Tokenized payment payload",
      "Rendered through the same iCard SDK",
    ],
    body: [
      "Google Pay is initialized through the same iCard wallet SDK and uses browser-side availability checks before the button is shown.",
      "After the customer authorizes the payment in the Google Pay sheet, the merchant backend forwards the tokenized data to IPG using the tokenized card purchase method.",
    ],
    request: `Frontend flow:
1. Check Google Pay availability
2. Render Google Pay button
3. Open Google Pay sheet
4. Receive tokenized payment payload
5. Send payload to merchant backend`,
    response: `Backend continues with tokenized IPG processing.`,
  },

  "pm-tokenized-purchase-google": {
    title: "IPGTokenizedCardPurchase · Google Pay",
    subtitle: "Payment Methods",
    description:
      "Processes a Google Pay payment using the tokenized wallet payload collected in the browser.",
    facts: [
      "Backend tokenized wallet purchase",
      "Google Pay payment execution",
      "Signed IPG request",
    ],
    fields: [
      ["IPGmethod", "string", "Mandatory", "Must be IPGTokenizedCardPurchase."],
      ["KeyIndex", "int", "Mandatory", "Identifier of the merchant private key used for signing."],
      ["KeyIndexResp", "int", "Mandatory", "Identifier of the response-signing key."],
      ["IPGVersion", "string", "Mandatory", "Protocol version."],
      ["Originator", "int", "Mandatory", "Merchant company identifier assigned by iCard."],
      ["MID", "string", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string", "Mandatory", "Merchant order reference."],
      ["Amount", "double", "Mandatory", "Requested amount."],
      ["Currency", "string", "Mandatory", "ISO numeric currency code."],
      ["WalletType", "string", "Mandatory", "Wallet type. Example: GooglePay."],
      ["PaymentToken", "string", "Mandatory", "Tokenized payment payload received from Google Pay."],
      ["CardholderName", "string", "Optional", "Cardholder name when available."],
      ["Email", "string", "Optional", "Customer email address."],
      ["CustomerIP", "string", "Optional", "Customer IP address."],
      ["OutputFormat", "string", "Optional", "json or xml output."],
      ["Signature", "BASE64", "Mandatory", "Signed hash for all request properties. Must be last."],
    ],
    request: `IPGmethod=IPGTokenizedCardPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=GOOGLE-ORDER-10001
Amount=23.45
Currency=978
WalletType=GooglePay
PaymentToken=<google-pay-tokenized-payload>
Email=customer@example.com
CustomerIP=127.0.0.1
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGTokenizedCardPurchase
status=0
status_msg=Success
Approval=123456
IPG_Trnref=20250418090500123456
Signature=<base64-signature>`,
  },

  "pm-config": {
    title: "SDK config object",
    subtitle: "Payment Methods",
    description:
      "The browser-side wallet SDK is initialized with a config object describing merchant data, amount, currency and result callbacks.",
    fields: [
      ["merchantName", "string", "Returned", "Merchant display name shown in wallet sheet."],
      ["merchantId", "string", "Returned", "Merchant wallet / gateway identifier."],
      ["amount", "string", "Returned", "Displayed payment amount."],
      ["currency", "string", "Returned", "Displayed currency."],
      ["countryCode", "string", "Returned", "Merchant country code."],
      ["buttonContainer", "string", "Returned", "DOM selector or target container for button rendering."],
      ["onSuccess", "function", "Returned", "Success callback after tokenized wallet payload is available."],
      ["onError", "function", "Returned", "Error callback for wallet initialization or processing failures."],
      ["onCancel", "function", "Returned", "Cancel callback when the customer aborts the wallet flow."],
    ],
    request: `const config = {
  merchantName: "Merchant Web Shop",
  merchantId: "merchant.com.test",
  amount: "23.45",
  currency: "EUR",
  countryCode: "BG",
  buttonContainer: "#wallet-button",
  onSuccess: handleSuccess,
  onError: handleError,
  onCancel: handleCancel,
};`,
    response: `ICardIpgGAPay.init(config);`,
  },

  "pm-callbacks": {
    title: "Frontend callbacks",
    subtitle: "Payment Methods",
    description:
      "The frontend wallet implementation should react to success, error and cancel states and pass the tokenized payment payload to the merchant backend.",
    fields: [
      ["onSuccess(payload)", "function", "Returned", "Called when the tokenized wallet payload is ready."],
      ["onError(error)", "function", "Returned", "Called on SDK or wallet processing error."],
      ["onCancel()", "function", "Returned", "Called when the customer closes or cancels the wallet sheet."],
      ["backendSubmit(payload)", "function", "Returned", "Merchant-side submission of wallet token to IPG backend endpoint."],
    ],
    request: `function handleSuccess(payload) {
  // send payload to backend
}

function handleError(error) {
  // show payment error
}

function handleCancel() {
  // restore checkout UI
}`,
    response: `The backend should execute the final signed IPG wallet purchase request.`,
  },
};