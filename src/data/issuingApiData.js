export const issuingApiMenu = [
  {
    title: "General",
    items: [
      { id: "issuing-overview", label: "Overview", type: "overview" },
      { id: "issuing-security", label: "Security & TLS", type: "guide" },
      { id: "issuing-jwe", label: "JWE composition", type: "guide" },
      { id: "issuing-getting-started", label: "Getting started", type: "guide" },
      { id: "issuing-test-env", label: "Test environment", type: "guide" },
      { id: "issuing-response-model", label: "Responses & errors", type: "schema" },
      { id: "issuing-processing-flows", label: "Processing flows", type: "guide" },
    ],
  },
  {
    title: "Client onboarding",
    items: [
      { id: "issuing-create-client", label: "POST /api/v1/Enroll/personal/client/create", type: "post" },
      { id: "issuing-update-client", label: "POST /api/v1/Enroll/personal/client/update", type: "post" },
      { id: "issuing-files-upload", label: "POST /api/v1/Enroll/files/upload", type: "post" },
      { id: "issuing-start-verification", label: "POST /api/v1/Enroll/verification/start", type: "post" },
      { id: "issuing-document-upload", label: "POST /api/v1/Enroll/document/upload", type: "post" },
      { id: "issuing-client-status-update", label: "POST /api/v1/Enroll/status/update", type: "post" },
    ],
  },
  {
    title: "Card management",
    items: [
      { id: "issuing-create-physical", label: "POST /api/v1/Card/PhysicalCard/create", type: "post" },
      { id: "issuing-create-virtual", label: "POST /api/v1/Card/VirtualCard/create", type: "post" },
      { id: "issuing-card-status-update", label: "POST /api/v1/Card/status/update", type: "post" },
      { id: "issuing-card-details", label: "POST /api/v1/Card/details/retrieve", type: "post" },
      { id: "issuing-security-elements", label: "POST /api/v1/Card/securityElements/retrieve", type: "post" },
      { id: "issuing-3ds-pin", label: "POST /api/v1/Card/retrieve/3dspwrd&pin", type: "post" },
      { id: "issuing-card-limit", label: "POST /api/v1/Card/limit/update", type: "post" },
      { id: "issuing-activate-physical", label: "POST /api/v1/Card/activatePhysicalCard", type: "post" },
      { id: "issuing-pin-unblock", label: "POST /api/v1/Card/pinUnblock", type: "post" },
    ],
  },
  {
    title: "Partner callback endpoints",
    items: [
      { id: "issuing-event-document-request", label: "POST /DocumentRequest", type: "post" },
      { id: "issuing-event-verification-result", label: "POST /UpdateVerificationStatus", type: "post" },
      { id: "issuing-event-status-update", label: "POST /UpdateClientStatus", type: "post" },
      { id: "issuing-event-card-status", label: "POST /UpdateCardStatus", type: "post" },
      { id: "issuing-event-3ds-code", label: "POST /3DScode", type: "post" },
      { id: "issuing-event-authorization", label: "POST /Authorization", type: "post" },
      { id: "issuing-event-adjustment", label: "POST /Adjustment", type: "post" },
      { id: "issuing-event-transaction-status", label: "POST /GetTransactionStatus", type: "post" },
      { id: "issuing-event-settlement", label: "POST /Settlement", type: "post" },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "issuing-reporting-files", label: "Reconciliation & fee files", type: "schema" },
      { id: "issuing-error-codes", label: "Error codes", type: "schema" },
    ],
  },
];

export const issuingApiContent = {
  "issuing-overview": {
    title: "Issuing API",
    subtitle: "Overview",
    description:
      "iCard Issuing API allows partners to create, manage and scale a payment card program for their customers. It supports physical and virtual cards, spending controls, card status management, security data retrieval, real-time authorization handling and partner callback flows. ",
    facts: [
      "REST-style API",
      "JSON responses",
      "Card issuing + lifecycle control",
    ],
    body: [
      "The API is organized around predictable resource-oriented URLs, accepts request bodies protected through JWE, returns JSON-encoded responses, and uses standard HTTP response codes and verbs. ",
      "The main lifecycle groups in the uploaded specification are client onboarding, verification, card creation, card maintenance, partner callback handling, authorization / adjustment events and reconciliation files. ",
    ],
    request: `Core areas
- Client onboarding
- Verification
- Physical / virtual card creation
- Card status / limits / PIN / 3DS data
- Partner callbacks
- Reconciliation files`,
    response: `HTTP 200 -> success response model
HTTP 400 / 500 -> error object with code, message and optional validation errors`,
  },

  "issuing-security": {
    title: "Security & TLS",
    subtitle: "General",
    description:
      "Communication must use HTTPS over encrypted channel with minimum TLS 1.2, and the spec also lists supported TLS 1.2 and TLS 1.3 cipher suites. ",
    facts: [
      "HTTPS required",
      "Minimum TLS 1.2",
      "Sensitive data protected through JWE",
    ],
    body: [
      "The specification explicitly states that iCard and Partner use HTTPS to ensure encrypted transport and that iCard follows card-scheme best practices for protecting sensitive account and cardholder information. ",
    ],
    request: `HTTPS + JWE protected request`,
    response: `JSON response returned over the same secured channel`,
  },

  "issuing-jwe": {
    title: "JWE composition",
    subtitle: "General",
    description:
      "Issuing API uses JSON Web Encryption with symmetric algorithms based on the API Key (kid) and Shared Secret assigned during onboarding. Compact serialization is used. ",
    facts: [
      "JWE compact serialization",
      "API Key + Shared Secret",
      "Common data in JWE header",
    ],
    body: [
      "The spec states that all endpoints share common structure and mandatory fields, and that common request / response data is present in the JWE Header, while the payload contains endpoint-specific data. ",
    ],
    request: `JWE Compact Serialization:
<protected header>.<encrypted key>.<iv>.<ciphertext>.<tag>`,
    response: `Payload contains endpoint-specific JSON responseModel`,
  },

  "issuing-getting-started": {
    title: "Getting started",
    subtitle: "General",
    description:
      "During onboarding iCard provides Partner ID, Shared Secret, API Key (kid) and the allowed Card Design IDs. The partner provides whitelisted IPs and the callback URL set used for events / notifications. ",
    facts: [
      "Partner ID",
      "Shared Secret + API Key",
      "Card Design IDs + callback URLs",
    ],
    request: `Provided by iCard:
- Partner ID
- Shared Secret
- API Key (kid)
- Card Design IDs

Provided by Partner:
- Whitelisted IP range
- Notification / event URLs`,
    response: `Environment can be enabled after onboarding data exchange`,
  },

  "issuing-test-env": {
    title: "Test environment",
    subtitle: "General",
    description:
      "The test environment is available at `https://dev-issuing-api.icards.eu`, and the uploaded spec also provides a Swagger UI at `/swagger/index.html`. In test environment, RequestId GUID is not required for the Swagger authorization helper. ",
    facts: [
      "dev-issuing-api.icards.eu",
      "Swagger available",
      "POST partner-to-iCard and POST iCard-to-partner examples",
    ],
    request: `Sandbox:
https://dev-issuing-api.icards.eu

Swagger:
https://dev-issuing-api.icards.eu/swagger/index.html`,
    response: `Authorize with ApiKey and PartnerId in Swagger helper`,
  },

  "issuing-response-model": {
    title: "Responses & errors",
    subtitle: "General",
    description:
      "Successful responses use HTTP 200 and usually include a `responseModel` payload. Unsuccessful processing uses HTTP 400 or 500 and returns `code`, `message`, and optional validation `errors`. ",
    table: {
      headers: ["HTTP status", "Meaning"],
      rows: [
        ["200", "Success"],
        ["400", "Client-side error"],
        ["500", "Server-side error"],
      ],
    },
    request: `{
  "requestModel": { ... }
}`,
    response: `{
  "code": "ERR_CODE",
  "message": "Error description",
  "errors": [
    { "code": "FIELD_ERR", "message": "Validation detail" }
  ]
}`,
  },

  "issuing-processing-flows": {
    title: "Processing flows",
    subtitle: "General",
    description:
      "The specification groups the main use cases into cardholder management, verification, card management, card data retrieval, card updates, authentication events and transaction events. ",
    body: [
      "The documented sequence includes create/update client, files upload, verification start, document upload, client status updates, then card creation and later card maintenance actions such as status update, limit change, PIN unblock and security retrieval. ",
    ],
    request: `Client onboarding -> verification -> card creation -> card updates -> events / reporting`,
    response: `Use the endpoint groups below to build the full issuing flow`,
  },

  "issuing-create-client": {
    title: "POST /api/v1/Enroll/personal/client/create",
    subtitle: "Client onboarding",
    description:
      "Starts a new cardholder enrolment application. The spec notes that an application may be created with minimum data, but iCard validates required data when verification is started. ",
    fields: [
      ["partnerClientNumber", "string", "Mandatory", "Unique identifier of client in partner system."],
      ["ProductId", "integer", "Mandatory", "Business line supported by partner."],
      ["enrollType", "enum", "Mandatory", "Enrollment channel."],
      ["presenceOnIdentificationCode", "enum", "Mandatory", "Application type depending on customer presence during identification."],
      ["ipAddress", "string", "Conditional", "Mandatory for MobileDevice or WEB under documented conditions."],
    ],
    request: `POST /api/v1/Enroll/personal/client/create
{
  "partnerClientNumber": "CUST-10001",
  "ProductId": 100,
  "enrollType": "WEB",
  "presenceOnIdentificationCode": 2,
  "ipAddress": "203.0.113.25"
}`,
    response: `{
  "responseModel": {
    "clientId": 123456
  }
}`,
  },

  "issuing-update-client": {
    title: "POST /api/v1/Enroll/personal/client/update",
    subtitle: "Client onboarding",
    description:
      "Updates the client onboarding application before or after verification, using the same general enrollment data model as create client. ",
    request: `POST /api/v1/Enroll/personal/client/update
{
  "clientId": 123456,
  "partnerClientNumber": "CUST-10001"
}`,
    response: `{
  "responseModel": {
    "clientId": 123456,
    "Status": "Success"
  }
}`,
  },

  "issuing-files-upload": {
    title: "POST /api/v1/Enroll/files/upload",
    subtitle: "Client onboarding",
    description:
      "Uploads files proactively by partner, without waiting for a prior iCard request. ",
    request: `POST /api/v1/Enroll/files/upload
{
  "clientId": 123456,
  "files": [
    {
      "fileName": "passport.jpg",
      "externalFileId": "DOC-1",
      "fileContent": "<base64>"
    }
  ]
}`,
    response: `{
  "responseModel": {
    "clientId": 123456,
    "Status": "Success"
  }
}`,
  },

  "issuing-start-verification": {
    title: "POST /api/v1/Enroll/verification/start",
    subtitle: "Client onboarding",
    description:
      "Starts client verification when all mandatory data is available. Applications with missing or incorrect data are not accepted for verification. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier in iCard system."],
    ],
    request: `POST /api/v1/Enroll/verification/start
{
  "clientId": 123456
}`,
    response: `{
  "responseModel": {
    "clientId": 123456,
    "Status": "Success"
  }
}`,
  },

  "issuing-document-upload": {
    title: "POST /api/v1/Enroll/document/upload",
    subtitle: "Client onboarding",
    description:
      "Uploads documents requested by iCard during verification. This endpoint is used after the partner receives the `DocumentRequest` event. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier."],
      ["documentRequestID", "long", "Mandatory", "Identifier from the iCard request."],
      ["Files.fileName", "integer/string", "Mandatory", "File name in partner system."],
      ["Files.externalFileId", "string", "Mandatory", "External file identifier."],
      ["Files.fileContent", "base64", "Mandatory", "Uploaded file content in base64."],
    ],
    request: `POST /api/v1/Enroll/document/upload
{
  "clientId": 123456,
  "documentRequestID": 98765,
  "Files": [
    {
      "fileName": "proof_of_address.pdf",
      "externalFileId": "ADDR-1",
      "fileContent": "<base64>"
    }
  ]
}`,
    response: `{
  "responseModel": {
    "clientId": 123456,
    "Status": "Success"
  }
}`,
  },

  "issuing-client-status-update": {
    title: "POST /api/v1/Enroll/status/update",
    subtitle: "Client onboarding",
    description:
      "Updates client status after verification. The external system can block or terminate a client, but cannot reactivate a client blocked by iCard. Once terminated, status cannot be changed again. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier."],
      ["newStatusId", "integer", "Mandatory", "New client status according to nomenclature."],
      ["externalSystemUserFullName", "string", "Mandatory", "Operator name in external system."],
      ["externalSystemChangeStatusNote", "string", "Optional", "Additional note."],
      ["changeStatusReason", "List<string>", "Mandatory", "Reason list according to nomenclature."],
    ],
    request: `POST /api/v1/Enroll/status/update
{
  "clientId": 123456,
  "newStatusId": 2,
  "externalSystemUserFullName": "Admin User",
  "changeStatusReason": ["Risk review"]
}`,
    response: `{
  "responseModel": {
    "clientId": 123456,
    "Status": "Success"
  }
}`,
  },

  "issuing-create-physical": {
    title: "POST /api/v1/Card/PhysicalCard/create",
    subtitle: "Card management",
    description:
      "Creates a physical card for a successfully verified client with status Active. Delivery address and delivery method are mandatory for physical cards. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique identifier of client in iCard system."],
      ["cardParams.cardDesign", "string", "Mandatory", "Card design configured for the partner."],
      ["cardParams.cardCurrency", "string", "Mandatory", "3-digit ISO 4217 card currency code."],
      ["cardParams.embossName", "string", "Mandatory", "Emboss name, up to 28 chars."],
      ["cardParams.embossLine2", "string", "Optional", "Second emboss line, up to 28 chars."],
      ["deliveryAddress.shipToAddress", "string", "Mandatory", "Delivery address."],
      ["deliveryAddress.shipToCity", "string", "Conditional", "Delivery city."],
      ["deliveryAddress.shipToPostalCode", "string", "Mandatory", "Delivery postal code."],
      ["deliveryAddress.shipToCountryCode", "string", "Mandatory", "ISO 3166-1 alpha-3 country code."],
      ["deliveryMethod", "int32", "Mandatory", "1 courier to provider; 2 courier to cardholder."],
    ],
    request: `POST /api/v1/Card/PhysicalCard/create
{
  "clientId": 123456,
  "cardParams": {
    "cardDesign": "VISA_PHYSICAL_STD",
    "cardCurrency": "975",
    "embossName": "IVAN IVANOV"
  },
  "deliveryAddress": {
    "shipToAddress": "Business Park 1",
    "shipToCity": "Varna",
    "shipToPostalCode": "9000",
    "shipToCountryCode": "BGR"
  },
  "deliveryMethod": 2
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-10001"
  }
}`,
  },

  "issuing-create-virtual": {
    title: "POST /api/v1/Card/VirtualCard/create",
    subtitle: "Card management",
    description:
      "Creates a virtual card for a successfully verified active client. It uses card design, currency and emboss data but no delivery address block. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique identifier of client in iCard system."],
      ["cardParams.cardDesign", "string", "Mandatory", "Card design configured for the partner."],
      ["cardParams.cardCurrency", "string", "Mandatory", "3-digit ISO 4217 card currency code."],
      ["cardParams.embossName", "string", "Mandatory", "Emboss name, up to 28 chars."],
      ["cardParams.embossLine2", "string", "Optional", "Second emboss line."],
    ],
    request: `POST /api/v1/Card/VirtualCard/create
{
  "clientId": 123456,
  "cardParams": {
    "cardDesign": "MC_VIRTUAL_STD",
    "cardCurrency": "975",
    "embossName": "IVAN IVANOV"
  }
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-20001"
  }
}`,
  },

  "issuing-card-status-update": {
    title: "POST /api/v1/Card/status/update",
    subtitle: "Card management",
    description:
      "Updates card status. All cards are created as Inactive and activation must be initiated by the partner system. Partner status changes are limited by allowed status transitions. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier."],
      ["cardId", "string", "Mandatory", "Card identifier."],
      ["cardStatus", "int32", "Mandatory", "Card status according to nomenclature."],
    ],
    request: `POST /api/v1/Card/status/update
{
  "clientId": 123456,
  "cardId": "CARD-10001",
  "cardStatus": 1
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-10001"
  }
}`,
  },

  "issuing-card-details": {
    title: "POST /api/v1/Card/details/retrieve",
    subtitle: "Card management",
    description:
      "Retrieves non-sensitive card details. Balance fields are returned only when authorizations are handled by iCard and the balance is held in issuer system. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier."],
      ["cardId", "string", "Mandatory", "Card identifier."],
    ],
    request: `POST /api/v1/Card/details/retrieve
{
  "clientId": 123456,
  "cardId": "CARD-10001"
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-10001",
    "maskedPan": "498765**1234",
    "expDate": "2708",
    "availableBalance": "100.5",
    "balanceCurrency": "978",
    "cardStatus": 1
  }
}`,
  },

  "issuing-security-elements": {
    title: "POST /api/v1/Card/securityElements/retrieve",
    subtitle: "Card management",
    description:
      "Retrieves sensitive security elements for a virtual card only. The partner provides a public key and the response contains encrypted data. This endpoint cannot be used for physical cards. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier."],
      ["cardId", "string", "Mandatory", "Card identifier."],
      ["publicKey", "string", "Mandatory", "Public key used to encrypt returned security data."],
    ],
    request: `POST /api/v1/Card/securityElements/retrieve
{
  "clientId": 123456,
  "cardId": "CARD-20001",
  "publicKey": "<partner-public-key>"
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-20001",
    "encryptedData": "<encrypted PAN;expDate;cvc;PIN;3DS password>"
  }
}`,
  },

  "issuing-3ds-pin": {
    title: "POST /api/v1/Card/retrieve/3dspwrd&pin",
    subtitle: "Card management",
    description:
      "Retrieves PIN or static 3DS password. For physical cards, PIN can be retrieved after production; for virtual cards, PIN can be retrieved immediately after creation. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier."],
      ["cardId", "string", "Mandatory", "Card identifier."],
      ["pin", "boolean", "Conditional", "Mandatory if stat3dsPassword is false."],
      ["stat3dsPassword", "boolean", "Conditional", "Mandatory if pin is false."],
      ["publicKey", "string", "Mandatory", "Public key used to encrypt returned data."],
    ],
    request: `POST /api/v1/Card/retrieve/3dspwrd&pin
{
  "clientId": 123456,
  "cardId": "CARD-20001",
  "pin": true,
  "stat3dsPassword": false,
  "publicKey": "<partner-public-key>"
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-20001",
    "encryptedData": "<encrypted PIN or static 3DS>"
  }
}`,
  },

  "issuing-card-limit": {
    title: "POST /api/v1/Card/limit/update",
    subtitle: "Card management",
    description:
      "Updates the card limit amount in card currency. This endpoint can be used only when authorizations are handled by iCard and the card limit is held in issuer system. ",
    fields: [
      ["clientId", "long", "Mandatory", "Unique client identifier."],
      ["cardId", "string", "Mandatory", "Card identifier."],
      ["limitAmount", "string/decimal", "Mandatory", "New limit amount in card currency."],
    ],
    request: `POST /api/v1/Card/limit/update
{
  "clientId": 123456,
  "cardId": "CARD-10001",
  "limitAmount": "500.00"
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-10001",
    "Status": "Success"
  }
}`,
  },

  "issuing-activate-physical": {
    title: "POST /api/v1/Card/activatePhysicalCard",
    subtitle: "Card management",
    description:
      "Activates a physical card through the partner mobile-app flow. The processing-flow table identifies it as the specific endpoint for physical-card activation. ",
    request: `POST /api/v1/Card/activatePhysicalCard
{
  "clientId": 123456,
  "cardId": "CARD-10001"
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-10001",
    "Status": "Success"
  }
}`,
  },

  "issuing-pin-unblock": {
    title: "POST /api/v1/Card/pinUnblock",
    subtitle: "Card management",
    description:
      "Requests card PIN unblock as part of card maintenance operations. It is listed in the processing-flow section as a partner-to-iCard card update endpoint. ",
    request: `POST /api/v1/Card/pinUnblock
{
  "clientId": 123456,
  "cardId": "CARD-10001"
}`,
    response: `{
  "responseModel": {
    "cardId": "CARD-10001",
    "Status": "Success"
  }
}`,
  },

  "issuing-event-document-request": {
    title: "POST /DocumentRequest",
    subtitle: "Partner callback endpoints",
    description:
      "iCard can request additional documents or data during verification. The partner must support this callback endpoint. ",
    request: `POST /DocumentRequest
{
  "clientId": 123456,
  "documentRequestID": 98765,
  ...
}`,
    response: `Partner should store request and respond according to callback contract.`,
  },

  "issuing-event-verification-result": {
    title: "POST /UpdateVerificationStatus",
    subtitle: "Partner callback endpoints",
    description:
      "iCard sends the verification result to the partner system through this callback after document and verification processing. ",
    request: `POST /UpdateVerificationStatus
{
  "clientId": 123456,
  "verificationStatus": "Approved"
}`,
    response: `Partner updates client onboarding state.`,
  },

  "issuing-event-status-update": {
    title: "POST /UpdateClientStatus",
    subtitle: "Partner callback endpoints",
    description:
      "iCard notifies the partner when client status is changed by iCard, for example due to risk or AML factors. ",
    request: `POST /UpdateClientStatus
{
  "clientId": 123456,
  "newStatusId": 3
}`,
    response: `Partner syncs local client status.`,
  },

  "issuing-event-card-status": {
    title: "POST /UpdateCardStatus",
    subtitle: "Partner callback endpoints",
    description:
      "iCard notifies the partner system when card status is updated on iCard side. The event is listed explicitly in the processing flow and document contents. ",
    request: `POST /UpdateCardStatus
{
  "clientId": 123456,
  "cardId": "CARD-10001",
  "cardStatus": 1
}`,
    response: `Partner updates local card state.`,
  },

  "issuing-event-3ds-code": {
    title: "POST /3DScode",
    subtitle: "Partner callback endpoints",
    description:
      "iCard sends dynamic 3DS code notification to the partner system through this callback. ",
    request: `POST /3DScode
{
  "clientId": 123456,
  "cardId": "CARD-20001",
  "code": "123456"
}`,
    response: `Partner forwards or displays the dynamic 3DS code according to the product flow.`,
  },

  "issuing-event-authorization": {
    title: "POST /Authorization",
    subtitle: "Partner callback endpoints",
    description:
      "iCard posts authorization requests to the partner. The document also includes sections for authorization process, overriding the response code and response-code usage. ",
    request: `POST /Authorization
{
  "transactionId": "TX-10001",
  "cardId": "CARD-10001",
  "amount": "15.90",
  "currency": "978",
  ...
}`,
    response: `{
  "responseCode": "00"
}`,
  },

  "issuing-event-adjustment": {
    title: "POST /Adjustment",
    subtitle: "Partner callback endpoints",
    description:
      "iCard posts adjustment orders to the partner. The spec includes request and response body sections for adjustment handling. ",
    request: `POST /Adjustment
{
  "transactionId": "TX-10001",
  "adjustmentAmount": "1.00",
  ...
}`,
    response: `{
  "responseCode": "00"
}`,
  },

  "issuing-event-transaction-status": {
    title: "POST /GetTransactionStatus",
    subtitle: "Partner callback endpoints",
    description:
      "iCard checks transaction status in the partner system through this callback endpoint. ",
    request: `POST /GetTransactionStatus
{
  "transactionId": "TX-10001"
}`,
    response: `{
  "status": "Completed"
}`,
  },

  "issuing-event-settlement": {
    title: "POST /Settlement",
    subtitle: "Partner callback endpoints",
    description:
      "Settlement is included in the v1.6 specification as an iCard-to-partner event and is also tied to reconciliation reporting sections. ",
    request: `POST /Settlement
{
  "settlementId": "SET-10001",
  ...
}`,
    response: `Partner records settlement result and reporting linkage.`,
  },

  "issuing-reporting-files": {
    title: "Reconciliation & fee files",
    subtitle: "Reference",
    description:
      "The spec includes reporting files for Settlement Details, Card Schemes Fees Exchange and Transaction Processing Records, with dedicated file structure, file requirements and file name convention sections. ",
    table: {
      headers: ["File group", "Included in spec"],
      rows: [
        ["Settlement Details", "Yes"],
        ["Card Schemes Fees Exchange", "Yes"],
        ["Transaction Processing Records", "Yes"],
      ],
    },
    request: `Reporting files are delivered according to the documented file naming and structure conventions.`,
    response: `Use these files for reconciliation, fee control and transaction processing reporting.`,
  },

  "issuing-error-codes": {
    title: "Error codes",
    subtitle: "Reference",
    description:
      "The specification includes Appendix II for error codes and also defines the general unsuccessful response structure with `code`, `message` and optional `errors` array. ",
    request: `{
  "code": "ERR_CODE",
  "message": "Rejected request",
  "errors": [
    { "code": "FIELD_ERROR", "message": "Validation detail" }
  ]
}`,
    response: `Use Appendix II error-code list together with validation details for troubleshooting.`,
  },
};