// ipgData.js
// Structured from "iCard IPG API - Adyen-style structured reference"
// Protocol Version 4.5, all business models.
const f = (name, sample, type, requirement, description) => ({
  name,
  sample,
  type,
  requirement,
  description,
});
const r = (name, sample, type, description) =>
  f(name, sample, type, "Returned", description);
const availability = (gambling, creditInstitution, ecommerce) => [
  { label: "BM Gambling", available: gambling },
  { label: "BM Credit Institution", available: creditInstitution },
  { label: "BM ECommerce", available: ecommerce },
];
const table = (title, headers, rows, description = "") => ({
  title,
  description,
  headers,
  rows,
});
const allBusinessModels = availability(true, true, true);
const mediaBase = "/ipg-media/";
const resources = {
  redirectWorkflow: {
    title: "Redirect workflow - ECommerce",
    description: "Workflow reference for the ECommerce redirect integration.",
    href: `${mediaBase}ipg-redirect-workflow-ecommerce.pdf`,
    type: "PDF",
  },
  redirectVisualization: {
    title: "Redirect visualization - ECommerce",
    description: "Visual reference for the ECommerce redirect checkout journey.",
    href: `${mediaBase}ipg-redirect-visualization-ecommerce.pdf`,
    type: "PDF",
  },
  modalWorkflow: {
    title: "Modal workflow - ECommerce",
    description: "Workflow reference for the ECommerce modal implementation.",
    href: `${mediaBase}ipg-modal-workflow-ecommerce.pdf`,
    type: "PDF",
  },
  modalVisualization: {
    title: "Modal visualization - ECommerce",
    description: "Visual reference for the ECommerce modal checkout journey.",
    href: `${mediaBase}ipg-modal-visualization-ecommerce.pdf`,
    type: "PDF",
  },
  walletSdk: {
    title: "JS SDK Apple Pay / Google Pay - ECommerce",
    description: "SDK reference for Apple Pay and Google Pay ECommerce integrations.",
    href: `${mediaBase}ipg-js-sdk-apay-gpay-ecommerce.pdf`,
    type: "PDF",
  },
  gamblingApi: {
    title: "IPG API v4.5 - Business Model Gambling",
    description: "Source PDF for the focused IPG 4.5 Gambling business model documentation.",
    href: `${mediaBase}ipg-api-v4-5-rev-4-bmg-20260126.pdf`,
    type: "PDF",
  },
  productionSignatureGenerator: {
    title: "Production signature generation",
    description: "Production environment tool for generating asymmetric keys used by IPG request signing.",
    href: "https://ipg.icard.com/asym_keys/generate",
    type: "Tool",
  },
  sandboxEndpoint: {
    title: "Sandbox endpoint",
    description: "Sandbox IPG endpoint used during merchant integration and testing.",
    href: "https://dev-ipg.icards.eu/sandbox/",
    type: "Sandbox",
  },
  productionEndpoint: {
    title: "Production endpoint",
    description: "Production IPG endpoint used after certification and go-live approval.",
    href: "https://ipg.icard.com/",
    type: "Production",
  },
  integrationSupport: {
    title: "Technical integration support",
    description: "Contact iCard technical integration support if callback delivery cannot be restored.",
    href: "mailto:cs.integration@icard.com",
    type: "Email",
  },
  customerSupport: {
    title: "Customer support",
    description: "Contact iCard customer support for callback delivery and operational support cases.",
    href: "mailto:cs.support@icard.com",
    type: "Email",
  },
};
const media = {
  appleMobileButtons: {
    title: "Apple Pay mobile SDK buttons",
    description: "Mobile Apple Pay checkout button and payment-sheet sequence.",
    src: `${mediaBase}buttons-mobile-sdk-apay.jpg`,
    alt: "Apple Pay mobile SDK button flow",
  },
  googleMobileButtons: {
    title: "Google Pay mobile SDK buttons",
    description: "Mobile Google Pay checkout button and payment-sheet sequence.",
    src: `${mediaBase}buttons-mobile-sdk-gpay.jpg`,
    alt: "Google Pay mobile SDK button flow",
  },
  appleSdkRedirect: {
    title: "Apple Pay SDK redirect flow",
    description: "ECommerce Apple Pay SDK redirect visualization.",
    src: `${mediaBase}sdk-redirect-ecommerce-applepay.jpg`,
    alt: "Apple Pay SDK redirect ECommerce flow",
  },
  googleSdkRedirect: {
    title: "Google Pay SDK redirect flow",
    description: "ECommerce Google Pay SDK redirect visualization.",
    src: `${mediaBase}sdk-redirect-ecommerce-googlepay.jpg`,
    alt: "Google Pay SDK redirect ECommerce flow",
  },
};

const commonSignedRequestFields = [
  f("IPGmethod", "IPGPurchase", "String", "Mandatory", "Name of the method requested for execution."),
  f("KeyIndex", "1", "Int", "Mandatory", "Identifier of the private key used for signing the request."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Identifier of the private key used to build the response signature."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version. Must be 4.5."),
  f("Originator", "33", "Int", "Mandatory", "Unique merchant company identifier assigned by iCard."),
];
const languageField = f(
  "Language",
  "EN",
  "A(2)",
  "Mandatory",
  "ISO 2-character language code. Supported: EN, FR, DE, BG, ES, RO, EL, IT, PL."
);
const signatureField = f(
  "Signature",
  "Byte[] BASE64",
  "BASE64",
  "Mandatory",
  "RSA-SHA256 signed hash of all request parameters. Must be the last parameter in the POST body."
);
const customerBillingFields = [
  f("CustomerIdentifier", "1234", "String", "Recommended", "Customer credentials on the merchant platform, such as ID, phone, or name."),
  f("Email", "customer@site.com", "String", "Mandatory", "Cardholder email address."),
  f("MobileNumber", "+359811222111", "String", "Mandatory", "Cardholder mobile number with country code prefix."),
  f("BillAddrCountry", "100", "String(3)", "Recommended", "ISO 3166-1 numeric 3-digit billing country code."),
  f("BillAddrCity", "Sofia", "String(50)", "Recommended", "Customer billing city."),
  f("BillAddrPostCode", "1421", "String(16)", "Recommended", "Customer billing ZIP code."),
  f("BillAddrState", "", "String(3)", "Conditional", "ISO 3166-2 subdivision code. USA only."),
  f("BillAddrLine1", "128 Dondukov Blvd", "String(50)", "Recommended", "Billing address line 1. BASE64 encoded."),
  f("BillAddrLine2", "", "String(50)", "Optional", "Billing address line 2. BASE64 encoded."),
  f("BillAddrLine3", "", "String(50)", "Optional", "Billing address line 3. BASE64 encoded."),
];
const shippingFields = [
  f("ShipAddrCountry", "100", "String(3)", "Optional", "ISO 3166-1 numeric 3-digit shipping country code."),
  f("ShipAddrCity", "", "String(50)", "Optional", "Customer shipping city."),
  f("ShipAddrPostCode", "", "String(16)", "Optional", "Customer shipping ZIP code."),
  f("ShipAddrState", "", "String(3)", "Optional", "ISO 3166-2 subdivision code. USA only."),
  f("ShipAddrLine1", "", "String(50)", "Optional", "Shipping address line 1. BASE64 encoded."),
  f("ShipAddrLine2", "", "String(50)", "Optional", "Shipping address line 2. BASE64 encoded."),
  f("ShipAddrLine3", "", "String(50)", "Optional", "Shipping address line 3. BASE64 encoded."),
];
const redirectCheckoutFields = [
  f("IPGmethod", "IPGPurchase", "String", "Mandatory", "Name of the method requested for execution."),
  f("KeyIndex", "1", "Int", "Mandatory", "Identifier of the private key used for signing the request."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Identifier of the private key used to build the response signature."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version. Must be 4.5."),
  languageField,
  f("Originator", "33", "Int", "Mandatory", "Unique merchant company identifier assigned by iCard."),
  f("BannerIndex", "1", "Int", "Mandatory", "Index of the banner displayed on the payment page. Provided by iCard."),
  f("PostResultAction", "Redirect", "String", "Conditional", "Redirect to URL_OK/URL_Cancel or CloseWindow. If omitted, iCard shows a result page and then redirects."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("MIDName", "My Web Shop", "String", "Mandatory", "Merchant name shown to the cardholder on the payment page."),
  f("Amount", "23.45", "Double(8,2)", "Mandatory", "Payment amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code. Must match the MID currency."),
  f("CustomerIP", "127.0.0.1", "String", "Mandatory", "Customer IP address in IPv4 or IPv6 format."),
  f("OrderID", "60EC4A03-0AC1-...", "String(50)", "Mandatory", "Unique order identifier. MID plus OrderID must be unique."),
  f("CustomerIdentifier", "1234", "String", "Recommended", "Customer credentials on the merchant platform."),
  f("Email", "customer@site.com", "String", "Mandatory", "Cardholder email address."),
  f("URL_OK", "https://site/ok", "String", "Conditional", "Redirect URL on success. Not required when PostResultAction=CloseWindow."),
  f("URL_Cancel", "https://site/cancel", "String", "Conditional", "Redirect URL on failure. Not required when PostResultAction=CloseWindow."),
  f("URL_Notify", "https://site/notify", "String", "Mandatory", "Callback URL for JSON payment result notifications."),
  f("Note", "Note text", "String", "Optional", "Text associated with the purchase. Echoed in callback as Description."),
  f("MobileNumber", "+359811222111", "String", "Mandatory", "Cardholder mobile number with country code prefix."),
  ...customerBillingFields.slice(3),
  ...shippingFields,
  f("IPGPaymentContext", "GooglePay", "String", "Conditional", "BM Gambling only. Use GooglePay or ApplePay when the redirect context is a digital wallet."),
  signatureField,
];
const storedCardRedirectFields = [
  f("IPGmethod", "IPG3DSPurchaseWithStoredCard", "String", "Mandatory", "Name of the method requested for execution."),
  f("KeyIndex", "1", "Int", "Mandatory", "Identifier of the private key used for signing the request."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Identifier of the private key used to build the response signature."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version. Must be 4.5."),
  languageField,
  f("Originator", "33", "Int", "Mandatory", "Unique merchant company identifier assigned by iCard."),
  f("BannerIndex", "1", "Int", "Mandatory", "Payment page banner index."),
  f("PostResultAction", "Redirect", "String", "Conditional", "Redirect or CloseWindow. See IPGPurchase."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("MIDName", "My Web Shop", "String", "Mandatory", "Merchant name shown on the payment page."),
  f("Amount", "23.45", "Double(8,2)", "Mandatory", "Payment amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("OrderID", "20210916999999", "String(50)", "Mandatory", "Unique order identifier."),
  f("CardToken", "40B1B011C4A21EA6...", "String", "Mandatory", "Card token from a previous IPGPurchase callback."),
  f("VerifyCVC", "1", "N(1)", "Optional", "If 1, the customer must enter CVC before payment."),
  f("URL_OK", "https://site/ok", "String", "Conditional", "Redirect URL on success."),
  f("URL_Cancel", "https://site/cancel", "String", "Conditional", "Redirect URL on failure."),
  f("URL_Notify", "https://site/notify", "String", "Mandatory", "Callback URL."),
  f("CustomerIdentifier", "123456789", "String", "Recommended", "Customer credentials."),
  f("Email", "name@site.com", "String", "Mandatory", "Cardholder email."),
  f("MobileNumber", "+359811222111", "String", "Mandatory", "Cardholder mobile number with country code."),
  ...customerBillingFields.slice(3),
  ...shippingFields,
  signatureField,
];
const embeddedPaymentFields = [
  f("IPGmethod", "IPGEmbeddedPayment", "String", "Mandatory", "Fixed value: IPGEmbeddedPayment."),
  f("PaymentType", "IPGPurchase", "String", "Mandatory", "IPGPurchase or IPG3DSPurchaseWithStoredCard."),
  f("Theme", "Themename", "String", "Mandatory", "Visual theme name provided by iCard after CSS configuration."),
  f("KeyIndex", "1", "Int", "Mandatory", "Private key index for signing."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Key index for response signature."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version."),
  languageField,
  f("OutputFormat", "json", "String", "Optional", "xml by default, or json."),
  f("Originator", "100", "Int", "Mandatory", "Merchant company identifier."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("Amount", "23.45", "Double(8,2)", "Mandatory", "Payment amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("CustomerIP", "127.0.0.1", "String", "Mandatory", "Customer IP address."),
  f("OrderID", "47A11480-B3AA-...", "String(50)", "Mandatory", "Unique order identifier."),
  f("URL_Notify", "https://site/notify", "String", "Mandatory", "Callback URL."),
  ...customerBillingFields,
  ...shippingFields,
  signatureField,
];
const embeddedResponseFields = [
  r("IPGmethod", "IPGEmbeddedPayment", "String", "Echo of method name."),
  r("OrderID", "47A11480-...", "String", "Echo from request."),
  r("Status", "0", "String", "Request status code. 0 means success."),
  r("StatusMsg", "Success", "String", "Status message."),
  r("URL", "https://dev-ipg...", "String", "iframe src URL to embed on the merchant page."),
  r("Signature", "uIkMPI...KakY=", "BASE64", "Verify this before using the URL."),
];
const modalPaymentFields = [
  f("IPGmethod", "IPGPaymentToken", "String", "Mandatory", "Fixed value: IPGPaymentToken."),
  f("ModalType", "IPGPurchase", "String", "Mandatory", "IPGPurchase or IPG3DSPurchaseWithStoredCard."),
  f("KeyIndex", "1", "Int", "Mandatory", "Private key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version."),
  languageField,
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("OutputFormat", "json", "String", "Mandatory", "xml or json."),
  f("BannerIndex", "1", "Int", "Conditional", "Payment page banner index."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("MIDName", "My Web Shop", "String", "Mandatory", "Merchant name shown to the cardholder."),
  f("Amount", "23.45", "Double(8,2)", "Mandatory", "Payment amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("CustomerIP", "127.0.0.1", "String", "Mandatory", "Customer IP."),
  f("OrderID", "60EC4A03-...", "String(50)", "Mandatory", "Unique order identifier."),
  f("CustomerIdentifier", "1234", "String", "Recommended", "Customer credentials."),
  f("Email", "customer@site.com", "String", "Mandatory", "Cardholder email."),
  f("URL_Notify", "https://site/notify", "String", "Mandatory", "Callback URL."),
  f("Note", "Note text", "String", "Optional", "Purchase description."),
  f("MobileNumber", "+359811222111", "String", "Mandatory", "Cardholder mobile with country code."),
  ...customerBillingFields.slice(3),
  ...shippingFields,
  signatureField,
];
const paymentTokenResponseFields = [
  r("IPGmethod", "IPGPaymentToken", "String", "Method name."),
  r("OrderID", "60EC4A03-...", "String", "Echo from request."),
  r("Status", "0", "String", "0 means success."),
  r("StatusMsg", "Success", "String", "Status message."),
  r("Token", "_TOKEN_", "String", "Token used when loading payment-modal.js."),
  r("Signature", "Byte[] BASE64", "BASE64", "Response signature."),
];
const modalImplementationFlowTable = table(
  "Payment Modal Implementation Flow",
  ["Step", "Runs in", "Implementation responsibility"],
  [
    ["1. Create the modal transaction", "Merchant backend", "Validate the order and send a signed IPGPaymentToken request with the required ModalType and payment parameters."],
    ["2. Verify the token response", "Merchant backend", "Verify the response Signature and confirm the successful Status before exposing Token to the merchant frontend."],
    ["3. Load payment-modal.js", "Merchant frontend", "Create the required #ipg wrapper and load payment-modal.js with the verified Token, correct environment domain, and selected theme."],
    ["4. Handle the customer experience", "Merchant frontend", "Use modal lifecycle events to update the interface when the form loads, the customer cancels, payment completes, or an error occurs."],
    ["5. Confirm the financial result", "Merchant backend", "Verify and process the signed URL_Notify callback. Modal events and visible success screens are not the final payment source of truth."],
  ],
  "Unlike Redirect checkout, the customer remains on the merchant page while an IPG-controlled overlay securely collects payment data."
);
const modalConfigurationTable = table(
  "Payment Modal Script Configuration",
  ["Value", "Allowed value", "Purpose"],
  [
    ["_DOMAIN_", "https://dev-ipg.icards.eu/sandbox/ or https://ipg.icard.com/", "Selects the Sandbox or Production payment-modal.js script."],
    ["_TOKEN_", "Verified Token returned by IPGPaymentToken", "Links the modal instance to the signed backend payment-token request."],
    ["_THEME_", "classic or dark", "Controls the supported modal appearance. If omitted or invalid, classic is applied."],
    ["Wrapper", "<div id=\"ipg\"></div>", "Required mount point used by payment-modal.js."],
  ]
);
const modalFrontendEventsTable = table(
  "Payment Modal Frontend Events",
  ["Event", "Meaning", "Recommended merchant action"],
  [
    ["ipg.formload.success", "The payment form was displayed.", "Remove loading state and allow the customer to interact with the modal."],
    ["ipg.user.cancel", "The customer pressed Cancel.", "Close or reset the modal experience and keep the order unpaid."],
    ["ipg.payment.success", "The modal displayed its payment-success page.", "Show provisional success UX, but wait for the verified URL_Notify result before fulfilment."],
    ["ipg.user.close.on.success", "The customer closed the success page.", "Return focus to the merchant page and show the current order-processing state."],
    ["ipg.payment.error", "The modal displayed a payment-error page.", "Show an appropriate retry or alternative-payment option."],
    ["ipg.user.close.on.error", "The customer closed the error page.", "Return focus and preserve the unpaid order state."],
    ["ipg.loadmodal.error", "The modal loading process failed.", "Log the technical failure, keep the order unpaid, and offer retry or another payment method."],
    ["ipg.user.close.on.loadmodal.error", "The customer closed the modal loading-error page.", "Reset the modal UI and preserve the order for a controlled retry."],
  ],
  "Frontend events control customer experience only. Always use the signed backend notification as the final financial result."
);
const callbackPaymentFields = [
  f("OrderId", "78A9F22B-...", "String", "Optional", "Merchant order placeholder."),
  f("MID", "000000000000123", "AN(15)", "Optional", "Identifier of the virtual terminal."),
  f("Date", "2025-01-30T17:57:46+02:00", "ISO8601", "Mandatory", "Date of last status update."),
  f("Type", "IPGPurchase", "String", "Optional", "Method name that was executed."),
  f("Context", "CardPay", "String", "Optional", "CardPay, GooglePay, ApplePay, or StoreCardPay."),
  f("Status", "success", "String", "Mandatory", "success, error, or declined."),
  f("Interface", "redirect", "String", "Mandatory", "embedded_checkout, redirect, modal, or backend_request."),
  f("Sum.Amount", "1.00", "Double(8,2)", "Mandatory", "Echo from request."),
  f("Sum.Currency", "978", "N(3)", "Mandatory", "Echo from request."),
  f("Description", "note", "String", "Optional", "Echo of the Note field from request."),
];
const callbackCardDataFields = [
  f("Pan", "532610***0004", "String", "Mandatory", "First 6 and last 4 digits of PAN."),
  f("Type", "MasterCard", "String", "Mandatory", "MasterCard or VISA."),
  f("CardholderName", "Test", "String", "Mandatory", "Cardholder full name."),
  f("ExpMonth", "06", "String", "Mandatory", "Card expiry month."),
  f("ExpYear", "25", "String", "Mandatory", "Card expiry year."),
  f("CardToken", "D747458899D...FC43D5", "String(64)", "Mandatory", "Token for subsequent stored-card payments. Present when the customer chose Save card during IPGPurchase."),
  f("IssCountry", "ISR", "String", "Mandatory", "Issuing country of the card."),
  f("IssRegion", "D", "String", "Mandatory", "Issuing region of the card."),
  f("AcqScheme", "M", "String", "Mandatory", "Acquiring scheme used."),
  f("Brand", "M", "String", "Mandatory", "Card brand."),
  f("ProductID", "MCC", "String", "Mandatory", "Product ID of the card."),
  f("ProductClass", "MCC", "String", "Mandatory", "Product class of the card."),
  f("ProductClassName", "Consumer", "String", "Mandatory", "Product class name."),
  f("Qualifier", "MasterCard", "String", "Mandatory", "Card qualifier."),
];
const callbackCustomerFields = [
  f("Email", "test@test.com", "String", "Optional", "Echo from request."),
  f("Phone", "+359881252525", "String", "Optional", "Echo from request."),
  f("Identifier", "SZ-1868", "String", "Optional", "Echo from request CustomerIdentifier."),
  f("IPAddress", "127.0.0.1", "String", "Optional", "Customer IP address."),
  f("FirstName", "John", "String", "Optional", "Echo from request."),
  f("LastName", "Smith", "String", "Optional", "Echo from request."),
];
const callbackOperationFields = [
  f("Type", "authorization", "String", "Optional", "authorization, merchant_validation, customer_validation, 3ds_authentication, 3ds_challenge, or store_card."),
  f("Status", "success", "String", "Mandatory", "success, error, or declined."),
  f("Date", "2025-01-30T17:57:45+02:00", "ISO8601", "Mandatory", "Date of last status update."),
  f("Code", "0", "Integer", "Mandatory", "See the IPG Additions Status Codes document."),
  f("Message", "Success", "String", "Mandatory", "See the IPG Additions Status Codes document."),
  f("Eci", "05", "String(2)", "Optional", "Electronic Commerce Indicator. MasterCard: 00-02,06. Visa: 05-07. Amex: 05-08."),
  f("Sum.Amount", "10.50", "Double(8,2)", "Mandatory", "Echo from request."),
  f("Sum.Currency", "978", "N(3)", "Mandatory", "Echo from request."),
  f("Provider.Trn", "20250130155745...", "String", "Mandatory", "Transaction ID on provider or card scheme side."),
  f("Provider.Date", "2025-01-30T17:57:45+02:00", "ISO8601", "Mandatory", "Processing completion datetime."),
  f("Provider.RespCode", "00", "String", "Mandatory", "Response code from card scheme."),
  f("Provider.Approval", "F1DA09", "String", "Optional", "Approval code, present when response code is 00."),
  f("StoreCard.CardToken", "D747458899D...FC43D5", "String(64)", "Mandatory", "Card token for subsequent payments."),
];
const callbackErrorFields = [
  f("Code", "9033", "Integer", "Returned", "Error code."),
  f("Description", "Invalid banner index", "String", "Returned", "Error reason details."),
  f("Field", "BannerIndex", "String", "Returned", "Name of the erroneous parameter."),
  f("Message", "Invalid integer for banner index value", "String", "Returned", "Error code description."),
];
const tokenProviderJsFields = [
  f("IPGmethod", "IPGTokenProviderSession", "String", "Mandatory", "Fixed value."),
  f("Amount", "10.48", "Double(8,2)", "Mandatory", "Payment amount."),
  f("MerchantUrl", "dev-ipg.icards.eu", "String", "Mandatory", "Merchant domain."),
  f("ValidationURL", "https://apple-paygateway...", "String", "Mandatory", "Provided by Apple."),
  f("DisplayName", "My Store", "String", "Mandatory", "Merchant name shown in the Apple Pay dialog."),
  f("TokenizedCardProvider", "Apple", "String", "Mandatory", "Fixed value: Apple."),
  f("MerchantSessionData", "Any data", "Any", "Optional", "Optional merchant-provided data."),
];
const tokenProviderBackendFields = [
  f("IPGmethod", "IPGTokenProviderSession", "String", "Mandatory", "Fixed value."),
  f("KeyIndex", "1", "Int", "Mandatory", "Signing key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version."),
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("OutputFormat", "json", "String", "Mandatory", "Output format."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("OrderID", "60EC4A03-...", "String(50)", "Mandatory", "Unique order identifier."),
  f("MerchantUrl", "dev-ipg.icards.eu", "String", "Mandatory", "Merchant domain."),
  f("ValidationURL", "https://apple-paygateway...", "String", "Mandatory", "Provided by Apple."),
  f("DisplayName", "My Store", "String", "Mandatory", "Merchant store name."),
  f("TokenizedCardProvider", "Apple", "String", "Mandatory", "Fixed value: Apple."),
  signatureField,
];
const tokenProviderResponseFields = [
  r("IPGmethod", "IPGTokenProviderSession", "String", "Method name."),
  r("OrderID", "F989C51B-...", "String", "Echo from request."),
  r("Status", "0", "String", "0 means success."),
  r("StatusMsg", "Success", "String", "Status message."),
  r("Session", "ApplePay session data", "String", "Apple Pay session token to pass back to browser."),
  r("Signature", "Byte[] BASE64", "BASE64", "Verify before passing the session to the browser."),
];
const tokenizedJsFields = [
  f("IPGmethod", "IPGTokenizedCardPurchase", "String", "Mandatory", "Fixed value."),
  f("Amount", "10.48", "Double(8,2)", "Mandatory", "Payment amount."),
  f("TokenizedCard", "Encrypted card data", "String", "Mandatory", "Encrypted card data from wallet."),
  f("TokenizedCardProvider", "Apple / Google", "String", "Mandatory", "Apple or Google."),
  f("MerchantSessionData", "Any data", "Any", "Optional", "Merchant data. For Apple Pay, include the OrderID from IPGTokenProviderSession."),
];
const tokenizedBackendFields = [
  f("IPGmethod", "IPGTokenizedCardPurchase", "String", "Mandatory", "Fixed value."),
  f("KeyIndex", "1", "Int", "Mandatory", "Signing key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version."),
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("OutputFormat", "json", "String", "Mandatory", "Output format."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("OrderID", "60EC4A03-...", "String(50)", "Mandatory", "Unique order identifier. For Apple Pay, use the same OrderID as IPGTokenProviderSession."),
  f("Email", "customer@site.com", "String", "Mandatory", "Cardholder email."),
  f("CustomerIdentifier", "1234", "String", "Recommended", "Customer credentials."),
  f("Amount", "10.48", "Double(8,2)", "Mandatory", "Payment amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("URL_Notify", "https://site/notify", "String", "Mandatory", "Callback URL."),
  f("TokenizedCardProvider", "Apple", "String", "Mandatory", "Apple or Google."),
  f("TokenizedCard", "Encrypted card data", "String", "Mandatory", "Encrypted card data."),
  signatureField,
];
const tokenizedResponseFields = [
  r("IPGmethod", "IPGTokenizedCardPurchase", "String", "Method name."),
  r("OrderID", "F989C51B-...", "String", "Echo from request."),
  r("Status", "0", "String", "0 means success."),
  r("StatusMsg", "Success", "String", "Status message."),
  r("Signature", "Byte[] BASE64", "BASE64", "Verify before responding to browser AJAX."),
];
const backendBaseFields = [
  f("KeyIndex", "1", "Int", "Mandatory", "Signing key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version."),
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
];
const octCommonRequestFields = (version) => [
  f("IPGmethod", "IPGOCT", "String", "Mandatory", "Name of the method requested for execution from IPG. Fixed value: IPGOCT."),
  f("KeyIndex", "1", "Int", "Mandatory", "Identifier of the private key used for the request signature."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Identifier of the private key used to build the response signature."),
  f("IPGVersion", version, "String", "Mandatory", `Protocol version used for the transmission. Use ${version} in this documentation view.`),
  f("Originator", "33", "Int", "Mandatory", "Value that uniquely identifies the merchant company that has signed a contract with iCard AD."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Identifier of the virtual terminal used for the transaction."),
  f("OrderID", "610F0A8D-7210-4828-B625-C02E843DE7D8", "String(50)", "Mandatory", "Unique merchant request identifier used to recognize the withdrawal."),
];
const octCommonAmountFields = [
  f("Amount", "23.45", "Double", "Mandatory", "Amount of the gaming withdrawal."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code. The currency must be equal to the MID currency."),
  f("RecipientFirstName", "John", "String(35)", "Mandatory", "Recipient first name. Must not contain all spaces, all zeroes, all numerics, or question marks."),
  f("RecipientLastName", "Smith", "String(35)", "Mandatory", "Recipient last name. Must not contain all spaces, all zeroes, all numerics, or question marks."),
  f("OutputFormat", "json", "String", "Optional", "Response format: xml or json. If omitted, the default is xml."),
  f("Signature", "uIkMPIYhgE.......7DEhXOaUKakY=", "BASE64", "Mandatory", "Signed HASH for all request properties. Signature is always the last POST parameter and is not included in its own calculation."),
];
const octByPanFields = (version) => [
  ...octCommonRequestFields(version),
  f("CardToken", "40B1B011C4A21EA65A8AA06E9D767ECE348ADB2E2D4E4E6C3A0536E452619059", "String", "Mandatory", "Token of the destination card received after the customer saved the card. Used instead of IPG_Trnref and Approval."),
  ...octCommonAmountFields,
];
const octByTrnApprovalFields = (version) => [
  ...octCommonRequestFields(version),
  f("IPG_Trnref", "20250602110038002328", "String", "Mandatory", "IPG transaction reference of the previously executed payment. Mandatory together with Approval for OCT by TRN and Approval."),
  f("Approval", "123456", "String", "Mandatory", "Approval code returned by the issuer for the original payment. Mandatory together with IPG_Trnref."),
  ...octCommonAmountFields,
];
const octResponseFields = [
  r("IPGmethod", "IPGOCT", "String", "Method name."),
  r("OrderID", "610F0A8D-...", "String", "Echo from request."),
  r("IPGTrnref", "20250602110038002328", "String", "Transaction identifier in IPG."),
  r("IPGTrnrefOriginal", "20250602110038002328", "String", "Original transaction ID. Present when executed by IPG_Trnref plus Approval."),
  r("Status", "0", "String", "0 means success. See IPG Additions Status Codes."),
  r("StatusMsg", "Success", "String", "Status message."),
  r("Signature", "uIkMPI...KakY=", "BASE64", "Response signature for verification."),
];
const createOctDocumentation = (version) => ({
  title: "IPGOCT",
  subtitle: "Backend Methods",
  description:
    "Gaming-withdrawal Original Credit Transaction with two documented destination-reference paths: OCT by PAN and OCT by original IPG transaction reference plus Approval.",
  facts: ["BM Gambling only", "IPGmethod=IPGOCT", "OCT by PAN", "OCT by TRN + Approval"],
  availability: availability(true, false, false),
  body: [
    "IPGOCT is a server-to-server backend method used for Gaming Withdrawal. IPG returns a synchronous signed response with the execution result.",
    "The request can be initialized only from a previously executed payment transaction or from the token of a previously stored card. IPG validates that the MID is valid and that Currency is valid for the MID.",
    "For OCT by PAN, the supplied documentation sends the destination card as CardToken rather than defining a raw PAN request property. The explorer preserves that documented request field.",
    "Use exactly one destination-reference path per request. Do not send CardToken together with IPG_Trnref and Approval.",
  ],
  fieldSections: [
    {
      title: "OCT by PAN - Request Parameters",
      description:
        "Use the stored CardToken of the destination card. CardToken replaces the IPG_Trnref and Approval pair; a raw PAN property is not defined in the supplied IPGOCT request table.",
      fields: octByPanFields(version),
    },
    {
      title: "OCT by TRN and Approval - Request Parameters",
      description:
        "Use the IPG_Trnref and Approval from a previously executed payment transaction. Both reference properties are mandatory for this path.",
      fields: octByTrnApprovalFields(version),
    },
    {
      title: "Response Parameters",
      description:
        "The response contract is shared by both OCT paths. IPGTrnrefOriginal is available when OCT was executed by IPG_Trnref and Approval.",
      fields: octResponseFields,
    },
  ],
  tables: [
    table(
      "IPGOCT Destination Reference Paths",
      ["Path", "Send", "Do not send", "Response distinction"],
      [
        ["OCT by PAN", "CardToken", "IPG_Trnref and Approval", "IPGTrnref identifies the new OCT. IPGTrnrefOriginal is not expected for the token path."],
        ["OCT by TRN and Approval", "IPG_Trnref and Approval", "CardToken", "IPGTrnref identifies the new OCT and IPGTrnrefOriginal identifies the referenced original transaction."],
      ],
      "Both paths use IPGmethod=IPGOCT and the same mandatory MID, OrderID, amount, currency, recipient-name, output-format, and signature rules."
    ),
    table(
      "IPGOCT Validation Rules",
      ["Validation", "Documented behavior"],
      [
        ["MID", "IPG checks that MID is valid."],
        ["Currency", "IPG checks that Currency is valid for the MID and equal to the MID currency."],
        ["Recipient names", "First and last name must not contain all spaces, all zeroes, all numerics, or question marks."],
        ["OutputFormat", "Optional xml or json; xml is the default when omitted."],
        ["Signature", "Mandatory and always the last POST parameter because it is not included in its own calculation."],
      ]
    ),
  ],
  examplesTitle: "IPGOCT Request Variants and Response",
  examples: [
    {
      title: "OCT by PAN",
      description: "The documented PAN/card-destination path sends CardToken and omits IPG_Trnref and Approval.",
      code: `IPGmethod=IPGOCT
KeyIndex=1
KeyIndexResp=1
IPGVersion=${version}
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-4828-B625-C02E843DE7D8
CardToken=40B1B011C4A21EA65A8AA06E9D767ECE348ADB2E2D4E4E6C3A0536E452619059
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    },
    {
      title: "OCT by TRN and Approval",
      description: "References the original payment and omits CardToken.",
      code: `IPGmethod=IPGOCT
KeyIndex=1
KeyIndexResp=1
IPGVersion=${version}
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-4828-B625-C02E843DE7D8
IPG_Trnref=20250602110038002328
Approval=123456
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    },
    {
      title: "Successful IPGOCT response",
      description: "IPGTrnrefOriginal is returned for OCT by TRN and Approval.",
      code: `{
  "IPGmethod": "IPGOCT",
  "OrderID": "610F0A8D-7210-4828-B625-C02E843DE7D8",
  "IPGTrnref": "20250602110038002329",
  "IPGTrnrefOriginal": "20250602110038002328",
  "Status": "0",
  "StatusMsg": "Success",
  "Signature": "<base64-signature>"
}`,
    },
  ],
  request: `IPGmethod=IPGOCT
KeyIndex=1
KeyIndexResp=1
IPGVersion=${version}
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-4828-B625-C02E843DE7D8
IPG_Trnref=20250602110038002328
Approval=123456
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
  response: `{
  "IPGmethod": "IPGOCT",
  "OrderID": "610F0A8D-7210-4828-B625-C02E843DE7D8",
  "IPGTrnref": "20250602110038002329",
  "IPGTrnrefOriginal": "20250602110038002328",
  "Status": "0",
  "StatusMsg": "Success",
  "Signature": "<base64-signature>"
}`,
});
const fundsDisbursementRequestFields = [
  f("IPGmethod", "IPGFundsDisbursement", "String", "Mandatory", "Fixed value."),
  ...backendBaseFields,
  f("OrderID", "610F0A8D-7210-...", "String(255)", "Mandatory", "Unique order identifier. Credit Institution allows up to 255 characters."),
  f("IPG_Trnref", "20250416103635576924", "String", "Conditional", "Mandatory for funds disbursement by TRN plus Approval."),
  f("Approval", "123456", "String", "Conditional", "Mandatory for funds disbursement by TRN plus Approval."),
  f("CardToken", "40B1B011C4A21EA6...", "String", "Conditional", "Mandatory for funds disbursement by CardToken. Use instead of IPG_Trnref plus Approval."),
  f("Amount", "23.45", "Double", "Mandatory", "Disbursement amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("RecipientFirstName", "John", "String", "Mandatory", "Recipient first name."),
  f("RecipientLastName", "Smith", "String", "Mandatory", "Recipient last name."),
  f("OutputFormat", "json", "String", "Optional", "xml by default, or json."),
  signatureField,
];
const fundsDisbursementResponseFields = [
  r("IPGmethod", "IPGFundsDisbursement", "String", "Method name."),
  r("OrderID", "610F0A8D-...", "String", "Echo from request."),
  r("IPGTrnref", "20250602110038002328", "String", "Transaction identifier in IPG."),
  r("IPGTrnrefOriginal", "20250602110038002328", "String", "Original transaction ID. Present when executed by IPG_Trnref plus Approval."),
  r("RRN", "602420389981", "String", "BM Credit Institution only. Retrieval Reference Number from card scheme."),
  r("Status", "0", "String", "0 means success."),
  r("StatusMsg", "Success", "String", "Status message."),
  r("Signature", "uIkMPI...KakY=", "BASE64", "Response signature."),
];
const fundsDisbursementCommonRequestFields = (version) => [
  f("IPGmethod", "IPGFundsDisbursement", "String", "Mandatory", "Name of the method requested for execution from IPG. Fixed value: IPGFundsDisbursement."),
  f("KeyIndex", "1", "Int", "Mandatory", "Identifier of the private key used for the request signature."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Identifier of the private key used to build the response signature."),
  f("IPGVersion", version, "String", "Mandatory", `Protocol version used for the transmission. Use ${version} in this documentation view.`),
  f("Originator", "33", "Int", "Mandatory", "Value that uniquely identifies the merchant company that has signed a contract with iCard AD."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Identifier of the virtual terminal used for the transaction."),
  f("OrderID", "610F0A8D-7210-4828-B625-C02E843DE7D8", "String(255)", "Mandatory", "Unique merchant request identifier for the disbursement."),
];
const fundsDisbursementCommonAmountFields = [
  f("Amount", "23.45", "Double", "Mandatory", "Disbursement amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code. The currency must be valid for the MID."),
  f("RecipientFirstName", "John", "String", "Mandatory", "Recipient first name."),
  f("RecipientLastName", "Smith", "String", "Mandatory", "Recipient last name."),
  f("OutputFormat", "json", "String", "Optional", "Response format: xml or json. If omitted, the default is xml."),
  f("Signature", "uIkMPIYhgE.......7DEhXOaUKakY=", "BASE64", "Mandatory", "Signed HASH for all request properties. Signature is always the last POST parameter."),
];
const fundsDisbursementByCardTokenFields = (version) => [
  ...fundsDisbursementCommonRequestFields(version),
  f("CardToken", "40B1B011C4A21EA65A8AA06E9D767ECE348ADB2E2D4E4E6C3A0536E452619059", "String", "Mandatory", "Authorized destination-card token. Use instead of IPG_Trnref and Approval."),
  ...fundsDisbursementCommonAmountFields,
];
const fundsDisbursementByTrnApprovalFields = (version) => [
  ...fundsDisbursementCommonRequestFields(version),
  f("IPG_Trnref", "20250602110038002328", "String", "Mandatory", "IPG transaction reference of the previously executed payment. Mandatory together with Approval."),
  f("Approval", "123456", "String", "Mandatory", "Approval code from the original payment. Mandatory together with IPG_Trnref."),
  ...fundsDisbursementCommonAmountFields,
];
const createFundsDisbursementDocumentation = (version) => ({
  title: "IPGFundsDisbursement",
  subtitle: "Backend Methods",
  description:
    "Financial Institution funds-disbursement method with two supported destination-reference paths: an authorized CardToken or an original IPG transaction reference plus Approval.",
  facts: ["BM Financial Institution only", "IPGmethod=IPGFundsDisbursement", "CardToken path", "TRN + Approval path"],
  availability: availability(false, true, false),
  body: [
    "IPGFundsDisbursement is a server-to-server backend method used for approved Financial Institution disbursements to a cardholder card.",
    "Use exactly one destination-reference path in a request. Send CardToken, or send both IPG_Trnref and Approval. Do not combine the two paths.",
    "Validate the recipient, amount, currency, destination reference, and duplicate protection before signing and sending the request.",
  ],
  fieldSections: [
    {
      title: "Funds Disbursement by CardToken - Request Parameters",
      description: "Use an authorized destination-card token and omit IPG_Trnref and Approval.",
      fields: fundsDisbursementByCardTokenFields(version),
    },
    {
      title: "Funds Disbursement by TRN and Approval - Request Parameters",
      description: "Use both the original payment IPG_Trnref and Approval and omit CardToken.",
      fields: fundsDisbursementByTrnApprovalFields(version),
    },
    {
      title: "Response Parameters",
      description: "Verify the response signature before using the returned transaction references, RRN, or status.",
      fields: fundsDisbursementResponseFields,
    },
  ],
  tables: [
    table(
      "IPGFundsDisbursement Destination Reference Paths",
      ["Path", "Send", "Do not send", "Operational use"],
      [
        ["By CardToken", "CardToken", "IPG_Trnref and Approval", "Disburse to an authorized stored-card destination."],
        ["By TRN and Approval", "IPG_Trnref and Approval", "CardToken", "Disburse using the original approved payment reference."],
      ],
      "Both paths use IPGmethod=IPGFundsDisbursement and share the same MID, OrderID, amount, currency, recipient-name, output-format, and signature rules."
    ),
  ],
  examplesTitle: "IPGFundsDisbursement Request Variants",
  examples: [
    {
      title: "Disbursement by CardToken",
      description: "Uses CardToken and omits IPG_Trnref and Approval.",
      code: `IPGmethod=IPGFundsDisbursement
KeyIndex=1
KeyIndexResp=1
IPGVersion=${version}
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-4828-B625-C02E843DE7D8
CardToken=40B1B011C4A21EA65A8AA06E9D767ECE348ADB2E2D4E4E6C3A0536E452619059
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    },
    {
      title: "Disbursement by TRN and Approval",
      description: "Uses both original-payment reference properties and omits CardToken.",
      code: `IPGmethod=IPGFundsDisbursement
KeyIndex=1
KeyIndexResp=1
IPGVersion=${version}
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-4828-B625-C02E843DE7D8
IPG_Trnref=20250602110038002328
Approval=123456
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    },
  ],
  request: `IPGmethod=IPGFundsDisbursement
KeyIndex=1
KeyIndexResp=1
IPGVersion=${version}
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-4828-B625-C02E843DE7D8
CardToken=40B1B011C4A21EA65A8AA06E9D767ECE348ADB2E2D4E4E6C3A0536E452619059
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
  response: `{
  "IPGmethod": "IPGFundsDisbursement",
  "OrderID": "610F0A8D-7210-4828-B625-C02E843DE7D8",
  "IPGTrnref": "20250602110038002329",
  "Status": "0",
  "StatusMsg": "Success",
  "Signature": "<base64-signature>"
}`,
});
const refundRequestFields = [
  f("IPGmethod", "IPGRefund", "String", "Mandatory", "Fixed value: IPGRefund."),
  ...backendBaseFields,
  f("OrderID", "DB183FF5-8AF8-...", "String(50)", "Mandatory", "Unique order identifier for this refund."),
  f("IPG_Trnref", "20250416064251147276", "String", "Mandatory", "IPG transaction reference of the original payment."),
  f("Amount", "23.45", "Double", "Mandatory", "Refund amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("Email", "customer@site.com", "String", "Mandatory", "Cardholder email."),
  f("OutputFormat", "json", "String", "Optional", "xml by default, or json."),
  signatureField,
];
const refundResponseFields = [
  r("method", "IPGRefund", "String", "Method name."),
  r("trnref", "20250416064251147276", "String", "Transaction ID."),
  r("amount", "1", "Double", "Echo from request."),
  r("currency", "978", "N(3)", "Echo from request."),
  r("status", "0", "String", "0 means success."),
  r("status_msg", "Success", "String", "Status message."),
  r("Signature", "Byte[] BASE64", "BASE64", "Response signature."),
];
const reversalRequestFields = [
  f("IPGmethod", "IPGReversal", "String", "Mandatory", "Fixed value: IPGReversal."),
  f("KeyIndex", "1", "Int", "Mandatory", "Signing key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.5", "String", "Mandatory", "Protocol version."),
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("OutputFormat", "json", "String", "Mandatory", "xml or json."),
  f("OrderID", "60EC4A03-0AC1-...", "String", "Mandatory", "OrderID of the transaction to reverse."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "MID of the transaction to reverse."),
  f("IPG_Trnref", "20250417083627362872", "String", "Mandatory", "IPG transaction reference of the transaction to reverse."),
  signatureField,
];
const reversalResponseFields = [
  r("IPGmethod", "IPGReversal", "String", "Method name."),
  r("OrderID", "F989C51B-...", "String", "Echo from request."),
  r("IPGTrnref", "20250417083627362872", "String", "Transaction identifier in IPG."),
  r("IPGTrnrefOriginal", "20250602110038002328", "String", "Transaction ID of the original reversed transaction."),
  r("Status", "0", "String", "0 means success."),
  r("StatusMsg", "Success", "String", "Status message."),
  r("Signature", "Byte[] BASE64", "BASE64", "Response signature."),
];
const txnStatusRequestFields = [
  f("IPGmethod", "IPGGetTxnStatus", "String", "Mandatory", "Fixed value."),
  ...backendBaseFields,
  f("OrderID", "610F0A8D-7210-...", "String(50)", "Mandatory", "OrderID of the transaction to query."),
  f("OutputFormat", "json", "String", "Optional", "xml by default, or json."),
  signatureField,
];
const txnStatusResponseFields = [
  r("IPGmethod", "IPGGetTxnStatus", "String", "Method name."),
  r("Status", "0", "String", "Request processing status."),
  r("StatusMsg", "Success", "String", "Request processing message."),
  r("OrderID", "610F0A8D-...", "String", "Echo from request."),
  r("IPGTrnStatus", "0", "Int", "Transaction status. 0 means success."),
  r("IPGTrnStatusMsg", "Success", "String", "Transaction status message."),
  r("Signature", "uIkMPI...KakY=", "BASE64", "Response signature."),
];
const ipgIntroductionBody = [
  "This document describes the interface for e-commerce payments via payment gateway.",
  "The Merchant should integrate the iPayment Gateway API (IPG API) at the site accepting card payments. IPG API will gain access to the entry point of iPayment Gateway (IPG) managed by iCard AD (iCARD).",
  "IPG handles and guides the cardholder during the payment process, checks card sensitive data, and processes payment transactions through the VISA and MasterCard schemes.",
  "The purpose of this document is to specify the IPG API interface and demonstrate how it is used in the most common way. All techniques used within the interface are standard throughout the industry and should be very easy to implement on any platform.",
];
const ipgProvidesTable = table(
  "IPG API Provides",
  ["Capability"],
  [
    ["Secured page and secured communication channel with the Merchant"],
    ["Storing of merchant private data such as amount, payment methods, and transaction details"],
    ["Financial transactions to VISA and MasterCard transparent for the Merchant"],
    ["Operations for the front-end: purchase transaction"],
    ["Operations for the back-end: refund and reversal"],
    ["3D processing"],
  ]
);
const ipgOutOfScopeTable = table(
  "Out of Scope",
  ["Area"],
  [
    ["Merchant statements and payouts"],
    ["Merchant back-end (iMerchant)"],
    ["Merchant support system (IPGPlatform)"],
  ]
);
const signatureGenerationInputsTable = table(
  "Signature Generation Inputs",
  ["Input", "Description"],
  [
    ["Data to sign", "Generally the request body: all request parameters without the Signature parameter."],
    ["Private key", "The merchant private key used for generating the digital signature."],
  ]
);
const signatureGenerationStepsTable = table(
  "Signature Generation Steps for IPG Version >= 4.5",
  ["Step", "Action"],
  [
    ["1", "Validate input: data must not contain any Signature parameter, even empty, and the private key must be available."],
    ["2", "Lowercase all keys, encode booleans as 1 or 0, flatten nested objects and arrays into colon-delimited paths, preserve empty values, ignore empty arrays, convert strings to UTF-8, sort in natural order, and join with semicolons."],
    ["3", "Calculate the digital signature with SHA-256 using the private key."],
    ["4", "Encode the binary signature using Base64."],
    ["5", "Add the Signature parameter to the request body using the generated Base64 value."],
  ]
);
const signatureVerificationInputsTable = table(
  "Signature Verification Inputs",
  ["Input", "Description"],
  [
    ["Signed data to verify", "Usually a callback or response body in JSON format with a Signature parameter."],
    ["Public key", "The iCard public key used to validate the received Signature."],
  ]
);
const signatureVerificationStepsTable = table(
  "Signature Verification Steps for IPG Version >= 4.5",
  ["Step", "Action"],
  [
    ["1", "Validate that the data conforms to JSON, contains a Signature parameter with a value, and the public key is available."],
    ["2", "Extract the Signature value, remove Signature from the data, and decode the signature from Base64."],
    ["3", "Generate the canonical string from the remaining data using the same normalization, flattening, UTF-8 conversion, natural sorting, and semicolon joining used for request signing."],
    ["4", "Verify the decoded signature with SHA-256 and the iCard public key."],
  ]
);
const implementationTypesTable = table(
  "Implementation Types Summary",
  ["Type", "API Methods Used", "Description"],
  [
    ["Redirect Checkout", "IPGPurchase, IPG3DSPurchaseWithStoredCard", "Full-page redirect to the iCard payment page. Customer leaves the merchant site."],
    ["Embedded Checkout", "IPGEmbeddedPayment", "iframe embedded in the merchant page. Customer stays on the merchant site."],
    ["Modal Implementation", "IPGPaymentToken", "Modal overlay on the merchant page. Token is obtained first, then JS modal is loaded."],
    ["Apple Pay JS SDK", "IPGTokenProviderSession + IPGTokenizedCardPurchase", "Native Apple Pay button. Full SDK-only flow without redirect."],
    ["Google Pay JS SDK", "IPGTokenizedCardPurchase", "Native Google Pay button. No Apple session step needed."],
    ["Backend", "IPGOCT / IPGFundsDisbursement / IPGRefund / IPGReversal", "Server-to-server methods for payouts, refunds, and reversals."],
  ]
);
const merchantIntegrationJourneyTable = table(
  "Merchant Integration Journey",
  ["Phase", "Objective", "Key actions"],
  [
    [
      "Phase 1: Technical Discovery Meeting",
      "Align on the scope and technical requirements of the integration.",
      "Schedule a technical consultation before code is written.\nReview the business use case and transaction flow.\nIdentify the API methods and integration types to implement, such as Redirect, Server-to-Server, or SDK.\nAddress technical constraints and security requirements.",
    ],
    [
      "Phase 2: Sandbox Integration & Testing",
      "Validate the implementation in a non-production environment.",
      "Receive Sandbox Credentials and the Test Case Document.\nConfigure the system using the provided Sandbox settings.\nPerform all scenarios from the Test Case file.\nFill in transaction IDs and responses, then return the file to the technical team.\nThe iCard team reviews logs for data integrity and protocol compliance.",
    ],
    [
      "Phase 3: Production Migration & Validation",
      "Verify system performance and security in the live environment.",
      "After Sandbox approval, iCard issues the Production Settings.\nPerform a limited set of live test transactions while support monitors them in real time.\nGenerate production signature keys and provide the public key so the production MID/CID can be configured.\nRecord live transactions in the Production Test Case file and submit it for final audit.",
    ],
    [
      "Phase 4: Go-Live & Launch Support",
      "Move to real customer traffic through a controlled launch.",
      "After production requests are double-checked, provide the intended Go-Live Date.\nOn the launch date, iCard provides enhanced monitoring for the initial customer traffic.\nAfter a successful monitoring period, the integration is considered fully live.",
    ],
  ]
);
const sandboxIntegrationChecklistTable = table(
  "Sandbox Testing Checklist",
  ["Step", "Merchant action", "Review outcome"],
  [
    ["1. Integration", "Configure the merchant system with the provided Sandbox settings.", "Requests can be created and signed against the sandbox environment."],
    ["2. Execution", "Run every scenario from the provided Test Case file.", "All required customer and backend flows are exercised."],
    ["3. Reporting", "Fill in the Test Case file with transaction IDs and responses, then return it to the technical team.", "iCard receives the data needed to match merchant records to platform logs."],
    ["4. Review", "Wait for iCard review of the transactions in platform logs.", "Data integrity and protocol compliance are confirmed before production migration."],
  ]
);
const productionValidationChecklistTable = table(
  "Production Validation Checklist",
  ["Item", "Action"],
  [
    ["Production Settings", "Use the production configuration issued after Sandbox testing is approved."],
    ["Production signature keys", "Generate the production key pair with the production signature generation tool and provide the public key to iCard for production MID/CID setup."],
    ["Limited live tests", "Perform a small set of monitored live transactions before opening full traffic."],
    ["Production Test Case file", "Record the live test transactions and submit the file for final audit."],
    ["Go-Live Date", "Share the intended Go-Live Date after production requests are double-checked."],
  ]
);
const dataTypesTable = table(
  "Data Type Formats",
  ["Data Type in document", "Description", "Example"],
  [
    ["int", "Integer", "1"],
    ["String", "String", "This is a string"],
    ["Date", "ISO 8601 date string YYYY-MM-DD", "2021-09-14"],
    ["DateTime", "ISO 8601 datetime string YYYY-MM-DD HH:mm:SS", "2021-09-14 23:59:59"],
    ["A(n)", "Alpha string. n characters required.", "Alpha string"],
    ["AN(n)", "Alphanumeric string. n characters required.", "Alphanumeric string"],
    ["N(n)", "Numeric string. n characters required. Number is left-padded with zeroes.", "000123"],
    ["Double(M,D)", "Numeric string with decimal point. Only point is used, with up to M total digits and D digits after the decimal point.", "34.56"],
    ["BASE64", "String used to pass binary data. The binary data should be converted to Base64 standard.", "YW55IGNhcm5hbCBwbGVhc3VyZQ=="],
    ["XML", "Simple in-place XML array.", `<?xml version="1.0"?>
<ipg_response>
  <status>0</status>
  <status_msg>Success</status_msg>
  ...
</ipg_response>`],
    ["JSON", "JSON string.", `{
  "Field1": "value",
  "Field2": "value"
}`],
  ]
);
const retryScheduleTable = table(
  "Callback Retry Schedule",
  ["Attempts", "Interval", "Cumulative Time"],
  [
    ["20", "60 seconds", "About 20 minutes"],
    ["8", "300 seconds (5 minutes)", "About 60 minutes"],
    ["6", "600 seconds (10 minutes)", "About 2 hours"],
    ["6", "1200 seconds (20 minutes)", "About 4 hours"],
    ["6", "3600 seconds (1 hour)", "About 10 hours"],
    ["7", "7200 seconds (2 hours)", "About 24 hours max"],
  ],
  "If the merchant does not return HTTP 200 OK, IPG retries the callback up to 53 times within one day. After 24 hours, if we haven't received 200 OK, we will reach you to request further information regarding the transaction."
);
const callbackHandlingStepsTable = table(
  "Callback Handling Procedure",
  ["Step", "Merchant action", "Details"],
  [
    ["1", "Accept and verify the callback", "Accept callbacks only from the documented IPG callback addresses for the active environment. Validate the callback sender and data integrity by verifying the Signature included in every callback."],
    ["2", "Confirm callback receipt", "Return a synchronous HTTP response. Use 200 OK when the callback is valid and accepted. Use an error status that matches the error type when processing fails."],
    ["3", "Perform the required actions", "For prescriptive callbacks, perform the actions stated as required. For informational callbacks, perform the actions that match the web service operation, such as customer notification."],
  ]
);
const callbackIpAllowlistTable = table(
  "Callback Source IP Allowlist",
  ["Environment", "Address type", "Source address", "Merchant action"],
  [
    ["Production", "External IPv4", "185.161.233.7", "Allow inbound callback HTTP POST requests from this exact production IPv4 address."],
    ["Production", "External IPv6", "2a07:c881::7", "Allow inbound callback HTTP POST requests from this exact production IPv6 address when IPv6 is enabled on the merchant endpoint."],
    ["Sandbox", "IPv4", "82.119.81.211", "Allow inbound callback HTTP POST requests from this exact sandbox IPv4 address during integration and certification testing."],
  ],
  "Configure the allowlist separately for Sandbox and Production. Source-IP validation is an additional network control and does not replace verification of the callback Signature."
);
const callbackResponseCodesTable = table(
  "Callback Response Codes",
  ["HTTP response", "When to use it", "IPG behavior"],
  [
    ["200 OK", "The callback has been received, verified, and accepted.", "Callback delivery is confirmed."],
    ["400 Bad Request", "A parameter string could not be converted into an array or the callback payload cannot be parsed.", "The callback will be sent again."],
    ["500 Internal Server Error", "The callback was received at an incorrect URL or the merchant service has a server-side issue.", "The callback will be sent again."],
    ["Any non-200 response or no response", "Callback receipt is not confirmed.", "The callback will be resent regardless of error type."],
  ]
);
const cardSchemeResponseCodeRows = [
  ["00", "Successful approval/completion or valid V.I.P. PIN verification"],
  ["01", "Refer to card issuer"],
  ["02", "Refer to card issuer, special condition"],
  ["03", "Invalid merchant or service provider"],
  ["04", "Pickup card"],
  ["05", "Do not honor"],
  ["06", "Error"],
  ["07", "Pickup card, special condition other than lost or stolen card"],
  ["08", "Honor with identification"],
  ["09", "Request in progress"],
  ["10", "Partial approval"],
  ["11", "Approved (VIP)"],
  ["12", "Invalid transaction"],
  ["13", "Invalid amount, currency conversion field overflow, or amount exceeds maximum for card program"],
  ["14", "Invalid account number; no such number"],
  ["15", "No such issuer"],
  ["16", "Approved, update track 3"],
  ["17", "Customer cancellation"],
  ["18", "Customer dispute"],
  ["19", "Re-enter transaction"],
  ["20", "Invalid response"],
  ["21", "No action taken; unable to back out prior transaction"],
  ["22", "Suspected malfunction"],
  ["23", "Unacceptable transaction fee"],
  ["25", "Unable to locate record in file, or account number is missing from the inquiry"],
  ["28", "File is temporarily unavailable"],
  ["30", "Format error"],
  ["31", "Bank not supported by switch"],
  ["32", "Completed partially"],
  ["33", "Expired card"],
  ["34", "Suspected fraud"],
  ["35", "Contact acquirer, pick up card"],
  ["36", "Restricted card"],
  ["37", "Call acquirer security, pick up card"],
  ["38", "Allowable PIN tries exceeded"],
  ["39", "No credit account"],
  ["40", "Requested function not supported"],
  ["41", "Pickup card; lost card"],
  ["42", "No universal account"],
  ["43", "Pickup card; stolen card"],
  ["44", "No investment account"],
  ["51", "Insufficient funds or over credit limit"],
  ["52", "No chequing account"],
  ["53", "No savings account"],
  ["54", "Expired card"],
  ["55", "Incorrect PIN"],
  ["56", "Inactive card"],
  ["57", "Transaction not permitted to issuer or cardholder"],
  ["58", "Transaction not permitted to acquirer or terminal"],
  ["59", "Suspected fraud"],
  ["60", "Contact acquirer"],
  ["61", "Activity amount limit exceeded"],
  ["62", "Restricted card, for example because of country exclusion"],
  ["63", "Security violation"],
  ["65", "Activity count limit exceeded"],
  ["66", "Call acquirer security"],
  ["67", "Card is blacklisted; pickup card because it is lost or stolen"],
  ["68", "Response received too late"],
  ["70", "Contact card issuer"],
  ["71", "PIN not changed"],
  ["75", "Allowable number of PIN-entry tries exceeded"],
  ["76", "Unable to locate previous message; no match on Retrieval Reference Number"],
  ["77", "Previous message located for repeat or reversal, but data are inconsistent with the original message"],
  ["78", "Blocked, first used; new cardholder card has not been properly unblocked"],
  ["79", "Approved administrative transaction"],
  ["80", "Visa: credit issuer unavailable. Private label and check acceptance: invalid date"],
  ["81", "PIN cryptographic error found during PIN decryption"],
  ["82", "Negative CAM, dCVV, iCVV, or CVV results"],
  ["83", "Unable to verify PIN"],
  ["84", "Invalid authorization life cycle"],
  ["85", "No reason to decline account-number, address, CVV2 verification, credit voucher, or merchandise return"],
  ["86", "PIN validation not possible"],
  ["87", "Purchase amount only; no cash back allowed"],
  ["88", "Cryptographic failure"],
  ["89", "Unacceptable PIN transaction"],
  ["90", "Cut-off is in process"],
  ["91", "Issuer unavailable or switch inoperative; STIP not applicable or available"],
  ["92", "Destination cannot be found for routing"],
  ["93", "Transaction cannot be completed; violation of law"],
  ["94", "Duplicate transmission detected"],
  ["95", "Reconcile error"],
  ["96", "System malfunction or certain field error conditions"],
  ["B1", "Surcharge amount not permitted on Visa cards; U.S. acquirers only"],
  ["N0", "Force STIP"],
  ["N1", "Invalid PAN length"],
  ["N2", "Preauthorization full"],
  ["N3", "Maximum online refund reached"],
  ["N4", "Maximum offline refund reached"],
  ["N5", "Maximum credit per refund reached"],
  ["N6", "Maximum refund credit reached"],
  ["N7", "Decline for CVV2 failure"],
  ["N8", "Over floor limit"],
  ["N9", "Maximum number of refund credits"],
  ["NO", "Corrupted card"],
  ["NM", "Corrupted customer"],
  ["O0", "Referral file full"],
  ["O1", "NEG file problem"],
  ["O2", "Advance less than minimum"],
  ["O3", "Delinquent"],
  ["O4", "Over limit table"],
  ["O5", "PIN required"],
  ["O6", "Mod 10 check"],
  ["O7", "Force post"],
  ["O8", "Bad PBF"],
  ["O9", "NEG file problem"],
  ["P0", "CAF problem"],
  ["P1", "Over daily limit"],
  ["P2", "CAPF not found"],
  ["P3", "Advance less than minimum"],
  ["P4", "Number of times used"],
  ["P5", "PIN change or unblock request declined"],
  ["P6", "Over limit table"],
  ["P7", "Advance less than minimum"],
  ["P8", "Administrative card needed"],
  ["P9", "Enter lesser amount"],
  ["Q0", "Invalid transaction date"],
  ["Q1", "Invalid expiration date"],
  ["Q2", "Invalid transaction code"],
  ["Q3", "Advance less than minimum"],
  ["Q4", "Number of times used"],
  ["Q5", "Delinquent"],
  ["Q6", "Over limit table"],
  ["Q7", "Amount over maximum"],
  ["Q8", "Administrative card not found"],
  ["Q9", "Administrative card not allowed"],
  ["R0", "Stop Payment Order"],
  ["R1", "Revocation of Authorization Order"],
  ["R2", "Approved administrative request anytime"],
  ["R3", "Revocation of All Authorizations Order"],
  ["R4", "Chargeback customer file updated"],
  ["R5", "Chargeback incorrect prefix number"],
  ["R6", "Chargeback incorrect response code or CPF configuration"],
  ["R7", "Administrative transactions not supported"],
  ["R8", "Card on national negative file"],
  ["R9", "Destination not available"],
  ["S0", "Suspect reversal"],
  ["S4", "PTLF full"],
  ["S5", "Chargeback approved; customer file not updated"],
  ["S6", "Chargeback approved; customer file not updated because acquirer was not found"],
  ["S7", "Chargeback accepted; incorrect destination"],
  ["S8", "ADMN file problem"],
  ["S9", "Unable to validate PIN; security module is down"],
  ["T1", "Invalid credit card advance increment"],
  ["T2", "Invalid transaction date"],
  ["T3", "Card not supported"],
  ["T4", "Amount over maximum"],
  ["T5", "CAF status equals 0 or 9"],
  ["T6", "Bad UAF"],
  ["T7", "Cash back exceeds daily limit"],
  ["T8", "Invalid account"],
  ["U0", "ARQC failure decline"],
  ["U1", "Security module parameter error"],
  ["U2", "Security module failure"],
  ["U3", "KEYI record not found"],
  ["U4", "ATC check failure"],
  ["U5", "CVR decline"],
  ["U6", "TVR decline"],
  ["U7", "Reason online decline"],
  ["U8", "Fallback decline"],
  ["V0", "ARQC failure"],
  ["V1", "CVR referral"],
  ["V2", "TVR referral"],
  ["V3", "Reason online code referral"],
  ["V4", "Fallback referral"],
  ["V7", "ARQC failure capture"],
  ["V8", "CVR capture"],
  ["V9", "TVR capture"],
  ["XA", "Forward to issuer"],
  ["XD", "Forward to issuer"],
  ["Z3", "Unable to go online"],
];
const numericCardSchemeResponseCodeRows = cardSchemeResponseCodeRows.filter(
  ([code]) => /^[0-9]/.test(code)
);
const extendedCardSchemeResponseCodeRows = cardSchemeResponseCodeRows.filter(
  ([code]) => !/^[0-9]/.test(code)
);
const cardSchemeResponseCodeTables = [
  table(
    "Numeric Response Codes: 00-44",
    ["Code", "Description"],
    numericCardSchemeResponseCodeRows.slice(0, 41)
  ),
  table(
    "Numeric Response Codes: 51-96",
    ["Code", "Description"],
    numericCardSchemeResponseCodeRows.slice(41)
  ),
  table(
    "Extended Response Codes: B1-NM",
    ["Code", "Description"],
    extendedCardSchemeResponseCodeRows.slice(0, 13)
  ),
  table(
    "Extended Response Codes: O0-Q9",
    ["Code", "Description"],
    extendedCardSchemeResponseCodeRows.slice(13, 43)
  ),
  table(
    "Extended Response Codes: R0-Z3",
    ["Code", "Description"],
    extendedCardSchemeResponseCodeRows.slice(43)
  ),
];
const cartVersionComparisonTable = table(
  "Cart Data by Protocol Version",
  ["Area", "IPG 4.2", "IPG 4.5"],
  [
    ["IPG request", "Cart logical record and CartItems are mandatory for IPGPurchase.", "CartItems requirement was removed from IPG methods."],
    ["Item structure", "Send indexed article, quantity, price, amount, and currency values.", "Keep order-line data in the merchant system; do not send legacy CartItems unless iCard explicitly enables a separate contract."],
    ["Signature", "Every transmitted cart value participates in the ordered 4.2 request signature.", "Only parameters actually included in the 4.5 request participate in the 4.5 canonical signature."],
    ["Migration", "Validate item count, totals, and currency before signing.", "Remove legacy Cart and CartItems fields when migrating the request builder from 4.2."],
  ]
);
const callbackTroubleshootingTable = table(
  "Troubleshooting Callback Delivery",
  ["Case", "Possible cause", "Recommended action"],
  [
    ["No callbacks are triggered by any events", "The relevant requests or events may not have been initiated in the platform.", "Ensure the correct requests were sent from the web service and accepted by the platform. Send a test request if needed, for example one that generates a payment card token."],
    ["Requests are accepted but callbacks are still missing", "Callback URLs may be incorrect or unreachable.", "Check that the callback delivery URLs are correct, publicly reachable, and match the URL_Notify values sent in requests."],
    ["Previous checks do not resolve delivery", "There may be a communication-channel or platform-side delivery issue.", "Contact iCard technical integration support at cs.integration@icard.com or customer support at cs.support@icard.com."],
  ]
);
const featureMatrixTable = table(
  "Feature Matrix",
  ["Feature / Method", "BM Gambling", "BM Credit Institution", "BM ECommerce"],
  [
    ["Primary use case", "Online gambling deposits and withdrawals", "Loan disbursements to cardholder cards", "Standard e-commerce purchases and refunds"],
    ["Redirect Checkout", "Supported. Includes Google Pay and Apple Pay redirect via IPGPaymentContext.", "Supported", "Supported"],
    ["Embedded Checkout", "Supported", "Supported", "Supported"],
    ["Modal", "Supported", "Supported", "Supported"],
    ["Apple Pay", "JS SDK with redirect; iCard redirect page handles Apple Pay checkout", "JS SDK only; full native Apple Pay flow without redirect", "JS SDK only; full native Apple Pay flow without redirect"],
    ["Google Pay", "JS SDK with redirect; IPGPurchase + IPGPaymentContext=GooglePay", "JS SDK only; full native Google Pay flow", "JS SDK only; full native Google Pay flow"],
    ["Backend payout / credit", "IPGOCT gaming withdrawal", "IPGFundsDisbursement loan to card", "Not available"],
    ["Refund", "Not available", "Not available", "Supported"],
    ["Reversal", "Mandatory", "Mandatory", "Mandatory"],
    ["Transaction status check", "Available for IPGOCT", "Available for IPGFundsDisbursement", "Not documented"],
  ]
);
const backendComparisonTable = table(
  "Backend Method Comparison",
  ["Field / Behavior", "IPGOCT (Gambling)", "IPGFundsDisbursement (CI)", "IPGRefund (ECommerce)"],
  [
    ["Purpose", "Return winnings to player's card", "Grant loan to cardholder's card", "Refund customer for purchase"],
    ["Reference field name", "IPG_Trnref", "IPG_Trnref", "IPG_Trnref"],
    ["CardToken field name", "CardToken", "CardToken", "N/A - no token option"],
    ["OrderID max length", "50 characters", "255 characters", "50 characters"],
    ["Requires RecipientFirstName", "Yes, mandatory", "Yes, mandatory", "No"],
    ["Requires RecipientLastName", "Yes, mandatory", "Yes, mandatory", "No"],
    ["Requires Email", "No", "No", "Yes, mandatory"],
    ["Requires Amount in request", "Yes", "Yes", "Yes"],
    ["RRN in response", "Not present", "RRN field present", "Not present"],
    ["IPGTrnrefOriginal in response", "Present when using TRN plus Approval", "Present when using TRN plus Approval", "Not present"],
    ["Response field names", "Standard: IPGmethod, Status, StatusMsg", "Standard plus RRN extra field", "Lowercase: method, status, status_msg, trnref, amount, currency"],
  ]
);
const paymentAvailabilityTable = table(
  "Payment Method Availability by Business Model",
  ["Payment Method", "BM Gambling", "BM Credit Institution", "BM ECommerce"],
  [
    ["Card Pay", "Redirect + Embedded + Modal", "Redirect + Embedded + Modal", "Redirect + Embedded + Modal"],
    ["Stored Card", "Redirect + Embedded + Modal", "Redirect + Embedded + Modal", "Redirect + Embedded + Modal"],
    ["Google Pay", "JS SDK with redirect via IPGPurchase + IPGPaymentContext=GooglePay", "JS SDK only, full native flow", "JS SDK only, full native flow"],
    ["Apple Pay", "JS SDK with redirect via IPGPurchase + IPGPaymentContext=ApplePay", "JS SDK only via IPGTokenProviderSession + IPGTokenizedCardPurchase", "JS SDK only via IPGTokenProviderSession + IPGTokenizedCardPurchase"],
  ]
);
const keyFieldDifferencesTable = table(
  "Key Field Differences",
  ["Feature / Method", "BM Gambling", "BM Credit Institution", "BM ECommerce"],
  [
    ["IPGPaymentContext field", "Required for Google/Apple Pay redirect: GooglePay or ApplePay", "Not used; wallet payments use JS SDK only", "Not used; wallet payments use JS SDK only"],
    ["MobileNumber in IPGPurchase", "Mandatory", "Mandatory", "Mandatory"],
    ["OrderID max length in IPGPurchase", "50 characters", "50 characters", "50 characters"],
    ["OrderID max length in backend payout", "50 characters for IPGOCT", "255 characters for IPGFundsDisbursement", "50 characters for IPGRefund"],
    ["CardToken parameter name (4.5)", "CardToken, renamed from Token in earlier versions", "CardToken, renamed from Token in earlier versions", "CardToken, renamed from Token in earlier versions"],
    ["Callback StoreCard.CardToken description", "Token for subsequent payments when customer saves card", "Token for subsequent payments when customer saves card", "Token used in IPG3DSPurchaseWithStoredCard"],
    ["Google Pay IPGTokenizedCardPurchase availability", "Not applicable; uses redirect", "Full JS SDK flow required", "Full JS SDK flow required"],
    ["Apple Pay IPGTokenProviderSession availability", "Not applicable; uses redirect", "Required for JS SDK flow", "Required for JS SDK flow"],
    ["IPGGetTxnStatus use case", "For IPGOCT", "For IPGFundsDisbursement", "Not applicable"],
  ]
);
const protocolChangesTable = table(
  "Protocol 4.2 to 4.5 Changes",
  ["Feature", "Change in v4.5"],
  [
    ["Signature", "New RSA-SHA256 algorithm with natural sort order."],
    ["Notification method", "Notify methods removed. Replaced with JSON callbacks to URL_Notify."],
    ["Failed notification behavior", "Reversal on missed notification removed. IPG retries until HTTP 200 OK is received, up to 53 attempts."],
    ["Redirect behavior", "Redirect to URL_OK/URL_Cancel now uses GET. No data is sent in the redirect."],
    ["Token encryption", "Token encryption requirement removed in stored-card, modal, and payout methods."],
    ["CartItems", "CartItems requirement removed from all methods."],
    ["FieldsOrder field", "Eliminated from backend method responses."],
    ["PostResultAction", "New redirect field. Values: Redirect or CloseWindow."],
    ["Embedded checkout", "Widget integrations removed. Use IPGEmbeddedPayment instead."],
    ["IPG3DSPurchaseWithStoredCard", "Billing address fields are no longer mandatory."],
    ["IPGReversal", "New fields added: OrderID and MID."],
    ["OrderID length", "Changed to 50 characters except IPGFundsDisbursement in BM CI, which allows 255."],
    ["CardToken parameter", "Renamed from Token to CardToken in all methods."],
    ["Payout response parameters", "IPGOCT and IPGFundsDisbursement response parameters changed. New fields added."],
    ["Error codes", "New error codes and messages added."],
  ]
);

export const ipgVersionDocuments = {
  "4.2": {
    id: "4.2",
    label: "Protocol 4.2",
    status: "Legacy",
    description: "Older legacy integrations. Use only when your merchant setup explicitly requires it.",
    summary: {
      title: "IPG 4.2 Summary",
      subtitle: "Version Summary",
      description:
        "Summary page for clients integrating against IPG 4.2 or migrating from 4.2 to the current 4.5 reference.",
      facts: ["Legacy version", "High-level migration notes", "Compare against 4.5"],
      body: [
        "The 4.2 documentation sections in this explorer now follow IPG_API_v4.2_rev.36_20250416. They keep the same high-level structure, but use the 4.2 method set, notification model, stored-card Token fields, CartItems requirement, and Payment Modal flow.",
        "If a merchant is still on 4.2, confirm the exact enabled protocol with iCard before implementation. The key migration risks compared with 4.5 are request signing, notification acknowledgement, redirect result handling, CartItems, and the Token to CardToken change.",
      ],
      tables: [
        table(
          "Key Differences: 4.2 to 4.5",
          ["Area", "4.2 legacy consideration", "4.5 behavior", "Integration impact"],
          [
            ["Signature", "Legacy signing helpers are not compatible with 4.5 as-is.", "RSA-SHA256 canonicalization with lowercased keys, natural sort, and Base64 signature.", "Rebuild signing and verification around the 4.5 canonical string rules."],
            ["Callbacks", "Older integrations may rely on notify or redirect-side confirmation.", "Signed JSON callbacks to URL_Notify are the backend source of truth.", "Implement callback verification, idempotency, and retry-safe order updates."],
            ["Redirects", "Older flows may expect result data after redirect.", "URL_OK and URL_Cancel use GET without payment payload.", "Use redirect only for customer navigation, not settlement confirmation."],
            ["Stored card token", "Older implementations may use Token.", "4.5 uses CardToken.", "Rename request fields and stored-token mappings."],
            ["Embedded / widget", "Older widget-style integrations may exist.", "Use IPGEmbeddedPayment for embedded checkout.", "Plan a frontend integration update if widgets are present."],
            ["Modal", "Older token/modal request rules may differ.", "IPGPaymentToken returns the token used by payment-modal.js.", "Review modal bootstrap and URL_Notify handling."],
            ["Backend operations", "Older backend responses may differ.", "4.5 adds or changes response fields for reversal and payout methods.", "Update parsers, reconciliation, and timeout handling."],
          ]
        ),
      ],
    },
  },
  "4.5": {
    id: "4.5",
    label: "Protocol 4.5",
    status: "Current",
    description: "Current IPG reference and recommended integration target.",
    summary: {
      title: "IPG 4.5 Summary",
      subtitle: "Version Summary",
      description:
        "Summary page for the current IPG 4.5 documentation and the main protocol changes introduced from earlier versions.",
      facts: ["Current version", "Recommended integration target", "All business models"],
      body: [
        "Protocol 4.5 is the current documentation set in this explorer. It uses RSA-SHA256 signing, JSON callbacks to URL_Notify, GET redirects without payment payload, and CardToken naming for stored-card flows.",
        "Use this summary as the final checklist after reviewing the relevant implementation method pages.",
      ],
      tables: [protocolChangesTable],
    },
  },
};

export const ipgVersions = Object.values(ipgVersionDocuments).map(
  ({ id, label, status, description }) => ({
    id,
    label,
    status,
    description,
  })
);

export const ipgMenu = [
  {
    title: "General",
    items: [
      { id: "ipg-overview", label: "Overview & Architecture", type: "overview" },
      { id: "ipg-integration-steps", label: "Integration steps", type: "guide" },
      { id: "ipg-http-post", label: "HTTP POST", type: "guide" },
      { id: "ipg-data-types", label: "Data type formats", type: "schema" },
      { id: "ipg-response-codes", label: "Response codes", type: "schema" },
      { id: "ipg-carts", label: "Carts", type: "schema" },
      { id: "ipg-security", label: "Security & signatures", type: "guide" },
      { id: "ipg-signature-generation", label: "Signature generation", type: "guide" },
      { id: "ipg-signature-verification", label: "Signature verification", type: "guide" },
      { id: "ipg-signing-example", label: "Step-by-step signing example", type: "guide" },
    ],
  },
  {
    title: "Callbacks",
    items: [
      { id: "ipg-callbacks", label: "Callbacks overview", type: "guide" },
      { id: "ipg-callback-retries", label: "Handling & retries", type: "guide" },
      { id: "ipg-callback-troubleshooting", label: "Troubleshooting", type: "guide" },
      { id: "ipg-callback-payment", label: "Object Payment", type: "schema" },
      { id: "ipg-callback-carddata", label: "Object CardData", type: "schema" },
      { id: "ipg-callback-customer", label: "Object Customer", type: "schema" },
      { id: "ipg-callback-operation", label: "Object Operation", type: "schema" },
      { id: "ipg-callback-errors", label: "Array Errors", type: "schema" },
      { id: "ipg-callback-examples", label: "Common callback examples", type: "guide" },
    ],
  },
  {
    title: "Implementation Types",
    items: [
      { id: "ipg-redirect-overview", label: "Redirect checkout", type: "guide" },
      { id: "ipg-embedded-overview", label: "Embedded checkout", type: "guide" },
      { id: "ipg-modal-overview", label: "Modal implementation", type: "guide" },
      { id: "ipg-wallet-overview", label: "Wallet JS SDK overview", type: "guide" },
      { id: "ipg-apple-pay", label: "Apple Pay JS SDK", type: "guide" },
      { id: "ipg-apple-domain", label: "Apple Pay domain registration", type: "guide" },
      { id: "ipg-google-pay", label: "Google Pay JS SDK", type: "guide" },
      { id: "ipg-wallet-sdk", label: "JS SDK setup", type: "guide" },
    ],
  },
  {
    title: "API Methods",
    items: [
      { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
      { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
      { id: "ipg-embedded-purchase", label: "IPGEmbeddedPayment - IPGPurchase", type: "post" },
      { id: "ipg-embedded-stored", label: "IPGEmbeddedPayment - Stored Card", type: "post" },
      { id: "ipg-payment-token-purchase", label: "IPGPaymentToken - IPGPurchase", type: "post" },
      { id: "ipg-payment-token-stored", label: "IPGPaymentToken - Stored Card", type: "post" },
      { id: "ipg-token-provider-session", label: "IPGTokenProviderSession", type: "post" },
      { id: "ipg-tokenized-card-purchase", label: "IPGTokenizedCardPurchase", type: "post" },
    ],
  },
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-oct", label: "IPGOCT", type: "post" },
      { id: "ipg-funds-disbursement", label: "IPGFundsDisbursement", type: "post" },
      { id: "ipg-refund", label: "IPGRefund", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
    ],
  },
  {
    title: "Business Models",
    items: [
      { id: "ipg-business-models", label: "Master comparison", type: "schema" },
      { id: "ipg-feature-matrix", label: "Feature matrix", type: "schema" },
      { id: "ipg-payment-availability", label: "Payment method availability", type: "schema" },
      { id: "ipg-key-field-differences", label: "Key field differences", type: "schema" },
      { id: "ipg-protocol-changes", label: "4.2 to 4.5 changes", type: "schema" },
    ],
  },
];
export const ipgContent = {
  "ipg-overview": {
    title: "IPG API 4.5",
    subtitle: "Overview & Architecture",
    description:
      "Complete integration reference for IPG protocol 4.5 across BM Gambling, BM Credit Institution, and BM ECommerce.",
    facts: ["Protocol 4.5", "HTTPS", "RSA-SHA256 signatures", "JSON callbacks"],
    body: ipgIntroductionBody,
    tables: [ipgProvidesTable, ipgOutOfScopeTable, implementationTypesTable],
  },
  "ipg-integration-steps": {
    title: "Merchant Integration Steps",
    subtitle: "General",
    description:
      "Step-by-step operational journey from initial technical discovery to full production launch.",
    facts: ["Technical discovery", "Sandbox testing", "Production validation", "Go-live monitoring"],
    body: [
      "These integration steps apply to every IPG business model and protocol version shown in the explorer. Use the method-specific pages for request details, then use this page as the launch process checklist.",
      "The process is designed to keep implementation secure, auditable, and predictable: first agree the integration scope, then prove the implementation in Sandbox, validate a limited production flow, and only then move to full live traffic.",
      "If questions appear during the process, contact the assigned Integration Manager or the iCard technical integration support team.",
    ],
    resources: [resources.productionSignatureGenerator, resources.integrationSupport],
    tables: [
      merchantIntegrationJourneyTable,
      sandboxIntegrationChecklistTable,
      productionValidationChecklistTable,
    ],
  },
  "ipg-http-post": {
    title: "HTTP POST",
    subtitle: "General",
    description:
      "Data transfer between Merchant and IPG is made by HTTP POST.",
    facts: ["Sandbox endpoint", "Production endpoint", "UTF-8", "application/x-www-form-urlencoded"],
    body: [
      "All parameters for requests are placed in the body in [parameter=value] form.",
      "The separator between tokens is [&]. The body is URL encoded and the character encoding is UTF-8.",
      "The Signature parameter must be appended as the last parameter in the POST body for signed requests.",
      "Sandbox endpoint: https://dev-ipg.icards.eu/sandbox/",
      "Production endpoint: https://ipg.icard.com/",
    ],
    request: `POST /sandbox/ HTTP/2
Host: dev-ipg.icards.eu
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0
Content-Length: 793
Content-Type: application/x-www-form-urlencoded

IPGmethod=IPGPurchase&KeyIndex=1&KeyIndexResp=1&IPGVersion=4.2&Language=en&Originator=33...`,
  },
  "ipg-data-types": {
    title: "Data Type Formats",
    subtitle: "General",
    description: "IPG uses fixed data type notation for request, response, and callback properties.",
    tables: [dataTypesTable],
  },
  "ipg-response-codes": {
    title: "Card Scheme Response Codes",
    subtitle: "General",
    description:
      "Complete card-scheme and issuer response-code reference used to interpret provider processing outcomes.",
    facts: ["170 response codes", "Provider outcome", "00 means approval", "Do not confuse with IPG status"],
    body: [
      "These values describe the provider, issuer, or card-scheme processing outcome. In IPG 4.5 callbacks, the value can appear as Operation.Provider.RespCode when provider data is available.",
      "Response code 00 represents successful approval or completion. Other values explain a decline, referral, validation problem, routing issue, limit, security result, or unavailable service.",
      "A provider response code is not the same as the IPG API Status, Operation.Code, HTTP callback acknowledgement, or business order status. Always evaluate the complete verified response or callback before updating the merchant order.",
      "Do not show raw provider descriptions directly to customers when they expose operational or security details. Map them to suitable customer-facing messages while preserving the original code for support and reconciliation.",
    ],
    tables: cardSchemeResponseCodeTables,
  },
  "ipg-carts": {
    title: "Carts and Order Line Items",
    subtitle: "General",
    description:
      "How cart and order-line data should be handled in IPG 4.5 and when migrating from IPG 4.2.",
    facts: ["CartItems removed in 4.5", "Merchant-side order source", "Do not send legacy cart fields", "Migration guidance"],
    body: [
      "IPG 4.5 removed the legacy Cart logical record and CartItems requirement from IPG methods. Build the 4.5 request only from the parameters documented for the selected method.",
      "Keep the authoritative order and line-item data in the merchant backend. Validate the final amount and currency from trusted server-side order state before signing the IPG request.",
      "When migrating from IPG 4.2, remove Cart, CartItems, and indexed cart-item parameters from the IPG request builder and from the canonical string used for the 4.5 signature.",
      "Send legacy cart parameters only when iCard has explicitly provided and enabled a separate merchant-specific contract.",
    ],
    tables: [cartVersionComparisonTable],
  },
  "ipg-security": {
    title: "Signatures Overview",
    subtitle: "Security & Signatures",
    description:
      "The data communication between the merchant web service and the iCard payment platform is protected by TLS 1.2 or later and by digital signatures.",
    facts: ["TLS 1.2+", "RSA-SHA256", "Public key exchange", "Verify before trust"],
    body: [
      "TLS ensures the confidentiality of transmitted data, but it does not guarantee message integrity or prove that the sender possesses the private key. Therefore, every message must be digitally signed with the private key.",
      "For the signing process, both iCARD and the Merchant generate RSA public/private key pairs and exchange public keys. Each party signs messages with its private key, and the opposite side authenticates the sender with the corresponding public key.",
      "Regardless of the interface used for the payment platform, digital signatures must be included in all requests, callbacks, and responses.",
      "Before sending a request to the platform, generate a Signature and include it in the request. When receiving responses and callbacks, verify the received data before trusting or processing it.",
      "This section separates signature generation, verification, and examples for testing workflows that use signatures.",
    ],
    resources: [resources.productionSignatureGenerator],
  },
  "ipg-signature-generation": {
    title: "Signature Generation",
    subtitle: "Security & Signatures",
    description:
      "Signature generation for IPG version greater than or equal to 4.5 uses canonicalization, SHA-256 signing, and Base64 encoding.",
    facts: ["IPG >= 4.5", "Exclude Signature", "Natural sort", "Signature last"],
    body: [
      "Data to sign generally means the request body with all request parameters except Signature. The Signature parameter must not be present in the data to sign, even as an empty value.",
      "Change all keys to lowercase, encode Boolean false as 0 and true as 1, and convert each parameter into a colon-delimited path string in the form parent_1:...:parent_n:parameter_name:parameter_value.",
      "Preserve empty values, add array indexes starting from zero, ignore empty arrays, convert all strings to UTF-8, sort the resulting strings in natural order, and join them with semicolons.",
      "Sign the canonical string with SHA-256 using the merchant private key, encode the binary signature with Base64, then add Signature to the request body.",
    ],
    tables: [signatureGenerationInputsTable, signatureGenerationStepsTable],
    resources: [resources.productionSignatureGenerator],
    request: `PHP
$privateKey = openssl_get_privatekey($privateKeyString);
openssl_sign($dataToSign, $signature, $privateKey, OPENSSL_ALGO_SHA256);
$base64Signature = base64_encode($signature);

C#
var privateCert = File.ReadAllText(privateKeyString);
var key = RSA.Create();
key.ImportFromPem(privateCert.ToCharArray());
var sha = SHA256.Create();
var signature = key.SignHash(
  sha.ComputeHash(Encoding.UTF8.GetBytes(dataToSign)),
  HashAlgorithmName.SHA256,
  RSASignaturePadding.Pkcs1
);
var base64Signature = Convert.ToBase64String(signature);`,
    response: `Signature=<base64-signature>
Signature must be added to the request body after the canonical string is signed and Base64 encoded.`,
  },
  "ipg-signature-verification": {
    title: "Signature Verification",
    subtitle: "Security & Signatures",
    description:
      "Every response and callback must be verified with the same canonicalization algorithm used for signing.",
    facts: ["Extract Signature", "Remove it from data", "Normalize remaining fields", "Verify with iCard public key"],
    body: [
      "The usual input is a signed callback or response body in JSON format with a Signature parameter, plus the iCard public key.",
      "Validate that the data conforms to JSON, contains a Signature value, and that the public key is available.",
      "Store the Signature value, remove Signature from the data, decode the Signature from Base64, and generate the canonical string from the remaining data using the same rules as signature generation.",
      "Verify the decoded signature against the canonical string with SHA-256 and the public key. If verification fails, reject the message.",
    ],
    tables: [signatureVerificationInputsTable, signatureVerificationStepsTable],
    request: `PHP
$publicKey = openssl_get_publickey($publicKeyString);
$result = openssl_verify($dataToVerify, base64_decode($signature), $publicKey);

C#
var publicCert = File.ReadAllText(publicKeyString);
var verifyKey = RSA.Create();
verifyKey.ImportFromPem(publicCert.ToCharArray());
var sha = SHA256.Create();
var result = verifyKey.VerifyHash(
  sha.ComputeHash(Encoding.UTF8.GetBytes(dataToVerify)),
  Convert.FromBase64String(signature),
  HashAlgorithmName.SHA256,
  RSASignaturePadding.Pkcs1
);`,
    response: `Valid signature: continue processing.
Invalid signature: reject the response or callback.`,
  },
  "ipg-signing-example": {
    title: "Step-by-Step Signing Example",
    subtitle: "Security & Signatures",
    description:
      "The PDF includes a concrete canonical string example for IPGPurchase.",
    body: [
      "The example starts from an IPGPurchase request, removes Signature, lowercases keys, normalizes BoolExample=true to boolexample:1, preserves EmptyExample as emptyexample:, sorts naturally, and joins with semicolons.",
      "Each card below represents one signing step. Follow them in order to build the canonical string, sign it with RSA-SHA256, and add the resulting Base64 value to the request.",
    ],
    resources: [resources.productionSignatureGenerator],
    examplesTitle: "Signing Steps",
    examples: [
      {
        title: "1. Start From Request Parameters",
        description: "Use all request fields before signing and do not include Signature in the data to sign.",
        code: `IPGmethod=IPGPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=en
Originator=33
BannerIndex=1
MID=000000000000113
Amount=1.00
Currency=975
MIDName=IPG TEST 4.5
CustomerIP=127.0.0.1
OrderID=8A540554-1551-4533-B246-42CAD55EE8DE
CustomerIdentifier=SZ-1868
BoolExample=true
EmptyExample=`,
      },
      {
        title: "2. Normalize Fields",
        description: "Lowercase keys, convert Boolean true to 1, and preserve empty values as empty strings.",
        code: `ipgmethod:IPGPurchase
keyindex:1
keyindexresp:1
ipgversion:4.5
language:en
originator:33
bannerindex:1
mid:000000000000113
currency:975
amount:1.00
midname:IPG TEST 4.5
customerip:127.0.0.1
orderid:8A540554-1551-4533-B246-42CAD55EE8DE
customeridentifier:SZ-1868
boolexample:1
emptyexample:`,
      },
      {
        title: "3. Sort Naturally",
        description: "Sort every canonical field string in natural order before joining them.",
        code: `amount:1.00
bannerindex:1
boolexample:1
currency:975
customeridentifier:SZ-1868
customerip:127.0.0.1
emptyexample:
ipgmethod:IPGPurchase
ipgversion:4.5
keyindex:1
keyindexresp:1
language:en
mid:000000000000113
midname:IPG TEST 4.5
orderid:8A540554-1551-4533-B246-42CAD55EE8DE
originator:33`,
      },
      {
        title: "4. Build String To Sign",
        description: "Join the sorted strings with semicolons. This exact UTF-8 string is signed.",
        code: `amount:1.00;bannerindex:1;boolexample:1;currency:975;customeridentifier:SZ-1868;customerip:127.0.0.1;emptyexample:;ipgmethod:IPGPurchase;ipgversion:4.5;keyindex:1;keyindexresp:1;language:en;mid:000000000000113;midname:IPG TEST 4.5;orderid:8A540554-1551-4533-B246-42CAD55EE8DE;originator:33`,
      },
      {
        title: "5. Sign And Encode",
        description: "Sign the canonical string with the merchant private key using SHA-256, then Base64 encode it.",
        code: `PHP
$privateKey = openssl_get_privatekey($privateKeyString);
openssl_sign($dataToSign, $signature, $privateKey, OPENSSL_ALGO_SHA256);
$base64Signature = base64_encode($signature);

C#
var privateCert = File.ReadAllText(privateKeyString);
var key = RSA.Create();
key.ImportFromPem(privateCert.ToCharArray());
var sha = SHA256.Create();
var signature = key.SignHash(
  sha.ComputeHash(Encoding.UTF8.GetBytes(dataToSign)),
  HashAlgorithmName.SHA256,
  RSASignaturePadding.Pkcs1
);
var base64Signature = Convert.ToBase64String(signature);`,
      },
      {
        title: "6. Add Signature",
        description: "Add the final Base64 signature value to the request body and use the same canonicalization for verification.",
        code: `Final Signature value:
PNYhiEtXvwTB2ixMID+hYuJIc7+VUlYcQzyH9xXTSGm2K7NiSNBe9oYeyv0Bi0e==

Verification follows the same canonicalization.
Remove Signature from the callback or response body, lowercase and flatten the remaining JSON fields, sort naturally, join with semicolons, then verify the decoded signature with the iCard public key.`,
      },
    ],
  },
  "ipg-callbacks": {
    title: "Callbacks",
    subtitle: "Callbacks",
    description:
      "A callback is a system message sent from the IPG API payment platform to the merchant web service.",
    facts: ["HTTP POST", "URL_Notify", "Environment IP allowlist", "Verify Signature", "Respond HTTP 200 OK"],
    body: [
      "Callbacks contain information about a specific event in the payment platform that usually takes place while processing a payment or storing customer payment data.",
      "The callback is the reliable backend channel for payment outcome and stored-card information. Browser redirects should not be treated as settlement confirmation.",
      "Every callback must be accepted only from the documented source addresses for the active environment and must be verified by checking the included Signature.",
      "Production callbacks may originate from IPv4 address 185.161.233.7 or IPv6 address 2a07:c881::7. Sandbox callbacks originate from IPv4 address 82.119.81.211.",
      "Treat source-IP filtering and signature verification as separate controls: the allowlist limits network access, while the Signature proves message integrity and authenticity.",
    ],
    tables: [callbackIpAllowlistTable, callbackHandlingStepsTable],
  },
  "ipg-callback-retries": {
    title: "Handling & Retries",
    subtitle: "Callbacks",
    description:
      "The merchant endpoint must respond with the correct synchronous HTTP status so IPG can determine whether the callback was accepted.",
    body: [
      "Confirm callback receipt by returning 200 OK when no errors have been detected.",
      "If an error is detected, return a response code that corresponds to the error type, such as 400 Bad Request for parsing issues or 500 Internal Server Error for incorrect URL routing or server problems.",
      "If 200 OK is not received, the callback is sent again regardless of the error type.",
      "Automatic callback delivery attempts generally do not exceed one day and stop after a total of 53 attempts.",
    ],
    tables: [callbackResponseCodesTable, retryScheduleTable],
  },
  "ipg-callback-troubleshooting": {
    title: "Callback Troubleshooting",
    subtitle: "Callbacks",
    description:
      "Use this page when callbacks are not received at the specified URL_Notify endpoints.",
    facts: ["Check requests", "Check callback URLs", "Verify reachability", "Contact iCard support"],
    body: [
      "There can be cases when callbacks are not received at the specified URLs for different reasons.",
      "The first split is whether callbacks are not triggered by any event at all, or whether requests are accepted but delivery to the merchant URL is failing.",
      "Start by confirming that the correct requests were sent and accepted by the platform, then verify that the callback URLs are correct and reachable.",
      "Confirm that the firewall, reverse proxy, load balancer, CDN, and application security layer allow the correct callback source address for the environment being tested.",
      "For Production, allow 185.161.233.7 and 2a07:c881::7. For Sandbox, allow 82.119.81.211. If the endpoint does not support IPv6, make sure IPv4 delivery remains reachable.",
    ],
    tables: [callbackIpAllowlistTable, callbackTroubleshootingTable],
    resources: [resources.integrationSupport, resources.customerSupport],
  },
  "ipg-callback-payment": {
    title: "Object Payment",
    subtitle: "Callbacks",
    description: "This mandatory object contains essential payment details and merchant transaction identifiers.",
    fieldSections: [{ title: "Payment Parameters", fields: callbackPaymentFields }],
  },
  "ipg-callback-carddata": {
    title: "Object CardData",
    subtitle: "Callbacks",
    description: "The optional CardData object contains masked card data and stored-card token details when present.",
    fieldSections: [{ title: "CardData Parameters", fields: callbackCardDataFields }],
  },
  "ipg-callback-customer": {
    title: "Object Customer",
    subtitle: "Callbacks",
    description: "The optional Customer object echoes customer-related input data.",
    fieldSections: [{ title: "Customer Parameters", fields: callbackCustomerFields }],
  },
  "ipg-callback-operation": {
    title: "Object Operation",
    subtitle: "Callbacks",
    description: "The optional Operation object describes the processing operation, provider result, and status codes.",
    fieldSections: [{ title: "Operation Parameters", fields: callbackOperationFields }],
  },
  "ipg-callback-errors": {
    title: "Array Errors",
    subtitle: "Callbacks",
    description:
      "The optional Errors array is present when the operation type is merchant_validation. Each item is an ErrorItem object.",
    fieldSections: [{ title: "ErrorItem Parameters", fields: callbackErrorFields }],
  },
  "ipg-callback-examples": {
    title: "Common Callback Examples",
    subtitle: "Callbacks",
    description:
      "The callback examples cover declined 3DS flows, failed merchant validation, declined authorization, and successful authorization.",
    facts: ["Declined 3DS frictionless", "Failed merchant validation", "Declined 3DS challenge", "Declined payment", "Success payment"],
    body: [
      "Use these callback examples as reference payloads for the most common payment outcomes. The merchant must verify the included Signature before changing order state, storing card data, or notifying the customer.",
      "Each example is shown separately so implementation teams can compare the Payment, Operation, Errors, and Signature structure without using the right-side request/response/example rail.",
    ],
    example: `Declined 3DS - frictionless flow
{
  "CardData": {
    "Pan": "400609***0007",
    "Type": "VISA",
    "CardholderName": "Test",
    "ExpMonth": "06",
    "ExpYear": "26"
  },
  "Customer": {
    "Email": "test@test.com",
    "Phone": "+35988123456",
    "Identifier": "SZ-1868",
    "IPAddress": "127.0.0.1"
  },
  "Payment": {
    "OrderId": "3AC309F6-5184-4721-B3E1-8CA08070235B",
    "MID": "000000000000113",
    "Date": "2025-05-14T10:45:30+03:00",
    "Type": "IPGPurchase",
    "Context": "",
    "Status": "declined",
    "Sum": { "Amount": "20.00", "Currency": 975 },
    "Interface": "modal",
    "Description": "note"
  },
  "Operation": {
    "Type": "3ds_authentication",
    "Status": "declined",
    "Date": "2025-05-14T10:45:30+03:00",
    "Code": 3008,
    "Message": "No Card record",
    "Sum": { "Amount": "20.00", "Currency": 975 }
  },
  "Signature": "CX7IqNnJGHej9nzd ... PoZXJHkoTpBMGMuybblrG9jU="
}

Failed merchant validation
{
  "Payment": {
    "OrderId": "1A3BBFE5-78B4-46C6-900A-853006365A08",
    "MID": "000000000000112",
    "Date": "2025-05-14T10:40:11+03:00",
    "Type": "IPGPurchase",
    "Context": "",
    "Status": "declined",
    "Sum": { "Amount": "1.00", "Currency": 978 },
    "Interface": "redirect",
    "Description": "notee"
  },
  "Operation": { "Type": "merchant_validation", "Status": "declined", "Code": 9005 },
  "Errors": [
    {
      "Code": 9033,
      "Description": "Invalid banner index",
      "Field": "BannerIndex",
      "Message": "Invalid integer for banner index value"
    }
  ],
  "Signature": "RmGl2DCsQba8 ... 3eqNbjXBVSUdb3Lxx9zCWu/M="
}

Declined 3DS - challenge flow
{
  "CardData": {
    "Pan": "400609***0007",
    "Type": "VISA",
    "CardholderName": "Test",
    "ExpMonth": "06",
    "ExpYear": "26"
  },
  "Customer": {
    "Email": "test@test.com",
    "Phone": "+35988123456",
    "Identifier": "SZ-1868",
    "IPAddress": "127.0.0.1"
  },
  "Payment": {
    "OrderId": "99D72F74-0A57-43B7-A948-2AB4E1145662",
    "MID": "000000000000113",
    "Date": "2025-05-14T10:53:20+03:00",
    "Type": "IPGPurchase",
    "Context": "",
    "Status": "declined",
    "Sum": { "Amount": "201.00", "Currency": 975 },
    "Interface": "modal",
    "Description": "note"
  },
  "Operation": {
    "Type": "3ds_challenge",
    "Status": "declined",
    "Date": "2025-05-14T10:53:20+03:00",
    "Code": 3001,
    "Message": "Card authentication failed",
    "Sum": { "Amount": "201.00", "Currency": 975 }
  },
  "Signature": "CX7IqNnJGHej9nzd ... PoZXJHkoTpBMGMuybblrG9jU="
}

Declined payment
{
  "CardData": {
    "Pan": "539260***6203",
    "Type": "MasterCard",
    "CardholderName": "Test",
    "ExpMonth": "06",
    "ExpYear": "25"
  },
  "Customer": {
    "Email": "test@test.com",
    "Phone": "+35988123456",
    "Identifier": "SZ-1868",
    "IPAddress": "127.0.0.1"
  },
  "Payment": {
    "OrderId": "E34C4058-D375-4B19-A2FF-8FA0EAC4639E",
    "MID": "000000000000113",
    "Date": "2025-05-14T10:56:04+03:00",
    "Type": "IPGPurchase",
    "Context": "",
    "Status": "declined",
    "Sum": { "Amount": "20.00", "Currency": 975 },
    "Interface": "modal",
    "Description": "note"
  },
  "Operation": {
    "Type": "authorization",
    "Status": "declined",
    "Date": "2025-05-14T10:56:04+03:00",
    "Code": 1005,
    "Message": "Refer to card Issuer",
    "Sum": { "Amount": "20.00", "Currency": 975 },
    "Provider": {
      "Trn": "20250514075602257447",
      "Date": "2025-05-14T10:56:02+03:00",
      "RespCode": "05"
    }
  },
  "Signature": "CX7IqNnJGHej9nzd ... PoZXJHkoTpBMGMuybblrG9jU="
}

Success payment
{
  "CardData": {
    "Pan": "532610***0004",
    "Type": "MasterCard",
    "CardholderName": "Test",
    "ExpMonth": "06",
    "ExpYear": "25"
  },
  "Customer": {
    "Email": "test@test.com",
    "Phone": "+35988123456",
    "Identifier": "SZ-1868",
    "IPAddress": "127.0.0.1"
  },
  "Payment": {
    "OrderId": "4C498AA8-DA12-4D5D-94C3-257A29415DAF",
    "MID": "000000000000113",
    "Date": "2025-05-14T10:51:43+03:00",
    "Type": "IPGPurchase",
    "Context": "",
    "Status": "success",
    "Sum": { "Amount": "20.00", "Currency": 975 },
    "Interface": "modal",
    "Description": "note"
  },
  "Operation": {
    "Type": "authorization",
    "Status": "success",
    "Date": "2025-05-14T10:51:43+03:00",
    "Code": 0,
    "Message": "Success",
    "Sum": { "Amount": "20.00", "Currency": 975 },
    "Provider": {
      "Trn": "20250514075143257397",
      "Date": "2025-05-14T10:51:41+03:00",
      "RespCode": "00",
      "Approval": "SWCSIM"
    },
    "Eci": "05"
  },
  "Signature": "CX7IqNnJGHej9nzd ... PoZXJHkoTpBMGMuybblrG9jU="
}`,
  },
  "ipg-redirect-overview": {
    title: "Redirect Checkout",
    subtitle: "Implementation Types",
    description:
      "Redirect checkout sends the customer to the iCard payment page for card entry, wallet selection, and 3DS handling.",
    facts: ["IPGPurchase", "IPG3DSPurchaseWithStoredCard", "URL_OK / URL_Cancel use GET", "URL_Notify is authoritative"],
    availability: allBusinessModels,
    body: [
      "Use IPGPurchase for regular card entry and IPG3DSPurchaseWithStoredCard for previously stored card tokens.",
      "For BM Gambling, Google Pay and Apple Pay can be initiated via redirect by setting IPGPaymentContext.",
    ],
    resources: [resources.redirectWorkflow, resources.redirectVisualization],
  },
  "ipg-embedded-overview": {
    title: "Embedded Checkout",
    subtitle: "Implementation Types",
    description:
      "Embedded checkout obtains a URL through IPGEmbeddedPayment and renders that URL as an iframe on the merchant page.",
    facts: ["IPGEmbeddedPayment", "iframe URL", "Same callback structure", "No Signature field in callbacks"],
    availability: allBusinessModels,
    body: [
      "Use PaymentType=IPGPurchase for new card entry or PaymentType=IPG3DSPurchaseWithStoredCard for stored cards.",
      "The merchant must verify the IPGEmbeddedPayment response signature before using the returned iframe URL.",
    ],
  },
  "ipg-modal-overview": {
    title: "Modal Implementation",
    subtitle: "Implementation Types",
    description:
      "Payment Modal opens an IPG-controlled payment overlay without navigating the customer away from the merchant page.",
    facts: ["Customer remains on merchant page", "Backend token request", "IPG-controlled overlay", "URL_Notify is authoritative"],
    availability: allBusinessModels,
    body: [
      "Payment Modal is not a redirect flow. The merchant backend first sends IPGPaymentToken and verifies the returned Token. The merchant frontend then loads payment-modal.js, which opens the payment interface as an overlay on the existing merchant page.",
      "The merchant page remains visible behind the modal. IPG owns the payment form and sensitive payment-data collection inside the overlay, while the merchant controls the surrounding page, loading state, close behavior, and customer messaging.",
      "Frontend modal events are useful for customer experience, but they do not confirm the financial result. Verify and process the signed URL_Notify callback before fulfilling an order or marking it paid.",
    ],
    resources: [resources.modalWorkflow, resources.modalVisualization],
    tables: [modalImplementationFlowTable, modalConfigurationTable, modalFrontendEventsTable],
    examplesTitle: "Payment Modal Implementation",
    examples: [
      {
        title: "1. Required Wrapper",
        description: "Add the modal mount point to the merchant checkout page.",
        code: `<div id="ipg"></div>`,
      },
      {
        title: "2. Load the Verified Token",
        description: "Load payment-modal.js only after the backend verifies the IPGPaymentToken response.",
        code: `<script>
function loadModal(domain, token, theme = "classic") {
  const script = document.createElement("script");
  script.src = domain + "js/payment-modal.js?token=" + encodeURIComponent(token) + "&theme=" + theme;
  script.id = "ipg-io-js";
  script.async = true;
  document.body.appendChild(script);
}
</script>`,
      },
      {
        title: "3. Handle Modal Events",
        description: "Use frontend events for customer experience while waiting for the backend callback.",
        code: `window.addEventListener("ipg.formload.success", () => hideLoadingState());
window.addEventListener("ipg.user.cancel", () => keepOrderUnpaid());
window.addEventListener("ipg.payment.success", () => showProcessingState());
window.addEventListener("ipg.payment.error", () => showRetryOptions());
window.addEventListener("ipg.loadmodal.error", () => showAlternativePaymentMethods());`,
      },
    ],
  },
  "ipg-wallet-overview": {
    title: "Wallet JS SDK Overview",
    subtitle: "Implementation Types",
    description:
      "Apple Pay and Google Pay use the iCard JS SDK plus backend signed IPG requests for session creation and tokenized purchase execution.",
    facts: ["Apple Pay", "Google Pay", "TokenizedCard", "Merchant backend signs IPG calls"],
    availability: allBusinessModels,
    body: [
      "Apple Pay uses IPGTokenProviderSession before IPGTokenizedCardPurchase.",
      "Google Pay uses IPGTokenizedCardPurchase directly after the browser receives tokenized wallet data.",
      "BM Gambling can also use wallet redirect through IPGPurchase with IPGPaymentContext.",
    ],
    resources: [resources.walletSdk],
    media: [
      media.appleMobileButtons,
      media.googleMobileButtons,
      media.appleSdkRedirect,
      media.googleSdkRedirect,
    ],
  },
  "ipg-apple-pay": {
    title: "Apple Pay JS SDK",
    subtitle: "Implementation Types",
    description:
      "Apple Pay starts in the customer browser, validates a merchant session through the merchant backend and IPG, then completes with a tokenized purchase.",
    facts: ["HTTPS required", "Valid SSL", "TLS 1.2", "Domain verification file required"],
    availability: allBusinessModels,
    body: [
      "The domain verification file must be hosted at https://[DOMAIN]/.well-known/apple-developer-merchantid-domain-association.",
      "The merchant backend passes the Apple session data back to the browser before the final payment can proceed.",
    ],
    resources: [resources.walletSdk],
    media: [media.appleMobileButtons, media.appleSdkRedirect],
  },
  "ipg-apple-domain": {
    title: "Apple Pay Domain Registration",
    subtitle: "Implementation Types",
    description:
      "Register and verify the merchant domain, then configure the HTTPS, TLS, SNI, and network allowlists required for Apple Pay on the web.",
    facts: ["HTTPS and valid SSL", "TLS 1.2 or later", "SNI required", "Strict Apple allowlists"],
    availability: allBusinessModels,
    link: {
      label: "Open Apple's latest server setup requirements",
      href: "https://developer.apple.com/documentation/applepayontheweb/setting-up-your-server",
    },
    body: [
      "Complete this process for every merchant domain that displays Apple Pay. Serve every page containing Apple Pay over HTTPS, use a valid SSL certificate, and support TLS 1.2 or later with one of the approved cipher suites below.",
      "After the HTTPS, TLS, SNI, and network allowlist requirements are complete, send the exact merchant domain to the iCard integration team. iCard will register the domain for Apple Pay and coordinate the domain-verification process with the merchant.",
      "When the iCard integration team provides the Apple domain-association verification file, host it without redirects at https://[DOMAIN]/.well-known/apple-developer-merchantid-domain-association and confirm that it is publicly reachable.",
      "For merchant validation, allow the merchant server to connect over HTTPS on TCP port 443 to the appropriate Apple Pay gateway domain and IP addresses. Include the TLS Server Name Indication extension because Apple Pay requires SNI on every connection.",
      "Use a strict allowlist for the listed Apple gateway domains and addresses. Production servers must use only production gateway services; the certificate gateway addresses are for development and sandbox testing only.",
      "If the merchant domain is protected from public access, allow Apple's domain-verification source ranges to reach the verification file. Apple can change these requirements and ranges, so always check the official page linked above before deployment or firewall changes.",
    ],
    notes: [
      "Do not redirect the Apple domain-association verification-file URL.",
      "Send the exact domain that will display Apple Pay to the iCard integration team only after all server and network requirements are complete.",
      "Do not allow production applications or production servers to use the Apple Pay development sandbox gateways.",
      "Gateway entries permit outbound merchant-server access to Apple Pay. Domain-verification ranges permit Apple to reach a protected merchant domain during registration or verification.",
      "Recheck the official Apple documentation before changing network policy because Apple maintains the authoritative current list.",
    ],
    tables: [
      table(
        "Apple Pay Domain Registration Process",
        ["Step", "Merchant action", "Completion check"],
        [
          ["1. Prepare the domain", "Serve every page containing Apple Pay over HTTPS with a valid SSL certificate and TLS 1.2 or later.", "The Apple Pay page and verification path are reachable through HTTPS without certificate errors."],
          ["2. Configure Apple network access", "Allow outbound HTTPS TCP/443 with SNI to the applicable production or sandbox Apple Pay gateway allowlist. If inbound access is restricted, also allow Apple's domain-verification source ranges.", "The server and protected merchant domain permit the required Apple Pay and domain-verification traffic."],
          ["3. Send the domain to iCard", "After all server and network requirements are complete, send the exact domain that will display Apple Pay to the iCard integration team.", "iCard has received the correct production or sandbox hostname and can begin Apple Pay domain registration."],
          ["4. Host the verification file", "Publish the Apple domain-association file provided during the iCard registration process at https://[DOMAIN]/.well-known/apple-developer-merchantid-domain-association without redirects.", "The exact file is publicly retrievable at the required path."],
          ["5. Complete registration with iCard", "Notify the iCard integration team when the verification file is available and resolve any certificate, path, redirect, or firewall issue identified during verification.", "iCard confirms that the merchant domain is registered and verified for Apple Pay."],
          ["6. Test merchant validation", "Test Apple Pay merchant validation and the complete payment flow in the intended environment.", "The merchant server establishes an Apple Pay session and the payment flow completes successfully."],
          ["7. Revalidate before launch", "Check Apple's official server-setup page and repeat the production-hostname test before go-live.", "The current official network requirements are applied and the live merchant-validation flow succeeds."],
        ]
      ),
      table(
        "Apple Pay TLS Cipher Suites",
        ["Cipher suite value", "Name"],
        [
          ["0x13, 0x01", "TLS_AES_128_GCM_SHA256"],
          ["0x13, 0x02", "TLS_AES_256_GCM_SHA384"],
          ["0xC0, 0x2B", "ECDHE-ECDSA-AES128-GCM-SHA256"],
          ["0xC0, 0x2F", "ECDHE-RSA-AES128-GCM-SHA256"],
          ["0xC0, 0x2C", "ECDHE-ECDSA-AES256-GCM-SHA384"],
          ["0xC0, 0x30", "ECDHE-RSA-AES256-GCM-SHA384"],
        ],
        "The merchant server must support TLS 1.2 or later and at least one Apple-approved cipher suite."
      ),
      table(
        "Apple Pay Production Gateway Allowlist",
        ["Region", "Domain", "IP addresses / CIDR blocks"],
        [
          [
            "Global",
            "apple-pay-gateway.apple.com",
            "17.171.78.7/32, 17.171.78.71/32, 17.171.78.135/32, 17.171.78.199/32, 17.171.79.12/32, 17.141.128.7/32, 17.141.128.71/32, 17.141.128.135/32, 17.141.128.199/32, 17.141.129.12/32, 17.32.214.7/32, 17.157.96.181/32, 17.33.194.239/32, 17.33.192.38/32, 17.33.193.110/32, 17.33.202.35/32, 17.33.201.101/32, 17.33.200.169/32",
          ],
          [
            "China Region",
            "cn-apple-pay-gateway.apple.com",
            "101.230.204.232/32, 101.230.204.242/32, 101.230.204.240/32, 60.29.205.104/32, 60.29.205.106/32, 60.29.205.108/32",
          ],
        ],
        "Production merchant servers connect to these destinations over HTTPS TCP/443 with SNI."
      ),
      table(
        "Apple Pay Development Sandbox Gateway Allowlist",
        ["Region", "Domain", "IP addresses / CIDR blocks"],
        [
          [
            "Global",
            "apple-pay-gateway-cert.apple.com",
            "17.171.85.7/32, 17.179.124.181/32, 17.32.214.56/32, 17.33.194.218/32, 17.33.192.145/32, 17.33.193.45/32, 17.33.200.47/32, 17.33.202.99/32, 17.33.201.105/32",
          ],
          ["China Region", "cn-apple-pay-gateway-cert.apple.com", "101.230.204.235/32"],
        ],
        "Use these destinations for development and sandbox testing only. Never configure production applications or servers to use them."
      ),
      table(
        "Apple Pay Domain Verification Source Ranges",
        ["Purpose", "IP range"],
        [
          ["Allow Apple to register or verify a protected merchant domain", "17.23.4.96/27"],
          ["Allow Apple to register or verify a protected merchant domain", "17.23.19.0/27"],
          ["Allow Apple to register or verify a protected merchant domain", "17.23.24.32/27"],
          ["Allow Apple to register or verify a protected merchant domain", "17.32.139.128/26"],
          ["Allow Apple to register or verify a protected merchant domain", "17.132.108.64/26"],
          ["Allow Apple to register or verify a protected merchant domain", "17.140.126.0/26"],
          ["Allow Apple to register or verify a protected merchant domain", "17.157.32.0/27"],
          ["Allow Apple to register or verify a protected merchant domain", "17.157.40.128/27"],
          ["Allow Apple to register or verify a protected merchant domain", "17.157.44.128/27"],
          ["Allow Apple to register or verify a protected merchant domain", "17.179.144.128/25"],
          ["Allow Apple to register or verify a protected merchant domain", "17.253.0.0/16"],
        ],
        "These source ranges are relevant when the merchant domain is protected from public access and Apple must retrieve the association file."
      ),
    ],
  },
  "ipg-google-pay": {
    title: "Google Pay JS SDK",
    subtitle: "Implementation Types",
    description:
      "Google Pay renders a native wallet button and sends tokenized card data to the merchant backend for IPGTokenizedCardPurchase.",
    facts: ["Native Google Pay button", "No Apple session step", "TokenizedCardProvider=Google", "URL_Notify required"],
    availability: allBusinessModels,
    body: [
      "The wallet sheet runs in the browser. After customer confirmation, the merchant backend signs and sends IPGTokenizedCardPurchase to IPG.",
    ],
    resources: [resources.walletSdk],
    media: [media.googleMobileButtons, media.googleSdkRedirect],
  },
  "ipg-wallet-sdk": {
    title: "JS SDK Setup",
    subtitle: "Implementation Types",
    description:
      "The same iCard JS SDK can render Apple Pay and Google Pay buttons and send wallet payloads to the merchant processing endpoint.",
    resources: [resources.walletSdk],
    media: [
      media.appleMobileButtons,
      media.googleMobileButtons,
      media.appleSdkRedirect,
      media.googleSdkRedirect,
    ],
    request: `<!-- Sandbox -->
<script src="https://dev-ipg.icards.eu/sandbox/js/icard-g-a-pay.min.js"></script>
<!-- Production -->
<script src="https://ipg.icard.com/js/icard-g-a-pay.min.js"></script>`,
    example: `const config = {
  processPaymentUrl: "<merchant_endpoint>",
  mid: "<MID>",
  merchantName: "<Name>",
  amount: "<amount>",
  currencyAlpha: "EUR",
  environment: "sandbox",
  appleConfig: { btnContainerId: "apple-btn-div", btnColor: "black", merchantDomain: "<verified_domain>" },
  googleConfig: { btnContainerId: "google-btn-div", btnColor: "black" },
  merchantSessionData: { orderId: "<order_id>" }
};
const pay = new ICardIpgGAPay(config);
pay.create();
pay.ipgSetAmount("25.00");`,
  },
  "ipg-purchase": {
    title: "IPGPurchase",
    subtitle: "API Methods",
    description:
      "Initiates the payment process. The customer is redirected to, or shown through iframe/modal, the iCard checkout page.",
    facts: ["POST Hosted/form endpoint", "Regular card payments", "Wallet redirect in BM Gambling", "URL_Notify callback"],
    availability: allBusinessModels,
    fieldSections: [{ title: "Request Parameters", fields: redirectCheckoutFields }],
    resources: [resources.redirectWorkflow, resources.redirectVisualization],
    request: `IPGmethod=IPGPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
MID=000000000000123
MIDName=My Web Shop
Amount=23.45
Currency=978
CustomerIP=127.0.0.1
OrderID=60EC4A03-0AC1-...
Email=customer@site.com
URL_OK=https://site/ok
URL_Cancel=https://site/cancel
URL_Notify=https://site/notify
MobileNumber=+359811222111
Signature=<base64-signature>`,
    response: `Redirect flow starts.
Final result is delivered through signed JSON callback to URL_Notify.`,
  },
  "ipg-3ds-stored": {
    title: "IPG3DSPurchaseWithStoredCard",
    subtitle: "API Methods",
    description:
      "Processes a payment using a previously stored card token and performs full 3DS verification.",
    facts: ["Stored CardToken", "Full 3DS verification", "VerifyCVC optional", "Billing address no longer mandatory in 4.5"],
    availability: allBusinessModels,
    fieldSections: [{ title: "Request Parameters", fields: storedCardRedirectFields }],
    resources: [resources.redirectWorkflow, resources.redirectVisualization],
    request: `IPGmethod=IPG3DSPurchaseWithStoredCard
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
MID=000000000000123
MIDName=My Shop
Amount=23.45
Currency=978
OrderID=20210916999999
CardToken=<token>
VerifyCVC=1
URL_OK=https://site/ok
URL_Cancel=https://site/cancel
URL_Notify=https://site/notify
Email=name@site.com
MobileNumber=+359811222111
Signature=<base64-signature>`,
  },
  "ipg-embedded-purchase": {
    title: "IPGEmbeddedPayment - IPGPurchase",
    subtitle: "API Methods",
    description:
      "Returns an iframe URL for regular card checkout embedded on the merchant page.",
    facts: ["PaymentType=IPGPurchase", "Theme mandatory", "URL_Notify mandatory", "Signed synchronous response"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "Request Parameters", fields: embeddedPaymentFields },
      { title: "Response Parameters", fields: embeddedResponseFields },
    ],
    request: `IPGmethod=IPGEmbeddedPayment
PaymentType=IPGPurchase
Theme=Themename
IPGVersion=4.5
MID=000000000000123
OrderID=47A11480-B3AA-...
Amount=23.45
Currency=978
URL_Notify=https://site/notify
Signature=<base64-signature>`,
    response: `{
  "IPGmethod": "IPGEmbeddedPayment",
  "OrderID": "47A11480-B3AA-...",
  "Status": "0",
  "StatusMsg": "Success",
  "URL": "https://dev-ipg.icards.eu/sandbox/...",
  "Signature": "uIkMPI...KakY="
}`,
  },
  "ipg-embedded-stored": {
    title: "IPGEmbeddedPayment - Stored Card",
    subtitle: "API Methods",
    description:
      "Returns an iframe URL for a stored-card 3DS checkout embedded on the merchant page.",
    facts: ["PaymentType=IPG3DSPurchaseWithStoredCard", "CardToken mandatory", "VerifyCVC optional", "3DS inline"],
    availability: allBusinessModels,
    fieldSections: [
      {
        title: "Additional / changed request fields",
        fields: [
          f("PaymentType", "IPG3DSPurchaseWithStoredCard", "String", "Mandatory", "Selects stored-card embedded flow."),
          f("CardToken", "D747458899D...FC43D5", "String(64)", "Mandatory", "Stored card token."),
          f("VerifyCVC", "1", "N(1)", "Optional", "If 1, customer enters CVC before payment."),
        ],
      },
      { title: "Response Parameters", fields: embeddedResponseFields },
    ],
    notes: ["All other fields are the same as IPGEmbeddedPayment with PaymentType=IPGPurchase."],
  },
  "ipg-payment-token-purchase": {
    title: "IPGPaymentToken - IPGPurchase",
    subtitle: "API Methods",
    description:
      "Backend request to obtain a token for the Modal implementation. The merchant loads payment-modal.js with the returned token.",
    facts: ["ModalType=IPGPurchase", "Signed synchronous response", "URL_Notify mandatory", "Token response"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "Request Parameters", fields: modalPaymentFields },
      { title: "Response Parameters", fields: paymentTokenResponseFields },
    ],
    resources: [resources.modalWorkflow, resources.modalVisualization],
    request: `IPGmethod=IPGPaymentToken
ModalType=IPGPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
OutputFormat=json
BannerIndex=1
MID=000000000000123
MIDName=My Shop
Amount=23.45
Currency=978
CustomerIP=127.0.0.1
OrderID=60EC4A03-...
Email=customer@site.com
URL_Notify=https://site/notify
Signature=<base64-signature>`,
    response: `IPGmethod=IPGPaymentToken
OrderID=60EC4A03-...
Status=0
StatusMsg=Success
Token=<token>
Signature=<base64-signature>`,
  },
  "ipg-payment-token-stored": {
    title: "IPGPaymentToken - Stored Card",
    subtitle: "API Methods",
    description:
      "Same as IPGPaymentToken for IPGPurchase, but uses a stored card token and handles 3DS inline in the modal.",
    facts: ["ModalType=IPG3DSPurchaseWithStoredCard", "CardToken mandatory", "VerifyCVC optional", "3DS inline"],
    availability: allBusinessModels,
    fieldSections: [
      {
        title: "Additional / changed request fields",
        fields: [
          f("ModalType", "IPG3DSPurchaseWithStoredCard", "String", "Mandatory", "Selects stored-card modal flow."),
          f("CardToken", "D747458899D...FC43D5", "String(64)", "Mandatory", "Previously stored card token."),
          f("VerifyCVC", "1", "N(1)", "Optional", "If 1, customer enters CVC before payment."),
        ],
      },
      { title: "Response Parameters", fields: paymentTokenResponseFields },
    ],
    resources: [resources.modalWorkflow, resources.modalVisualization],
    notes: ["All other request parameters are identical to IPGPaymentToken with ModalType=IPGPurchase."],
  },
  "ipg-token-provider-session": {
    title: "IPGTokenProviderSession",
    subtitle: "API Methods",
    description:
      "Creates the Apple Pay merchant session after the browser sends the Apple validation URL to the merchant backend.",
    facts: ["Apple Pay only", "Backend call", "ValidationURL", "Session response"],
    availability: availability(true, true, true),
    fieldSections: [
      {
        title: "Request Parameters",
        fields: [
          ...commonSignedRequestFields,
          f("Amount", "10.48", "Double(8,2)", "Mandatory", "Payment amount."),
          f("MerchantUrl", "dev-ipg.icards.eu", "String", "Mandatory", "Merchant domain."),
          f("ValidationURL", "https://apple-paygateway...", "String", "Mandatory", "Apple validation URL."),
          f("DisplayName", "My Store", "String", "Mandatory", "Merchant display name."),
          f("TokenizedCardProvider", "Apple", "String", "Mandatory", "Fixed value: Apple."),
          f("CustomerIP", "127.0.0.1", "String", "Mandatory", "Customer IP address."),
          f("OrderID", "8428E465-95E7-...", "String(50)", "Mandatory", "Unique order identifier."),
          f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
          f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
          f("MIDName", "MyShop", "String", "Mandatory", "Merchant name."),
          f("Email", "user@site.com", "String", "Mandatory", "Customer email."),
          f("URL_Notify", "https://site/notify", "String", "Mandatory", "Callback URL."),
          f("OutputFormat", "json", "String", "Optional", "xml or json."),
          signatureField,
        ],
      },
    ],
    response: `{
  "IPGmethod": "IPGTokenProviderSession",
  "OrderID": "8428E465-95E7-...",
  "Status": "0",
  "StatusMsg": "Success",
  "Session": "{...Apple merchant session JSON...}",
  "Signature": "..."
}`,
  },
  "ipg-tokenized-card-purchase": {
    title: "IPGTokenizedCardPurchase",
    subtitle: "API Methods",
    description:
      "Completes an Apple Pay or Google Pay purchase using tokenized wallet card data.",
    facts: ["Apple Pay / Google Pay", "TokenizedCard", "Backend call", "URL_Notify callback"],
    availability: availability(true, true, true),
    fieldSections: [
      {
        title: "Request Parameters",
        fields: [
          ...commonSignedRequestFields,
          f("TokenizedCardProvider", "Google", "String", "Mandatory", "Apple or Google."),
          f("TokenizedCard", "{...}", "JSON", "Mandatory", "Tokenized card payload received from the wallet."),
          f("Amount", "10.48", "Double(8,2)", "Mandatory", "Payment amount."),
          f("CustomerIP", "127.0.0.1", "String", "Mandatory", "Customer IP."),
          f("OrderID", "8428E465-...", "String(50)", "Mandatory", "Unique order identifier."),
          f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
          f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
          f("MIDName", "MyShop", "String", "Mandatory", "Merchant name."),
          f("Email", "user@site.com", "String", "Mandatory", "Customer email."),
          f("URL_Notify", "https://site/notify", "String", "Mandatory", "Callback URL."),
          f("OutputFormat", "json", "String", "Optional", "xml or json."),
          signatureField,
        ],
      },
    ],
  },
  "ipg-oct": createOctDocumentation("4.5"),
  "ipg-funds-disbursement": createFundsDisbursementDocumentation("4.5"),
  "ipg-refund": {
    title: "IPGRefund",
    subtitle: "Backend Methods",
    description:
      "Refund method for BM ECommerce.",
    facts: ["BM ECommerce only", "Lower-case response fields", "IPG_Trnref mandatory", "Signature verification"],
    availability: availability(false, false, true),
    fieldSections: [
      {
        title: "Request Parameters",
        fields: [
          ...commonSignedRequestFields,
          f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
          f("OrderID", "Refund-001", "String(50)", "Mandatory", "Unique refund order identifier."),
          f("IPG_Trnref", "20210916123456789012", "String", "Mandatory", "Original transaction reference."),
          f("Amount", "10.48", "Double(8,2)", "Mandatory", "Refund amount."),
          f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
          f("Email", "customer@site.com", "String", "Mandatory", "Cardholder email."),
          f("OutputFormat", "json", "String", "Optional", "xml or json."),
          signatureField,
        ],
      },
    ],
    response: `{
  "method": "IPGRefund",
  "orderid": "Refund-001",
  "trnref": "...",
  "trnreforiginal": "...",
  "amount": "10.48",
  "currency": "978",
  "status": "0",
  "status_msg": "Success",
  "signature": "..."
}`,
  },
  "ipg-reversal": {
    title: "IPGReversal",
    subtitle: "Backend Methods",
    description:
      "Reverses a previously executed payment. Mandatory for all merchants.",
    facts: ["Mandatory for all merchants", "IPG_Trnref", "OrderID + MID added in 4.5", "Backend response"],
    availability: allBusinessModels,
    fieldSections: [
      {
        title: "Request Parameters",
        fields: [
          ...commonSignedRequestFields,
          f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
          f("OrderID", "REV-001", "String(50)", "Mandatory", "Unique reversal order identifier."),
          f("IPG_Trnref", "20210916123456789012", "String", "Mandatory", "Original transaction reference."),
          f("OutputFormat", "json", "String", "Optional", "xml or json."),
          signatureField,
        ],
      },
    ],
    response: `{
  "IPGmethod": "IPGReversal",
  "OrderID": "REV-001",
  "Status": "0",
  "StatusMsg": "Success",
  "IPGTrnref": "...",
  "IPGTrnrefOriginal": "...",
  "Signature": "..."
}`,
  },
  "ipg-get-status": {
    title: "IPGGetTxnStatus",
    subtitle: "Backend Methods",
    description:
      "Reference status method for IPGOCT and IPGFundsDisbursement only.",
    facts: ["IPGOCT", "IPGFundsDisbursement", "Status + IPGTrnStatus", "Not for payment confirmation"],
    availability: availability(true, true, false),
    fieldSections: [
      {
        title: "Request Parameters",
        fields: [
          ...commonSignedRequestFields,
          f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
          f("OrderID", "Original-order-id", "String", "Mandatory", "OrderID of the previous IPGOCT or IPGFundsDisbursement."),
          f("OutputFormat", "json", "String", "Optional", "xml or json."),
          signatureField,
        ],
      },
    ],
    response: `{
  "IPGmethod": "IPGGetTxnStatus",
  "OrderID": "...",
  "Status": "0",
  "StatusMsg": "Success",
  "IPGTrnStatus": 0,
  "IPGTrnStatusMsg": "Success",
  "Signature": "..."
}`,
  },
  "ipg-business-models": {
    title: "Business Model Differences",
    subtitle: "Business Models",
    description:
      "Master comparison for deciding which IPG 4.5 model, method, and wallet flow applies.",
    tables: [featureMatrixTable, backendComparisonTable, paymentAvailabilityTable, keyFieldDifferencesTable],
  },
  "ipg-feature-matrix": {
    title: "Feature Matrix",
    subtitle: "Business Models",
    description:
      "Comparison of integration types and operations supported by each business model.",
    tables: [featureMatrixTable],
  },
  "ipg-payment-availability": {
    title: "Payment Method Availability",
    subtitle: "Business Models",
    description:
      "Payment method support by business model.",
    tables: [paymentAvailabilityTable],
  },
  "ipg-key-field-differences": {
    title: "Key Field Differences",
    subtitle: "Business Models",
    description:
      "Fields and method details that change depending on the selected business model.",
    tables: [keyFieldDifferencesTable],
  },
  "ipg-protocol-changes": {
    title: "Protocol 4.2 to 4.5 Changes",
    subtitle: "Business Models",
    description:
      "Key protocol changes that affect migration and implementation.",
    tables: [protocolChangesTable],
  },
};
const v42SignatureField = f(
  "Signature",
  "Byte[] BASE64",
  "BASE64",
  "Mandatory",
  "Signed hash for all properties in the command. Signature is always the last parameter in the POST body."
);

const v42Differences = [
  {
    title: "Signing algorithm",
    description:
      "IPG 4.2 signs the Base64 encoding of concatenated POST values. IPG 4.5 uses lowercased keys, flattened paths, natural sorting, semicolon joining, and RSA-SHA256.",
  },
  {
    title: "Notifications",
    description:
      "IPG 4.2 sends method-based POST notifications and expects HTTP 200 with body OK. IPG 4.5 uses signed JSON callbacks to URL_Notify.",
  },
  {
    title: "Stored card field",
    description:
      "IPG 4.2 uses Token for stored-card flows and the token must be encrypted with the iCard public key. IPG 4.5 uses CardToken.",
  },
  {
    title: "Cart items",
    description:
      "IPG 4.2 IPGPurchase requires Cart logical record data and CartItems. The current 4.5 reference removed the CartItems requirement.",
  },
  {
    title: "Methods",
    description:
      "IPG 4.2 includes IPGStoreCard, IPGGetStoredCardData, IPGPurchaseWithStoredCard, and recurring methods. The 4.5 explorer uses the newer stored-card and wallet-tokenized method set.",
  },
  {
    title: "Redirect confirmation",
    description:
      "IPG 4.2 redirects with method-specific data such as IPGPurchaseOK or IPGPurchaseCancel. For payment confirmation, rely on URL_Notify and the OK acknowledgement flow.",
  },
  {
    title: "Payment Modal",
    description:
      "IPG 4.2 Payment Modal keeps the customer on the merchant page, starts with IPGPaymentTokenRequest, loads payment-modal.js with the verified token, and exposes modal frontend events. It is not the Redirect checkout flow.",
  },
];

const v42DataTypesTable = table(
  "IPG 4.2 Data Type Formats",
  ["Data Type in document", "Description", "Example"],
  [
    ["int", "Integer", "1"],
    ["String", "String", "This is a string"],
    ["A(n)", "Alpha string. n characters required.", "Alpha string"],
    ["AN(n)", "Alphanumeric string. n characters required.", "Alphanumeric string"],
    ["N(n)", "Numeric string. n characters required. Number is left-padded with zeroes.", "000123"],
    ["double", "Numeric string with decimal point. Only point is used.", "34.56"],
    ["BASE64", "String used to pass binary data converted to Base64.", "YW55IGNhcm5hbCBwbGVhc3VyZQ=="],
    ["XML", "Simple in-place XML array.", "<ipg_response><status>0</status><status_msg>Success</status_msg></ipg_response>"],
    ["JSON", "JSON string.", "{\"Field1\":\"value\",\"Field2\":\"value\"}"],
  ]
);

const v42MethodInventoryTable = table(
  "IPG 4.2 Method Inventory",
  ["Direction", "Method", "Purpose"],
  [
    ["Merchant to IPG", "IPGPurchase", "Standard checkout at the web shop."],
    ["Merchant to IPG", "IPGStoreCard", "Stores a card and returns a Token for later use."],
    ["Merchant to IPG", "IPGGetStoredCardData", "Retrieves masked data for a previously stored card."],
    ["Merchant to IPG", "IPGPurchaseWithStoredCard", "Back-end purchase with a previously stored encrypted Token."],
    ["Merchant to IPG", "IPG3DSPurchaseWithStoredCard", "Stored-card purchase with 3DS verification."],
    ["Merchant to IPG", "IPGFirstRecurring", "First transaction in a recurring subscription agreement."],
    ["Merchant to IPG", "IPGSubsequentRecurring", "Subsequent recurring transaction after the initial agreement."],
    ["Merchant to IPG", "IPGOCT", "Gambling-model Original Credit Transaction for gaming withdrawals."],
    ["Merchant to IPG", "IPGFundsDisbursement", "Financial Institution-model disbursement to a cardholder card."],
    ["Merchant to IPG", "IPGReversal", "Cancels a previously executed payment."],
    ["Merchant to IPG", "IPGRefund", "Credits the cardholder for a previous payment."],
    ["Merchant to IPG", "IPGGetTxnStatus", "Returns status and parameters for a previously executed payment."],
    ["Merchant to IPG", "IPGPaymentTokenRequest", "Back-end request that returns a token for Payment Modal generation."],
    ["IPG to Merchant", "IPGPurchaseNotify / OK / Cancel / Rollback / DeclineNotify", "Payment notification and redirect methods for IPGPurchase."],
    ["IPG to Merchant", "IPGStoreCardNotify / OK / Cancel / DeclineNotify", "Store-card notification and redirect methods."],
    ["IPG to Merchant", "IPG3DSPurchaseWithStoredCardNotify / OK / Cancel / DeclineNotify", "3DS stored-card notification and redirect methods."],
  ]
);

const v42TransmissionTable = table(
  "4.2 Redirect Checkout Flow",
  ["Step", "Action"],
  [
    ["1", "Customer reaches the merchant checkout page."],
    ["2", "Customer initiates payment."],
    ["3", "Merchant web server sends IPGPurchase to IPG and redirects the browser to the IPG payment page."],
    ["4", "Customer enters card data on the IPG page."],
    ["5", "IPG handles 3DS processing and card-scheme financial messaging."],
    ["6", "IPG posts the payment result to the merchant URL_Notify method endpoint."],
    ["7", "Merchant returns HTTP 200 with response body OK."],
    ["8", "IPG redirects the browser to URL_OK or URL_Cancel with the appropriate method data."],
  ]
);

const v42NotificationTypesTable = table(
  "IPG 4.2 Notification Methods",
  ["Base flow", "URL_Notify methods", "Redirect methods"],
  [
    ["IPGPurchase", "IPGPurchaseNotify, IPGPurchaseDeclineNotify, IPGPurchaseRollback", "IPGPurchaseOK, IPGPurchaseCancel"],
    ["IPGStoreCard", "IPGStoreCardNotify, IPGStoreCardDeclineNotify, IPGPurchaseRollback", "IPGStoreCardOK, IPGStoreCardCancel"],
    ["IPG3DSPurchaseWithStoredCard", "IPG3DSPurchaseWithStoredCardNotify, IPG3DSPurchaseWithStoredCardDeclineNotify, IPGPurchaseRollback", "IPG3DSPurchaseWithStoredCardOK, IPG3DSPurchaseWithStoredCardCancel"],
  ],
  "The merchant must return HTTP 200 and body OK for URL_Notify calls. Any other response is treated as an error."
);

const v42CompatibilityTable = table(
  "4.2 Compatibility Differences",
  ["Area", "IPG 4.2 behavior", "Current 4.5 behavior"],
  [
    ["Signature", "Concatenate POST values, Base64 encode the concatenated string, then sign with SHA-256.", "Build a canonical string from lowercased sorted keys and values, then sign with RSA-SHA256."],
    ["Callbacks", "Method-based POST notifications. Merchant response body must be exactly OK.", "Signed JSON callbacks to URL_Notify. HTTP 200 confirms receipt."],
    ["Stored card", "Token is returned and encrypted when reused.", "CardToken is used without the old Token encryption requirement."],
    ["CartItems", "Cart logical record and CartItems are mandatory for IPGPurchase.", "CartItems requirement removed."],
    ["Payment modal", "IPGPaymentTokenRequest supports ModalType values and loads payment-modal.js.", "IPGPaymentToken remains, but newer callback/signature behavior applies."],
    ["Embedded checkout", "The 4.2 PDF describes Payment Modal, not IPGEmbeddedPayment.", "IPGEmbeddedPayment is the documented embedded checkout method."],
    ["Wallet APIs", "Apple Pay / Google Pay tokenized APIs are not part of this 4.2 PDF.", "TokenProviderSession and TokenizedCardPurchase are documented for wallet flows."],
  ]
);

const v42PurchaseRequestFields = [
  f("KeyIndex", "1", "Int", "Mandatory", "Identifier of the private key used for signature."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Identifier of the private key used to build the response signature."),
  f("Originator", "100", "Int", "Mandatory", "Merchant company identifier."),
  f("Language", "EN", "A(2)", "Mandatory", "Desired language on the payment page."),
  f("IPGVersion", "4.2", "String", "Mandatory", "Protocol version used for the transmission."),
  f("IPGmethod", "IPGPurchase", "String", "Mandatory", "Requested method."),
  f("BannerIndex", "1", "Int", "Mandatory", "Payment page banner index."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("MIDName", "Merchant Web Shop", "String", "Mandatory", "Merchant name shown on the payment page."),
  f("Amount", "23.45", "Double", "Mandatory", "Requested payment amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("CustomerIP", "82.119.81.30", "String", "Mandatory", "Customer IP address in IPv4 or IPv6 format."),
  f("OrderID", "DB183FF5-...", "String", "Mandatory", "Merchant order reference. Up to 255 characters in 4.2."),
  f("OrderLink", "http://site.ext/", "String", "Optional", "Link to the merchant order page."),
  f("URL_OK", "http://site.ext/paymentOK", "String", "Mandatory", "Redirect URL after successful payment."),
  f("URL_Cancel", "http://site.ext/paymentNOK", "String", "Mandatory", "Redirect URL when the customer cancels or payment is unsuccessful."),
  f("URL_Notify", "http://site.ext/paymentNotify", "String", "Mandatory", "Endpoint where IPGPurchaseNotify is posted."),
  f("Note", "Note", "String", "Optional", "Text associated with the purchase."),
  f("CustomerIdentifier", "1234", "String", "Optional", "Merchant-side customer credentials, echoed back if sent."),
  f("Email", "customer@mywebsite.com", "String", "Mandatory", "Cardholder email."),
  f("MobileNumber", "+359811222111", "String", "Mandatory", "Cardholder mobile number."),
  f("BillAddrCountry", "100", "String(3)", "Recommended", "ISO 3166-1 numeric billing country code."),
  f("BillAddrCity", "Sofia", "String(50)", "Recommended", "Billing city."),
  f("BillAddrPostCode", "1421", "String(16)", "Recommended", "Billing ZIP code."),
  f("BillAddrState", "22", "String(3)", "Recommended", "Country subdivision code."),
  f("BillAddrLine1", "128 Dondukov Blvd", "String(50)", "Recommended", "Billing address line 1."),
  f("ShipAddrCountry", "100", "String(3)", "Optional", "Shipping country code."),
  f("ShipAddrCity", "", "String(50)", "Optional", "Shipping city."),
  f("ShipAddrPostCode", "", "String(16)", "Optional", "Shipping ZIP code."),
  f("Cart logical holder", "Cart", "Logical Record", "Mandatory", "Logical record describing the shopping cart displayed on the IPG payment page."),
  f("CartItems", "2", "Int", "Mandatory", "Number of item rows in the Cart logical record."),
  v42SignatureField,
];

const v42CartFields = [
  f("Article", "HP ProBook 6360b sticker", "String", "Mandatory", "Article name in the indexed shopping-cart row."),
  f("Quantity", "2", "Int", "Mandatory", "Number of pieces in the indexed shopping-cart row."),
  f("Price", "2.34", "Double", "Mandatory", "Price of a single unit."),
  f("Amount", "4.68", "Double", "Mandatory", "Quantity multiplied by Price for this row."),
  f("Currency", "978", "N(3)", "Mandatory", "Currency for this row. Must match the IPGPurchase Currency."),
];
const v42CartRulesTable = table(
  "IPG 4.2 Cart Validation Rules",
  ["Rule", "Merchant implementation"],
  [
    ["Mandatory for IPGPurchase", "Include the Cart logical record and set CartItems to the exact number of indexed item rows."],
    ["Item total", "For every item, Amount must equal Quantity multiplied by Price."],
    ["Order total", "The sum of cart-item Amount values should reconcile with the IPGPurchase Amount according to the merchant order model."],
    ["Currency", "Every cart-item Currency must match the IPGPurchase Currency."],
    ["Indexing", "Build one complete indexed Article, Quantity, Price, Amount, and Currency group for each item counted by CartItems."],
    ["Signature", "Include every transmitted cart value in the exact ordered 4.2 signature source before appending Signature last."],
  ]
);

const v42PurchaseNotifyFields = [
  f("IPGmethod", "IPGPurchaseNotify", "String", "Returned", "Notification method name."),
  f("MID", "000000000000123", "AN(15)", "Returned", "Echo from IPGPurchase."),
  f("Amount", "23.45", "Double", "Returned", "Echo from IPGPurchase."),
  f("Currency", "978", "N(3)", "Returned", "Echo from IPGPurchase."),
  f("CustomerIP", "127.0.0.1", "String", "Returned", "Echo from IPGPurchase."),
  f("OrderID", "DB183FF5-...", "String", "Returned", "Echo from IPGPurchase."),
  f("Approval", "123456", "String", "Returned", "Issuer approval code."),
  f("IPG_Trnref", "20250416064112146319", "String", "Returned", "IPG transaction reference for refund or reversal."),
  f("RequestSTAN", "123456", "N(6)", "Returned", "Unique matching number."),
  f("RequestDateTime", "2025-04-16 23:59:59", "DateTime", "Returned", "Request date and time."),
  f("Pan", "532610****0004", "String", "Returned", "First 6 and last 4 digits of PAN."),
  f("CardType", "VISA", "String", "Returned", "Card brand."),
  f("ExpdtYYMM", "2112", "N(4)", "Returned", "Card expiry in YYMM format."),
  f("CardholderName", "Ivan", "String", "Returned", "Cardholder name."),
  f("Eci", "06", "String(2)", "Returned", "Electronic Commerce Indicator."),
  f("Token", "D747458899D...FC43D5", "String(64)", "Optional", "Returned if the customer selected Store Card."),
  f("CustomerIdentifier", "1234", "String", "Optional", "Echoed when sent in the request."),
  v42SignatureField,
];

const v42DeclineNotifyFields = [
  f("IPGmethod", "IPGPurchaseDeclineNotify", "String", "Returned", "Decline notification method name."),
  f("MID", "000000000000123", "AN(15)", "Returned", "Echo from the request."),
  f("OrderID", "DB183FF5-...", "String", "Returned", "Echo from the request."),
  f("Amount", "23.45", "Double", "Returned", "Echo from the request."),
  f("Currency", "978", "N(3)", "Returned", "Echo from the request."),
  f("IPG_TrnStatus", "57", "N(3)", "Returned", "Transaction status code. See IPGGetTxnStatus."),
  f("IPG_TrnStatusMsg", "Rejected by the issuer - Risk assessment", "String", "Returned", "Transaction status message."),
  v42SignatureField,
];

const v42StoreCardRequestFields = [
  f("IPGmethod", "IPGStoreCard", "String", "Mandatory", "Requested method."),
  f("KeyIndex", "1", "Int", "Mandatory", "Private key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.2", "String", "Mandatory", "Protocol version."),
  f("Originator", "100", "Int", "Mandatory", "Merchant company identifier."),
  f("Language", "EN", "A(2)", "Mandatory", "Payment page language."),
  f("BannerIndex", "1", "Int", "Mandatory", "Payment page banner index."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("MIDName", "Merchant Web Shop", "String", "Mandatory", "Merchant name shown on the page."),
  f("OrderID", "DB183FF5-...", "String", "Mandatory", "Merchant request reference."),
  f("Amount", "23.45", "Double", "Mandatory", "Verification transaction amount from the PDF table."),
  f("Currency", "978", "N(3)", "Mandatory", "MID currency."),
  f("CustomerIP", "127.0.0.1", "String", "Mandatory", "Customer IP address."),
  f("CustomerIdentifier", "1234", "String", "Recommended", "Merchant-side customer reference."),
  f("Email", "customer@mywebsite.com", "String", "Mandatory", "Cardholder email."),
  f("URL_OK", "http://site.ext/paymentOK", "String", "Mandatory", "Redirect URL after successful card storage."),
  f("URL_Cancel", "http://site.ext/paymentNOK", "String", "Mandatory", "Redirect URL when canceled."),
  f("URL_Notify", "http://site.ext/paymentNotify", "String", "Mandatory", "Endpoint where IPGStoreCardNotify is posted."),
  f("MobileNumber", "+359811222111", "String", "Mandatory", "Customer mobile number."),
  v42SignatureField,
];

const v42StoreCardNotifyFields = [
  f("IPGmethod", "IPGStoreCardNotify", "String", "Returned", "Notification method name."),
  f("Token", "D747458899D...FC43D5", "String(64)", "Returned", "Stored card token for subsequent payments."),
  f("MID", "000000000000123", "AN(15)", "Returned", "Echo from IPGStoreCard."),
  f("Currency", "978", "N(3)", "Returned", "Echo from IPGStoreCard."),
  f("CustomerIP", "127.0.0.1", "String", "Returned", "Echo from IPGStoreCard."),
  f("OrderID", "2DA730C3-...", "String", "Returned", "Echo from IPGStoreCard."),
  f("CardType", "VISA", "String", "Returned", "Card brand."),
  f("CardholderName", "Ivan Ivanov", "String", "Returned", "Cardholder name."),
  f("Approval", "123456", "String", "Returned", "Approval code for the verification transaction."),
  f("Pan", "532610**0004", "String", "Returned", "Masked PAN."),
  f("Amount", "23.45", "Double", "Returned", "Echo from request."),
  f("Eci", "06", "String(2)", "Returned", "Electronic Commerce Indicator."),
  f("ExpdtYYMM", "2412", "String", "Returned", "Card expiry."),
  f("CustomerIdentifier", "1234", "String", "Optional", "Echoed when sent in request."),
  f("IPG_Trnref", "20250416064251147276", "String", "Returned", "IPG transaction reference."),
  v42SignatureField,
];

const v42StoredCardRequestFields = [
  f("IPGmethod", "IPGPurchaseWithStoredCard", "String", "Mandatory", "Requested method."),
  f("KeyIndex", "1", "Int", "Mandatory", "Private key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.2", "String", "Mandatory", "Protocol version."),
  f("Originator", "100", "Int", "Mandatory", "Merchant company identifier."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("OrderID", "46D394B9-...", "String", "Mandatory", "Merchant order or subscription reference. Up to 255 characters."),
  f("Amount", "23.45", "Double", "Mandatory", "Requested amount."),
  f("Currency", "978", "N(3)", "Mandatory", "MID currency."),
  f("Token", "gqGCQBw9KDsoIq...AwmI", "String", "Mandatory", "Stored card token encrypted with the iCard public key using PKCS1 padding."),
  f("IPG_Trnref", "20250416064251147276", "String", "Mandatory", "Reference to the first or previous transaction."),
  f("OutputFormat", "json", "String", "Optional", "xml or json. Defaults to xml."),
  v42SignatureField,
];

const v42StoredCardResponseFields = [
  r("method", "IPGPurchaseWithStoredCard", "String", "Response method name."),
  r("status", "0", "String", "Request status."),
  r("status_msg", "Success", "String", "Status message."),
  r("IPG_Trnref", "20250416064251147276", "String", "Returned for successful transactions."),
  r("Approval", "123456", "String", "Issuer approval code returned for successful transactions."),
  r("Signature", "Byte[] BASE64", "BASE64", "Response signature."),
];

const v42ThreeDsStoredFields = [
  f("IPGmethod", "IPG3DSPurchaseWithStoredCard", "String", "Mandatory", "Requested method."),
  f("KeyIndex", "1", "Int", "Mandatory", "Private key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.2", "String", "Mandatory", "Protocol version."),
  f("Language", "EN", "A(2)", "Mandatory", "Payment page language."),
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("BannerIndex", "1", "Int", "Conditional", "Payment page banner index."),
  f("MID", "000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("MIDName", "Merchant Web Shop", "String", "Mandatory", "Merchant name shown on the payment page."),
  f("Amount", "23.45", "Double", "Mandatory", "Requested amount."),
  f("Currency", "978", "N(3)", "Mandatory", "MID currency."),
  f("OrderID", "DB183FF5-...", "String", "Mandatory", "Merchant order reference. Up to 255 characters."),
  f("Token", "gqGCQBw9KDsoIq...AwmI", "String", "Mandatory", "Stored card token encrypted with the iCard public key using PKCS1 padding."),
  f("VerifyCVC", "1", "N(1)", "Optional", "If 1, customer confirms CVC before payment."),
  f("URL_OK", "http://site.ext/paymentOK", "String", "Mandatory", "Redirect URL on success."),
  f("URL_Cancel", "http://site.ext/paymentNOK", "String", "Mandatory", "Redirect URL on unsuccessful transaction."),
  f("URL_Notify", "http://site.ext/paymentNotify", "String", "Mandatory", "Endpoint where IPG3DSPurchaseWithStoredCardNotify is posted."),
  f("CustomerIdentifier", "123456789", "String", "Recommended", "Merchant-side customer reference."),
  f("Email", "name@website.com", "String", "Mandatory", "Cardholder email."),
  f("MobileNumber", "+359811222111", "String", "Mandatory", "Cardholder mobile number."),
  v42SignatureField,
];

const v42RecurringFields = [
  f("IPGmethod", "IPGFirstRecurring / IPGSubsequentRecurring", "String", "Mandatory", "Recurring method name."),
  f("KeyIndex", "1", "Int", "Mandatory", "Private key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.2", "String", "Mandatory", "Protocol version."),
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("MID", "000000000000123", "AN(15)", "Mandatory", "Virtual terminal identifier."),
  f("OrderID", "DB183FF5-...", "String", "Mandatory", "Merchant order or subscription reference. Up to 255 characters."),
  f("IPG_Trnref", "20250416064251147276", "String", "Mandatory for subsequent", "First recurring transaction reference for subsequent recurring payments."),
  f("Amount", "23.45", "Double", "Mandatory", "Requested amount."),
  f("Currency", "978", "N(3)", "Mandatory", "MID currency."),
  f("CustomerIdentifier", "1234", "String", "Recommended", "Merchant customer reference."),
  f("Email", "customer@mywebsite.com", "String", "Mandatory", "Cardholder email."),
  f("OutputFormat", "json", "String", "Optional", "xml or json. Defaults to xml."),
  v42SignatureField,
];

const v42BackendCommonFields = [
  f("IPGmethod", "IPGReversal / IPGRefund / IPGGetTxnStatus", "String", "Mandatory", "Back-office method name."),
  f("KeyIndex", "1", "Int", "Mandatory", "Private key index."),
  f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
  f("IPGVersion", "4.2", "String", "Mandatory", "Protocol version."),
  f("Originator", "33", "Int", "Mandatory", "Merchant company identifier."),
  f("MID", "000000000000123", "AN(15)", "Required by method", "Virtual terminal identifier. Required for refund and status."),
  f("OrderID", "DB183FF5-...", "String", "Required by method", "Merchant reference. Required for refund and status."),
  f("IPG_Trnref", "20250416064251147276", "String", "Required by method", "Transaction reference for reversal or refund."),
  f("Amount", "23.45", "Double", "Required by refund", "Refund amount."),
  f("Currency", "978", "N(3)", "Required by refund", "Refund currency."),
  f("Email", "customer@mywebsite.com", "String", "Required by refund", "Cardholder email."),
  f("OutputFormat", "json", "String", "Optional / Mandatory", "xml or json. Mandatory for reversal in the PDF table."),
  v42SignatureField,
];

const v42BackendResponseFields = [
  r("method", "IPGRefund", "String", "Response method name."),
  r("trnref", "20250416064251147276", "String", "Transaction ID."),
  r("amount", "1", "Double", "Echo from refund when applicable."),
  r("currency", "978", "N(3)", "Echo from refund when applicable."),
  r("status", "0", "String", "Request status."),
  r("status_msg", "Success", "String", "Status message."),
  r("IPG_TrnStatus", "100", "Int", "Transaction status code for IPGGetTxnStatus."),
  r("IPG_TrnStatusMsg", "Transaction completed successful", "String", "Transaction status message."),
  r("Signature", "Byte[] BASE64", "BASE64", "Response signature."),
];

const v42StatusTable = table(
  "IPGGetTxnStatus Reference Statuses",
  ["Status", "Meaning"],
  [
    ["100", "Transaction completed successful. Success only when IPG received OK from URL_Notify."],
    ["1-9", "Pending rejection categories such as technical issue, invalid request, issuer rejection, risk, invalid card, invalid amount, or failed 3DS."],
    ["10-18", "Final rejection categories such as technical issue, invalid request, risk assessment, issuer rejection, insufficient funds, invalid card, invalid amount, or failed 3DS."],
    ["19", "User input timeout on payment page or issuer 3DS page."],
    ["20", "Pending: no customer input or no 3DS response."],
    ["21", "Canceled by the customer with no 3DS response."],
    ["97", "Reversed because IPG did not receive OK from URL_Notify or received a response other than OK."],
    ["98", "Not completed, missing capture. Intermediate status before Success or Reversed."],
    ["99", "Not found."],
  ]
);

const v42PaymentTokenFields = [
  f("IPGmethod", "IPGPaymentToken", "String", "Mandatory", "Payment token request method."),
  f("ModalType", "IPGPurchase", "String", "Mandatory", "Modal method. Possible values: IPGPurchase, IPGFirstRecurring, IPGStoreCard, IPG3DSPurchaseWithStoredCard."),
  f("OutputFormat", "json", "String", "Optional", "xml or json. Defaults to xml."),
  f("URL_OK", "", "String", "Not required", "Not required with IPGPaymentTokenRequest."),
  f("URL_Cancel", "", "String", "Not required", "Not required with IPGPaymentTokenRequest."),
  f("Token / Cardtoken", "D747458899D...", "String", "Conditional", "For modal IPG3DSPurchaseWithStoredCard, the saved-card parameter is Cardtoken instead of Token."),
  v42SignatureField,
];
const v42PaymentTokenResponseFields = [
  r("method", "IPGPaymentToken", "String", "Response method name."),
  r("status", "0", "String", "Request status. Continue only after a successful response."),
  r("status_msg", "Success", "String", "Status description."),
  r("token", "_TOKEN_", "String", "Short-lived token used to load payment-modal.js for the prepared transaction."),
  r("Signature", "Byte[] BASE64", "BASE64", "Response signature. Verify before using token."),
];
const v42ModalTypesTable = table(
  "Supported IPG 4.2 Modal Types",
  ["ModalType", "Customer journey", "Additional implementation rule"],
  [
    ["IPGPurchase", "Regular card payment inside the modal.", "Send all parameters required by IPGPurchase, except URL_OK and URL_Cancel are not required for IPGPaymentTokenRequest."],
    ["IPGFirstRecurring", "First customer-present payment of a subscription agreement inside the modal.", "Send all parameters required by IPGFirstRecurring and preserve the successful transaction reference for later recurring payments."],
    ["IPGStoreCard", "Card-storage and verification experience inside the modal.", "Process the signed store-card notification before saving Token for later use."],
    ["IPG3DSPurchaseWithStoredCard", "Stored-card payment with inline customer verification.", "Use Cardtoken instead of Token in the modal token request and include VerifyCVC when required."],
  ]
);

const v42Content = {
  ...ipgContent,
  "ipg-oct": createOctDocumentation("4.2"),
  "ipg-funds-disbursement": createFundsDisbursementDocumentation("4.2"),
  "ipg-overview": {
    title: "IPG API 4.2",
    subtitle: "Overview & Architecture",
    description:
      "Complete integration reference for IPG protocol 4.2 across BM Gambling, BM Credit Institution, and BM ECommerce.",
    facts: ["Protocol 4.2", "All business models", "Complete method inventory", "POST notifications"],
    body: [
      "The 4.2 flow starts from the merchant checkout page. The merchant posts an IPGPurchase request, redirects the browser to IPG, IPG handles card entry, 3DS, and scheme processing, then posts the result to the merchant and redirects the customer to the checkout result page.",
      "This version uses method-based IPG-to-Merchant notifications. For URL_Notify calls, the merchant must return HTTP 200 and body OK.",
      "The All business models overview includes the complete combined 4.2 method inventory. Specialized methods remain marked by business model: IPGOCT for Gambling and IPGFundsDisbursement for Financial Institution.",
      "The 4.2 PDF does not use the same modern wallet-tokenized and embedded-checkout method set as 4.5. Those differences are kept in the right-side differences column and the version summary.",
    ],
    tables: [v42TransmissionTable, v42MethodInventoryTable],
    differences: v42Differences,
  },
  "ipg-http-post": {
    title: "HTTP POST",
    subtitle: "General",
    description:
      "Data transfer between Merchant and IPG 4.2 is made by HTTP POST.",
    facts: ["Sandbox endpoint", "Production endpoint", "UTF-8", "application/x-www-form-urlencoded"],
    body: [
      "All parameters for requests are in the body in [parameter=value] form.",
      "The separator between tokens is [&]. The body is URL encoded and the character encoding is UTF-8.",
      "Sandbox endpoint: https://dev-ipg.icards.eu/sandbox/",
      "Production endpoint: https://ipg.icard.com/",
    ],
    request: `POST /sandbox/ HTTP/2
Host: dev-ipg.icards.eu
Content-Type: application/x-www-form-urlencoded

IPGmethod=IPGPurchase&KeyIndex=1&KeyIndexResp=1&IPGVersion=4.2&Language=en&Originator=33...`,
  },
  "ipg-data-types": {
    title: "Data Type Formats",
    subtitle: "General",
    description: "IPG 4.2 uses the data type notation from the protocol 4.2 PDF.",
    tables: [v42DataTypesTable],
  },
  "ipg-response-codes": {
    title: "Card Scheme Response Codes",
    subtitle: "General",
    description:
      "Complete card-scheme and issuer response-code reference for interpreting processing outcomes in IPG 4.2.",
    facts: ["170 response codes", "Provider outcome", "00 means approval", "Separate from IPG_TrnStatus"],
    body: [
      "These values describe card-scheme, issuer, or provider processing results. Preserve the original code with the transaction for investigation, customer support, and reconciliation.",
      "Response code 00 represents successful approval or completion. Other codes describe referrals, declines, validation failures, unavailable services, security results, or routing conditions.",
      "Do not confuse these response codes with IPG_TrnStatus, the method response Status field, HTTP acknowledgement status, or URL_Notify processing state.",
      "Use the verified IPG notification or response and the complete merchant order context before deciding the final business outcome.",
    ],
    tables: cardSchemeResponseCodeTables,
  },
  "ipg-carts": {
    title: "Cart Logical Record",
    subtitle: "General",
    description:
      "IPG 4.2 IPGPurchase requires a Cart logical record and an exact CartItems count.",
    facts: ["Mandatory for IPGPurchase", "Indexed item rows", "Currency must match", "Included in signature"],
    body: [
      "Set CartItems to the exact number of shopping-cart rows sent with IPGPurchase. Each row describes one article using Article, Quantity, Price, Amount, and Currency.",
      "Validate cart data from trusted merchant-side order state before building and signing the request. Do not trust line-item values supplied by the browser.",
      "Each item Amount must equal Quantity multiplied by Price, and each item Currency must match the purchase Currency. Reconcile the item totals with the requested payment amount.",
      "The Cart logical record and its values are part of the 4.2 request and therefore must be included in the exact ordered signature source. IPG 4.5 removes this legacy CartItems requirement.",
    ],
    fieldSections: [
      {
        title: "Cart Item Properties",
        description: "Repeat this complete property set for every indexed item counted by CartItems.",
        fields: v42CartFields,
      },
    ],
    tables: [v42CartRulesTable, cartVersionComparisonTable],
    examplesTitle: "Cart Request Example",
    examples: [
      {
        title: "Two-item IPGPurchase cart",
        description: "CartItems must match the number of complete indexed item groups.",
        code: `Amount=29.68
Currency=978
CartItems=2
Cart[0][Article]=HP ProBook 6360b sticker
Cart[0][Quantity]=2
Cart[0][Price]=2.34
Cart[0][Amount]=4.68
Cart[0][Currency]=978
Cart[1][Article]=Laptop sleeve
Cart[1][Quantity]=1
Cart[1][Price]=25.00
Cart[1][Amount]=25.00
Cart[1][Currency]=978
Signature=<base64-signature>`,
      },
    ],
    differences: [v42Differences[3]],
  },
  "ipg-security": {
    title: "Signatures Overview",
    subtitle: "Security & Signatures",
    description:
      "In every IPG 4.2 message, a signature is supplied as a signed hash of all property values sent in the request, without Signature.",
    facts: ["RSA keys", "SHA-256", "KeyIndex", "Signature last"],
    body: [
      "Both iCard and the merchant generate RSA public/private key pairs and exchange public keys.",
      "Each party signs messages with its own private key. The opposite side verifies the signature with the corresponding public key.",
      "KeyIndex identifies the private key used to sign the request, and KeyIndexResp identifies the key used to build the response signature.",
      "The Signature parameter is always appended at the end of the POST string and is not included when calculating the hash.",
    ],
    resources: [resources.productionSignatureGenerator],
    differences: [v42Differences[0]],
  },
  "ipg-signature-generation": {
    title: "Signature Generation",
    subtitle: "Security & Signatures",
    description:
      "IPG 4.2 signature generation concatenates POST values, Base64 encodes the concatenated string, then signs it with SHA-256.",
    facts: ["IPG >= 4.2", "Concatenate values", "Base64 encode", "Sign with SHA-256"],
    body: [
      "Use all POST request values except Signature. Keep the values in the POST data order used by the request builder.",
      "Concatenate the values without separators, Base64 encode the concatenated UTF-8 string, sign the Base64 string with SHA-256 using the merchant private key, then Base64 encode the binary signature.",
    ],
    resources: [resources.productionSignatureGenerator],
    examplesTitle: "Signing Steps",
    examples: [
      {
        title: "1. Start From POST Data",
        description: "Use request values without Signature.",
        code: `IPGmethod => IPGPurchase
KeyIndex => 1
KeyIndexResp => 1
IPGVersion => 4.2
MIDName => MerchStore`,
      },
      {
        title: "2. Concatenate Values",
        description: "Join values directly, without field names or separators.",
        code: `IPGPurchase114.2MerchStore`,
      },
      {
        title: "3. Base64 Encode",
        description: "Base64 encode the concatenated UTF-8 string.",
        code: `SVBHUHVyY2hhc2UxMTQuMk1lcmNoU3RvcmU=`,
      },
      {
        title: "4. Sign",
        description: "Sign the Base64 string with SHA-256 and the merchant private key.",
        code: `PHP
$privateKey = openssl_get_privatekey($privateKeyString);
openssl_sign($base64Encoded, $signature, $privateKey, OPENSSL_ALGO_SHA256);

C#
var sha = SHA256.Create();
var signature = key.SignHash(
  sha.ComputeHash(Encoding.UTF8.GetBytes(base64Encoded)),
  HashAlgorithmName.SHA256,
  RSASignaturePadding.Pkcs1
);`,
      },
      {
        title: "5. Encode Signature",
        description: "Base64 encode the binary signature and append it as Signature.",
        code: `$base64Signature = base64_encode($signature);
Signature=<base64Signature>`,
      },
    ],
    differences: [v42Differences[0]],
  },
  "ipg-signature-verification": {
    title: "Signature Verification",
    subtitle: "Security & Signatures",
    description:
      "IPG 4.2 verification repeats the same concatenation and Base64 encoding, then verifies the received Signature with the public key.",
    facts: ["Extract Signature", "Remove Signature", "Rebuild Base64 string", "Verify with public key"],
    body: [
      "Extract Signature from POST data, remove it from the data set, concatenate the remaining values as in signature generation, and Base64 encode the concatenated value.",
      "Use the iCard public key to verify the decoded Signature against the rebuilt Base64 string with SHA-256.",
    ],
    request: `PHP
$publicKey = openssl_get_publickey($publicKeyString);
$result = openssl_verify($base64Encoded, base64_decode($signature), $publicKey, OPENSSL_ALGO_SHA256);`,
    differences: [v42Differences[0]],
  },
  "ipg-signing-example": {
    title: "Step-by-Step Signing Example",
    subtitle: "Security & Signatures",
    description:
      "Concrete IPG 4.2 signing flow from POST values to final Base64 signature.",
    body: [
      "Unlike 4.5, IPG 4.2 does not lowercase keys or sort key-value paths. It concatenates request values, Base64 encodes that string, and signs the encoded string.",
    ],
    resources: [resources.productionSignatureGenerator],
    examplesTitle: "Signing Steps",
    examples: [
      {
        title: "1. POST Data",
        description: "Start from request values without Signature.",
        code: `IPGmethod => IPGPurchase
KeyIndex => 1
KeyIndexResp => 1
IPGVersion => 4.2
MIDName => MerchStore`,
      },
      {
        title: "2. Concatenate",
        description: "Join values directly.",
        code: `IPGPurchase114.2MerchStore`,
      },
      {
        title: "3. Base64",
        description: "Encode the concatenated value.",
        code: `SVBHUHVyY2hhc2UxMTQuMk1lcmNoU3RvcmU=`,
      },
      {
        title: "4. Generate Signature",
        description: "Sign the Base64 string with SHA-256.",
        code: `openssl_sign($base64Encoded, $signature, $privateKey, OPENSSL_ALGO_SHA256);`,
      },
      {
        title: "5. Final Signature",
        description: "Base64 encode the binary signature and send it last.",
        code: `Signature=<base64-encoded-signature>`,
      },
    ],
    differences: [v42Differences[0]],
  },
  "ipg-callbacks": {
    title: "IPG 4.2 Notifications",
    subtitle: "Callbacks",
    description:
      "IPG 4.2 uses method-based POST notifications from IPG to Merchant instead of the 4.5 JSON callback object.",
    facts: ["URL_Notify", "HTTP 200", "Body OK", "Method-based posts"],
    body: [
      "The merchant supplies URL_Notify in the initiating request. IPG posts methods such as IPGPurchaseNotify, IPGPurchaseDeclineNotify, or IPGPurchaseRollback to that URL.",
      "After a successful OK response from the merchant, IPG redirects the customer browser to URL_OK and sends the corresponding OK redirect method.",
    ],
    tables: [v42NotificationTypesTable],
    differences: [v42Differences[1], v42Differences[5]],
  },
  "ipg-callback-retries": {
    title: "Notification Acknowledgement",
    subtitle: "Callbacks",
    description:
      "IPG 4.2 requires a strict acknowledgement response for IPG-to-Merchant notification methods.",
    facts: ["HTTP 200 OK", "Body must be OK", "Rollback on failed acknowledgement", "URL_Notify"],
    body: [
      "Upon an HTTP request, the responding party must return HTTP status 200 OK.",
      "The response body must contain only the string OK. Every other body is considered an error status.",
      "If IPG does not receive OK for IPGPurchaseNotify, IPG can send IPGPurchaseRollback and the merchant should mark the order as not paid.",
    ],
    tables: [
      table("4.2 Notification Response Rules", ["Condition", "IPG behavior"], [
        ["HTTP 200 with body OK", "Notification is accepted and the customer can be redirected to the corresponding result URL."],
        ["Any other HTTP status or body", "Treated as communication error, call error, server error, or system malfunction."],
        ["No OK for successful purchase notification", "IPG can post IPGPurchaseRollback to URL_Notify."],
      ]),
    ],
    differences: [v42Differences[1]],
  },
  "ipg-callback-troubleshooting": {
    title: "Notification Troubleshooting",
    subtitle: "Callbacks",
    description:
      "Use this page when IPG 4.2 notification methods are not acknowledged or merchant order state does not match IPG status.",
    facts: ["Check URL_Notify", "Return exact OK", "Verify Signature", "Use IPGGetTxnStatus"],
    body: [
      "Confirm that URL_Notify is publicly reachable and matches the value sent in the initiating request.",
      "Confirm that the endpoint returns HTTP 200 and the exact body OK, with no additional response content.",
      "Verify the Signature on incoming methods and use IPGGetTxnStatus as a reference check, not as the primary payment approval signal.",
    ],
    tables: [v42StatusTable],
    differences: [v42Differences[1]],
  },
  "ipg-callback-payment": {
    title: "Purchase Notifications",
    subtitle: "Callbacks",
    description:
      "IPGPurchase uses incoming, success, cancel, rollback, and decline notification methods.",
    fieldSections: [
      { title: "IPGPurchaseNotify Parameters", fields: v42PurchaseNotifyFields },
      { title: "IPGPurchaseDeclineNotify Parameters", fields: v42DeclineNotifyFields },
    ],
    differences: [v42Differences[1]],
  },
  "ipg-callback-carddata": {
    title: "Store Card Notifications",
    subtitle: "Callbacks",
    description:
      "IPGStoreCard returns Token data through method-based notifications and redirects.",
    fieldSections: [{ title: "IPGStoreCardNotify Parameters", fields: v42StoreCardNotifyFields }],
    differences: [v42Differences[2]],
  },
  "ipg-callback-operation": {
    title: "3DS Stored Card Notifications",
    subtitle: "Callbacks",
    description:
      "IPG3DSPurchaseWithStoredCard posts stored-card 3DS notification methods to URL_Notify and redirects to URL_OK or URL_Cancel.",
    fieldSections: [{ title: "IPG3DSPurchaseWithStoredCardNotify Parameters", fields: v42PurchaseNotifyFields }],
    differences: [v42Differences[1], v42Differences[2]],
  },
  "ipg-callback-examples": {
    title: "Common Notification Examples",
    subtitle: "Callbacks",
    description:
      "Compact IPG 4.2 examples for the most important notification acknowledgement cases.",
    body: [
      "Every IPG-to-Merchant notification must be signature-verified by the merchant. For URL_Notify calls, the merchant confirms receipt by returning HTTP 200 with body OK.",
    ],
    examplesTitle: "Notification Examples",
    examples: [
      {
        title: "Successful Purchase Notify",
        description: "Posted to URL_Notify before the browser is redirected to URL_OK.",
        code: `IPGmethod=IPGPurchaseNotify
MID=000000000000123
Amount=23.45
Currency=978
OrderID=DB183FF5-8AF8-48D7-8FCC-86C04D95B0B6
Approval=123456
IPG_Trnref=20250416064112146319
Signature=<base64-signature>`,
      },
      {
        title: "Merchant Acknowledgement",
        description: "The response body must contain only OK.",
        code: `HTTP/1.1 200 OK

OK`,
      },
      {
        title: "Declined Purchase Notify",
        description: "Posted to URL_Notify when payment is declined.",
        code: `IPGmethod=IPGPurchaseDeclineNotify
MID=000000000000123
OrderID=DB183FF5-8AF8-48D7-8FCC-86C04D95B0B6
Amount=23.45
Currency=978
IPG_TrnStatus=57
IPG_TrnStatusMsg=Rejected by the issuer - Risk assessment
Signature=<base64-signature>`,
      },
      {
        title: "Rollback",
        description: "Posted when IPG did not receive OK for a previous successful authorization notification.",
        code: `IPGmethod=IPGPurchaseRollback
MID=000000000000123
Amount=23.45
Currency=978
OrderID=DB183FF5-8AF8-48D7-8FCC-86C04D95B0B6
Signature=<base64-signature>`,
      },
    ],
    differences: [v42Differences[1]],
  },
  "ipg-redirect-overview": {
    title: "Redirect Checkout",
    subtitle: "Implementation Types",
    description:
      "IPG 4.2 redirect checkout sends the customer to the IPG payment page and uses URL_Notify plus URL_OK / URL_Cancel result redirects.",
    facts: ["IPGPurchase", "URL_Notify", "URL_OK", "URL_Cancel"],
    body: [
      "The merchant web server initiates payment through IPG and redirects the customer browser to the IPG payment page.",
      "IPG handles card data collection, 3DS processing, and financial transaction messaging.",
      "The merchant should treat URL_Notify plus OK acknowledgement as the reliable backend confirmation path.",
    ],
    tables: [v42TransmissionTable],
    differences: [v42Differences[1], v42Differences[5]],
  },
  "ipg-modal-overview": {
    title: "IPG Payment Modal",
    subtitle: "Implementation Types",
    description:
      "IPG Payment Modal securely collects and processes payment data in an overlay while the customer remains on the merchant page.",
    facts: ["No browser redirect", "Backend IPGPaymentToken request", "IPG-controlled overlay", "Modal frontend events"],
    body: [
      "Payment Modal is a separate implementation from Redirect checkout. The browser remains on the merchant website while payment-modal.js opens an IPG-controlled overlay above the page.",
      "Before opening the overlay, the merchant backend sends a signed IPGPaymentToken request containing the complete transaction data and selected ModalType. The backend verifies the synchronous response and returns only the verified short-lived token to the frontend.",
      "The frontend creates the required element with id=\"ipg\", loads payment-modal.js from the correct environment, and supplies the verified token and classic or dark theme.",
      "Modal frontend events control loading, cancellation, closing, success, and error experiences. They are not financial confirmation. The merchant backend must verify and process the asynchronous URL_Notify message before marking the order paid.",
    ],
    tables: [
      modalImplementationFlowTable,
      v42ModalTypesTable,
      modalConfigurationTable,
      modalFrontendEventsTable,
    ],
    fieldSections: [
      { title: "Payment Token Request Controls", fields: v42PaymentTokenFields },
      { title: "Payment Token Response", fields: v42PaymentTokenResponseFields },
    ],
    examplesTitle: "Payment Modal Implementation",
    examples: [
      {
        title: "1. Backend Token Request",
        description: "Create and sign the modal transaction on the merchant backend.",
        code: `IPGmethod=IPGPaymentToken
ModalType=IPGPurchase
IPGVersion=4.2
MID=000000000000123
OrderID=<unique-order-id>
Amount=23.45
Currency=978
URL_Notify=https://merchant.example/ipg/notify
OutputFormat=json
Signature=<base64-signature>`,
      },
      {
        title: "2. Required Wrapper and Script",
        description: "Load the overlay with the verified token returned by the backend.",
        code: `<div id="ipg"></div>
<script>
function loadModal(domain, token, theme = "classic") {
  const script = document.createElement("script");
  script.src = domain + "js/payment-modal.js?token=" + encodeURIComponent(token) + "&theme=" + theme;
  script.id = "ipg-io-js";
  script.async = true;
  document.body.appendChild(script);
}
</script>`,
      },
      {
        title: "3. Modal Event Handling",
        description: "Use modal events for customer experience while awaiting URL_Notify.",
        code: `window.addEventListener("ipg.formload.success", () => hideLoadingState());
window.addEventListener("ipg.user.cancel", () => keepOrderUnpaid());
window.addEventListener("ipg.payment.success", () => showProcessingState());
window.addEventListener("ipg.payment.error", () => showRetryOptions());
window.addEventListener("ipg.loadmodal.error", () => showAlternativePaymentMethods());`,
      },
    ],
    differences: [v42Differences[6]],
  },
  "ipg-purchase": {
    title: "IPGPurchase",
    subtitle: "API Methods",
    description:
      "Initiates the 4.2 checkout process and redirects the cardholder to the IPG payment page.",
    facts: ["Protocol 4.2", "CartItems mandatory", "URL_Notify", "Token may be returned"],
    fieldSections: [
      { title: "Request Parameters", fields: v42PurchaseRequestFields },
      { title: "Cart Logical Record", fields: v42CartFields, showSample: true },
    ],
    notes: [
      "The Store Card checkbox can be displayed depending on the merchant payment model. If selected, Token is returned in IPGPurchaseNotify.",
      "OrderID can be up to 255 characters in the 4.2 PDF.",
    ],
    request: `IPGmethod=IPGPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.2
Originator=100
Language=EN
BannerIndex=1
MID=000000000000123
MIDName=Merchant Web Shop
Amount=23.45
Currency=978
OrderID=DB183FF5-8AF8-48D7-8FCC-86C04D95B0B6
URL_OK=http://site.ext/paymentOK
URL_Cancel=http://site.ext/paymentNOK
URL_Notify=http://site.ext/paymentNotify
CartItems=2
Signature=<base64-signature>`,
    differences: [v42Differences[3], v42Differences[5]],
  },
  "ipg-v42-store-card": {
    title: "IPGStoreCard",
    subtitle: "API Methods",
    description:
      "Stores a card for subsequent use and returns a Token through store-card notification methods.",
    facts: ["Token", "Zero-amount verification", "URL_Notify", "URL_OK / URL_Cancel"],
    fieldSections: [{ title: "Request Parameters", fields: v42StoreCardRequestFields }],
    tables: [v42NotificationTypesTable],
    differences: [v42Differences[2]],
  },
  "ipg-v42-get-stored-card-data": {
    title: "IPGGetStoredCardData",
    subtitle: "API Methods",
    description:
      "Retrieves stored card data by reference to a previously executed Store Card method.",
    facts: ["Back-end", "Token", "Encrypted token", "XML or JSON"],
    fieldSections: [{ title: "Request Parameters", fields: [
      f("IPGmethod", "IPGGetStoredCardData", "String", "Mandatory", "Requested method."),
      f("KeyIndex", "1", "Int", "Mandatory", "Private key index."),
      f("KeyIndexResp", "1", "Int", "Mandatory", "Response key index."),
      f("Originator", "100", "Int", "Mandatory", "Merchant company identifier."),
      f("IPGVersion", "4.2", "String", "Mandatory", "Protocol version."),
      f("OrderID", "46D394B9-...", "String", "Mandatory", "Merchant order or subscription reference."),
      f("Token", "gqGCQBw9KDsoIq...AwmI", "String", "Mandatory", "Token encrypted with the iCard public key using PKCS1 padding."),
      f("OutputFormat", "xml", "String", "Optional", "xml or json. Defaults to xml."),
      v42SignatureField,
    ] }],
    differences: [v42Differences[2]],
  },
  "ipg-v42-purchase-with-stored-card": {
    title: "IPGPurchaseWithStoredCard",
    subtitle: "API Methods",
    description:
      "Back-end purchase with a previously stored card token.",
    facts: ["Back-end", "Encrypted Token", "IPG_Trnref", "XML or JSON response"],
    fieldSections: [
      { title: "Request Parameters", fields: v42StoredCardRequestFields },
      { title: "Response Parameters", fields: v42StoredCardResponseFields },
    ],
    differences: [v42Differences[2]],
  },
  "ipg-3ds-stored": {
    title: "IPG3DSPurchaseWithStoredCard",
    subtitle: "API Methods",
    description:
      "Processes a purchase with a stored card and 3DS verification in IPG 4.2.",
    facts: ["Stored Token", "3DS verification", "VerifyCVC optional", "URL_Notify"],
    fieldSections: [{ title: "Request Parameters", fields: v42ThreeDsStoredFields }],
    tables: [v42NotificationTypesTable],
    differences: [v42Differences[2], v42Differences[5]],
  },
  "ipg-v42-first-recurring": {
    title: "IPGFirstRecurring",
    subtitle: "API Methods",
    description:
      "Starts a recurring subscription agreement with a customer-initiated card transaction.",
    facts: ["Recurring", "Front-end", "URL_Notify", "255-character OrderID"],
    fieldSections: [{ title: "Request Parameters", fields: v42RecurringFields }],
    notes: ["Possible IPG-to-Merchant methods mirror the IPGPurchase notification set."],
  },
  "ipg-v42-subsequent-recurring": {
    title: "IPGSubsequentRecurring",
    subtitle: "API Methods",
    description:
      "Processes a subsequent recurring back-end transaction after the initial agreement.",
    facts: ["Recurring", "Back-end", "IPG_Trnref", "XML or JSON response"],
    fieldSections: [
      { title: "Request Parameters", fields: v42RecurringFields },
      { title: "Response Parameters", fields: [
        r("method", "IPGSubsequentRecurring", "String", "Response method name."),
        r("trnreforiginal", "20240329094900301693", "String", "Original transaction ID."),
        r("trnref", "20240516094901407362", "String", "Transaction ID."),
        r("status", "0", "String", "Request status."),
        r("status_msg", "Success", "String", "Status message."),
        r("Signature", "Byte[] BASE64", "BASE64", "Response signature."),
      ] },
    ],
  },
  "ipg-payment-token-purchase": {
    title: "IPGPaymentTokenRequest",
    subtitle: "API Methods",
    description:
      "Back-end synchronous request that returns the token used for IPG Payment Modal generation.",
    facts: ["Payment Modal", "ModalType", "Token response", "payment-modal.js"],
    fieldSections: [{ title: "Request Parameters", fields: v42PaymentTokenFields }],
    differences: [v42Differences[6]],
  },
  "ipg-reversal": {
    title: "IPGReversal",
    subtitle: "Backend Methods",
    description:
      "Initiates a reversal of a previously executed payment. In 4.2 this method is mandatory for all merchant integrations.",
    facts: ["Back-office", "Mandatory", "IPG_Trnref", "XML or JSON response"],
    fieldSections: [
      { title: "Request Parameters", fields: v42BackendCommonFields },
      { title: "Response Parameters", fields: v42BackendResponseFields },
    ],
    request: `IPGmethod=IPGReversal
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.2
Originator=33
IPG_Trnref=20250416064251147276
OutputFormat=json
Signature=<base64-signature>`,
  },
  "ipg-refund": {
    title: "IPGRefund",
    subtitle: "Backend Methods",
    description:
      "Initiates a refund for a previously executed payment.",
    facts: ["Back-office", "IPG_Trnref", "Email mandatory", "XML or JSON response"],
    fieldSections: [
      { title: "Request Parameters", fields: v42BackendCommonFields },
      { title: "Response Parameters", fields: v42BackendResponseFields },
    ],
  },
  "ipg-get-status": {
    title: "IPGGetTxnStatus",
    subtitle: "Backend Methods",
    description:
      "Returns status and parameters for a previously executed payment. It is a reference check, not the payment approval signal.",
    facts: ["Reference only", "OrderID", "Status 100 success", "Status 97 reversed"],
    fieldSections: [
      { title: "Request Parameters", fields: v42BackendCommonFields },
      { title: "Response Parameters", fields: v42BackendResponseFields },
    ],
    tables: [v42StatusTable],
    notes: [
      "A transaction is approved only when the card response is successful and IPG sends URL_Notify and receives OK from the merchant.",
    ],
  },
  "ipg-business-models": {
    title: "IPG 4.2 Compatibility Notes",
    subtitle: "Business Models",
    description:
      "The 4.2 source PDF is organized around e-commerce payment methods rather than the later focused business-model screens.",
    facts: ["Shared 4.2 reference", "E-commerce source document", "Older method set", "Use version differences column"],
    body: [
      "For protocol 4.2, the website keeps the same high-level explorer structure but shows the method set from the 4.2 PDF.",
      "Where a 4.5 business-model screen would normally expose wallet-tokenized or embedded checkout methods, the 4.2 version instead documents redirect checkout, store-card, recurring, backend, and Payment Modal flows.",
    ],
    tables: [v42CompatibilityTable],
    differences: v42Differences,
  },
  "ipg-protocol-changes": {
    title: "IPG 4.2 to 4.5 Differences",
    subtitle: "Business Models",
    description:
      "Dedicated comparison page for teams moving from protocol 4.2 to the current 4.5 structure.",
    tables: [v42CompatibilityTable],
    differences: v42Differences,
  },
};

const v42Menu = [
  {
    title: "General",
    items: [
      { id: "ipg-overview", label: "Overview & Architecture", type: "overview" },
      { id: "ipg-integration-steps", label: "Integration steps", type: "guide" },
      { id: "ipg-http-post", label: "HTTP POST", type: "guide" },
      { id: "ipg-data-types", label: "Data type formats", type: "schema" },
      { id: "ipg-response-codes", label: "Response codes", type: "schema" },
      { id: "ipg-carts", label: "Carts", type: "schema" },
      { id: "ipg-security", label: "Security & signatures", type: "guide" },
      { id: "ipg-signature-generation", label: "Signature generation", type: "guide" },
      { id: "ipg-signature-verification", label: "Signature verification", type: "guide" },
      { id: "ipg-signing-example", label: "Step-by-step signing example", type: "guide" },
    ],
  },
  {
    title: "Callbacks",
    items: [
      { id: "ipg-callbacks", label: "Notifications overview", type: "guide" },
      { id: "ipg-callback-retries", label: "Acknowledgement & rollback", type: "guide" },
      { id: "ipg-callback-troubleshooting", label: "Troubleshooting", type: "guide" },
      { id: "ipg-callback-payment", label: "Purchase notifications", type: "schema" },
      { id: "ipg-callback-carddata", label: "Store card notifications", type: "schema" },
      { id: "ipg-callback-operation", label: "3DS stored notifications", type: "schema" },
      { id: "ipg-callback-examples", label: "Common notification examples", type: "guide" },
    ],
  },
  {
    title: "Implementation Types",
    items: [
      { id: "ipg-redirect-overview", label: "Redirect checkout", type: "guide" },
      { id: "ipg-modal-overview", label: "Payment Modal", type: "guide" },
      { id: "ipg-apple-domain", label: "Apple Pay domain registration", type: "guide" },
    ],
  },
  {
    title: "API Methods",
    items: [
      { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
      { id: "ipg-v42-store-card", label: "IPGStoreCard", type: "post" },
      { id: "ipg-v42-get-stored-card-data", label: "IPGGetStoredCardData", type: "post" },
      { id: "ipg-v42-purchase-with-stored-card", label: "IPGPurchaseWithStoredCard", type: "post" },
      { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
      { id: "ipg-v42-first-recurring", label: "IPGFirstRecurring", type: "post" },
      { id: "ipg-v42-subsequent-recurring", label: "IPGSubsequentRecurring", type: "post" },
      { id: "ipg-payment-token-purchase", label: "IPGPaymentTokenRequest", type: "post" },
    ],
  },
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-oct", label: "IPGOCT", type: "post" },
      { id: "ipg-funds-disbursement", label: "IPGFundsDisbursement", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-refund", label: "IPGRefund", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
    ],
  },
  {
    title: "Business Models",
    items: [
      { id: "ipg-business-models", label: "4.2 compatibility notes", type: "schema" },
      { id: "ipg-protocol-changes", label: "4.2 to 4.5 differences", type: "schema" },
    ],
  },
];

const v42GeneralItems = [
  { id: "ipg-integration-steps", label: "Integration steps", type: "guide" },
  { id: "ipg-http-post", label: "HTTP POST", type: "guide" },
  { id: "ipg-data-types", label: "Data type formats", type: "schema" },
  { id: "ipg-response-codes", label: "Response codes", type: "schema" },
  { id: "ipg-carts", label: "Carts", type: "schema" },
  { id: "ipg-security", label: "Security & signatures", type: "guide" },
  { id: "ipg-signature-generation", label: "Signature generation", type: "guide" },
  { id: "ipg-signature-verification", label: "Signature verification", type: "guide" },
  { id: "ipg-signing-example", label: "Step-by-step signing example", type: "guide" },
];

const v42ModelGeneralGroup = (overviewId) => ({
  title: "General",
  items: [
    { id: overviewId, label: "Overview & Architecture", type: "overview" },
    ...v42GeneralItems,
  ],
});

const v42CallbackDocumentationGroup = {
  title: "Callbacks",
  items: [
    { id: "ipg-callbacks", label: "Notifications overview", type: "guide" },
    { id: "ipg-callback-retries", label: "Acknowledgement & rollback", type: "guide" },
    { id: "ipg-callback-troubleshooting", label: "Troubleshooting", type: "guide" },
    { id: "ipg-callback-payment", label: "Purchase notifications", type: "schema" },
    { id: "ipg-callback-carddata", label: "Store card notifications", type: "schema" },
    { id: "ipg-callback-operation", label: "3DS stored notifications", type: "schema" },
    { id: "ipg-callback-examples", label: "Common notification examples", type: "guide" },
  ],
};

const v42ImplementationTypesGroup = {
  title: "Implementation Types",
  items: [
    { id: "ipg-redirect-overview", label: "Redirect checkout", type: "guide" },
    { id: "ipg-modal-overview", label: "Payment Modal", type: "guide" },
    { id: "ipg-apple-domain", label: "Apple Pay domain registration", type: "guide" },
  ],
};

const v42BusinessModelsGroup = (functionScopeId) => ({
  title: "Business Models",
  items: [
    { id: functionScopeId, label: "Function scope", type: "schema" },
    { id: "ipg-business-models", label: "4.2 compatibility notes", type: "schema" },
    { id: "ipg-protocol-changes", label: "4.2 to 4.5 differences", type: "schema" },
  ],
});

const v42GamblingFunctionScopeTable = table(
  "Gambling Function Scope - IPG 4.2",
  ["Function", "Use in Gambling 4.2", "Notes"],
  [
    ["IPGPurchase", "Card deposit / redirect checkout.", "Use URL_Notify and exact OK acknowledgement for backend confirmation."],
    ["IPGStoreCard", "Optional stored-card enrollment.", "Returns Token through store-card notifications."],
    ["IPGGetStoredCardData", "Optional stored-card data lookup.", "Uses encrypted Token from a previous store-card flow."],
    ["IPGPurchaseWithStoredCard", "Optional merchant-initiated stored-card payment.", "Back-end flow with encrypted Token and IPG_Trnref."],
    ["IPG3DSPurchaseWithStoredCard", "Optional customer-facing stored-card payment with 3DS.", "Uses URL_OK, URL_Cancel, and URL_Notify."],
    ["IPGPaymentTokenRequest", "Optional Payment Modal presentation.", "The 4.2 PDF documents Payment Modal, not IPGEmbeddedPayment."],
    ["IPGOCT", "Gaming withdrawal / Original Credit Transaction.", "Two request paths are shown: OCT by PAN using documented CardToken, or OCT by original IPG_Trnref plus Approval. Both send IPGmethod=IPGOCT."],
    ["IPGReversal", "Required where a previous payment must be voided.", "Mandatory integration method in the 4.2 PDF."],
    ["IPGGetTxnStatus", "Reference status check for previous backend transactions.", "Recommended for OCT status/reference checks. Do not use it as the primary approval signal."],
    ["IPGRefund", "Not included in the focused Gambling 4.2 menu.", "Use the All business models view if a merchant setup explicitly requires it."],
  ]
);

const v42FinancialFunctionScopeTable = table(
  "Financial Institution Function Scope - IPG 4.2",
  ["Function", "Use in Financial Institution 4.2", "Notes"],
  [
    ["IPGPurchase", "Card payment / redirect checkout where enabled.", "Use URL_Notify and exact OK acknowledgement for backend confirmation."],
    ["IPGStoreCard", "Optional stored-card enrollment.", "Returns Token for subsequent use."],
    ["IPGGetStoredCardData", "Optional stored-card lookup.", "Uses encrypted Token."],
    ["IPGPurchaseWithStoredCard", "Optional merchant-initiated stored-card payment.", "Back-end flow with encrypted Token."],
    ["IPG3DSPurchaseWithStoredCard", "Optional stored-card 3DS flow.", "Customer-facing flow with notification methods."],
    ["IPGPaymentTokenRequest", "Optional Payment Modal presentation.", "Available for selected ModalType values in 4.2."],
    ["IPGFundsDisbursement", "Financial Institution disbursement / loan-to-card flow.", "Use the same method structure as the IPGFundsDisbursement page in the 4.5 Financial Institution documentation."],
    ["IPGReversal", "Required where a previous payment must be voided.", "Mandatory integration method in the 4.2 PDF."],
    ["IPGGetTxnStatus", "Reference status check for previous backend transactions.", "Recommended for disbursement status/reference checks. Use URL_Notify acknowledgement as the approval source of truth."],
  ]
);

const v42EcommerceFunctionScopeTable = table(
  "ECommerce Function Scope - IPG 4.2",
  ["Function", "Use in ECommerce 4.2", "Notes"],
  [
    ["IPGPurchase", "Regular card payment / redirect checkout.", "Cart logical record and CartItems are mandatory in 4.2."],
    ["IPGStoreCard", "Optional store-card flow.", "Returns Token for later payments."],
    ["IPGGetStoredCardData", "Optional stored-card data lookup.", "Back-end method by encrypted Token."],
    ["IPGPurchaseWithStoredCard", "Optional back-end stored-card payment.", "Uses encrypted Token and IPG_Trnref."],
    ["IPG3DSPurchaseWithStoredCard", "Optional stored-card 3DS payment.", "Front-end flow with URL_Notify and redirects."],
    ["IPGFirstRecurring", "Optional first recurring subscription transaction.", "Customer-facing recurring agreement setup."],
    ["IPGSubsequentRecurring", "Optional subsequent recurring transaction.", "Back-end recurring payment by IPG_Trnref."],
    ["IPGPaymentTokenRequest", "Optional Payment Modal presentation.", "Loads payment-modal.js with the returned token."],
    ["IPGRefund", "Required when merchant supports post-payment refunds.", "ECommerce-specific focused menu includes refund."],
    ["IPGReversal", "Required where a previous payment must be voided.", "Mandatory integration method in the 4.2 PDF."],
    ["IPGGetTxnStatus", "Reference status check.", "Not the primary payment approval signal."],
  ]
);

const v42GamblingMenu = [
  v42ModelGeneralGroup("ipg-gambling-overview"),
  v42CallbackDocumentationGroup,
  v42ImplementationTypesGroup,
  {
    title: "API Methods",
    items: [
      { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
      { id: "ipg-v42-store-card", label: "IPGStoreCard", type: "post" },
      { id: "ipg-v42-get-stored-card-data", label: "IPGGetStoredCardData", type: "post" },
      { id: "ipg-v42-purchase-with-stored-card", label: "IPGPurchaseWithStoredCard", type: "post" },
      { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
      { id: "ipg-payment-token-purchase", label: "IPGPaymentTokenRequest", type: "post" },
    ],
  },
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-oct", label: "IPGOCT", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
    ],
  },
  v42BusinessModelsGroup("ipg-v42-gambling-functions"),
];

const v42FinancialInstitutionMenu = [
  v42ModelGeneralGroup("ipg-financial-overview"),
  v42CallbackDocumentationGroup,
  v42ImplementationTypesGroup,
  {
    title: "API Methods",
    items: [
      { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
      { id: "ipg-v42-store-card", label: "IPGStoreCard", type: "post" },
      { id: "ipg-v42-get-stored-card-data", label: "IPGGetStoredCardData", type: "post" },
      { id: "ipg-v42-purchase-with-stored-card", label: "IPGPurchaseWithStoredCard", type: "post" },
      { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
      { id: "ipg-payment-token-purchase", label: "IPGPaymentTokenRequest", type: "post" },
    ],
  },
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-funds-disbursement", label: "IPGFundsDisbursement", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
    ],
  },
  v42BusinessModelsGroup("ipg-v42-financial-functions"),
];

const v42EcommerceMenu = [
  v42ModelGeneralGroup("ipg-ecommerce-overview"),
  v42CallbackDocumentationGroup,
  v42ImplementationTypesGroup,
  {
    title: "API Methods",
    items: [
      { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
      { id: "ipg-v42-store-card", label: "IPGStoreCard", type: "post" },
      { id: "ipg-v42-get-stored-card-data", label: "IPGGetStoredCardData", type: "post" },
      { id: "ipg-v42-purchase-with-stored-card", label: "IPGPurchaseWithStoredCard", type: "post" },
      { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
      { id: "ipg-v42-first-recurring", label: "IPGFirstRecurring", type: "post" },
      { id: "ipg-v42-subsequent-recurring", label: "IPGSubsequentRecurring", type: "post" },
      { id: "ipg-payment-token-purchase", label: "IPGPaymentTokenRequest", type: "post" },
    ],
  },
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-refund", label: "IPGRefund", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
    ],
  },
  v42BusinessModelsGroup("ipg-v42-ecommerce-functions"),
];

const v42GamblingContent = {
  ...v42Content,
  "ipg-oct": createOctDocumentation("4.2"),
  "ipg-gambling-overview": {
    title: "IPG 4.2 - Gambling Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.2 reference for Gambling integrations using the method set available in the 4.2 PDF.",
    facts: ["Protocol 4.2", "BM Gambling", "Redirect deposits", "IPGOCT withdrawals"],
    body: [
      "This view keeps the shared 4.2 settings, signature rules, HTTP POST format, and notification handling, then filters the method list to the functions normally relevant to Gambling deposits and payment maintenance.",
      "The provided 4.2 PDF does not include the later wallet-tokenized APIs or IPGEmbeddedPayment. The IPGOCT screen uses the shared documented Gambling OCT contract with separate PAN/CardToken and TRN plus Approval paths.",
      "For payment outcome handling, use URL_Notify notifications and return HTTP 200 with body OK.",
    ],
    tables: [v42GamblingFunctionScopeTable, v42CompatibilityTable],
    differences: v42Differences,
  },
  "ipg-v42-gambling-functions": {
    title: "Gambling Function Scope",
    subtitle: "Business Model",
    description:
      "Applicable IPG 4.2 functions for Gambling-focused integrations.",
    facts: ["IPGOCT withdrawals", "No IPGRefund in focused menu", "Payment Modal available", "Reversal mandatory"],
    body: [
      "The focused Gambling 4.2 menu keeps deposit, stored-card, modal, OCT, reversal, and status methods visible.",
      "Use the All business models view for the complete 4.2 source method list.",
    ],
    tables: [v42GamblingFunctionScopeTable],
    differences: v42Differences,
  },
};

const v42FinancialInstitutionContent = {
  ...v42Content,
  "ipg-financial-overview": {
    title: "IPG 4.2 - Financial Institution Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.2 reference for Financial Institution selections, limited to functions present in the 4.2 PDF.",
    facts: ["Protocol 4.2", "BM Financial Institution", "Funds disbursement", "Shared card flows"],
    body: [
      "This screen keeps the shared card payment, stored-card, modal, funds-disbursement, reversal, and transaction-status methods visible for Financial Institution integrations.",
      "IPGFundsDisbursement is included here with the same method structure used in the 4.5 Financial Institution documentation.",
      "For 4.2 payment outcome handling, use method-based URL_Notify notifications and exact OK acknowledgement.",
    ],
    tables: [v42FinancialFunctionScopeTable, v42CompatibilityTable],
    differences: v42Differences,
  },
  "ipg-v42-financial-functions": {
    title: "Financial Institution Function Scope",
    subtitle: "Business Model",
    description:
      "Applicable IPG 4.2 functions for Financial Institution-focused selections.",
    facts: ["IPGFundsDisbursement", "No IPGRefund in focused menu", "Payment Modal available", "Reversal mandatory"],
    body: [
      "The focused Financial Institution 4.2 menu keeps payment, stored-card, modal, funds-disbursement, reversal, and status methods visible.",
    ],
    tables: [v42FinancialFunctionScopeTable],
    differences: v42Differences,
  },
};

const v42EcommerceContent = {
  ...v42Content,
  "ipg-ecommerce-overview": {
    title: "IPG 4.2 - ECommerce Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.2 reference for ECommerce integrations.",
    facts: ["Protocol 4.2", "BM ECommerce", "CartItems mandatory", "Refunds and recurring"],
    body: [
      "The 4.2 source PDF is primarily an e-commerce payment document, so this focused view exposes the full regular card, store-card, recurring, modal, refund, reversal, and status method set.",
      "IPGPurchase in 4.2 requires the Cart logical record and CartItems. Stored-card flows use Token rather than CardToken.",
      "For payment outcome handling, use URL_Notify notifications and return HTTP 200 with body OK.",
    ],
    tables: [v42EcommerceFunctionScopeTable, v42CompatibilityTable],
    differences: v42Differences,
  },
  "ipg-v42-ecommerce-functions": {
    title: "ECommerce Function Scope",
    subtitle: "Business Model",
    description:
      "Applicable IPG 4.2 functions for ECommerce integrations.",
    facts: ["IPGPurchase", "Store card", "Recurring", "Refund and reversal"],
    body: [
      "The focused ECommerce 4.2 menu keeps the complete source-document commerce flow visible, including recurring methods and IPGRefund.",
    ],
    tables: [v42EcommerceFunctionScopeTable],
    differences: v42Differences,
  },
};

const sharedGeneralItems = [
  { id: "ipg-integration-steps", label: "Integration steps", type: "guide" },
  { id: "ipg-http-post", label: "HTTP POST", type: "guide" },
  { id: "ipg-data-types", label: "Data type formats", type: "schema" },
  { id: "ipg-response-codes", label: "Response codes", type: "schema" },
  { id: "ipg-carts", label: "Carts", type: "schema" },
  { id: "ipg-security", label: "Security & signatures", type: "guide" },
  { id: "ipg-signature-generation", label: "Signature generation", type: "guide" },
  { id: "ipg-signature-verification", label: "Signature verification", type: "guide" },
  { id: "ipg-signing-example", label: "Step-by-step signing example", type: "guide" },
];

const modelGeneralGroup = (overviewId) => ({
  title: "General",
  items: [
    { id: overviewId, label: "Overview & Architecture", type: "overview" },
    ...sharedGeneralItems,
  ],
});

const callbackDocumentationGroup = {
  title: "Callbacks",
  items: [
    { id: "ipg-callbacks", label: "Callbacks overview", type: "guide" },
    { id: "ipg-callback-retries", label: "Handling & retries", type: "guide" },
    { id: "ipg-callback-troubleshooting", label: "Troubleshooting", type: "guide" },
    { id: "ipg-callback-payment", label: "Object Payment", type: "schema" },
    { id: "ipg-callback-carddata", label: "Object CardData", type: "schema" },
    { id: "ipg-callback-customer", label: "Object Customer", type: "schema" },
    { id: "ipg-callback-operation", label: "Object Operation", type: "schema" },
    { id: "ipg-callback-errors", label: "Array Errors", type: "schema" },
    { id: "ipg-callback-examples", label: "Common callback examples", type: "guide" },
  ],
};

const modelImplementationTypesGroup = {
  title: "Implementation Types",
  items: [
    { id: "ipg-redirect-overview", label: "Redirect checkout", type: "guide" },
    { id: "ipg-embedded-overview", label: "Embedded checkout", type: "guide" },
    { id: "ipg-modal-overview", label: "Modal implementation", type: "guide" },
    { id: "ipg-wallet-overview", label: "Wallet JS SDK overview", type: "guide" },
    { id: "ipg-apple-pay", label: "Apple Pay JS SDK", type: "guide" },
    { id: "ipg-apple-domain", label: "Apple Pay domain registration", type: "guide" },
    { id: "ipg-google-pay", label: "Google Pay JS SDK", type: "guide" },
    { id: "ipg-wallet-sdk", label: "JS SDK setup", type: "guide" },
  ],
};

const modelApiMethodsGroup = {
  title: "API Methods",
  items: [
    { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
    { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
    { id: "ipg-embedded-purchase", label: "IPGEmbeddedPayment - IPGPurchase", type: "post" },
    { id: "ipg-embedded-stored", label: "IPGEmbeddedPayment - Stored Card", type: "post" },
    { id: "ipg-payment-token-purchase", label: "IPGPaymentToken - IPGPurchase", type: "post" },
    { id: "ipg-payment-token-stored", label: "IPGPaymentToken - Stored Card", type: "post" },
    { id: "ipg-token-provider-session", label: "IPGTokenProviderSession", type: "post" },
    { id: "ipg-tokenized-card-purchase", label: "IPGTokenizedCardPurchase", type: "post" },
  ],
};

const modelBusinessModelsGroup = (functionScopeId) => ({
  title: "Business Models",
  items: [
    { id: functionScopeId, label: "Function scope", type: "schema" },
    { id: "ipg-business-models", label: "Master comparison", type: "schema" },
    { id: "ipg-feature-matrix", label: "Feature matrix", type: "schema" },
    { id: "ipg-payment-availability", label: "Payment method availability", type: "schema" },
    { id: "ipg-key-field-differences", label: "Key field differences", type: "schema" },
    { id: "ipg-protocol-changes", label: "4.2 to 4.5 changes", type: "schema" },
  ],
});

const gamblingImplementationTable = table(
  "Gambling Implementations and API Functions",
  ["Implementation", "Applicable API function calls"],
  [
    ["Redirect checkout", "IPGPurchase, IPG3DSPurchaseWithStoredCard"],
    ["Embedded checkout", "IPGEmbeddedPayment with PaymentType IPGPurchase or IPG3DSPurchaseWithStoredCard"],
    ["Modal implementation", "IPGPaymentToken with ModalType IPGPurchase or IPG3DSPurchaseWithStoredCard"],
    ["Google Pay redirect", "Google Pay availability check on merchant page, then IPGPurchase with IPGPaymentContext=GooglePay"],
    ["Apple Pay redirect", "Apple Pay availability check on merchant page, then IPGPurchase with IPGPaymentContext=ApplePay"],
    ["Apple Pay only JS SDK", "IPGTokenProviderSession, then IPGTokenizedCardPurchase"],
    ["Backend implementation", "IPGOCT, IPGGetTxnStatus, IPGReversal"],
  ]
);

const gamblingRequiredMethodsTable = table(
  "Gambling Function Scope",
  ["Function", "When it is required", "Purpose"],
  [
    ["IPGPurchase", "Required for redirect card deposits and wallet redirect deposits.", "Starts a customer payment/deposit flow."],
    ["IPG3DSPurchaseWithStoredCard", "Required only when the merchant supports stored-card deposits.", "Processes a stored CardToken with full 3DS verification."],
    ["IPGEmbeddedPayment", "Required only for embedded checkout.", "Returns the iframe URL for card or stored-card payment."],
    ["IPGPaymentToken", "Required only for modal checkout.", "Returns the token used by payment-modal.js."],
    ["IPGTokenProviderSession", "Required for Apple Pay only JS SDK.", "Creates the Apple Pay merchant session through IPG."],
    ["IPGTokenizedCardPurchase", "Required for Apple Pay only JS SDK final payment.", "Processes the tokenized wallet payment."],
    ["IPGOCT", "Required when the merchant supports gaming withdrawals to card.", "Executes the Original Credit Transaction payout."],
    ["IPGGetTxnStatus", "Recommended for OCT timeout/reference checks.", "Reads the status of a previously executed OCT by OrderID."],
    ["IPGReversal", "Mandatory for all merchants.", "Reverses a previously executed payment before settlement."],
  ]
);

const financialInstitutionRequiredMethodsTable = table(
  "Financial Institution Function Scope",
  ["Function", "When it is required", "Purpose"],
  [
    ["IPGPurchase", "Required for card payment flows supported by the merchant setup.", "Starts a customer payment flow."],
    ["IPG3DSPurchaseWithStoredCard", "Required only when stored-card payment is supported.", "Processes a stored CardToken with full 3DS verification."],
    ["IPGEmbeddedPayment", "Required only for embedded checkout.", "Returns the iframe URL for card or stored-card payment."],
    ["IPGPaymentToken", "Required only for modal checkout.", "Returns the token used by payment-modal.js."],
    ["IPGTokenProviderSession", "Required for Apple Pay JS SDK.", "Creates the Apple Pay merchant session through IPG."],
    ["IPGTokenizedCardPurchase", "Required for Apple Pay or Google Pay JS SDK final payment.", "Processes the tokenized wallet payment."],
    ["IPGFundsDisbursement", "Required for Financial Institution payout/disbursement flows.", "Disburses funds to a cardholder card."],
    ["IPGGetTxnStatus", "Recommended for backend timeout/reference checks.", "Reads the status of a previously executed backend transaction by OrderID."],
    ["IPGReversal", "Mandatory where a previous payment must be reversed before settlement.", "Reverses a previously executed payment."],
  ]
);

const ecommerceRequiredMethodsTable = table(
  "ECommerce Function Scope",
  ["Function", "When it is required", "Purpose"],
  [
    ["IPGPurchase", "Required for regular card payments.", "Starts a customer payment flow."],
    ["IPG3DSPurchaseWithStoredCard", "Required only when stored-card payment is supported.", "Processes a stored CardToken with full 3DS verification."],
    ["IPGEmbeddedPayment", "Required only for embedded checkout.", "Returns the iframe URL for card or stored-card payment."],
    ["IPGPaymentToken", "Required only for modal checkout.", "Returns the token used by payment-modal.js."],
    ["IPGTokenProviderSession", "Required for Apple Pay JS SDK.", "Creates the Apple Pay merchant session through IPG."],
    ["IPGTokenizedCardPurchase", "Required for Apple Pay or Google Pay JS SDK final payment.", "Processes the tokenized wallet payment."],
    ["IPGRefund", "Required when the merchant supports post-payment refunds.", "Refunds a previously executed payment."],
    ["IPGReversal", "Mandatory where a previous payment must be reversed before settlement.", "Reverses a previously executed payment."],
  ]
);

const gamblingWalletContextTable = table(
  "Gambling Wallet Redirect Contexts",
  ["Wallet", "Frontend check", "IPG request"],
  [
    ["Google Pay", "Use the iCard JS SDK to check Google Pay availability on the merchant page.", "Send IPGPurchase with IPGPaymentContext=GooglePay."],
    ["Apple Pay redirect", "Use the iCard JS SDK to check Apple Pay availability on the merchant page.", "Send IPGPurchase with IPGPaymentContext=ApplePay."],
    ["Apple Pay only SDK", "Use Apple Pay on the deposit page.", "Create IPGTokenProviderSession, then send IPGTokenizedCardPurchase."],
  ]
);

const scopedVersionSummary = (modelLabel, versionId, facts = []) => {
  const base = ipgVersionDocuments[versionId].summary;

  return {
    ...base,
    title: `${modelLabel} ${base.title}`,
    facts: [modelLabel, ...facts, ...base.facts],
    body: [
      `This final page summarizes version-specific differences for the ${modelLabel} selection. The regular documentation pages stay focused on the applicable functions instead of repeating migration notes on every page.`,
      ...base.body,
    ],
  };
};

const gamblingVersion45Summary = {
  title: "Gambling IPG 4.5 Summary",
  subtitle: "Version Summary",
  description:
    "Final checklist for Gambling merchants integrating IPG protocol 4.5.",
  facts: ["BM Gambling", "Protocol 4.5", "Deposit and withdrawal flows", "Mandatory reversal"],
  body: [
    "The Gambling 4.5 documentation set includes only the functions applicable to BM Gambling: deposit checkout methods, wallet deposit options, OCT withdrawal, OCT status reference, and reversal.",
    "Use the regular pages for implementation details, then use this final summary to confirm the applicable functions and the protocol changes from earlier versions.",
  ],
  tables: [gamblingRequiredMethodsTable, protocolChangesTable],
};

const gamblingMenu = [
  modelGeneralGroup("ipg-gambling-overview"),
  callbackDocumentationGroup,
  modelImplementationTypesGroup,
  modelApiMethodsGroup,
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-oct", label: "IPGOCT", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
    ],
  },
  modelBusinessModelsGroup("ipg-gambling-functions"),
];

const gamblingContent = {
  ...ipgContent,
  "ipg-overview": {
    title: "IPG 4.5 - Gambling Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.5 reference for Gambling merchants, including only the applicable checkout, wallet, backend, callback, and signature sections.",
    facts: ["Protocol 4.5", "BM Gambling", "Deposits and gaming withdrawals", "RSA-SHA256 signatures"],
    body: [
      ...ipgIntroductionBody,
      "This view keeps the shared IPG settings, signature rules, HTTP POST format, and callback handling, but filters the method list to the Gambling business model.",
      "For deposits, use redirect, embedded, modal, Google Pay redirect, Apple Pay redirect, or Apple Pay only JS SDK depending on the merchant experience.",
      "For withdrawals, use IPGOCT. Use IPGGetTxnStatus only as a reference check for OCT timeout cases, and implement IPGReversal because it is mandatory for all merchants.",
    ],
    resources: [resources.gamblingApi],
    tables: [ipgProvidesTable, ipgOutOfScopeTable, gamblingImplementationTable, gamblingRequiredMethodsTable],
    request: `IPGmethod=IPGPurchase
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=<unique-deposit-order>
URL_Notify=https://merchant.example/ipg/notify
Signature=<base64-signature>`,
    response: `Deposits are confirmed by signed JSON callback to URL_Notify.
Withdrawals use IPGOCT and return a signed backend response.
Reversal is mandatory for previously executed payments when reversal is needed.`,
  },
  "ipg-gambling-overview": {
    title: "IPG 4.5 - Gambling Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.5 reference for Gambling merchants, including only the applicable checkout, wallet, backend, callback, and signature sections.",
    facts: ["Protocol 4.5", "BM Gambling", "Deposits and gaming withdrawals", "RSA-SHA256 signatures"],
    body: [
      ...ipgIntroductionBody,
      "This view keeps the shared IPG settings, signature rules, HTTP POST format, and callback handling, but filters the method list to the Gambling business model.",
      "For deposits, use redirect, embedded, modal, Google Pay redirect, Apple Pay redirect, or Apple Pay only JS SDK depending on the merchant experience.",
      "For withdrawals, use IPGOCT. Use IPGGetTxnStatus only as a reference check for OCT timeout cases, and implement IPGReversal because it is mandatory for all merchants.",
    ],
    resources: [resources.gamblingApi],
    tables: [ipgProvidesTable, ipgOutOfScopeTable, gamblingImplementationTable, gamblingRequiredMethodsTable],
    request: `IPGmethod=IPGPurchase
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=<unique-deposit-order>
URL_Notify=https://merchant.example/ipg/notify
Signature=<base64-signature>`,
    response: `Deposits are confirmed by signed JSON callback to URL_Notify.
Withdrawals use IPGOCT and return a signed backend response.
Reversal is mandatory for previously executed payments when reversal is needed.`,
  },
  "ipg-gambling-functions": {
    title: "Gambling Function Scope",
    subtitle: "Business Model",
    description:
      "The applicable IPG 4.5 functions for Gambling merchants, separated from the Financial Institution and ECommerce methods.",
    facts: ["No IPGRefund", "No IPGFundsDisbursement", "IPGOCT for withdrawals", "IPGReversal mandatory"],
    body: [
      "The Gambling business model does not use IPGRefund or IPGFundsDisbursement. Those methods remain available in the all-business-model view and their own model contexts.",
      "Choose one checkout presentation for deposits, add wallet-specific flows when needed, then implement the backend methods that match the merchant's withdrawal and reversal requirements.",
    ],
    resources: [resources.gamblingApi],
    tables: [gamblingImplementationTable, gamblingRequiredMethodsTable],
  },
  "ipg-wallet-overview": {
    title: "Gambling Wallet Options",
    subtitle: "Wallet Deposits",
    description:
      "Gambling merchants can use Google Pay redirect, Apple Pay redirect, or Apple Pay only JS SDK depending on the wallet journey.",
    facts: ["Google Pay redirect", "Apple Pay redirect", "Apple Pay only SDK", "URL_Notify remains authoritative"],
    availability: availability(true, false, false),
    body: [
      "Google Pay and Apple Pay redirect flows use the iCard JS SDK to check wallet availability on the merchant page, then continue through IPGPurchase with IPGPaymentContext.",
      "Apple Pay only JS SDK uses IPGTokenProviderSession to create the Apple session and IPGTokenizedCardPurchase to complete the payment.",
    ],
    resources: [resources.gamblingApi],
    tables: [gamblingWalletContextTable],
  },
  "ipg-google-pay": {
    title: "Google Pay for Gambling",
    subtitle: "Wallet Deposits",
    description:
      "Google Pay for BM Gambling uses the iCard JS SDK for availability checks and IPGPurchase for the redirect checkout.",
    facts: ["BM Gambling", "IPGPaymentContext=GooglePay", "Redirect checkout", "No WebView support"],
    availability: availability(true, false, false),
    body: [
      "Include the iCard Google/Apple Pay SDK on the merchant payment-method page, check whether Google Pay is available on the customer device, and show the Google Pay method only when the SDK returns ready.",
      "When the customer continues, create the usual signed IPGPurchase request and include IPGPaymentContext=GooglePay so the iCard checkout opens the Google Pay context.",
    ],
    resources: [resources.gamblingApi],
    request: `<script src="https://dev-ipg.icards.eu/sandbox/js/icard-g-a-pay.min.js"></script>
<script>
const googlePay = new ICardIpgGAPay({ mid: "<MID>", environment: "sandbox" });
googlePay.isGooglePayAvailable().then((isReady) => {
  if (isReady) showGooglePayMethod();
});
</script>`,
    response: `IPGmethod=IPGPurchase
IPGVersion=4.5
IPGPaymentContext=GooglePay
MID=<MID>
OrderID=<order-id>
URL_Notify=https://merchant.example/ipg/notify
Signature=<base64-signature>`,
  },
  "ipg-apple-pay": {
    title: "Apple Pay for Gambling",
    subtitle: "Wallet Deposits",
    description:
      "BM Gambling supports Apple Pay through a redirect implementation and an Apple Pay only JS SDK implementation.",
    facts: ["HTTPS required", "Valid SSL", "TLS 1.2", "Domain verification"],
    availability: availability(true, false, false),
    body: [
      "For Apple Pay redirect, use the JS SDK to check Apple Pay availability on the merchant page, then send IPGPurchase with IPGPaymentContext=ApplePay.",
      "For Apple Pay only JS SDK, the deposit page displays the Apple Pay button, the backend creates IPGTokenProviderSession, and the final payment is completed by IPGTokenizedCardPurchase.",
    ],
    resources: [resources.gamblingApi],
    request: `Redirect:
IPGmethod=IPGPurchase
IPGPaymentContext=ApplePay
IPGVersion=4.5
Signature=<base64-signature>

Apple Pay only SDK:
IPGmethod=IPGTokenProviderSession
...
IPGmethod=IPGTokenizedCardPurchase`,
  },
  "ipg-wallet-sdk": {
    title: "Gambling JS SDK Setup",
    subtitle: "Wallet Deposits",
    description:
      "The iCard JS SDK is used on Gambling merchant pages to detect Apple Pay and Google Pay availability before the selected IPG flow starts.",
    facts: ["Sandbox SDK", "Production SDK", "Availability checks", "Merchant page integration"],
    resources: [resources.gamblingApi],
    tables: [gamblingWalletContextTable],
    request: `<!-- Sandbox -->
<script src="https://dev-ipg.icards.eu/sandbox/js/icard-g-a-pay.min.js"></script>

<!-- Production -->
<script src="https://ipg.icard.com/js/icard-g-a-pay.min.js"></script>`,
  },
};

const financialInstitutionMenu = [
  modelGeneralGroup("ipg-financial-overview"),
  callbackDocumentationGroup,
  modelImplementationTypesGroup,
  modelApiMethodsGroup,
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-funds-disbursement", label: "IPGFundsDisbursement", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
    ],
  },
  modelBusinessModelsGroup("ipg-financial-functions"),
];

const financialInstitutionContent = {
  ...ipgContent,
  "ipg-overview": {
    title: "IPG 4.5 - Financial Institution Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.5 entry point for Financial Institution integrations.",
    facts: ["Protocol 4.5", "BM Financial Institution", "Funds disbursement", "RSA-SHA256 signatures"],
    body: [
      ...ipgIntroductionBody,
      "This view filters the navigation to the Financial Institution methods while keeping the shared IPG settings, signing, and callback sections.",
      "Use IPGFundsDisbursement for the model-specific payout method, IPGGetTxnStatus for backend status checks, and IPGReversal where a previously executed payment must be reversed.",
    ],
    tables: [ipgProvidesTable, ipgOutOfScopeTable, featureMatrixTable, backendComparisonTable],
  },
  "ipg-financial-overview": {
    title: "IPG 4.5 - Financial Institution Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.5 entry point for Financial Institution integrations.",
    facts: ["Protocol 4.5", "BM Financial Institution", "Funds disbursement", "RSA-SHA256 signatures"],
    body: [
      ...ipgIntroductionBody,
      "This view filters the navigation to the Financial Institution methods while keeping the shared IPG settings, signing, and callback sections.",
      "Use IPGFundsDisbursement for the model-specific payout method, IPGGetTxnStatus for backend status checks, and IPGReversal where a previously executed payment must be reversed.",
    ],
    tables: [ipgProvidesTable, ipgOutOfScopeTable, featureMatrixTable, backendComparisonTable],
  },
  "ipg-financial-functions": {
    title: "Financial Institution Function Scope",
    subtitle: "Business Model",
    description:
      "The applicable IPG 4.5 functions for Financial Institution integrations, separated from Gambling and ECommerce backend methods.",
    facts: ["No IPGOCT", "No IPGRefund", "IPGFundsDisbursement for disbursement", "IPGReversal when needed"],
    body: [
      "The Financial Institution view keeps the shared checkout, wallet, callback, and signature sections, then narrows the backend section to the disbursement/status/reversal methods.",
      "Use IPGFundsDisbursement for the model-specific backend operation. IPGOCT remains Gambling-specific and IPGRefund remains ECommerce-specific.",
    ],
    tables: [financialInstitutionRequiredMethodsTable, backendComparisonTable],
  },
};

const ecommerceMenu = [
  modelGeneralGroup("ipg-ecommerce-overview"),
  callbackDocumentationGroup,
  modelImplementationTypesGroup,
  modelApiMethodsGroup,
  {
    title: "Backend Methods",
    items: [
      { id: "ipg-refund", label: "IPGRefund", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
    ],
  },
  modelBusinessModelsGroup("ipg-ecommerce-functions"),
];

const ecommerceContent = {
  ...ipgContent,
  "ipg-overview": {
    title: "IPG 4.5 - ECommerce Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.5 entry point for ECommerce integrations.",
    facts: ["Protocol 4.5", "BM ECommerce", "Refunds", "RSA-SHA256 signatures"],
    body: [
      ...ipgIntroductionBody,
      "This view filters the navigation to the ECommerce methods while keeping the shared IPG settings, signing, and callback sections.",
      "Use IPGRefund for post-payment refunds and IPGReversal for payments that must be reversed before settlement.",
    ],
    tables: [ipgProvidesTable, ipgOutOfScopeTable, featureMatrixTable, backendComparisonTable],
  },
  "ipg-ecommerce-overview": {
    title: "IPG 4.5 - ECommerce Business Model",
    subtitle: "Business Model",
    description:
      "Focused IPG 4.5 entry point for ECommerce integrations.",
    facts: ["Protocol 4.5", "BM ECommerce", "Refunds", "RSA-SHA256 signatures"],
    body: [
      ...ipgIntroductionBody,
      "This view filters the navigation to the ECommerce methods while keeping the shared IPG settings, signing, and callback sections.",
      "Use IPGRefund for post-payment refunds and IPGReversal for payments that must be reversed before settlement.",
    ],
    tables: [ipgProvidesTable, ipgOutOfScopeTable, featureMatrixTable, backendComparisonTable],
  },
  "ipg-ecommerce-functions": {
    title: "ECommerce Function Scope",
    subtitle: "Business Model",
    description:
      "The applicable IPG 4.5 functions for ECommerce integrations, separated from Gambling and Financial Institution backend methods.",
    facts: ["No IPGOCT", "No IPGFundsDisbursement", "IPGRefund for refunds", "IPGReversal when needed"],
    body: [
      "The ECommerce view keeps the shared checkout, wallet, callback, and signature sections, then narrows the backend section to refund and reversal methods.",
      "Use IPGRefund for post-payment refunds. IPGOCT remains Gambling-specific and IPGFundsDisbursement remains Financial Institution-specific.",
    ],
    tables: [ecommerceRequiredMethodsTable, backendComparisonTable],
  },
};

const detailItem = (title, description) => ({ title, description });
const detailSection = (title, description, items) => ({ title, description, items });

const shared42DetailSections = {
  general: [
    detailSection(
      "How IPG 4.2 Fits the Merchant Integration",
      "IPG 4.2 separates the customer-facing checkout journey from the merchant's signed backend processing.",
      [
        detailItem("Merchant responsibility", "The merchant creates signed HTTP POST requests, redirects or presents the checkout, stores OrderID before sending, verifies every signed IPG message, and updates its own order state."),
        detailItem("IPG responsibility", "IPG validates the MID, currency, signature, and request parameters; presents the payment experience; performs 3DS and card-scheme processing; and sends the documented notification methods."),
        detailItem("Unique request identity", "For customer-facing methods, MID together with OrderID identifies the merchant request. IPG rejects duplicated transmissions, so generate and persist a unique OrderID before the first attempt."),
        detailItem("Authoritative payment completion", "A payment is successful only after the card response succeeds, IPG posts the appropriate method to URL_Notify, and the merchant returns HTTP 200 with the exact response body OK."),
      ]
    ),
    detailSection(
      "IPG 4.2 Operational Readiness",
      "Prepare the integration so retries, notifications, and later back-office operations remain traceable.",
      [
        detailItem("Separate environments", "Keep Sandbox and Production endpoints, MIDs, Originator values, RSA keys, URLs, and credentials separate. Never use a Sandbox key or MID in Production."),
        detailItem("Persist references", "Store OrderID, MID, Amount, Currency, Approval, IPG_Trnref, notification method, transaction status, and timestamps. These values are needed for support, reversal, refund, recurring, and reconciliation flows."),
        detailItem("Idempotent notification handling", "The URL_Notify endpoint must safely accept repeated or delayed messages without fulfilling, storing, refunding, or reversing the same business event twice."),
        detailItem("Protect sensitive data", "Do not log private keys, unmasked card data, or reusable stored-card tokens. Restrict Token access and associate each token with the correct authenticated merchant customer."),
      ]
    ),
  ],
  security: [
    detailSection(
      "IPG 4.2 Signature Implementation",
      "Every request and incoming IPG message must be signed or verified using the 4.2 value-concatenation algorithm.",
      [
        detailItem("Build the source values", "Remove Signature completely and keep the remaining values in the exact POST-data order used for the message. IPG 4.2 signs values only, without field names or separators."),
        detailItem("Encode and sign", "Concatenate the values, encode the complete UTF-8 string to Base64, sign that Base64 string with RSA SHA-256 and the sender's private key, then Base64 encode the binary signature."),
        detailItem("Append Signature last", "Add Signature only after it has been calculated. Signature must be the final POST parameter because it is not part of the signed source values."),
        detailItem("Verify before processing", "Extract and remove Signature, rebuild the Base64 source string using the received value order, and verify it with the configured iCard public key before changing merchant state."),
      ]
    ),
    detailSection(
      "Common IPG 4.2 Signature Failures",
      "Small ordering or encoding differences produce a different signed value.",
      [
        detailItem("Changed value order", "Do not sort values and do not rebuild them from an unordered map. Preserve the exact message order used by the sender."),
        detailItem("Field names or separators included", "The 4.2 source string contains concatenated values only. Do not add parameter names, ampersands, semicolons, colons, or spaces."),
        detailItem("Missing Base64 stage", "Sign the Base64 representation of the concatenated UTF-8 string, not the raw concatenated string."),
        detailItem("Wrong key selection", "Check KeyIndex, KeyIndexResp, environment, merchant private key, and iCard public key when verification fails."),
      ]
    ),
  ],
  callbacks: [
    detailSection(
      "IPG 4.2 Notification Pipeline",
      "Process method-based IPG-to-Merchant POST messages through one controlled URL_Notify pipeline.",
      [
        detailItem("1. Accept and identify", "Accept the POST at the exact URL_Notify sent in the initiating request and identify the event from IPGmethod, such as IPGPurchaseNotify, IPGPurchaseDeclineNotify, or IPGPurchaseRollback."),
        detailItem("2. Verify and correlate", "Verify Signature with the iCard public key, then correlate MID, OrderID, Amount, Currency, and available IPG transaction references with the stored merchant order."),
        detailItem("3. Apply idempotently", "Persist the notification and update merchant state exactly once. A browser redirect method must never override a verified backend notification."),
        detailItem("4. Acknowledge exactly", "Return HTTP status 200 and a body containing only OK after the message is verified and durably accepted. Any other status or response body is treated as an error."),
      ]
    ),
    detailSection(
      "Notification and Redirect Method Roles",
      "The same customer journey can produce backend notification methods and browser redirect methods with different purposes.",
      [
        detailItem("Notify methods", "Methods ending in Notify are posted to URL_Notify and are the reliable server-to-server path for successful or declined processing."),
        detailItem("OK methods", "Methods ending in OK are sent when IPG redirects the customer browser to URL_OK after the required successful notification acknowledgement."),
        detailItem("Cancel methods", "Methods ending in Cancel are sent to URL_Cancel when the customer cancels. Treat cancellation as a customer-experience event, not proof of an approved payment."),
        detailItem("Rollback method", "IPGPurchaseRollback means IPG reversed an earlier successful authorization because it did not receive the required OK acknowledgement. Mark the order as not paid even if IPGPurchaseNotify was previously received."),
      ]
    ),
  ],
  implementation: [
    detailSection(
      "IPG 4.2 Implementation Responsibilities",
      "Choose between the documented Redirect and Payment Modal experiences while keeping final processing on the merchant backend.",
      [
        detailItem("Merchant frontend", "Initiates the redirect or loads the modal, presents customer-facing success or cancellation state, and must not decide the final financial result by itself."),
        detailItem("Merchant backend", "Creates ordered and signed POST requests, obtains modal tokens, receives URL_Notify messages, verifies signatures, returns the exact acknowledgement, and updates orders."),
        detailItem("IPG checkout", "Collects card information, handles 3DS and card-scheme processing, and sends method-based result notifications and redirects."),
        detailItem("Final-result rule", "Whether using Redirect or Modal, rely on verified URL_Notify processing and the required OK acknowledgement for final merchant state."),
      ]
    ),
    detailSection(
      "Choosing the 4.2 Presentation",
      "Use the presentation that matches the required customer experience and supported method.",
      [
        detailItem("Redirect checkout", "Use Redirect for the standard hosted experience. The browser leaves the merchant page, completes the flow at IPG, and returns to URL_OK or URL_Cancel."),
        detailItem("Payment Modal", "Use Payment Modal when the checkout should appear without leaving the merchant page. First obtain a token through IPGPaymentToken, then load payment-modal.js."),
        detailItem("Supported modal types", "The 4.2 guide documents IPGPurchase, IPGFirstRecurring, IPGStoreCard, and IPG3DSPurchaseWithStoredCard as ModalType values."),
        detailItem("No 4.2 embedded API", "The supplied 4.2 guide documents Payment Modal rather than the later IPGEmbeddedPayment method. Do not assume 4.5 implementation APIs are available in 4.2."),
      ]
    ),
  ],
  methods: [
    detailSection(
      "Common IPG 4.2 Method Lifecycle",
      "Apply this lifecycle to each 4.2 API or backend method.",
      [
        detailItem("Prepare and validate", "Select the correct method, confirm it is enabled for the MID, validate required values and currency, create a unique OrderID where applicable, and persist the request context."),
        detailItem("Build and sign in order", "Create the form-encoded POST in deterministic parameter order, calculate the 4.2 value-only signature without Signature, append Signature last, and send to the correct environment."),
        detailItem("Verify every result", "Verify signatures on synchronous responses, URL_Notify methods, and browser redirect methods before using any returned status, Token, Approval, or IPG_Trnref."),
        detailItem("Complete the business action", "For customer-facing methods, wait for the verified URL_Notify flow and return exact OK. For backend methods, use the verified synchronous response and preserve transaction references."),
      ]
    ),
    detailSection(
      "Validation, Error, and Timeout Handling",
      "Avoid duplicate payments and ambiguous merchant state.",
      [
        detailItem("Invalid request", "Correct missing or invalid parameters, preserve the intended business reference, rebuild the full ordered POST, and generate a new signature before retrying."),
        detailItem("Duplicate request", "IPG rejects duplicate MID and OrderID combinations. Investigate the original attempt rather than generating uncontrolled retries with the same identifier."),
        detailItem("Lost or uncertain result", "Do not treat an HTTP transport result as payment approval. Check received notifications and use IPGGetTxnStatus only as the documented reference check."),
        detailItem("Back-office recovery", "Use IPGReversal for a previously executed payment that must be voided and IPGRefund only for an approved refund use case. Preserve the original IPG_Trnref."),
      ]
    ),
  ],
  models: [
    detailSection(
      "IPG 4.2 Business-Model Scope",
      "The supplied 4.2 guide is organized around e-commerce payment functions; focused screens keep the website structure while limiting visible methods.",
      [
        detailItem("E-commerce", "Uses the complete documented 4.2 purchase, store-card, stored-card, recurring, modal, reversal, refund, and status method set where enabled."),
        detailItem("Gambling", "Uses the applicable shared 4.2 deposit and maintenance flows plus IPGOCT where enabled by iCard for the merchant setup."),
        detailItem("Financial Institution", "Uses applicable shared 4.2 payment and maintenance flows plus IPGFundsDisbursement where enabled by iCard for the merchant setup."),
        detailItem("Confirm enabled scope", "Do not infer method availability from another business model. Confirm every required method, MID, currency, and test scenario with the iCard integration team."),
      ]
    ),
  ],
};

const method42DetailSections = {
  "ipg-purchase": [
    detailSection("IPGPurchase Usage and Processing", "IPGPurchase starts the standard customer-present checkout flow.", [
      detailItem("When to use", "Use when the cardholder is actively paying through the IPG hosted checkout page."),
      detailItem("Request validation", "IPG checks the MID, the currency against that MID, the signature and fields, and the uniqueness of MID plus OrderID."),
      detailItem("Cart handling", "Cart and CartItems are mandatory in the 4.2 guide. Include every product and any additional fee or tax as a separate indexed cart item, and keep cart currency equal to the purchase currency."),
      detailItem("Store-card option", "Where enabled for the merchant model, checkout may display a Store Card checkbox selected by default. If the customer stores the card, Token is returned in IPGPurchaseNotify."),
      detailItem("Success handling", "Process verified IPGPurchaseNotify, store Approval and IPG_Trnref, commit the order idempotently, and return exact OK. URL_OK is a browser transition after that acknowledgement."),
    ]),
  ],
  "ipg-v42-store-card": [
    detailSection("IPGStoreCard Usage and Processing", "IPGStoreCard verifies and saves a card for later use.", [
      detailItem("When to use", "Use only when the merchant offers a clear stored-card capability and has the required customer consent and merchant-side account relationship."),
      detailItem("Verification transaction", "IPG sends a zero-amount verification transaction. A successful verification produces IPGStoreCardNotify and, after exact OK acknowledgement, IPGStoreCardOK."),
      detailItem("Token handling", "Persist Token only after the signed notification is verified. Treat it as a reusable payment credential, restrict access, and bind it to the correct customer."),
      detailItem("Cancellation or decline", "IPGStoreCardCancel means the customer canceled and no card is saved. IPGStoreCardDeclineNotify reports a declined verification and includes transaction status details."),
    ]),
  ],
  "ipg-v42-get-stored-card-data": [
    detailSection("Stored-Card Data Lookup", "IPGGetStoredCardData retrieves card information for a previously stored card.", [
      detailItem("Backend-only method", "Call this method from the trusted merchant backend; never expose private keys or the stored Token to browser code."),
      detailItem("Token encryption", "Encrypt the stored Token with the iCard public key using PKCS1 padding before placing it in the request."),
      detailItem("Reference requirement", "Use only a Token obtained from a previous verified store-card flow and authorized for the current merchant customer."),
      detailItem("Response handling", "Select XML or JSON through OutputFormat, verify the signed response, and expose only the minimum masked information required by the merchant experience."),
    ]),
  ],
  "ipg-v42-purchase-with-stored-card": [
    detailSection("Merchant-Initiated Stored-Card Purchase", "IPGPurchaseWithStoredCard performs a backend payment using a previously stored card.", [
      detailItem("When to use", "Use for the documented merchant-initiated or subscription scenario, not for an untrusted browser request."),
      detailItem("Required references", "Send the authorized encrypted Token and IPG_Trnref from the first or previous related transaction together with a unique merchant OrderID."),
      detailItem("No blind retry", "Because this is a financial backend operation, investigate an uncertain result before retrying. Preserve the original request and all returned references."),
      detailItem("Successful response", "Verify Signature and treat the response as successful only when the documented response status indicates success and the successful IPG_Trnref and Approval values are present."),
    ]),
  ],
  "ipg-3ds-stored": [
    detailSection("3DS Stored-Card Purchase", "IPG3DSPurchaseWithStoredCard performs a customer-present stored-card payment with 3DS verification.", [
      detailItem("Customer interaction", "Open the required new tab or window and redirect the cardholder to the issuer ACS when 3DS verification is required."),
      detailItem("Token and CVC", "Encrypt Token with the iCard public key using PKCS1 padding. Set VerifyCVC=1 only when the customer must confirm CVC before proceeding."),
      detailItem("Notification flow", "Process IPG3DSPurchaseWithStoredCardNotify at URL_Notify, verify it, commit idempotently, and return exact OK before relying on the subsequent URL_OK redirect."),
      detailItem("Decline and cancel", "Use the dedicated decline notification for backend decline state and the cancel redirect for customer-facing cancellation. Consult IPGGetTxnStatus codes when provided."),
    ]),
  ],
  "ipg-v42-first-recurring": [
    detailSection("First Recurring Transaction", "IPGFirstRecurring establishes the initial customer-present transaction for a subscription agreement.", [
      detailItem("When to use", "Use when the customer is actively creating the recurring agreement and completing the first payment."),
      detailItem("Customer data", "Provide the documented customer contact and billing data and a unique OrderID that identifies the agreement or first payment."),
      detailItem("Result methods", "The guide uses the same IPGPurchase notification, OK, Cancel, Rollback, and DeclineNotify method family for the first recurring transaction."),
      detailItem("Reference preservation", "After verified success, preserve IPG_Trnref as the reference required by later IPGSubsequentRecurring requests."),
    ]),
  ],
  "ipg-v42-subsequent-recurring": [
    detailSection("Subsequent Recurring Transaction", "IPGSubsequentRecurring performs a merchant-initiated backend payment after the initial recurring agreement.", [
      detailItem("When to use", "Use only under the established recurring agreement and according to the merchant's customer authorization and billing schedule."),
      detailItem("Original reference", "Send the IPG_Trnref of the first recurring transaction so IPG can associate the subsequent payment with the subscription."),
      detailItem("Backend controls", "Validate the subscription state, amount, currency, billing date, and duplicate protection before signing and sending the request."),
      detailItem("Response handling", "Verify Signature, preserve trnreforiginal and trnref, and use the documented status and status_msg fields to update billing and reconciliation records."),
    ]),
  ],
  "ipg-payment-token-purchase": [
    detailSection("Payment Modal Token Request", "IPGPaymentToken is the backend bootstrap request for the 4.2 Payment Modal.", [
      detailItem("Choose ModalType", "Select IPGPurchase, IPGFirstRecurring, IPGStoreCard, or IPG3DSPurchaseWithStoredCard and include the required parameters of that original method."),
      detailItem("URL differences", "URL_OK and URL_Cancel are not required in IPGPaymentTokenRequest, but URL_Notify remains necessary for the asynchronous result."),
      detailItem("Stored-card modal naming", "For ModalType=IPG3DSPurchaseWithStoredCard, the saved-card parameter is Cardtoken rather than Token."),
      detailItem("Use the response token once", "Verify the synchronous response, then use its token to load payment-modal.js for the intended order and environment."),
    ]),
  ],
  "ipg-reversal": [
    detailSection("IPGReversal Usage and Processing", "IPGReversal voids a previously executed payment and is mandatory for all 4.2 merchant integrations.", [
      detailItem("When to use", "Use for a documented void or recovery case where the earlier payment must be reversed."),
      detailItem("Transaction reference", "Send the exact original IPG_Trnref. Do not select a transaction from browser state or an unverified notification."),
      detailItem("Output format", "The 4.2 guide marks OutputFormat as mandatory for this method; send xml or json and parse the chosen format exactly."),
      detailItem("Merchant state", "Verify the signed response, persist the result, and update the order and reconciliation state idempotently."),
    ]),
  ],
  "ipg-refund": [
    detailSection("IPGRefund Usage and Processing", "IPGRefund credits funds for a previously executed payment.", [
      detailItem("When to use", "Use only after the merchant has approved the refund and identified the correct original transaction."),
      detailItem("Validate the refund", "Check MID, original IPG_Trnref, refund OrderID, amount, currency, and customer email before signing the request."),
      detailItem("Partial and repeat protection", "Track cumulative refunded amounts and merchant authorization so repeated operator actions or retries cannot exceed the intended refund."),
      detailItem("Response handling", "Verify Signature and persist the returned trnref, amount, currency, status, and status_msg for customer support and reconciliation."),
    ]),
  ],
  "ipg-get-status": [
    detailSection("IPGGetTxnStatus Interpretation", "IPGGetTxnStatus is a reference lookup and must not replace the normal notification flow.", [
      detailItem("When to use", "Use from the merchant backend to investigate a previously submitted OrderID after an uncertain or missing result."),
      detailItem("Approval rule", "Do not treat the lookup alone as the original approval signal. The guide defines success through successful card processing plus URL_Notify and exact OK acknowledgement."),
      detailItem("Important statuses", "100 means completed successfully after acknowledgement; 97 means reversed because the notification was not acknowledged; 98 is an intermediate missing-capture state; 99 means not found."),
      detailItem("Operational decision", "Use the verified result to investigate, wait, reconcile, or follow the documented recovery flow. Do not blindly repeat the original payment."),
    ]),
  ],
  "ipg-oct": [
    detailSection("IPGOCT Usage and Processing", "IPGOCT is the Gambling backend method for processing an Original Credit Transaction gaming withdrawal.", [
      detailItem("Correct method", "Every OCT request must send IPGmethod=IPGOCT. Do not reuse an IPGPurchase request bundle or include customer-facing purchase callback fields."),
      detailItem("OCT by PAN path", "Use CardToken as the documented card-destination reference and omit IPG_Trnref and Approval. The supplied method table does not define a raw PAN request property."),
      detailItem("TRN and Approval path", "Send both IPG_Trnref and Approval from the previously executed payment and omit CardToken."),
      detailItem("Shared validation", "For either path, send the valid MID, unique OrderID, amount, MID currency, valid recipient names, optional OutputFormat, and Signature as the last POST parameter."),
      detailItem("Response handling", "Verify Signature before using Status, StatusMsg, IPGTrnref, or IPGTrnrefOriginal. IPGTrnrefOriginal is available for OCT by TRN and Approval."),
      detailItem("Timeout handling", "Use IPGGetTxnStatus only when an OCT result is uncertain or timed out; do not blindly send another withdrawal."),
    ]),
  ],
  "ipg-funds-disbursement": [
    detailSection("IPGFundsDisbursement in a 4.2-Focused Integration", "This method is exposed only for the focused Financial Institution scope where it is enabled by iCard.", [
      detailItem("Confirm availability", "IPGFundsDisbursement is not defined in the supplied 4.2 e-commerce guide. Confirm the exact enabled request contract, response fields, and certification scenarios with iCard."),
      detailItem("Merchant controls", "Validate the approved disbursement decision, recipient, amount, currency, destination-card relationship, and duplicate protection."),
      detailItem("Uncertain outcome", "Preserve OrderID and transaction references and follow the agreed status and recovery procedure before retrying."),
      detailItem("Auditability", "Record authorization, execution, response, exception handling, and reconciliation details for every disbursement."),
    ]),
  ],
};

const section42DetailSections = {
  "ipg-overview": [
    detailSection("End-to-End IPG 4.2 Flow", "The standard flow moves from merchant initiation to IPG checkout, backend notification, and customer return.", [
      detailItem("1. Initiate", "The customer chooses to pay and the merchant backend creates a signed request with a persisted unique OrderID."),
      detailItem("2. Redirect or present", "The browser is redirected to IPG or the merchant opens the Payment Modal using a verified token."),
      detailItem("3. Process", "IPG collects payment data, performs 3DS and financial messaging, and determines the processing result."),
      detailItem("4. Notify and acknowledge", "IPG posts the result method to URL_Notify. The merchant verifies it, updates state idempotently, and returns HTTP 200 with body OK."),
      detailItem("5. Return the customer", "After successful acknowledgement, IPG redirects the browser to URL_OK; cancellation flows return through URL_Cancel."),
    ]),
  ],
  "ipg-integration-steps": [
    detailSection("IPG 4.2 Certification Journey", "Follow the integration and testing process described in the 4.2 guide.", [
      detailItem("Technical scope meeting", "Agree the required methods, Sandbox settings, business behavior, and support channel with the iCard integration team."),
      detailItem("Sandbox implementation", "Use the provided Sandbox kit, execute the method-specific test scenario, record TRNs and OrderIDs, and return the completed scenario for iCard QA review."),
      detailItem("Production validation", "After Sandbox approval, use the Production kit and Production test scenario. The MID remains restricted until the next-day clearing check passes."),
      detailItem("Launch planning", "Align Sandbox testing with the intended live date. The guide notes that a gap longer than one month may require Sandbox tests to be repeated."),
      detailItem("Post-test monitoring", "Plan a controlled Family and Friends period and provide a merchant test account when requested for ongoing monitoring and testing."),
    ]),
  ],
  "ipg-http-post": [
    detailSection("Constructing the 4.2 HTTP POST", "The ordered form body is part of the signature contract.", [
      detailItem("Format", "Send parameters in the request body as URL-encoded parameter=value tokens separated by ampersands, using UTF-8 and application/x-www-form-urlencoded."),
      detailItem("Deterministic order", "Build parameters in a stable order and preserve that value order for the 4.2 signature source string."),
      detailItem("Signature position", "Calculate Signature without the Signature property, then append Signature as the final POST parameter."),
      detailItem("Environment endpoint", "Send Sandbox traffic only to https://dev-ipg.icards.eu/sandbox/ and Production traffic only to https://ipg.icard.com/."),
    ]),
  ],
  "ipg-data-types": [
    detailSection("IPG 4.2 Data Validation", "Validate values before signing because any formatting correction changes the signed message.", [
      detailItem("Fixed-length values", "Preserve required lengths and leading zeroes for A(n), AN(n), and N(n) fields."),
      detailItem("Amounts", "Use a point as the decimal separator and do not introduce commas or locale-specific formatting."),
      detailItem("Encoded formats", "Produce valid Base64, XML, or JSON in the selected format and avoid accidental character-set or whitespace changes."),
      detailItem("Method-specific limits", "Respect the documented field limits, including OrderID values up to 255 characters where stated."),
    ]),
  ],
  "ipg-callback-retries": [
    detailSection("Acknowledgement Failure and Rollback", "The merchant acknowledgement is part of the 4.2 payment-completion mechanism.", [
      detailItem("Exact successful acknowledgement", "Return status 200 and only the text OK after verified processing has been durably committed."),
      detailItem("Invalid acknowledgement", "Any other HTTP status or any additional response-body content is treated as a communication, call, server, or system error."),
      detailItem("Rollback behavior", "When IPG does not receive OK for IPGPurchaseNotify, it may reverse the authorization and post IPGPurchaseRollback to URL_Notify."),
      detailItem("Merchant recovery", "The rollback handler must mark the order not paid and reverse any provisional fulfilment or credit applied after the earlier notification."),
    ]),
  ],
  "ipg-callback-troubleshooting": [
    detailSection("Troubleshooting IPG 4.2 Notifications", "Check transport, signature, correlation, and acknowledgement before escalating.", [
      detailItem("No notification received", "Confirm URL_Notify was included in the initiating request, is publicly reachable, accepts POST, and is not blocked by merchant infrastructure."),
      detailItem("Signature verification fails", "Check received parameter order, UTF-8 conversion, the Base64 stage, Signature removal, and the configured iCard public key."),
      detailItem("Rollback after apparent success", "Check whether the URL_Notify handler returned anything other than exact OK or failed before durably accepting the message."),
      detailItem("Useful error groups", "Missing parameters, invalid signature, invalid MID, invalid parameters, pending transaction, expired transaction, invalid card, and request-integrity errors are documented in the 4.2 error appendix."),
    ]),
  ],
  "ipg-redirect-overview": [
    detailSection("Redirect Checkout Sequence", "Redirect is the standard hosted IPG 4.2 customer flow.", [
      detailItem("Create request", "Persist the order, construct the complete ordered request, sign it using the 4.2 algorithm, and submit the browser to IPG."),
      detailItem("Customer processing", "IPG displays the payment page, collects card data, and performs 3DS and financial processing."),
      detailItem("Backend result", "IPG sends the appropriate signed method to URL_Notify. Verify and acknowledge it before updating the final merchant order state."),
      detailItem("Browser result", "Use URL_OK and URL_Cancel to present the customer experience, but never use the browser return as the only payment confirmation."),
    ]),
  ],
  "ipg-modal-overview": [
    detailSection("Payment Modal Sequence and Events", "The 4.2 modal keeps the customer on the merchant page while IPG securely handles payment entry.", [
      detailItem("1. Request token", "Send the signed backend IPGPaymentToken request with the selected ModalType and verify the synchronous token response."),
      detailItem("2. Load the form", "Add a wrapper with id=ipg and load payment-modal.js from the correct environment using the returned token and classic or dark theme."),
      detailItem("3. Observe frontend events", "Handle ipg.formload.success, ipg.user.cancel, ipg.payment.success, ipg.user.close.on.success, ipg.payment.error, ipg.user.close.on.error, ipg.loadmodal.error, and ipg.user.close.on.loadmodal.error for customer experience only."),
      detailItem("4. Confirm asynchronously", "Use the signed asynchronous URL_Notify message as the financial result. Modal events do not replace backend notification processing."),
    ]),
  ],
  "ipg-business-models": shared42DetailSections.models,
  "ipg-protocol-changes": [
    detailSection("Moving From 4.2 to 4.5", "Treat migration as a protocol and operational change.", [
      detailItem("Rebuild signatures", "Replace the 4.2 ordered value-only concatenation and Base64-before-signing algorithm with the documented 4.5 canonical key-path algorithm."),
      detailItem("Replace notification handling", "Move from method-based POST notifications and exact OK response bodies to the 4.5 signed JSON callback model and acknowledgement rules."),
      detailItem("Remap methods and fields", "Review stored-card Token versus CardToken, recurring and wallet flows, implementation types, response properties, and business-model-specific backend methods."),
      detailItem("Re-certify every flow", "Repeat success, decline, cancellation, invalid signature, duplicate, timeout, rollback, modal, stored-card, recurring, reversal, refund, and status scenarios used by the merchant."),
    ]),
  ],
  "ipg-gambling-overview": shared42DetailSections.models,
  "ipg-v42-gambling-functions": shared42DetailSections.models,
  "ipg-financial-overview": shared42DetailSections.models,
  "ipg-v42-financial-functions": shared42DetailSections.models,
  "ipg-ecommerce-overview": shared42DetailSections.models,
  "ipg-v42-ecommerce-functions": shared42DetailSections.models,
};

function base42DetailsForPage(page) {
  if (page.subtitle === "Security & Signatures") return shared42DetailSections.security;
  if (page.subtitle === "Callbacks") return shared42DetailSections.callbacks;
  if (page.subtitle === "Implementation Types") return shared42DetailSections.implementation;
  if (page.subtitle === "API Methods" || page.subtitle === "Backend Methods") return shared42DetailSections.methods;
  if (page.subtitle === "Business Models" || page.subtitle === "Business Model") return shared42DetailSections.models;
  return shared42DetailSections.general;
}

function enrichVersion42Page(page, sectionId) {
  if (!page) return page;
  const detailSections = [
    ...(["ipg-modal-overview", "ipg-oct"].includes(sectionId) ? [] : base42DetailsForPage(page)),
    ...(section42DetailSections[sectionId] || []),
    ...(method42DetailSections[sectionId] || []),
  ];
  return {
    ...page,
    detailSections: detailSections.filter(
      (section, index) =>
        detailSections.findIndex((candidate) => candidate.title === section.title) === index
    ),
  };
}

function enrichVersion42Content(content) {
  return Object.fromEntries(
    Object.entries(content).map(([sectionId, page]) => [
      sectionId,
      enrichVersion42Page(page, sectionId),
    ])
  );
}

const shared45DetailSections = {
  general: [
    detailSection(
      "How This Section Fits the Integration",
      "Use this context before implementing individual methods.",
      [
        detailItem("Merchant backend responsibility", "The merchant backend creates signed requests, stores configuration and keys securely, correlates OrderID values, verifies signed responses, and processes callbacks."),
        detailItem("IPG responsibility", "IPG presents or supports the payment interface, validates the submitted request, communicates with payment providers and card schemes, and reports processing results."),
        detailItem("Cardholder responsibility", "The cardholder selects the payment method, enters or confirms payment data, completes any required 3DS challenge, and returns to the merchant experience."),
        detailItem("Reliable result channel", "Use the verified backend callback or signed backend response as the authoritative result. A browser redirect is primarily a customer-experience transition."),
      ]
    ),
    detailSection(
      "Operational Readiness",
      "Complete these checks before certification and production launch.",
      [
        detailItem("Environment configuration", "Keep Sandbox and Production MIDs, Originator values, endpoints, credentials, signing keys, callback URLs, and callback source-IP allowlists separate."),
        detailItem("Correlation and idempotency", "Persist OrderID before the first request and make callback and backend-operation handling idempotent so retries cannot create duplicate business actions."),
        detailItem("Observability", "Log method, OrderID, environment, timestamps, status codes, IPG transaction references, callback attempts, and verification results without logging card-sensitive data or private keys."),
        detailItem("Failure ownership", "Define who investigates invalid signatures, missing callbacks, timeouts, declines, payout issues, reversals, refunds, and reconciliation mismatches."),
      ]
    ),
  ],
  security: [
    detailSection(
      "Security Implementation",
      "TLS and digital signatures protect different parts of the communication.",
      [
        detailItem("TLS protects transport", "Use TLS 1.2 or later to protect data confidentiality while requests and responses travel between the merchant and IPG."),
        detailItem("Signatures protect the message", "Signatures protect integrity and authenticate the party that owns the corresponding private key. Do not treat successful TLS transport as proof that a message is valid."),
        detailItem("Private-key storage", "Generate and use signatures only on trusted backend systems. Store private keys in a protected key store or secrets manager and restrict access to the smallest required service scope."),
        detailItem("Public-key verification", "Use the configured iCard public key to verify signed responses and callbacks before any business state is changed."),
      ]
    ),
    detailSection(
      "Common Signature Failure Causes",
      "Most invalid-signature cases are caused by canonicalization differences.",
      [
        detailItem("Signature included in source data", "Remove the Signature parameter completely before canonicalization. Do not include it with an empty value."),
        detailItem("Incorrect normalization", "Lowercase keys, convert real Boolean values to 0 or 1, preserve empty values, index array elements from zero, and ignore empty arrays exactly as documented."),
        detailItem("Incorrect sorting or encoding", "Convert canonical strings to UTF-8, apply natural sorting, and join with semicolons without adding spaces, line breaks, or extra delimiters."),
        detailItem("Wrong key or environment", "Confirm that KeyIndex, KeyIndexResp, merchant private key, iCard public key, MID, and environment configuration belong to the same active setup."),
      ]
    ),
  ],
  callbacks: [
    detailSection(
      "Callback Processing Pipeline",
      "Process every callback through the same controlled pipeline.",
      [
        detailItem("1. Network acceptance", "Expose URL_Notify over HTTPS and allow only the documented callback source addresses for the active environment."),
        detailItem("2. Parse and verify", "Parse the JSON payload, extract Signature, canonicalize the remaining data, and verify it with the iCard public key."),
        detailItem("3. Apply idempotently", "Use OrderId, Payment status, Operation data, and provider references to update the merchant system exactly once, even when the same callback is delivered again."),
        detailItem("4. Acknowledge", "Return HTTP 200 OK only after the callback has been verified and durably accepted. Otherwise return the appropriate non-200 status and expect redelivery."),
      ]
    ),
    detailSection(
      "Callback Interpretation",
      "Read the callback as a structured event rather than checking only one field.",
      [
        detailItem("Payment object", "Use Payment to identify the merchant order, MID, payment type, interface, total amount, currency, and high-level payment status."),
        detailItem("Operation object", "Use Operation to understand the processing stage and detailed result, including authorization, 3DS, provider response, status code, and message."),
        detailItem("CardData and Customer", "Use these objects only when present. CardData is masked and may include StoreCard.CardToken when the customer stored a card."),
        detailItem("Errors array", "When merchant validation fails, inspect every Errors entry to identify the invalid field and correct the request before retrying."),
      ]
    ),
  ],
  implementation: [
    detailSection(
      "Implementation Responsibilities",
      "Understand where each part of the selected checkout experience runs.",
      [
        detailItem("Merchant frontend", "Displays the selected experience, initiates redirects or SDK flows, embeds the returned interface when applicable, and presents customer-facing status without deciding the final payment result."),
        detailItem("Merchant backend", "Creates signed API requests, protects credentials, verifies signed responses, receives callbacks, and updates merchant-side orders."),
        detailItem("IPG interface", "Collects or facilitates payment data, performs validation and 3DS processing, and coordinates payment execution with providers and schemes."),
        detailItem("Result handling", "Design customer return pages and callback processing as separate concerns. The return page provides UX continuity; the callback provides the authoritative backend event."),
      ]
    ),
    detailSection(
      "Choosing an Implementation Type",
      "Select the simplest supported implementation that satisfies the required customer experience.",
      [
        detailItem("Redirect checkout", "Choose Redirect when the merchant wants the simplest hosted checkout and can send the cardholder to the IPG payment page."),
        detailItem("Embedded checkout", "Choose Embedded when the payment interface must remain visually inside the merchant page through an iframe URL returned by IPG."),
        detailItem("Modal", "Choose Modal when checkout should open as an overlay on the merchant page after the backend obtains an IPGPaymentToken."),
        detailItem("Wallet JS SDK", "Choose the wallet SDK when Apple Pay or Google Pay availability, tokenized wallet data, domain verification, and browser-to-backend coordination are required."),
      ]
    ),
  ],
  methods: [
    detailSection(
      "Common Method Lifecycle",
      "Apply this lifecycle to every signed IPG 4.5 API or backend method.",
      [
        detailItem("Prepare", "Validate required fields, formats, currency and MID compatibility, business-model availability, and a unique persisted OrderID."),
        detailItem("Sign and send", "Canonicalize the complete request without Signature, sign with the merchant private key, append Signature, and send to the correct environment endpoint."),
        detailItem("Verify response", "Verify the response Signature before using Status, StatusMsg, URL, Token, Session, IPGTrnref, RRN, or other returned data."),
        detailItem("Complete the business flow", "Handle the customer interface or backend result, process callbacks where applicable, and use status, reversal, or refund methods only according to the documented flow."),
      ]
    ),
    detailSection(
      "Error and Timeout Handling",
      "Avoid duplicate financial operations when the result is uncertain.",
      [
        detailItem("Validation error", "Correct the invalid or missing request data before retrying. Re-sign the complete corrected request."),
        detailItem("Declined operation", "Record the decline status and message, preserve the transaction references, and do not treat a transport-level success as payment approval."),
        detailItem("Timeout or lost response", "Do not blindly resend financial operations. Use the documented status-check or reversal strategy for the method and business model."),
        detailItem("Duplicate protection", "Use OrderID and merchant-side idempotency controls to prevent retries, callbacks, or operator actions from applying the same business event twice."),
      ]
    ),
  ],
  models: [
    detailSection(
      "Business-Model Scope",
      "The configured business model controls available methods and expected operational flows.",
      [
        detailItem("Gambling", "Use supported deposit checkout flows, IPGOCT for gaming withdrawals, IPGGetTxnStatus for uncertain OCT results, and IPGReversal when a previously executed payment must be reversed."),
        detailItem("Financial Institution", "Use the shared payment methods where enabled, IPGFundsDisbursement for loan-to-card flows, IPGGetTxnStatus for uncertain disbursement results, and IPGReversal when required."),
        detailItem("E-commerce", "Use supported purchase and wallet flows, IPGRefund for post-payment refunds, and IPGReversal for payments that must be reversed before settlement."),
        detailItem("Do not mix model-only methods", "A method documented for one business model must not be assumed available for another. Confirm the enabled scope with iCard during integration setup."),
      ]
    ),
  ],
};

const method45DetailSections = {
  "ipg-purchase": [
    detailSection("IPGPurchase Usage and Processing", "IPGPurchase starts a customer-present checkout flow.", [
      detailItem("When to use", "Use for a new card payment through Redirect checkout and for Gambling wallet redirect flows when IPGPaymentContext is GooglePay or ApplePay."),
      detailItem("Processing sequence", "The merchant backend builds and signs the request, submits or redirects the cardholder to IPG, the cardholder completes checkout and any required 3DS step, and IPG sends the final event to URL_Notify."),
      detailItem("Success confirmation", "Do not confirm the order only because the customer reached URL_OK. Verify and process the signed callback whose Payment and Operation data indicate success."),
      detailItem("Cancellation and failure", "URL_Cancel returns the customer experience after cancellation, while declines and validation failures are represented through the callback result and detailed operation or error data."),
    ]),
  ],
  "ipg-3ds-stored": [
    detailSection("Stored-Card Purchase Usage and Processing", "This method performs a customer-present payment with a previously stored CardToken and full 3DS handling.", [
      detailItem("When to use", "Use when a CardToken was obtained from an earlier verified callback and the customer is actively making another payment."),
      detailItem("CardToken handling", "Treat CardToken as sensitive merchant data: store it securely, associate it with the correct customer, and never accept an arbitrary client-supplied token without authorization checks."),
      detailItem("Customer interaction", "The method opens an IPG interface so the customer can complete 3DS and, when VerifyCVC=1, confirm CVC."),
      detailItem("Final result", "Use the verified callback as the authoritative outcome and preserve OrderID and transaction references for support and later operations."),
    ]),
  ],
  "ipg-embedded-purchase": [
    detailSection("Embedded Purchase Flow", "Embedded checkout keeps the customer on the merchant page while IPG hosts the sensitive payment interface.", [
      detailItem("Bootstrap request", "The merchant backend sends IPGEmbeddedPayment with PaymentType=IPGPurchase and verifies the signed synchronous response."),
      detailItem("Create iframe", "Use the verified returned URL as the iframe src. Do not construct or modify the IPG iframe URL manually."),
      detailItem("Browser security", "Host the merchant page over HTTPS, use a stable iframe container, and do not attempt to read or manipulate sensitive content inside the IPG iframe."),
      detailItem("Result handling", "The iframe experience does not replace backend result processing. Use URL_Notify callback handling to update the order."),
    ]),
  ],
  "ipg-embedded-stored": [
    detailSection("Embedded Stored-Card Flow", "This flow combines an embedded interface with a stored CardToken and inline 3DS handling.", [
      detailItem("When to use", "Use when the merchant wants the customer to remain on-page while paying with a previously stored card."),
      detailItem("Required differences", "Set PaymentType=IPG3DSPurchaseWithStoredCard, send the authorized CardToken, and choose whether VerifyCVC is required."),
      detailItem("Security boundary", "Keep CardToken authorization and signed backend communication on the merchant server; the browser should only receive the verified iframe URL."),
      detailItem("Completion", "Treat the verified callback as the final payment event and handle repeated callback delivery idempotently."),
    ]),
  ],
  "ipg-payment-token-purchase": [
    detailSection("Modal Purchase Flow", "IPGPaymentToken creates the short-lived bootstrap token required by the payment modal.", [
      detailItem("Backend token request", "The merchant backend sends the signed payment data with ModalType=IPGPurchase and verifies the signed response before using Token."),
      detailItem("Create payment form", "Load the documented payment-modal.js integration and use the returned Token to open the IPG-controlled modal inside the merchant experience."),
      detailItem("Token lifecycle", "Use the token only for the intended order and modal launch. Do not persist it as a reusable payment credential."),
      detailItem("Final result", "Closing or completing the modal is not sufficient proof of success; process the verified URL_Notify callback."),
    ]),
  ],
  "ipg-payment-token-stored": [
    detailSection("Modal Stored-Card Flow", "This modal flow uses an existing CardToken and performs the required customer verification inline.", [
      detailItem("When to use", "Use when the customer selects a previously stored card and the merchant wants an overlay checkout experience."),
      detailItem("Required differences", "Set ModalType=IPG3DSPurchaseWithStoredCard, provide CardToken, and configure VerifyCVC according to the required flow."),
      detailItem("Authorization check", "Confirm that the stored token belongs to the authenticated merchant customer before requesting the payment token."),
      detailItem("Final result", "Verify and process the callback before updating the order, even when the modal reports completion to the browser."),
    ]),
  ],
  "ipg-token-provider-session": [
    detailSection("Apple Pay Session Flow", "IPGTokenProviderSession obtains the Apple Pay merchant session used by the browser SDK.", [
      detailItem("Prerequisites", "Serve the merchant page over HTTPS, use a valid TLS certificate, complete Apple domain verification, and configure the exact merchant domain."),
      detailItem("Browser-to-backend step", "The SDK sends ValidationURL and merchant context to the merchant backend. The backend must validate the request before contacting IPG."),
      detailItem("Backend-to-IPG step", "Send the signed IPGTokenProviderSession request and verify the signed response before returning Session data to the browser."),
      detailItem("Order correlation", "Preserve the OrderID and use the same order context when the Apple Pay authorization continues to IPGTokenizedCardPurchase."),
    ]),
  ],
  "ipg-tokenized-card-purchase": [
    detailSection("Tokenized Wallet Purchase Flow", "IPGTokenizedCardPurchase executes Apple Pay or Google Pay data received through the wallet SDK.", [
      detailItem("When to use", "Use for the full JS SDK wallet flow supported by the active business model. Gambling redirect wallet flows use IPGPurchase with IPGPaymentContext instead."),
      detailItem("Browser-to-backend trust", "Receive the tokenized wallet payload on the merchant backend, validate the order and amount from trusted server-side state, and do not trust client-supplied totals."),
      detailItem("Signed IPG request", "Send TokenizedCardProvider and TokenizedCard with the complete signed backend request, then verify the signed response."),
      detailItem("Result processing", "Correlate the signed response and callback with the original OrderID and handle retries or duplicate events idempotently."),
    ]),
  ],
  "ipg-oct": [
    detailSection("IPGOCT Usage and Processing", "IPGOCT is the Gambling model payout method for sending winnings to a cardholder card.", [
      detailItem("Correct method", "Every OCT request must send IPGmethod=IPGOCT. Do not reuse an IPGPurchase request bundle or include customer-facing purchase callback fields."),
      detailItem("OCT by PAN path", "Use CardToken as the documented card-destination reference and omit IPG_Trnref and Approval. The supplied method table does not define a raw PAN request property."),
      detailItem("TRN and Approval path", "Send both IPG_Trnref and Approval from the previously executed payment and omit CardToken."),
      detailItem("Shared validation", "For either path, send the valid MID, unique OrderID, amount, MID currency, valid recipient names, optional OutputFormat, and Signature as the last POST parameter."),
      detailItem("Response handling", "Verify Signature before using Status, StatusMsg, IPGTrnref, or IPGTrnrefOriginal. IPGTrnrefOriginal is available for OCT by TRN and Approval."),
      detailItem("Timeout handling", "Use IPGGetTxnStatus only when an OCT result is uncertain or timed out; do not blindly send another withdrawal."),
    ]),
  ],
  "ipg-funds-disbursement": [
    detailSection("Funds Disbursement Usage and Processing", "IPGFundsDisbursement is the Financial Institution model method for granting funds directly to a cardholder card.", [
      detailItem("When to use", "Use only for the approved Financial Institution loan-to-card or funds-disbursement business flow."),
      detailItem("Reference options", "Use original IPG_Trnref plus Approval or an authorized CardToken according to the configured disbursement scenario."),
      detailItem("Recipient and order data", "Validate recipient names, amount, currency, OrderID, and the card relationship before signing the request. OrderID may be up to the documented method-specific limit."),
      detailItem("Uncertain result", "Use IPGGetTxnStatus before retrying an uncertain disbursement and preserve IPGTrnref, IPGTrnrefOriginal, and RRN for reconciliation."),
    ]),
  ],
  "ipg-refund": [
    detailSection("Refund Usage and Processing", "IPGRefund returns funds for a previously executed E-commerce payment.", [
      detailItem("When to use", "Use only for the E-commerce refund flow after the original payment has been identified and the merchant has approved the refund."),
      detailItem("Original transaction reference", "Send the correct original IPG_Trnref and validate that refund amount and currency follow the merchant policy and original transaction context."),
      detailItem("Response parsing", "The documented refund response uses lowercase field names. Verify Signature and parse the response using the exact documented names."),
      detailItem("Merchant accounting", "Persist the refund OrderID, original transaction reference, amount, currency, status, and response for customer support and reconciliation."),
    ]),
  ],
  "ipg-reversal": [
    detailSection("Reversal Usage and Processing", "IPGReversal cancels a previously executed payment before settlement and is required for supported merchant flows.", [
      detailItem("When to use", "Use when an executed payment must be reversed before settlement or according to the integration's timeout and recovery procedure."),
      detailItem("Reference the correct transaction", "Send the original IPG_Trnref with the correct MID and OrderID. Do not reverse a transaction based only on browser state."),
      detailItem("Verify result", "Verify the signed response and store both IPGTrnref and IPGTrnrefOriginal when returned."),
      detailItem("Refund versus reversal", "Use reversal for the documented pre-settlement cancellation flow. Use IPGRefund only for the supported E-commerce post-payment refund flow."),
    ]),
  ],
  "ipg-get-status": [
    detailSection("Transaction Status Usage", "IPGGetTxnStatus resolves uncertain backend-operation outcomes for IPGOCT and IPGFundsDisbursement.", [
      detailItem("When to use", "Use after a timeout, lost response, or operational uncertainty for a previously submitted OCT or funds-disbursement OrderID."),
      detailItem("Do not use as a general payment poller", "This method is documented for the supported backend payout or disbursement operations, not as a replacement for normal callback processing."),
      detailItem("Success condition", "Treat the backend transaction as successful only when the documented transaction-status fields indicate success together."),
      detailItem("Follow-up decision", "Use the verified status result to decide whether to wait, investigate, reverse, or reconcile. Do not blindly repeat the original financial request."),
    ]),
  ],
};

const section45DetailSections = {
  "ipg-overview": [
    detailSection("End-to-End IPG Flow", "The shared architecture applies across all supported business models.", [
      detailItem("1. Scope", "Merchant and iCard agree the business model, methods, environments, MID configuration, currencies, wallet requirements, and testing scenarios."),
      detailItem("2. Initiate", "The merchant backend creates a valid signed request using the method that matches the selected checkout or backend operation."),
      detailItem("3. Process", "IPG validates the request and coordinates customer interaction, 3DS, payment provider, and card-scheme processing as applicable."),
      detailItem("4. Confirm and operate", "The merchant verifies responses and callbacks, updates its systems idempotently, and supports reversal, refund, status, and reconciliation procedures."),
    ]),
  ],
  "ipg-integration-steps": [
    detailSection("Integration Deliverables", "Each integration phase should produce a clear, reviewable outcome.", [
      detailItem("Technical scope", "Document selected methods, business model, expected customer journeys, callback URL, supported currencies, and backend-operation requirements."),
      detailItem("Sandbox evidence", "Provide completed scenarios with OrderID, transaction references, timestamps, results, and evidence that signatures and callbacks were handled correctly."),
      detailItem("Production readiness", "Confirm production keys, endpoints, MIDs, callback source allowlist, monitoring, alerting, support ownership, and rollback procedures."),
      detailItem("Go-live monitoring", "Closely monitor request errors, declines, invalid signatures, callback delivery, duplicate events, reversals, refunds, and reconciliation after launch."),
    ]),
  ],
  "ipg-http-post": [
    detailSection("HTTP POST Construction", "Build the request body deterministically before signing and sending.", [
      detailItem("Encoding", "Encode request parameters as application/x-www-form-urlencoded using UTF-8. Use ampersand separators and preserve the documented parameter values."),
      detailItem("Signature ordering", "Generate Signature from the canonicalized request data without Signature, then append Signature as the last request parameter."),
      detailItem("Endpoint selection", "Send Sandbox requests only to https://dev-ipg.icards.eu/sandbox/ and Production requests only to https://ipg.icard.com/."),
      detailItem("Transport logging", "Record endpoint environment, HTTP result, OrderID, method, and timing while masking credentials, signatures where required by policy, and customer-sensitive data."),
    ]),
  ],
  "ipg-data-types": [
    detailSection("Data Validation Rules", "Validate the documented type before signing because formatting changes affect both validation and Signature.", [
      detailItem("Numeric strings", "Preserve leading zeroes for N(n) fields and use a point as the decimal separator for Double(M,D)."),
      detailItem("Dates and times", "Use the exact documented ISO formats and ensure merchant systems agree on timezone handling where timestamps are exchanged."),
      detailItem("Encoded values", "Produce valid Base64, JSON, and XML values without accidental whitespace or character-set conversion."),
      detailItem("Length limits", "Enforce method-specific maximum lengths before signing to prevent rejected requests and ambiguous truncation."),
    ]),
  ],
  "ipg-redirect-overview": [
    detailSection("Redirect Checkout Flow", "Redirect checkout is the simplest hosted customer-payment experience.", [
      detailItem("Initiation", "The merchant creates the signed IPGPurchase or IPG3DSPurchaseWithStoredCard request and sends the cardholder to IPG."),
      detailItem("Customer processing", "IPG presents the payment interface and handles card input, stored-card verification, 3DS, and provider processing."),
      detailItem("Customer return", "IPG returns the browser to URL_OK or URL_Cancel according to the customer-facing flow."),
      detailItem("Backend confirmation", "The merchant confirms the final result only from the verified URL_Notify callback."),
    ]),
  ],
  "ipg-embedded-overview": [
    detailSection("Embedded Checkout Flow", "Embedded checkout uses an IPG-hosted interface inside the merchant page.", [
      detailItem("Create interface", "The merchant backend requests IPGEmbeddedPayment and verifies the signed response containing the iframe URL."),
      detailItem("Embed URL", "The merchant frontend places the verified URL into an iframe on an HTTPS page."),
      detailItem("Maintain boundaries", "IPG owns sensitive payment collection inside the iframe; merchant code should not access or imitate that content."),
      detailItem("Confirm result", "Use callback processing for the final payment result and make the handler idempotent."),
    ]),
  ],
  "ipg-modal-overview": [
    detailSection("Modal Checkout Flow", "Modal checkout opens an IPG payment experience over the merchant page.", [
      detailItem("Obtain token", "The merchant backend sends IPGPaymentToken and verifies the signed token response."),
      detailItem("Open modal", "The merchant frontend uses the documented wrapper and payment-modal.js integration with the returned token."),
      detailItem("Handle customer experience", "Support modal completion, cancellation, and closure without treating frontend state as final payment confirmation."),
      detailItem("Confirm result", "Process the verified URL_Notify callback before fulfilling the order."),
    ]),
  ],
  "ipg-wallet-overview": [
    detailSection("Wallet Flow Selection", "Wallet implementation differs by business model and provider.", [
      detailItem("Gambling redirect wallets", "Google Pay and Apple Pay may use SDK availability checks followed by IPGPurchase with the appropriate IPGPaymentContext."),
      detailItem("Full JS SDK wallets", "Financial Institution and E-commerce use the supported Apple Pay or Google Pay SDK flow with tokenized backend purchase processing."),
      detailItem("Apple-specific session", "Apple Pay requires domain verification and IPGTokenProviderSession before the final tokenized-card purchase."),
      detailItem("Server-side validation", "Always validate amount, currency, OrderID, customer, and provider on the merchant backend before sending the signed IPG request."),
    ]),
  ],
  "ipg-apple-pay": [
    detailSection("Apple Pay Implementation Detail", "Apple Pay requires a secure merchant domain and coordinated browser/backend processing.", [
      detailItem("Environment configuration", "Use the environment-specific iCard SDK, HTTPS, valid TLS, and the verified merchant domain configured for Apple Pay."),
      detailItem("Availability", "Show Apple Pay only when the SDK reports availability on the current supported device and browser."),
      detailItem("Session and payment", "For the full SDK flow, obtain the Apple session through IPGTokenProviderSession, then send the authorized wallet data through IPGTokenizedCardPurchase."),
      detailItem("Gambling alternative", "Where documented for Gambling, Apple Pay redirect uses IPGPurchase with IPGPaymentContext=ApplePay instead of the full tokenized-card flow."),
    ]),
  ],
  "ipg-google-pay": [
    detailSection("Google Pay Implementation Detail", "Google Pay uses SDK availability checks and the business-model-supported purchase path.", [
      detailItem("Availability", "Display the Google Pay option only after the SDK confirms it is ready on the current device and browser."),
      detailItem("Trusted order data", "Calculate and validate amount, currency, OrderID, and customer context on the backend rather than trusting browser-provided values."),
      detailItem("Full SDK flow", "For supported Financial Institution and E-commerce flows, pass authorized tokenized wallet data to IPGTokenizedCardPurchase."),
      detailItem("Gambling alternative", "Where documented for Gambling, Google Pay redirect uses IPGPurchase with IPGPaymentContext=GooglePay."),
    ]),
  ],
  "ipg-wallet-sdk": [
    detailSection("JS SDK Integration Detail", "The SDK coordinates wallet availability and customer interaction but does not replace merchant backend security.", [
      detailItem("Load the correct script", "Use the Sandbox SDK during integration and the Production SDK only after production configuration and certification are complete."),
      detailItem("Configure exact merchant data", "Set MID, merchant name, amount, currency, environment, container IDs, merchant domain, and order context from trusted configuration."),
      detailItem("Backend endpoint", "The configured processing endpoint must validate browser requests and send signed requests to IPG without exposing private keys."),
      detailItem("Browser compatibility", "Handle unsupported devices, unavailable wallets, customer cancellation, and SDK errors with a clear fallback payment option."),
    ]),
  ],
  "ipg-business-models": shared45DetailSections.models,
  "ipg-feature-matrix": shared45DetailSections.models,
  "ipg-payment-availability": shared45DetailSections.models,
  "ipg-key-field-differences": shared45DetailSections.models,
  "ipg-protocol-changes": [
    detailSection("Migration Focus", "Treat protocol 4.5 as a behavioral migration, not only a version-number change.", [
      detailItem("Rebuild signing and verification", "Implement the 4.5 canonicalization and RSA-SHA256 behavior for all requests, responses, and callbacks."),
      detailItem("Replace notification assumptions", "Use signed JSON callbacks to URL_Notify and HTTP 200 acknowledgement instead of older notification-method behavior."),
      detailItem("Update field and method mappings", "Review CardToken naming, method availability, callback objects, response fields, and model-specific backend operations."),
      detailItem("Re-certify end to end", "Repeat Sandbox scenarios for every used flow, including declines, invalid data, callback retries, timeouts, and backend recovery."),
    ]),
  ],
  "ipg-gambling-overview": [
    detailSection("Gambling Processing Model", "The Gambling model combines customer deposits with controlled gaming withdrawals.", [
      detailItem("Deposits", "Use the selected redirect, embedded, modal, or supported wallet deposit flow and confirm the result through the verified callback."),
      detailItem("Withdrawals", "Use IPGOCT only after merchant-side player and withdrawal validation. Preserve transaction references for status and reconciliation."),
      detailItem("Uncertain OCT", "Use IPGGetTxnStatus before retrying or taking another financial action when an OCT response is missing or uncertain."),
      detailItem("Recovery", "Implement IPGReversal and define operational ownership for failed deposits, uncertain withdrawals, duplicate prevention, and reconciliation."),
    ]),
  ],
  "ipg-gambling-functions": shared45DetailSections.models,
  "ipg-financial-overview": [
    detailSection("Financial Institution Processing Model", "The model combines supported customer payments with controlled funds disbursement.", [
      detailItem("Disbursement authorization", "Validate the approved loan or funds-disbursement decision, recipient, destination card relationship, amount, and currency before calling IPGFundsDisbursement."),
      detailItem("Status and recovery", "Use IPGGetTxnStatus for uncertain disbursement outcomes and IPGReversal according to the documented recovery flow."),
      detailItem("References", "Persist OrderID, IPGTrnref, IPGTrnrefOriginal, RRN, status, and timestamps for audit, customer support, and reconciliation."),
      detailItem("Separation of duties", "Define who can authorize a disbursement, execute it, investigate exceptions, and reconcile the result."),
    ]),
  ],
  "ipg-financial-functions": shared45DetailSections.models,
  "ipg-ecommerce-overview": [
    detailSection("E-commerce Processing Model", "The model supports customer purchases and post-payment merchant operations.", [
      detailItem("Purchases", "Choose the appropriate checkout or wallet experience and use the verified callback as the final order-payment event."),
      detailItem("Reversal", "Use IPGReversal for the documented pre-settlement cancellation or recovery scenario."),
      detailItem("Refund", "Use IPGRefund for an approved post-payment refund and preserve the original IPG transaction reference."),
      detailItem("Fulfilment control", "Do not fulfil an order from redirect state alone. Fulfil only after the verified callback and merchant-side fraud or order checks succeed."),
    ]),
  ],
  "ipg-ecommerce-functions": shared45DetailSections.models,
};

function base45DetailsForPage(page) {
  if (page.subtitle === "Security & Signatures") return shared45DetailSections.security;
  if (page.subtitle === "Callbacks") return shared45DetailSections.callbacks;
  if (page.subtitle === "Implementation Types" || page.subtitle === "Wallet Deposits") return shared45DetailSections.implementation;
  if (page.subtitle === "API Methods" || page.subtitle === "Backend Methods") return shared45DetailSections.methods;
  if (page.subtitle === "Business Models" || page.subtitle === "Business Model") return shared45DetailSections.models;
  return shared45DetailSections.general;
}

function enrichVersion45Page(page, sectionId) {
  if (!page) return page;
  const specific = [
    ...(section45DetailSections[sectionId] || []),
    ...(method45DetailSections[sectionId] || []),
  ];
  return {
    ...page,
    detailSections: [
      ...(["ipg-modal-overview", "ipg-oct"].includes(sectionId) ? [] : base45DetailsForPage(page)),
      ...specific,
    ],
  };
}

function enrichVersion45Content(content) {
  return Object.fromEntries(
    Object.entries(content).map(([sectionId, page]) => [
      sectionId,
      enrichVersion45Page(page, sectionId),
    ])
  );
}

const detailedIpG45Content = enrichVersion45Content(ipgContent);
const detailedGambling45Content = enrichVersion45Content(gamblingContent);
const detailedFinancial45Content = enrichVersion45Content(financialInstitutionContent);
const detailedEcommerce45Content = enrichVersion45Content(ecommerceContent);
const detailedIpG42Content = enrichVersion42Content(v42Content);
const detailedGambling42Content = enrichVersion42Content(v42GamblingContent);
const detailedFinancial42Content = enrichVersion42Content(v42FinancialInstitutionContent);
const detailedEcommerce42Content = enrichVersion42Content(v42EcommerceContent);

const versionedReference = (menu, content, summary) => ({
  menu,
  content,
  summary,
});

export const ipgBusinessModels = [
  {
    id: "all",
    label: "All business models",
    status: "Default",
    description: "Full IPG reference with all model differences visible.",
  },
  {
    id: "gambling",
    label: "Gambling",
    status: "Focused",
    description: "Focused Gambling reference with only applicable IPG functions.",
  },
  {
    id: "financial-institution",
    label: "Financial institution",
    status: "Focused",
    description: "Focused Financial Institution reference and payout methods.",
  },
  {
    id: "e-commerce",
    label: "E-commerce",
    status: "Focused",
    description: "Focused ECommerce reference and refund methods.",
  },
];

export const ipgBusinessModelDocuments = {
  all: {
    id: "all",
    label: "All business models",
    defaultVersion: "4.5",
    defaultSection: "ipg-overview",
    versions: {
      "4.2": versionedReference(v42Menu, detailedIpG42Content, ipgVersionDocuments["4.2"].summary),
      "4.5": versionedReference(
        ipgMenu,
        detailedIpG45Content,
        enrichVersion45Page(ipgVersionDocuments["4.5"].summary, "ipg-version-summary")
      ),
    },
  },
  gambling: {
    id: "gambling",
    label: "Gambling",
    defaultVersion: "4.5",
    defaultSection: "ipg-gambling-overview",
    summaries: {
      "4.2": scopedVersionSummary("Gambling", "4.2", ["BM Gambling"]),
      "4.5": gamblingVersion45Summary,
    },
    versions: {
      "4.2": versionedReference(
        v42GamblingMenu,
        detailedGambling42Content,
        scopedVersionSummary("Gambling", "4.2", ["BM Gambling"])
      ),
      "4.5": versionedReference(
        gamblingMenu,
        detailedGambling45Content,
        enrichVersion45Page(gamblingVersion45Summary, "ipg-gambling-overview")
      ),
    },
  },
  "financial-institution": {
    id: "financial-institution",
    label: "Financial institution",
    defaultVersion: "4.5",
    defaultSection: "ipg-financial-overview",
    summaries: {
      "4.2": scopedVersionSummary("Financial Institution", "4.2", ["BM Financial Institution"]),
      "4.5": scopedVersionSummary("Financial Institution", "4.5", ["BM Financial Institution"]),
    },
    versions: {
      "4.2": versionedReference(
        v42FinancialInstitutionMenu,
        detailedFinancial42Content,
        scopedVersionSummary("Financial Institution", "4.2", ["BM Financial Institution"])
      ),
      "4.5": versionedReference(
        financialInstitutionMenu,
        detailedFinancial45Content,
        enrichVersion45Page(
          scopedVersionSummary("Financial Institution", "4.5", ["BM Financial Institution"]),
          "ipg-financial-overview"
        )
      ),
    },
  },
  "e-commerce": {
    id: "e-commerce",
    label: "E-commerce",
    defaultVersion: "4.5",
    defaultSection: "ipg-ecommerce-overview",
    summaries: {
      "4.2": scopedVersionSummary("ECommerce", "4.2", ["BM ECommerce"]),
      "4.5": scopedVersionSummary("ECommerce", "4.5", ["BM ECommerce"]),
    },
    versions: {
      "4.2": versionedReference(
        v42EcommerceMenu,
        detailedEcommerce42Content,
        scopedVersionSummary("ECommerce", "4.2", ["BM ECommerce"])
      ),
      "4.5": versionedReference(
        ecommerceMenu,
        detailedEcommerce45Content,
        enrichVersion45Page(
          scopedVersionSummary("ECommerce", "4.5", ["BM ECommerce"]),
          "ipg-ecommerce-overview"
        )
      ),
    },
  },
};
