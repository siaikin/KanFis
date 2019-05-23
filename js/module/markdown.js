import {TOKEN_RULE} from "./htmlParserConfig";

function Markdown() {

}

Object.defineProperties(Markdown.prototype, {
    translate: {
        value: translate
    }
});

function translate(vdomt) {
    const stack = [], textStack = [];
    let curNode = vdomt, children, result = '';
    console.time('markdown text');
    while (curNode !== vdomt || curNode.children.length > 0) {
        if (curNode.position === 1) {                                   // 非空元素
            children = curNode.children;

            if (curNode !== stack[stack.length - 1]) {                  // curNode在栈顶不存在说明，curNode是第一次被执行
                stack.push(curNode);                                    // 第一次执行将其加入栈中

                result += convertToken(curNode, 'head');
            }
            if (children && children.length > 0) {                      // 非空且有子节点的元素，将子节点取出一个进行下一次循环
                curNode = children.shift();                             // 设置下一次循环的节点
            } else {                                                    // 非空无子节点的元素，弹出栈
                stack.pop();
                result += convertToken(curNode, 'tail');

                curNode = stack[stack.length - 1];                      // 设置下一次循环的节点
            }
        } else if (curNode.position === 3) {                            // 空元素或文本节点
            result += convertToken(curNode, 'headtail');

            curNode = stack[stack.length - 1];                          // 设置下一次循环的节点
        }
    }
    console.timeEnd('markdown text');

    return result;
}

/**
 *
 * @param node
 * @param pos {'head' | 'tail' | 'headtail'} - 应用开始/结束的转换规则
 */
function convertToken(node, pos) {
    switch (pos) {
        case 'head':
            // console.log(`[${node.tag}]: ${pos}`);
            return TOKEN_RULE[node.type].convertRule(node);
        case 'tail':
            // console.log(`[${node.tag}]: ${pos}`);
            return TOKEN_RULE[node.type].endRule(node);
        case 'headtail':
        default:
            // console.log(`[${node.tag}]: ${pos}`);
            const rule = TOKEN_RULE[node.type];
            return rule.convertRule(node) + rule.endRule(node);
    }
}

export {
    Markdown
}
