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
const dataTypesTable = table(
  "Data Type Formats",
  ["Type", "Description", "Example"],
  [
    ["int", "Integer number", "1"],
    ["String", "Text string", "This is a string"],
    ["Date", "ISO 8601 date: YYYY-MM-DD", "2021-09-14"],
    ["DateTime", "ISO 8601 datetime: YYYY-MM-DD HH:mm:SS", "2021-09-14 23:59:59"],
    ["A(n)", "Alpha string, n characters required", "Alpha string"],
    ["AN(n)", "Alphanumeric string, n characters required", "Alphanumeric123"],
    ["N(n)", "Numeric string, left-padded with zeroes", "000123"],
    ["Double(M,D)", "Decimal number, M total digits, D after decimal. Dot separator only.", "34.56"],
    ["BASE64", "Binary data encoded in Base64", "YW55IGNhcm5hbA=="],
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
  "If the merchant does not return HTTP 200 OK, IPG retries the callback up to 53 times within one day.",
  "After 24 hours, if we haven't received 200 OK, we will reach you to request further information regarding the transaction."
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
    ["IPGGetTxnStatus use case", "For IPGOCT timeouts only", "For IPGFundsDisbursement timeouts only", "Not applicable"],
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
export const ipgMenu = [
  {
    title: "General",
    items: [
      { id: "ipg-overview", label: "Overview & Architecture", type: "overview" },
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
    body: [
      "The iCard iPayment Gateway API enables merchants to accept Visa and Mastercard payments through their websites.",
      "A typical payment starts on the merchant checkout page, continues through a merchant backend POST to IPG, then shows the iCard payment page by redirect, iframe, modal, or wallet SDK.",
      "After authorization, IPG sends a JSON POST callback to URL_Notify. The browser redirect back to URL_OK or URL_Cancel is not the source of truth.",
    ],
    tables: [implementationTypesTable],
    request: `POST https://dev-ipg.icards.eu/sandbox/
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
IPGmethod=IPGPurchase&KeyIndex=1&KeyIndexResp=1&IPGVersion=4.5&...&Signature=<base64>`,
    response: `The authoritative payment result is delivered as a signed JSON callback to URL_Notify.`,
  },
  "ipg-http-post": {
    title: "HTTP POST",
    subtitle: "General",
    description:
      "All merchant-to-IPG data transfer uses HTTP POST with URL-encoded key=value pairs in UTF-8.",
    facts: ["Sandbox: https://dev-ipg.icards.eu/sandbox/", "Production: https://ipg.icard.com/", "UTF-8", "application/x-www-form-urlencoded"],
    body: [
      "Parameters are sent in the request body as URL-encoded key=value pairs separated by ampersands.",
      "The Signature parameter must be appended as the last parameter in the POST body.",
    ],
    request: `IPGmethod=IPGPurchase&KeyIndex=1&KeyIndexResp=1&IPGVersion=4.5&Language=EN&Originator=33&...&Signature=<base64>`,
  },
  "ipg-data-types": {
    title: "Data Type Formats",
    subtitle: "General",
    description: "Protocol 4.5 uses fixed data type notation for request, response, and callback properties.",
    tables: [dataTypesTable],
  },
  "ipg-security": {
    title: "Security & Signatures",
    subtitle: "General",
    description:
      "All communication is protected by TLS 1.2+, and every request, response, and callback must be digitally signed.",
    facts: ["TLS 1.2+", "RSA-SHA256", "Public key exchange", "Verify before trust"],
    body: [
      "Both iCard and the merchant generate RSA key pairs and exchange public keys.",
      "Merchant requests are signed with the merchant private key. IPG responses and callbacks are verified with iCard's public key.",
      "Never trust a synchronous response or callback until its Signature has been verified successfully.",
    ],
  },
  "ipg-signature-generation": {
    title: "Signature Generation Algorithm",
    subtitle: "Security & Signatures",
    description:
      "Signature generation uses canonicalization plus RSA-SHA256 plus Base64 encoding.",
    facts: ["Exclude Signature", "Lowercase keys", "Natural sort", "Signature last"],
    body: [
      "Start with request parameters and the merchant private key. The Signature parameter must not be present in the data to sign.",
      "Lowercase all parameter keys, convert boolean values true/false to 1/0, flatten values into colon-delimited path strings, preserve empty values, index array elements from zero, ignore empty arrays, UTF-8 encode all strings, sort in natural order, and join with semicolons.",
      "Sign the canonical string with SHA-256 using the merchant private key, Base64 encode the binary signature, then append Signature as the last POST parameter.",
    ],
    request: `openssl_sign($dataToSign, $signature, $privateKey, OPENSSL_ALGO_SHA256);
$base64Signature = base64_encode($signature);`,
    response: `Signature=<base64-signature>`,
  },
  "ipg-signature-verification": {
    title: "Signature Verification Algorithm",
    subtitle: "Security & Signatures",
    description:
      "Every response and callback must be verified with the same canonicalization algorithm used for signing.",
    facts: ["Extract Signature", "Remove it from data", "Normalize remaining fields", "Verify with iCard public key"],
    body: [
      "Base64-decode the Signature field value and remove Signature from the response or callback data.",
      "Apply the same normalization, flattening, natural sorting, and semicolon joining used for signature generation.",
      "Verify the decoded signature against the canonical string using SHA-256 and iCard's public key. If verification fails, reject the message.",
    ],
    request: `$result = openssl_verify($dataToVerify, base64_decode($signature), $publicKey);`,
    response: `Valid signature: continue processing
Invalid signature: reject the response or callback`,
  },
  "ipg-signing-example": {
    title: "Step-by-Step Signing Example",
    subtitle: "Security & Signatures",
    description:
      "The PDF includes a concrete canonical string example for IPGPurchase.",
    body: [
      "The example starts from an IPGPurchase request, removes Signature, lowercases keys, normalizes BoolExample=true to boolexample:1, preserves EmptyExample as emptyexample:, sorts naturally, and joins with semicolons.",
    ],
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
    example: `Starting with these request parameters (before signing):
IPGmethod=IPGPurchase, KeyIndex=1, KeyIndexResp=1, IPGVersion=4.5
Language=en, Originator=33, BannerIndex=1, MID=000000000000113
Currency=975, MIDName=IPG TEST 4.5, CustomerIP=127.0.0.1
OrderID=8A540554-1551-4533-B246-42CAD55EE8DE
CustomerIdentifier=SZ-1868, BoolExample=true, EmptyExample=""
After removing Signature and lowercasing keys, then sorting:
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
Joined with semicolons (the string to sign):
amount:1.00;bannerindex:1;boolexample:1;currency:975;customeridentifier:SZ-1868;customerip:127.0.0.1
;emptyexample:;ipgmethod:IPGPurchase;ipgversion:4.5;keyindex:1;keyindexresp:1;language:en;mid:000000
000000113;midname:IPG TEST 4.5;orderid:8A540554-1551-4533-B246-42CAD55EE8DE;originator:33
Final Signature value:
PNYhiEtXvwTB2ixMID+hYuJIc7+VUlYcQzyH9xXTSGm2K7NiSNBe9oYeyv0Bi0e==`,
  },
  "ipg-callbacks": {
    title: "Callbacks",
    subtitle: "Callbacks",
    description:
      "A callback is an HTTP POST sent from IPG to the merchant URL_Notify endpoint with JSON payment outcome details and a Signature.",
    facts: ["JSON POST", "Verify Signature", "Respond HTTP 200 OK", "Store CardToken when present"],
    body: [
      "Accept callbacks only from iCard IP addresses provided by iCard support.",
      "Validate Signature before updating orders, notifying customers, or storing tokens.",
      "The callback, not the browser redirect, is the reliable backend confirmation channel.",
    ],
  },
  "ipg-callback-retries": {
    title: "Handling & Retries",
    subtitle: "Callbacks",
    description:
      "The merchant endpoint must respond with the correct HTTP status so IPG can determine whether the callback was accepted.",
    body: [
      "Return HTTP 200 OK when the callback is valid and processed.",
      "Return HTTP 400 Bad Request when a parameter cannot be parsed.",
      "Return HTTP 500 Internal Server Error for incorrect URL routing or server problems.",
      "Any non-200 response causes IPG to resend the callback according to the retry schedule.",
    ],
    tables: [retryScheduleTable],
  },
  "ipg-callback-payment": {
    title: "Object Payment",
    subtitle: "Callbacks",
    description: "The mandatory Payment object contains the main transaction identity and status information.",
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
      "The callback examples cover success, merchant validation failure, and declined 3DS states.",
    facts: ["Success", "Merchant validation error", "3DS frictionless decline", "3DS challenge decline"],
    example: `Success Payment Callback
{
  "Payment": {
    "OrderId": "4C498AA8-DA12-4D5D-94C3-257A29415DAF",
    "MID": "000000000000113",
    "Type": "IPGPurchase",
    "Status": "success",
    "Interface": "modal",
    "Sum": { "Amount": "20.00", "Currency": 975 }
  },
  "Operation": {
    "Type": "authorization",
    "Status": "success",
    "Code": 0,
    "Message": "Success",
    "Provider": { "RespCode": "00", "Approval": "SWCSIM" },
    "Eci": "05"
  },
  "Signature": "..."
}
Failed Merchant Validation Callback
{
  "Operation": { "Type": "merchant_validation", "Status": "declined", "Code": 9005 },
  "Errors": [{ "Code": 9033, "Field": "BannerIndex", "Message": "Invalid integer for banner index value" }],
  "Signature": "..."
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
      "Retrieves the current status of a previously executed backend payment. Use only for timeout handling, not as a callback substitute.",
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
