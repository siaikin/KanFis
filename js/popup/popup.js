// const bg = chrome.extension.getBackgroundPage();
//
// console.log(bg.getTabId());
// chrome.runtime.sendMessage('Hello', function (response) {
//     console.log(response);
// });
import {Message, MessageType} from "../module/message.js";
import {chromeAPI} from "../module/chromeAPI";
import '../../css/popup.css';

let optionsFormData;

const options = document.querySelector('#options');

const button = options.querySelector('#selectArea');

options.addEventListener('change', function () {
    optionsFormData = new FormData(options);
    console.log('change');
}, true);

button.addEventListener('click', selectArea);

function selectArea() {
    console.log('selectArea');
    const message = new Message(MessageType.INIT);
    chromeAPI.sendMessageToCurrent(message, function(response) {
        console.group('popup received response', response);
        switch (response.type || MessageType.ERROR) {
            case MessageType.ERROR:
                console.log('error', response);
                break;
            case MessageType.RECEIVED:
                console.log('content script received message success');
                break;
        }
        console.groupEnd();
    });
}
