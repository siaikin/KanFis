// const extractType = /\s|>/g;

import {REGEXP, EL_TYPE, TOKEN_RULE} from "./htmlParserConfig";
import {TablePlugin} from "./plugins/table";
import {Lexer} from "./lexer";
import {Parser} from "./parser";
import {VDOMTree} from "./vdomt";
import {Markdown} from "./markdown";

function HTMLParser() {
    this.HTML = '';
}

Object.defineProperties(HTMLParser.prototype, {
    buildDOMTree: {
        value: buildDOMTree
    },
    toMarkdown: {
        value: toMarkdown
    },
    convertDOMTree: {
        value: convertDOMTree
    },
    plugin: {
        value: function (fun) {
            fun.call(this, EL_TYPE, TOKEN_RULE);
            return this;
        }
    }
});

function toMarkdown(htmlStr) {
    this.HTML = trim(htmlStr);
    const lexer = new Lexer(), parser = new Parser(), vdomtree = new VDOMTree(), md = new Markdown();
    let token = lexer.analysis(this.HTML);
    token = parser.analysis(token);
    let result = vdomtree.build(token);
    console.log(result);
    result = md.translate(result);
    console.log(result);
    // this.DOMTree = this.buildDOMTree(this.HTML);
    // console.log(this.HTML);
    // // console.log(this.DOMTree);
    // this.convertDOMTree(this.DOMTree);
}

function buildDOMTree(str) {
    console.time('buildNodeTree');
    const stack = [], root = {token: '', type: EL_TYPE['rootNode'], isHTML: false, isCode: false};
    let curNode = root, tempNode = curNode, start = 0, end = 0, tag, len = str.length - 1;
    let tempStr, typeNum;
    while (end < len) {
        start = str.indexOf('<', end);
        // 解析文本节点
        if (start - end > 1) {
            tempStr = trim(str, end + 1, start - 1);
            // console.log(end + 1, start);
            if (tempStr.length > 0) {
                if (!curNode.children) { curNode.children = []; }
                curNode.children.push({
                    token: curNode.type === EL_TYPE['code'] ? str.slice(end + 1, start) : tempStr,
                    type: EL_TYPE['textNode'],
                    isHTML: curNode.isHTML,
                    isCode: curNode.isCode,
                })
            }
        }
        end = str.indexOf('>', start);

        // 解析结束标签
        if (str[start + 1] === '/') {
            tempNode = stack.pop();
            curNode = stack[stack.length - 1] || root;
            tag = str.slice(start + 2, end);

            // console.log(tempNode.type, tag, stack.length, start, end, len);
            if (tempNode.type === (EL_TYPE[tag] || EL_TYPE['htmlNode'])) {
                if (!curNode.children) { curNode.children = []; }
                curNode.children.push(tempNode);
            } else {
                console.error(`index: [start] ${start}, [end]: ${end}`, str.slice(start, end + 1));
                return;
            }
        } else {
            // 解析开始标签
            tag = str.slice(start + 1, indexOfTypeSeparator(str, start));
            typeNum = EL_TYPE[tag] || EL_TYPE['htmlNode'];
            // console.log(tag, start, end);
            tempNode = {
                parentNode: curNode,
                token: `<${tag}>`,
                type: typeNum,
                isHTML: curNode.isHTML || typeNum === EL_TYPE['htmlNode'],
                isCode: curNode.isCode || typeNum === EL_TYPE['code'],
                attribute: filterAttribute(str.slice(start, end + 1), TOKEN_RULE[typeNum].filterRule)
            };

            if (tempNode.type & 1) {
                if (!curNode.children) { curNode.children = []; }
                curNode.children.push(tempNode);
            } else {
                stack.push(tempNode);
                curNode = tempNode;
            }
        }
    }
    console.timeEnd('buildNodeTree');
    return root;
}

/**
 * 过滤掉HTML标签上不必要的属性
 * @param str
 * @param exclude - 需要保留的属性，默认全部去除
 * @return {null} - 返回保留的属性键值对，如果有的话
 */
function filterAttribute(str, exclude) {
    if (!exclude || exclude.length <= 0) return null;

    const avps = str.match(REGEXP.attribute);
    let avp, result = {};
    for (let i = avps.length; i--;) {
        avp = avps[i].split('=');
        if (exclude.includes(avp[0])) {
            result[avp[0]] = avp[1].slice(1, avp[1].length - 1);
        }
    }

    console.log(result);
    return result;
}

/**
 * 搜索标签类型的分隔符（空白符或`>`）
 * @param str
 * @param start - 开始搜索的下标起点
 * @returns {*}
 */
function indexOfTypeSeparator(str, start) {
    let target = str[start];
    while (target !== ' ' && target !== '>') {
        target = str[++start];
    }

    return start;
}

/**
 * 去除字符串头尾空白符（正则中的不可见字符）
 * @param str - 指定字符串
 * @param start - 开始位置默认字符串开头
 * @param end - 结束位置默认字符串结尾
 * @returns {string} - 返回新的字符串不会影响原始string
 */
function trim(str, start = 0, end = str.length - 1) {
    const ws = REGEXP.whitespace;
    while (ws.test(str[start]) && start <= end) start++;
    while (ws.test(str[end]) && end >= start) end--;

    return start > end ? '' : str.slice(start, end + 1);
}

function convertDOMTree(domTree) {
    const stack = [];
    let curNode = domTree, result = '';
    while (curNode !== domTree || domTree.children.length > 0) {
        // 有子节点 一定属于双标签元素
        if (curNode.children) {
            if (curNode.children.length > 0) {
                if (curNode !== stack[stack.length - 1]) {
                    stack.push(curNode);
                    result += convertToken(curNode, 'start');
                }
                curNode = curNode.children.shift();
            } else {
                stack.pop();
                result += convertToken(curNode, 'end');
                curNode = stack[stack.length - 1];
            }
            // 无子节点 可能是双标签元素，单标签元素或文本节点
        } else {
            result += convertToken(curNode, 'startend');
            curNode = stack[stack.length - 1];
        }
    }

    console.log(result);
}

function convertToken(node, position) {
    if (position === 'start') {
        return TOKEN_RULE[node.type].convertRule(node);
    } else if (position === 'end') {
        return TOKEN_RULE[node.type].endRule(node);
    } else if (position === 'startend') {
        return TOKEN_RULE[node.type].convertRule(node) + TOKEN_RULE[node.type].endRule(node);
    }
}

// 加载插件
const htmlParser = new HTMLParser();
// htmlParser.plugin(TablePlugin);

export {
    htmlParser
}
