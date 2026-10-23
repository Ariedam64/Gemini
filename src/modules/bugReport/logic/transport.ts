// src/modules/bugReport/logic/transport.ts
// The core's client over Gemini's cross-origin request: GM_xmlhttpRequest in
// a userscript manager and in the MG AFK app, fetch elsewhere. The body is
// always the JSON string the core builds, which is the only kind of body the
// AFK app's request polyfill passes on intact. Gemini has no API key, so
// reports go out unverified, with the player id the game gives.

import type { BugReportClient, BugReportHttpRequest, BugReportHttpResponse } from "../core";
import { BUG_REPORT_API_URL } from "../types";
import { requestText } from "../../../utils/http";

function send(request: BugReportHttpRequest): Promise<BugReportHttpResponse> {
  return requestText({
    method: request.method,
    url: request.url,
    headers: request.headers,
    body: request.body,
    timeoutMs: request.timeoutMs,
  });
}

export const bugReportClient: BugReportClient = {
  baseUrl: BUG_REPORT_API_URL,
  request: send,
};
