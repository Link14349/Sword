"use strict";

var jQuery = require("./../dependencies/jquery-3.3.1.min.js");
var $ = jQuery;

!function (JTML) {
    JTML.compiler.$compiler(function set(tag) {
        var tags = tag.children();
        var tokenName = "",
            value = null;
        var gotName = false,
            gotValue = false;
        var i = void 0;
        function set() {
            var tokens = tokenName.split(".");
            var tmp = global;
            for (var _i = 0; _i < tokens.length - 1; _i++) {
                tmp = tmp[tokens[_i]];
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
                var t = $(tags[i]).text();
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
        var v = void 0;
        try {
            var t = tag.text();
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
        var data = eval("(function () { return (" + tag.text() + "); })()");
        tag.text("Loading...");
        $.ajax({
            data: data,
            type: tag.attr("type") || "get",
            url: tag.attr("url"),
            success: function success(content) {
                tag.text(content);
            },
            error: function error() {
                tag.html("<strong style='color: #f00;'>Http-Request Error.</strong>");
            }
        });
    }, "ajax", false);
}(sword.JTML);
//# sourceMappingURL=value.js.map