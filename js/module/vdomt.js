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
    const rootNode = {tag: 'root', type: EL_TYPE['rootNode'], position: 1}, stack = [rootNode];
    let parNode = rootNode, curNode,
        filterChild = [EL_TYPE['all_element']];

    console.time('virtual dom tree build');
    while ((curNode = tokenArr.pop())) {
        // 构建DOM树
        if (curNode.position === 1) {               // 开标签
            if (!filterChildren(tokenArr, curNode, filterChild)) {                                          // curNode是否是父节点允许的子节点类型
                continue;
            }
            stack.push(curNode);
            parNode = curNode;
            // mergeRule(filterChild, TOKEN_RULE[parNode.type].filterRule.children, 1);
            filterChild = TOKEN_RULE[parNode.type].filterRule.children;

        } else if (curNode.position === 2) {        // 闭标签
            if (curNode.type !== stack[stack.length - 1].type) {
                throw new Error(`opening tag ${stack[stack.length - 1].tag}, closing tag ${curNode.tag}`);
            }
            curNode = stack.pop();
            parNode = stack[stack.length - 1];
            // mergeRule(filterChild, TOKEN_RULE[parNode.type].filterRule.children, -1);
            filterChild = TOKEN_RULE[parNode.type].filterRule.children;
            if (!parNode.children) parNode.children = [];

            curNode['parentNode']   = parNode;
            curNode['index']        = parNode.children.length;

            parNode.children.push(curNode);
        } else if (curNode.position === 3) {        // 空标签或文本节点
            if (!parNode.children) parNode.children = [];

            curNode['parentNode']   = parNode;
            curNode['index']        = parNode.children.length;

            parNode.children.push(curNode);
        }
    }
    console.timeEnd('virtual dom tree build');
    return rootNode;
}

// function mergeRule(ruleObj, filterRule, step) {
//     if (Array.isArray(filterRule)) {
//         filterRule = {
//             include: filterRule
//         };
//     }
//     // 每次合并都把`all_element`初始化为0
//     ruleObj['all_element'] = 0;
//     let keys = Object.keys(filterRule), ruleArr = filterRule.include, key, value, item;
//
//     for (let i = ruleArr.length; i--;) {
//         item = ruleArr[i];
//         if (ruleObj[item] === undefined) ruleObj[item] = 0;
//         ruleObj[item]++;
//     }
//
//     keys.splice(keys.indexOf('rule'), 1);
//     for (let i = keys.length; i--;) {
//         key = keys[i];
//         value = filterRule[key];
//
//         if (ruleObj[key] === undefined) ruleObj[key] = 0;
//
//         if (filterRule[key]) ruleObj[key] += step;
//         else ruleObj[key] -= step;
//     }
// }

/**
 * 判断该节点（node）是否符合过滤条件（filterRule）
 * @param tokens
 * @param node
 * @param filterRule
 * @returns {boolean}
 */
function filterChildren(tokens, node, filterRule) {

    let rule = filterRule, filter;
    if (!Array.isArray(filterRule)) {
        rule = filterRule.include;
        filter = filterRule.filter;
    }

    if (rule.includes(EL_TYPE['all_element']) || rule.includes(node.type)) return true;
    // if (filterRule[node.type] || rule.includes(node.type)) return true;

    filterTag(tokens, node, rule, filter);

    return false;
}

function filterTag(tokenArr, curNode, rule, filter = false) {
    let node, sameCount = 0, start = tokenArr.length, end = start;
    if (filter) {
        for (let i = tokenArr.length; i--;) {
            node = tokenArr[i];
            start = i + 1;
            if (rule.includes(node.type)) {
                tokenArr.splice(start, end - start);
                end = i;
            }
            if (node.type === curNode.type) {
                if (node.position === 1) sameCount++;
                else if (sameCount === 0) {
                    tokenArr.splice(i, end - i);
                    break;
                }
                else sameCount--;
            }
        }
    } else {
        for (let i = tokenArr.length; i--;) {
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
}

export {
    VDOMTree
}
