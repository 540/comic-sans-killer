chrome.identity.getAuthToken(
    {'interactive': true},
    function () {
        window.gapi_onload = authorize;
        loadScript('https://apis.google.com/js/client.js');
    }
);

function loadScript(url) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status !== 200) {
            return;
        }

        eval(request.responseText);
    };

    request.open('GET', url);
    request.send();
}

function authorize() {
    gapi.auth.authorize(
        {
            client_id: '317380019427-6mjdlom0r2i5ldd9qit9btgob6i50r9c.apps.googleusercontent.com',
            immediate: true,
            scope: ['https://www.googleapis.com/auth/gmail.modify',
                'https://www.googleapis.com/auth/gmail.readonly',
                'https://www.googleapis.com/auth/gmail.compose',
                'https://www.googleapis.com/auth/gmail.send'
            ]
        },
        function (data) {
            gapi.auth.setToken({access_token: data.access_token});
            gapi.client.load('gmail', 'v1', gmailAPILoaded);
        }
    );
}

function gmailAPILoaded() {
    sendMessage('me', createEmail());
}


function createEmail() {
    return "Content-Type:  text/plain; charset=\"UTF-8\"\n" +
        "Content-length: 5000\n" +
        "Content-Transfer-Encoding: message/rfc2822\n" +
        "to: pablo@540deg.com\n" +
        "from: \"Gorka Moreno\" <gorka@540deg.com>\n" +
        "subject: Comic Sans Killer\n\n"+
        "Your message has been Killed";
}

function sendMessage(userId, email, callback) {
    var base64EncodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
    var request = gapi.client.gmail.users.messages.send({
        'userId': userId,
        'resource': {
            'raw': base64EncodedEmail
        }
    });
    request.execute(callback);
}

function getThreads(query, labels) {
    return gapi.client.gmail.users.threads.list({
        userId: 'me',
        q: query, //optional query
        labelIds: labels //optional labels
    }); //returns a promise
}

//takes in an array of threads from the getThreads response
function getThreadDetails(threads) {
    var batch = new gapi.client.newBatch();

    for (var ii = 0; ii < threads.length; ii++) {
        batch.add(gapi.client.gmail.users.threads.get({
            userId: 'me',
            id: threads[ii].id
        }));
    }

    return batch;
}

function getThreadHTML(threadDetails) {
    var body = threadDetails.result.messages[0].payload.parts[1].body.data;
    return B64.decode(body);
}
function archiveThread(id) {
    var request = gapi.client.request(
        {
            path: '/gmail/v1/users/me/threads/' + id + '/modify',
            method: 'POST',
            body: {
                removeLabelIds: ['INBOX']
            }
        }
    );

    request.execute();
}

