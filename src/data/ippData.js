export const ippMenu = [
  {
    title: "General",
    items: [
      { id: "ipp-overview", label: "Overview", type: "overview" },
      { id: "ipp-protocol-basics", label: "Protocol basics", type: "guide" },
      { id: "ipp-communication", label: "Communication modes", type: "guide" },
      { id: "ipp-ssl", label: "SSL encrypted connection", type: "guide" },
      { id: "ipp-data-flow", label: "Data flow pattern", type: "guide" },
      { id: "ipp-standard-properties", label: "Standard properties", type: "guide" },
      { id: "ipp-stage-statuses", label: "Stage statuses", type: "schema" },
      { id: "ipp-stages", label: "Stages", type: "schema" },
      { id: "ipp-languages", label: "Supported languages", type: "schema" },
      { id: "ipp-declined", label: "Declined messages", type: "schema" },
    ],
  },
  {
    title: "Financial",
    items: [
      { id: "ipp-purchase", label: "PURCHASE", type: "post" },
      { id: "ipp-reversal", label: "REVERSAL", type: "post" },
      { id: "ipp-refund", label: "REFUND", type: "post" },
      { id: "ipp-complete", label: "COMPLETE_TX", type: "post" },
      { id: "ipp-cancel", label: "CANCEL_TX", type: "post" },
      { id: "ipp-vending", label: "VENDING_PURCHASE", type: "post" },
      { id: "ipp-cancel-stage", label: "CANCEL_STAGE", type: "post" },
      { id: "ipp-cash-advance", label: "CASH_ADVANCE", type: "post" },
    ],
  },
  {
    title: "Status / print / system",
    items: [
      { id: "ipp-get-status", label: "GET_STATUS", type: "post" },
      { id: "ipp-print-ext", label: "PRINT_EXT", type: "post" },
      { id: "ipp-update", label: "UPDATE", type: "post" },
      { id: "ipp-get-certificate", label: "GET_CERTIFICATE", type: "post" },
      { id: "ipp-init", label: "INIT", type: "post" },
      { id: "ipp-ping", label: "PING", type: "post" },
      { id: "ipp-reboot", label: "REBOOT", type: "post" },
      { id: "ipp-open-settings", label: "OPEN_SETTINGS", type: "post" },
    ],
  },
];

export const ippContent = {
  "ipp-overview": {
    title: "IPP",
    subtitle: "Overview",
    description:
      "IPP is the Integrated Payment POS protocol used between the caller and the iCard terminal for card-present financial, status, print and system operations.",
    facts: [
      "PROPERTY=VALUE protocol",
      "Stage-based processing",
      "Cash register + Slave mode",
    ],
    body: [
      "The protocol used between the caller and the terminal is called Integrated Payment POS protocol (IPP). The message format is a 2-byte header followed by `PROPERTY=VALUE` sequence items. The header contains the total message length so the terminal knows where the message ends. :contentReference[oaicite:1]{index=1}",
      "The documented method groups include financial methods such as PURCHASE, REFUND, REVERSAL, COMPLETE_TX and CANCEL_TX; status and print methods such as GET_STATUS and PRINT_EXT; and system methods such as INIT, PING, GET_CERTIFICATE, UPDATE and REBOOT. ",
      "All requests follow the same high-level pattern: connect to terminal, send request, receive STAGE 1, continue waiting while STATUS is 0 until STAGE 5, then close the connection. In Slave mode, STAGE 4 may appear at any time between STAGE 1 and STAGE 5. ",
    ],
    request: `2-byte header
PROTOCOL=IPP
VERSION=202
METHOD=<method>
SID=<unique-session-id>
...other method fields...`,
    response: `PROTOCOL=IPP
METHOD=<echo>
SID=<echo>
STATUS=<stage status>
STAGE=<stage number>
TIMEOUT=<seconds>`,
  },

  "ipp-protocol-basics": {
    title: "Protocol basics",
    subtitle: "General",
    description:
      "IPP messages use a 2-byte length header and then a sequence of `PROPERTY=VALUE` elements.",
    facts: [
      "Length-prefixed message",
      "IPP mandatory protocol value",
      "VERSION 202 shown in examples",
    ],
    body: [
      "The first 2 bytes of the message specify the total message length. After that, the payload is composed of `PROPERTY=VALUE` pairs. :contentReference[oaicite:4]{index=4}",
      "Standard request properties include `PROTOCOL`, `VERSION`, `METHOD`, `SID` and optional `LANG`. The documentation shows `PROTOCOL=IPP` and `VERSION=202` in the standard examples. ",
    ],
    request: `Header: <2 bytes total length>
PROTOCOL=IPP
VERSION=202
METHOD=PURCHASE
SID=126ca831-93d2-4dfc-ab1f-0cce1d0abe9e
LANG=EN`,
    response: `PROTOCOL=IPP
METHOD=PURCHASE
SID=126ca831-93d2-4dfc-ab1f-0cce1d0abe9e
STATUS=0
STAGE=1
TIMEOUT=30`,
  },

  "ipp-communication": {
    title: "Communication modes",
    subtitle: "General",
    description:
      "IPP supports Cash register mode and Slave mode depending on terminal connectivity.",
    facts: [
      "Cash register mode",
      "Slave mode",
      "Host connectivity differences",
    ],
    body: [
      "When the terminal uses its own communication environment to talk to the Acquirer HOST, the mode is called `Cash register`. When the terminal uses the caller communication connectivity, the mode is called `Slave`. The document describes Cash register mode by default and explicitly marks the Slave-specific differences. ",
    ],
    request: `Mode selection depends on the terminal device configuration.`,
    response: `Slave mode may return IP / PORT / CHAIN fields and has SSL-specific behavior.`,
  },

  "ipp-ssl": {
    title: "SSL encrypted connection",
    subtitle: "General",
    description:
      "In Slave mode, the communication between caller and host must be SSL encrypted with DER-encoded X.509 certificates.",
    facts: [
      "Slave mode only",
      "DER encoded X.509",
      "Primary and secondary chains",
    ],
    body: [
      "For Slave mode, communication between the caller and the host must be SSL encrypted. Certificates are DER encoded binary X.509 and the first 2 bytes specify the property length in big-endian order. ",
      "The terminal maintains two chains of certificates: primary for all methods except UPDATE, and secondary for UPDATE. If the caller does not have certificates corresponding to the returned fingerprints, it must call GET_CERTIFICATE. ",
    ],
    request: `CHAIN=<fingerprints>
GET_CERTIFICATE if missing local certs`,
    response: `Use returned primary/secondary chains for secure host communication.`,
  },

  "ipp-data-flow": {
    title: "Data flow pattern",
    subtitle: "General",
    description:
      "All IPP requests follow a stage-based exchange and the caller must respect the TIMEOUT returned by the previous stage.",
    facts: [
      "Wait for STAGE 1 first",
      "Continue until STAGE 5",
      "TIMEOUT-driven waiting",
    ],
    body: [
      "The caller is recommended to wait 5 seconds for the answer with STAGE 1. All later waits are governed by the TIMEOUT value returned in the previous answer. ",
      "In Slave mode, STAGE 4 may be initiated at any time between STAGE 1 and STAGE 5 and does not necessarily follow the standard order. ",
    ],
    request: `connect -> send request -> wait STAGE 1 -> continue while STATUS=0 -> final STAGE 5 -> close`,
    response: `Follow TIMEOUT from the previous received stage.`,
  },

  "ipp-standard-properties": {
    title: "Standard properties",
    subtitle: "General",
    description:
      "Every request and response contains standard properties that apply across methods unless explicitly excluded.",
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Protocol used. Typical value: IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version. Examples include 100-202; docs show 202."],
      ["METHOD", "string", "Mandatory", "Method name."],
      ["SID", "string", "Mandatory", "Unique session ID set by the caller. Up to 127 characters."],
      ["LANG", "string", "Optional", "Alpha-2 ISO language code. Default EN."],
      ["SID_ORIGINAL", "string", "Conditional Echo", "Echo of original transaction SID when applicable."],
      ["STATUS", "number", "Mandatory", "Stage status code."],
      ["STAGE", "number", "Mandatory", "Stage number."],
      ["TIMEOUT", "number", "Optional", "Time to wait for the next answer."],
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=<method>
SID=<session-id>
LANG=EN`,
    response: `PROTOCOL=IPP
METHOD=<echo>
SID=<echo>
SID_ORIGINAL=<echo if applicable>
STATUS=0
STAGE=1
TIMEOUT=30`,
  },

  "ipp-stage-statuses": {
    title: "Stage statuses",
    subtitle: "General",
    description:
      "Stage responses use STATUS values to indicate progress, errors or final outcome.",
    table: {
      headers: ["Example status", "Meaning"],
      rows: [
        ["0", "Success / continue processing"],
        ["1", "General error / method-specific error outcome"],
        ["2", "Communication / system-side issue depending on method"],
        ["3", "Invalid input parameter"],
        ["4", "Other method error state"],
        ["13", "Method-specific processing decline / cancellation state"],
        ["14", "Method-specific processing state"],
        ["15", "Method-specific processing state"],
        ["17", "Method-specific completion / cancel state"],
        ["18", "Method-specific refund final state"],
        ["25", "Record not found / special reversal meaning in some methods"],
        ["36", "Method-specific cancel state"],
        ["37", "Updated stage status in protocol v1.0 doc"],
        ["38", "Connectivity / method-specific state"],
        ["100", "Final method-specific outcome in financial completion stages"],
      ],
    },
    request: `STATUS is always evaluated together with STAGE and METHOD.`,
    response: `Interpret STATUS in the context of the current method and stage.`,
  },

  "ipp-stages": {
    title: "Stages",
    subtitle: "General",
    description:
      "IPP methods progress through numbered stages and not all stages are applicable to every method.",
    table: {
      headers: ["Stage", "Purpose"],
      rows: [
        ["1", "Initial response after request submission"],
        ["2", "Intermediate processing stage"],
        ["3", "Intermediate processing stage"],
        ["4", "Slave-mode host communication stage where applicable"],
        ["5", "Final response stage"],
        ["11", "Notification-only stage"],
        ["12", "DCC / notification stage"],
        ["13", "Notification stage with offline PIN tries left when applicable"],
        ["14", "DCC choice result notification stage"],
      ],
    },
    body: [
      "Notification stages 11, 12, 13 and 14 are documented as optional and may be omitted if there is no need for them in the caller. They are also applicable for REFUND and VENDING_PURCHASE. ",
    ],
    request: `Method-dependent stages`,
    response: `Always observe STAGE together with STATUS and TIMEOUT.`,
  },

  "ipp-languages": {
    title: "Supported languages",
    subtitle: "General",
    description:
      "Requests may include `LANG` as Alpha-2 ISO language code, with EN as default.",
    facts: [
      "LANG is optional",
      "Alpha-2 ISO code",
      "EN default",
    ],
    request: `LANG=EN`,
    response: `Terminal default language is EN when LANG is not supplied. `,
  },

  "ipp-declined": {
    title: "Declined messages",
    subtitle: "General",
    description:
      "The protocol includes an appendix for transaction declined messages used in terminal responses.",
    facts: [
      "Appendix IX",
      "Method-specific decline interpretation",
      "Used with approval / final status analysis",
    ],
    request: `Read final APPROVAL / STATUS / TX_STATUS combination`,
    response: `Use the declined-message appendix for customer-facing and support interpretation. :contentReference[oaicite:13]{index=13}`,
  },

  "ipp-purchase": {
    title: "PURCHASE",
    subtitle: "Financial",
    description:
      "Initiates a purchase / sale or preauthorization procedure in the terminal. Customer interaction is required.",
    facts: [
      "Customer interaction",
      "Amount + currency required",
      "Can also be used for card read before external processing",
    ],
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Must be IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version."],
      ["METHOD", "string", "Mandatory", "Must be PURCHASE."],
      ["SID", "string", "Mandatory", "Caller-defined session ID."],
      ["AMOUNT", "decimal", "Mandatory", "Positive amount to debit. Decimal point must match currency exponent."],
      ["CURRENCY", "string", "Mandatory", "ISO numeric currency code. Must match terminal currency setting."],
      ["REFERENCE", "string", "Optional", "Merchant-side transaction reference where applicable."],
      ["MOTO_TX", "number", "Optional", "Use when processing MO/TO only."],
      ["PAN", "string", "Optional", "Manual PAN entry in MO/TO scenario."],
      ["EXP_DATE", "string", "Optional", "Card expiration date in method-specific format when manual entry is used."],
    ],
    body: [
      "The terminal receives amount and currency, prompts the user for card, manages EMV or magnetic stripe reading, communicates with acquiring host and responds with approval, decline code or error. ",
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=PURCHASE
SID=126ca831-93d2-4dfc-ab1f-0cce1d0abe9e
AMOUNT=10.59
CURRENCY=978`,
    response: `PROTOCOL=IPP
METHOD=PURCHASE
SID=126ca831-93d2-4dfc-ab1f-0cce1d0abe9e
STATUS=0
STAGE=1
TIMEOUT=30`,
  },

  "ipp-reversal": {
    title: "REVERSAL",
    subtitle: "Financial",
    description:
      "Initiates a void procedure in the terminal for the last processed transaction. No cardholder interaction is needed.",
    facts: [
      "No customer interaction",
      "Only last processed transaction",
      "Void / reversal flow",
    ],
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Must be IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version."],
      ["METHOD", "string", "Mandatory", "Must be REVERSAL."],
      ["SID", "string", "Mandatory", "Session ID of the reversal request."],
      ["SID_ORIGINAL", "string", "Mandatory", "SID of the original transaction being reversed."],
    ],
    body: [
      "The terminal receives the SID of the original transaction, searches for it in batch and processes the reversal. Only the last processed transaction can be reversed. ",
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=REVERSAL
SID=<new-session-id>
SID_ORIGINAL=<original-session-id>`,
    response: `Final approval-style outcome is returned in the later stages depending on terminal processing.`,
  },

  "ipp-refund": {
    title: "REFUND",
    subtitle: "Financial",
    description:
      "Initiates a refund / credit to cardholder procedure in the terminal. Customer interaction is required.",
    facts: [
      "Customer interaction",
      "Offline refund support",
      "Optional MO/TO mode",
    ],
    fields: [
      ["SID_ORIGINAL", "string", "Mandatory Echo", "Original transaction SID when applicable."],
      ["REFERENCE", "string", "Optional", "Merchant reference."],
      ["AMOUNT", "decimal", "Mandatory", "Refund amount."],
      ["CURRENCY", "string", "Mandatory", "ISO numeric currency code."],
      ["MOTO_TX", "number", "Optional", "1 means only MO/TO refund is processed."],
      ["PAN", "string", "Optional", "Card PAN for MO/TO refund."],
      ["EXP_DATE", "string", "Optional", "Card expiration date for MO/TO refund."],
      ["PASSWORD", "string", "Optional", "Password to unlock refund if the merchant forbids direct refunds. Length 4-8 digits."],
    ],
    body: [
      "The refund itself is an original transaction and is not connected to a previous authorization. For iCARDs the credit can be authorized immediately; for other issuers, the terminal may still place the refund in batch even if online refund authorization is declined. ",
      "Expected response stages are STAGE 1, 2, 3, 4 and 5. STAGE 4 is applicable only in Slave mode. ",
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=REFUND
SID=<new-session-id>
AMOUNT=12.56
CURRENCY=978
PASSWORD=1234`,
    response: `Final STAGE 5 may return AUTH_CODE and APPROVAL.
Caller should debit / complete local accounting only when APPROVAL=00. :contentReference[oaicite:18]{index=18}`,
  },

  "ipp-complete": {
    title: "COMPLETE_TX",
    subtitle: "Financial",
    description:
      "Initiates settlement / receipt procedure in the terminal. No customer interaction is needed.",
    facts: [
      "No customer interaction",
      "Settlement of authorized transaction",
      "Uses original SID context",
    ],
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Must be IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version."],
      ["METHOD", "string", "Mandatory", "Must be COMPLETE_TX."],
      ["SID", "string", "Mandatory", "Session ID of the completion request."],
      ["SID_ORIGINAL", "string", "Mandatory", "SID of original purchase / preauthorization."],
    ],
    body: [
      "COMPLETE_TX is the settlement / receipt method used to finalize a previously authorized purchase flow. The final stage 5 response may return status values including 0, 13, 14, 15, 17 and 100. :contentReference[oaicite:19]{index=19}",
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=COMPLETE_TX
SID=<new-session-id>
SID_ORIGINAL=<original-session-id>`,
    response: `Final STAGE 5 settles the transaction in the terminal workflow. :contentReference[oaicite:20]{index=20}`,
  },

  "ipp-cancel": {
    title: "CANCEL_TX",
    subtitle: "Financial",
    description:
      "Initiates an automatic reversal procedure in the terminal for the last successful authorized transaction that has not been completed yet.",
    facts: [
      "No customer interaction",
      "Only last successful auth",
      "Pre-completion cancel",
    ],
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Must be IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version."],
      ["METHOD", "string", "Mandatory", "Must be CANCEL_TX."],
      ["SID", "string", "Mandatory", "Session ID of the cancel request."],
      ["SID_ORIGINAL", "string", "Mandatory", "SID of original transaction to cancel."],
    ],
    body: [
      "CANCEL_TX can be used only for the last successfully authorized transaction that has not yet been completed with COMPLETE_TX. The terminal checks its batch and returns an error if such a transaction is not found. :contentReference[oaicite:21]{index=21}",
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=CANCEL_TX
SID=<new-session-id>
SID_ORIGINAL=<original-session-id>`,
    response: `STAGE 1 may include IP / PORT / CHAIN in Slave mode. Final response is returned in later stages. :contentReference[oaicite:22]{index=22}`,
  },

  "ipp-vending": {
    title: "VENDING_PURCHASE",
    subtitle: "Financial",
    description:
      "Used when the POS device operates with a vending machine. There is no timeout for card waiting unless explicitly stated by the vending machine.",
    facts: [
      "Vending use case",
      "No implicit card wait timeout",
      "Financial flow",
    ],
    request: `METHOD=VENDING_PURCHASE`,
    response: `Notification stages 11-14 can also apply to VENDING_PURCHASE. `,
  },

  "ipp-cancel-stage": {
    title: "CANCEL_STAGE",
    subtitle: "Financial",
    description:
      "Cancels an in-progress stage-driven procedure when the caller needs to abort the current terminal interaction.",
    facts: [
      "Stage interruption control",
      "Terminal flow abort",
      "Used during active interaction",
    ],
    request: `METHOD=CANCEL_STAGE`,
    response: `Use this method when an active staged terminal flow must be interrupted.`,
  },

  "ipp-cash-advance": {
    title: "CASH_ADVANCE",
    subtitle: "Financial",
    description:
      "Manual cash-advance operation documented in the IPP method list.",
    facts: [
      "Manual cash",
      "Financial method",
      "Terminal-host flow",
    ],
    request: `METHOD=CASH_ADVANCE`,
    response: `Use the IPP method-specific fields from the cash-advance section when building this operation.`,
  },

  "ipp-get-status": {
    title: "GET_STATUS",
    subtitle: "Status / print / system",
    description:
      "Returns the terminal status or the status and details of a previously executed payment.",
    facts: [
      "Terminal status",
      "Transaction status lookup",
      "Can return certificate-chain fingerprints",
    ],
    body: [
      "GET_STATUS is the status method for checking terminal condition or retrieving status and details for a previously executed payment. The SSL section also notes that GET_STATUS returns primary and secondary chains of fingerprints for certificate handling in Slave mode. ",
    ],
    request: `METHOD=GET_STATUS`,
    response: `Use response payload to inspect terminal state and certificate chains where applicable.`,
  },

  "ipp-print-ext": {
    title: "PRINT_EXT",
    subtitle: "Status / print / system",
    description:
      "Prints a receipt on the terminal printer.",
    facts: [
      "Print method",
      "Terminal printer output",
      "Non-financial operation",
    ],
    request: `METHOD=PRINT_EXT`,
    response: `Terminal prints the supplied or referenced receipt content.`,
  },

  "ipp-update": {
    title: "UPDATE",
    subtitle: "Status / print / system",
    description:
      "Used for terminal device software update.",
    facts: [
      "System update",
      "Secondary chain relevant in SSL mode",
      "Terminal software operation",
    ],
    body: [
      "The SSL section explicitly states that the terminal maintains a secondary certificate chain for UPDATE, separate from the primary chain used by other methods. ",
    ],
    request: `METHOD=UPDATE`,
    response: `Use update-specific certificate chain handling when operating in Slave mode.`,
  },

  "ipp-get-certificate": {
    title: "GET_CERTIFICATE",
    subtitle: "Status / print / system",
    description:
      "Returns the certificate for a requested fingerprint.",
    facts: [
      "Certificate retrieval",
      "Binary certificate payload",
      "Used in Slave mode certificate sync",
    ],
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Must be IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version."],
      ["METHOD", "string", "Mandatory", "Must be GET_CERTIFICATE."],
      ["SID", "string", "Mandatory", "Session ID."],
      ["FINGERPRINT", "binary", "Mandatory", "Requested certificate fingerprint."],
    ],
    body: [
      "The response returns `FINGERPRINT` and `CERT`, where the first 2 bytes specify the property length in big-endian order. This method is used when the caller does not have certificates corresponding to returned fingerprints. ",
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=GET_CERTIFICATE
SID=<session-id>
FINGERPRINT=<binary>`,
    response: `PROTOCOL=IPP
METHOD=GET_CERTIFICATE
SID=<echo>
STATUS=0
STAGE=5
FINGERPRINT=<binary>
CERT=<binary>`,
  },

  "ipp-init": {
    title: "INIT",
    subtitle: "Status / print / system",
    description:
      "Called by the POS to send its parameters and determine whether a working service is connected.",
    facts: [
      "POS boot/init handshake",
      "Sends serial/printer/connectivity info",
      "Returns stage 1 status",
    ],
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Must be IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version."],
      ["METHOD", "string", "Mandatory", "Must be INIT."],
      ["SID", "string", "Mandatory", "Session ID."],
      ["SN", "string", "Mandatory", "Serial number of the POS terminal."],
      ["PRINTER", "number", "Mandatory", "0 or 1 depending on printer availability."],
      ["OWN_CONNECTION", "number", "Mandatory", "0 or 1 depending on whether the terminal uses its own connectivity."],
      ["PRIMARY_CHAIN", "binary", "Conditional", "Up to 4 fingerprints, 20 bytes each, separated by ';'."],
      ["SECONDARY_CHAIN", "binary", "Conditional", "Up to 4 fingerprints, 20 bytes each, separated by ';'."],
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=INIT
SID=ad8d6783-15e5494c9c7ce8824f363
SN=51000001
PRINTER=0
OWN_CONNECTION=0`,
    response: `PROTOCOL=IPP
VERSION=202
METHOD=INIT
SID=<echo>
STATUS=0
STAGE=1`,
  },

  "ipp-ping": {
    title: "PING",
    subtitle: "Status / print / system",
    description:
      "Checks connection with payment server and can transmit additional connectivity data to the terminal.",
    facts: [
      "Connectivity check",
      "May return IP / PORT / CHAIN",
      "Useful in Slave mode",
    ],
    fields: [
      ["PROTOCOL", "string", "Mandatory", "Must be IPP."],
      ["VERSION", "number", "Mandatory", "Protocol version."],
      ["METHOD", "string", "Mandatory", "Must be PING."],
      ["SID", "string", "Mandatory", "Session ID."],
      ["LANG", "string", "Optional", "Alpha-2 ISO language code."],
    ],
    body: [
      "In Slave mode, the response may include `IP`, `PORT` and `CHAIN`. The documentation notes the host example `term1-test.icards.eu` and port `34514`. ",
    ],
    request: `PROTOCOL=IPP
VERSION=202
METHOD=PING
SID=ad8d6783-15e5494c9c7ce8824f363
LANG=EN`,
    response: `PROTOCOL=IPP
METHOD=PING
SID=<echo>
STATUS=0
STAGE=1
TIMEOUT=30
IP=term1-test.icards.eu
PORT=34514
CHAIN=<fingerprints>`,
  },

  "ipp-reboot": {
    title: "REBOOT",
    subtitle: "Status / print / system",
    description:
      "Reboots the device.",
    facts: [
      "System reboot",
      "Terminal-level operation",
      "No payment processing",
    ],
    request: `METHOD=REBOOT`,
    response: `Terminal restarts after successful processing.`,
  },

  "ipp-open-settings": {
    title: "OPEN_SETTINGS",
    subtitle: "Status / print / system",
    description:
      "Opens the settings menu on the POS terminal.",
    facts: [
      "Settings UI method",
      "Terminal-local operation",
      "Non-financial",
    ],
    request: `METHOD=OPEN_SETTINGS`,
    response: `The terminal opens its settings menu.`,
  },
};