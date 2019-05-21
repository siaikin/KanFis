import {EL_TYPE, TOKEN_RULE} from "./htmlParserConfig";

function VDOMTree() {

}

Object.defineProperties(VDOMTree.prototype, {
    build: {
        value: build
    }
});

/**
 * 生成虚拟DOM树
 */
function build(tokenArr) {
    const rootNode = {tag: 'root', type: EL_TYPE['rootNode']}, stack = [rootNode];
    let parNode = rootNode, curNode, filterChild = [EL_TYPE['all_element']];
    console.time('virtual dom tree build');
    while ((curNode = tokenArr.pop())) {
        // 构建DOM树
        if (curNode.position === 1) {               // 开标签
            if (!filterChildren(curNode.type, filterChild)) {
                skipNextTag(tokenArr, curNode);
                continue;
            }
            stack.push(curNode);
            parNode = curNode;
            filterChild = TOKEN_RULE[parNode.type].filterRule.children;

        } else if (curNode.position === 2) {        // 闭标签
            curNode = stack.pop();
            parNode = stack[stack.length - 1];
            filterChild = TOKEN_RULE[parNode.type].filterRule.children;
            if (!parNode.children) parNode.children = [];

            curNode['parentNode'] = parNode;
            parNode.children.push(curNode);

        } else if (curNode.position === 3) {        // 空标签或文本节点

            if (!parNode.children) parNode.children = [];
            curNode['parentNode'] = parNode;
            parNode.children.push(curNode);
        }
    }
    console.timeEnd('virtual dom tree build');
    return rootNode;
}

function filterChildren(type, rule) {
    if (rule.includes(0) || rule.includes(type)) return true;

    return false;
}

function skipNextTag(tokenArr, curNode) {
    let node, sameCount = 0;
    for (let i = tokenArr.length - 1; i--;) {
        node = tokenArr[i];
        if (node.type === curNode.type) {
            if (node.position === 1) sameCount++;
            else if (sameCount === 0) {
                tokenArr.splice(i);
                break;
            }
        }
    }
}
export {
    VDOMTree
}
