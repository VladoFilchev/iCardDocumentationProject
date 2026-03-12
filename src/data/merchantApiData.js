export const merchantApiMenu = [
  {
    title: "General",
    items: [
      { id: "merchant-overview", label: "Overview", type: "overview" },
      { id: "merchant-environments", label: "Environments", type: "guide" },
      { id: "merchant-api-definition", label: "API definition", type: "guide" },
      { id: "merchant-auth", label: "Authentication", type: "guide" },
      { id: "merchant-csr", label: "CSR signing", type: "guide" },
      { id: "merchant-oauth", label: "OAuth2 credentials", type: "guide" },
      { id: "merchant-token", label: "Token generation", type: "post" },
      { id: "merchant-revoke", label: "Token revocation", type: "post" },
      { id: "merchant-status-codes", label: "Response status codes", type: "schema" },
    ],
  },
  {
    title: "Companies & merchants",
    items: [
      { id: "merchant-get-company-list", label: "GetCompanyList/v2", type: "post" },
      { id: "merchant-create-merchant", label: "CreateMerchant/v2", type: "post" },
      { id: "merchant-get-merchant-list", label: "GetMerchantList/v2", type: "post" },
    ],
  },
  {
    title: "Terminals",
    items: [
      { id: "merchant-create-terminal", label: "CreateTerminal/v2", type: "post" },
      { id: "merchant-get-terminal-list", label: "GetTerminalList/v2", type: "post" },
    ],
  },
];

export const merchantApiContent = {
  "merchant-overview": {
    title: "Merchant API",
    subtitle: "Overview",
    description:
      "Merchant API is the onboarding and listing interface used to create and retrieve the operational objects needed for Host 2 Host transaction processing.",
    facts: [
      "JSON over HTTPS",
      "OAuth2 client credentials",
      "Merchant and Terminal creation",
    ],
    body: [
      "The documented hierarchy is Partner → Company → Merchant → Terminal. Through the API, only the two lowest-level objects can be created: Merchant and Terminal. Partner and Company are created by iCard BackOffice because they require additional screening. :contentReference[oaicite:1]{index=1}",
      "The API is synchronous, uses TLS 1.2, exchanges data in JSON format, and returns a response wrapper with `response.status` for all calls. Status values are 0 for success, 1 for no data found, 2 for other error, and 3 for invalid input parameter. :contentReference[oaicite:2]{index=2}",
    ],
    request: `Objects hierarchy
Partner -> Company -> Merchant -> Terminal

Creatable through API:
- Merchant
- Terminal`,
    response: `{
  "response": {
    "status": 0,
    "data": {
      "terminal_id": "90001234",
      "status": 0
    }
  }
}`,
  },

  "merchant-environments": {
    title: "Environments",
    subtitle: "General",
    description:
      "Merchant API uses separate sandbox and production domains, while keeping the same endpoint paths in both environments.",
    facts: [
      "Sandbox + production",
      "Same endpoint paths",
      "HTTPS only",
    ],
    body: [
      "Production environment: `https://i1.merchant.api.icard.com` and sandbox environment: `https://sandbox.merchant.api.icard.com`. The endpoint paths are the same in both environments. :contentReference[oaicite:3]{index=3}",
    ],
    request: `Production:
https://i1.merchant.api.icard.com

Sandbox:
https://sandbox.merchant.api.icard.com`,
    response: `Use the same endpoint path suffix in both environments.`,
  },

  "merchant-api-definition": {
    title: "API definition",
    subtitle: "General",
    description:
      "Merchant API works over HTTPS with TLS 1.2 and exchanges JSON payloads.",
    facts: [
      "TLS 1.2",
      "JSON payloads",
      "Synchronous processing",
    ],
    body: [
      "The API uses HTTPS with TLS 1.2 encryption and OAuth 2.0 authentication, with exchanged data in JSON format. It is synchronous and always returns request status and result. :contentReference[oaicite:4]{index=4}",
      "Every message contains a `response` section and the `status` tag is always placed at first level under `response`. If the request is successful, an additional `data` section is returned. :contentReference[oaicite:5]{index=5}",
    ],
    request: `Content-Type: application/json
Authorization: Bearer <token>`,
    response: `{
  "response": {
    "status": 0,
    "data": []
  }
}`,
  },

  "merchant-auth": {
    title: "Authentication",
    subtitle: "General",
    description:
      "Before calling the operational endpoints, the client must authenticate with certificate, OAuth2 credentials and bearer token.",
    facts: [
      "CSR + certificate",
      "Client ID + Client Secret",
      "Bearer token",
    ],
    body: [
      "The authentication flow described in the document is: CSR signing, obtaining OAuth2 credentials from iCard Direct, generating token with client credentials flow, and then using the token in the Authorization header as Bearer for all other endpoints. ",
    ],
    request: `Authentication flow
1. Generate CSR
2. Receive signed certificate from iCard
3. Generate Client ID / Client Secret
4. Request OAuth2 token
5. Use Bearer token on API calls`,
    response: `Authorization: Bearer <access_token>`,
  },

  "merchant-csr": {
    title: "CSR signing",
    subtitle: "General",
    description:
      "The client must generate and submit a CSR before using the API.",
    facts: [
      "Public key included",
      "Signed by iCard",
      "Used alongside OAuth2",
    ],
    body: [
      "Before API communication starts, the client generates and submits a Certificate Signing Request containing public key and identifying information. iCard signs it and returns a client certificate, which must be installed or stored securely on the client side. This certificate is used alongside OAuth2 credentials for secure authenticated communication. :contentReference[oaicite:7]{index=7}",
    ],
    request: `CSR -> iCard -> signed client certificate`,
    response: `Signed certificate is stored on the client application side.`,
  },

  "merchant-oauth": {
    title: "OAuth2 credentials",
    subtitle: "General",
    description:
      "OAuth2 credentials are generated through the iCard Direct platform.",
    facts: [
      "Client ID",
      "Client Secret",
      "Old credentials become invalid immediately",
    ],
    body: [
      "After certificate signing, the client obtains `Client ID` and `Client Secret` from iCard Direct. Production environment uses `https://icard.direct` and sandbox uses `https://sandbox-direct.icards.eu`. Credentials are generated from the `API Credentials` tab. When new credentials are generated, the old ones become invalid immediately. :contentReference[oaicite:8]{index=8}",
    ],
    request: `Login -> API Credentials -> Generate API Credentials`,
    response: `Client ID + Client Secret`,
  },

  "merchant-token": {
    title: "Token generation",
    subtitle: "General",
    description:
      "Token generation uses OAuth2 client credentials grant.",
    facts: [
      "POST /token/v2",
      "application/x-www-form-urlencoded",
      "scope=webhooks",
    ],
    fields: [
      ["Content-Type", "header", "Mandatory", "Must be application/x-www-form-urlencoded."],
      ["Authorization", "header", "Mandatory", "Basic <base64(client_id:client_secret)>."],
      ["grant_type", "body", "Mandatory", "Must be client_credentials."],
      ["scope", "body", "Mandatory", "Must be webhooks."],
    ],
    body: [
      "The API currently supports only `client credentials` grant type for token generation. After the token is obtained, it must be provided to all other endpoints in the Authorization header as Bearer. :contentReference[oaicite:9]{index=9}",
    ],
    request: `POST /token/v2
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <base64(client_id:client_secret)>

grant_type=client_credentials&scope=webhooks`,
    response: `{
  "token_type": "Bearer",
  "expires_in": 86400,
  "access_token": "<token>"
}`,
  },

  "merchant-revoke": {
    title: "Token revocation",
    subtitle: "General",
    description:
      "The documentation includes token revocation as part of the OAuth2 flow.",
    facts: [
      "OAuth lifecycle",
      "Session control",
      "Bearer-token management",
    ],
    body: [
      "Token revocation is listed as part of the authentication section after token generation, so the Merchant API flow includes both token issuance and token invalidation lifecycle handling. :contentReference[oaicite:10]{index=10}",
    ],
    request: `Use the documented revocation endpoint and bearer-token lifecycle controls.`,
    response: `Revoked token should no longer be used for operational API calls.`,
  },

  "merchant-status-codes": {
    title: "Response status codes",
    subtitle: "General",
    description:
      "All endpoints use the same top-level response status values.",
    table: {
      headers: ["Status", "Meaning"],
      rows: [
        ["0", "Request was executed successfully"],
        ["1", "No data found"],
        ["2", "Other error. Contact iCard."],
        ["3", "Invalid input parameter. Check error -> message for more info."],
      ],
    },
    request: `{
  "response": {
    "status": 0
  }
}`,
    response: `Use response.status first, then inspect response.data or error details.`,
  },

  "merchant-get-company-list": {
    title: "GetCompanyList/v2",
    subtitle: "Companies & merchants",
    description:
      "Returns the list of companies accessible to the authenticated client.",
    facts: [
      "Listing endpoint",
      "Company-level filter context",
      "JSON response array",
    ],
    fields: [
      ["company_id", "number", "Optional", "Company filter when operating on Partner level; ignored on Company level."],
    ],
    request: `GET /GetCompanyList/v2?company_id=1
Content-Type: application/json
Authorization: Bearer <token>`,
    response: `{
  "response": {
    "status": 0,
    "data": [
      {
        "company_id": 1,
        "name": "Company Name"
      }
    ]
  }
}`,
  },

  "merchant-create-merchant": {
    title: "CreateMerchant/v2",
    subtitle: "Companies & merchants",
    description:
      "Creates a merchant object under the relevant company context.",
    facts: [
      "POST JSON endpoint",
      "Returns 15-digit merchant_id",
      "Supports ecommerce and non-ecommerce merchant modes",
    ],
    fields: [
      ["company_id", "number", "Mandatory*", "Mandatory when operating on Partner level; ignored on Company level."],
      ["name", "string", "Mandatory", "Merchant name."],
      ["country", "string", "Mandatory", "Country of merchant."],
      ["city", "string", "Mandatory", "City of merchant."],
      ["address", "string", "Mandatory", "Address of merchant."],
      ["post_code", "string", "Mandatory", "Postal code of merchant."],
      ["phone_number", "string", "Mandatory", "Representative phone number."],
      ["mcc", "string", "Mandatory", "Merchant Category Code, 4 digits with leading zero if needed."],
      ["cust_support_phone", "string", "Conditional", "Mandatory when is_ecommerce = 0."],
      ["url", "string", "Conditional", "Mandatory when is_ecommerce = 1. Must point to the online store."],
      ["is_ecommerce", "number", "Mandatory", "Ecommerce flag."],
    ],
    body: [
      "The v2.1 document explicitly adds `cust_support_phone` and `url` to `CreateMerchant/v2`. `cust_support_phone` is mandatory only if `is_ecommerce` is `0`, and `url` is mandatory only if `is_ecommerce` is `1`. ",
    ],
    request: `POST /CreateMerchant/v2
Content-Type: application/json
Authorization: Bearer <token>

{
  "company_id": 1,
  "name": "Merchant Name",
  "country": "BG",
  "city": "Sofia",
  "address": "Business Park 1",
  "post_code": "1000",
  "phone_number": "+359888123456",
  "mcc": "0021",
  "url": "https://merchant.example.com",
  "is_ecommerce": 1
}`,
    response: `{
  "response": {
    "status": 0,
    "data": {
      "merchant_id": "000000000025675"
    }
  }
}`,
  },

  "merchant-get-merchant-list": {
    title: "GetMerchantList/v2",
    subtitle: "Companies & merchants",
    description:
      "Returns merchant objects filtered by company and/or merchant id.",
    facts: [
      "List merchants",
      "15-digit merchant_id format",
      "Includes active / ecommerce flags",
    ],
    fields: [
      ["company_id", "number", "Optional", "Optional filter on Partner level; ignored on Company level."],
      ["merchant_id", "string", "Optional", "15-digit merchant ID with leading zeros."],
    ],
    request: `GET /GetMerchantList/v2?company_id=1&merchant_id=000000000025675
Content-Type: application/json
Authorization: Bearer <token>`,
    response: `{
  "response": {
    "status": 0,
    "data": [
      {
        "merchant_id": "000000000025675",
        "company_id": 1,
        "name": "Merchant Name",
        "currency": "BGN",
        "is_active": 0,
        "is_ecommerce": 0,
        "date_created": "2025-03-16 13:56:20"
      }
    ]
  }
}`,
  },

  "merchant-create-terminal": {
    title: "CreateTerminal/v2",
    subtitle: "Terminals",
    description:
      "Creates a terminal under a merchant.",
    facts: [
      "POST JSON endpoint",
      "Returns 8-digit terminal_id starting with 9",
      "Merchant terminal binding",
    ],
    fields: [
      ["company_id", "number", "Mandatory*", "Mandatory when operating on Partner level; ignored on Company level."],
      ["merchant_id", "string", "Optional", "15-character merchant ID with leading zeros."],
    ],
    body: [
      "The output field `terminal_id` is returned as an 8-character string starting with constant `9`. :contentReference[oaicite:12]{index=12}",
    ],
    request: `POST /CreateTerminal/v2
Content-Type: application/json
Authorization: Bearer <token>

{
  "company_id": 1,
  "merchant_id": "000000000025675"
}`,
    response: `{
  "response": {
    "status": 0,
    "data": {
      "terminal_id": "90001234",
      "status": 0
    }
  }
}`,
  },

  "merchant-get-terminal-list": {
    title: "GetTerminalList/v2",
    subtitle: "Terminals",
    description:
      "Returns terminals filtered by company, merchant and terminal id.",
    facts: [
      "Terminal listing endpoint",
      "8-digit terminal format starting with 9",
      "Returns active flag",
    ],
    fields: [
      ["company_id", "number", "Optional", "Optional filter on Partner level; ignored on Company level."],
      ["merchant_id", "string", "Optional", "15-digit merchant ID with leading zeros."],
      ["terminal_id", "string", "Optional", "8-digit terminal ID starting with 9."],
    ],
    request: `GET /GetTerminalList/v2?company_id=1&merchant_id=000000000025675
Content-Type: application/json
Authorization: Bearer <token>`,
    response: `{
  "response": {
    "status": 0,
    "data": [
      {
        "company_id": 4,
        "merchant_id": "000000000025675",
        "terminal_id": "90015308",
        "is_active": 1
      }
    ]
  }
}`,
  },
};