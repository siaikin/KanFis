import {Message, MessageType} from "../module/message.js";
import {chromeAPI} from "../module/chromeAPI";

const floatBoxModel = document.createElement('ASIDE'), floatBoxButtonModel = document.createElement('BUTTON');
floatBoxModel.style.cssText = 'position: absolute; top: 0;right: 0; transform: translateX(-120%);font-size: 12px;line-height: 0;z-index: 99999;background-color: lightgray;width: 122px;height: 32px;box-sizing: border-box;padding: 5px;';
floatBoxButtonModel.style.cssText = 'margin: 0px 2px;padding: 2px 8px;border: 0;height: 100%;';

// const storage = chrome.storage.local;
const control = listenerControl();

chromeAPI.onMessage(function (message, sender, sendResponse) {
    console.group('content received message');
    switch (message.type || MessageType.ERROR) {
        case MessageType.ERROR:
            console.log('error', message);
            sendResponse(new Message(MessageType.ERROR, 'error'));
            break;
        case MessageType.INIT:
            console.log('initialize...');
            control.initialize();
            sendResponse(new Message(MessageType.RECEIVED, 'received'));
            break;
        case MessageType.DESTROY:
            console.log('destroy...');
            control.removeListener();
            sendResponse(new Message(MessageType.RECEIVED, 'received'));
            break;
        case MessageType.RECEIVED:
            console.log('received');
            break;
        default:
            console.log(new Message(MessageType.ERROR, 'Unknown MessageType'));
    }
    console.groupEnd();
});

function listenerControl() {
    const body = document.body;
    let target, style, originalStyle = {
        border: null,
        boxSizing: null,
        position: null,
        overflow: null
    }, floatBox = null;

    return {
        showOutline: function (event) {
            target      = event.target;
            style       = target.style;
            // 保存之前的样式信息
            originalStyle.border            = style.border;
            originalStyle.position          = style.position;
            originalStyle.overflow          = style.overflow;

            // 添加outline（轮廓）
            style.outline           = '2px dashed darkgray';
            style.position          = 'relative';
            style.overflow          = 'visible';
            event.target.appendChild(floatBox);
            console.log('show');
        },
        hideOutline: function (event) {
            style       = event.target.style;

            // 恢复样式
            style.outline           = originalStyle.border;
            style.position          = originalStyle.position;
            style.overflow          = originalStyle.overflow;
            event.target.removeChild(floatBox);
            console.log('hide');
        },
        // 初始化页面
        initialize: function () {
            // 创建浮动工具栏
            floatBox = floatBoxModel.cloneNode(true);
            floatBox.addEventListener('click', (event) => event.stopPropagation());

            let button = floatBoxButtonModel.cloneNode(true);
            button.textContent = '确认';
            button.addEventListener('click', (event) => {
                console.log('确认按钮');
                this.sendSelectedArea();
                this.hideOutline({target: target});
            });
            floatBox.appendChild(button);

            button = floatBoxButtonModel.cloneNode(true);
            button.textContent = '重新选择';
            button.addEventListener('click', (event) => {
                console.log('重新选择按钮');
                this.hideOutline({target: target});
                this.bindListener();
            });
            floatBox.appendChild(button);

            this.removeListener = this.removeListener.bind(this);
            this.bindListener();
        },
        bindListener: function () {
            body.addEventListener('mouseover', this.showOutline);
            body.addEventListener('mouseout', this.hideOutline);
            body.addEventListener('click', this.removeListener);
        },
        //  移除脚本添加的事件
        removeListener: function (event) {
            console.log('removeListener');
            body.removeEventListener('mouseover', this.showOutline);
            body.removeEventListener('mouseout', this.hideOutline);
            body.removeEventListener('click', this.removeListener);
        },
        sendSelectedArea: function () {
            chromeAPI.sendMessage(new Message(MessageType.SELECTED_AREA, target.innerHTML), (response) => console.log(response));
        }
    }

}
