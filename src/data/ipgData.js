// ipgData.js
// Combined strictly from IPG API 4.5 documents:
// - BM ECommerce
// - BM Gambling
// - BM Credit Institution

import { Link } from "lucide-vue-next";

const commonRequestFields = [
  ["IPGmethod", "string", "Mandatory", "Name of the method requested for execution from IPG."],
  ["KeyIndex", "int", "Mandatory", "Identifier of the merchant private key used for request signing."],
  ["KeyIndexResp", "int", "Mandatory", "Identifier of the key IPG should use for response and callback signing."],
  ["IPGVersion", "string", "Mandatory", "Protocol version used for transmission. In this file it is always 4.5."],
  ["Originator", "int", "Mandatory", "Merchant company identifier assigned by iCard."],
  ["Signature", "BASE64", "Mandatory", "Signed hash for all request properties. Signature is always the last parameter."],
];

const redirectBaseFields = [
  ["Language", "A(2)", "Mandatory", "ISO 2-character language code for the payment page."],
  ["BannerIndex", "int", "Conditional", "Banner index configured in IPG for merchant branding."],
  ["MID", "AN(15)", "Mandatory", "Identifier of the virtual terminal."],
  ["MIDName", "string", "Mandatory", "Merchant display name shown to the cardholder."],
  ["Amount", "double", "Mandatory", "Requested transaction amount."],
  ["Currency", "N(3)", "Mandatory", "ISO numeric currency code."],
  ["OrderID", "string(50)", "Mandatory", "Merchant reference used to identify the payment request."],
  ["URL_OK", "string", "Mandatory", "Redirect URL after successful payment flow."],
  ["URL_Cancel", "string", "Mandatory", "Redirect URL after cancellation or unsuccessful payment flow."],
  ["URL_Notify", "string", "Mandatory", "Merchant callback URL. This is the primary backend confirmation endpoint."],
  ["Email", "string", "Mandatory", "Customer email address."],
];

const embeddedBaseFields = [
  ["PaymentType", "string", "Mandatory", "Type of payment flow to be executed through embedded checkout."],
  ["OutputFormat", "string", "Optional", "Output format. Usually xml or json."],
];

const tokenProviderSessionFields = [
  ["IPGmethod", "string", "Mandatory", "Method name for Apple Pay session creation."],
  ["KeyIndex", "int", "Mandatory", "Identifier of the private key used for request signing."],
  ["KeyIndexResp", "int", "Mandatory", "Identifier of the private key used for response signing."],
  ["IPGVersion", "string", "Mandatory", "Protocol version 4.5."],
  ["Originator", "int", "Mandatory", "Merchant company identifier."],
  ["ValidationURL", "string", "Mandatory", "Apple validation URL received from the Apple Pay session event."],
  ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
  ["Signature", "BASE64", "Mandatory", "Signed hash for all request properties."],
];

const tokenizedCardPurchaseFields = [
  ["IPGmethod", "string", "Mandatory", "Tokenized wallet purchase method."],
  ["KeyIndex", "int", "Mandatory", "Identifier of the private key used for request signing."],
  ["KeyIndexResp", "int", "Mandatory", "Identifier of the private key used for response signing."],
  ["IPGVersion", "string", "Mandatory", "Protocol version 4.5."],
  ["Originator", "int", "Mandatory", "Merchant company identifier."],
  ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
  ["MIDName", "string", "Mandatory", "Merchant display name."],
  ["Amount", "double", "Mandatory", "Requested transaction amount."],
  ["Currency", "N(3)", "Mandatory", "ISO numeric currency code."],
  ["OrderID", "string(50)", "Mandatory", "Merchant order reference."],
  ["PaymentToken", "string / object", "Mandatory", "Wallet token or tokenized card payload received from Apple Pay or Google Pay."],
  ["URL_Notify", "string", "Mandatory", "Merchant server callback URL."],
  ["Signature", "BASE64", "Mandatory", "Signed hash for all request properties."],
];

const callbackPaymentFields = [
  ["Payment.OrderId", "string", "Optional", "Merchant order reference from the originating request."],
  ["Payment.MID", "AN(15)", "Optional", "Virtual terminal identifier."],
  ["Payment.Date", "ISO 8601 Date", "Mandatory", "Date and time of the latest payment status update."],
  ["Payment.Type", "string", "Optional", "Executed payment method, for example IPGPurchase."],
  ["Payment.Context", "string", "Optional", "Payment context such as CardPay, GooglePay, ApplePay or StoreCardPay."],
  ["Payment.Status", "string", "Mandatory", "Payment status, for example success, error or declined."],
  ["Payment.Interface", "string", "Mandatory", "Execution interface such as redirect, modal, embedded_checkout or backend_request."],
  ["Payment.Sum.Amount", "double(8,2)", "Mandatory", "Echo of the input amount."],
  ["Payment.Sum.Currency", "N(3)", "Mandatory", "Echo of the input currency."],
  ["Payment.Description", "string", "Optional", "Description or note if it was provided in the request."],
];

const callbackCardDataFields = [
  ["CardData.Pan", "string", "Mandatory", "Masked PAN containing the first 6 and last 4 digits."],
  ["CardData.Type", "string", "Mandatory", "Card scheme, for example Mastercard or VISA."],
  ["CardData.CardholderName", "string", "Mandatory", "Cardholder name."],
  ["CardData.ExpMonth", "string", "Mandatory", "Card expiry month."],
  ["CardData.ExpYear", "string", "Mandatory", "Card expiry year."],
  ["CardData.CardToken", "string(64)", "Conditional", "Stored card token if the card was saved or the flow generated a reusable token."],
  ["CardData.IssCountry", "string", "Optional", "Issuing country."],
  ["CardData.IssRegion", "string", "Optional", "Issuing region."],
  ["CardData.AcqScheme", "string", "Optional", "Acquiring scheme."],
  ["CardData.Brand", "string", "Optional", "Card brand."],
  ["CardData.ProductID", "string", "Optional", "Card product ID."],
  ["CardData.ProductClass", "string", "Optional", "Card product class."],
  ["CardData.ProductClassName", "string", "Optional", "Human-readable product class name."],
  ["CardData.Qualifier", "string", "Optional", "Card qualifier."],
];

const callbackCustomerFields = [
  ["Customer.Email", "string", "Optional", "Customer email echoed from input data."],
  ["Customer.Phone", "string", "Optional", "Customer phone echoed from input data."],
  ["Customer.Identifier", "string", "Optional", "Customer identifier echoed from input data."],
  ["Customer.IPAddress", "string", "Optional", "Customer IP address provided by the merchant."],
  ["Customer.FirstName", "string", "Optional", "Customer first name echoed from input data."],
  ["Customer.LastName", "string", "Optional", "Customer last name echoed from input data."],
];

const callbackOperationFields = [
  ["Operation.Type", "string", "Optional", "Operation type, for example authorization."],
  ["Operation.Status", "string", "Mandatory", "Operation status such as success, error or declined."],
  ["Operation.Date", "ISO 8601 Date", "Mandatory", "Date and time of the operation."],
  ["Operation.Code", "int", "Mandatory", "Operation result code."],
  ["Operation.Message", "string", "Mandatory", "Human-readable result message."],
  ["Operation.Sum.Amount", "double", "Optional", "Amount related to the operation."],
  ["Operation.Sum.Currency", "N(3)", "Optional", "Currency related to the operation."],
  ["Operation.Provider.Trn", "string", "Optional", "Provider-side transaction reference."],
  ["Operation.Provider.Date", "ISO 8601 Date", "Optional", "Provider-side processing timestamp."],
  ["Operation.Provider.RespCode", "string", "Optional", "Processor or card scheme response code."],
  ["Operation.Provider.Approval", "string", "Optional", "Approval code when available."],
  ["Operation.Eci", "string", "Optional", "Electronic Commerce Indicator for authenticated card flows."],
];

const responseStandardFields = [
  ["method", "string", "Returned", "Executed method name."],
  ["status", "int", "Returned", "Request status. 0 commonly indicates success."],
  ["status_msg", "string", "Returned", "Human-readable request status message."],
  ["Signature", "BASE64", "Returned", "Signed hash for all returned properties."],
];

export const ipgMenu = [
  {
    title: "General",
    items: [
      { id: "ipg-overview", label: "Overview", type: "overview" },
      { id: "ipg-security", label: "Security & availability", type: "guide" },
      { id: "ipg-http-post", label: "HTTP POST", type: "guide" },
      { id: "ipg-data-types", label: "Data type formats", type: "schema" },
      { id: "ipg-signatures", label: "Signatures", type: "guide" },
      { id: "ipg-signature-generation", label: "Signature generation", type: "guide" },
      { id: "ipg-signature-verification", label: "Signature verification", type: "guide" },
      { id: "ipg-callbacks", label: "Callbacks", type: "guide" },
      { id: "ipg-callback-payment", label: "Callback object · Payment", type: "schema" },
      { id: "ipg-callback-carddata", label: "Callback object · CardData", type: "schema" },
      { id: "ipg-callback-customer", label: "Callback object · Customer", type: "schema" },
      { id: "ipg-callback-operation", label: "Callback object · Operation", type: "schema" },
      { id: "ipg-response-standard", label: "Response standard properties", type: "schema" },
    ],
  },
  {
    title: "Redirect checkout",
    items: [
      { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
      { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
    ],
  },
  {
    title: "Embedded checkout",
    items: [
      { id: "ipg-embedded-overview", label: "Embedded checkout", type: "guide" },
      { id: "ipg-embedded-payment", label: "IPGEmbeddedPayment", type: "post" },
    ],
  },
  {
    title: "Modal",
    items: [
      { id: "ipg-modal-overview", label: "Modal flow", type: "guide" },
      { id: "ipg-payment-token", label: "IPGPaymentToken", type: "post" },
      { id: "ipg-modal-form", label: "Create payment form", type: "schema" },
    ],
  },
  {
    title: "Wallets / tokenized",
    items: [
      { id: "ipg-applepay-sdk", label: "Apple Pay only JS SDK", type: "guide" },
      { id: "ipg-googlepay-sdk", label: "Google Pay JS SDK", type: "guide" },
      { id: "ipg-token-provider-session", label: "IPGTokenProviderSession", type: "post" },
      { id: "ipg-tokenized-card-purchase", label: "IPGTokenizedCardPurchase", type: "post" },
    ],
  },
  {
    title: "Backend",
    items: [
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-refund", label: "IPGRefund", type: "post" },
      { id: "ipg-get-status", label: "IPGGetTxnStatus", type: "post" },
      { id: "ipg-oct", label: "IPGOCT", type: "post" },
      { id: "ipg-funds-disbursement", label: "IPGFundsDisbursement", type: "post" },
    ],
  },
];

export const ipgContent = {
  "ipg-overview": {
    title: "IPG 4.5",
    subtitle: "Overview",
    description:
      "IPG 4.5 is iCard’s e-commerce payment gateway API for redirect checkout, embedded checkout, modal integrations, wallet/tokenized-card payments, and backend transaction operations.",
    facts: [
      "Protocol version 4.5",
      "HTTP POST + UTF-8 + form body",
      "Digital signatures on requests, callbacks, and responses",
      "JSON callbacks",
    ],
    body: [
      "IPG 4.5 defines how the merchant backend and merchant frontend communicate with iCard IPG for e-commerce card processing.",
      "The core front-end payment methods are IPGPurchase and IPG3DSPurchaseWithStoredCard.",
      "In addition to redirect checkout, protocol 4.5 supports Embedded checkout and Modal flows. Both rely on IPG-controlled payment collection, but they differ in how they are integrated into the merchant page.",
      "Apple Pay and Google Pay are covered through tokenized-card purchase flows. Apple Pay includes a session creation step, while both Apple Pay and Google Pay use tokenized purchase requests for transaction execution.",
      "Backend methods differ by business model document: ECommerce includes IPGRefund, Gambling includes IPGOCT, and Credit Institution includes IPGFundsDisbursement.",
    ],
  },

  "ipg-security": {
    title: "Security & availability",
    subtitle: "General",
    description:
      "Communication between Merchant and iCard is performed over HTTPS, and both requests and responses are digitally signed.",
    facts: [
      "HTTPS / TLS",
      "Requests and responses are digitally signed",
      "Public/private key exchange",
      "High-availability infrastructure",
    ],
    body: [
      "TLS secures the transport channel, but IPG 4.5 also requires message signing to guarantee message integrity and authenticity.",
      "Merchant requests are signed with the merchant private key. Responses and callbacks from IPG are verified with the iCard public key.",
      "The uploaded IPG 4.5 documents explicitly state that both requests and responses are digitally signed.",
    ],
  },

  "ipg-http-post": {
    title: "HTTP POST",
    subtitle: "General",
    description:
      "IPG communication is based on HTTP POST with parameter=value pairs encoded in the request body using UTF-8.",
    facts: [
      "HTTP POST",
      "application/x-www-form-urlencoded",
      "UTF-8",
      "parameter=value pairs",
    ],
    body: [
      "Request parameters are passed in the HTTP POST body in the format parameter=value.",
      "The request body is URL-encoded and uses UTF-8 character encoding.",
      "This transport format applies to the classic IPG request model in version 4.5.",
    ],
    request: [
      "POST /sandbox/ HTTP/2",
"Host: dev-ipg.icards.eu",
"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
"Content-Length: 793",
"Content-Type: application/x-www-form-urlencoded",
"IPGmethod=IPGPurchase&KeyIndex=1&KeyIndexResp=1&IPGVersion=4.2&Language=en&Originator=33…"
    ]
  },

  "ipg-data-types": {
    title: "Data type formats",
    subtitle: "General",
    description:
      "IPG 4.5 uses documented field formats such as int, String, Date, DateTime, A(n), AN(n), N(n), Double(M,D), BASE64, XML, and JSON.",
    fields: [
      ["int", "integer", "Returned", "Integer value, for example 1."],
      ["String", "string", "Returned", "Free text value."],
      ["Date", "ISO 8601 date", "Returned", "Format YYYY-MM-DD."],
      ["DateTime", "ISO 8601 datetime", "Returned", "Date and time value in ISO style."],
      ["A(n)", "alpha string", "Returned", "Alphabetic string with fixed or constrained length."],
      ["AN(n)", "alphanumeric string", "Returned", "Alphanumeric string with fixed or constrained length."],
      ["N(n)", "numeric string", "Returned", "Numeric value represented as a string."],
      ["Double(M,D)", "decimal number", "Returned", "Numeric value using a dot as decimal separator."],
      ["BASE64", "base64 string", "Returned", "Used for signatures and binary-compatible values."],
      ["XML", "XML payload", "Returned", "Available in some request or response contexts."],
      ["JSON", "JSON payload", "Returned", "Used for callbacks and supported response formats."],
    ],
  },

  "ipg-signatures": {
    title: "Signatures",
    subtitle: "General",
    description:
      "IPG 4.5 uses a new signature algorithm. All requests, callbacks, and responses must be signed and verified using RSA with SHA-256.\n Note that after key generation, you need to provide us with your newly generated public key, afterwards we will provide you with iCard's public key. ",
    facts: [
      "New 4.5 signature algorithm",
      "RSA + SHA-256",
      "Applies to requests, callbacks, and responses",
      "Canonical string generation",
    ],
    body: [
      "Protocol 4.5 introduced a new signature algorithm compared to earlier versions.",
      "The algorithm is based on canonical normalization of the data before signing. Keys are lowercased, values are flattened into path-based strings, arrays are indexed, strings are sorted in natural order, and the final canonical string is joined using semicolons.",
      "The generated canonical string is then signed using SHA-256 and the merchant private key. The result is Base64-encoded and appended as Signature.",
      "The same canonicalization logic must be used when verifying callbacks and responses from IPG.",
    ],
  },

  "ipg-signature-generation": {
    title: "Signature generation",
    subtitle: "General",
    description:
      "Signature generation in IPG 4.5 must follow the canonical algorithm exactly. Any difference in key normalization, sorting, path generation, or value handling will invalidate the signature.\nFor generation of keys pair you can use this link:",
     linkText: "For generation of a key pair you can use this link:",
link: {
  label: "Generate key pair",
  href: "https://ipg.icard.com/asym_keys/generate",
},
  
      fields: [
      ["1. Exclude Signature", "step", "Returned", "The Signature field must not be part of the data to sign."],
      ["2. Lowercase keys", "step", "Returned", "All keys must be transformed to lowercase."],
      ["3. Normalize booleans", "step", "Returned", "Boolean values are normalized to 0 or 1."],
      ["4. Flatten values", "step", "Returned", "Each value is transformed into a path:name:value string."],
      ["5. Preserve empty values", "step", "Returned", "Empty values remain empty; they are not replaced with null or placeholder text."],
      ["6. Index arrays", "step", "Returned", "Array items receive numeric indexes starting from 0."],
      ["7. Ignore empty arrays", "step", "Returned", "Empty arrays do not contribute to the canonical string."],
      ["8. UTF-8 encode", "step", "Returned", "All string values must use UTF-8 encoding."],
      ["9. Natural sort", "step", "Returned", "Canonical strings must be sorted in natural order."],
      ["10. Join with ';'", "step", "Returned", "All canonical strings are joined using a semicolon delimiter."],
      ["11. Sign with SHA-256", "step", "Returned", "The joined canonical string is signed using SHA-256 and the private key."],
      ["12. Base64 encode", "step", "Returned", "The generated signature is Base64-encoded and appended as Signature."],
    ],
    body: [
      "This is one of the most important protocol changes in IPG 4.5.",
  "If an implementation still follows an older signing model, request validation will fail.",
  "The safest approach is to generate the canonical string in one place and reuse the same logic for request signing and response verification.",

  "The signing input includes:",
  "• Request data without the Signature parameter.",
  "• The private key used for signing.",

  "The algorithm steps are:",
  "1. Validate input.",
  "• Ensure the request does not contain Signature, even as an empty field.",
  "• Ensure the private key is available.",

  "2. Normalize and prepare data.",
  "• Convert all keys to lowercase.",
  "• Convert Boolean values: false → 0, true → 1.",
  "• Transform each parameter into: <parent_1>:...:<parent_n>:<parameter_name>:<parameter_value>.",
  "• Keep empty values empty.",
  "• Add zero-based indexes to array elements.",
  "• Ignore empty arrays.",
  "• Convert all strings to UTF-8.",
  "• Sort all strings in natural order and join them with semicolons (;).",

  "3. Calculate the SHA-256 signature.",
  "4. Base64-encode the signature.",
  "5. Add the Signature parameter to the request body.",
    ],
  },

  "ipg-signature-verification": {
    title: "Signature verification",
    subtitle: "General",
    description:
      "Verification follows the same canonicalization process as signing, but instead of signing the canonical string, the implementation verifies the returned signature using the iCard public key.",
    facts: [
      "Verify callback signatures",
      "Verify response signatures",
      "Use the exact 4.5 canonical algorithm",
    ],
    body: [
       "No callback or backend response should be trusted before signature verification succeeds.",
  "The implementation must rebuild the canonical string from the returned payload using the IPG 4.5 normalization and sorting rules.",
  "The returned Base64 signature is then verified against the SHA-256 hash of that canonical string by using the iCard public key.",

  "Verification input includes:",
  "• The callback or response payload containing the Signature parameter.",
  "• The iCard public key used for verification.",

  "Verification steps are:",
  "1. Validate input.",
  "• Ensure the payload is valid JSON.",
  "• Ensure the Signature parameter is present.",
  "• Ensure the public key is available.",

  "2. Extract the signature.",
  "• Read the Signature value.",
  "• Remove Signature from the payload.",
  "• Decode the signature from Base64.",

  "3. Rebuild the canonical string.",
  "• Apply the same IPG 4.5 normalization, UTF-8 conversion, natural sorting, and semicolon join rules used in signature generation.",

  "4. Verify the signature.",
  "• Calculate the SHA-256 hash of the canonical string.",
  "• Verify the decoded signature with the iCard public key.",
    ],
  },

  "ipg-callbacks": {
    title: "Callbacks",
    subtitle: "General",
    description:
      "In IPG 4.5 the old Notify methods are removed. Instead, IPG sends a JSON callback to the merchant URL_Notify containing the final transaction status and related payment data.",
    facts: [
      "JSON callbacks",
      "Callbacks are resent until 200 OK",
      "Merchant OK/Cancel redirect is GET without payload",
      "Callbacks are the backend source of truth",
    ],
    body: [
      "Version 4.5 replaced the old Notify method pattern with JSON callbacks.",
      "The callback is sent to URL_Notify and must be accepted, signature-verified, and acknowledged with HTTP 200 OK.",
      "If the merchant does not return 200 OK, the callback is resent.",
      "The browser redirect back to the merchant OK or Cancel page uses GET and carries no payload, so redirect handling must not be treated as the only payment confirmation mechanism.",
    ],
  },

  "ipg-callback-payment": {
    title: "Callback object · Payment",
    subtitle: "Callbacks",
    description:
      "The Payment object contains the main transaction identity and status information in the callback payload.",
    fields: callbackPaymentFields,
  },

  "ipg-callback-carddata": {
    title: "Callback object · CardData",
    subtitle: "Callbacks",
    description:
      "The CardData object contains masked card information, expiry data, card type, and optionally CardToken for reusable card scenarios.",
    fields: callbackCardDataFields,
  },

  "ipg-callback-customer": {
    title: "Callback object · Customer",
    subtitle: "Callbacks",
    description:
      "The Customer object echoes relevant customer-related input data from the original request.",
    fields: callbackCustomerFields,
  },

  "ipg-callback-operation": {
    title: "Callback object · Operation",
    subtitle: "Callbacks",
    description:
      "The Operation object describes the executed operation, result code, provider references, approval information, and optional ECI values.",
    fields: callbackOperationFields,
  },

  "ipg-response-standard": {
    title: "Response standard properties",
    subtitle: "General",
    description:
      "Backend methods return a standard response envelope containing method, status, status_msg, and Signature, along with method-specific fields.",
    fields: responseStandardFields,
  },

  "ipg-purchase": {
    title: "IPGPurchase",
    subtitle: "Redirect checkout",
    description:
      "The standard hosted redirect checkout method for card payments. The merchant submits a signed POST request, the customer is redirected to IPG, and the final result is delivered through callback plus browser redirect.",
    facts: [
      "Redirect checkout",
      "Supported across ECommerce, Gambling, and Credit Institution business models",
      "Uses URL_OK, URL_Cancel, and URL_Notify",
      "Final backend confirmation is callback-driven",
    ],
    fields: [
      ...commonRequestFields,
      ...redirectBaseFields,
      ["CustomerIP", "string", "Mandatory", "Customer IP address as seen by the merchant."],
      ["CustomerIdentifier", "string", "Optional", "Merchant customer reference echoed back when provided."],
      ["MobileNumber", "string", "Conditional", "Customer mobile number when required by the flow."],
      ["BillAddrCountry", "string", "Conditional", "Billing country code when billing data is supplied."],
      ["BillAddrCity", "string", "Conditional", "Billing city."],
      ["BillAddrState", "string", "Conditional", "Billing state or subdivision."],
      ["BillAddrLine1", "string", "Conditional", "Billing address line 1."],
      ["BillAddrLine2", "string", "Optional", "Billing address line 2."],
      ["BillAddrLine3", "string", "Optional", "Billing address line 3."],
      ["PostResultAction", "string", "Optional", "Introduced in 4.5 to define post-operation redirect behavior."],
    ],
    request: `POST /ipg
Content-Type: application/x-www-form-urlencoded

IPGmethod=IPGPurchase
&KeyIndex=1
&KeyIndexResp=1
&IPGVersion=4.5
&Language=EN
&Originator=33
&BannerIndex=1
&MID=000000000000123
&MIDName=Merchant Web Shop
&Amount=20.00
&Currency=978
&CustomerIP=127.0.0.1
&OrderID=ORDER-10001
&URL_OK=https://merchant.test/ok
&URL_Cancel=https://merchant.test/cancel
&URL_Notify=https://merchant.test/notify
&Email=test@test.com
&Signature=<base64-signature>`,
    response: `Redirect flow starts.
The final backend result is delivered through a JSON callback to URL_Notify.
The browser is redirected back to URL_OK or URL_Cancel with GET and no payload.`,
  },

  "ipg-3ds-stored": {
    title: "IPG3DSPurchaseWithStoredCard",
    subtitle: "Redirect checkout",
    description:
      "Processes a payment using a stored card token with 3DS verification. In 4.5 the old Token parameter is replaced with CardToken and billing address is no longer mandatory.",
    facts: [
      "Stored card + 3DS",
      "Supported across ECommerce, Gambling, and Credit Institution",
      "Uses CardToken in 4.5",
      "Billing address requirement removed in 4.5",
    ],
    fields: [
      ...commonRequestFields,
      ["Language", "A(2)", "Mandatory", "Desired payment page language."],
      ["Originator", "int", "Mandatory", "Merchant company identifier."],
      ["BannerIndex", "int", "Mandatory", "Merchant banner configuration index."],
      ["PostResultAction", "string", "Optional", "Defines the behavior after processing."],
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["MIDName", "string", "Mandatory", "Merchant display name."],
      ["Amount", "double", "Mandatory", "Requested payment amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["OrderID", "string(50)", "Mandatory", "Merchant order reference."],
      ["CardToken", "string", "Mandatory", "Stored card token used for the payment."],
      ["VerifyCVC", "N(1)", "Optional", "If set to 1, the customer confirms the card CVC before processing."],
      ["URL_OK", "string", "Mandatory", "Success redirect URL."],
      ["URL_Cancel", "string", "Mandatory", "Cancel or failure redirect URL."],
      ["URL_Notify", "string", "Mandatory", "Server callback URL."],
      ["Email", "string", "Mandatory", "Customer email address."],
      ["MobileNumber", "string", "Conditional", "Customer mobile number when required."],
      ["CustomerIdentifier", "string", "Optional", "Merchant customer reference."],
    ],
    request: `IPGmethod=IPG3DSPurchaseWithStoredCard
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
MID=000000000000123
MIDName=Merchant Web Shop
Amount=20.00
Currency=978
OrderID=ORDER-3DS-10001
CardToken=<stored-card-token>
VerifyCVC=1
URL_OK=https://merchant.test/ok
URL_Cancel=https://merchant.test/cancel
URL_Notify=https://merchant.test/notify
Email=test@test.com
Signature=<base64-signature>`,
    response: `3DS-enabled redirect flow starts.
The final transaction result is delivered through JSON callback.
The callback may contain CardData.CardToken depending on the transaction flow.`,
  },

  "ipg-embedded-overview": {
    title: "Embedded checkout",
    subtitle: "Embedded checkout",
    description:
      "In 4.5 widget integrations are removed and replaced with Embedded checkout. The merchant initializes the embedded flow using IPGEmbeddedPayment.",
    facts: [
      "Widget support removed in 4.5",
      "Use embedded payment instead",
      "Supports PaymentType IPGPurchase and IPG3DSPurchaseWithStoredCard",
    ],
    body: [
      "Embedded checkout is a hybrid model between redirect and modal integration.",
      "The merchant page remains active while the payment UI is rendered through an IPG-controlled embedded flow.",
      "The documents describe separate request and response property sets for PaymentType IPGPurchase and PaymentType IPG3DSPurchaseWithStoredCard.",
    ],
  },

  "ipg-embedded-payment": {
    title: "IPGEmbeddedPayment",
    subtitle: "Embedded checkout",
    description:
      "Request method used to initialize an embedded checkout flow. The behavior depends on the selected PaymentType.",
    facts: [
      "Embedded checkout bootstrap method",
      "Supported across ECommerce, Gambling, and Credit Institution",
      "PaymentType-driven behavior",
    ],
    fields: [
      ...commonRequestFields,
      ...embeddedBaseFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["MIDName", "string", "Mandatory", "Merchant display name."],
      ["OrderID", "string(50)", "Mandatory", "Merchant order reference."],
      ["Amount", "double", "Mandatory", "Requested amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["URL_Notify", "string", "Mandatory", "Server callback URL."],
      ["Email", "string", "Mandatory", "Customer email."],
      ["CustomerIP", "string", "Conditional", "Required for purchase-type flows."],
      ["CardToken", "string", "Conditional", "Required for stored-card 3DS embedded flows."],
    ],
    request: `IPGmethod=IPGEmbeddedPayment
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
PaymentType=IPGPurchase
MID=000000000000123
MIDName=Merchant Web Shop
OrderID=EMB-10001
Amount=20.00
Currency=978
URL_Notify=https://merchant.test/notify
Email=test@test.com
CustomerIP=127.0.0.1
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGEmbeddedPayment
status=0
status_msg=Success
URL=<iframe-url>
Signature=<base64-signature>`,
  },

  "ipg-modal-overview": {
    title: "Modal flow",
    subtitle: "Modal",
    description:
      "The modal implementation allows the merchant to render the IPG payment form inside a modal window on the merchant page. It is initialized with IPGPaymentToken and rendered with payment-modal.js.",
    facts: [
      "Token-based modal bootstrap",
      "Supports ModalType IPGPurchase and IPG3DSPurchaseWithStoredCard",
      "Still depends on URL_Notify for backend confirmation",
    ],
    body: [
      "The modal flow changes the user interface but does not change the backend confirmation model.",
      "The final transaction state must still be confirmed via signed callback to URL_Notify.",
      "The merchant page uses the returned token to load the payment-modal.js implementation.",
    ],
  },

  "ipg-payment-token": {
    title: "IPGPaymentToken",
    subtitle: "Modal",
    description:
      "Back-end synchronous request that returns a token used to render the IPG modal checkout flow.",
    facts: [
      "Modal bootstrap token",
      "Supported across ECommerce, Gambling, and Credit Institution",
      "ModalType controls the underlying payment flow",
      "URL_OK and URL_Cancel are not required for IPGPaymentToken itself",
    ],
    fields: [
      ...commonRequestFields,
      ["ModalType", "string", "Mandatory", "Possible values include IPGPurchase and IPG3DSPurchaseWithStoredCard."],
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["MIDName", "string", "Mandatory", "Merchant display name."],
      ["OrderID", "string(50)", "Mandatory", "Merchant order reference."],
      ["Amount", "double", "Mandatory", "Requested amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["URL_Notify", "string", "Mandatory", "Merchant callback URL."],
      ["Email", "string", "Mandatory", "Customer email address."],
      ["CustomerIP", "string", "Conditional", "Required for purchase-based modal flows."],
      ["CardToken", "string", "Conditional", "Required for stored-card 3DS modal flows."],
      ["OutputFormat", "string", "Optional", "json or xml."],
    ],
    request: `IPGmethod=IPGPaymentToken
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
ModalType=IPGPurchase
MID=000000000000123
MIDName=Merchant Web Shop
OrderID=MODAL-10001
Amount=20.00
Currency=978
URL_Notify=https://merchant.test/notify
Email=test@test.com
CustomerIP=127.0.0.1
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGPaymentToken
status=0
status_msg=Success
token=<modal-token>
Signature=<base64-signature>`,
  },

  "ipg-modal-form": {
    title: "Create payment form",
    subtitle: "Modal",
    description:
      "After receiving the token from IPGPaymentToken, the merchant page must render the wrapper element and load payment-modal.js with the token value.",
    fields: [
      ["Wrapper element", "HTML", "Mandatory", "The merchant page must contain a wrapper element with id=\"ipg\"."],
      ["payment-modal.js", "script", "Mandatory", "The payment modal script must be loaded dynamically."],
      ["token", "string", "Mandatory", "Token returned from IPGPaymentToken."],
      ["theme", "string", "Optional", "Can be classic or dark when supported by the implementation."],
    ],
  },

  "ipg-applepay-sdk": {
    title: "Apple Pay only JS SDK",
    subtitle: "Wallets / tokenized",
    description:
      "Apple Pay only JS SDK uses an Apple session creation step and a tokenized purchase request to execute the payment through IPG.",
    facts: [
      "Separate Apple session creation step",
      "Uses IPGTokenProviderSession and IPGTokenizedCardPurchase",
      "Covered in ECommerce and Credit Institution documents",
    ],
    body: [
      "Apple Pay only JS SDK starts on the merchant page and continues with Apple session validation.",
      "The payment is finalized through a backend tokenized purchase request to IPG.",
      "This is distinct from the classic redirect IPGPurchase flow.",
    ],
  },

  "ipg-googlepay-sdk": {
    title: "Google Pay JS SDK",
    subtitle: "Wallets / tokenized",
    description:
      "Google Pay JS SDK uses a wallet-assisted payment flow and executes the payment through IPGTokenizedCardPurchase.",
    facts: [
      "Tokenized wallet payment flow",
      "Supported in ECommerce, Gambling, and Credit Institution documents",
      "Merchant page + wallet payload + backend transaction request",
    ],
    body: [
      "The Google Pay flow is initiated on the merchant page through the Google Pay payment method selection and payment screen.",
      "The wallet payload is then sent from the merchant backend to IPG through IPGTokenizedCardPurchase.",
    ],
  },

  "ipg-token-provider-session": {
    title: "IPGTokenProviderSession",
    subtitle: "Wallets / tokenized",
    description:
      "Backend request used for Apple Pay session validation and token-provider session creation before tokenized purchase execution.",
    facts: [
      "Apple Pay session initialization",
      "Backend-to-IPG call",
      "Documented in ECommerce and Credit Institution business models",
    ],
    fields: tokenProviderSessionFields,
    request: `IPGmethod=IPGTokenProviderSession
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
ValidationURL=<apple-validation-url>
Signature=<base64-signature>`,
    response: `method=IPGTokenProviderSession
status=0
status_msg=Success
...session response payload...
Signature=<base64-signature>`,
  },

  "ipg-tokenized-card-purchase": {
    title: "IPGTokenizedCardPurchase",
    subtitle: "Wallets / tokenized",
    description:
      "Tokenized card purchase method used for Apple Pay JS SDK and Google Pay JS SDK payment execution.",
    facts: [
      "Wallet payment execution",
      "Supported across all three business model documents",
      "Still requires URL_Notify callback handling",
    ],
    fields: tokenizedCardPurchaseFields,
    request: `IPGmethod=IPGTokenizedCardPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
MIDName=Merchant Web Shop
Amount=20.00
Currency=978
OrderID=WALLET-10001
PaymentToken=<wallet-token-payload>
URL_Notify=https://merchant.test/notify
Signature=<base64-signature>`,
    response: `method=IPGTokenizedCardPurchase
status=0
status_msg=Success
...transaction result...
Signature=<base64-signature>`,
  },

  "ipg-reversal": {
    title: "IPGReversal",
    subtitle: "Backend",
    description:
      "Backend method for reversing a previously executed transaction. In 4.5 the documents explicitly note added fields for OrderID and MID.",
    facts: [
      "Backend reversal",
      "Supported across ECommerce, Gambling, and Credit Institution",
      "4.5 adds OrderID and MID",
    ],
    fields: [
      ...commonRequestFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string(50)", "Mandatory", "Merchant reference for the reversal request."],
      ["IPG_Trnref", "string", "Mandatory", "Reference to the original transaction."],
      ["Amount", "double", "Conditional", "Amount when required by the specific reversal flow."],
      ["Currency", "N(3)", "Conditional", "Currency code."],
      ["OutputFormat", "string", "Optional", "json or xml."],
    ],
    request: `IPGmethod=IPGReversal
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=REV-10001
IPG_Trnref=20250514075143257397
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGReversal
status=0
status_msg=Success
...reversal result...
Signature=<base64-signature>`,
  },

  "ipg-refund": {
    title: "IPGRefund",
    subtitle: "Backend",
    description:
      "Refund method for a previously executed payment. This method is documented in the ECommerce IPG 4.5 document.",
    facts: [
      "Business model: ECommerce",
      "Backend refund",
      "Uses standard response properties plus method-specific fields",
    ],
    fields: [
      ...commonRequestFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string(50)", "Mandatory", "Merchant reference for the refund request."],
      ["IPG_Trnref", "string", "Mandatory", "Reference to the original payment transaction."],
      ["Amount", "double", "Mandatory", "Refund amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["OutputFormat", "string", "Optional", "json or xml."],
    ],
    request: `IPGmethod=IPGRefund
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=REF-10001
IPG_Trnref=20250514075143257397
Amount=20.00
Currency=978
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGRefund
status=0
status_msg=Success
...refund result...
Signature=<base64-signature>`,
  },

  "ipg-get-status": {
    title: "IPGGetTxnStatus",
    subtitle: "Backend",
    description:
      "Lookup method for retrieving the status of a previously executed transaction. It is documented in the Gambling and Credit Institution IPG 4.5 documents. The IPG API will return an xml or json with information about a specific OrderID. This method is intended to be utilized by the Merchant in his website back-end. This method's implementation is mandatory for the gambling and credit business models",
    facts: [
      "Business models: Gambling and Credit Institution",
      "Transaction status lookup",
      "Useful for reconciliation and diagnostics",
    ],
    fields: [
      ...commonRequestFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string(50)", "Mandatory", "Merchant order reference used for lookup."],
      ["OutputFormat", "string", "Optional", "json or xml."],
    ],
    request: `IPGmethod=IPGGetTxnStatus
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=ORDER-10001
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGGetTxnStatus
status=0
status_msg=Success
MID=000000000000123
OrderID=ORDER-10001
...transaction status payload...
Signature=<base64-signature>`,
  },

  "ipg-oct": {
    title: "IPGOCT",
    subtitle: "Backend",
    description:
      "This method is used by IPG to allow merchant to process OCT transaction. OCT transactions are used forGaming Withdrawal. This method is intended to be utilized by the Merchant in their website back-end. IPG API will return aresponse with the result. The request can be initialized only by a reference from a previously executed payment transaction or by a token of a previous executed stored card.",
    facts: [
      "Business model: Gambling",
      "Original Credit Transaction payout",
      "CardToken replaces Token in 4.5",
    ],
    fields: [
      ...commonRequestFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string(50)", "Mandatory", "Merchant request identifier."],
      ["IPG_Trnref", "string", "Conditional", "Reference to the original transaction when payout is based on prior payment reference."],
      ["Approval", "string", "Conditional", "Approval code from the original issuer-side transaction when required."],
      ["CardToken", "string", "Conditional", "Stored card token when payout is based on card token."],
      ["Amount", "double", "Mandatory", "Payout amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["RecipientFirstName", "string", "Mandatory", "Recipient first name."],
      ["RecipientLastName", "string", "Mandatory", "Recipient last name."],
      ["OutputFormat", "string", "Optional", "json or xml."],
    ],
    request: `IPGmethod=IPGOCT
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=OCT-10001
IPG_Trnref=20250514075143257397
Approval=SWCSIM
Amount=20.00
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGOCT
status=0
status_msg=Success
...OCT result...
Signature=<base64-signature>`,
  },

  "ipg-funds-disbursement": {
    title: "IPGFundsDisbursement",
    subtitle: "Backend",
    description:
      "This method is used by IPG to allow merchant to process Funds Disbursement (FD) transaction to cardholder. Funds Disbursement transactions are used from credit institutions for granting of loans to card. This method is intended to be utilized by the Merchant in their website back-end. IPG API will return a response with the result. The request can be initialized only by a reference from a previously executed payment transaction or by a token of a previous executed stored card.",
    facts: [
      "Business model: Credit Institution",
      "Backend funds disbursement",
      "CardToken replaces Token in 4.5",
    ],
    fields: [
      ...commonRequestFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string(50)", "Mandatory", "Merchant request identifier."],
      ["IPG_Trnref", "string", "Conditional", "Reference to the original transaction when required."],
      ["Approval", "string", "Conditional", "Original approval code when required."],
      ["CardToken", "string", "Conditional", "Stored card token used instead of original transaction reference in token-based disbursement flows."],
      ["Amount", "double", "Mandatory", "Disbursement amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["RecipientFirstName", "string", "Mandatory", "Recipient first name."],
      ["RecipientLastName", "string", "Mandatory", "Recipient last name."],
      ["OutputFormat", "string", "Optional", "json or xml."],
    ],
    request: `IPGmethod=IPGFundsDisbursement
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=FD-10001
CardToken=<stored-card-token>
Amount=20.00
Currency=978
RecipientFirstName=John
RecipientLastName=Smith
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGFundsDisbursement
status=0
status_msg=Success
...funds disbursement result...
Signature=<base64-signature>`,
  },
};