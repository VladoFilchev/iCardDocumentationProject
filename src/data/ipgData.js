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
const octRequestFields = [
  f("IPGmethod", "IPGOCT", "String", "Mandatory", "Fixed value: IPGOCT."),
  ...backendBaseFields,
  f("OrderID", "610F0A8D-7210-...", "String(50)", "Mandatory", "Unique order identifier for this withdrawal."),
  f("IPG_Trnref", "20250602110038002328", "String", "Conditional", "Mandatory for OCT by TRN plus Approval. IPG transaction reference of the original purchase."),
  f("Approval", "123456", "String", "Conditional", "Mandatory for OCT by TRN plus Approval. Approval code from original transaction."),
  f("CardToken", "40B1B011C4A21EA6...", "String", "Conditional", "Mandatory for OCT by CardToken. Use instead of IPG_Trnref plus Approval."),
  f("Amount", "23.45", "Double", "Mandatory", "Withdrawal amount."),
  f("Currency", "978", "N(3)", "Mandatory", "ISO numeric currency code."),
  f("RecipientFirstName", "John", "String(35)", "Mandatory", "Recipient first name. Cannot be all spaces, zeroes, numerics, or question marks."),
  f("RecipientLastName", "Smith", "String(35)", "Mandatory", "Recipient last name. Same restrictions as RecipientFirstName."),
  f("OutputFormat", "json", "String", "Optional", "xml by default, or json."),
  signatureField,
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
    ["1", "Accept and verify the callback", "Accept callbacks only from payment platform IP addresses provided by iCard technical support. Validate the callback sender and data integrity by verifying the Signature included in every callback."],
    ["2", "Confirm callback receipt", "Return a synchronous HTTP response. Use 200 OK when the callback is valid and accepted. Use an error status that matches the error type when processing fails."],
    ["3", "Perform the required actions", "For prescriptive callbacks, perform the actions stated as required. For informational callbacks, perform the actions that match the web service operation, such as customer notification."],
  ]
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
    ["CardToken parameter name (4.5)", "CardToken, renamed from Token in v4.3", "CardToken, renamed from Token in v4.3", "CardToken, renamed from Token in v4.3"],
    ["Callback StoreCard.CardToken description", "Token for subsequent payments when customer saves card", "Token for subsequent payments when customer saves card", "Token used in IPG3DSPurchaseWithStoredCard"],
    ["Google Pay IPGTokenizedCardPurchase availability", "Not applicable; uses redirect", "Full JS SDK flow required", "Full JS SDK flow required"],
    ["Apple Pay IPGTokenProviderSession availability", "Not applicable; uses redirect", "Required for JS SDK flow", "Required for JS SDK flow"],
    ["IPGGetTxnStatus use case", "For IPGOCT", "For IPGFundsDisbursement", "Not applicable"],
  ]
);
const protocolChangesTable = table(
  "Protocol 4.3 to 4.5 Changes",
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
        "The main documentation sections in this explorer describe the current 4.5 integration model. Use this final page as the version-specific summary for 4.2 integrations.",
        "If a merchant is still on 4.2, confirm the exact enabled protocol with iCard before implementation. The key migration risks are request signing, callback confirmation, redirect result handling, and renamed token fields.",
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
  "4.3": {
    id: "4.3",
    label: "Protocol 4.3",
    status: "Legacy",
    description: "Legacy integrations should review the 4.3 to 4.5 differences before migration.",
    summary: {
      title: "IPG 4.3 Summary",
      subtitle: "Version Summary",
      description:
        "Summary page for clients integrating against IPG 4.3 or migrating from 4.3 to the current 4.5 reference.",
      facts: ["Legacy version", "Detailed 4.3 to 4.5 differences", "Migration checklist"],
      body: [
        "The main documentation sections in this explorer describe the current 4.5 integration model. Use this final page as the version-specific summary for 4.3 integrations.",
        "The largest changes from 4.3 to 4.5 are the new signing algorithm, JSON callbacks replacing notify methods, redirect confirmation behavior, and the Token to CardToken rename.",
      ],
      tables: [
        table(
          "Key Differences: 4.3 to 4.5",
          ["Area", "4.3 behavior", "4.5 behavior", "Integration impact"],
          [
            ["Signature", "Older signing algorithm.", "RSA-SHA256 canonicalization with natural sort order.", "Update request signing and response/callback verification helpers."],
            ["Notifications", "Notify methods were used.", "JSON callbacks to URL_Notify replace notify methods.", "Implement signed JSON callback handling and persistence."],
            ["Missed notification behavior", "Missed notification could trigger reversal behavior.", "IPG retries callbacks until HTTP 200 OK is received, up to 53 attempts.", "Return the correct HTTP status and make callback processing idempotent."],
            ["Redirect result", "Redirect behavior could include result data in older flows.", "URL_OK and URL_Cancel redirects use GET and send no payload.", "Do not use browser redirect data as payment confirmation."],
            ["Token encryption", "Token encryption was required in stored-card, modal, and payout-related methods.", "Token encryption requirement is removed.", "Simplify token handling but keep secure storage controls."],
            ["CartItems", "CartItems could be required.", "CartItems requirement is removed from all methods.", "Remove CartItems dependency from request builders."],
            ["FieldsOrder", "Backend responses could include FieldsOrder.", "FieldsOrder is eliminated from backend method responses.", "Do not depend on response ordering metadata."],
            ["PostResultAction", "Not available in the same form.", "New redirect field with Redirect or CloseWindow values.", "Choose browser behavior explicitly for redirect implementations."],
            ["Embedded checkout", "Widget integrations existed.", "Widget integrations are removed; use IPGEmbeddedPayment.", "Migrate widget-style integrations to embedded checkout."],
            ["Stored-card purchase", "Billing address requirements were stricter.", "Billing address fields are no longer mandatory for IPG3DSPurchaseWithStoredCard.", "Review validation rules and remove unnecessary blockers."],
            ["IPGReversal", "Older request shape.", "OrderID and MID are added.", "Include OrderID and MID in reversal requests."],
            ["OrderID length", "Older model-specific lengths may differ.", "50 characters except IPGFundsDisbursement in BM CI, which allows 255.", "Validate OrderID length per method and business model."],
            ["Stored card token parameter", "Token.", "CardToken.", "Rename parameters and update callback/token storage mapping."],
            ["Payout responses", "Older response parameter set.", "IPGOCT and IPGFundsDisbursement response parameters changed and new fields were added.", "Update response parsers and reconciliation mapping."],
            ["Error codes", "Older error code catalog.", "New error codes and messages added.", "Refresh error handling and merchant-facing diagnostics."],
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
      { id: "ipg-protocol-changes", label: "4.3 to 4.5 changes", type: "schema" },
    ],
  },
];
export const ipgContent = {
  "ipg-overview": {
    title: "iCard IPG API",
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
    ],
    resources: [resources.sandboxEndpoint, resources.productionEndpoint],
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
    ],
    resources: [resources.productionSignatureGenerator],
    request: `IPGmethod=IPGPurchase
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
    response: `amount:1.00;bannerindex:1;boolexample:1;currency:975;customeridentifier:SZ-1868;customerip:127.0.0.1;emptyexample:;ipgmethod:IPGPurchase;ipgversion:4.5;keyindex:1;keyindexresp:1;language:en;mid:000000000000113;midname:IPG TEST 4.5;orderid:8A540554-1551-4533-B246-42CAD55EE8DE;originator:33`,
    example: `Initial data includes request parameters and an empty placeholder for Signature.
Before signing, remove the Signature parameter completely.

Lowercase keys and convert values into canonical strings:
ipgmethod:IPGPurchase
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
emptyexample:

Natural sorted order:
amount:1.00
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
originator:33

String to sign:
amount:1.00;bannerindex:1;boolexample:1;currency:975;customeridentifier:SZ-1868;customerip:127.0.0.1;emptyexample:;ipgmethod:IPGPurchase;ipgversion:4.5;keyindex:1;keyindexresp:1;language:en;mid:000000000000113;midname:IPG TEST 4.5;orderid:8A540554-1551-4533-B246-42CAD55EE8DE;originator:33

PHP generation:
$privateKey = openssl_get_privatekey($privateKeyString);
openssl_sign($dataToSign, $signature, $privateKey, OPENSSL_ALGO_SHA256);
$base64Signature = base64_encode($signature);

C# generation:
var privateCert = File.ReadAllText(privateKeyString);
var key = RSA.Create();
key.ImportFromPem(privateCert.ToCharArray());
var sha = SHA256.Create();
var signature = key.SignHash(sha.ComputeHash(Encoding.UTF8.GetBytes(dataToSign)), HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
var base64Signature = Convert.ToBase64String(signature);

Final Signature value:
PNYhiEtXvwTB2ixMID+hYuJIc7+VUlYcQzyH9xXTSGm2K7NiSNBe9oYeyv0Bi0e==

Verification follows the same canonicalization. Remove Signature from the callback or response body, lowercase and flatten the remaining JSON fields, sort naturally, join with semicolons, then verify the decoded signature with the iCard public key.`,
  },
  "ipg-callbacks": {
    title: "Callbacks",
    subtitle: "Callbacks",
    description:
      "A callback is a system message sent from the IPG API payment platform to the merchant web service.",
    facts: ["HTTP POST", "URL_Notify", "Verify Signature", "Respond HTTP 200 OK"],
    body: [
      "Callbacks contain information about a specific event in the payment platform that usually takes place while processing a payment or storing customer payment data.",
      "The callback is the reliable backend channel for payment outcome and stored-card information. Browser redirects should not be treated as settlement confirmation.",
      "Every callback must be accepted only from the payment platform IP addresses provided by iCard technical support and must be verified by checking the included Signature.",
    ],
    tables: [callbackHandlingStepsTable],
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
    ],
    tables: [callbackTroubleshootingTable],
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
      "Modal checkout obtains a token through IPGPaymentToken and loads payment-modal.js on the merchant page.",
    facts: ["IPGPaymentToken", "payment-modal.js", "classic or dark theme", "URL_Notify remains required"],
    availability: allBusinessModels,
    body: [
      "The modal changes the presentation of checkout, but backend confirmation still depends on signed URL_Notify callbacks.",
      "The token returned by IPGPaymentToken is passed to payment-modal.js together with the selected theme.",
    ],
    resources: [resources.modalWorkflow, resources.modalVisualization],
    request: `<div id="ipg"></div>
<script>
function loadModal() {
  const src = _DOMAIN_ + "js/payment-modal.js?token=" + _TOKEN_ + "&theme=" + _THEME_;
  const script = document.createElement("script");
  script.src = src;
  script.id = "ipg-io-js";
  script.async = "async";
  document.querySelector("body").appendChild(script);
}
</script>`,
    response: `_DOMAIN_: https://ipg.icard.com/ or https://dev-ipg.icards.eu/sandbox/
_THEME_: classic or dark
_TOKEN_: value from IPGPaymentToken response`,
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
MIDName=My Web Shop
Amount=23.45
Currency=978
OrderID=20210916999999
CardToken=40B1B011C4A21EA6...
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
      "Backend request that obtains a payment URL for embedding as an iframe. The merchant uses the returned URL as the iframe src.",
    facts: ["PaymentType=IPGPurchase", "Returns iframe URL", "Verify response signature", "Callback has no Signature field"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "Request Parameters", fields: embeddedPaymentFields },
      { title: "Response Parameters", fields: embeddedResponseFields },
    ],
    request: `IPGmethod=IPGEmbeddedPayment
PaymentType=IPGPurchase
Theme=Themename
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
OutputFormat=json
Originator=100
MID=000000000000123
Amount=23.45
Currency=978
CustomerIP=127.0.0.1
OrderID=47A11480-B3AA-...
URL_Notify=https://site/notify
Email=customer@site.com
MobileNumber=+359811222111
Signature=<base64-signature>`,
    response: `IPGmethod=IPGEmbeddedPayment
OrderID=47A11480-...
Status=0
StatusMsg=Success
URL=https://dev-ipg...
Signature=<base64-signature>`,
  },
  "ipg-embedded-stored": {
    title: "IPGEmbeddedPayment - Stored Card",
    subtitle: "API Methods",
    description:
      "Same as IPGEmbeddedPayment for IPGPurchase, but uses a stored CardToken and handles 3DS verification inline.",
    facts: ["PaymentType=IPG3DSPurchaseWithStoredCard", "CardToken required", "VerifyCVC optional", "Response same as 5.3"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "Different Parameters vs IPGPurchase", fields: [
        f("PaymentType", "IPG3DSPurchaseWithStoredCard", "String", "Mandatory", "Must be IPG3DSPurchaseWithStoredCard."),
        f("CardToken", "D747458899D...FC43D5", "String", "Mandatory", "Stored card token."),
        f("VerifyCVC", "1", "N(1)", "Optional", "If 1, customer must enter CVC."),
      ] },
      { title: "Response Parameters", fields: embeddedResponseFields },
    ],
    notes: ["All other request parameters are identical to IPGEmbeddedPayment with PaymentType=IPGPurchase."],
  },
  "ipg-payment-token-purchase": {
    title: "IPGPaymentToken - IPGPurchase",
    subtitle: "API Methods",
    description:
      "Backend request to obtain a token for the Modal implementation. The merchant loads payment-modal.js with the returned token.",
    facts: ["ModalType=IPGPurchase", "Token bootstrap", "OutputFormat mandatory", "URL_Notify required"],
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
MIDName=My Web Shop
Amount=23.45
Currency=978
CustomerIP=127.0.0.1
OrderID=60EC4A03-...
Email=customer@site.com
URL_Notify=https://site/notify
MobileNumber=+359811222111
Signature=<base64-signature>`,
    response: `IPGmethod=IPGPaymentToken
OrderID=60EC4A03-...
Status=0
StatusMsg=Success
Token=_TOKEN_
Signature=<base64-signature>`,
  },
  "ipg-payment-token-stored": {
    title: "IPGPaymentToken - Stored Card",
    subtitle: "API Methods",
    description:
      "Same as IPGPaymentToken for IPGPurchase, but uses a stored card token and handles 3DS inline in the modal.",
    facts: ["ModalType=IPG3DSPurchaseWithStoredCard", "CardToken required", "VerifyCVC optional"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "Different Parameters vs IPGPurchase", fields: [
        f("ModalType", "IPG3DSPurchaseWithStoredCard", "String", "Mandatory", "Must be IPG3DSPurchaseWithStoredCard."),
        f("CardToken", "40B1B011C4A21EA6...", "String", "Mandatory", "Stored card token."),
        f("VerifyCVC", "1", "N(1)", "Optional", "If 1, customer confirms CVC."),
      ] },
      { title: "Response Parameters", fields: paymentTokenResponseFields },
    ],
    resources: [resources.modalWorkflow, resources.modalVisualization],
    notes: ["All other request parameters are identical to IPGPaymentToken with ModalType=IPGPurchase."],
  },
  "ipg-token-provider-session": {
    title: "IPGTokenProviderSession",
    subtitle: "API Methods",
    description:
      "Initiates an Apple Pay session. The JS SDK sends data to the merchant backend, which sends a signed request to IPG.",
    facts: ["Apple Pay session", "Browser -> backend -> IPG", "Domain verification required", "Verify before browser response"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "JS SDK Request (Browser to Merchant Backend)", fields: tokenProviderJsFields },
      { title: "Backend Request (Merchant Backend to IPG)", fields: tokenProviderBackendFields },
      { title: "Response", fields: tokenProviderResponseFields },
    ],
    resources: [resources.walletSdk],
    media: [media.appleMobileButtons, media.appleSdkRedirect],
    request: `IPGmethod=IPGTokenProviderSession
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
OutputFormat=json
MID=000000000000123
OrderID=60EC4A03-...
MerchantUrl=dev-ipg.icards.eu
ValidationURL=https://apple-paygateway...
DisplayName=My Store
TokenizedCardProvider=Apple
Signature=<base64-signature>`,
    response: `IPGmethod=IPGTokenProviderSession
OrderID=F989C51B-...
Status=0
StatusMsg=Success
Session=<apple-pay-session-data>
Signature=<base64-signature>`,
  },
  "ipg-tokenized-card-purchase": {
    title: "IPGTokenizedCardPurchase",
    subtitle: "API Methods",
    description:
      "Processes a payment using a tokenized card from Apple Pay or Google Pay.",
    facts: ["Apple Pay", "Google Pay", "TokenizedCardProvider", "Signed backend request"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "JS SDK Request (Browser to Merchant Backend)", fields: tokenizedJsFields },
      { title: "Backend Request (Merchant Backend to IPG)", fields: tokenizedBackendFields },
      { title: "Response", fields: tokenizedResponseFields },
    ],
    resources: [resources.walletSdk],
    media: [
      media.appleMobileButtons,
      media.googleMobileButtons,
      media.appleSdkRedirect,
      media.googleSdkRedirect,
    ],
    request: `IPGmethod=IPGTokenizedCardPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
OutputFormat=json
MID=000000000000123
OrderID=60EC4A03-...
Email=customer@site.com
CustomerIdentifier=1234
Amount=10.48
Currency=978
URL_Notify=https://site/notify
TokenizedCardProvider=Apple
TokenizedCard=<encrypted-card-data>
Signature=<base64-signature>`,
    response: `IPGmethod=IPGTokenizedCardPurchase
OrderID=F989C51B-...
Status=0
StatusMsg=Success
Signature=<base64-signature>`,
  },
  "ipg-oct": {
    title: "IPGOCT",
    subtitle: "Backend Methods",
    description:
      "Gaming Withdrawal method. Sends funds to a cardholder card by original transaction reference plus approval, or by stored CardToken.",
    facts: ["Gaming Withdrawal", "Original Credit Transaction", "TRN+Approval or CardToken", "Server-to-server"],
    availability: availability(true, false, false),
    fieldSections: [
      { title: "Request Parameters", fields: octRequestFields },
      { title: "Response", fields: octResponseFields },
    ],
    request: `IPGmethod=IPGOCT
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-...
IPG_Trnref=20250602110038002328
Approval=123456
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    response: `IPGmethod=IPGOCT
OrderID=610F0A8D-...
IPGTrnref=20250602110038002328
IPGTrnrefOriginal=20250602110038002328
Status=0
StatusMsg=Success
Signature=<base64-signature>`,
  },
  "ipg-funds-disbursement": {
    title: "IPGFundsDisbursement",
    subtitle: "Backend Methods",
    description:
      "Credit Institution method for granting loans directly to a cardholder card by original transaction reference plus approval, or by stored CardToken.",
    facts: ["Loan disbursement", "Funds Disbursement", "RRN in response", "OrderID up to 255 chars"],
    availability: availability(false, true, false),
    fieldSections: [
      { title: "Request Parameters", fields: fundsDisbursementRequestFields },
      { title: "Response", fields: fundsDisbursementResponseFields },
    ],
    request: `IPGmethod=IPGFundsDisbursement
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-...
CardToken=40B1B011C4A21EA6...
Amount=23.45
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    response: `IPGmethod=IPGFundsDisbursement
OrderID=610F0A8D-...
IPGTrnref=20250602110038002328
RRN=602420389981
Status=0
StatusMsg=Success
Signature=<base64-signature>`,
  },
  "ipg-refund": {
    title: "IPGRefund",
    subtitle: "Backend Methods",
    description:
      "Initiates a refund for a previously executed payment in e-commerce scenarios.",
    facts: ["BM ECommerce only", "Original IPG_Trnref required", "Email required", "Lowercase response fields"],
    availability: availability(false, false, true),
    fieldSections: [
      { title: "Request Parameters", fields: refundRequestFields },
      { title: "Response", fields: refundResponseFields },
    ],
    request: `IPGmethod=IPGRefund
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=DB183FF5-8AF8-...
IPG_Trnref=20250416064251147276
Amount=23.45
Currency=978
Email=customer@site.com
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGRefund
trnref=20250416064251147276
amount=1
currency=978
status=0
status_msg=Success
Signature=<base64-signature>`,
  },
  "ipg-reversal": {
    title: "IPGReversal",
    subtitle: "Backend Methods",
    description:
      "Cancels a previously executed payment before settlement. Mandatory for all merchants on all business models.",
    facts: ["All business models", "Mandatory", "OrderID and MID required in 4.5", "Before settlement"],
    availability: allBusinessModels,
    fieldSections: [
      { title: "Request Parameters", fields: reversalRequestFields },
      { title: "Response", fields: reversalResponseFields },
    ],
    request: `IPGmethod=IPGReversal
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
OutputFormat=json
OrderID=60EC4A03-0AC1-...
MID=000000000000123
IPG_Trnref=20250417083627362872
Signature=<base64-signature>`,
    response: `IPGmethod=IPGReversal
OrderID=F989C51B-...
IPGTrnref=20250417083627362872
IPGTrnrefOriginal=20250602110038002328
Status=0
StatusMsg=Success
Signature=<base64-signature>`,
  },
  "ipg-get-status": {
    title: "IPGGetTxnStatus",
    subtitle: "Backend Methods",
    description:
      "Retrieves the current status of a previously executed backend payment. Can be used for checking the transaction status for IPGOCT / IPGFundsDisbursement",
    facts: ["BM Gambling", "BM Credit Institution", "Timeout diagnostics", "Not for ECommerce"],
    availability: availability(true, true, false),
    fieldSections: [
      { title: "Request Parameters", fields: txnStatusRequestFields },
      { title: "Response", fields: txnStatusResponseFields },
    ],
    notes: [
      "A successful status requires both IPGTrnStatus = 0 and IPGTrnStatusMsg = Transaction completed successful. Do not treat either condition alone as confirmation.",
    ],
    request: `IPGmethod=IPGGetTxnStatus
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=610F0A8D-7210-...
OutputFormat=json
Signature=<base64-signature>`,
    response: `IPGmethod=IPGGetTxnStatus
Status=0
StatusMsg=Success
OrderID=610F0A8D-...
IPGTrnStatus=0
IPGTrnStatusMsg=Success
Signature=<base64-signature>`,
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
    description: "Feature and method support across BM Gambling, BM Credit Institution, and BM ECommerce.",
    tables: [featureMatrixTable],
  },
  "ipg-payment-availability": {
    title: "Payment Method Availability",
    subtitle: "Business Models",
    description: "Availability of card, stored-card, Apple Pay, and Google Pay flows by business model.",
    tables: [paymentAvailabilityTable],
  },
  "ipg-key-field-differences": {
    title: "Key Field Differences",
    subtitle: "Business Models",
    description: "Important model-specific field and behavior differences in IPG protocol 4.5.",
    tables: [keyFieldDifferencesTable],
  },
  "ipg-protocol-changes": {
    title: "Protocol 4.3 to 4.5 Changes",
    subtitle: "Business Models",
    description: "Summary of protocol-wide changes introduced in version 4.5.",
    tables: [protocolChangesTable],
  },
};

const sharedGeneralItems = [
  { id: "ipg-integration-steps", label: "Integration steps", type: "guide" },
  { id: "ipg-http-post", label: "HTTP POST", type: "guide" },
  { id: "ipg-data-types", label: "Data type formats", type: "schema" },
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
    { id: "ipg-protocol-changes", label: "4.3 to 4.5 changes", type: "schema" },
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
      "4.2": versionedReference(ipgMenu, ipgContent, ipgVersionDocuments["4.2"].summary),
      "4.3": versionedReference(ipgMenu, ipgContent, ipgVersionDocuments["4.3"].summary),
      "4.5": versionedReference(ipgMenu, ipgContent, ipgVersionDocuments["4.5"].summary),
    },
  },
  gambling: {
    id: "gambling",
    label: "Gambling",
    defaultVersion: "4.5",
    defaultSection: "ipg-gambling-overview",
    summaries: {
      "4.2": scopedVersionSummary("Gambling", "4.2", ["BM Gambling"]),
      "4.3": scopedVersionSummary("Gambling", "4.3", ["BM Gambling"]),
      "4.5": gamblingVersion45Summary,
    },
    versions: {
      "4.5": versionedReference(gamblingMenu, gamblingContent, gamblingVersion45Summary),
    },
  },
  "financial-institution": {
    id: "financial-institution",
    label: "Financial institution",
    defaultVersion: "4.5",
    defaultSection: "ipg-financial-overview",
    summaries: {
      "4.2": scopedVersionSummary("Financial Institution", "4.2", ["BM Financial Institution"]),
      "4.3": scopedVersionSummary("Financial Institution", "4.3", ["BM Financial Institution"]),
      "4.5": scopedVersionSummary("Financial Institution", "4.5", ["BM Financial Institution"]),
    },
    versions: {
      "4.5": versionedReference(
        financialInstitutionMenu,
        financialInstitutionContent,
        scopedVersionSummary("Financial Institution", "4.5", ["BM Financial Institution"])
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
      "4.3": scopedVersionSummary("ECommerce", "4.3", ["BM ECommerce"]),
      "4.5": scopedVersionSummary("ECommerce", "4.5", ["BM ECommerce"]),
    },
    versions: {
      "4.5": versionedReference(
        ecommerceMenu,
        ecommerceContent,
        scopedVersionSummary("ECommerce", "4.5", ["BM ECommerce"])
      ),
    },
  },
};
