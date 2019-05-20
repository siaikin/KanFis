const tabs = chrome.tabs, runtime = chrome.runtime, storage = chrome.storage.local;

function sendMessage(message, callback) {
    runtime.sendMessage(message, callback);
}
function sendMessageToCurrent(message, callback) {
    if (this.currentTabId) {
        tabs.sendMessage(this.currentTabId, message, callback)

    } else {
        this.currentTab().then((result => {
            tabs.sendMessage(result, message, callback)
        }));
    }
}

function currentTab() {
    return new Promise((resolve, reject) => {
        tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            if (tabs.length > 0) {
                this.currentTabId = tabs[0].id;
                resolve(this.currentTabId);
            } else {
                reject(tabs);
            }
        })
    })
}

function onMessage(listener) {
    runtime.onMessage.addListener(listener);
}

// const storageObj = {
//     get: function (keys, callback) {
//         storage.get(keys, callback);
//     }
// }

function ChromeAPI() {
    this.currentTabId = null;
}

Object.defineProperties(ChromeAPI.prototype, {
    sendMessageToCurrent: {
       value: sendMessageToCurrent
    },
    sendMessage: {
        value: sendMessage
    },
    onMessage: {
        value: onMessage
    },
    currentTab: {
        value: currentTab
    }
});

const api = new ChromeAPI();

export {
    api as chromeAPI
}
