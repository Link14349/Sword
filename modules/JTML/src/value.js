
const jQuery = require("./../dependencies/jquery-3.3.1.min.js");
const $ = jQuery;

!function (JTML) {
    JTML.compiler.$compiler(function set(tag) {
        let tags = tag.children();
        let tokenName = "", value = null;
        let gotName = false, gotValue = false;
        let i;
        function set() {
            let tokens = tokenName.split(".");
            let tmp = global;
            for (let i = 0; i < tokens.length - 1; i++) {
                tmp = tmp[tokens[i]];
            }
            tmp[tokens[tokens.length - 1]] = value;
            gotValue = false;
            gotName = false;
        }
        for (i = 0; i < tags.length; i++) {
            if (tags[i].localName == "token") {
                tokenName = $(tags[i]).text();
                gotName = true;
                if (gotValue) {
                    set();
                }
            }
            if (tags[i].localName == "value") {
                let t = $(tags[i]).text();
                value = eval(t);
                gotValue = true;
                if (gotName) {
                    set();
                }
            }
        }
        return value;
    }, "set", true, false);
    JTML.compiler.$compiler(function show(tag) {
        let v;
        try {
            let t = tag.text();
            v = eval(t);
        } catch (e) {
            console.error(new Error("Show expression error"));
            console.error(e);
            return null;
        }
        tag.text(v);
        return v;
    }, "show", false, false);
    JTML.compiler.$compiler(function value(tag) {
        eval(tag.text());
        // console.log(tag.text());
    }, "value");
    JTML.compiler.$compiler(function ajax(tag) {
        let data = eval(`(function () { return (${tag.text()}); })()`);
        tag.text("Loading...");
        $.ajax({
            data,
            type: tag.attr("type") || "get",
            url: tag.attr("url"),
            success: (content) => {
                tag.text(content);
            },
            error: () => {
                tag.html("<strong style='color: #f00;'>Http-Request Error.</strong>");
            }
        });
    }, "ajax", false);
}(sword.JTML);