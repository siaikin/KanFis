const REGEXP = {
    whitespace: /\s/,
    attribute: /[a-zA-Z0-9\-]+=[^\s>]+/g
};
const EL_TYPE = {
    'rootNode': -4,
    // 无法识别的标签，默认有闭合标签，数值为2的倍数
    'htmlNode': -2,
    // 文本元素
    'textNode': 0,
    // 双标签（tag）元素
    'a': 2,
    'h': 4,
    'p': 6,
    'em': 62,
    'li': 8,
    'ol': 10,
    'ul': 12,
    'div': 20,
    'pre': 22,
    'code': 24,
    'span': 26,
    'audio': 28,
    'aside': 30,
    'video': 32,
    'strong': 40,
    'script': 42,
    'button': 44,
    'article': 46,
    'blockquote': 48,
    'h1': 50,
    'h2': 52,
    'h3': 54,
    'h4': 56,
    'h5': 58,
    'h6': 60,
    // 单标签（tag）元素
    'br': 1,
    'hr': 3,
    'img': 5,
    'link': 7,
    '!--': 9,
    'input': 11
};
const DEFAULT_RULE = {
    defaultToken: {
        filterRule: [],
        convertRule: function (node) {
            return '';
        },
        endRule: function (node) {
            return '\n';
        }
    },
    doubleToken: {
        filterRule: [],
        convertRule: function (node) {
            return '';
        },
        endRule: function (node) {
            return '';
        }
    },
    signleToken: {
        filterRule: [],
        convertRule: function (node) {
            return '';
        },
        endRule: function (node) {
            return '';
        }
    }
};
const TOKEN_RULE = {
    // // 无法识别的标签，默认有闭合标签，数值为2的倍数
    [EL_TYPE['rootNode']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['htmlNode']]: {
        filterRule: [],
        convertRule: function (node) {
            return node.token;
        },
        endRule: function (node) {
            const token = node.token;
            return `</${token.slice(1, token.length - 1)}>\n`;
        }
    },
    [EL_TYPE['textNode']]: {
        filterRule: [],
        convertRule: function (node) {
            return node.token;
        },
        endRule: function (node) {
            return '';
        }
    },
    [EL_TYPE['a']]: {
        filterRule: ['href', 'title'],
        convertRule: function (node) {
            return '[';
        },
        endRule: function (node) {
            const attr = node.attribute;
            return `](${attr['href']} "${attr['title']}")`;
        }
    },
    [EL_TYPE['h']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['p']]: {
        filterRule: [],
        convertRule: function (node) {
            return `${node.parentNode.type === EL_TYPE['blockquote'] ? '> ' : ''}`;
        },
        endRule: function (node) {
            return `${node.parentNode.type === EL_TYPE['rootNode'] ? '\n\n' : ''}`;
        }
    },
    [EL_TYPE['em']]: {
        filterRule: [],
        convertRule: function (node) {
            return `*`;
        },
        endRule: function (node) {
            return `*`;
        }
    },
    [EL_TYPE['li']]: {
        filterRule: [],
        convertRule: function (node) {
            return `1. `;
        },
        endRule: function (node) {
            return `\n`;
        }
    },
    [EL_TYPE['ol']]: {
        filterRule: [],
        convertRule: function (node) {
            return `${node.parentNode.type === EL_TYPE['li'] ? '\n' : ''}`;
        },
        endRule: function (node) {
            // return `${node.parentNode.type === EL_TYPE['li'] ? '' : '\n'}`;
            return `\n`;
        }
    },
    [EL_TYPE['ul']]: {
        filterRule: [],
        convertRule: function (node) {
            return `${node.parentNode.type === EL_TYPE['li'] ? '\n' : ''}`;
        },
        endRule: function (node) {
            // return `${node.parentNode.type === EL_TYPE['li'] ? '' : '\n'}`;
            return `\n`;
        }
    },
    [EL_TYPE['div']]: DEFAULT_RULE.defaultToken,
    [EL_TYPE['pre']]: DEFAULT_RULE.defaultToken,
    [EL_TYPE['code']]: {
        filterRule: [],
        convertRule: function (node) {
            return `${node.parentNode.type === EL_TYPE['pre'] ? '```\n' : '`'}`;
        },
        endRule: function (node) {
            return `${node.parentNode.type === EL_TYPE['pre'] ? '\n```\n' : '`'}`;
        }
    },
    [EL_TYPE['span']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['audio']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['aside']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['video']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['strong']]: {
        filterRule: [],
        convertRule: function (node) {
            return `**`;
        },
        endRule: function (node) {
            return `**`;
        }
    },
    [EL_TYPE['script']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['button']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['article']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['blockquote']]: {
        filterRule: [],
        convertRule: function (node) {
            return ``;
        },
        endRule: function (node) {
            return `\n\n`;
        }
    },
    [EL_TYPE['h1']]: {
        filterRule: [],
        convertRule: function (node) {
            return `# `;
        },
        endRule: function (node) {
            return `\n`;
        }
    },
    [EL_TYPE['h2']]: {
        filterRule: [],
        convertRule: function (node) {
            return `## `;
        },
        endRule: function (node) {
            return `\n`;
        }
    },
    [EL_TYPE['h3']]: {
        filterRule: [],
        convertRule: function (node) {
            return `### `;
        },
        endRule: function (node) {
            return `\n`;
        }
    },
    [EL_TYPE['h4']]: {
        filterRule: [],
        convertRule: function (node) {
            return `#### `;
        },
        endRule: function (node) {
            return `\n`;
        }
    },
    [EL_TYPE['h5']]: {
        filterRule: [],
        convertRule: function (node) {
            return `##### `;
        },
        endRule: function (node) {
            return `\n`;
        }
    },
    [EL_TYPE['h6']]: {
        filterRule: [],
        convertRule: function (node) {
            return `###### `;
        },
        endRule: function (node) {
            return `\n`;
        }
    },
    [EL_TYPE['br']]: {
        filterRule: [],
        convertRule: function (node) {
            return `  \n`;
        },
        endRule: function (node) {
            return ``;
        }
    },
    [EL_TYPE['hr']]: {
        filterRule: [],
        convertRule: function (node) {
            return `---\n`;
        },
        endRule: function (node) {
            return ``;
        }
    },
    [EL_TYPE['img']]: {
        filterRule: ['src'],
        convertRule: function (node) {
            return '![';
        },
        endRule: function (node) {
            return `](${node.attribute['src']})\n`;
        }
    },
    [EL_TYPE['link']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['!--']]: DEFAULT_RULE.doubleToken,
    [EL_TYPE['input']]: DEFAULT_RULE.signleToken,
};

export {
    REGEXP,
    EL_TYPE,
    TOKEN_RULE
}
