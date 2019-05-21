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

htmlParser.toMarkdown(`
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
`);
