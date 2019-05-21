import {EL_TYPE, REGEXP, TOKEN_RULE} from "./htmlParserConfig";

function Lexer() {

}

Object.defineProperties(Lexer.prototype, {
    analysis: {
        value: analysis
    }
});

function analysis(str) {
    str = trim(str);
    console.time('lexical analysis');
    const result = [];
    let start = 0, end = 0, len = str.length - 1;
    while (end < len) {
        start = str.indexOf('<', end);
        // 解析文本节点
        if (start - end > 1) {
            // console.log(end + 1, start);
            if (!isEmpty(str, end + 1, start - 1)) {
                result.push(str.slice(end + 1, start));
            }
        }
        end = str.indexOf('>', start);

        result.push(str.slice(start, end + 1));
    }

    console.timeEnd('lexical analysis');
    return result;
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

/**
 * 判断是否为空白串
 * @param str
 * @param start
 * @param end
 * @returns {boolean}
 */
function isEmpty(str, start = 0, end = str.length - 1) {
    const ws = REGEXP.whitespace;
    for (;start <= end;start++) {
        if (!ws.test(str[start])) return false;
    }

    return true;
}

export {
    Lexer
}
