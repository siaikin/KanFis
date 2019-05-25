import {chromeAPI} from "../module/chromeAPI";
import {Message, MessageType} from "../module/message";
import {htmlParser} from "../module/htmlParser";

chromeAPI.onMessage(function (message, sender, sendResponse) {
    console.group('background receive message', message);
    switch (message.type || MessageType.ERROR) {
        case MessageType.ERROR:
            console.log('error', message);
            sendResponse(new Message(MessageType.ERROR, 'error'));
            break;
        case MessageType.SELECTED_AREA:
            console.log('selected area');
            htmlParser.toMarkdown(message.content);
            sendResponse(new Message(MessageType.RECEIVED, 'receive selected area'));
            break;
        default:
            console.log(new Message(MessageType.ERROR, 'Unknown MessageType'));
    }
    console.groupEnd();
});

const demo1 = `
<h1>Test H1</h1>
<h2>Test H2</h2>
<h3>Test H3</h3>
<h4>Test H4</h4>
<h5>Test H5</h5>
<h6>Test H6</h6>
<p>Test P start</p>
<p>



</p>
<p><a href="http://www.baidu.com" title="打开百度">baidu</a></p>
<blockquote>
    <p>
        *asdasd
        ### ASD
        <br>
        <code>asd</code>
    </p>
</blockquote>
<pre>
    <code>
    let i = 1;
    let a = 2;
    </code>
    <ol>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ol>
</pre>
`;
const demo2 = `<article class="baidu_pl" style="">
    <div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f57960eb32.css">
                              <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f57960eb32.css">
          <div class="htmledit_views" id="content_views">
            <p style="">&amp;&amp;：</p><p>&nbsp;&nbsp;&nbsp;&nbsp;我们又称之为与，也可以叫逻辑与；</p><p>&nbsp; &nbsp; 我的理解是他有两层应用，第一层可以当判断，第二层可以当取值。<br></p><p>&nbsp; &nbsp; 在判断的时候，他会去比较 &amp;&amp; 前后的值,一般用在if语句里面。</p><pre><code class="language-javascript hljs"><ol class="hljs-ln"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">if</span>(<span class="hljs-number">0</span> &amp;&amp; <span class="hljs-number">1</span>){</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'此代码不会执行'</span>)</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">}</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">if</span>(<span class="hljs-number">1</span> &amp;&amp; <span class="hljs-number">-1</span>){</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'此代码会执行'</span>)</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">}</div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制" onclick="hljs.signin(event)"></div></pre><p>&nbsp; &nbsp; 这个比较简单，可以总结为：</p><p>&nbsp; &nbsp; <strong>如果两个值都为真，就返回true；</strong></p><p><strong>&nbsp;&nbsp;&nbsp;&nbsp;如果有一个值为假，就返回false</strong>；</p><p>&nbsp;&nbsp;&nbsp;&nbsp;在作取值的时候，与运算符会先把符号两边的值转化为布尔值，</p><pre><code class="language-javascript hljs"><ol class="hljs-ln"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-number">0</span>; <span class="hljs-comment">// 0</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-number">1</span>; <span class="hljs-comment">// 0</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-number">1</span>; <span class="hljs-comment">// 1</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-number">0</span>; <span class="hljs-comment">// 0</span></div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制" onclick="hljs.signin(event)"></div></pre><p>&nbsp; &nbsp; 总结如下：</p><p><strong>&nbsp;&nbsp;&nbsp;&nbsp;如果第一个值为真，直接返回第二个的值；</strong></p><p><strong>&nbsp;&nbsp;&nbsp;&nbsp;如果第一个值为假，那么直接返回第一个的值</strong>；</p><p>&nbsp;&nbsp;&nbsp;<strong>&nbsp;假值有（false, null, ' ', 0, undefined, NaN, -0），除了这些，其他值都返回true</strong></p><p><strong>&nbsp; &nbsp; 这个通常被用作短路逻辑，可以替代if写成很简短的形式，例如</strong></p><pre><code class="language-javascript hljs"><ol class="hljs-ln"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">if</span>(a == b) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这段代码'</span>);</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">(a == b) &amp;&amp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'这段代码'</span>);</div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制" onclick="hljs.signin(event)"></div></pre><p>||:</p><p>&nbsp;&nbsp;&nbsp;&nbsp;我们又称之为或，也可以叫逻辑或。</p><pre><code class="language-javascript hljs"><ol class="hljs-ln"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">if</span>(<span class="hljs-number">0</span> || <span class="hljs-number">1</span>){</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'此代码会执行'</span>)</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">}</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">if</span>(<span class="hljs-number">0</span> || <span class="hljs-literal">undefined</span>){</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'此代码不会执行'</span>)</div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">}</div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制" onclick="hljs.signin(event)"></div></pre><p>&nbsp;&nbsp;&nbsp;&nbsp;<strong>如果第一个值为真，就返回真；<br></strong></p><p><strong>&nbsp; &nbsp; 如果有第一个假，再往下找，直到找到真的就返回真，找不到，就返回假；</strong></p><pre><code class="language-javascript hljs"><ol class="hljs-ln"><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span> || <span class="hljs-number">1</span> <span class="hljs-comment">// 1</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span> || <span class="hljs-number">0</span> <span class="hljs-comment">// 1</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span> || <span class="hljs-literal">false</span> <span class="hljs-comment">// false</span></div></div></li><li><div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span> || <span class="hljs-number">2</span> <span class="hljs-comment">// 1</span></div></div></li></ol></code><div class="hljs-button signin" data-title="登录后复制" onclick="hljs.signin(event)"></div></pre><p>&nbsp; &nbsp; <strong>如果第一个值为真，直接返回第一个值；</strong></p><p><strong>&nbsp; &nbsp; 如果一个为假，继续向下找，直到找到真的然后返回值；找不到就，返回最后一个值。</strong><br></p><br>          </div>
                  </div>
  </article>`;

const demo3 = `<pre class="prettyprint" name="code">
<code class="hljs coffeescript has-numbering" onclick="mdcp.signin(event)">
<span class="hljs-reserved">function</span>
 htmlEscape (text) {
    <span class="hljs-keyword">return</span>
     text.replace(
     <span class="hljs-regexp">/[&lt;&gt;"&amp;]/g</span>
     , 
     <span class="hljs-reserved">function</span>
      (match, pos, originalText) {
        <span class="hljs-keyword">switch</span>
         (match) {
            <span class="hljs-reserved">case</span> <span class="hljs-string">"&lt;"</span>:
                <span class="hljs-keyword">return</span> <span class="hljs-string">"&amp;lt;"</span>;
            <span class="hljs-reserved">case</span> <span class="hljs-string">"&gt;"</span>:
                <span class="hljs-keyword">return</span> <span class="hljs-string">"&amp;gt;"</span>;
            <span class="hljs-reserved">case</span> <span class="hljs-string">"&amp;"</span>:
                <span class="hljs-keyword">return</span> <span class="hljs-string">"&amp;amp;"</span>;
            <span class="hljs-reserved">case</span> <span class="hljs-string">"\\":
                return "</span>&amp;quot;<span class="hljs-string">";
        }
    });
}</span><div class="hljs-button signin" data-title="登录后复制"></div></code><ul class="pre-numbering" style=""><li style="color: rgb(153, 153, 153);">1</li><li style="color: rgb(153, 153, 153);">2</li><li style="color: rgb(153, 153, 153);">3</li><li style="color: rgb(153, 153, 153);">4</li><li style="color: rgb(153, 153, 153);">5</li><li style="color: rgb(153, 153, 153);">6</li><li style="color: rgb(153, 153, 153);">7</li><li style="color: rgb(153, 153, 153);">8</li><li style="color: rgb(153, 153, 153);">9</li><li style="color: rgb(153, 153, 153);">10</li><li style="color: rgb(153, 153, 153);">11</li><li style="color: rgb(153, 153, 153);">12</li><li style="color: rgb(153, 153, 153);">13</li><li style="color: rgb(153, 153, 153);">14</li></ul></pre>`;
// htmlParser.toMarkdown(demo3);
