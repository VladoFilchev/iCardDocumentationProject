const baseRequestFields = [
  ["IPGmethod", "string", "Mandatory", "Name of the method requested for execution from IPG."],
  ["KeyIndex", "int", "Mandatory", "Identifier of the merchant private key used for signing."],
  ["KeyIndexResp", "int", "Mandatory", "Identifier of the key IPG should use for response signing."],
  ["IPGVersion", "string", "Mandatory", "Protocol version used for transmission."],
  ["Originator", "int", "Mandatory", "Merchant company identifier assigned by iCard."],
  ["Signature", "BASE64", "Mandatory", "Signed hash for all properties in the command. Signature is always the last parameter."],
];

const baseFrontEndFields = [
  ["Language", "A(2)", "Conditional", "Desired language for the payment page. English is default fallback."],
  ["BannerIndex", "int", "Conditional", "Banner index configured in IPG for merchant branding."],
  ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
  ["MIDName", "string", "Mandatory", "Merchant display name shown to the cardholder."],
  ["Amount", "double", "Mandatory", "Requested payment amount."],
  ["Currency", "N(3)", "Mandatory", "ISO numeric currency code matching the MID currency."],
  ["OrderID", "string", "Mandatory", "Merchant order / subscription reference. Used as unique request identifier."],
  ["URL_OK", "string", "Mandatory", "Redirect URL after successful payment."],
  ["URL_Cancel", "string", "Mandatory", "Redirect URL after cancellation or unsuccessful flow."],
  ["URL_Notify", "string", "Mandatory", "Server notification URL for callbacks from IPG."],
  ["Email", "string", "Mandatory", "Cardholder email."],
  ["MobileNumber", "string", "Conditional", "Cardholder mobile number, when required by the flow."],
];

const baseBackOfficeFields = [
  ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
  ["OrderID", "string", "Mandatory", "Merchant reference used to identify the operation."],
  ["OutputFormat", "string", "Optional", "Response format. Can be xml or json. Defaults to xml if omitted."],
];

const callbackResponseFields = [
  ["IPGmethod", "string", "Returned", "Callback method name."],
  ["MID", "AN(15)", "Returned", "Echo from the originating request."],
  ["OrderID", "string", "Returned", "Echo from the originating request."],
  ["Amount", "double", "Returned", "Echo from the originating request when applicable."],
  ["Currency", "N(3)", "Returned", "Echo from the originating request when applicable."],
  ["Signature", "BASE64", "Returned", "Signed hash for all returned properties. Always last parameter."],
];

export const ipgMenu = [
  {
    title: "General",
    items: [
    { id: "ipg-overview", label: "Overview", type: "overview" },
    { id: "ipg-security", label: "Security & availability", type: "guide" },
    { id: "ipg-http", label: "HTTP POST", type: "guide" },
    { id: "ipg-signatures", label: "Signatures", type: "guide" },
    { id: "ipg-signature-generation", label: "Signature generation", type: "guide" },
    { id: "ipg-flow", label: "Transmission mechanism", type: "guide" },
    { id: "ipg-callbacks", label: "Callbacks", type: "guide" },
    { id: "ipg-response-standard", label: "Response standard properties", type: "guide" },
  ],
  },
  {
    title: "Checkout",
    items: [
      { id: "ipg-purchase", label: "IPGPurchase", type: "post" },
    ],
  },
  {
    title: "Stored cards",
    items: [
      { id: "ipg-store-card", label: "IPGStoreCard", type: "post" },
      { id: "ipg-get-stored-card", label: "IPGGetStoredCardData", type: "post" },
      { id: "ipg-3ds-stored", label: "IPG3DSPurchaseWithStoredCard", type: "post" },
    ],
  },
  {
    title: "Recurring & back-office",
    items: [
      { id: "ipg-first-recurring", label: "IPGFirstRecurring", type: "post" },
      { id: "ipg-subsequent-recurring", label: "IPGSubsequentRecurring", type: "post" },
      { id: "ipg-oct", label: "IPGOCT", type: "post" },
      { id: "ipg-reversal", label: "IPGReversal", type: "post" },
      { id: "ipg-refund", label: "IPGRefund", type: "post" },
      { id: "ipg-status", label: "IPGGetTxnStatus", type: "post" },
      
    ],
  },
  {
    title: "Modal",
    items: [
      { id: "ipg-modal", label: "IPG Payment Modal", type: "guide" },
      { id: "ipg-payment-token", label: "IPGPaymentToken", type: "post" },
      { id: "ipg-modal-form", label: "Create payment form", type: "schema" },
      { id: "ipg-modal-events", label: "Modal events", type: "schema" },
    ],
  },
  {
    title: "Appendix",
    items: [
      { id: "ipg-response-codes-payingate", label: "Response codes · PayInGate", type: "schema" },
{ id: "ipg-response-codes-3ds", label: "Response codes · 3DS", type: "schema" },
{ id: "ipg-response-codes-cardholder", label: "Response codes · Cardholder behavior", type: "schema" },
{ id: "ipg-response-codes-process", label: "Response codes · Payment process reasons", type: "schema" },
{ id: "ipg-response-codes-errors", label: "Response codes · Errors", type: "schema" },
    ],
  },
];

export const ipgContent = {
  "ipg-overview": {
    title: "IPG",
    subtitle: "Overview",
    description:
      "IPG is the hosted e-commerce payment gateway for merchant checkout, stored cards, recurring flows, back-office actions and modal payment experiences.",
    facts: [
      "Hosted checkout + callbacks",
      "Stored cards + recurring",
      "Back-office refund / reversal / status",
    ],
    body: [
      "The IPG interface is built around HTTP POST requests and signed parameter payloads. Depending on the method, the flow can be front-end, back-end, callback-driven, or modal-based.",
      "The command set includes standard hosted checkout, card storage, payments with stored cards, 3DS stored-card flows, recurring operations, refund and reversal actions, transaction status lookup and modal token generation.",
      "This page combines the IPG information into one explorer experience, without splitting the documentation by separate variants.",
    ],
    request: `POST /ipg-endpoint
Content-Type: application/x-www-form-urlencoded

IPGmethod=IPGPurchase&KeyIndex=1&KeyIndexResp=1&IPGVersion=4.5&Originator=33&MID=000000000000123&OrderID=ORDER-10001&Amount=23.45&Currency=978&Signature=<base64-signature>`,
    response: `HTTP 200 OK`,
  },

  "ipg-security": {
    title: "Security & availability",
    subtitle: "General",
    description:
      "Connection between Merchant and iCard is over HTTPS and request / response payloads are digitally signed.",
    facts: [
      "HTTPS required",
      "RSA SHA256 signing",
      "Signature is always the last POST parameter",
    ],
    body: [
      "IPG uses RSA key-pair exchange and SHA256-based signature validation. Merchant requests are signed with the merchant private key and IPG responses can be verified with the corresponding public key.",
      "The uploaded documents explicitly note that Signature is always the last field in the POST payload and is not included in the hash source string.",
      "This signature model applies across the hosted checkout, stored-card, recurring, back-office and modal-token flows.",
    ],
    request: `IPGmethod=IPGPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
...
Signature=<base64-signature>`,
    response: `Merchant validates the IPG response signature with the IPG public key.`,
  },

  "ipg-http": {
    title: "HTTP POST",
    subtitle: "General",
    description:
      "IPG communication is based on HTTP POST with parameter=value pairs in the request body.",
    facts: [
      "application/x-www-form-urlencoded",
      "UTF-8 payloads",
      "POST property order matters for signature generation",
    ],
    body: [
      "Requests are sent as standard form-encoded POST bodies. The ordering of the parameters matters because signature generation depends on the concatenation order of the values.",
      "Front-end methods redirect the cardholder into IPG, while back-end methods are processed by the merchant server directly.",
    ],
    request: `IPGmethod=IPGPurchase&KeyIndex=1&KeyIndexResp=1&IPGVersion=4.5&Originator=33&...&Signature=<base64-signature>`,
    response: `HTTP 200 OK`,
  },
"ipg-signatures": {
  title: "Signatures",
  subtitle: "General",
  description:
    "IPG signs all requests and responses with RSA SHA256. The signature is calculated over the concatenated property values in exact transmission order, excluding the Signature field itself.",
  facts: [
    "RSA SHA256 signing",
    "Exact property order matters",
    "Signature is always last",
  ],
  body: [
    "The IPG signing model is deterministic: take all request fields in the exact order in which they are sent, concatenate only their values, base64-encode the resulting string, hash it with SHA256 and sign the hash with the merchant private key.",
    "The Signature field itself is never part of the source string. It is appended only after the signature has been generated, and it must always be the final parameter in the request body.",
    "The same logic applies to response validation. The merchant must take the response fields in the order received, exclude Signature, concatenate the values, base64-encode the source string and verify the returned signature with the iCard public key.",
  ],
  request: `Request signing rule
1. Take all request fields except Signature
2. Keep the exact parameter order
3. Concatenate only the VALUES
4. Base64-encode the concatenated string
5. SHA256 hash the base64 string
6. Sign with merchant private key
7. Append Signature as the last field`,
  response: `Response verification rule
1. Take all returned fields except Signature
2. Keep the exact response order
3. Concatenate only the VALUES
4. Base64-encode the concatenated string
5. SHA256 hash the base64 string
6. Verify Signature with iCard public key`,
},
"ipg-signature-generation": {
  title: "Signature generation",
  subtitle: "General",
  description:
    "Signature generation in IPG 4.5 depends on exact field order, value-only concatenation, base64 encoding and RSA SHA256 signing. Any mismatch in ordering, missing field, extra delimiter or wrong encoding will invalidate the signature.",
  facts: [
    "No separators between values",
    "Base64 before signing",
    "Order-sensitive algorithm",
  ],
  fields: [
    ["Step 1", "Process", "Returned", "List all request parameters except Signature."],
    ["Step 2", "Process", "Returned", "Keep the exact order in which the parameters will be sent."],
    ["Step 3", "Process", "Returned", "Concatenate only the parameter values into one continuous string."],
    ["Step 4", "Process", "Returned", "Do not add separators like &, =, spaces, commas or new lines unless they are part of a value."],
    ["Step 5", "Process", "Returned", "Base64-encode the full concatenated value string."],
    ["Step 6", "Process", "Returned", "Generate SHA256 over that base64 string."],
    ["Step 7", "Process", "Returned", "Sign with the merchant private key."],
    ["Step 8", "Process", "Returned", "Append the final Base64 signature as the Signature field, always last."],
  ],
  body: [
    "A frequent implementation mistake is concatenating `key=value` pairs instead of only values. Another common mistake is reordering parameters alphabetically before signing. IPG expects the transmitted order, not a normalized or sorted order.",
    "If a field is optional and omitted from the request, it must not participate in the source string. If a field is present with an empty value, its empty value still participates according to the transmitted payload structure used by the merchant implementation.",
    "The safest implementation approach is to build the request payload in one place, preserve the exact order in an array, generate the signature from that same ordered array, and only then serialize the final POST body.",
  ],
  request: `Example request fields in order:
IPGmethod=IPGPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
MID=000000000000123
MIDName=Merchant Web Shop
Amount=23.45
Currency=978
CustomerIP=127.0.0.1
OrderID=ORDER-10001
URL_OK=https://merchant.test/ok
URL_Cancel=https://merchant.test/cancel
URL_Notify=https://merchant.test/notify
Email=customer@example.com
MobileNumber=359888123456

Concatenated VALUE source:
IPGPurchase114.5EN33100000000000123Merchant Web Shop23.45978127.0.0.1ORDER-10001https://merchant.test/okhttps://merchant.test/cancelhttps://merchant.test/notifycustomer@example.com359888123456

Next:
- Base64 encode source
- SHA256 hash
- Sign with private key
- Append Signature=<base64-signature>`,
  response: `Validation checklist
- same field order as transmission
- same character encoding
- no Signature in source string
- no missing optional field that was actually sent
- no extra separator characters
- Signature always appended last`,
},
"ipg-callbacks": {
  title: "Callbacks",
  subtitle: "General",
  description:
    "IPG 4.5 uses callback-driven post-processing for hosted and hosted-like front-end methods. The merchant must handle notify, success, cancel, decline and rollback callback families depending on the selected method.",
  facts: [
    "URL_Notify is mandatory",
    "Customer redirect and server callback are separate",
    "Always validate callback signature",
  ],
  body: [
    "For front-end methods such as IPGPurchase, IPGStoreCard, IPGFirstRecurring and IPG3DSPurchaseWithStoredCard, IPG communicates the final or intermediate payment outcome through callback URLs supplied in the request.",
    "The customer redirect URLs (`URL_OK`, `URL_Cancel`) are browser-side experience URLs and must not be treated as the only source of truth. The merchant backend should rely on `URL_Notify` and signature validation for final transaction confirmation.",
    "A robust integration stores the callback payload, validates the signature, matches the callback to the original `OrderID`, checks transaction status fields such as `IPG_Trnref`, `Approval`, `Status`, `StatusMsg`, and only then updates the local order, subscription or stored-card record.",
  ],
  fields: [
    ["URL_Notify", "string", "Mandatory", "Server-to-server notification endpoint from IPG. Main source of truth for merchant processing."],
    ["URL_OK", "string", "Conditional", "Customer browser redirect after successful flow."],
    ["URL_Cancel", "string", "Conditional", "Customer browser redirect after cancel or unsuccessful customer flow."],
    ["OrderID", "string", "Returned", "Merchant order or subscription reference used for matching."],
    ["IPG_Trnref", "string", "Returned", "IPG transaction reference when applicable."],
    ["Approval", "string", "Returned", "Approval code for successful processing where applicable."],
    ["Status", "string/number", "Returned", "General processing state returned by the callback."],
    ["StatusMsg", "string", "Returned", "Human-readable processing message."],
    ["Signature", "BASE64", "Returned", "Returned signature that must be verified with the iCard public key."],
  ],
  table: {
    headers: ["Callback family", "Typical meaning", "How to use it"],
    rows: [
      ["IPGPurchaseNotify", "Server notification for hosted purchase", "Validate signature and update merchant order state"],
      ["IPGPurchaseOK", "Customer success redirect", "Show success page, but still rely on notify for final confirmation"],
      ["IPGPurchaseCancel", "Customer cancelled or abandoned flow", "Show cancellation page and wait for notify logic if applicable"],
      ["IPGPurchaseDeclineNotify", "Payment declined notification", "Mark attempt as declined after signature validation"],
      ["IPGPurchaseRollback", "Rollback / reversal-style callback", "Use for rollback-aware order-state handling"],

      ["IPGStoreCardNotify", "Stored-card server notification", "Persist tokenized-card result after signature validation"],
      ["IPGStoreCardOK", "Customer success redirect for store-card flow", "Show success message in UI"],
      ["IPGStoreCardCancel", "Customer cancel redirect for store-card flow", "Restore checkout or account UI"],
      ["IPGStoreCardDeclineNotify", "Declined stored-card notification", "Handle tokenization failure"],

      ["IPG3DSPurchaseWithStoredCardNotify", "Server notification for stored-card 3DS payment", "Primary source of truth for backend payment state"],
      ["IPG3DSPurchaseWithStoredCardOK", "Customer success redirect after stored-card 3DS flow", "Display success page only after backend correlation"],
      ["IPG3DSPurchaseWithStoredCardCancel", "Customer cancel redirect during 3DS flow", "Return customer to merchant UI"],
      ["IPG3DSPurchaseWithStoredCardDeclineNotify", "Stored-card 3DS declined notification", "Mark payment attempt declined after validation"],
    ],
  },
  request: `Recommended callback handling flow
1. Receive callback on URL_Notify
2. Preserve raw field order and raw values
3. Validate Signature with iCard public key
4. Match OrderID to local order / subscription / tokenization flow
5. Read Status / StatusMsg / Approval / IPG_Trnref
6. Update local state idempotently
7. Log callback for support and reconciliation`,
  response: `Recommended merchant rules
- Do not trust browser redirect alone
- Process URL_Notify server-side
- Make callback handling idempotent
- Verify Signature before updating state
- Store OrderID + IPG_Trnref + Approval for reconciliation`,
},
  "ipg-flow": {
    title: "Transmission mechanism",
    subtitle: "General",
    description:
      "IPG supports front-end checkout, back-end operations, callbacks and modal payment flows.",
    facts: [
      "Front-end methods redirect the customer",
      "Back-end methods are merchant initiated",
      "Callbacks must be handled correctly",
    ],
    body: [
      "Hosted checkout flows like IPGPurchase redirect the cardholder to IPG, then return callbacks on URL_Notify, URL_OK and URL_Cancel depending on outcome.",
      "Back-end methods like IPGRefund, IPGReversal and IPGGetTxnStatus are invoked directly by the merchant server.",
      "Stored-card and recurring flows combine both front-end and merchant-initiated use cases depending on the method.",
    ],
    request: `Merchant -> IPG -> Cardholder / Issuer -> IPG -> Merchant callbacks`,
    response: `IPGPurchaseNotify / IPGPurchaseOK / IPGPurchaseCancel / Decline or rollback callbacks`,
  },

  "ipg-response-standard": {
    title: "Response standard properties",
    subtitle: "General",
    description:
      "Back-end methods return standard properties like method, status, status_msg and Signature, with additional business fields depending on the method.",
    facts: [
      "method",
      "status",
      "status_msg",
      "Signature",
    ],
    body: [
      "Most back-end calls return a common response envelope and then method-specific fields such as IPG_Trnref, Approval, MID, Amount, Currency and transaction state information.",
    ],
    request: `IPGmethod=IPGGetTxnStatus&...`,
    response: `method=IPGGetTxnStatus
status=0
status_msg=Success
Signature=<base64-signature>`,
  },

  "ipg-purchase": {
    title: "IPGPurchase",
    subtitle: "Checkout",
    description:
      "Standard hosted checkout method for card payments at a web shop.",
    facts: [
      "Hosted checkout entry point",
      "Uses redirects and callbacks",
      "Can support cart logical records and save-card options",
    ],
    fields: [
      ...baseRequestFields,
      ...baseFrontEndFields,
      ["CustomerIP", "string", "Mandatory", "Customer IP address."],
      ["CustomerIdentifier", "string", "Optional", "Customer identifier echoed in callbacks when supplied."],
      ["CartItems", "int", "Optional", "Number of cart line items included in the logical record."],
      ["BillAddrCountry", "string", "Conditional", "Billing country code when billing data is supplied."],
      ["BillAddrCity", "string", "Conditional", "Billing city."],
      ["BillAddrState", "string", "Conditional", "Billing state / subdivision code."],
      ["BillAddrLine1", "string", "Recommended", "Billing address line 1."],
      ["BillAddrLine2", "string", "Optional", "Billing address line 2."],
      ["BillAddrLine3", "string", "Optional", "Billing address line 3."],
    ],
    request: `IPGmethod=IPGPurchase
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
MID=000000000000123
MIDName=Merchant Web Shop
Amount=23.45
Currency=978
CustomerIP=127.0.0.1
OrderID=ORDER-10001
URL_OK=https://merchant.test/ok
URL_Cancel=https://merchant.test/cancel
URL_Notify=https://merchant.test/notify
Email=customer@example.com
MobileNumber=359888123456
Signature=<base64-signature>`,
    response: `Browser redirect flow starts.
Callbacks expected:
- IPGPurchaseNotify
- IPGPurchaseOK
- IPGPurchaseCancel
- IPGPurchaseDeclineNotify
- IPGPurchaseRollback`,
  },

  "ipg-store-card": {
    title: "IPGStoreCard",
    subtitle: "Stored cards",
    description:
      "Hosted flow for storing a card and receiving a token for subsequent use.",
    facts: [
      "Tokenizes a card for future use",
      "Hosted front-end flow",
      "Returns token in notify / success callbacks",
    ],
    fields: [
      ...baseRequestFields,
      ...baseFrontEndFields,
      ["CustomerIP", "string", "Mandatory", "Customer IP address."],
      ["CustomerIdentifier", "string", "Optional", "Customer identifier echoed back when supplied."],
    ],
    request: `IPGmethod=IPGStoreCard
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
MID=000000000000123
MIDName=Merchant Web Shop
Amount=0.00
Currency=978
CustomerIP=127.0.0.1
OrderID=STORE-10001
URL_OK=https://merchant.test/store-ok
URL_Cancel=https://merchant.test/store-cancel
URL_Notify=https://merchant.test/store-notify
Email=customer@example.com
Signature=<base64-signature>`,
    response: `Browser redirect flow starts.
Callbacks expected:
- IPGStoreCardNotify
- IPGStoreCardOK
- IPGStoreCardCancel
- IPGStoreCardDeclineNotify`,
  },

  "ipg-get-stored-card": {
    title: "IPGGetStoredCardData",
    subtitle: "Stored cards",
    description:
      "Back-end method for retrieving stored card data based on a previously issued token.",
    facts: [
      "Back-end token lookup",
      "Token must be encrypted with iCard public key",
      "Returns xml or json",
    ],
    fields: [
      ...baseRequestFields,
      ["OrderID", "string", "Mandatory", "Merchant order / subscription reference."],
      ["Token", "string", "Mandatory", "Encrypted card token with PKCS1 padding."],
      ["OutputForm", "string", "Optional", "Output format. Can be xml or json."],
    ],
    request: `IPGmethod=IPGGetStoredCardData
KeyIndex=1
KeyIndexResp=1
Originator=33
IPGVersion=4.5
OrderID=SUBSCRIPTION-10001
Token=<encrypted-card-token>
OutputForm=json
Signature=<base64-signature>`,
    response: `method=IPGGetStoredCardData
status=0
status_msg=Success
...card data result...
Signature=<base64-signature>`,
  },

  "ipg-3ds-stored": {
    title: "IPG3DSPurchaseWithStoredCard",
    subtitle: "Stored cards",
    description:
      "Processes a payment with stored card and 3DS verification.",
    facts: [
      "Stored card + 3DS",
      "Front-end redirect to ACS flow",
      "Supports VerifyCVC and result-action control",
    ],
    fields: [
      ...baseRequestFields,
      ["Language", "A(2)", "Mandatory", "Desired payment page language."],
      ["Originator", "int", "Mandatory", "Merchant company identifier."],
      ["BannerIndex", "int", "Mandatory", "Banner index configured in IPG."],
      ["PostResultAction", "string", "Conditional", "Redirect or CloseWindow behavior after processing."],
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["MIDName", "string", "Mandatory", "Merchant display name."],
      ["Amount", "double", "Mandatory", "Requested payment amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["OrderID", "string", "Mandatory", "Order identifier."],
      ["CardToken", "string", "Mandatory", "Stored card token."],
      ["VerifyCVC", "N(1)", "Optional", "If =1, the customer confirms the card CVC before proceeding."],
      ["URL_OK", "string", "Conditional", "Successful payment redirect URL."],
      ["URL_Cancel", "string", "Conditional", "Cancel / failed payment redirect URL."],
      ["URL_Notify", "string", "Mandatory", "Notification callback URL."],
      ["Email", "string", "Mandatory", "Cardholder email."],
      ["MobileNumber", "string", "Conditional", "Cardholder mobile number."],
    ],
    request: `IPGmethod=IPG3DSPurchaseWithStoredCard
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
PostResultAction=Redirect
MID=000000000000123
MIDName=Merchant Web Shop
Amount=23.45
Currency=978
OrderID=ORDER-3DS-10001
CardToken=<stored-card-token>
VerifyCVC=1
URL_OK=https://merchant.test/ok
URL_Cancel=https://merchant.test/cancel
URL_Notify=https://merchant.test/notify
Email=customer@example.com
Signature=<base64-signature>`,
    response: `Browser / ACS redirect flow starts.
Callbacks expected:
- IPG3DSPurchaseWithStoredCardNotify
- IPG3DSPurchaseWithStoredCardOK
- IPG3DSPurchaseWithStoredCardCancel
- IPG3DSPurchaseWithStoredCardDeclineNotify`,
  },

  "ipg-first-recurring": {
    title: "IPGFirstRecurring",
    subtitle: "Recurring & back-office",
    description:
      "First transaction in a subscription / recurring agreement.",
    facts: [
      "Front-end recurring setup",
      "Customer enters card details",
      "Uses the same callback family as purchase flows",
    ],
    fields: [
      ...baseRequestFields,
      ...baseFrontEndFields,
      ["CustomerIP", "string", "Mandatory", "Customer IP address."],
      ["CustomerIdentifier", "string", "Optional", "Customer identifier."],
    ],
    request: `IPGmethod=IPGFirstRecurring
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Language=EN
Originator=33
BannerIndex=1
MID=000000000000123
MIDName=Merchant Web Shop
Amount=23.45
Currency=978
CustomerIP=127.0.0.1
OrderID=REC-FIRST-10001
URL_OK=https://merchant.test/ok
URL_Cancel=https://merchant.test/cancel
URL_Notify=https://merchant.test/notify
Email=customer@example.com
Signature=<base64-signature>`,
    response: `Callbacks follow the purchase-style flow after successful processing.`,
  },

  "ipg-subsequent-recurring": {
    title: "IPGSubsequentRecurring",
    subtitle: "Recurring & back-office",
    description:
      "Subsequent merchant-initiated recurring transaction after the original subscription setup.",
    facts: [
      "Back-end subsequent recurring charge",
      "Uses original transaction reference",
      "Non-customer-initiated use case",
    ],
    fields: [
      ...baseRequestFields,
      ...baseBackOfficeFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["IPG_Trnref", "string", "Mandatory", "Reference to the first recurring transaction."],
      ["Amount", "double", "Mandatory", "Requested recurring amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["CustomerIdentifier", "string", "Optional", "Customer identifier."],
      ["Email", "string", "Optional", "Customer email."],
    ],
    request: `IPGmethod=IPGSubsequentRecurring
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=REC-NEXT-10002
IPG_Trnref=20250416064251147276
Amount=23.45
Currency=978
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGSubsequentRecurring
trnreforiginal=20250416064251147276
trnref=20250417070000123456
status=0
status_msg=Success
Signature=<base64-signature>`,
  },
  
"ipg-oct": {
  title: "IPGOCT",
  subtitle: "Recurring & back-office",
  description:
    "Back-end payout method for processing an Original Credit Transaction. The request can be initialized either by reference to a previously executed payment transaction or by CardToken from a previously stored card.",
  facts: [
    "Back-end payout / OCT flow",
    "Supports TRN+Approval or CardToken initiation",
    "CardToken is used in 4.5 instead of Token",
  ],
  fields: [
    ["IPGmethod", "string", "Mandatory", "Must be IPGOCT."],
    ["KeyIndex", "int", "Mandatory", "Identifier of the private key used for request signing."],
    ["KeyIndexResp", "int", "Mandatory", "Identifier of the private key used for response signing."],
    ["IPGVersion", "string", "Mandatory", "Protocol version used for transmission."],
    ["Originator", "int", "Mandatory", "Merchant company identifier assigned by iCard."],
    ["MID", "AN(15)", "Mandatory", "Identifier of the virtual terminal used for the payout."],
    ["OrderID", "string(50)", "Mandatory", "Merchant unique identifier for the request."],
    ["IPG_Trnref", "string", "Conditional", "Mandatory for OCT by TRN and Approval. Reference to a previously executed payment transaction."],
    ["Approval", "string", "Conditional", "Mandatory for OCT by TRN and Approval. Approval code from the original issuer-side payment."],
    ["CardToken", "string", "Conditional", "Mandatory for OCT by card token. Token received from a previous stored-card flow."],
    ["Amount", "double", "Mandatory", "Payout amount requested."],
    ["Currency", "N(3)", "Mandatory", "ISO numeric currency code. Must match the MID currency."],
    ["RecipientFirstName", "string(35)", "Mandatory", "Recipient first name. Must not be all spaces, all zeros, all numerics, or question marks."],
    ["RecipientLastName", "string(35)", "Mandatory", "Recipient last name. Must not be all spaces, all zeros, all numerics, or question marks."],
    ["OutputFormat", "string", "Optional", "Response format. Can be xml or json. Defaults to xml."],
    ["Signature", "BASE64", "Mandatory", "Signed hash for all properties in the command. Must be the last parameter."],
  ],
  request: `IPGmethod=IPGOCT
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
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
  response: `IPGmethod=IPGOCT
OrderID=610F0A8D-7210-4828-B625-C02E843DE7D8
IPGTrnref=20250602110038002328
IPGTrnrefOriginal=20250602110038002328
Status=0
StatusMsg=Success
Signature=<base64-signature>`,
},

  "ipg-reversal": {
    title: "IPGReversal",
    subtitle: "Recurring & back-office",
    description:
      "Cancels a previously executed payment (void).",
    facts: [
      "Back-office void",
      "Uses original transaction reference",
      "Merchant-initiated API call",
    ],
    fields: [
      ...baseRequestFields,
      ...baseBackOfficeFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["IPG_Trnref", "string", "Mandatory", "Transaction reference to reverse."],
      ["Amount", "double", "Mandatory", "Amount to reverse."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["Email", "string", "Optional", "Cardholder email."],
    ],
    request: `IPGmethod=IPGReversal
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=REV-10001
IPG_Trnref=20250416064251147276
Amount=23.45
Currency=978
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGReversal
trnreforiginal=20250416064251147276
trnref=20250417070500123456
status=0
status_msg=Success
Signature=<base64-signature>`,
  },

  "ipg-refund": {
    title: "IPGRefund",
    subtitle: "Recurring & back-office",
    description:
      "Refunds a previously executed payment back to the cardholder.",
    facts: [
      "Back-office credit to cardholder",
      "Uses original transaction reference",
      "Merchant-initiated refund flow",
    ],
    fields: [
      ...baseRequestFields,
      ...baseBackOfficeFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["IPG_Trnref", "string", "Mandatory", "Transaction reference to refund."],
      ["Amount", "double", "Mandatory", "Refund amount."],
      ["Currency", "N(3)", "Mandatory", "Currency code."],
      ["Email", "string", "Optional", "Cardholder email."],
    ],
    request: `IPGmethod=IPGRefund
KeyIndex=1
KeyIndexResp=1
IPGVersion=4.5
Originator=33
MID=000000000000123
OrderID=REF-10001
IPG_Trnref=20250416064251147276
Amount=23.45
Currency=978
OutputFormat=json
Signature=<base64-signature>`,
    response: `method=IPGRefund
trnref=20250417071000123456
amount=23.45
currency=978
status=0
status_msg=Success
Signature=<base64-signature>`,
  },

  "ipg-status": {
    title: "IPGGetTxnStatus",
    subtitle: "Recurring & back-office",
    description:
      "Returns the status and parameters of a previously executed payment.",
    facts: [
      "Back-office transaction lookup",
      "Returns approval + IPG_TrnStatus",
      "Used for diagnostics and reconciliation",
    ],
    fields: [
      ...baseRequestFields,
      ["MID", "AN(15)", "Mandatory", "Virtual terminal identifier."],
      ["OrderID", "string", "Mandatory", "Merchant order identifier."],
      ["OutputFormat", "string", "Optional", "xml or json output. Defaults to xml."],
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
Amount=23.45
Currency=978
OrderID=ORDER-10001
Approval=123456
IPG_Trnref=20250416064251147276
IPG_TrnStatus=100
IPG_TrnStatusMsg=Transaction completed successful
Signature=<base64-signature>`,
  },

  "ipg-modal": {
    title: "IPG Payment Modal",
    subtitle: "Modal",
    description:
      "Embedded payment experience that allows customers to pay without leaving the merchant page.",
    facts: [
      "Mini-application payment flow",
      "Token-driven setup",
      "Supports classic and dark themes",
    ],
    body: [
      "The modal flow starts with a back-end token request. After that, the merchant page loads the IPG payment script with the returned token and chosen theme.",
      "The modal improves checkout continuity by avoiding a full page redirect while still preserving IPG-driven payment collection and processing.",
    ],
    request: `Step 1: Request token with IPGPaymentToken
Step 2: Load payment-modal.js with the returned token`,
    response: `Customer pays inside the modal.
Merchant still receives asynchronous notification data on URL_Notify.`,
  },

  "ipg-payment-token": {
    title: "IPGPaymentToken",
    subtitle: "Modal",
    description:
      "Back-end synchronous request that returns a token used to render the IPG payment modal.",
    facts: [
      "Returns modal token",
      "ModalType controls the underlying payment flow",
      "Supports purchase, recurring, store-card and 3DS stored-card flows",
    ],
    fields: [
      ["ModalType", "string", "Mandatory", "One of: IPGPurchase, IPGFirstRecurring, IPGStoreCard, IPG3DSPurchaseWithStoredCard."],
      ["OutputFormat", "string", "Optional", "xml or json output. Defaults to xml."],
      ["Other original method fields", "varies", "Conditional", "All required properties for the selected ModalType."],
    ],
    request: `IPGmethod=IPGPaymentToken
ModalType=IPGPurchase
OutputFormat=json
...all required IPGPurchase fields except URL_OK and URL_Cancel...
Signature=<base64-signature>`,
    response: `method=IPGPaymentToken
status=0
status_msg=Success
token=<modal-token>
Signature=<base64-signature>`,
  },

  "ipg-response-codes-payingate": {
  title: "Response codes · PayInGate",
  subtitle: "Appendix",
  description:
    "Core IPG response codes returned by PayInGate during payment processing.",
  fields: [
    ["0", "Success", "Returned", "Successful processing."],
    ["1001", "Refer to the issuer", "Returned", "Refer the customer to the issuer."],
    ["1003", "Invalid merchant", "Returned", "Merchant configuration is invalid."],
    ["1005", "Refer to card issuer", "Returned", "Refer to issuer."],
    ["1006", "Refer to card issuer", "Returned", "Refer to issuer."],
    ["1012", "Invalid transaction", "Returned", "Transaction is invalid."],
    ["1013", "Invalid amount", "Returned", "Amount is invalid."],
    ["1014", "Invalid card number", "Returned", "PAN is invalid."],
    ["1015", "Invalid issuer", "Returned", "Issuer is invalid."],
    ["1030", "Format error", "Returned", "Request data has invalid format."],
    ["1039", "No credit account", "Returned", "No credit account available."],
    ["1041", "Lost card", "Returned", "Card reported lost."],
    ["1043", "Stolen card", "Returned", "Card reported stolen."],
    ["1046", "Closed Account", "Returned", "Account is closed."],
    ["1051", "Not sufficient funds", "Returned", "Insufficient funds."],
    ["1054", "Expired card", "Returned", "Card has expired."],
    ["1055", "Invalid PIN", "Returned", "PIN is invalid."],
    ["1057", "Transaction not permitted to cardholder", "Returned", "Cardholder is not allowed to perform this transaction."],
    ["1058", "Restrictions for the customer card", "Returned", "Restrictions apply to the card."],
    ["1059", "Suspected fraud", "Returned", "Fraud suspected."],
    ["1061", "Exceeds approval amount limit", "Returned", "Amount exceeds approval limit."],
    ["1062", "Restricted card", "Returned", "Card is restricted."],
    ["1063", "Security violation", "Returned", "Security rule violation."],
    ["1065", "Exceeds withdrawal frequency limit", "Returned", "Too many withdrawals / uses."],
    ["1070", "Contact card issuer", "Returned", "Customer should contact issuer."],
    ["1072", "Account Not Yet Activated", "Returned", "Account not activated yet."],
    ["1076", "Invalid/nonexistent To Account specified", "Returned", "Target account invalid or missing."],
    ["1077", "Invalid/nonexistent From Account specified", "Returned", "Source account invalid or missing."],
    ["1078", "Invalid/nonexistent account specified (general)", "Returned", "General invalid account case."],
    ["1080", "No financial impact", "Returned", "Used in reversal responses to decline originals."],
    ["1081", "Domestic Debit Transaction Not Allowed", "Returned", "Regional-use restriction."],
    ["1082", "Negative Online CAM dCVV iCVV or CVV results", "Returned", "Negative CVV-related result."],
    ["1083", "Fraud/Security violation", "Returned", "Fraud or security violation."],
    ["1084", "Invalid Authorization Life Cycle", "Returned", "Authorization lifecycle is invalid."],
    ["1086", "PIN Validation not possible Decline", "Returned", "PIN validation could not be performed."],
    ["1089", "Unacceptable PIN—Transaction", "Returned", "PIN-related decline."],
    ["1091", "Authorization Platform or issuer system inoperative", "Returned", "Issuer or authorization platform unavailable."],
    ["1092", "Unable to route transaction Decline", "Returned", "Routing failure."],
    ["1094", "Duplicate transmission detected", "Returned", "Duplicate transaction transmission."],
    ["1096", "System error Decline", "Returned", "System processing error."],
    ["1900", "Additional customer authentication required", "Returned", "Authentication step is required."],
    ["1901", "Incorrect PIN or CVV", "Returned", "PIN or CVV is incorrect."],
    ["1902", "Cash request exceeds issuer or approved limit", "Returned", "Cash amount exceeds allowed limit."],
    ["1903", "Verification data failed", "Returned", "Verification data failed."],
    ["1904", "Transaction not supported", "Returned", "Transaction type is not supported."],
    ["1905", "Blocked by cardholder", "Returned", "Blocked by cardholder action or setting."],
    ["1906", "Stop all future payments", "Returned", "No future payments should be attempted."],
  ],
  request: "These codes are returned as processing response codes from PayInGate.",
  response: "Use them to interpret issuer / gateway-level outcomes for payment authorization and related flows.",
},

"ipg-response-codes-3ds": {
  title: "Response codes · 3DS",
  subtitle: "Appendix",
  description:
    "3DS-specific response codes for authentication and ACS-related outcomes.",
  fields: [
    ["3001", "Card authentication failed", "Returned", "3DS cardholder authentication failed."],
    ["3002", "Unknown device", "Returned", "Device could not be recognized."],
    ["3003", "Unsupported device", "Returned", "Device is not supported."],
    ["3004", "Exceeds authentication frequency limit", "Returned", "Too many authentication attempts."],
    ["3005", "Expired card", "Returned", "Card has expired."],
    ["3006", "Invalid card number", "Returned", "PAN is invalid."],
    ["3007", "Invalid transaction", "Returned", "Transaction is invalid."],
    ["3008", "No Card record", "Returned", "No matching card record."],
    ["3009", "Security failure", "Returned", "Security validation failed."],
    ["3010", "Stolen card", "Returned", "Card reported stolen."],
    ["3011", "Suspected fraud", "Returned", "Fraud suspected."],
    ["3012", "Transaction not permitted to cardholder", "Returned", "Cardholder not permitted."],
    ["3013", "Cardholder not enrolled in service", "Returned", "Not enrolled in 3DS service."],
    ["3014", "Transaction timed out at the ACS", "Returned", "ACS timeout."],
    ["3015", "Low confidence", "Returned", "Low confidence result."],
    ["3016", "Medium confidence", "Returned", "Medium confidence result."],
    ["3017", "High confidence", "Returned", "High confidence result."],
    ["3018", "Very high confidence", "Returned", "Very high confidence result."],
    ["3019", "Exceeds ACS maximum challenges", "Returned", "Too many ACS challenge attempts."],
    ["3020", "Non-Payment transaction non supported", "Returned", "Non-payment transaction not supported."],
    ["3021", "3RI transaction not supported", "Returned", "3RI not supported."],
    ["3022", "ACS technical issue", "Returned", "Technical issue at ACS."],
    ["3023", "Decoupled Authentication required by ACS but not requested by 3DS Requestor", "Returned", "Decoupled auth mismatch."],
    ["3024", "3DS Requestor Decoupled Max Expiry Time exceeded", "Returned", "Decoupled max expiry exceeded."],
    ["3025", "Decoupled Authentication was provided insufficient time", "Returned", "Not enough time for decoupled authentication."],
    ["3026", "Authentication attempted but not performed by the cardholder", "Returned", "Cardholder did not complete authentication."],
    ["3100", "Customer has not returned from ACS", "Returned", "Cardholder did not return from ACS."],
    ["3996", "3DS integrity error", "Returned", "3DS integrity error."],
    ["3997", "Merchant or customer is not enrolled to 3DS", "Returned", "Enrollment issue."],
    ["3998", "3DS unknown status", "Returned", "Unknown 3DS result."],
    ["3999", "3DS communication error", "Returned", "3DS communication failure."],
  ],
  request: "These codes appear in 3DS-specific authentication and challenge flows.",
  response: "Use them to interpret ACS, authentication and enrollment outcomes.",
},

"ipg-response-codes-cardholder": {
  title: "Response codes · Cardholder behavior",
  subtitle: "Appendix",
  description:
    "Codes describing what the cardholder did during the payment flow.",
  fields: [
    ["4001", "Waiting user input", "Returned", "Payment flow is waiting for user interaction."],
    ["4002", "User press cancel on payment page", "Returned", "Cardholder cancelled on the payment page."],
  ],
  request: "These codes reflect cardholder interaction state.",
  response: "Use them to distinguish user-driven interruption from technical or issuer errors.",
},

"ipg-response-codes-process": {
  title: "Response codes · Payment process reasons",
  subtitle: "Appendix",
  description:
    "Intermediate process-state reasons during payment lifecycle handling.",
  fields: [
    ["5001", "Waiting capture", "Returned", "Authorization exists and capture is expected."],
    ["5002", "Waiting reversal", "Returned", "Reversal action is pending."],
    ["5003", "Waiting status check", "Returned", "Further status check is pending."],
  ],
  request: "These codes describe process-state reasons rather than final issuer outcomes.",
  response: "Use them for orchestration and operational status tracking.",
},

"ipg-response-codes-errors": {
  title: "Response codes · Errors",
  subtitle: "Appendix",
  description:
    "Validation, request-processing and callback-related error codes returned by IPG.",
  fields: [
    ["9001", "Missing input parameter", "Returned", "A required input parameter is missing."],
    ["9002", "Check signature failed", "Returned", "Signature validation failed."],
    ["9003", "Internal error", "Returned", "Internal processing error."],
    ["9004", "Invalid MID", "Returned", "MID is invalid."],
    ["9005", "Invalid parameter", "Returned", "Parameter value is invalid."],
    ["9006", "Invalid referer", "Returned", "Referer is invalid."],
    ["9007", "Exceed max tries", "Returned", "Maximum tries exceeded."],
    ["9008", "Failed auth", "Returned", "Authorization failed."],
    ["9009", "Not found original transaction", "Returned", "Original transaction not found."],
    ["9010", "Pending", "Returned", "Transaction is pending."],
    ["9011", "Wrong amount", "Returned", "Amount is invalid or mismatched."],
    ["9012", "Declined", "Returned", "Transaction declined."],
    ["9013", "Transaction is expired", "Returned", "Transaction expired."],
    ["9014", "Invalid card", "Returned", "Card is invalid."],
    ["9015", "Forbidden card scheme", "Returned", "Card scheme is not allowed."],
    ["9016", "Card not found", "Returned", "Card token / card was not found."],
    ["9017", "Card scheme timeout", "Returned", "Timeout at card-scheme side."],
    ["9018", "Get ApplePay session error", "Returned", "Apple Pay session retrieval error."],
    ["9019", "Duplicated transaction", "Returned", "Duplicate transaction detected."],
    ["9020", "Missing PaymentID", "Returned", "PaymentID is missing."],
    ["9021", "Invalid PaymentID", "Returned", "PaymentID is invalid."],
    ["9022", "Invalid card data", "Returned", "Card data is invalid."],
    ["9023", "Security violation", "Returned", "Security rule violation."],
    ["9024", "Reversed", "Returned", "Transaction reversed."],
    ["9025", "Reversal is not allowed for previous OC", "Returned", "Reversal is not allowed for the previous operation."],
    ["9026", "Invalid version", "Returned", "Protocol version is invalid."],
    ["9027", "Invalid method", "Returned", "Method name is invalid."],
    ["9028", "Invalid email", "Returned", "Email address is invalid."],
    ["9029", "Invalid customer identifier", "Returned", "Customer identifier is invalid."],
    ["9030", "Invalid MID name", "Returned", "MID name is invalid."],
    ["9031", "Invalid currency", "Returned", "Currency is invalid."],
    ["9032", "Invalid OrderId", "Returned", "OrderID is invalid."],
    ["9033", "Invalid banner index", "Returned", "Banner index is invalid."],
    ["9034", "Invalid URL", "Returned", "URL is invalid."],
    ["9035", "Invalid note", "Returned", "Note value is invalid."],
    ["9036", "Invalid cardholder name", "Returned", "Cardholder name is invalid."],
    ["9037", "Invalid billing address country", "Returned", "Billing country is invalid."],
    ["9038", "Invalid billing address state", "Returned", "Billing state is invalid."],
    ["9039", "Invalid billing address post code", "Returned", "Billing post code is invalid."],
    ["9040", "Invalid billing address city", "Returned", "Billing city is invalid."],
    ["9041", "Invalid billing address line 1", "Returned", "Billing address line 1 is invalid."],
    ["9042", "Invalid billing address line 2", "Returned", "Billing address line 2 is invalid."],
    ["9043", "Invalid billing address line 3", "Returned", "Billing address line 3 is invalid."],
    ["9044", "Invalid shipping address country", "Returned", "Shipping country is invalid."],
    ["9045", "Invalid shipping address state", "Returned", "Shipping state is invalid."],
    ["9046", "Invalid shipping address post code", "Returned", "Shipping post code is invalid."],
    ["9047", "Invalid shipping address city", "Returned", "Shipping city is invalid."],
    ["9048", "Invalid shipping address line 1", "Returned", "Shipping address line 1 is invalid."],
    ["9049", "Invalid shipping address line 2", "Returned", "Shipping address line 2 is invalid."],
    ["9050", "Invalid shipping address line 3", "Returned", "Shipping address line 3 is invalid."],
    ["9051", "Invalid mobile number", "Returned", "Mobile number is invalid."],
    ["9052", "Invalid token provider", "Returned", "Token provider is invalid."],
    ["9053", "Invalid modal type", "Returned", "Modal type is invalid."],
    ["9054", "Invalid encryption", "Returned", "Encryption data is invalid."],
    ["9055", "Invalid PAN", "Returned", "PAN is invalid."],
    ["9056", "Invalid Card Token", "Returned", "Card token is invalid."],
    ["9057", "Missing 3DS params", "Returned", "Required 3DS parameters are missing."],
    ["9058", "Forbidden token provider", "Returned", "Token provider is forbidden."],
    ["9059", "Invalid embedded payment type", "Returned", "Embedded payment type is invalid."],
    ["9060", "Account platform inoperative", "Returned", "Account platform unavailable."],
    ["9061", "Missing transaction status info", "Returned", "Transaction status information missing."],
    ["9997", "Unknown", "Returned", "Unknown error."],
    ["9998", "Callback error", "Returned", "Callback processing error."],
  ],
  request: "These codes are used for validation, malformed requests, processing failures and callback handling.",
  response: "Use them to identify request-construction problems, environment issues and integration-side callback problems.",
},

  "ipg-modal-form": {
    title: "Create payment form",
    subtitle: "Modal",
    description:
      "Merchant page setup for rendering the IPG payment modal after receiving a token.",
    facts: [
      "Wrapper must have id='ipg'",
      "payment-modal.js is loaded dynamically",
      "Theme can be classic or dark",
    ],
    body: [
      "Use the token returned by IPGPaymentToken to load the modal JavaScript file. The wrapper element must exist on the page before the script is loaded.",
    ],
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
    response: `After successful payment, the merchant receives asynchronous notification on URL_Notify.`,
  },

  "ipg-modal-events": {
    title: "Modal events",
    subtitle: "Modal",
    description:
      "Client-side lifecycle events exposed by the modal implementation.",
    fields: [
      ["ipg.formload.success", "event", "Returned", "Triggered when displaying the payment form."],
      ["ipg.user.cancel", "event", "Returned", "Triggered when the cardholder presses Cancel on the form."],
      ["ipg.payment.success", "event", "Returned", "Triggered when displaying the payment success page."],
      ["ipg.user.close.on.success", "event", "Returned", "Triggered when Close is pressed on the success page."],
      ["ipg.payment.error", "event", "Returned", "Triggered when displaying the payment error page."],
      ["ipg.user.close.on.error", "event", "Returned", "Triggered when Close is pressed on the error page."],
      ["ipg.loadmodal.error", "event", "Returned", "Triggered when displaying the modal loading error page."],
      ["ipg.user.close.on.loadmodal.error", "event", "Returned", "Triggered when Close is pressed on the modal loading error page."],
    ],
    request: `window.addEventListener("ipg.payment.success", handler)`,
    response: `Handle modal success, cancel and error events on the merchant page`,
  },
 
};