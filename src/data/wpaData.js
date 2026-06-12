export const wpaVersion = {
  "id": "5.4",
  "label": "WPA 5.4",
  "status": "Newest",
  "description": "Web PayInAPI e-commerce acquiring interface technical guide."
};

export const wpaMenu = [
  {
    "title": "General Settings",
    "items": [
      {
        "id": "overview",
        "label": "Overview",
        "type": "overview"
      },
      {
        "id": "integration-steps",
        "label": "Integration steps",
        "type": "guide"
      },
      {
        "id": "security",
        "label": "Security",
        "type": "guide"
      },
      {
        "id": "jwt-structure",
        "label": "JWT structure",
        "type": "guide"
      },
      {
        "id": "jwt-example",
        "label": "JWT example",
        "type": "schema"
      },
      {
        "id": "http-request",
        "label": "HTTP request headers",
        "type": "schema"
      },
      {
        "id": "http-response",
        "label": "HTTP response headers",
        "type": "schema"
      },
      {
        "id": "endpoints",
        "label": "Endpoints",
        "type": "guide"
      },
      {
        "id": "testing",
        "label": "Testing",
        "type": "guide"
      }
    ]
  },
  {
    "title": "Processing Model",
    "items": [
      {
        "id": "payment-process",
        "label": "Payment process",
        "type": "guide"
      },
      {
        "id": "xml-standard",
        "label": "XML standard interface",
        "type": "schema"
      },
      {
        "id": "standard-request-properties",
        "label": "Standard request properties",
        "type": "schema"
      },
      {
        "id": "standard-response-properties",
        "label": "Standard response properties",
        "type": "schema"
      },
      {
        "id": "command-codes",
        "label": "Command code list",
        "type": "schema"
      }
    ]
  },
  {
    "title": "Commands",
    "items": [
      {
        "id": "cmd-601",
        "label": "601 Authorization",
        "type": "post"
      },
      {
        "id": "cmd-602",
        "label": "602 Reversal",
        "type": "post"
      },
      {
        "id": "cmd-604",
        "label": "604 First recurring",
        "type": "post"
      },
      {
        "id": "cmd-605",
        "label": "605 Subsequent recurring",
        "type": "post"
      },
      {
        "id": "cmd-606",
        "label": "606 Refund transaction",
        "type": "post"
      },
      {
        "id": "cmd-607",
        "label": "607 Capture",
        "type": "post"
      },
      {
        "id": "cmd-609",
        "label": "609 Refund from TRN",
        "type": "post"
      },
      {
        "id": "cmd-611",
        "label": "611 Reversal from TRN",
        "type": "post"
      },
      {
        "id": "cmd-615",
        "label": "615 Account verification",
        "type": "post"
      },
      {
        "id": "cmd-617",
        "label": "617 Pre-auth completion RRN",
        "type": "post"
      },
      {
        "id": "cmd-618",
        "label": "618 Pre-auth cancellation RRN",
        "type": "post"
      },
      {
        "id": "cmd-621",
        "label": "621 Transaction retrieval",
        "type": "post"
      },
      {
        "id": "cmd-623",
        "label": "623 Pre-authorization request",
        "type": "post"
      },
      {
        "id": "cmd-624",
        "label": "624 Pre-auth completion",
        "type": "post"
      },
      {
        "id": "cmd-625",
        "label": "625 Pre-auth cancellation",
        "type": "post"
      },
      {
        "id": "cmd-5000",
        "label": "5000 Connection check",
        "type": "post"
      }
    ]
  },
  {
    "title": "Automated Exports",
    "items": [
      {
        "id": "export-copy-requests-chargebacks",
        "label": "Copy requests / chargebacks",
        "type": "schema"
      },
      {
        "id": "export-reconciliation",
        "label": "Reconciliation export",
        "type": "schema"
      },
      {
        "id": "export-clearing",
        "label": "Clearing export",
        "type": "schema"
      }
    ]
  },
  {
    "title": "Reference",
    "items": [
      {
        "id": "errors",
        "label": "Error codes",
        "type": "guide"
      },
      {
        "id": "cvc",
        "label": "CVC2/CVV2 result codes",
        "type": "guide"
      },
      {
        "id": "threed",
        "label": "3D processing",
        "type": "guide"
      }
    ]
  }
];

export const wpaContent = {
  "overview": {
    "title": "WPA 5.4",
    "subtitle": "Overview",
    "description": "Web PayInAPI is the direct e-commerce acquiring interface for partners and merchants that need server-to-server payment processing.",
    "facts": [
      "Version 5.4",
      "XML over HTTPS",
      "JWT + body hash",
      "Command-based API"
    ],
    "body": [
      "This document describes the interface for acquiring of e-commerce transactions to a 3-rd party company, which manages variable number of sites. This company will be called \"Partner\". This interface can be used either by the Partner or by the Merchants themselves. iCard AD (iCARD) provides the acquiring facility to the card schemes Mastercard, VISA, JCB and Amex, manages the financial flow to the Partner and/or to merchants, supplies statements and on-line access to the processed data. iCARD handles merchant's registration at card schemes, performs scoring procedures and risk management ratios for the merchants. Transactions are run against a fraud detection system which prevents the fraudulent cardholders and lowers the chargeback ratio for the merchant.",
      "The purpose of this document is to specify the PAY-IN API Interface and demonstrate how it is used in the most common way.",
      "All techniques used within the interface are standard throughout the industry and should be very easy to implement on any platform."
    ],
    "request": "POST /Authorization HTTP/1.1\nUser-ID: Partner1\nBody_hash: <hmac-sha256-body-hash>\nAuthorization: Bearer <signed-jwt>\nContent-Type: application/xml\nAPIVersion: 1.0",
    "response": "<ipayin_response>\n  <command>601</command>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n</ipayin_response>"
  },
  "integration-steps": {
    "title": "WPA Integration Steps",
    "subtitle": "Implementation path",
    "description": "A practical end-to-end workflow for integrating WPA with iCard, from documentation handover and sandbox setup to production testing, clearing verification and Go Live.",
    "facts": [
      "Sandbox first",
      "Scenario-based validation",
      "Production credentials after successful tests",
      "Clearing check before Go Live"
    ],
    "body": [
      "Below is the recommended WPA integration process with iCard. It shows the operational steps that happen around the technical documentation, credentials, testing scenarios and final production launch.",
      "The flow is intended for merchants and technical teams that need a clear checklist before starting implementation and before moving from sandbox to production."
    ],
    "steps": [
      {
        "title": "Documentation provision",
        "description": "iCard provides the merchant with the latest WPA documentation containing the technical specifications required for integration."
      },
      {
        "title": "Sandbox setup and test preparation",
        "description": "The Integration Team creates a sandbox MID and CID for the merchant. In parallel, the Merchant Settings file and tailored testing scenarios are prepared and shared according to the merchant business model and the WPA functions that must be implemented."
      },
      {
        "title": "Sandbox testing by the merchant",
        "description": "The merchant team executes the provided scenarios using VISA and/or Mastercard cards. The tests run in the sandbox environment, so no real charges are applied."
      },
      {
        "title": "Test results validation",
        "description": "After sandbox testing is completed, the merchant sends back the testing scenarios file with the corresponding TRNs for each transaction. iCard reviews the results and confirms whether all scenarios were completed successfully."
      },
      {
        "title": "Production credentials provision",
        "description": "If the sandbox tests are successful, the merchant technical team provides two separate email addresses. iCard uses these addresses to securely send the production environment credentials and settings."
      },
      {
        "title": "Production testing",
        "description": "After the merchant confirms receipt of the production credentials, iCard provides production testing scenarios. These tests are executed in the live environment, so real transactions and actual card charges occur."
      },
      {
        "title": "Clearing verification",
        "description": "After the production scenarios are completed, a 24-hour waiting period is required so iCard can verify that transaction clearing has completed successfully."
      },
      {
        "title": "Go Live and monitoring",
        "description": "When production tests and clearing checks are successful, iCard coordinates the official Go Live date with the merchant. After launch, transaction traffic is monitored and support remains available."
      }
    ],
    "notes": [
      "The merchant should keep the completed testing scenarios and TRNs available during validation.",
      "Production testing uses real cards and real charges, unlike sandbox testing.",
      "The iCard team remains available for questions or clarifications throughout the integration process."
    ]
  },
  "security": {
    "title": "Confidentiality, Integrity and Security",
    "subtitle": "General settings",
    "description": "WPA protects transport with HTTPS/TLS and protects message integrity and authentication with a shared-secret JWT model.",
    "facts": [
      "Minimum TLS 1.2",
      "Shared secret validity: 12 months",
      "JWT is mandatory"
    ],
    "body": [
      "iCard and Partner shall use HTTP through an SSL connection (HTTPS) to ensure data transmission through an encrypted channel. Minimum TLS 1.2 is required.",
      "Supported cipher suites:",
      "For message integrity a hashing of the message body with shared secret (pre-shared key) shall be used.",
      "For authentication, JSON Web Token (JWT) with shared secret (pre-shared key) will be used. The validity period of the secret will be 12 months after it's generation. The shared secret will be generated by iCard.",
      "JWT must always be included in API requests, regardless of the initiating party. The token will be placed in the request header field."
    ],
    "tables": [
      {
        "title": "Supported cipher suites",
        "description": "",
        "headers": [
          "TLS Version",
          "Cipher suite"
        ],
        "rows": [
          [
            "1.3",
            "TLS_AES_128_GCM_SHA256"
          ],
          [
            "1.3",
            "TLS_AES_256_GCM_SHA384"
          ],
          [
            "1.3",
            "TLS_CHACHA20_POLY1305_SHA256"
          ],
          [
            "1.2",
            "ECDHE-ECDSA-AES128-GCM-SHA256"
          ],
          [
            "1.2",
            "ECDHE-RSA-AES128-GCM-SHA256"
          ],
          [
            "1.2",
            "ECDHE-ECDSA-AES256-GCM-SHA384"
          ],
          [
            "1.2",
            "ECDHE-RSA-AES256-GCM-SHA384"
          ],
          [
            "1.2",
            "ECDHE-ECDSA-CHACHA20-POLY1305"
          ],
          [
            "1.2",
            "ECDHE-RSA-CHACHA20-POLY1305"
          ],
          [
            "1.2",
            "DHE-RSA-AES128-GCM-SHA256"
          ],
          [
            "1.2",
            "DHE-RSA-AES256-GCM-SHA384"
          ]
        ]
      }
    ]
  },
  "jwt-structure": {
    "title": "JWT Structure",
    "subtitle": "Authentication",
    "description": "Each request uses a signed JSON Web Token with header, payload and HMAC-SHA256 signature.",
    "facts": [
      "Structure: header.payload.signature",
      "Algorithm: HMAC SHA256",
      "No spaces/new lines before Base64 encoding"
    ],
    "body": [
      "JWT should have the following structure: header.payload.signature",
      "Header elements",
      "Payload elements",
      "Signature",
      "HMAC SHA256 algorithm",
      "signature = HMAC_SHA256(secret, base64Encod(header) + '.' +base64Encod(payload))",
      "Json Web Token",
      "JWT = base64Encod(header) + \".\" + base64Encod(payload) + \".\" + base64Encod(signature)",
      "Note",
      "All spaces and new lines must be excluded when encoding the header and the payload to base64.",
      "The body_hash value calculation process should take into account the whole PayInAPI xml request body and should be HMAC SHA256 encoded with the shared secret (pre-shared key)."
    ],
    "tables": [
      {
        "title": "JWT header",
        "description": "Header elements used by WPA.",
        "headers": [
          "Part",
          "Value"
        ],
        "rows": [
          [
            "",
            "{ \"typ\": \"JWT\", \"alg\": \"HS256\", \"hash\": \"sha256\", \"kix\": \"1\" }"
          ]
        ]
      },
      {
        "title": "JWT payload",
        "description": "Payload elements used by WPA.",
        "headers": [
          "Part",
          "Description"
        ],
        "rows": [
          [
            "{ }",
            "\"iss\": The party initiating the request, \"iat\": UTC Unix epoch time in seconds, \"exp\": Request expiry (30 seconds) in UTC Unix epoch time in seconds \"kix\": index of the pre-shared key, used for JWT calculation, \"body_hash\": \"SHA256 of request body-64 hex characters string\""
          ]
        ]
      }
    ],
    "request": "signature = HMAC_SHA256(secret, base64Encode(header) + \".\" + base64Encode(payload))",
    "response": "JWT = base64Encode(header) + \".\" + base64Encode(payload) + \".\" + base64Encode(signature)"
  },
  "jwt-example": {
    "title": "JWT Example",
    "subtitle": "Authentication",
    "description": "Decoded JWT data and encoded bearer token example from the WPA 5.4 guide.",
    "facts": [
      "HS256",
      "kix=1",
      "body_hash included"
    ],
    "body": [
      "Shared secret used in the example: mysecret."
    ],
    "request": "{ \"typ\": \"JWT\", \"alg\": \"HS256\", \"hash\": \"sha256\", \"kix\": \"1\" } { \"iss\": \"Partner1\", \"iat\": 1639042551, \"exp\": 1639042581, \"kix\": \"1\", \"body_hash\": \"c55cc51b1896482f216fb24ca37107c5f21da8ee4d53a2cf2bc15ea5d50b1d95\" }",
    "response": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImhhc2giOiJzaGEyNTYiLCJraXgiOiIxIn0.eyJpc3MiOiJQYXJ0bmVyMSIsImlhdCI6MTYzOTA0MjU1MSwiZXhwIjoxNjM5MDQyNTgxLCJraXgiOiIxIiwiYm9keV9oYXNoIjoiYzU1Y2M1MWIxODk2NDgyZjIxNmZiMjRjYTM3MTA3YzVmMjFkYThlZTRkNTNhMmNmMmJjMTVlYTVkNTBiMWQ5NSJ9.JgdweGY6I1FUPqUSkFWnt6_8MTvy8AHopJ9SKY7O40w"
  },
  "http-request": {
    "title": "HTTP Header - Request",
    "subtitle": "Transport",
    "description": "Mandatory request headers required for WPA API calls.",
    "facts": [
      "POST",
      "application/xml",
      "Bearer JWT"
    ],
    "tables": [
      {
        "title": "Request headers",
        "description": "",
        "headers": [
          "Element",
          "Description"
        ],
        "rows": [
          [
            "User-ID",
            "This is the identifier of the caller bound with the pre-shared secret"
          ],
          [
            "Body_hash",
            "SHA256 of request body"
          ],
          [
            "Authorization",
            "\"Bearer\"+ \" \"+<Signed JSON Web Token>"
          ],
          [
            "Content-Type",
            "Currently supported format is xml"
          ],
          [
            "Content-Length",
            "The length of the request body in octets (8-bit bytes)"
          ],
          [
            "APIVersion",
            "Version of the API used"
          ]
        ]
      }
    ],
    "request": "POST /Authorization HTTP/1.1 User-ID: Parnter1 body_hash:c55cc51b1896482f216fb24ca37107c5f21da8ee4d53a2cf2bc15ea5d50b1d95 Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImhhc2giOiJzaGEyNTYiLCJraXgiOiIxIn0.eyJpc3MiOiJQYXJ0bmVyMSIsImlhdCI6MTYzOTA0MjU1MSwiZXhwIjoxNjM5MDQyNTgxLCJraXgiOiIxIiwiYm9keV9oYXNoIjoiYzU1Y2M1MWIxODk2NDgyZjIxNmZiMjRjYTM3MTA3YzVmMjFkYThlZTRkNTNhMmNmMmJjMTVlYTVkNTBiMWQ5NSJ9.JgdweGY6I1FUPqUSkFWnt6_8MTvy8AHopJ9SKY7O40w Content-Type: application/xml Content-Length: 678 APIVersion:1.0"
  },
  "http-response": {
    "title": "HTTP Header - Response",
    "subtitle": "Transport",
    "description": "Mandatory response headers returned by WPA.",
    "facts": [
      "JWT-Signed-Response",
      "X-Frame-Options",
      "Content-Type"
    ],
    "tables": [
      {
        "title": "Response headers",
        "description": "",
        "headers": [
          "Element",
          "Description"
        ],
        "rows": [
          [
            "Content-Type",
            "Currently supported format is xml"
          ],
          [
            "X-Frame-Options",
            "SAMEORIGIN - no rendering if origin mismatch"
          ],
          [
            "JWT-Signed-Response",
            "JWT encoded value"
          ],
          [
            "Server",
            "A server name"
          ],
          [
            "Date",
            "The date and time that the message was sent (in \"HTTP-date\" format)"
          ]
        ]
      }
    ],
    "response": "POST /Authorization HTTP/1.1\nContent-Type: application/xml\nContent-Length: 26\nX-Frame-Options: SAMEORIGIN\nJWT-SIGNED-RESPONSE:\neyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpQ0FSRCIsImlhdCI6MTYzODk0NzQ1 OCwiZXhwIjoxNjM4OTQ3NDg4LCJraXgiOiIxIiwiYm9keV9oYXNoIjoiODliY2U3NGExYjMyZGUxM WU3ZTI0YTExN2FhNWQwMWYzM2U1NzYwMjBmYzM4ODg2YmUzZGFhNmI1YjAyODlmNyJ9.9hKKAajkH wFU6TmwyxaJonXUXfyOI4QMHoC7oWpAstU\nServer: iCard httpd\nDate: Thu, 09 Dec 2021 11:13:29 GMT"
  },
  "endpoints": {
    "title": "Endpoint URLs",
    "subtitle": "Environment",
    "description": "Partner-to-iCard WPA requests are submitted by HTTP POST to the sandbox or production endpoint.",
    "facts": [
      "Method: POST",
      "Sandbox and production credentials are separate",
      "Same command model across environments"
    ],
    "body": [
      "Partner to iCard Requests",
      "Method: POST",
      "URLs:",
      "Sandbox: webpayin.sandbox.apicard.direct/v1",
      "Production: webjwtin0.icard.com/v1"
    ],
    "request": "Sandbox endpoint:\nwebpayin.sandbox.apicard.direct/v1\n\nProduction endpoint:\nwebjwtin0.icard.com/v1"
  },
  "testing": {
    "title": "Testing Guidelines",
    "subtitle": "Environment",
    "description": "Sandbox testing uses dedicated credentials, test cards, valid future expiry dates, CVC 000 and currency-specific test MIDs.",
    "facts": [
      "Use future YY/MM expiry",
      "Use CVC 000",
      "Use the MID that matches currency"
    ],
    "body": [
      "- You will be provided with an username and secret for sandbox and production environments separately. Please contact your customer service representative, if you don't have it.",
      "- Card Data for testing: Please use the following credit card numbers in order to test the integration.",
      "- Tester should enter a valid date (YY/MM format) in the future.",
      "- Tester should enter \"000\" (3 zeroes) for CVC.",
      "- Please use the following test MIDs for all needed combinations MID - Currency."
    ],
    "tables": [
      {
        "title": "Test card numbers",
        "description": "",
        "headers": [
          "Card Type",
          "Card Number",
          "Result"
        ],
        "rows": [
          [
            "MasterCard",
            "5326100000000004",
            "Approved"
          ],
          [
            "Maestro",
            "67032000000000001",
            "Declined"
          ],
          [
            "VISA",
            "4006090000000007",
            "Approved"
          ],
          [
            "VISA Electron",
            "4002880000000005",
            "Approved"
          ],
          [
            "VPay",
            "4877000000000002",
            "Declined"
          ]
        ]
      },
      {
        "title": "Test MIDs",
        "description": "",
        "headers": [
          "Type",
          "Value"
        ],
        "rows": [
          [
            "MID in EUR",
            "000000000000112"
          ],
          [
            "MID in USD",
            "000000000000114"
          ],
          [
            "MID in BGN",
            "000000000000113"
          ],
          [
            "MID in GBP",
            "000000000000115"
          ],
          [
            "MID in RON",
            "000000000000143"
          ],
          [
            "MID in CHF",
            "000000000000977"
          ]
        ]
      }
    ]
  },
  "payment-process": {
    "title": "Payment Process with iCARD PAY-IN Interface",
    "subtitle": "Processing model",
    "description": "WPA supports online authorization and online capture, providing a dual-message acquiring flow managed by iCARD.",
    "facts": [
      "Authorization + capture",
      "Card scheme processing is transparent",
      "Transactions settle after iCARD cut-off"
    ],
    "body": [
      "PAY-IN API provides the interface to partners and merchants both for online authorizations and for online capture (clearing confirmation), thus providing the full functionality of the standard dual message transaction processing. The acquiring processing to the card scheme is transparent to the partner and managed wholly by iCARD. All captured transactions are settled up to the card when iCARD system cut-off is triggered.",
      "Upon chargeback case received at iCARD, there is an automated report for the partner available at the exchange directory.",
      "There is a partner backend system - an internet portal for reviewing the transactions activity, chargeback ratios, risk management facilities and accounting and payout information."
    ]
  },
  "xml-standard": {
    "title": "XML PAY-IN Standard Interface",
    "subtitle": "XML standard",
    "description": "WPA accepts XML 1.0 commands and returns XML responses using a standard wrapper around command-specific properties.",
    "facts": [
      "XML 1.0",
      "Case-sensitive lowercase properties",
      "One command per session"
    ],
    "body": [
      "PAY-IN interface runs as a server instance and accepts commands formatted with standard XML protocol version 1.0. This plain text protocol is easy to implement and monitor. All the commands are handled as RPC, so they are transparent for the remote developer, who handles the response code upon operation completion. Responses give the whole needed information for a successful command or exact error codes mapped to cases of failure. The communication to PAY-IN interface is over TCP/IP socket connection. It's a single command per session type, i.e. after sending the response to the partner, PAY-IN interface closes the transmission.",
      "All properties are defined with small letters as xml protocol is case sensitive.",
      "All commands and responses have standard wrapping which is defined like this:",
      "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>",
      "<ipayin_request>",
      "<command>NNN</command>",
      "<stan>111111</stan>",
      "<dttm>2011-03-01 12:34:55</dttm>",
      "</ipayin_request>",
      "Standard wrapping for responses:",
      "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>",
      "<ipayin_response>",
      "<command>NNN</command>",
      "<trn>20130331141516123456</trn>",
      "<trndttm>2011-03-01 12:34:56</trndttm>",
      "<stan>999999</stan>",
      "<dttm>2011-03-01 12:34:55</dttm>",
      "<status>NN</status>",
      "<status_msg>Status Message text</status_msg>",
      "<status_details>Status details text</status_details>",
      "</ipayin_response>",
      "All commands have specific input parameters which are defined in the following chapters.",
      "All parameters listed for the requests and the responses are mandatory, unless explicitly mentioned."
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>NNN</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n</ipayin_request>",
    "response": "Standard wrapping for responses:\n<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_response>\n  <command>NNN</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <status>NN</status>\n  <status_msg>Status Message text</status_msg>\n  <status_details>Status details text</status_details>\n</ipayin_response>"
  },
  "standard-request-properties": {
    "title": "Command Standard Properties",
    "subtitle": "Reference",
    "description": "Standard properties included in WPA command requests.",
    "facts": [
      "command",
      "stan",
      "dttm"
    ],
    "fieldSections": [
      {
        "title": "Command standard properties",
        "description": "Base request fields shared by WPA commands unless a command states otherwise.",
        "fields": [
          {
            "name": "command",
            "sample": "601",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "Code for the command which is executed."
          },
          {
            "name": "stan",
            "sample": "111111",
            "type": "N (6)",
            "requirement": "Mandatory",
            "description": "Sequential number for the transmission. Unique in combination with dttm. Minimum value: 000001. Maximum value: 999999. Once the maximum value is reached that the counter is restarted and presented as 000001."
          },
          {
            "name": "dttm",
            "sample": "2011-03-01 12:34:55",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Date and time from the partners' gateway. Format is: YYYY-MM-DD HH:MM:SS"
          }
        ],
        "showSample": true
      }
    ]
  },
  "standard-response-properties": {
    "title": "Response Standard Properties",
    "subtitle": "Reference",
    "description": "Standard properties returned in WPA command responses.",
    "facts": [
      "status=0 means command completed",
      "status_msg explains status",
      "status_details may provide diagnostics"
    ],
    "fieldSections": [
      {
        "title": "Response standard properties",
        "description": "Base response fields shared by WPA responses unless a command states otherwise.",
        "fields": [
          {
            "name": "command",
            "sample": "999",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "Code for the command which has been executed (echo)."
          },
          {
            "name": "status",
            "sample": "0",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "Code upon command completion. 0 is success otherwise error (See \"Error codes received from PAY-IN interface\")."
          },
          {
            "name": "status_msg",
            "sample": "Command completed successfully",
            "type": "C (max)",
            "requirement": "Mandatory",
            "description": "Description for <status> code"
          },
          {
            "name": "status_details",
            "sample": "-",
            "type": "C (max)",
            "requirement": "Mandatory",
            "description": "Additional detail upon success or failure."
          },
          {
            "name": "trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "Transaction Reference Number (TRN). Unique transaction ID assigned by PAYIN interface."
          },
          {
            "name": "trndttm",
            "sample": "2011-03-01 12:34:56",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "YYYY-MM-DD HH:MM:SS. Timestamp from PAY-IN interface GMT + 0"
          },
          {
            "name": "stan",
            "sample": "999999",
            "type": "N (6)",
            "requirement": "Mandatory",
            "description": "Echo from the request"
          },
          {
            "name": "dttm",
            "sample": "2011-03-01 12:34:55",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "YYYY-MM-DD HH:MM:SS. Echo from the request"
          }
        ],
        "showSample": true
      }
    ]
  },
  "command-codes": {
    "title": "WEB PAY-IN API Command Codes",
    "subtitle": "Reference",
    "description": "Numerical list of supported WPA command codes.",
    "facts": [
      "16 command codes",
      "Capture required for selected commands",
      "resp_code must be checked where applicable"
    ],
    "tables": [
      {
        "title": "Command codes",
        "description": "",
        "headers": [
          "Command Number",
          "Description"
        ],
        "rows": [
          [
            "601",
            "Authorization request. Most common case for a transaction."
          ],
          [
            "602",
            "Reversal of 601, 604, 605, 606, 609"
          ],
          [
            "604",
            "First recurring transaction."
          ],
          [
            "605",
            "Subsequent recurring transaction."
          ],
          [
            "606",
            "Refund transaction."
          ],
          [
            "607",
            "Online transaction capture (transaction clearing)."
          ],
          [
            "609",
            "Refund transaction from TRN."
          ],
          [
            "611",
            "Reversal of 601, 604, 605, 606, 609 from TRN."
          ],
          [
            "615",
            "Account verification."
          ],
          [
            "617",
            "Pre-authorization Completion from RRN"
          ],
          [
            "618",
            "Pre-authorization Cancellation from RRN"
          ],
          [
            "621",
            "Transaction retrieval"
          ],
          [
            "623",
            "Pre-authorization Request"
          ],
          [
            "624",
            "Pre-authorization Completion from TRN"
          ],
          [
            "625",
            "Pre-authorization Cancellation from TRN"
          ],
          [
            "5000",
            "Connection check."
          ]
        ]
      }
    ],
    "notes": [
      "Commands 601, 604, 605, 606, 609, 615 must handle <resp_code> property from response, even after receiving <status> = 0 - Command completed successfully. 00, 85 - transaction is approved <> 00 - transaction is declined",
      "Commands 601, 604, 605, 606, 609 must be confirmed with command 607 - online capture in order to be included in Card Schemes' clearing."
    ]
  },
  "cmd-601": {
    "title": "601 Authorization",
    "subtitle": "Command",
    "description": "This command makes authorization to a cardholder account. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request.",
    "facts": [
      "WPA 5.4",
      "Command 601",
      "Check resp_code",
      "Confirm with 607 capture"
    ],
    "body": [
      "This command makes authorization to a cardholder account. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "pan",
            "sample": "532600000000000000",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Account number (PAN) for the transaction"
          },
          {
            "name": "expdt",
            "sample": "1703",
            "type": "N (4)",
            "requirement": "Mandatory",
            "description": "Expire date for the card in YYMM standard"
          },
          {
            "name": "cvc2",
            "sample": "999",
            "type": "N (3), N (4) for Amex",
            "requirement": "Mandatory",
            "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
          },
          {
            "name": "mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount for the transaction"
          },
          {
            "name": "currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "payment_ref",
            "sample": "ABCD123456",
            "type": "C (50)",
            "requirement": "Mandatory",
            "description": "Payment reference for the merchant or the partner. Could be order or customer number."
          },
          {
            "name": "customer_ip",
            "sample": "10.20.30.40",
            "type": "C (40)",
            "requirement": "Mandatory",
            "description": "IP address of the cardholder initiated the transaction."
          },
          {
            "name": "customer_credentials",
            "sample": "customer@mywebsite.com",
            "type": "C (255)",
            "requirement": "Mandatory",
            "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
          },
          {
            "name": "stored_credential_ind",
            "sample": "1",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Indicates whether the transaction is initiated using a stored credential, i.e., one-click payments."
          },
          {
            "name": "program_protocol",
            "sample": "2",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
          },
          {
            "name": "ds_transaction_id",
            "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
            "type": "ANS (36)",
            "requirement": "Mandatory",
            "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
          },
          {
            "name": "sca_exemption",
            "sample": "02 - Acquirer Low-Fraud and Transaction Risk Analysis 04 - Low-Value Payment",
            "type": "",
            "requirement": "Mandatory",
            "description": "Applied strong customer exemptions indicators (currently used for Mastercard and Visa)."
          },
          {
            "name": "eci",
            "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 6 - MC - full 3D authentication in case of SCA exemption 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable 5 - Amex - Authenticated with AEVV 6 - Amex - Attempted with AEVV 7 - Amex - Not Authenticated 8 - This is a phone order transaction",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure, Verified by Visa or Amex Safekey programs."
          },
          {
            "name": "avv",
            "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
          },
          {
            "name": "xid",
            "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "XID stain for a 3D transaction (VISA, Amex). Originally 20 bytes/characters (e.g. 20110808000000000450), Base64 encoded"
          },
          {
            "name": "token_indicator",
            "sample": "1",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Indicates whether the transaction is initiated using tokenized card."
          },
          {
            "name": "token_requestor_id",
            "sample": "40010030273 - Apple Pay 40010075001 - Google Pay",
            "type": "N (11)",
            "requirement": "Mandatory",
            "description": "Contains the ID assigned by the Token Service Provider to the Token Requestor."
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "resp_code",
            "sample": "00",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer or acquiring system"
          },
          {
            "name": "approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code returned by card issuer"
          },
          {
            "name": "cvc2_result",
            "sample": "M",
            "type": "C (1)",
            "requirement": "Mandatory",
            "description": "Result of cvc2 check"
          }
        ],
        "showSample": true
      }
    ],
    "notes": [
      "The parameters <avv> and <xid> must be supplied only if <eci> is 1, 2, 5 or 6. The parameters <avv> is optional for transactions with different ECI values. The parameters < ds_transaction_id> is optional for transactions when <program_protocol> is 2 and <token_indicator> is 1."
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>601</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <pan>5326000000000000</pan>\n  <expdt>1306</expdt>\n  <cvc2>818</cvc2>\n  <mid>000000000099999</mid>\n  <amount>1.01</amount>\n  <currency>978</currency>\n  <payment_ref> ABCD123456</payment_ref>\n  <customer_ip>10.20.30.40</customer_ip>\n  <customer_credentials>customer@mywebsite.com</customer_credentials>\n  <program_protocol>2</program_protocol>\n  <ds_transaction_id></ds_transaction_id>\n  <eci>5</eci>\n  <avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>\n  <xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>\n<token_indicator></token_indicator>\n<token_requestor_id></token_requestor_id>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>601</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <resp_code>00</resp_code>\n<approval>136615</approval>\n<cvc2_result>M</cvc2_result>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "pan",
        "sample": "532600000000000000",
        "type": "C (19)",
        "requirement": "Mandatory",
        "description": "Account number (PAN) for the transaction"
      },
      {
        "name": "expdt",
        "sample": "1703",
        "type": "N (4)",
        "requirement": "Mandatory",
        "description": "Expire date for the card in YYMM standard"
      },
      {
        "name": "cvc2",
        "sample": "999",
        "type": "N (3), N (4) for Amex",
        "requirement": "Mandatory",
        "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
      },
      {
        "name": "mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount for the transaction"
      },
      {
        "name": "currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "payment_ref",
        "sample": "ABCD123456",
        "type": "C (50)",
        "requirement": "Mandatory",
        "description": "Payment reference for the merchant or the partner. Could be order or customer number."
      },
      {
        "name": "customer_ip",
        "sample": "10.20.30.40",
        "type": "C (40)",
        "requirement": "Mandatory",
        "description": "IP address of the cardholder initiated the transaction."
      },
      {
        "name": "customer_credentials",
        "sample": "customer@mywebsite.com",
        "type": "C (255)",
        "requirement": "Mandatory",
        "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
      },
      {
        "name": "stored_credential_ind",
        "sample": "1",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Indicates whether the transaction is initiated using a stored credential, i.e., one-click payments."
      },
      {
        "name": "program_protocol",
        "sample": "2",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
      },
      {
        "name": "ds_transaction_id",
        "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
        "type": "ANS (36)",
        "requirement": "Mandatory",
        "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
      },
      {
        "name": "sca_exemption",
        "sample": "02 - Acquirer Low-Fraud and Transaction Risk Analysis 04 - Low-Value Payment",
        "type": "",
        "requirement": "Mandatory",
        "description": "Applied strong customer exemptions indicators (currently used for Mastercard and Visa)."
      },
      {
        "name": "eci",
        "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 6 - MC - full 3D authentication in case of SCA exemption 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable 5 - Amex - Authenticated with AEVV 6 - Amex - Attempted with AEVV 7 - Amex - Not Authenticated 8 - This is a phone order transaction",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure, Verified by Visa or Amex Safekey programs."
      },
      {
        "name": "avv",
        "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
      },
      {
        "name": "xid",
        "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "XID stain for a 3D transaction (VISA, Amex). Originally 20 bytes/characters (e.g. 20110808000000000450), Base64 encoded"
      },
      {
        "name": "token_indicator",
        "sample": "1",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Indicates whether the transaction is initiated using tokenized card."
      },
      {
        "name": "token_requestor_id",
        "sample": "40010030273 - Apple Pay 40010075001 - Google Pay",
        "type": "N (11)",
        "requirement": "Mandatory",
        "description": "Contains the ID assigned by the Token Service Provider to the Token Requestor."
      }
    ]
  },
  "cmd-602": {
    "title": "602 Reversal",
    "subtitle": "Command",
    "description": "This command makes a reversal to a previous transaction. Used in case of:",
    "facts": [
      "WPA 5.4",
      "Command 602",
      "Retry-safe reversal"
    ],
    "body": [
      "This command makes a reversal to a previous transaction. Used in case of:",
      "Late or missing response.",
      "Void to a previously settled transaction due to an error in clearing or a cardholder order cancelation.",
      "When communication breakdown occurs and the partner is not receiving an answer to the request, the partner should repeat the message continuously until one of the three response codes is received:",
      "0 - Success",
      "7 - Transaction not found. This means that WEB PAY-IN interface is unable to find the original transaction, so no financial impact for the cardholder. Action - success.",
      "9 - Duplicated transmission is detected. This means that WEB PAY-IN interface has already received one of the previous attempts and has successfully processed the request. Action - success."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "original_stan",
            "sample": "999999",
            "type": "N (6)",
            "requirement": "Mandatory",
            "description": "Original request STAN"
          },
          {
            "name": "original_dttm",
            "sample": "2011-03-01 12:34:55",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Date and time of the original transaction. Format is: YYYY-MM-DD HH:MM:SS"
          },
          {
            "name": "Mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assign to the site/outlet or to the merchant"
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "original_trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "TRN of the original transaction."
          },
          {
            "name": "resp_code",
            "sample": "00",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer or acquiring system"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>602</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <original_stan>999999</original_stan>\n  <original_dttm>2011-03-01 12:34:55</original_dttm>\n  <mid>000000000099999</mid>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>602</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <original_trn>20130331141516123455</original_trn>\n  <resp_code>00</resp_code>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "original_stan",
        "sample": "999999",
        "type": "N (6)",
        "requirement": "Mandatory",
        "description": "Original request STAN"
      },
      {
        "name": "original_dttm",
        "sample": "2011-03-01 12:34:55",
        "type": "C (19)",
        "requirement": "Mandatory",
        "description": "Date and time of the original transaction. Format is: YYYY-MM-DD HH:MM:SS"
      },
      {
        "name": "Mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assign to the site/outlet or to the merchant"
      }
    ]
  },
  "cmd-604": {
    "title": "604 First recurring",
    "subtitle": "Command",
    "description": "This command makes the first transaction in a recurring agreement (recurring sign up). When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request.",
    "facts": [
      "WPA 5.4",
      "Command 604",
      "Check resp_code",
      "Confirm with 607 capture"
    ],
    "body": [
      "This command makes the first transaction in a recurring agreement (recurring sign up). When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "Pan",
            "sample": "532600000000000000",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Account number (PAN) for the transaction"
          },
          {
            "name": "Expdt",
            "sample": "1503",
            "type": "N (4)",
            "requirement": "Mandatory",
            "description": "Expire date for the card in YYMM standard"
          },
          {
            "name": "cvc2",
            "sample": "999",
            "type": "N (3), N (4) for Amex",
            "requirement": "Mandatory",
            "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
          },
          {
            "name": "Mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount for the transaction. Zero-value transaction amount to establish an agreement for subscription is also allowed."
          },
          {
            "name": "Currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "payment_ref",
            "sample": "ABCD123456",
            "type": "C (50)",
            "requirement": "Mandatory",
            "description": "Payment reference for the merchant or the partner. Could be order or customer number."
          },
          {
            "name": "customer_ip",
            "sample": "10.20.30.40",
            "type": "C (40)",
            "requirement": "Mandatory",
            "description": "IP address of the cardholder initiated the transaction."
          },
          {
            "name": "customer_credentials",
            "sample": "customer@mywebsite.com",
            "type": "C (255)",
            "requirement": "Mandatory",
            "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
          },
          {
            "name": "dynamic_descriptor",
            "sample": "trial",
            "type": "C (10)",
            "requirement": "Mandatory",
            "description": "A dynamic data sent by the Merchant for each transaction which will appear on the customer's statement as a part of the billing descriptor. Applied for subscription merchants offering free trials. Possible values: Trial Free trial"
          },
          {
            "name": "recurring_type",
            "sample": "R - Recurring C - Credential-on-File",
            "type": "C (1)",
            "requirement": "Mandatory",
            "description": "Recurring processing model."
          },
          {
            "name": "program_protocol",
            "sample": "2",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
          },
          {
            "name": "ds_transaction_id",
            "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
            "type": "ANS (36)",
            "requirement": "Mandatory",
            "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
          },
          {
            "name": "eci",
            "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 7 - MC - full 3D authentication used for recurring transactions only 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable 5 - Amex - Authenticated with AEVV 6 - Amex - Attempted with AEVV 7 - Amex - Not Authenticated 8 - This is a phone order transaction",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure, Verified by Visa or Amex Safekey programs."
          },
          {
            "name": "Avv",
            "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
          },
          {
            "name": "Xid",
            "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "XID stain for a 3D transaction (VISA, Amex). Originally 20 bytes/characters (e. g. 20110808000000000450), Base64 encoded"
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "resp_code",
            "sample": "00",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer or acquiring system"
          },
          {
            "name": "Approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code returned by card issuer"
          },
          {
            "name": "cvc2_result",
            "sample": "M",
            "type": "C (1)",
            "requirement": "Optional",
            "description": "Result of cvc2 check (optional)"
          }
        ],
        "showSample": true
      }
    ],
    "notes": [
      "The parameters <avv> and <xid> must be supplied if <eci> is 1, 2, 5, or 6. The parameter <avv> must be also supplied if <eci> is 7 for Mastercard. The parameters <avv> is optional for transactions with different ECI values."
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>604</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <pan>5326000000000000</pan>\n  <expdt>1306</expdt>\n  <cvc2>818</cvc2>\n  <mid>000000000099999</mid>\n  <amount>1.01</amount>\n  <currency>978</currency>\n  <payment_ref> ABCD123456</payment_ref>\n  <customer_ip>10.20.30.40</customer_ip>\n  <customer_credentials>customer@mywebsite.com</customer_credentials>\n  <recurring_type>R</recurring_type>\n  <program_protocol>2</program_protocol>\n  <ds_transaction_id></ds_transaction_id>\n  <eci>5</eci>\n  <avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>\n  <xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>604</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <resp_code>00</resp_code>\n<approval>136615</approval>\n<cvc2_result>M</cvc2_result>\n<status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "Pan",
        "sample": "532600000000000000",
        "type": "C (19)",
        "requirement": "Mandatory",
        "description": "Account number (PAN) for the transaction"
      },
      {
        "name": "Expdt",
        "sample": "1503",
        "type": "N (4)",
        "requirement": "Mandatory",
        "description": "Expire date for the card in YYMM standard"
      },
      {
        "name": "cvc2",
        "sample": "999",
        "type": "N (3), N (4) for Amex",
        "requirement": "Mandatory",
        "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
      },
      {
        "name": "Mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount for the transaction. Zero-value transaction amount to establish an agreement for subscription is also allowed."
      },
      {
        "name": "Currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "payment_ref",
        "sample": "ABCD123456",
        "type": "C (50)",
        "requirement": "Mandatory",
        "description": "Payment reference for the merchant or the partner. Could be order or customer number."
      },
      {
        "name": "customer_ip",
        "sample": "10.20.30.40",
        "type": "C (40)",
        "requirement": "Mandatory",
        "description": "IP address of the cardholder initiated the transaction."
      },
      {
        "name": "customer_credentials",
        "sample": "customer@mywebsite.com",
        "type": "C (255)",
        "requirement": "Mandatory",
        "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
      },
      {
        "name": "dynamic_descriptor",
        "sample": "trial",
        "type": "C (10)",
        "requirement": "Mandatory",
        "description": "A dynamic data sent by the Merchant for each transaction which will appear on the customer's statement as a part of the billing descriptor. Applied for subscription merchants offering free trials. Possible values: Trial Free trial"
      },
      {
        "name": "recurring_type",
        "sample": "R - Recurring C - Credential-on-File",
        "type": "C (1)",
        "requirement": "Mandatory",
        "description": "Recurring processing model."
      },
      {
        "name": "program_protocol",
        "sample": "2",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
      },
      {
        "name": "ds_transaction_id",
        "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
        "type": "ANS (36)",
        "requirement": "Mandatory",
        "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
      },
      {
        "name": "eci",
        "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 7 - MC - full 3D authentication used for recurring transactions only 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable 5 - Amex - Authenticated with AEVV 6 - Amex - Attempted with AEVV 7 - Amex - Not Authenticated 8 - This is a phone order transaction",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure, Verified by Visa or Amex Safekey programs."
      },
      {
        "name": "Avv",
        "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
      },
      {
        "name": "Xid",
        "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "XID stain for a 3D transaction (VISA, Amex). Originally 20 bytes/characters (e. g. 20110808000000000450), Base64 encoded"
      }
    ]
  },
  "cmd-605": {
    "title": "605 Subsequent recurring",
    "subtitle": "Command",
    "description": "Used for consequent recurring transactions based on the first sign up. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request.",
    "facts": [
      "WPA 5.4",
      "Command 605",
      "Check resp_code",
      "Confirm with 607 capture"
    ],
    "body": [
      "Used for consequent recurring transactions based on the first sign up. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "Trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "<trn> property from the response of the first recurring transaction"
          },
          {
            "name": "Mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assign to the site/outlet or to the merchant"
          },
          {
            "name": "Amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount for the transaction"
          },
          {
            "name": "Currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "payment_ref",
            "sample": "ABCD123456",
            "type": "C (50)",
            "requirement": "Mandatory",
            "description": "Payment reference for the merchant or the partner. Could be order or customer number."
          },
          {
            "name": "customer_credentials",
            "sample": "customer@mywebsite.com",
            "type": "C (255)",
            "requirement": "Mandatory",
            "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
          },
          {
            "name": "recurring_type",
            "sample": "R - Recurring C - Credential-on-File",
            "type": "C (1)",
            "requirement": "Mandatory",
            "description": "Recurring processing model."
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "resp_code",
            "sample": "00",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer or acquiring system"
          },
          {
            "name": "Approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code returned by card issuer"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>605</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <trn>20130331141516123456</trn>\n  <mid>000000000099999</mid>\n  <amount>1.01</amount>\n  <currency>978</currency>\n  <payment_ref>ABCD123456</payment_ref>\n  <customer_credentials>customer@mywebsite.com</customer_credentials>\n  <recurring_type>R</recurring_type>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>605</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <resp_code>00</resp_code>\n  <approval>136615</approval>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "Trn",
        "sample": "20130331141516123456",
        "type": "N (20)",
        "requirement": "Mandatory",
        "description": "<trn> property from the response of the first recurring transaction"
      },
      {
        "name": "Mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assign to the site/outlet or to the merchant"
      },
      {
        "name": "Amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount for the transaction"
      },
      {
        "name": "Currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "payment_ref",
        "sample": "ABCD123456",
        "type": "C (50)",
        "requirement": "Mandatory",
        "description": "Payment reference for the merchant or the partner. Could be order or customer number."
      },
      {
        "name": "customer_credentials",
        "sample": "customer@mywebsite.com",
        "type": "C (255)",
        "requirement": "Mandatory",
        "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
      },
      {
        "name": "recurring_type",
        "sample": "R - Recurring C - Credential-on-File",
        "type": "C (1)",
        "requirement": "Mandatory",
        "description": "Recurring processing model."
      }
    ]
  },
  "cmd-606": {
    "title": "606 Refund transaction",
    "subtitle": "Command",
    "description": "This command makes refund (credit) to a cardholder account. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request.",
    "facts": [
      "WPA 5.4",
      "Command 606",
      "Check resp_code",
      "Confirm with 607 capture"
    ],
    "body": [
      "This command makes refund (credit) to a cardholder account. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "Pan",
            "sample": "532600000000000000",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Account number (PAN) for the transaction"
          },
          {
            "name": "Expdt",
            "sample": "1503",
            "type": "N (4)",
            "requirement": "Mandatory",
            "description": "Expire date for the card in YYMM standard"
          },
          {
            "name": "Mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "Amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount for the transaction"
          },
          {
            "name": "Currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "payment_ref",
            "sample": "ABCD123456",
            "type": "C (50)",
            "requirement": "Mandatory",
            "description": "Payment reference for the merchant or the partner. Could be order or customer number."
          },
          {
            "name": "customer_credentials",
            "sample": "customer@mywebsite.com",
            "type": "C (255)",
            "requirement": "Mandatory",
            "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "resp_code",
            "sample": "00",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer or acquiring system"
          },
          {
            "name": "Approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code returned by card issuer"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>606</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <pan>5326000000000000</pan>\n  <expdt>1306</expdt>\n  <mid>000000000000044</mid>\n  <amount>1.01</amount>\n  <currency>978</currency>\n  <payment_ref>ABCD123456</payment_ref>\n  <customer_credentials>customer@mywebsite.com</customer_credentials>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>606</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <resp_code>00</resp_code>\n  <approval>136615</approval>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "Pan",
        "sample": "532600000000000000",
        "type": "C (19)",
        "requirement": "Mandatory",
        "description": "Account number (PAN) for the transaction"
      },
      {
        "name": "Expdt",
        "sample": "1503",
        "type": "N (4)",
        "requirement": "Mandatory",
        "description": "Expire date for the card in YYMM standard"
      },
      {
        "name": "Mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "Amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount for the transaction"
      },
      {
        "name": "Currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "payment_ref",
        "sample": "ABCD123456",
        "type": "C (50)",
        "requirement": "Mandatory",
        "description": "Payment reference for the merchant or the partner. Could be order or customer number."
      },
      {
        "name": "customer_credentials",
        "sample": "customer@mywebsite.com",
        "type": "C (255)",
        "requirement": "Mandatory",
        "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
      }
    ]
  },
  "cmd-607": {
    "title": "607 Capture",
    "subtitle": "Command",
    "description": "The capture (clearing) process is used to confirm and settle the transaction flow processed through the authorization requests, thus providing the second stage of the standard dual message transaction processing. Transactions that are not cleared won't be settled to the card schemes and will remain only as authorized (blocked) amounts (the card issuer can release them after a standard period of waiting for the settlement). The clearing processing goes as follows: the corresponding authorization is found by the supplied <trn>; the other supplied parameters are compared to be the same as the ones in the authorization; the transaction clearing status is checked and if the transaction is approved and not reversed, it's marked for clearing to the card scheme. If some of the above conditions are not fulfilled, an appropriate error code is returned.",
    "facts": [
      "WPA 5.4",
      "Command 607"
    ],
    "body": [
      "The capture (clearing) process is used to confirm and settle the transaction flow processed through the authorization requests, thus providing the second stage of the standard dual message transaction processing. Transactions that are not cleared won't be settled to the card schemes and will remain only as authorized (blocked) amounts (the card issuer can release them after a standard period of waiting for the settlement). The clearing processing goes as follows: the corresponding authorization is found by the supplied <trn>; the other supplied parameters are compared to be the same as the ones in the authorization; the transaction clearing status is checked and if the transaction is approved and not reversed, it's marked for clearing to the card scheme. If some of the above conditions are not fulfilled, an appropriate error code is returned.",
      "This command provides alternative to the batch clearing files interface. The processing is similar, the difference is that there is no specific cut-off for running the process; and that it's done for one transaction at a time, not for a batch of transactions.",
      "When communication breakdown occurs and the partner is not receiving an answer to the request, the partner should repeat the message continuously until one of the three response codes is received:",
      "0 - Success",
      "9 - Duplicated transmission is detected. This means that WEB PAY-IN interface has already received one of the previous attempts and has successfully processed the request. Action - success."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "Trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "Unique transaction ID assigned by WEB PAY-IN interface and returned in the response of the authorization request"
          },
          {
            "name": "Mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "Amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount of the request"
          },
          {
            "name": "Currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "Approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "original_trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "TRN of the original transaction."
          }
        ],
        "showSample": true
      }
    ],
    "notes": [
      "Transactions made with commands 601, 604, 605, 606, 609 need a capture in order WEB PAY-IN interface to initiate a clearing to the card schemes."
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>607</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <trn>20130331141516123456</trn>\n  <mid>000000000000044</mid>\n  <amount>1.01</amount>\n  <currency>978</currency>\n  <approval>136615</approval>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>607</command>\n  <trn>20130331141516123457</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <original_trn>20130331141516123456</original_trn>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "Trn",
        "sample": "20130331141516123456",
        "type": "N (20)",
        "requirement": "Mandatory",
        "description": "Unique transaction ID assigned by WEB PAY-IN interface and returned in the response of the authorization request"
      },
      {
        "name": "Mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "Amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount of the request"
      },
      {
        "name": "Currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "Approval",
        "sample": "999999",
        "type": "C (6)",
        "requirement": "Mandatory",
        "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
      }
    ]
  },
  "cmd-609": {
    "title": "609 Refund from TRN",
    "subtitle": "Command",
    "description": "This command makes refund (credit) to a cardholder account. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request. Command 609 is a shortcut call to command 606. Instead of supplying the card parameters, this command uses a previously executed authorization request.",
    "facts": [
      "WPA 5.4",
      "Command 609",
      "Check resp_code",
      "Confirm with 607 capture"
    ],
    "body": [
      "This command makes refund (credit) to a cardholder account. When communication breakdown occurs and the partner is not receiving an answer to the request, the partner must continue with command 602 - reversal request. Command 609 is a shortcut call to command 606. Instead of supplying the card parameters, this command uses a previously executed authorization request."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "Trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "Unique transaction ID assigned by WEB PAY-IN interface and returned in the response of the authorization request"
          },
          {
            "name": "Mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "Amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount of the request"
          },
          {
            "name": "Currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "Approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "resp_code",
            "sample": "00",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer or acquiring system"
          },
          {
            "name": "Approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code returned by card issuer"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>609</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <trn>20130331141516123456</trn>\n  <mid>000000000000044</mid>\n  <amount>1.01</amount>\n  <currency>978</currency>\n  <approval>136615</approval>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>609</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <resp_code>00</resp_code>\n  <approval>136615</approval>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "Trn",
        "sample": "20130331141516123456",
        "type": "N (20)",
        "requirement": "Mandatory",
        "description": "Unique transaction ID assigned by WEB PAY-IN interface and returned in the response of the authorization request"
      },
      {
        "name": "Mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "Amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount of the request"
      },
      {
        "name": "Currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "Approval",
        "sample": "999999",
        "type": "C (6)",
        "requirement": "Mandatory",
        "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
      }
    ]
  },
  "cmd-611": {
    "title": "611 Reversal from TRN",
    "subtitle": "Command",
    "description": "This command makes a reversal to a previous transaction. Used in case of:",
    "facts": [
      "WPA 5.4",
      "Command 611",
      "Retry-safe reversal"
    ],
    "body": [
      "This command makes a reversal to a previous transaction. Used in case of:",
      "Late or missing response.",
      "Void to a previously settled transaction due to an error in clearing or a cardholder order cancelation.",
      "When communication breakdown occurs and the partner is not receiving an answer to the request, the partner should repeat the message continuously until one of the three response codes is received:",
      "0 - Success",
      "7 - Transaction not found. This means that WEB PAY-IN interface is unable to find the original transaction, so no financial impact for the cardholder. Action - success.",
      "9 - Duplicated transmission is detected. This means that WEB PAY-IN interface has already received one of the previous attempts and has successfully processed the request. Action - success."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "Trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "Unique transaction ID assigned by WEB PAY-IN interface and returned in the response of the authorization request"
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "resp_code",
            "sample": "00",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer or acquiring system"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>611</command>\n  <stan>111111</stan>\n  <dttm>2013-03-01 12:34:55</dttm>\n  <trn>20130331141516123456</trn>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n <ipayin_response>\n <command>611</command>\n <trn>20130331141516123600</trn>\n <trndttm>2013-03-01 12:54:57</trndttm>\n <stan>111111</stan>\n <dttm>2013-03-01 12:34:55</dttm>\n <resp_code>00</resp_code>\n <status>0</status>\n <status_msg>Command completed successfully</status_msg>\n <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "Trn",
        "sample": "20130331141516123456",
        "type": "N (20)",
        "requirement": "Mandatory",
        "description": "Unique transaction ID assigned by WEB PAY-IN interface and returned in the response of the authorization request"
      }
    ]
  },
  "cmd-615": {
    "title": "615 Account verification",
    "subtitle": "Command",
    "description": "This command is used for validation of cardholder account as request with zero amount is performed. The command is used for Mastercard and Visa.",
    "facts": [
      "WPA 5.4",
      "Command 615",
      "Check resp_code"
    ],
    "body": [
      "This command is used for validation of cardholder account as request with zero amount is performed. The command is used for Mastercard and Visa."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "Pan",
            "sample": "532600000000000000",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Account number (PAN) for the transaction"
          },
          {
            "name": "Expdt",
            "sample": "1703",
            "type": "N (4)",
            "requirement": "Mandatory",
            "description": "Expire date for the card in YYMM standard"
          },
          {
            "name": "cvc2",
            "sample": "999",
            "type": "N (3), N (4) for Amex",
            "requirement": "Mandatory",
            "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
          },
          {
            "name": "Mid",
            "sample": "000000000099999",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "Currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "payment_ref",
            "sample": "ABCD123456",
            "type": "C (50)",
            "requirement": "Mandatory",
            "description": "Payment reference for the merchant or the partner. Could be order or customer number."
          },
          {
            "name": "stored_credential_ind",
            "sample": "1",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Indicates setting up a stored credential."
          },
          {
            "name": "program_protocol",
            "sample": "2",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
          },
          {
            "name": "ds_transaction_id",
            "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
            "type": "ANS (36)",
            "requirement": "Mandatory",
            "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
          },
          {
            "name": "Eci",
            "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure or Verified by Visa."
          },
          {
            "name": "Avv",
            "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
          },
          {
            "name": "Xid",
            "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "XID stain for a 3D transaction (VISA). Originally 20 bytes/characters (e.g. 20110808000000000450), Base64 encoded"
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "resp_code",
            "sample": "85",
            "type": "C (2)",
            "requirement": "Mandatory",
            "description": "Response provided by issuer."
          },
          {
            "name": "Approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code returned by card issuer"
          },
          {
            "name": "cvc2_result",
            "sample": "M",
            "type": "C (1)",
            "requirement": "Mandatory",
            "description": "Result of cvc2 check"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>615</command>\n  <stan>111111</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <pan>4987000000000000</pan>\n  <expdt>1306</expdt>\n  <cvc2>818</cvc2>\n  <mid>000000000099999</mid>\n  <currency>978</currency>\n  <payment_ref> ABCD123456</payment_ref>\n  <stored_credential_ind></stored_credential_ind>\n  <program_protocol>2</program_protocol>\n  <ds_transaction_id></ds_transaction_id>\n  <eci>5</eci>\n  <avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>\n  <xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>615</command>\n  <trn>20130331141516123456</trn>\n  <trndttm>2011-03-01 12:34:56</trndttm>\n  <stan>999999</stan>\n  <dttm>2011-03-01 12:34:55</dttm>\n  <resp_code>85</resp_code>\n<approval>136615</approval>\n<cvc2_result>M</cvc2_result>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": [
      {
        "name": "Pan",
        "sample": "532600000000000000",
        "type": "C (19)",
        "requirement": "Mandatory",
        "description": "Account number (PAN) for the transaction"
      },
      {
        "name": "Expdt",
        "sample": "1703",
        "type": "N (4)",
        "requirement": "Mandatory",
        "description": "Expire date for the card in YYMM standard"
      },
      {
        "name": "cvc2",
        "sample": "999",
        "type": "N (3), N (4) for Amex",
        "requirement": "Mandatory",
        "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
      },
      {
        "name": "Mid",
        "sample": "000000000099999",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "Currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "payment_ref",
        "sample": "ABCD123456",
        "type": "C (50)",
        "requirement": "Mandatory",
        "description": "Payment reference for the merchant or the partner. Could be order or customer number."
      },
      {
        "name": "stored_credential_ind",
        "sample": "1",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Indicates setting up a stored credential."
      },
      {
        "name": "program_protocol",
        "sample": "2",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
      },
      {
        "name": "ds_transaction_id",
        "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
        "type": "ANS (36)",
        "requirement": "Mandatory",
        "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
      },
      {
        "name": "Eci",
        "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure or Verified by Visa."
      },
      {
        "name": "Avv",
        "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
      },
      {
        "name": "Xid",
        "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "XID stain for a 3D transaction (VISA). Originally 20 bytes/characters (e.g. 20110808000000000450), Base64 encoded"
      }
    ]
  },
  "cmd-617": {
    "title": "617 Pre-auth completion RRN",
    "subtitle": "Command",
    "description": "Retrieves funds that have been locked and prepares them for settlement into the merchant's account from RRN.",
    "facts": [
      "WPA 5.4",
      "Command 617",
      "Pre-authorization flow"
    ],
    "body": [
      "Retrieves funds that have been locked and prepares them for settlement into the merchant's account from RRN."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "rrn",
            "sample": "328914233998",
            "type": "N (12)",
            "requirement": "Mandatory",
            "description": "<rrn> property from the response of the pre-authorization request"
          },
          {
            "name": "mid",
            "sample": "000000000000112",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "amount",
            "sample": "1.49",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount of the request"
          },
          {
            "name": "currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "approval",
            "sample": "0B396A",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<iserver_request>\n<command>617</command>\n<stan>111111</stan>\n<dttm>2023-10-16 14:25:00</dttm>\n<rrn>328914233998</rrn>\n<mid>000000000000112</mid>\n<amount>1.49</amount>\n<currency>978</currency>\n<approval>0B396A</approval>\n<amount_st></amount_st>\n<currency_st></currency_st>\n<margin_st></margin_st>\n</iserver_request>",
    "response": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<iserver_response>\n<command>617</command>\n<trn>20231016142459233999</trn>\n<trndttm>2023-10-16 14:24:29</trndttm>\n<stan>111111</stan>\n<dttm>2023-10-16 14:24:24</dttm>\n<psp_settlement_date>2023-10-16</psp_settlement_date>\n<psp_settlement_cycle>1</psp_settlement_cycle>\n<psp_settlement_amount>1.49</psp_settlement_amount>\n<psp_settlement_currency>978</psp_settlement_currency>\n<psp_settlement_xrate>1.0000000</psp_settlement_xrate>\n<network>M</network>\n<resp_code>00</resp_code>\n<original_trn>20231016142429233998</original_trn>\n<rrn>328914233998</rrn>\n<status>0</status>\n<status_msg>Command completed successfully</status_msg>\n<status_details></status_details>\n</iserver_response>",
    "fields": [
      {
        "name": "rrn",
        "sample": "328914233998",
        "type": "N (12)",
        "requirement": "Mandatory",
        "description": "<rrn> property from the response of the pre-authorization request"
      },
      {
        "name": "mid",
        "sample": "000000000000112",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "amount",
        "sample": "1.49",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount of the request"
      },
      {
        "name": "currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "approval",
        "sample": "0B396A",
        "type": "C (6)",
        "requirement": "Mandatory",
        "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
      }
    ]
  },
  "cmd-618": {
    "title": "618 Pre-auth cancellation RRN",
    "subtitle": "Command",
    "description": "Releases or cancels the hold for the amount being held on a customer's account as part of an existing authorization.",
    "facts": [
      "WPA 5.4",
      "Command 618",
      "Pre-authorization flow"
    ],
    "body": [
      "Releases or cancels the hold for the amount being held on a customer's account as part of an existing authorization."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "rrn",
            "sample": "328914233998",
            "type": "N (12)",
            "requirement": "Mandatory",
            "description": "<rrn> property from the response of the pre-authorization request"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<iserver_request>\n<command>618</command>\n<stan>000009</stan>\n<dttm>2023-10-17 14:38:39</dttm>\n<rrn>328914233998</rrn>\n</iserver_request>",
    "response": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<iserver_response>\n<command>618</command>\n<trn>20231017143838234104</trn>\n<trndttm>2023-10-17 14:38:38</trndttm>\n<stan>000008</stan>\n<dttm>2023-10-16 14:15:14</dttm>\n<psp_settlement_date>2023-10-17</psp_settlement_date>\n<psp_settlement_cycle>1</psp_settlement_cycle>\n<psp_settlement_amount>1.99</psp_settlement_amount>\n<psp_settlement_currency>978</psp_settlement_currency>\n<psp_settlement_xrate>1.0000000</psp_settlement_xrate>\n<network>M</network>\n<original_trn>20231016142429233998</original_trn>\n<resp_code>00</resp_code>\n<rrn>328914233998</rrn>\n<status>0</status>\n<status_msg>Command completed successfully</status_msg>\n<status_details></status_details>\n</iserver_response>",
    "fields": [
      {
        "name": "rrn",
        "sample": "328914233998",
        "type": "N (12)",
        "requirement": "Mandatory",
        "description": "<rrn> property from the response of the pre-authorization request"
      }
    ]
  },
  "cmd-621": {
    "title": "621 Transaction retrieval",
    "subtitle": "Command",
    "description": "This command is used to retrieve the data from an already processed request.",
    "facts": [
      "WPA 5.4",
      "Command 621"
    ],
    "body": [
      "This command is used to retrieve the data from an already processed request."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "original_trn",
            "sample": "20130331141516123456",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "TRN of the original transaction."
          },
          {
            "name": "original_dttm",
            "sample": "2011-03-01 12:34:55",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Date and time of the original transaction. Format is: YYYY-MM-DD HH:MM:SS"
          },
          {
            "name": "original_stan",
            "sample": "999999",
            "type": "N (6)",
            "requirement": "Mandatory",
            "description": "Original request STAN."
          },
          {
            "name": "mid",
            "sample": "000000000000112",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          }
        ],
        "showSample": true
      }
    ],
    "notes": [
      "The parameters < original_dttm > and < original_stan > are optional."
    ],
    "request": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<iserver_request>\n <command>621</command>\n <stan>000026</stan>\n <dttm>2023-09-01 12:17:56</dttm>\n <original_trn>20130331141516123456</original_trn>\n <original_dttm>2023-09-01 12:14:49</original_dttm>\n <original_stan>000012</original_stan>\n <mid>000000000000112</mid>\n</iserver_request>",
    "response": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<iserver_response>\n <command>621</command>\n <trn>20130331141516123456</trn>\n <trndttm>2023-09-01 12:14:49</trndttm>\n <stan>000012</stan>\n <dttm>2023-09-01 12:18:06</dttm>\n <original_trn_dt>0901121449</original_trn_dt>\n <original_stan>000012</original_stan>\n <original_local_time>121449</original_local_time>\n <original_local_date>0901</original_local_date>\n <original_rrn>327913219598</original_rrn>\n <original_tid>00000001</original_tid>\n <original_mid>000000000000112</original_mid>\n <original_trace_id></original_trace_id>\n <original_dt_settle>0901</original_dt_settle>\n <original_pem>810</original_pem>\n <original_exp_dt>2409</original_exp_dt>\n <original_pan>4987650009956369</original_pan>\n <original_is_reversed>0</original_is_reversed>\n <original_is_completed>0</original_is_completed>\n <original_is_captured>1</original_is_captured>\n <original_invoice>000000</original_invoice>\n <original_amount>1200</original_amount>\n <original_mti>0200</original_mti>\n <original_auth_id>SWCSIM</original_auth_id>\n <original_trn>20130331141516123456</original_trn>\n <original_acq_id></original_acq_id>\n <original_fwd_id></original_fwd_id>\n <original_trn_curr>975</original_trn_curr>\n <original_pos_data>10251000060001009000</original_pos_data>\n <original_proc_code>000000</original_proc_code>\n <original_query_id></original_query_id>\n <original_resp_code>00</original_resp_code>\n <status>0</status>\n <status_msg>Command completed successfully</status_msg>\n <status_details></status_details>\n</iserver_response>",
    "fields": [
      {
        "name": "original_trn",
        "sample": "20130331141516123456",
        "type": "N (20)",
        "requirement": "Mandatory",
        "description": "TRN of the original transaction."
      },
      {
        "name": "original_dttm",
        "sample": "2011-03-01 12:34:55",
        "type": "C (19)",
        "requirement": "Mandatory",
        "description": "Date and time of the original transaction. Format is: YYYY-MM-DD HH:MM:SS"
      },
      {
        "name": "original_stan",
        "sample": "999999",
        "type": "N (6)",
        "requirement": "Mandatory",
        "description": "Original request STAN."
      },
      {
        "name": "mid",
        "sample": "000000000000112",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      }
    ]
  },
  "cmd-623": {
    "title": "623 Pre-authorization request",
    "subtitle": "Command",
    "description": "This command is used for card authorization and reserve of funds on a card for a sale to be processed at a later time. The funds are not debited from the cardholders account until a completion command is processed.",
    "facts": [
      "WPA 5.4",
      "Command 623",
      "Pre-authorization flow"
    ],
    "body": [
      "This command is used for card authorization and reserve of funds on a card for a sale to be processed at a later time. The funds are not debited from the cardholders account until a completion command is processed."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "pan",
            "sample": "532600000000000000",
            "type": "C (19)",
            "requirement": "Mandatory",
            "description": "Account number (PAN) for the transaction"
          },
          {
            "name": "expdt",
            "sample": "1703",
            "type": "N (4)",
            "requirement": "Mandatory",
            "description": "Expire date for the card in YYMM standard"
          },
          {
            "name": "cvc2",
            "sample": "999",
            "type": "N (3), N (4) for Amex",
            "requirement": "Mandatory",
            "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
          },
          {
            "name": "mid",
            "sample": "000000000000112",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount of the request"
          },
          {
            "name": "currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "payment_ref",
            "sample": "ABCD123456",
            "type": "C (50)",
            "requirement": "Mandatory",
            "description": "Payment reference for the merchant or the partner. Could be order or customer number."
          },
          {
            "name": "customer_ip",
            "sample": "10.20.30.40",
            "type": "C (40)",
            "requirement": "Mandatory",
            "description": "IP address of the cardholder initiated the transaction."
          },
          {
            "name": "customer_credentials",
            "sample": "customer@mywebsite.com",
            "type": "C (255)",
            "requirement": "Mandatory",
            "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
          },
          {
            "name": "eci",
            "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure or Verified by Visa."
          },
          {
            "name": "avv",
            "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
          },
          {
            "name": "xid",
            "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
            "type": "C (28)",
            "requirement": "Mandatory",
            "description": "XID stain for a 3D transaction (VISA). Originally 20 bytes/characters (e.g. 20110808000000000450), Base64 encoded"
          },
          {
            "name": "program_protocol",
            "sample": "2",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
          },
          {
            "name": "ds_transaction_id",
            "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
            "type": "ANS (36)",
            "requirement": "Mandatory",
            "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
          },
          {
            "name": "stored_credential_ind",
            "sample": "1",
            "type": "N (1)",
            "requirement": "Mandatory",
            "description": "Indicates setting up a stored credential."
          }
        ],
        "showSample": true
      },
      {
        "title": "Response properties",
        "description": "Command-specific output properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "trn",
            "sample": "20231013084357233857",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "TRN of the original transaction."
          },
          {
            "name": "approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code returned by card issuer"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<iserver_request>\n<command>623</command>\n<stan>111111</stan>\n<dttm>2023-09-01 12:17:56</dttm>\n<pan>5326100000000004</pan>\n<expdt>2411</expdt>\n<cvc2>999</cvc2>\n<mid>000000000000112</mid>\n<amount>1.99</amount>\n<currency>978</currency>\n<payment_ref>ABCD123456</payment_ref>\n<customer_ip>10.20.30.40</customer_ip>\n<customer_credentials>customer@mywebsite.com</customer_credentials>\n<eci>5</eci>\n<avv>BwABBEUzaIEIYgBgkDNoAAAAAAA=</avv>\n<xid>jJJLtQa+Iws8AREAEbjsA1MAAAA=</xid>\n<program_protocol>2</program_protocol>\n<ds_transaction_id></ds_transaction_id>\n<stored_credential_ind></stored_credential_ind>\n</iserver_request>",
    "response": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<iserver_response>\n<command>623</command>\n<trn>20231013084357233857</trn>\n<trndttm>2023-10-13 08:43:57</trndttm>\n<stan>111111</stan>\n<dttm>2023-10-13 08:34:38</dttm>\n<psp_settlement_date>2023-10-13</psp_settlement_date>\n<psp_settlement_cycle>1</psp_settlement_cycle>\n<psp_settlement_amount>1.99</psp_settlement_amount>\n<psp_settlement_currency>978</psp_settlement_currency>\n<psp_settlement_xrate>1.0000000</psp_settlement_xrate>\n<network>V</network>\n<cvc2_result>U</cvc2_result>\n<resp_code>00</resp_code>\n<approval>VISSIM</approval>\n<rrn>328608233857</rrn>\n<status>0</status>\n<status_msg>Command completed successfully</status_msg>\n<status_details></status_details>\n</iserver_response>",
    "fields": [
      {
        "name": "pan",
        "sample": "532600000000000000",
        "type": "C (19)",
        "requirement": "Mandatory",
        "description": "Account number (PAN) for the transaction"
      },
      {
        "name": "expdt",
        "sample": "1703",
        "type": "N (4)",
        "requirement": "Mandatory",
        "description": "Expire date for the card in YYMM standard"
      },
      {
        "name": "cvc2",
        "sample": "999",
        "type": "N (3), N (4) for Amex",
        "requirement": "Mandatory",
        "description": "MasterCard CVC, VISA CVV or Amex CID for e-commerce/Safekey transactions"
      },
      {
        "name": "mid",
        "sample": "000000000000112",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount of the request"
      },
      {
        "name": "currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "payment_ref",
        "sample": "ABCD123456",
        "type": "C (50)",
        "requirement": "Mandatory",
        "description": "Payment reference for the merchant or the partner. Could be order or customer number."
      },
      {
        "name": "customer_ip",
        "sample": "10.20.30.40",
        "type": "C (40)",
        "requirement": "Mandatory",
        "description": "IP address of the cardholder initiated the transaction."
      },
      {
        "name": "customer_credentials",
        "sample": "customer@mywebsite.com",
        "type": "C (255)",
        "requirement": "Mandatory",
        "description": "Credentials of the customer at merchant checkout page (email, ID, phone number or names)"
      },
      {
        "name": "eci",
        "sample": "0 - MC - Merchant not participating in 3D program or card enrollment service is unavailable 1 - MC - Attempted card 2 - MC - full 3D authentication 5 - VISA - full 3D authentication 6 - VISA - Attempted card or not participating but the merchant is certified for 3D 7 - VISA - Merchant not participating in 3D program or card enrollment service is unavailable",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Electronic commerce indicator. Shows the enrollment of the cardholder in MasterCard 3D Secure or Verified by Visa."
      },
      {
        "name": "avv",
        "sample": "BwABBEUzaIEIYgBgkDNoAAAAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "UCAF value for MasterCard, AVV for VISA and AEVV for Amex. Base64 string."
      },
      {
        "name": "xid",
        "sample": "jJJLtQa+Iws8AREAEbjsA1MAAAA=",
        "type": "C (28)",
        "requirement": "Mandatory",
        "description": "XID stain for a 3D transaction (VISA). Originally 20 bytes/characters (e.g. 20110808000000000450), Base64 encoded"
      },
      {
        "name": "program_protocol",
        "sample": "2",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "3DS program protocol used. Required for Mastercard. Possible values: 2 - EMV 3-D Secure (3DS 2.0)"
      },
      {
        "name": "ds_transaction_id",
        "sample": "f38e6948-5388-41a6-bca4-b49723c19437",
        "type": "ANS (36)",
        "requirement": "Mandatory",
        "description": "Directory Server Transaction ID generated by the EMV 3DS Mastercard Directory Server. This parameter is required if program_protocol = 2."
      },
      {
        "name": "stored_credential_ind",
        "sample": "1",
        "type": "N (1)",
        "requirement": "Mandatory",
        "description": "Indicates setting up a stored credential."
      }
    ]
  },
  "cmd-624": {
    "title": "624 Pre-auth completion",
    "subtitle": "Command",
    "description": "Retrieves funds that have been locked and prepares them for settlement into the merchant's account.",
    "facts": [
      "WPA 5.4",
      "Command 624",
      "Pre-authorization flow"
    ],
    "body": [
      "Retrieves funds that have been locked and prepares them for settlement into the merchant's account."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "trn",
            "sample": "20231016121524233981",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "<trn> property from the response of the pre-authorization request"
          },
          {
            "name": "mid",
            "sample": "000000000000112",
            "type": "N (15)",
            "requirement": "Mandatory",
            "description": "Card acceptor code assigned to the site/outlet or to the merchant"
          },
          {
            "name": "amount",
            "sample": "1.99",
            "type": "N (18,2)",
            "requirement": "Mandatory",
            "description": "The amount of the request"
          },
          {
            "name": "currency",
            "sample": "978",
            "type": "N (3)",
            "requirement": "Mandatory",
            "description": "ISO 3 numeric code of the currency"
          },
          {
            "name": "approval",
            "sample": "999999",
            "type": "C (6)",
            "requirement": "Mandatory",
            "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<iserver_request>\n<command>624</command>\n<stan>111111</stan>\n<dttm>2023-10-16 12:16:41</dttm>\n<trn>20231016121524233981</trn>\n<mid>000000000000112</mid>\n<amount>1.75</amount>\n<currency>978</currency>\n<approval>VISSIM</approval>\n</iserver_request>",
    "response": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<iserver_response>\n<command>624</command>\n<trn>20231016121641233982</trn>\n<trndttm>2023-10-16 12:15:24</trndttm>\n<stan>111111</stan>\n<dttm>2023-10-16 12:13:51</dttm>\n<psp_settlement_date>2023-10-16</psp_settlement_date>\n<psp_settlement_cycle>1</psp_settlement_cycle>\n<psp_settlement_amount>1.75</psp_settlement_amount>\n<psp_settlement_currency>978</psp_settlement_currency>\n<psp_settlement_xrate>1.0000000</psp_settlement_xrate>\n<network>M</network>\n<original_trn>20231016121524233981</original_trn>\n<rrn>328912233981</rrn>\n<status>0</status>\n<status_msg>Command completed successfully</status_msg>\n</iserver_response>",
    "fields": [
      {
        "name": "trn",
        "sample": "20231016121524233981",
        "type": "N (20)",
        "requirement": "Mandatory",
        "description": "<trn> property from the response of the pre-authorization request"
      },
      {
        "name": "mid",
        "sample": "000000000000112",
        "type": "N (15)",
        "requirement": "Mandatory",
        "description": "Card acceptor code assigned to the site/outlet or to the merchant"
      },
      {
        "name": "amount",
        "sample": "1.99",
        "type": "N (18,2)",
        "requirement": "Mandatory",
        "description": "The amount of the request"
      },
      {
        "name": "currency",
        "sample": "978",
        "type": "N (3)",
        "requirement": "Mandatory",
        "description": "ISO 3 numeric code of the currency"
      },
      {
        "name": "approval",
        "sample": "999999",
        "type": "C (6)",
        "requirement": "Mandatory",
        "description": "Approval or authorization code provided by the card issuer as returned in the response of the authorization request"
      }
    ]
  },
  "cmd-625": {
    "title": "625 Pre-auth cancellation",
    "subtitle": "Command",
    "description": "Releases or cancels the hold for the amount being held on a customer's account as part of an existing authorization.",
    "facts": [
      "WPA 5.4",
      "Command 625",
      "Pre-authorization flow"
    ],
    "body": [
      "Releases or cancels the hold for the amount being held on a customer's account as part of an existing authorization."
    ],
    "fieldSections": [
      {
        "title": "Request properties",
        "description": "Command-specific input properties from the WPA 5.4 guide.",
        "fields": [
          {
            "name": "trn",
            "sample": "20231016121524233981",
            "type": "N (20)",
            "requirement": "Mandatory",
            "description": "<trn> property from the response of the pre-authorization request"
          }
        ],
        "showSample": true
      }
    ],
    "request": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<iserver_request>\n<command>625</command>\n<stan>111111</stan>\n<dttm>2023-10-16 13:04:11</dttm>\n<trn>20231016130328233987</trn>\n</iserver_request>",
    "response": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<iserver_response>\n<command>625</command>\n<trn>20231016130411233988</trn>\n<trndttm>2023-10-16 13:04:11</trndttm>\n<stan>111111</stan>\n<dttm>2023-10-16 13:01:27</dttm>\n<psp_settlement_date>2023-10-16</psp_settlement_date>\n<psp_settlement_cycle>1</psp_settlement_cycle>\n<psp_settlement_amount>1.99</psp_settlement_amount>\n<psp_settlement_currency>978</psp_settlement_currency>\n<psp_settlement_xrate>1.0000000</psp_settlement_xrate>\n<network>M</network>\n<original_trn>20231016130328233987</original_trn>\n<resp_code>00</resp_code>\n<rrn>328913233987</rrn>\n<status>0</status>\n<status_msg>Command completed successfully</status_msg>\n<status_details></status_details>\n</iserver_response>",
    "fields": [
      {
        "name": "trn",
        "sample": "20231016121524233981",
        "type": "N (20)",
        "requirement": "Mandatory",
        "description": "<trn> property from the response of the pre-authorization request"
      }
    ]
  },
  "cmd-5000": {
    "title": "5000 Connection check",
    "subtitle": "Command",
    "description": "This command can be used to check the connectivity to the WEB PAY-IN interface. If the interface is alive it responds with status 0.",
    "facts": [
      "WPA 5.4",
      "Command 5000"
    ],
    "body": [
      "This command can be used to check the connectivity to the WEB PAY-IN interface. If the interface is alive it responds with status 0."
    ],
    "notes": [
      "This command does not expect the standard request and response properties."
    ],
    "request": "<?xml version=\"1.0\" encoding=\"Windows-1251\"?>\n<ipayin_request>\n  <command>5000</command>\n</ipayin_request>",
    "response": "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\n<ipayin_response>\n  <command>5000</command>\n  <status>0</status>\n  <status_msg>Command completed successfully</status_msg>\n  <status_details></status_details>\n</ipayin_response>",
    "fields": []
  },
  "export-copy-requests-chargebacks": {
    "title": "Automated Copy Requests and Chargebacks Export",
    "subtitle": "Exports",
    "description": "Daily fixed-width export for newly added copy requests and chargebacks in iCARD systems.",
    "facts": [
      "Daily generation",
      "ASCII-128 fixed width",
      "Stored up to three months"
    ],
    "body": [
      "This feature is added in order to ease the partner's processing of CR / CB. A text file of fixed column length format is created every day if there are newly added CR and CB in iCARD's system. The generation procedure runs once a day and collects all related data for past business date (till 00:00h EET). All transactions after that hour will be included in next day file.",
      "All generated files will be stored for up to three calendar months. Copy of original file for previous date could be send to Partner upon request.",
      "The file name is constructed in the following format:",
      "chb_TRRRRRR_YYYYMMDD_HHMMSS_NN.txt",
      "Where:",
      "T identifies type of client for which file is generated. It is \"P\" for Partner and \"C\" for Company.",
      "RRRRRR is the unique identifier in WEB PAY-IN interface for the partner or company;",
      "YYYYMMDD_HHMMSS is the timestamp of the procedure start up time.",
      "NN is sequential number of file generation.",
      "Files will be in ASCII-128 text format with fixed length columns. A file contains header, detail records and footer. Each row ends with a new line (carriage return + line feed, ASCII 0x0D 0x0A). A valid file has at least one header and one trailer row.",
      "Field formats: N - Numeric; A - alpha; AN - alpha numeric; D - ISO date (YYYYMMDD).",
      "Numeric fields are right justified with leading spaces. Alpha fields are left justified with trailing spaces"
    ],
    "tables": [
      {
        "title": "CR/CB file format",
        "description": "",
        "headers": [
          "Field",
          "Fmt",
          "Len",
          "Value",
          "Comment"
        ],
        "rows": [
          [
            "Header Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record Type",
            "A",
            "1",
            "Value 'H'",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "8",
            "Unique ID of Partner or Company",
            ""
          ],
          [
            "Processing date",
            "D",
            "8",
            "YYYYMMDD",
            ""
          ],
          [
            "Rerun",
            "N",
            "2",
            "Starts at 1.",
            "Incremented on each file reprocessing."
          ],
          [
            "Version",
            "A",
            "3",
            "001",
            "File version."
          ],
          [
            "Filler",
            "AN",
            "277",
            "Spaces",
            ""
          ],
          [
            "Size of header",
            "",
            "300",
            "",
            ""
          ],
          [
            "Detail Records",
            "",
            "",
            "",
            ""
          ],
          [
            "Record Type",
            "A",
            "1",
            "Value 'D'",
            ""
          ],
          [
            "Record number",
            "N",
            "6",
            "Sequential number for particular file",
            ""
          ],
          [
            "Message Originator",
            "A",
            "1",
            "General card system originator",
            "Values: 'M' - MasterCard; 'V' - Visa; 'X' - Amex"
          ],
          [
            "Message Qualifier",
            "A",
            "2",
            "Type of the data",
            "Values: 'CB' - Chargeback; 'CR' - Copy request"
          ],
          [
            "Dispute Date",
            "D",
            "8",
            "YYYYMMDD",
            ""
          ],
          [
            "Dispute Amount",
            "N",
            "12",
            "CB / CR amount",
            ""
          ],
          [
            "Dispute Currency Code",
            "N",
            "3",
            "Should be the MID's currency",
            ""
          ],
          [
            "Reason Code",
            "N",
            "4",
            "CB / CR reason code",
            ""
          ],
          [
            "ARN",
            "N",
            "23",
            "Acquirer reference number",
            ""
          ],
          [
            "Merchant ID",
            "N",
            "15",
            "",
            "<merch>tag"
          ],
          [
            "Merchant Name",
            "AN",
            "30",
            "",
            "Merchant name corresponding to the <merch>"
          ],
          [
            "Card Number",
            "AN",
            "19",
            "9999********9999",
            "Truncated pan, Right padded wit spaces"
          ],
          [
            "Original Tx ID",
            "N",
            "10",
            "Original transaction ID. Trn from response",
            "<trn> tag"
          ],
          [
            "Original Tx Date",
            "N",
            "8",
            "YYYYMMDD",
            "<trndttm> tag"
          ],
          [
            "Original Tx Time",
            "N",
            "6",
            "HHMMSS",
            "<trndttm> tag"
          ],
          [
            "Original Tx Clearing Date",
            "N",
            "8",
            "YYYYMMDD",
            "As supplied in the clearing file"
          ],
          [
            "Original Tx Amount",
            "N",
            "12",
            "In local currency of transaction",
            "<amount> tag"
          ],
          [
            "Original Tx Currency Code",
            "N",
            "3",
            "In local currency of transaction",
            "<currency> tag"
          ],
          [
            "Approval Code",
            "AN",
            "6",
            "Authorization ID from original transaction",
            "Auth code from authorization"
          ],
          [
            "STAN",
            "N",
            "6",
            "Stan from original transaction request. Available for reversal and refund operations too.",
            ""
          ],
          [
            "ECI",
            "N",
            "2",
            "Original transaction ECI (Electronic commerce indicator)",
            ""
          ],
          [
            "Documents",
            "N",
            "100",
            "Unique files names with documents related to transaction.",
            "Files could be more than 1."
          ],
          [
            "Reversal Indicator",
            "N",
            "1",
            "0 = No, 1 = Yes",
            "Chargeback reversal indicator."
          ],
          [
            "Filler",
            "AN",
            "14",
            "Spaces",
            ""
          ],
          [
            "Size of data",
            "",
            "300",
            "",
            ""
          ],
          [
            "Trailer Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record Type",
            "A",
            "1",
            "Value 'T'",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "8",
            "Unique ID of Partner or Company",
            ""
          ],
          [
            "Total number of detail records",
            "N",
            "6",
            "How many processed",
            ""
          ],
          [
            "Total dispute amount",
            "N",
            "15",
            "Checksum amount - sum of all Dispute Amounts",
            ""
          ],
          [
            "Filler",
            "AN",
            "269",
            "Spaces",
            ""
          ],
          [
            "Size of trailer",
            "",
            "300",
            "",
            ""
          ]
        ]
      }
    ],
    "request": "File name format:\nchb_TRRRRRR_YYYYMMDD_HHMMSS_NN.txt"
  },
  "export-reconciliation": {
    "title": "Automated Reconciliation File Export",
    "subtitle": "Exports",
    "description": "Daily fixed-width reconciliation file generated after the end of cut-off procedure.",
    "facts": [
      "Daily after cut-off",
      "ASCII-128 fixed width",
      "Header, group header, detail and trailer records"
    ],
    "body": [
      "This feature is added in order to ease the partner's reconciliation. A text file of fixed column length format is created every day upon end of cut off procedure. The generation procedure runs once a day and collects all related data for past business date (till 00:00h EET). All transactions after that hour will be included in next day file.",
      "All generated files will be stored for up to three calendar months. Copy of original file for previous date could be send to Partner upon request.",
      "The file name is constructed in the following format:",
      "rcn_TRRRRRR_YYYYMMDD_NN.txt",
      "Where:",
      "T identifies type of client for which file is generated. It is \"P\" for Partner and \"C\" for Company.",
      "RRRRRR is the unique identifier in WEB PAY-IN interface for the partner or company;",
      "YYYYMMDD_HHMMSS is the timestamp of the procedure start up time;",
      "NN is sequential number of file generation.",
      "Files will be in ASCII-128 text format with fixed length columns. A file contains header, group header and trailer, detail records and footer. Each row ends with a new line (carriage return + line feed, ASCII 0x0D 0x0A). A valid file has at least one header and one trailer row.",
      "Field formats: N - Numeric; A - alpha; AN - alpha numeric; D - ISO date (YYYYMMDD).",
      "Numeric fields are right justified with leading spaces. Alpha fields are left justified with trailing spaces"
    ],
    "tables": [
      {
        "title": "Reconciliation file format",
        "description": "",
        "headers": [
          "Field",
          "Fmt",
          "Len",
          "Value",
          "Comment"
        ],
        "rows": [
          [
            "File Header Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record Type",
            "A",
            "1",
            "Value 'H'",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "8",
            "Unique ID of Partner or Company",
            ""
          ],
          [
            "Processing date",
            "D",
            "8",
            "Reporting date",
            "YYYYMMDD"
          ],
          [
            "Rerun",
            "N",
            "2",
            "Starts at 1.",
            "Incremented on each file reprocessing."
          ],
          [
            "Version",
            "A",
            "3",
            "001",
            ""
          ],
          [
            "Filler",
            "A",
            "617",
            "Spaces",
            ""
          ],
          [
            "Size of header",
            "",
            "640",
            "",
            ""
          ],
          [
            "Group Header Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record type",
            "A",
            "1",
            "Value 'G'",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "8",
            "Unique ID of Partner or Company",
            ""
          ],
          [
            "Currency",
            "N",
            "3",
            "ISO 3 numeric code of the currency",
            ""
          ],
          [
            "Sales count",
            "N",
            "12",
            "Number of sales transactions for the date in specified currency.",
            ""
          ],
          [
            "Sales amount",
            "N",
            "12",
            "Total amount of sales transactions for the date in specified currency.",
            ""
          ],
          [
            "Sales fees",
            "N",
            "12",
            "Total amount of sales transactions fees for the date in specified currency.",
            ""
          ],
          [
            "Recurring count",
            "N",
            "12",
            "Number of recurring transactions for the date in specified currency.",
            ""
          ],
          [
            "Recurring amount",
            "N",
            "12",
            "Total amount of recurring transactions for the date in specified currency.",
            ""
          ],
          [
            "Recurring fees",
            "N",
            "12",
            "Total amount of recurring transactions fees for the date in specified currency.",
            ""
          ],
          [
            "Refunds count",
            "N",
            "12",
            "Number of refund transactions for the date in specified currency.",
            ""
          ],
          [
            "Refunds amount",
            "N",
            "12",
            "Total amount of refund transactions for the date in specified currency.",
            ""
          ],
          [
            "Original credits count",
            "N",
            "12",
            "Total amount of refund transactions fees for the date in specified currency.",
            ""
          ],
          [
            "Original credits amount",
            "N",
            "12",
            "Number of original credit transactions for the date in specified currency.",
            ""
          ],
          [
            "Processing fees count",
            "N",
            "12",
            "Total amount of original credit transactions for the date in specified currency.",
            ""
          ],
          [
            "Processing fees amount",
            "N",
            "12",
            "Total amount of original credit transactions fees for the date in specified currency.",
            ""
          ],
          [
            "Chargebacks count",
            "N",
            "12",
            "Number of chargebacks for the date in specified currency.",
            ""
          ],
          [
            "Chargebacks amount",
            "N",
            "12",
            "Total amount of chargebacks for the date in specified currency.",
            ""
          ],
          [
            "Chargebacks fees",
            "N",
            "12",
            "Total amount of chargebacks fees for the date in specified currency.",
            ""
          ],
          [
            "Transfer reserve account count",
            "N",
            "12",
            "Number of transfers to reserve account for the date in specified currency.",
            ""
          ],
          [
            "Transfer reserve account amount",
            "N",
            "12",
            "Amount of transfer to reserve account for the date in specified currency",
            ""
          ],
          [
            "Transfer collateral count",
            "N",
            "12",
            "Number of transfers to collateral account for the date in specified currency.",
            ""
          ],
          [
            "Transfer collateral amount",
            "N",
            "12",
            "Amount of transfer to collateral account for the date in specified currency",
            ""
          ],
          [
            "Others count",
            "N",
            "12",
            "Number of other transactions for the date in specified currency.",
            ""
          ],
          [
            "Others amount",
            "N",
            "12",
            "Total amount of other transactions for the date in specified currency.",
            ""
          ],
          [
            "Payments count",
            "N",
            "12",
            "Number of payments for the date in specified currency.",
            ""
          ],
          [
            "Payments amount",
            "N",
            "12",
            "Amount of payments for the date in specified currency",
            ""
          ],
          [
            "Opening balance",
            "N",
            "12",
            "Opening balance of account for the date in specified currency",
            ""
          ],
          [
            "Closing balance",
            "N",
            "12",
            "Closing balance of account for the date in specified currency",
            ""
          ],
          [
            "Filler",
            "A",
            "327",
            "Spaces",
            ""
          ],
          [
            "Size of group",
            "",
            "640",
            "",
            ""
          ],
          [
            "Detail Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record Type",
            "A",
            "1",
            "Value 'D'",
            ""
          ],
          [
            "Transaction type",
            "N",
            "2",
            "1 - Sales; 2 - Recurring transactions; 3 - Original credit transaction; 4 - Refund; 5 - Chargeback first; 6 - Chargeback/copy request; 7 - Chargeback second; 8 - Chargeback/good faith amount; 9 - Second presentment; 10 - Transfer to reserve account; 11 - Reimbursement from reserve account; 12 - Transfer to collateral account; 13 - Reimbursement from collateral account; 14 - Payout to bank; 15 - Wallet payment; 16 - Transfer between accounts; 17 - Processing fees; 20 - Other.",
            ""
          ],
          [
            "CID",
            "N",
            "16",
            "Company ID",
            ""
          ],
          [
            "MID",
            "N",
            "16",
            "Card acceptor code assigned to the site/outlet or to the merchant.",
            "Conditional."
          ],
          [
            "Currency",
            "N",
            "3",
            "ISO 3 numeric code of the currency.",
            "<currency> tag"
          ],
          [
            "Date",
            "D",
            "20",
            "Transaction date.",
            "YYYY-MM-DD HH:MM:SS"
          ],
          [
            "Amount",
            "N",
            "12",
            "Transaction amount.",
            "<amount> tag"
          ],
          [
            "Fee",
            "N",
            "12",
            "Transaction volume fee.",
            ""
          ],
          [
            "Payout",
            "N",
            "12",
            "Net amount to be paid.",
            ""
          ],
          [
            "TRN",
            "AN",
            "20",
            "Transaction Reference Number (TRN).",
            "<trn> tag"
          ],
          [
            "ARN",
            "AN",
            "24",
            "Acquirer Reference Number. Unique transaction ID assigned by acquirer.",
            ""
          ],
          [
            "Approval",
            "AN",
            "6",
            "Approval or authorization code returned by card issuer.",
            "<approval> tag"
          ],
          [
            "Payment ref",
            "AN",
            "50",
            "Payment reference for the merchant or the partner. Could be order or customer number.",
            ""
          ],
          [
            "Note",
            "AN",
            "100",
            "Reason for payment.",
            "Data is available only for transaction types 14, 15 and 16."
          ],
          [
            "Customer credentials",
            "AN",
            "255",
            "Credentials of the customer at merchant checkout page (email, ID, phone number or names).",
            ""
          ],
          [
            "Card scheme",
            "A",
            "1",
            "",
            "Values: 'M' - MasterCard; 'V' - Visa; 'X' - Amex"
          ],
          [
            "Card product",
            "AN",
            "50",
            "",
            "Card product name"
          ],
          [
            "TID",
            "N",
            "16",
            "Terminal ID.",
            ""
          ],
          [
            "Terminal Reference",
            "N",
            "20",
            "Unique reference number combination between STAN and date and time from the Partners' gateway.",
            ""
          ],
          [
            "Filler",
            "A",
            "4",
            "Spaces.",
            ""
          ],
          [
            "Size of data",
            "",
            "640",
            "",
            ""
          ],
          [
            "Group Trailer Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record type",
            "A",
            "1",
            "Value 'F'.",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "16",
            "Unique ID of Partner or Company.",
            ""
          ],
          [
            "Total rows",
            "N",
            "12",
            "Total number of rows in detailed records section.",
            ""
          ],
          [
            "Filler",
            "A",
            "610",
            "Spaces.",
            ""
          ],
          [
            "Size of footer",
            "",
            "640",
            "",
            ""
          ],
          [
            "File Trailer Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record type",
            "A",
            "1",
            "Value 'T'.",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "8",
            "Unique ID of Partner or Company.",
            ""
          ],
          [
            "Total records",
            "N",
            "6",
            "Total number of records in file.",
            ""
          ],
          [
            "Filler",
            "A",
            "624",
            "Spaces.",
            ""
          ],
          [
            "Size of trailer",
            "",
            "640",
            "",
            ""
          ]
        ]
      }
    ],
    "request": "File name format:\nrcn_TRRRRRR_YYYYMMDD_NN.txt"
  },
  "export-clearing": {
    "title": "Automated Clearing File Export",
    "subtitle": "Exports",
    "description": "Daily fixed-width clearing file for transactions confirmed by iCARD on the previous business date.",
    "facts": [
      "Daily after cut-off",
      "Confirmed clearing data",
      "ASCII-128 fixed width"
    ],
    "body": [
      "This feature is added in order to assure up to date information to the partner for all cleared transactions for the day. A text file of fixed column length format is created every day upon end of cut off procedure. The generation procedure runs once a day and collects clearing data, confirmed by iCARD on previous business date. (Till 00:00h EET). All transactions confirmed by iCARD after that hour will be included in next day file.",
      "All generated files will be stored for up to three calendar months. Copy of original file for previous date could be send to Partner upon request.",
      "The file name is constructed in the following format:",
      "clr_TRRRRRR_YYYYMMDD_NN.txt",
      "Where:",
      "T identifies type of client for which file is generated. It is \"P\" for Partner and \"C\" for Company.",
      "RRRRRR is the unique identifier in WEB PAY-IN interface for the partner or company;",
      "YYYYMMDD_HHMMSS is the timestamp of the procedure start up time;",
      "NN is sequential number of file generation.",
      "Files will be in ASCII-128 text format with fixed length columns. A file contains header, detail records and footer. Each row ends with a new line (carriage return + line feed, ASCII 0x0D 0x0A). A valid file has at least one header and one trailer row.",
      "Field formats: N - Numeric; A - alpha; AN - alpha numeric; D - ISO date (YYYYMMDD).",
      "Numeric fields are right justified with leading spaces. Alpha fields are left justified with trailing spaces"
    ],
    "tables": [
      {
        "title": "Clearing file format",
        "description": "",
        "headers": [
          "Field",
          "Fmt",
          "Len",
          "Value",
          "Comment"
        ],
        "rows": [
          [
            "File Header Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record Type",
            "A",
            "1",
            "Value 'H'",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "8",
            "Unique ID of Partner or Company.",
            ""
          ],
          [
            "Processing date",
            "D",
            "8",
            "Reporting date",
            "YYYYMMDD"
          ],
          [
            "Rerun",
            "N",
            "2",
            "Starts at 1.",
            "Incremented on each file reprocessing."
          ],
          [
            "Version",
            "A",
            "3",
            "001",
            ""
          ],
          [
            "Filler",
            "A",
            "227",
            "Spaces",
            ""
          ],
          [
            "Size of header",
            "",
            "250",
            "",
            ""
          ],
          [
            "Detail Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record Type",
            "A",
            "1",
            "Value 'D'",
            ""
          ],
          [
            "Transaction type",
            "N",
            "2",
            "1 - Sales; 2 - Recurring transactions; 3 - Original credit transaction; 4 - Refund; 18 - Reversal; 20 - Other.",
            "Transaction types are similar to those used in Reconciliation file."
          ],
          [
            "MID",
            "N",
            "16",
            "Company ID",
            "<merch>tag"
          ],
          [
            "TID",
            "N",
            "16",
            "Card acceptor code assigned to the site/outlet or to the merchant.",
            "Conditional."
          ],
          [
            "STAN",
            "N",
            "6",
            "Stan from original transaction request. Available for reversal and refund operations too.",
            ""
          ],
          [
            "DTTM",
            "D",
            "19",
            "Transaction date.",
            "<trndttm> tag"
          ],
          [
            "Card Number",
            "AN",
            "19",
            "9999********9999",
            "Truncated pan, Right padded wit spaces"
          ],
          [
            "Card Scheme",
            "A",
            "1",
            "",
            "Values: 'M' - MasterCard; 'V' - Visa; 'X' - Amex"
          ],
          [
            "Transaction Amount",
            "N",
            "12",
            "Transaction amount.",
            "<amount> tag"
          ],
          [
            "Transaction Currency",
            "N",
            "3",
            "Transaction currency.",
            "<currency>tag"
          ],
          [
            "Captured Amount",
            "N",
            "12",
            "Amount cleared by card schemes.",
            ""
          ],
          [
            "Captured Currency",
            "N",
            "3",
            "Currency cleared by card schemes.",
            ""
          ],
          [
            "TRN",
            "AN",
            "20",
            "Transaction Reference Number (TRN).",
            "<trn> tag"
          ],
          [
            "ARN",
            "AN",
            "24",
            "Acquirer Reference Number. Unique transaction ID assigned by acquirer.",
            ""
          ],
          [
            "Payment Reference",
            "AN",
            "50",
            "Payment reference for the merchant or the partner. Could be order or customer number.",
            ""
          ],
          [
            "Presentment Flag",
            "AN",
            "1",
            "0 - First presentment; 1 - Reversal of first presentment; 2 - Second presentment; 3 - Reversal of second presentment.",
            ""
          ],
          [
            "Filler",
            "A",
            "45",
            "Spaces.",
            ""
          ],
          [
            "Size of data",
            "",
            "250",
            "",
            ""
          ],
          [
            "File Trailer Record",
            "",
            "",
            "",
            ""
          ],
          [
            "Record type",
            "A",
            "1",
            "Value 'T'.",
            ""
          ],
          [
            "Reference Type",
            "A",
            "1",
            "P = Partner, C = Company",
            ""
          ],
          [
            "Reference ID",
            "N",
            "8",
            "Unique ID of Partner or Company.",
            ""
          ],
          [
            "Total records",
            "N",
            "6",
            "Total number of records in file.",
            ""
          ],
          [
            "Filler",
            "A",
            "234",
            "Spaces.",
            ""
          ],
          [
            "Size of trailer",
            "",
            "250",
            "",
            ""
          ]
        ]
      }
    ],
    "request": "File name format:\nclr_TRRRRRR_YYYYMMDD_NN.txt"
  },
  "errors": {
    "title": "Error Codes Received from WEB PAY-IN Interface",
    "subtitle": "Reference",
    "description": "Protocol status and transaction result handling for WPA responses.",
    "facts": [
      "status 0 = command completed",
      "resp_code 00 = approved",
      "Do not convert resp_code to integer"
    ],
    "body": [
      "For commands that are related to the transaction processing, code 0 - Command completed successfully means that transaction is passed successfully to the issuer and a response has been received. Partner should check <resp_code> property where applicable:",
      "00 - transaction is approved",
      "<> 00 - transaction is declined",
      "<resp_code> is returned from the Card Schemes and is corresponding to ISO-8583 field 39.",
      "All other codes indicate decline from the issuer or system error. In case of code greater than zero, the transaction should be considered as not approved."
    ],
    "tables": [
      {
        "title": "Status codes",
        "description": "",
        "headers": [
          "Code",
          "Description",
          "Note"
        ],
        "rows": [
          [
            "0",
            "Command completed successfully",
            "Mandatory check for existing <status> tag. Tag is mandatory and should have a value."
          ],
          [
            "1",
            "General error",
            ""
          ],
          [
            "2",
            "Database error",
            ""
          ],
          [
            "3",
            "Invalid input parameters",
            "Missing or wrong format parameters in request."
          ],
          [
            "4",
            "Incoming data parse error",
            "Invalid XML format."
          ],
          [
            "5",
            "Unsupported command",
            "Value specified in <command> property is unknown."
          ],
          [
            "6",
            "Communication error",
            "Unable to transmit or receive data from the card schemes."
          ],
          [
            "7",
            "Transaction not found",
            "Reversal or Capture request with no corresponding original transaction."
          ],
          [
            "8",
            "Transaction Not Allowed",
            ""
          ],
          [
            "9",
            "Duplicated Transmission",
            "Reversal or Capture with this <stan> and <dttm> has already been received and processed in WEB PAY-IN interface."
          ]
        ]
      }
    ],
    "notes": [
      "<resp_code>is an alpha-numeric value. Don't convert to integer."
    ]
  },
  "cvc": {
    "title": "CVC2/CVV2 Result Codes",
    "subtitle": "Reference",
    "description": "CVC2/CVV2 verification values returned by selected commands such as 601 and 604.",
    "facts": [
      "M = match",
      "N = no match",
      "U = unverified"
    ],
    "body": [
      "For commands 601 and 604, valid values of cvc2/cvv2 verification are:"
    ],
    "tables": [
      {
        "title": "CVC2/CVV2 codes",
        "description": "",
        "headers": [
          "Code",
          "Description"
        ],
        "rows": [
          [
            "M",
            "CVC2/CVV2 Match"
          ],
          [
            "N",
            "CVC2/CVV2 No Match"
          ],
          [
            "P",
            "CVC2/CVV Not processed"
          ],
          [
            "U",
            "CVC2/CVV Unverified"
          ],
          [
            "S",
            "CVC2/CVV should be on the Card"
          ]
        ]
      }
    ]
  },
  "threed": {
    "title": "Processing of 3D Transactions",
    "subtitle": "Reference",
    "description": "Only 3D-enabled MIDs can process 3D transactions through WPA.",
    "facts": [
      "3D-enabled MID required",
      "3D-disabled MIDs are declined",
      "Partner ensures 3D service"
    ],
    "body": [
      "Merchants' registration for processing of 3D transactions is monitored. Only 3D enabled MIDs can process 3D transactions.",
      "It is Partner's responsibility to assure 3D service for his merchants."
    ],
    "notes": [
      "3D transactions of 3D disabled MIDs will be declined."
    ]
  }
};

const wpaDetailItem = (title, description) => ({ title, description });

const wpaDetailSection = (title, description, items) => ({
  title,
  description,
  items,
});

const sharedWpaDetails = {
  general: [
    wpaDetailSection(
      "How WPA Fits the Payment Architecture",
      "WPA is a server-to-server acquiring interface. Keep payment decisions and credentials in the trusted backend.",
      [
        wpaDetailItem("Partner or merchant backend", "Creates the exact XML request, calculates the body hash and JWT, sends the command, validates the signed response, persists transaction references, and controls follow-up operations."),
        wpaDetailItem("iCard WPA platform", "Authenticates the caller, validates the XML command, communicates with card schemes and issuers, manages acquiring and clearing, and returns protocol and transaction results."),
        wpaDetailItem("Customer-facing systems", "Collect order and customer context and may coordinate 3DS, but must not hold the WPA shared secret or decide that a transaction succeeded from an HTTP result alone."),
        wpaDetailItem("Back-office operations", "Use captured transaction data, automated exports, the partner portal, and retained request/response evidence for reconciliation, disputes, support, and audit."),
      ]
    ),
    wpaDetailSection(
      "Production Readiness",
      "Treat WPA as a financial system integration with explicit operational controls.",
      [
        wpaDetailItem("Separate environments", "Keep sandbox and production endpoints, User-ID values, shared secrets, key indexes, MIDs, test data, monitoring, and access permissions completely separate."),
        wpaDetailItem("Persist before sending", "Store the intended command, STAN, DTTM, MID, amount, currency, payment reference, and correlation data before the first transmission so an uncertain outcome can be investigated safely."),
        wpaDetailItem("Mask sensitive data", "Never log full PAN, CVC2/CVV2/CID, shared secrets, complete Authorization headers, or unprotected customer credentials. Retain only the minimum data required by policy."),
        wpaDetailItem("Monitor the lifecycle", "Alert on authentication failures, invalid body hashes, timeouts, status errors, issuer declines, uncaptured authorizations, repeated reversals, export gaps, and reconciliation differences."),
      ]
    ),
  ],
  authentication: [
    wpaDetailSection(
      "Request Authentication Pipeline",
      "Build and authenticate every request from the same immutable XML byte sequence.",
      [
        wpaDetailItem("1. Finalize XML", "Create the complete case-sensitive XML body with the required command wrapper and fields. Do not change whitespace, character encoding, element case, or content after hashing."),
        wpaDetailItem("2. Calculate body hash", "Calculate body_hash from the entire exact PayInAPI XML request body according to the WPA shared-secret hashing contract. Use the same value in the request authentication data."),
        wpaDetailItem("3. Create short-lived JWT", "Create the JWT header and payload with HS256, the active kix, correct issuer, current UTC iat, exp 30 seconds after iat, and the calculated body_hash."),
        wpaDetailItem("4. Send mandatory headers", "Send User-ID, Body_hash, Authorization: Bearer <JWT>, Content-Type, Content-Length, and APIVersion with the POST request."),
      ]
    ),
    wpaDetailSection(
      "Authentication Failure Checks",
      "Most authentication errors come from byte-level differences or environment configuration.",
      [
        wpaDetailItem("Hash mismatch", "Compare the exact bytes hashed by the sender with the exact bytes transmitted. Line endings, XML declaration encoding, whitespace, and late field changes can all produce a different hash."),
        wpaDetailItem("Expired or future JWT", "Generate iat and exp from synchronized UTC time for every request. Do not reuse tokens beyond their short validity period."),
        wpaDetailItem("Wrong identity or key index", "Verify User-ID, iss, kix, shared secret, endpoint, and environment belong to the same active configuration."),
        wpaDetailItem("Response trust", "Validate the JWT-Signed-Response and its body hash before using any response fields. An HTTP 200 response alone does not prove message integrity or transaction approval."),
      ]
    ),
  ],
  processing: [
    wpaDetailSection(
      "Transaction Result Decision",
      "Evaluate transport, protocol execution, and issuer result as separate layers.",
      [
        wpaDetailItem("Transport layer", "A successful HTTP exchange only means a response was delivered. It does not mean the command or financial transaction was approved."),
        wpaDetailItem("Protocol status", "The response status indicates whether WPA completed the command. A non-zero status is a protocol or processing failure and the transaction must not be treated as approved."),
        wpaDetailItem("Issuer response", "For commands that return resp_code, check it even when status is 0. Keep resp_code as an alphanumeric string and apply the approved-code rules agreed during certification."),
        wpaDetailItem("Persist references", "Store trn, trndttm, approval, resp_code, original_trn, RRN, STAN, DTTM, and relevant settlement fields before initiating any capture, reversal, completion, cancellation, or investigation."),
      ]
    ),
    wpaDetailSection(
      "Safe Retry and Recovery",
      "Design retries around transaction state rather than repeating financial commands blindly.",
      [
        wpaDetailItem("Timeout before a response", "Record the outcome as unknown. Follow the command-specific reversal or retrieval process before deciding to send another financial instruction."),
        wpaDetailItem("Idempotent follow-up", "Where the guide instructs continuous retry, reuse the original transaction reference data and treat documented duplicate or not-found terminal results according to that command's rules."),
        wpaDetailItem("No uncontrolled new STAN", "A new transmission identity can create a separate financial operation. Preserve the intended retry and correlation behavior defined for the command."),
        wpaDetailItem("Reconcile after recovery", "Compare the final API state with clearing and reconciliation exports so a successful recovery action is reflected in accounting and customer state."),
      ]
    ),
  ],
  commands: [
    wpaDetailSection(
      "Common Command Implementation",
      "Apply these controls to every WPA command unless the command page states otherwise.",
      [
        wpaDetailItem("Validate the command contract", "Use lowercase case-sensitive XML property names, include all standard and command-specific mandatory fields, and enforce exact field formats before calculating authentication data."),
        wpaDetailItem("Unique transmission identity", "Generate a six-digit STAN and pair it with DTTM. Persist both values and use them consistently when a later command references the original transaction."),
        wpaDetailItem("Verify the full response", "Validate response authentication, confirm the echoed command and correlation fields, then evaluate status, status_msg, status_details, and resp_code where applicable."),
        wpaDetailItem("Complete the lifecycle", "Authorization-like commands may require capture, reversal, completion, or cancellation. Do not stop implementation at the first approved response."),
      ]
    ),
    wpaDetailSection(
      "Financial Safety Controls",
      "Prevent duplicate or incorrect financial operations.",
      [
        wpaDetailItem("Server-side amounts", "Build MID, amount, currency, payment reference, and command choice from trusted backend state. Never rely only on values supplied by a browser or operator form."),
        wpaDetailItem("Reference ownership", "Before using a TRN, RRN, approval code, or original STAN/DTTM, confirm that it belongs to the expected MID, customer, order, amount, and operation."),
        wpaDetailItem("State-machine validation", "Allow only valid transitions, such as approved authorization to capture, active pre-authorization to completion or cancellation, and completed payment to an approved refund workflow."),
        wpaDetailItem("Audit trail", "Record who or what initiated the command, the business reason, correlation identifiers, request time, verified response, and any later recovery or reconciliation action."),
      ]
    ),
  ],
  exports: [
    wpaDetailSection(
      "Automated Export Processing",
      "Ingest every fixed-width export through a repeatable, auditable file pipeline.",
      [
        wpaDetailItem("Detect and validate", "Verify the expected filename pattern, client reference, processing date, rerun number, record widths, line endings, header, trailer, and declared record counts before importing details."),
        wpaDetailItem("Parse fixed widths exactly", "Use the documented character positions and ASCII-128 format. Preserve leading or trailing spaces until the field has been extracted according to its format."),
        wpaDetailItem("Import idempotently", "Use the file identity, rerun number, and transaction references to prevent a delivered or reprocessed file from applying the same records twice."),
        wpaDetailItem("Retain and reconcile", "Archive the original file and import result, reconcile it against API transactions and accounting data, and alert on missing files, invalid totals, unknown references, or amount differences."),
      ]
    ),
  ],
  reference: [
    wpaDetailSection(
      "Using Reference Data Safely",
      "Reference pages support the transaction decision but do not replace command-specific processing rules.",
      [
        wpaDetailItem("Keep codes as strings", "Preserve leading zeroes and alphanumeric response values. Do not convert resp_code, approval, STAN, RRN, MID, or other fixed identifiers to integers."),
        wpaDetailItem("Store raw and interpreted values", "Persist the original code and message together with the merchant's interpreted state so later support and reconciliation can reproduce the decision."),
        wpaDetailItem("Unknown values", "Handle unrecognized codes conservatively, keep the transaction out of an approved state, and escalate with the complete masked request/response context."),
        wpaDetailItem("Certification alignment", "Confirm approved response-code handling, enabled card schemes, 3DS behavior, export delivery, and exception procedures with iCard before production launch."),
      ]
    ),
  ],
};

const commandWpaDetails = {
  "cmd-601": [
    wpaDetailSection("Authorization Lifecycle", "Command 601 authorizes a customer payment and starts the standard dual-message flow.", [
      wpaDetailItem("When to use", "Use for a normal customer payment when funds must be authorized before clearing. Validate the MID, amount, currency, customer context, 3DS data, and stored or tokenized credential indicators first."),
      wpaDetailItem("Approval decision", "Treat the authorization as approved only after the response is authenticated, status is successful, and resp_code satisfies the certified approval rules. Preserve approval and trn."),
      wpaDetailItem("Capture requirement", "A successful 601 remains an authorization until command 607 confirms it for clearing. Track every approved authorization until it is captured or intentionally reversed."),
      wpaDetailItem("Missing response", "If no response is received, do not submit a fresh authorization blindly. Continue with command 602 reversal using the original STAN, DTTM, and MID as instructed by the guide."),
    ]),
  ],
  "cmd-602": [
    wpaDetailSection("Reversal by Original STAN and DTTM", "Command 602 reverses an earlier 601, 604, 605, 606, or 609 by its original transmission identity.", [
      wpaDetailItem("When to use", "Use after a late or missing response, or when an earlier transaction must be voided using original_stan, original_dttm, and MID."),
      wpaDetailItem("Retry behavior", "On communication failure, repeat the reversal as documented until a terminal status is received. Keep the original transaction reference fields unchanged."),
      wpaDetailItem("Terminal interpretation", "The guide treats status 0 as success, status 7 as safely not found with no financial impact, and status 9 as an already processed duplicate. Record which terminal condition closed the recovery."),
      wpaDetailItem("After reversal", "Prevent capture or further normal processing of the reversed transaction and confirm the final state in reconciliation data."),
    ]),
  ],
  "cmd-604": [
    wpaDetailSection("First Recurring Transaction", "Command 604 creates the first customer-authorized transaction in a recurring agreement.", [
      wpaDetailItem("Customer agreement", "Use while the customer is actively establishing the recurring arrangement. Store the agreement scope, consent evidence, payment reference, and resulting transaction references."),
      wpaDetailItem("Authentication data", "Send the required card, customer, recurring, and applicable 3DS fields. Ensure ECI, AVV, XID, and protocol data describe the actual authenticated transaction."),
      wpaDetailItem("Future recurring reference", "Preserve the successful first transaction TRN because command 605 uses it to link later merchant-initiated recurring transactions."),
      wpaDetailItem("Capture and recovery", "Check status and resp_code, capture an approved transaction with 607, and use 602 after a missing response."),
    ]),
  ],
  "cmd-605": [
    wpaDetailSection("Subsequent Recurring Transaction", "Command 605 charges under an existing recurring agreement using the first transaction reference.", [
      wpaDetailItem("When to use", "Use only for a scheduled or otherwise authorized subsequent recurring payment under the stored customer agreement."),
      wpaDetailItem("Original relationship", "Send the correct TRN from the first recurring sign-up and verify it belongs to the same merchant, customer, and recurring agreement."),
      wpaDetailItem("Duplicate prevention", "Validate billing period, amount, currency, agreement status, and merchant-side idempotency before sending the command."),
      wpaDetailItem("Capture and recovery", "Check status and resp_code, capture an approved recurring transaction with 607, and use 602 after a missing response."),
    ]),
  ],
  "cmd-606": [
    wpaDetailSection("Refund to Card Details", "Command 606 creates a refund using card data rather than an earlier TRN shortcut.", [
      wpaDetailItem("When to use", "Use only in the approved refund process when card details are the required destination. Prefer command 609 when the refund should be linked directly to an existing WPA transaction."),
      wpaDetailItem("Refund controls", "Validate the customer, refund reason, amount, currency, cumulative refunded amount, operator authorization, and duplicate protection."),
      wpaDetailItem("Result handling", "Authenticate the response and check both status and resp_code before recording the refund as approved."),
      wpaDetailItem("Capture and recovery", "The command list requires successful 606 transactions to be confirmed with 607 for clearing. Use 602 if the response is missing."),
    ]),
  ],
  "cmd-607": [
    wpaDetailSection("Capture and Clearing Confirmation", "Command 607 is the second stage of the dual-message flow and marks an approved transaction for clearing.", [
      wpaDetailItem("When to capture", "Capture only after the source authorization-like command is approved, not reversed, and ready for settlement according to the merchant's fulfilment decision."),
      wpaDetailItem("Exact source data", "Send the original TRN, MID, amount, currency, and approval exactly as returned or used for the approved transaction. WPA compares these values with the authorization."),
      wpaDetailItem("Retry behavior", "If the response is lost, repeat the same capture until status 0 or duplicate status 9 confirms the operation was accepted."),
      wpaDetailItem("Operational control", "Monitor approved transactions that remain uncaptured. They will not be settled to the card schemes and the issuer may later release the blocked amount."),
    ]),
  ],
  "cmd-609": [
    wpaDetailSection("Refund From an Existing TRN", "Command 609 is the transaction-linked shortcut to command 606.", [
      wpaDetailItem("When to use", "Use when the refund should reference a previously executed authorization and the original transaction details are available."),
      wpaDetailItem("Reference validation", "Confirm the TRN, MID, approval, amount, and currency belong to the intended original payment and that the requested refund is permitted."),
      wpaDetailItem("Result handling", "Authenticate the response, evaluate status and resp_code, and preserve both the refund and original transaction relationship."),
      wpaDetailItem("Capture and recovery", "Confirm an approved 609 with command 607 for clearing and use command 602 after a missing response."),
    ]),
  ],
  "cmd-611": [
    wpaDetailSection("Reversal by TRN", "Command 611 reverses a previous transaction using its WPA transaction reference.", [
      wpaDetailItem("When to use", "Use when the exact original TRN is available and the transaction must be reversed because of an uncertain result, operational error, or cancellation."),
      wpaDetailItem("Reference validation", "Verify the TRN belongs to the expected transaction and has not already moved into an incompatible state."),
      wpaDetailItem("Retry behavior", "On a communication failure, repeat the same reversal until a documented terminal status is received; do not create a separate reversal intent."),
      wpaDetailItem("Terminal interpretation", "Record status 0, safe not-found status 7, or duplicate status 9 as the reason the reversal workflow was closed, then verify through reconciliation."),
    ]),
  ],
  "cmd-615": [
    wpaDetailSection("Zero-Amount Account Verification", "Command 615 validates a Mastercard or Visa cardholder account without charging an amount.", [
      wpaDetailItem("When to use", "Use when the merchant needs to validate an account or establish stored-credential context without creating a normal-value purchase."),
      wpaDetailItem("No amount assumption", "This is a zero-amount verification. Do not treat a successful verification as a captured payment or evidence that a later charge is approved."),
      wpaDetailItem("3DS and credential data", "Send the applicable stored credential and 3DS fields consistently with the actual customer interaction and configured merchant flow."),
      wpaDetailItem("Result handling", "Authenticate the response and evaluate status, resp_code, approval, and CVC result where returned before storing the verification outcome."),
    ]),
  ],
  "cmd-617": [
    wpaDetailSection("Pre-authorization Completion by RRN", "Command 617 completes a held amount using the Retrieval Reference Number.", [
      wpaDetailItem("When to use", "Use when the active pre-authorization is identified by RRN and the merchant is ready to retrieve the held funds for settlement."),
      wpaDetailItem("Validate the completion", "Confirm the RRN, MID, amount, currency, approval, and optional settlement values belong to the intended active hold."),
      wpaDetailItem("State transition", "After a successful completion, prevent a second completion or cancellation of the same hold unless the documented recovery process allows it."),
      wpaDetailItem("Settlement evidence", "Persist the returned original_trn, RRN, response code, network, and PSP settlement fields for reconciliation."),
    ]),
  ],
  "cmd-618": [
    wpaDetailSection("Pre-authorization Cancellation by RRN", "Command 618 releases an active hold identified by its RRN.", [
      wpaDetailItem("When to use", "Use when the reserved funds should no longer be completed and the hold is identified by RRN."),
      wpaDetailItem("State validation", "Confirm the hold is still active and belongs to the expected order before sending the cancellation."),
      wpaDetailItem("After cancellation", "Mark the hold as cancelled and prevent later completion attempts from normal merchant workflows."),
      wpaDetailItem("Result evidence", "Authenticate and persist the response, original transaction reference, RRN, and settlement-related fields for support and reconciliation."),
    ]),
  ],
  "cmd-621": [
    wpaDetailSection("Transaction Retrieval and Investigation", "Command 621 retrieves data from a previously processed request.", [
      wpaDetailItem("When to use", "Use for controlled investigation and recovery when a transaction's recorded state needs to be confirmed."),
      wpaDetailItem("Identify precisely", "Provide the documented original transaction references and MID. Avoid broad or ambiguous searches in automated recovery code."),
      wpaDetailItem("Interpret original state", "Use original_is_reversed, original_is_completed, original_is_captured, original_resp_code, amount, currency, and references together to understand the transaction."),
      wpaDetailItem("Do not mutate by retrieval", "Retrieval reports state; it does not itself reverse, capture, complete, or cancel. Choose a follow-up command only after validating the returned state."),
    ]),
  ],
  "cmd-623": [
    wpaDetailSection("Pre-authorization Hold", "Command 623 authorizes and reserves funds for a sale to be completed later.", [
      wpaDetailItem("When to use", "Use when the final sale amount or fulfilment decision will occur later and funds must be reserved first."),
      wpaDetailItem("Hold is not settlement", "A successful pre-authorization blocks funds but does not debit them for settlement until completion command 617 or 624 succeeds."),
      wpaDetailItem("Preserve both references", "Store TRN, RRN, approval, amount, currency, and settlement metadata because later completion or cancellation depends on the correct reference path."),
      wpaDetailItem("Close every hold", "Track each approved pre-authorization until it is completed or cancelled. Avoid leaving holds unresolved until issuer expiry."),
    ]),
  ],
  "cmd-624": [
    wpaDetailSection("Pre-authorization Completion by TRN", "Command 624 completes a held amount using the original WPA TRN.", [
      wpaDetailItem("When to use", "Use when the active pre-authorization is identified by TRN and the merchant is ready to retrieve the held funds."),
      wpaDetailItem("Validate source and amount", "Confirm TRN, MID, amount, currency, and approval match the intended hold and satisfy the merchant's completion rules."),
      wpaDetailItem("One final transition", "After success, mark the hold completed and block normal cancellation or duplicate completion attempts."),
      wpaDetailItem("Reconcile", "Persist original_trn, RRN, settlement fields, and verified response status for later clearing and accounting checks."),
    ]),
  ],
  "cmd-625": [
    wpaDetailSection("Pre-authorization Cancellation by TRN", "Command 625 releases an active hold using the original WPA TRN.", [
      wpaDetailItem("When to use", "Use when the pre-authorization should be cancelled and its TRN is the selected reference."),
      wpaDetailItem("Validate state", "Confirm the referenced hold belongs to the intended order and has not already been completed or cancelled."),
      wpaDetailItem("Prevent later completion", "After a verified successful cancellation, update merchant state so the same hold cannot be completed by a later automated process."),
      wpaDetailItem("Retain evidence", "Store the cancellation TRN, original_trn, RRN, response code, and settlement metadata for customer support and reconciliation."),
    ]),
  ],
  "cmd-5000": [
    wpaDetailSection("Connectivity Check Usage", "Command 5000 verifies that the WPA interface can receive and answer a request.", [
      wpaDetailItem("What it proves", "A status 0 response confirms interface connectivity and command handling at that moment."),
      wpaDetailItem("What it does not prove", "It does not validate a MID, card processing, issuer connectivity, 3DS, capture, exports, or the complete production transaction path."),
      wpaDetailItem("Monitoring use", "Use it as a lightweight health signal with sensible frequency and alert thresholds, not as a high-volume polling request."),
      wpaDetailItem("Authentication still matters", "Send it through the normal authenticated transport unless the agreed integration setup explicitly states otherwise."),
    ]),
  ],
};

const sectionWpaDetails = {
  overview: [
    wpaDetailSection("Recommended WPA Transaction Architecture", "Build the integration around a durable backend transaction state machine.", [
      wpaDetailItem("Initiate", "Create and persist the business operation, command, STAN, DTTM, MID, amount, currency, and payment reference before sending WPA traffic."),
      wpaDetailItem("Authenticate and transmit", "Generate the body hash and short-lived JWT from the final XML, then POST to the environment-specific endpoint."),
      wpaDetailItem("Interpret", "Verify the signed response and evaluate status plus resp_code where applicable before changing the merchant transaction state."),
      wpaDetailItem("Complete and reconcile", "Run capture, reversal, pre-authorization completion or cancellation as required, then reconcile API state with automated exports and back-office records."),
    ]),
  ],
  "integration-steps": [
    wpaDetailSection("Integration Deliverables", "Each phase should produce evidence that the implementation is ready for the next environment.", [
      wpaDetailItem("Scope definition", "Agree enabled commands, MIDs and currencies, card schemes, 3DS ownership, recurring and stored-credential use cases, exports, operational contacts, and production launch criteria."),
      wpaDetailItem("Sandbox evidence", "Return scenario results with STAN, DTTM, TRN, response codes, timestamps, and proof of authorization, capture, reversal, recurring, pre-authorization, and failure handling used by the merchant."),
      wpaDetailItem("Production controls", "Confirm secret delivery, access controls, endpoint configuration, monitoring, masking, reconciliation ingestion, incident response, and approval for real-value production tests."),
      wpaDetailItem("Go-live review", "Resolve all uncertain transactions and reconciliation differences, confirm clearing, and agree the monitored launch window and support escalation path."),
    ]),
  ],
  security: sharedWpaDetails.authentication,
  "jwt-structure": sharedWpaDetails.authentication,
  "jwt-example": [
    ...sharedWpaDetails.authentication,
    wpaDetailSection("Reproducing the JWT Example", "Use the example to test deterministic token generation before connecting to WPA.", [
      wpaDetailItem("Compact JSON", "Serialize header and payload without spaces or line breaks before Base64URL encoding."),
      wpaDetailItem("Exact claims", "Confirm typ, alg, hash, kix, iss, iat, exp, and body_hash match the active request and secret configuration."),
      wpaDetailItem("Signature input", "Sign the encoded header, a period, and encoded payload with HMAC-SHA256 using the shared secret."),
      wpaDetailItem("Test independently", "Create automated test vectors for fixed XML, timestamps, secret, body hash, and expected JWT so future library or serialization changes cannot silently break authentication."),
    ]),
  ],
  "http-request": [
    ...sharedWpaDetails.authentication,
    wpaDetailSection("Request Header Validation", "Construct headers only after the final body is available.", [
      wpaDetailItem("User-ID", "Use the caller identifier bound to the active pre-shared secret and environment."),
      wpaDetailItem("Body_hash and Authorization", "Derive both from the same final XML body and shared-secret context. Regenerate them for every changed request."),
      wpaDetailItem("Content metadata", "Send the supported XML content type, accurate byte Content-Length, and agreed APIVersion."),
      wpaDetailItem("Logging", "Log header presence, key index, request time, endpoint, and correlation IDs while masking the bearer token, secret, and sensitive body values."),
    ]),
  ],
  "http-response": [
    ...sharedWpaDetails.authentication,
    wpaDetailSection("Response Verification Order", "Do not parse a WPA response into business state before verifying it.", [
      wpaDetailItem("Capture raw response", "Retain the HTTP status, response headers, exact body bytes, timing, and merchant correlation data in a protected diagnostic record."),
      wpaDetailItem("Verify JWT-Signed-Response", "Validate the token, issuer, time window, key index, and body hash against the exact received response body."),
      wpaDetailItem("Parse XML after verification", "Confirm the expected response wrapper, command, STAN/DTTM correlation, status, and command-specific fields."),
      wpaDetailItem("Handle verification failure", "Keep the operation in an unknown or failed-integrity state and investigate; never accept transaction values from an unverified response."),
    ]),
  ],
  endpoints: [
    wpaDetailSection("Environment Configuration", "Environment selection must be controlled by deployment configuration, not request data.", [
      wpaDetailItem("Sandbox", "Use webpayin.sandbox.apicard.direct/v1 with sandbox User-ID, shared secret, MIDs, cards, and test scenarios only."),
      wpaDetailItem("Production", "Use webjwtin0.icard.com/v1 only after certification and production credentials are issued."),
      wpaDetailItem("No cross-environment reuse", "Do not mix secrets, key indexes, MIDs, transaction references, or test data between sandbox and production."),
      wpaDetailItem("Network readiness", "Allow outbound HTTPS to the required endpoint, enforce TLS 1.2 or later, monitor DNS and certificate failures, and configure secure time synchronization."),
    ]),
  ],
  testing: [
    wpaDetailSection("Minimum Certification Coverage", "Test the full lifecycle, not only a successful authorization.", [
      wpaDetailItem("Authentication and validation", "Test valid JWT/body hash, invalid secret or kix, expired token, changed body after hashing, malformed XML, missing mandatory fields, and invalid MID/currency combinations."),
      wpaDetailItem("Financial outcomes", "Test approvals, issuer declines, communication timeouts, reversal recovery, duplicate transmissions, capture success and duplicate capture, and uncaptured authorization monitoring."),
      wpaDetailItem("Special flows", "Test every enabled recurring, account verification, pre-authorization completion/cancellation, 3DS, tokenized credential, refund, and retrieval scenario."),
      wpaDetailItem("Operations and files", "Test export delivery, file reruns, fixed-width parsing, idempotent import, reconciliation differences, production monitoring, and masked support evidence."),
    ]),
  ],
  "payment-process": sharedWpaDetails.processing,
  "xml-standard": [
    ...sharedWpaDetails.processing,
    wpaDetailSection("XML Construction Rules", "The WPA XML protocol is case-sensitive and each request is handled as one command.", [
      wpaDetailItem("Lowercase properties", "Use the documented lowercase XML element names exactly. Element-name case changes the protocol meaning and the body hash."),
      wpaDetailItem("Standard wrapper", "Use the documented ipayin_request or applicable iserver_request wrapper and include standard properties unless the command explicitly excludes them."),
      wpaDetailItem("One immutable body", "Generate, validate, hash, authenticate, and transmit the same XML bytes. Avoid reformatting or reserializing after authentication."),
      wpaDetailItem("One command per request", "Treat the response as the complete result of that command and close the logical request session before starting a follow-up command."),
    ]),
  ],
  "standard-request-properties": [
    ...sharedWpaDetails.commands,
    wpaDetailSection("STAN and DTTM Management", "These fields are central to correlation and reversal safety.", [
      wpaDetailItem("STAN generation", "Generate a six-digit sequential transmission number from 000001 through 999999, then restart as documented. Persist it before transmission."),
      wpaDetailItem("Combined uniqueness", "Treat STAN together with DTTM as the transmission identity. Never lose the original pair needed by command 602."),
      wpaDetailItem("Clock quality", "Use a synchronized system clock and the exact documented date-time format."),
      wpaDetailItem("Command value", "Set command to the intended numerical operation and verify the response echoes the expected command before processing it."),
    ]),
  ],
  "standard-response-properties": [
    ...sharedWpaDetails.processing,
    wpaDetailSection("Standard Response Interpretation", "Use standard response fields to verify correlation and protocol execution.", [
      wpaDetailItem("Echo and correlation", "Check command, STAN, and DTTM against the submitted operation before using transaction-specific fields."),
      wpaDetailItem("Transaction references", "Persist TRN and TRNDTTM as WPA-assigned references for later commands, retrieval, exports, and support."),
      wpaDetailItem("Status fields", "Use status as the protocol execution result and retain status_msg and status_details for diagnostics."),
      wpaDetailItem("Missing mandatory fields", "Treat a missing or empty mandatory response field as an invalid or incomplete response and investigate before changing financial state."),
    ]),
  ],
  "command-codes": [
    ...sharedWpaDetails.commands,
    wpaDetailSection("Choosing the Correct Command", "Select the command from the intended business state transition.", [
      wpaDetailItem("Purchase flow", "Use 601 for authorization and 607 to capture it; use 602 or 611 for the appropriate reversal reference path."),
      wpaDetailItem("Recurring flow", "Use 604 for the first customer-authorized recurring transaction and 605 for later linked transactions, then capture approved transactions with 607."),
      wpaDetailItem("Refund flow", "Use 606 for a refund using card details or 609 for a refund linked to an existing TRN, then follow the documented capture and recovery lifecycle."),
      wpaDetailItem("Pre-authorization flow", "Use 623 to hold funds, then exactly one completion path, 617 by RRN or 624 by TRN, or one cancellation path, 618 by RRN or 625 by TRN."),
    ]),
  ],
  "export-copy-requests-chargebacks": sharedWpaDetails.exports,
  "export-reconciliation": [
    ...sharedWpaDetails.exports,
    wpaDetailSection("Daily Reconciliation Controls", "Use the reconciliation export to compare WPA activity with merchant accounting.", [
      wpaDetailItem("Process by business date", "Import the complete file after cut-off and account for transactions after 00:00 EET appearing in the next day's file."),
      wpaDetailItem("Validate group totals", "Check group headers, detail records, group trailers, currencies, counts, amounts, balances, fees, payouts, and the final file trailer."),
      wpaDetailItem("Match transaction references", "Reconcile TRN, ARN, approval, payment reference, amount, currency, and transaction type against merchant records."),
      wpaDetailItem("Investigate differences", "Create controlled exceptions for missing transactions, unexpected types, amount or fee differences, duplicate files, and unmatched references."),
    ]),
  ],
  "export-clearing": [
    ...sharedWpaDetails.exports,
    wpaDetailSection("Clearing Verification", "Use the clearing export to confirm which transactions were presented to card schemes.", [
      wpaDetailItem("Compare with captures", "Every transaction expected to settle should have the appropriate capture or completion state and later appear in clearing according to cut-off timing."),
      wpaDetailItem("Check presentment state", "Use the presentment flag and original references to distinguish first presentment, reversal, second presentment, and reversal of second presentment."),
      wpaDetailItem("Validate monetary fields", "Compare transaction and captured amounts and currencies, ARN, approval, and payment reference with internal records."),
      wpaDetailItem("Escalate missing clearing", "Investigate approved and captured merchant transactions that do not appear after the expected clearing window."),
    ]),
  ],
  errors: [
    ...sharedWpaDetails.reference,
    wpaDetailSection("Error Handling Decision Tree", "Keep protocol errors, issuer declines, and uncertain outcomes separate.", [
      wpaDetailItem("Non-zero status", "Treat the command as not approved. Correct deterministic request errors before retrying and investigate system or communication errors through the command-specific recovery path."),
      wpaDetailItem("Status 0 with resp_code", "For applicable financial commands, status 0 means the issuer response was received; still evaluate resp_code before deciding approval."),
      wpaDetailItem("Approved-code alignment", "The guide's command summary references 00 and 85 for applicable commands, while the error section describes 00 as approved. Confirm the exact accepted-code policy with iCard during certification."),
      wpaDetailItem("Status 7 and 9", "Interpret transaction-not-found and duplicate-transmission statuses only in the context of the specific retry-safe command, especially reversal and capture recovery."),
    ]),
  ],
  cvc: [
    ...sharedWpaDetails.reference,
    wpaDetailSection("CVC Result Use", "CVC result is a risk signal returned for supported commands, not the whole approval decision.", [
      wpaDetailItem("Read with transaction result", "Evaluate CVC result together with authenticated response status, resp_code, 3DS data, merchant risk rules, and the enabled card-scheme flow."),
      wpaDetailItem("Preserve the exact code", "Store M, N, P, U, or S as the original string and map it to a clear internal risk outcome."),
      wpaDetailItem("Do not store CVC", "Never retain the submitted CVC2/CVV2/CID after authorization. Store only the returned verification result where permitted."),
      wpaDetailItem("Unknown or unverified", "Handle P, U, S, and unknown values according to the merchant's certified risk and fraud policy."),
    ]),
  ],
  threed: [
    ...sharedWpaDetails.reference,
    wpaDetailSection("3D Secure Responsibilities", "Only correctly configured 3D-enabled MIDs may process 3D transactions.", [
      wpaDetailItem("Merchant registration", "Confirm each MID is enabled for the required 3D program and card schemes before sending production 3DS data."),
      wpaDetailItem("Partner responsibility", "The partner must provide and operate the 3D service for its merchants and pass accurate authentication results to WPA."),
      wpaDetailItem("Field consistency", "Ensure program_protocol, ds_transaction_id, ECI, AVV, XID, stored credential, token indicator, and token requestor values represent the actual authentication and tokenized-card flow."),
      wpaDetailItem("Certification", "Test frictionless, challenge, attempted, unavailable, exemption, tokenized credential, decline, and 3D-disabled MID scenarios used by the integration."),
    ]),
  ],
};

function baseWpaDetailsForPage(page) {
  if (page.subtitle === "Command") return sharedWpaDetails.commands;
  if (page.subtitle === "Authentication" || page.subtitle === "Transport") return sharedWpaDetails.authentication;
  if (page.subtitle === "Processing model" || page.subtitle === "Schema") return sharedWpaDetails.processing;
  if (page.subtitle === "Exports") return sharedWpaDetails.exports;
  if (page.subtitle === "Reference") return sharedWpaDetails.reference;
  return sharedWpaDetails.general;
}

for (const [sectionId, page] of Object.entries(wpaContent)) {
  const detailSections = [
    ...baseWpaDetailsForPage(page),
    ...(sectionWpaDetails[sectionId] || []),
    ...(commandWpaDetails[sectionId] || []),
  ];

  page.detailSections = detailSections.filter(
    (section, index) =>
      section &&
      detailSections.findIndex((candidate) => candidate?.title === section.title) === index
  );
}
