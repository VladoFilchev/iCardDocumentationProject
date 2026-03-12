export const wpaMenu = [
  {
    title: "General",
    items: [
      { id: "overview", label: "Overview", type: "overview" },
      { id: "auth", label: "Auth & security", type: "guide" },
      { id: "endpoints", label: "Endpoints", type: "guide" },
      { id: "testing", label: "Testing", type: "guide" },
      { id: "errors", label: "Error codes", type: "guide" },
      { id: "cvc", label: "CVC2/CVV2 result codes", type: "guide" },
      { id: "threed", label: "3D processing", type: "guide" },
    ],
  },
  {
    title: "Commands",
    items: [
      { id: "cmd-601", label: "601 Authorization", type: "post" },
      { id: "cmd-602", label: "602 Reversal", type: "post" },
      { id: "cmd-604", label: "604 First recurring", type: "post" },
      { id: "cmd-605", label: "605 Subsequent recurring", type: "post" },
      { id: "cmd-606", label: "606 Refund transaction", type: "post" },
      { id: "cmd-607", label: "607 Capture", type: "post" },
      { id: "cmd-609", label: "609 Refund from TRN", type: "post" },
      { id: "cmd-611", label: "611 Reversal from TRN", type: "post" },
      { id: "cmd-615", label: "615 Account verification", type: "post" },
      { id: "cmd-617", label: "617 Pre-auth completion by RRN", type: "post" },
      { id: "cmd-618", label: "618 Pre-auth cancellation by RRN", type: "post" },
      { id: "cmd-621", label: "621 Transaction retrieval", type: "post" },
      { id: "cmd-623", label: "623 Pre-authorization request", type: "post" },
      { id: "cmd-624", label: "624 Pre-auth completion by TRN", type: "post" },
      { id: "cmd-625", label: "625 Pre-auth cancellation by TRN", type: "post" },
      { id: "cmd-5000", label: "5000 Connection check", type: "post" },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "xml-wrapper", label: "XML wrapper", type: "schema" },
      { id: "jwt-sample", label: "JWT & headers", type: "schema" },
    ],
  },
];

export const wpaContent = {
  overview: {
    title: "WPA",
    subtitle: "Overview",
    description:
      "Web PayInAPI is the direct server-to-server acquiring interface for e-commerce payments. It supports authorization, recurring flows, refunds, pre-authorizations, capture, retrieval and health checks through XML requests over HTTPS.",
    facts: [
      "Transport: XML over HTTPS",
      "Authentication: JWT + body hash",
      "Model: command-based request / response",
    ],
    body: [
      "WPA is designed for merchants and partners who need deeper control over payment execution on the back end. It is not a hosted checkout page product — it is a direct gateway interface.",
      "The most common flow starts with 601 Authorization, continues with 607 Capture when needed, and uses 602 Reversal when communication breaks or a transaction must be voided.",
      "The explorer below follows an API-explorer style layout: navigation on the left, detailed content in the middle, and live request/response snippets on the right.",
    ],
    request: `POST /Authorization HTTP/1.1
User-ID: Partner1
Body_hash: <sha256-body-hash>
Authorization: Bearer <signed-jwt>
Content-Type: application/xml
APIVersion: 1.0`,
    response: `200 OK`,
  },

  auth: {
    title: "Auth & security",
    subtitle: "General",
    description:
      "WPA uses HTTPS, shared-secret integrity hashing and JWT signing for request authentication.",
    facts: [
      "Minimum TLS 1.2",
      "JWT signed with HS256",
      "Body hash included in JWT and header",
    ],
    body: [
      "Each request contains a User-ID, a Body_hash header and an Authorization bearer token. The token contains body_hash, iss, iat, exp and key index information.",
      "The XML body is hashed and the resulting SHA256 value is used both as a request header and inside the JWT payload. This protects request integrity.",
      "Sandbox and production use separate usernames and shared secrets.",
    ],
    request: `POST /Authorization HTTP/1.1
User-ID: Partner1
Body_hash: c55cc51b1896482f216fb24ca37107c5f21da8ee4d53a2cf2bc15ea5d50b1d95
Authorization: Bearer <signed-jwt>
Content-Type: application/xml
APIVersion: 1.0`,
    response: `{
  "iss": "Partner1",
  "iat": 1639042551,
  "exp": 1639042581,
  "kix": "1",
  "body_hash": "c55cc51b1896482f216fb24ca37107c5f21da8ee4d53a2cf2bc15ea5d50b1d95"
}`,
  },

  endpoints: {
    title: "Endpoints",
    subtitle: "General",
    description:
      "Partner-to-iCard WPA requests are sent via HTTP POST with XML payloads.",
    facts: [
      "Sandbox: webpayin.sandbox.apicard.direct/v1",
      "Production: webjwtin0.icard.com/v1",
      "Method: POST application/xml",
    ],
    body: [
      "All commands are sent to the WPA authorization entry point with command-specific XML in the body.",
      "The interface uses the same request framing model across the supported command set.",
    ],
    request: `<ipayin_request>
  <command>NNN</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
</ipayin_request>`,
    response: `<ipayin_response>
  <command>NNN</command>
  <status>0</status>
  <status_msg>Command completed successfully</status_msg>
</ipayin_response>`,
  },

  testing: {
    title: "Testing",
    subtitle: "General",
    description:
      "Use sandbox credentials, future expiry dates and the provided test cards and MIDs.",
    facts: [
      "Use future expiry date",
      "Use 000 as CVC in test mode",
      "Use matching MID for currency",
    ],
    body: [
      "Typical test cards include MasterCard, VISA, VISA Electron, Maestro and VPay test profiles with approval and decline behavior.",
      "Use the proper test MID for the transaction currency. The documentation lists examples for EUR, BGN, USD, GBP, RON and CHF.",
    ],
    request: `MasterCard: 5326100000000004
VISA: 4006090000000007
VISA Electron: 4002880000000005`,
    response: `Approved / Declined according to card profile`,
  },

  errors: {
    title: "Error codes",
    subtitle: "General",
    description:
      "status=0 means the command executed successfully at protocol level, but for approval-bearing commands you must still inspect resp_code.",
    facts: [
      "status 0 = command completed",
      "resp_code 00 / 85 can indicate approval",
      "status > 0 should be treated as not approved",
    ],
    body: [
      "Do not treat status 0 alone as payment approval for commands that return issuer-level result codes. Always evaluate resp_code where applicable.",
      "For commands like 601, 604, 605, 606, 609 and 615, resp_code is part of the business outcome.",
    ],
    request: `status = 0
resp_code = 00`,
    response: `status = 7  -> transaction not found
status = 9  -> duplicated transmission`,
  },

  cvc: {
    title: "CVC2/CVV2 result codes",
    subtitle: "General",
    description:
      "For commands such as 601 and 604, cvc2_result may be returned.",
    facts: ["M = match", "N = no match", "U = unverified"],
    body: [
      "These values help interpret the verification result for the card security code.",
      "The documented values include M, N, P, U and S.",
    ],
    request: `<cvc2_result>M</cvc2_result>`,
    response: `M = match
N = no match
P = not processed
U = unverified
S = should be on card`,
  },

  threed: {
    title: "3D processing",
    subtitle: "General",
    description:
      "Only 3D-enabled MIDs can process 3D transactions through WPA.",
    facts: [
      "3D-enabled MID required",
      "3D-disabled MID will decline 3D transactions",
      "Merchant registration is monitored",
    ],
    body: [
      "3D-related fields such as eci, avv, xid, program_protocol and ds_transaction_id appear on commands that support 3DS flows.",
      "The partner is responsible for ensuring the merchant configuration is aligned with 3D processing requirements.",
    ],
    request: `<program_protocol>2</program_protocol>
<eci>5</eci>
<avv>...</avv>
<xid>...</xid>`,
    response: `3DS-related outcome is reflected in the processed command response`,
  },

  "cmd-601": {
    title: "601 Authorization",
    subtitle: "Command",
    description:
      "Main direct card authorization command for server-side payment processing.",
    facts: [
      "Primary payment command",
      "Use 602 if reply is missing",
      "Usually followed by 607 Capture",
    ],
    fields: [
      { name: "pan", type: "string", requirement: "Mandatory", description: "Card number (PAN)." },
      { name: "expdt", type: "string", requirement: "Mandatory", description: "Expiry date in YYMM." },
      { name: "cvc2", type: "string", requirement: "Mandatory", description: "Card security code." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Transaction amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "ISO numeric currency code." },
      { name: "payment_ref", type: "string", requirement: "Mandatory", description: "Merchant payment reference." },
      { name: "customer_ip", type: "string", requirement: "Mandatory", description: "Cardholder IP address." },
      { name: "customer_credentials", type: "string", requirement: "Mandatory", description: "Customer identifier at checkout." },
      { name: "stored_credential_ind", type: "number", requirement: "Optional", description: "Stored credential / one-click indicator." },
      { name: "program_protocol", type: "number", requirement: "Optional", description: "3DS program protocol version." },
      { name: "ds_transaction_id", type: "string", requirement: "Optional", description: "Directory Server transaction ID." },
      { name: "sca_exemption", type: "string", requirement: "Optional", description: "Applied SCA exemption." },
      { name: "eci", type: "number", requirement: "Optional", description: "Electronic commerce indicator." },
      { name: "avv", type: "string", requirement: "Optional", description: "UCAF / AVV / AEVV value." },
      { name: "xid", type: "string", requirement: "Optional", description: "Base64 XID." },
      { name: "token_indicator", type: "number", requirement: "Optional", description: "Tokenized-card initiation indicator." },
      { name: "token_requestor_id", type: "number", requirement: "Optional", description: "Token requestor identifier." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>601</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <pan>5326000000000000</pan>
  <expdt>1306</expdt>
  <cvc2>818</cvc2>
  <mid>000000000099999</mid>
  <amount>1.01</amount>
  <currency>978</currency>
  <payment_ref>ORDER-10001</payment_ref>
  <customer_ip>10.20.30.40</customer_ip>
  <customer_credentials>customer@merchant.com</customer_credentials>
  <program_protocol>2</program_protocol>
  <ds_transaction_id></ds_transaction_id>
  <eci>5</eci>
  <avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>
  <xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>
</ipayin_request>`,
    response: `<?xml version="1.0" encoding="windows-1251"?>
<ipayin_response>
  <command>601</command>
  <trn>20130331141516123456</trn>
  <trndttm>2011-03-01 12:34:56</trndttm>
  <stan>999999</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <resp_code>00</resp_code>
  <approval>136615</approval>
  <cvc2_result>M</cvc2_result>
  <status>0</status>
  <status_msg>Command completed successfully</status_msg>
  <status_details></status_details>
</ipayin_response>`,
  },

  "cmd-602": {
    title: "602 Reversal",
    subtitle: "Command",
    description:
      "Reverses a previous transaction when communication breaks or the transaction must be voided.",
    facts: [
      "Recovery command",
      "Repeat until status 0, 7 or 9",
      "Used after missing response",
    ],
    fields: [
      { name: "original_stan", type: "string", requirement: "Mandatory", description: "Original request STAN." },
      { name: "original_dttm", type: "string", requirement: "Mandatory", description: "Original request timestamp." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>602</command>
  <stan>111112</stan>
  <dttm>2011-03-01 12:35:20</dttm>
  <original_stan>111111</original_stan>
  <original_dttm>2011-03-01 12:34:55</original_dttm>
  <mid>000000000099999</mid>
</ipayin_request>`,
    response: `status = 0  -> success
status = 7  -> original transaction not found
status = 9  -> duplicated transmission`,
  },

  "cmd-604": {
    title: "604 First recurring transaction",
    subtitle: "Command",
    description:
      "Creates the first transaction in a recurring agreement or recurring sign-up flow.",
    facts: [
      "Initial recurring payment",
      "Can include 3DS fields",
      "Usually followed by 607 Capture",
    ],
    fields: [
      { name: "pan", type: "string", requirement: "Mandatory", description: "Card number." },
      { name: "expdt", type: "string", requirement: "Mandatory", description: "Expiry date." },
      { name: "cvc2", type: "string", requirement: "Mandatory", description: "Card security code." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Recurring or agreement setup amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "payment_ref", type: "string", requirement: "Mandatory", description: "Reference." },
      { name: "customer_ip", type: "string", requirement: "Mandatory", description: "Customer IP." },
      { name: "customer_credentials", type: "string", requirement: "Mandatory", description: "Customer identifier." },
      { name: "dynamic_descriptor", type: "string", requirement: "Optional", description: "Optional descriptor." },
      { name: "recurring_type", type: "string", requirement: "Mandatory", description: "R = recurring, C = credential-on-file." },
      { name: "program_protocol", type: "number", requirement: "Optional", description: "3DS program protocol version." },
      { name: "ds_transaction_id", type: "string", requirement: "Optional", description: "Directory Server transaction ID." },
      { name: "eci", type: "number", requirement: "Optional", description: "ECI value." },
      { name: "avv", type: "string", requirement: "Optional", description: "AVV/UCAF/AEVV value." },
      { name: "xid", type: "string", requirement: "Optional", description: "Base64 XID." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>604</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <pan>5326000000000000</pan>
  <expdt>1306</expdt>
  <cvc2>818</cvc2>
  <mid>000000000099999</mid>
  <amount>1.01</amount>
  <currency>978</currency>
  <payment_ref>ABCD123456</payment_ref>
  <customer_ip>10.20.30.40</customer_ip>
  <customer_credentials>customer@mywebsite.com</customer_credentials>
  <recurring_type>R</recurring_type>
  <program_protocol>2</program_protocol>
  <ds_transaction_id></ds_transaction_id>
  <eci>5</eci>
  <avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>
  <xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>
</ipayin_request>`,
    response: `resp_code and approval are returned on success.
cvc2_result may also be present.
After approval, follow with 607 Capture.`,
  },

  "cmd-605": {
    title: "605 Subsequent recurring transaction",
    subtitle: "Command",
    description:
      "Processes the next recurring charge using the TRN of the first recurring transaction.",
    facts: [
      "TRN-based recurring charge",
      "Back-end repeat billing",
      "Usually followed by 607 Capture",
    ],
    fields: [
      { name: "trn", type: "string", requirement: "Mandatory", description: "TRN from first recurring transaction." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Recurring amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "payment_ref", type: "string", requirement: "Mandatory", description: "Reference." },
      { name: "customer_credentials", type: "string", requirement: "Mandatory", description: "Customer identifier." },
      { name: "recurring_type", type: "string", requirement: "Mandatory", description: "R or C." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>605</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <trn>20130331141516123456</trn>
  <mid>000000000099999</mid>
  <amount>1.01</amount>
  <currency>978</currency>
  <payment_ref>ABCD123456</payment_ref>
  <customer_credentials>customer@mywebsite.com</customer_credentials>
  <recurring_type>R</recurring_type>
</ipayin_request>`,
    response: `resp_code and approval are returned on success.
After approval, follow with 607 Capture.`,
  },

  "cmd-606": {
    title: "606 Refund transaction",
    subtitle: "Command",
    description:
      "Refunds a cardholder account using PAN and expiry details.",
    facts: [
      "Card-based refund",
      "Can require 602 on broken communication",
      "Often followed by 607 Capture in the documented processing model",
    ],
    fields: [
      { name: "pan", type: "string", requirement: "Mandatory", description: "Card number." },
      { name: "expdt", type: "string", requirement: "Mandatory", description: "Expiry date." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Refund amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "payment_ref", type: "string", requirement: "Mandatory", description: "Reference." },
      { name: "customer_credentials", type: "string", requirement: "Mandatory", description: "Customer identifier." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>606</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <pan>5326000000000000</pan>
  <expdt>1306</expdt>
  <mid>000000000000044</mid>
  <amount>1.01</amount>
  <currency>978</currency>
  <payment_ref>ABCD123456</payment_ref>
  <customer_credentials>customer@mywebsite.com</customer_credentials>
</ipayin_request>`,
    response: `resp_code and approval are returned on success.`,
  },

  "cmd-607": {
    title: "607 Capture",
    subtitle: "Command",
    description:
      "Confirms an approved transaction for clearing.",
    facts: [
      "Clearing confirmation",
      "Used after approval-bearing commands",
      "Repeat on broken communication until status 0 or 9",
    ],
    fields: [
      { name: "trn", type: "string", requirement: "Mandatory", description: "Original transaction reference number." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Capture amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "approval", type: "string", requirement: "Mandatory", description: "Approval code from previous response." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>607</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <trn>20130331141516123456</trn>
  <mid>000000000000044</mid>
  <amount>1.01</amount>
  <currency>978</currency>
  <approval>136615</approval>
</ipayin_request>`,
    response: `On success, original_trn is returned.
Repeat until status 0 or 9 if communication breaks.`,
  },

  "cmd-609": {
    title: "609 Refund from TRN",
    subtitle: "Command",
    description:
      "Refunds a transaction using the original TRN instead of resending card parameters.",
    facts: [
      "TRN-based refund",
      "Uses original approval code",
      "Documented as part of clearing-oriented flow",
    ],
    fields: [
      { name: "trn", type: "string", requirement: "Mandatory", description: "Original transaction TRN." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Refund amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "approval", type: "string", requirement: "Mandatory", description: "Original approval code." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>609</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <trn>20130331141516123456</trn>
  <mid>000000000000044</mid>
  <amount>1.01</amount>
  <currency>978</currency>
  <approval>136615</approval>
</ipayin_request>`,
    response: `resp_code and approval are returned on success.`,
  },

  "cmd-611": {
    title: "611 Reversal from TRN",
    subtitle: "Command",
    description:
      "Reverses a previous transaction using its TRN.",
    facts: [
      "TRN-based reversal",
      "Recovery / void style flow",
      "Retry logic matches 602",
    ],
    fields: [
      { name: "trn", type: "string", requirement: "Mandatory", description: "Original transaction TRN." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>611</command>
  <stan>111111</stan>
  <dttm>2013-03-01 12:34:55</dttm>
  <trn>20130331141516123456</trn>
</ipayin_request>`,
    response: `resp_code may be returned with status 0.`,
  },

  "cmd-615": {
    title: "615 Account verification",
    subtitle: "Command",
    description:
      "Zero-amount account verification used with supported card schemes.",
    facts: [
      "Zero-value verification",
      "Used for Mastercard and Visa",
      "resp_code 85 is common on success",
    ],
    fields: [
      { name: "pan", type: "string", requirement: "Mandatory", description: "Card number." },
      { name: "expdt", type: "string", requirement: "Mandatory", description: "Expiry date." },
      { name: "cvc2", type: "string", requirement: "Mandatory", description: "Card security code." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "payment_ref", type: "string", requirement: "Mandatory", description: "Reference." },
      { name: "stored_credential_ind", type: "number", requirement: "Optional", description: "Stored credential setup indicator." },
      { name: "program_protocol", type: "number", requirement: "Optional", description: "3DS program protocol." },
      { name: "ds_transaction_id", type: "string", requirement: "Optional", description: "Directory Server transaction ID." },
      { name: "eci", type: "number", requirement: "Optional", description: "ECI value." },
      { name: "avv", type: "string", requirement: "Optional", description: "AVV/UCAF value." },
      { name: "xid", type: "string", requirement: "Optional", description: "Base64 XID." },
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>615</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <pan>4987000000000000</pan>
  <expdt>1306</expdt>
  <cvc2>818</cvc2>
  <mid>000000000099999</mid>
  <currency>978</currency>
  <payment_ref>ABCD123456</payment_ref>
  <program_protocol>2</program_protocol>
  <eci>5</eci>
  <avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>
  <xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>
</ipayin_request>`,
    response: `Successful account verification commonly returns resp_code 85, approval and cvc2_result.`,
  },

  "cmd-617": {
    title: "617 Pre-auth completion by RRN",
    subtitle: "Command",
    description:
      "Completes a pre-authorization using the RRN from the original response.",
    facts: [
      "RRN-based completion",
      "Moves held funds toward settlement",
      "Back-office completion flow",
    ],
    fields: [
      { name: "rrn", type: "string", requirement: "Mandatory", description: "RRN from the pre-authorization response." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Completion amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "approval", type: "string", requirement: "Mandatory", description: "Approval code from original authorization." },
    ],
    request: `<?xml version="1.0" encoding="windows-1251"?>
<iserver_request>
  <command>617</command>
  <stan>111111</stan>
  <dttm>2023-10-16 14:25:00</dttm>
  <rrn>328914233998</rrn>
  <mid>000000000000112</mid>
  <amount>1.49</amount>
  <currency>978</currency>
  <approval>0B396A</approval>
</iserver_request>`,
    response: `Response may include settlement details, network, resp_code, original_trn and rrn.`,
  },

  "cmd-618": {
    title: "618 Pre-auth cancellation by RRN",
    subtitle: "Command",
    description:
      "Cancels a pre-authorization hold using the RRN of the original authorization.",
    facts: [
      "RRN-based cancellation",
      "Releases held amount",
      "Pre-auth reversal style flow",
    ],
    fields: [
      { name: "rrn", type: "string", requirement: "Mandatory", description: "RRN from the pre-authorization response." },
    ],
    request: `<?xml version="1.0" encoding="windows-1251"?>
<iserver_request>
  <command>618</command>
  <stan>000009</stan>
  <dttm>2023-10-17 14:38:39</dttm>
  <rrn>328914233998</rrn>
</iserver_request>`,
    response: `Response may include original_trn, resp_code and rrn.`,
  },

  "cmd-621": {
    title: "621 Transaction retrieval",
    subtitle: "Command",
    description:
      "Retrieves data for an already processed request to support diagnostics, reconciliation and uncertain transaction states.",
    facts: [
      "Operational lookup",
      "Useful for support and reconciliation",
      "Can expose original transaction state flags",
    ],
    fields: [
      { name: "original_trn", type: "string", requirement: "Mandatory", description: "TRN of the original transaction." },
      { name: "original_dttm", type: "string", requirement: "Optional", description: "Original transaction timestamp." },
      { name: "original_stan", type: "string", requirement: "Optional", description: "Original request STAN." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
    ],
    request: `Use 621 when merchant-side state is uncertain and you need to verify the original payment outcome before deciding whether to retry, reverse, capture, refund or reconcile.`,
    response: `The response can expose rrn, tid, mid, PAN, amounts, original_resp_code and flags such as original_is_reversed, original_is_completed and original_is_captured.`,
  },

  "cmd-623": {
    title: "623 Pre-authorization request",
    subtitle: "Command",
    description:
      "Authorizes and reserves funds on a card for a later sale.",
    facts: [
      "Hold funds",
      "Not debited until completion",
      "Supports 3DS-related fields",
    ],
    fields: [
      { name: "pan", type: "string", requirement: "Mandatory", description: "Card number." },
      { name: "expdt", type: "string", requirement: "Mandatory", description: "Expiry date." },
      { name: "cvc2", type: "string", requirement: "Mandatory", description: "Card security code." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Requested amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "payment_ref", type: "string", requirement: "Mandatory", description: "Reference." },
      { name: "customer_ip", type: "string", requirement: "Mandatory", description: "Customer IP." },
      { name: "customer_credentials", type: "string", requirement: "Mandatory", description: "Customer identity." },
      { name: "eci", type: "number", requirement: "Optional", description: "ECI value." },
      { name: "avv", type: "string", requirement: "Optional", description: "AVV/UCAF/AEVV value." },
      { name: "xid", type: "string", requirement: "Optional", description: "Base64 XID." },
      { name: "program_protocol", type: "number", requirement: "Optional", description: "3DS program protocol version." },
      { name: "ds_transaction_id", type: "string", requirement: "Optional", description: "Directory Server transaction ID." },
      { name: "stored_credential_ind", type: "number", requirement: "Optional", description: "Stored credential setup indicator." },
    ],
    request: `<?xml version="1.0" encoding="windows-1251"?>
<iserver_request>
  <command>623</command>
  <stan>111111</stan>
  <dttm>2023-09-01 12:17:56</dttm>
  <pan>5326100000000004</pan>
  <expdt>2411</expdt>
  <cvc2>999</cvc2>
  <mid>000000000000112</mid>
  <amount>1.99</amount>
  <currency>978</currency>
  <payment_ref>ABCD123456</payment_ref>
  <customer_ip>10.20.30.40</customer_ip>
  <customer_credentials>customer@mywebsite.com</customer_credentials>
  <eci>5</eci>
  <avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>
  <xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>
  <program_protocol>2</program_protocol>
  <ds_transaction_id></ds_transaction_id>
</iserver_request>`,
    response: `Response may include trn, approval, rrn, settlement metadata, network, cvc2_result and resp_code.`,
  },

  "cmd-624": {
    title: "624 Pre-auth completion by TRN",
    subtitle: "Command",
    description:
      "Completes a pre-authorization using the original TRN.",
    facts: [
      "TRN-based completion",
      "Settlement follow-up",
      "Paired with 623",
    ],
    fields: [
      { name: "trn", type: "string", requirement: "Mandatory", description: "TRN from pre-authorization response." },
      { name: "mid", type: "string", requirement: "Mandatory", description: "Merchant ID." },
      { name: "amount", type: "decimal", requirement: "Mandatory", description: "Completion amount." },
      { name: "currency", type: "string", requirement: "Mandatory", description: "Currency code." },
      { name: "approval", type: "string", requirement: "Mandatory", description: "Approval code from original authorization." },
    ],
    request: `<?xml version="1.0" encoding="windows-1251"?>
<iserver_request>
  <command>624</command>
  <stan>111111</stan>
  <dttm>2023-10-16 12:16:41</dttm>
  <trn>20231016121524233981</trn>
  <mid>000000000000112</mid>
  <amount>1.75</amount>
  <currency>978</currency>
  <approval>VISSIM</approval>
</iserver_request>`,
    response: `Response may include settlement metadata, original_trn and rrn.`,
  },

  "cmd-625": {
    title: "625 Pre-auth cancellation by TRN",
    subtitle: "Command",
    description:
      "Cancels a pre-authorization hold using the original TRN.",
    facts: [
      "TRN-based cancellation",
      "Releases reserved amount",
      "Paired with 623",
    ],
    fields: [
      { name: "trn", type: "string", requirement: "Mandatory", description: "TRN from the pre-authorization response." },
    ],
    request: `<?xml version="1.0" encoding="windows-1251"?>
<iserver_request>
  <command>625</command>
  <stan>111111</stan>
  <dttm>2023-10-16 13:04:11</dttm>
  <trn>20231016130328233987</trn>
</iserver_request>`,
    response: `Response may include settlement metadata, original_trn, resp_code and rrn.`,
  },

  "cmd-5000": {
    title: "5000 Connection check",
    subtitle: "Command",
    description:
      "Connectivity and health-check command for the WEB PAY-IN interface.",
    facts: [
      "Health check",
      "No business transaction created",
      "status 0 means interface is reachable",
    ],
    fields: [],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>5000</command>
</ipayin_request>`,
    response: `<?xml version="1.0" encoding="windows-1251"?>
<ipayin_response>
  <command>5000</command>
  <status>0</status>
  <status_msg>Command completed successfully</status_msg>
  <status_details></status_details>
</ipayin_response>`,
  },

  "xml-wrapper": {
    title: "XML wrapper",
    subtitle: "Reference",
    description:
      "All WPA requests and responses use the standard XML wrapper structure.",
    facts: [
      "Lowercase property names",
      "Request wrapper: ipayin_request",
      "Response wrapper: ipayin_response",
    ],
    body: [
      "The wrapper format remains stable across the command set and is the basis for request generation and response parsing.",
    ],
    request: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_request>
  <command>NNN</command>
  <stan>111111</stan>
  <dttm>2011-03-01 12:34:55</dttm>
</ipayin_request>`,
    response: `<?xml version="1.0" encoding="Windows-1251"?>
<ipayin_response>
  <command>NNN</command>
  <trn>20130331141516123456</trn>
  <trndttm>2011-03-01 12:34:56</trndttm>
  <stan>999999</stan>
  <dttm>2011-03-01 12:34:55</dttm>
  <status>NN</status>
  <status_msg>Status Message text</status_msg>
  <status_details>Status details text</status_details>
</ipayin_response>`,
  },

  "jwt-sample": {
    title: "JWT & headers",
    subtitle: "Reference",
    description:
      "JWT contains header.payload.signature and includes body_hash calculated from the XML body.",
    facts: [
      "HS256 signing",
      "body_hash included in payload",
      "Same hash reflected in request header",
    ],
    body: [
      "JWT is a central part of WPA authentication and must match the current request body.",
    ],
    request: `{
  "iss": "Partner1",
  "iat": 1639042551,
  "exp": 1639042581,
  "kix": "1",
  "body_hash": "c55cc51b1896482f216fb24ca37107c5f21da8ee4d53a2cf2bc15ea5d50b1d95"
}`,
    response: `User-ID: Partner1
Body_hash: c55cc51b1896482f216fb24ca37107c5f21da8ee4d53a2cf2bc15ea5d50b1d95
Authorization: Bearer <signed-jwt>
Content-Type: application/xml
APIVersion: 1.0`,
  },
};