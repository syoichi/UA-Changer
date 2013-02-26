/*jslint browser: true, maxlen: 80*/
/*global chrome*/
// Edition 2013-02-18

(function executeBackgroundScript(cr) {
    'use strict';

    var USER_AGENT = 'Mozilla/5.0 ' +
        '(compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)';

    cr.webRequest.onBeforeSendHeaders.addListener(function callback(details) {
        var headers, idx, len, header;

        headers = details.requestHeaders;

        for (idx = 0, len = headers.length; idx < len; idx += 1) {
            header = headers[idx];

            if (header.name === 'User-Agent') {
                header.value = USER_AGENT;
                break;
            }
        }

        return {requestHeaders: headers};
    }, {
        urls: cr.app.getDetails().permissions.slice(2)
    }, ['blocking', 'requestHeaders']);
}(chrome));
