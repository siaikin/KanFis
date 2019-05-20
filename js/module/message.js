/**
 * Message构造函数
 * @param type - Message类型
 * @param content - Message内容
 * @constructor
 */
function Message(type, content = 'default content') {
    this.type       = type;
    this.content    = content;
}

/**
 * 定义message类型，用于background/popup/content之间的信息通信
 * @type {{init: number}}
 */
const MessageType = {
    ERROR: 0,
    INIT: 1,
    RECEIVED: 2,
    DESTROY: 3,
    SELECTED_AREA: 4
};

export {
    Message,
    MessageType
}
