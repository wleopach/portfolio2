/**
 * Portfolio chat logger — Google Apps Script web app.
 *
 * Setup:
 *  1. Create a Google Sheet, then Extensions → Apps Script, and paste this file.
 *  2. Project Settings → Script properties: add LOG_SECRET (same value as the Worker secret).
 *  3. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
 *  4. Copy the web app URL into the Worker secret APPS_SCRIPT_URL.
 *
 * The Worker POSTs { secret, sessionId, messages, page, startedAt }.
 */

var NOTIFY_EMAIL = 'wleonardop@gmail.com';
var SHEET_NAME = 'Conversations';

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return respond({ ok: false, error: 'invalid json' });
  }

  var expected = PropertiesService.getScriptProperties().getProperty('LOG_SECRET');
  if (!expected || data.secret !== expected) {
    return respond({ ok: false, error: 'unauthorized' });
  }

  var messages = Array.isArray(data.messages) ? data.messages : [];
  var sessionId = String(data.sessionId || 'unknown');
  var shortId = sessionId.slice(0, 8);

  getSheet().appendRow([
    new Date(),
    sessionId,
    data.page || '',
    data.startedAt || '',
    messages.length,
    JSON.stringify(messages),
  ]);

  var firstUser = messages.filter(function (m) { return m.role === 'user'; })[0];
  var snippet = firstUser ? firstUser.content.slice(0, 60) : '(no visitor message)';

  var transcript = messages
    .map(function (m) {
      return (m.role === 'user' ? 'Visitor: ' : 'Assistant: ') + m.content;
    })
    .join('\n\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'Portfolio chat — ' + snippet + ' [' + shortId + ']',
    body:
      'Session: ' + sessionId + '\n' +
      'Page: ' + (data.page || '') + '\n' +
      'Started: ' + (data.startedAt || '') + '\n' +
      'Messages: ' + messages.length + '\n\n' +
      transcript,
  });

  return respond({ ok: true });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Logged at', 'Session ID', 'Page', 'Started at', 'Message count', 'Transcript (JSON)']);
  }
  return sheet;
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
