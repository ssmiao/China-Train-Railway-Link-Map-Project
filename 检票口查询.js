
  function timeChangetype(t) {
    return Date.parse(new Date(t))
}

function GetDateStr(t) {
    var e = new Date;
    return e.setDate(e.getDate() + t), e.getFullYear() + "-" + (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + "-" + (e.getDate() < 10 ? "0" + e.getDate() : e.getDate())
}

function setStorage(t, e) {
    t && ("string" != typeof e && (e = JSON.stringify(e)), window.sessionStorage.setItem(t, e))
}

function getStorage(t) {
    if (t) return window.sessionStorage.getItem(t)
}

function removeStore(t) {
    if (t) return window.sessionStorage.removeItem(t)
}

function setLocalStorage(t, e) {
    t && ("string" != typeof e && (e = JSON.stringify(e)), window.localStorage.setItem(t, e))
}

function getLocalStorage(t) {
    if (t) return window.localStorage.getItem(t)
}

function removeLocalStore(t) {
    t && window.localStorage.removeItem(t)
}

function noChoseCity(t, e, i, n) {
    n = n || "请选择出发地", i = i || "347px", e = e || "0", t.parent().parent().find("[data-id=" + t.attr("id") + "]") && t.parent().parent().find("[data-id=" + t.attr("id") + "]").remove(), t.parent().parent().append('<div class="tooltip-error" data-id=' + t.attr("id") + ' style="left:' + i + "; top: " + e + '; display: block;"><i class="icon icon-plaint-fill"></i>' + n + "</div>")
}

function footerFn() {
    $(".content").css("height", "auto");
    var t = $(window).height(),
        e = $(".footer").height(),
        i = $(".content").height(),
        n = t - 109 - e;
    i <= n && $(".content").height(n)
}

function getUrlParms(t) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
        i = window.location.search.substr(1).match(e);
    return null != i ? unescape(i[2]) : null
}

function deepClone(t) {
    var e = JSON.stringify(t);
    return JSON.parse(e)
}

function toshijianchu(t) {
    var e = new Date(t.replace(/-/g, "/"));
    return time = Date.parse(e), time
}

function getScSnameListFn() {
    $.ajax({
        url: getScSnameListpr,
        type: "POST",
        timeout: 1e4,
        dataType: "json",
        data: {
            station_telecode: $("#sale").val()
        },
        success: function(t) {
            var e = t.data;
            if ($(".content").height(""), $(".sale-list").empty(), t.data) {
                $("#ticket-box-tips").show();
                for (var i = 0; i < e.length; i++)
                    if (citys[e[i]]) {
                        var n = '<li><h3 class="sale-tit">' + e[i] + '</h3><div class="sale-time">' + (citys[e[i]] || "暂无") + "</div></li>";
                        $(".sale-list").append(n), $(".result-none").hide()
                    }
            } else if (citys[$("#saleText").val()]) {
                var n = '<li><h3 class="sale-tit">' + $("#saleText").val() + '</h3><div class="sale-time">' + (citys[$("#saleText").val()] || "暂无") + "</div></li>";
                $(".sale-list").append(n), $("#ticket-box-tips").show(), $(".result-none").hide()
            } else $(".sale-list").empty(), $("#ticket-box-tips").hide(), $(".result-none").show();
            footerFn()
        },
        error: function(t) {}
    })
}
define("g/g-header", ["jquery"], function(t) {
        function e() {
            function e(t) {
                t[0].indexOf(t[1]) > -1 && (t[0] = t[0].replace(t[1], '<span style="color:red;">' + t[1] + "</span>"));
                var e = t[2];
                return t[4] += "<li url=" + t[3] + '><i class="icon icon-' + e + ' "> </i>' + t[0] + '<span class="list-txt"></span></li>', resList = t[4], resList
            }

            function n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                    success: function(n) {
                        var r = JSON.stringify(n.data);
                        localStorage.setItem("common_search_firstData", r), u = localStorage.getItem("common_search_firstData");
                        var h = n.data.length;
                        if (0 == h) {
                            for (var f = [{
                                    value: "城市",
                                    ico: "place"
                                }, {
                                    value: "车票",
                                    ico: "jianpiao"
                                }, {
                                    value: "正晚点",
                                    ico: "time"
                                }, {
                                    value: "起售时间",
                                    ico: "selltime"
                                }, {
                                    value: "检票口",
                                    ico: "jianpiao"
                                }, {
                                    value: "时刻表",
                                    ico: "date"
                                }, {
                                    value: "代售点",
                                    ico: "train"
                                }, {
                                    value: "交通查询",
                                    ico: "zhanche"
                                }, {
                                    value: "天气",
                                    ico: "weather"
                                }, {
                                    value: "问答",
                                    ico: "wenda"
                                }, {
                                    value: "服务",
                                    ico: "fuwu"
                                }, {
                                    value: "订单",
                                    ico: "dingdanchaxun"
                                }], h = f.length, p = "", v = 0; v <= h - 1; v++) p += '<li><i class="icon icon-' + f[v].ico + ' "> </i>' + f[v].value + '<span class="list-txt"></span></li>';
                            return t(".search-down-list").html(p), t(".search-down").fadeIn(), void(l = "noresults")
                        }
                        for (var g = "", v = 0; v <= h - 1; v++)
                            if ("001" == n.data[v].type) {
                                var m = "huochepiao";
                                g = e([n.data[v].word, i, m, n.data[v].url, g])
                            } else if ("view" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("002" == n.data[v].type) {
                            var m = "selltime";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("003" == n.data[v].type) {
                            var m = "time";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("004" == n.data[v].type) {
                            var m = "selltime";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("006" == n.data[v].type) {
                            var m = "yupiao";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("100" == n.data[v].type) {
                            var m = "train";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("101" == n.data[v].type) {
                            var m = "huochepiao";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("102" == n.data[v].type) {
                            var m = "dingdanchaxun";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("103" == n.data[v].type) {
                            var m = "dingdanchaxun";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("104" == n.data[v].type) {
                            var m = "user";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("105" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("106" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("107" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("108" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("109" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("110" == n.data[v].type) {
                            var m = "dingcan";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("111" == n.data[v].type) {
                            var m = "user";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("112" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("113" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("114" == n.data[v].type) {
                            var m = "wenda";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("115" == n.data[v].type) {
                            var m = "fuwu";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("116" == n.data[v].type) {
                            var m = "fuwu";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("117" == n.data[v].type) {
                            var m = "fuwu";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("118" == n.data[v].type) {
                            var m = "fuwu";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("119" == n.data[v].type) {
                            var m = "dingdanchaxun";
                            g = e([n.data[v].word, i, m, n.data[v].url, g])
                        } else if ("120" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "xiangdao";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("121" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "shanglv";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("122" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "user";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("123" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "user";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("124" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "user";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("125" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "fuwu";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("126" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "wenda";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("127" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "dingdanchaion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },xun";
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("128" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "dingcan";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("129" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "fuwu";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("130" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "user";ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        } else if ("131" == n.dion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },ata[v].type) {
                            var m = "dingdanchaion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },xun";
                            g = e([n.data[v].woion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },rd, i, m, n.data[v].url, g])
                        }ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },
                        t(".search-down-list").ion n(i) {
                t.ajax({
                    url: getSearchUrl,
                    dataType: "jsonp",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    type: "GET",
                    timeout: 1e4,
                    cache: !1,
                    data: {
                        keyword: i,
                        suorce: "",
                        action: ""
                    },html(g), t(".search-down").fadeIn(), t(".search-down-list").off("click", "li").on("click", "li", function() {
                            var e = {
                                innerText: t(this)[0].innerText,
                                url: t(this)[0].getAttribute("url")
                            };
                            if ("" != e.url && void 0 != e.url && null != e.url) {
                                window.open(t(this).attr("url")), c.unshift(e);
                                var i = c.slice(0, 10);
                                s("searchHistory", JSON.stringify(i), 60), o = JSON.parse(a("searchHistory")), d = o;
                                for (var n = "", r = 0; r <= d.length - 1; r++) n += "<li url=" + d[r].url + ">" + d[r].innerText + "</li>";
                                t(".search-history-list").html(n)
                            }
                        })
                    },
                    error: function(t) {}
                })
            }

            function a(t) {
                var e = document.cookie.indexOf(t),
                    i = document.cookie.indexOf(";", e);
                return -1 == e ? "" : unescape(document.cookie.substring(e + t.length + 1, i > e ? i : document.cookie.length))
            }

            function s(t, e, i, n, a, s) {
                var o = document.domain;
                o = o.substring(o.indexOf(".") + 1, o.length);
                var r = new Date;
                r.setTime(r.getTime() + 1e3 * i), document.cookie = escape(t) + "=" + escape(e) + (n ? "; path=" + n : ";path=/") + "; domain=" + o + (s ? "; secure" : "") + ";expires=" + r
            }
            jQuery.support.cors = !0;
            var o, r, l, c = [],
                d = [],
                h = !0;
            t(".header-search .search-input").on("focus", function() {
                if (h = !0, f.splice(0, f.length), t(this).addClass("focus"), t(".search-btn").css({
                        background: "#2676E3"
                    }), t(".search-down").fadeOut(), t(".search-input").val(""), "" == t(".search-input").val() && (b = 0), a("searchHistory"))
                    if (o = JSON.parse(a("searchHistory")), d = o, c = d, 0 != d.length) {
                        for (var e = "", i = 0; i <= d.length - 1; i++) e += "<li url=" + d[i].url + ">" + d[i].innerText + "</li>";
                        t(".search-history-list").html(e), t(".search-history").fadeIn()
                    } else t(".search-history").fadeOut();
                else "" != d ? t(".search-history").fadeIn() : t(".search-history").fadeOut();
                t(".search-btn")[0].onclick = function() {
                    var e = t(".header-search .search-input").val();
                    if (e = e.replace(/^ +| +$/g, ""), !(e.length <= 0)) {
                        for (var i = t(".search-input").val(), u = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", f = i.length, p = 0; p <= f - 1; p++)
                            if (u.indexOf(i[p]) > -1) return;
                        1 == h && n(i);
                        var v = t(".search-down-list li");
                        if ("noresults" == l);
                        else {
                            if (0 == v.length) return;
                            window.open(v.eq(0).attr("url"))
                        }
                        var g = {
                            innerText: i,
                            url: v.eq(0).attr("url")
                        };
                        c.unshift(g), r = c.slice(0, 10), s("searchHistory", JSON.stringify(r), 60), o = JSON.parse(a("searchHistory")), d = o, t(".search-input").val("");
                        for (var m = "", p = 0; p <= d.length; p++) {
                            for (var p = 0; p <= d.length - 1; p++) m += "<li url=" + d[p].url + ">" + d[p].innerText + "</li>";
                            t(".search-history-list").html(m)
                        }
                    }
                }, t(".search-history-list")[0].onclick = function(e) {
                    var e = e || window.event,
                        i = e.target || e.srcElement;
                    if ("li" === i.nodeName.toLowerCase()) {
                        if ("undefined" == i.getAttribute("url")) return;
                        t(".search-down-list li");
                        window.open(i.getAttribute("url"))
                    }
                }, t(".history-clear").on("click", function() {
                    c.splice(0, c.length), r = c.slice(0, 10), s("searchHistory", JSON.stringify(r), 60), o = JSON.parse(a("searchHistory")), d = o, list = "", t(".search-history-list").html(d)
                })
            });
            var u, f = [];
            if (navigator.userAgent.indexOf("Trident") > -1) {
                var p = (navigator.appName, navigator.appVersion),
                    v = p.split(";"),
                    g = v && v.length > 1,
                    m = g ? v[1].replace(/[ ]/g, "") : "";
                document.onmousedown = function(e) {
                    var e = e || window.event;
                    if ("MSIE8.0" == m || "MSIE9.0" == m || "MSIE10.0" == m || "WOW64" == m) {
                        var i = e.clientX,
                            n = e.clientY,
                            a = t("#search-input").offset().left,
                            s = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, a + t("#search-input").outerWidth()),
                            o = t("#search-input").offset().top,
                            r = t("#search-input").outerHeight(),
                            l = o + r + 204;
                        (i < a || i > s || n < o || n > l) && (t(".search-down").fadeOut(), t(".search-history").fadeOut(), f.splice(0, f.length))
                    }
                }
            } else t(".header-search .search-input").on("blur", function() {
                t(".search-history").fadeOut(), t(this).removeClass("focus"), t(".search-btn").css({
                    "background-color": "#3B99FC"
                }), t(".search-down").fadeOut(), f.splice(0, f.length)
            });
            var y, w, _, b = 0;
            t(".header-search .search-input").on("keyup", function(e) {
                function i(t) {
                    void 0 !== t && "" !== t && window.open(t)
                }
                8 == e.keyCode && (b = 0), t(".search-history").fadeOut();
                y = e.timeStamp, 16 != e.keyCode && 38 != e.keyCode && 40 != e.keyCode && 37 != e.keyCode && 39 != e.keyCode && setTimeout(function() {
                    try {
                        if (y - e.timeStamp == 0) {
                            D = t(".search-input").val().toUpperCase(), "" == D && (t(".search-down-list").html(""), t(".search-down").fadeOut()), f.push(D);
                            for (var i = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", a = D.length, s = 0; s <= a - 1; s++) {
                                if (i.indexOf(D[s]) > -1) return t(".search-down-list").html(""), t(".search-down").fadeOut(), void(h = !1);
                                h = !0
                            }
                            var o = f.length;
                            if ("" != D)
                                if (D.indexOf(f[o - 2]) > -1) {
                                    t(".search-down-list").html(""), w = JSON.parse(u), _ = w.length;
                                    for (var r = "", l = 0, s = 0; s <= _ - 1; s++)
                                        if (w[s].word.indexOf(D) > -1 && "001" == w[s].type) {
                                            l++, w[s].word = w[s].word.replace(D, '<span style="color:red;">' + D + "</span>");
                                            r += "<li url=" + w[s].url + '><i class="icon icon-huochepiao "> </i>' + w[s].word + '<span class="list-txt"></span></li>'
                                        } 0 == l && 1 == h && n(D), t(".search-down-list").html(r)
                                } else 1 == h && n(D)
                        }
                    } catch (e) {
                        D = t(".search-input").val().toUpperCase();
                        for (var i = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", a = D.length, s = 0; s <= a - 1; s++) {
                            if (i.indexOf(D[s]) > -1) return t(".search-down-list").html(""), t(".search-down").fadeOut(), void(h = !1);
                            h = !0
                        }
                        "" != D && 1 == h && n(D)
                    }
                }, 500);
                var l = t(".search-down-list li");
                if (1 == b && 40 != e.keyCode && (b = 0), 40 == e.keyCode && b <= l.length - 1) {
                    b++;
                    for (var p = 0; p <= l.length - 1; p++) l.eq(p).css({
                        background: "",
                        color: "black"
                    }), l.eq(p).children().eq(0).css({
                        color: "#3B99FC"
                    });
                    if (l.eq(b - 1).css({
                            background: "#3B99FC",
                            color: "white"
                        }), l.eq(b - 1).children().eq(0).css({
                            color: "white"
                        }), t("#search-input").val(l.eq(b - 1)[0].innerText), b >= 0 && b < 7) t(".search-down-list").scrollTop(0);
                    else if (6 != b && parseInt(b / 6) >= 1) {
                        var v = parseInt(b / 6) + 1,
                            g = 204 * (v - 1) - 30;
                        t(".search-down-list").scrollTop(g)
                    }
                    l.eq(b - 1).click(function() {
                        window.open(l.eq(b - 1).attr("url"))
                    })
                }
                if (38 == e.keyCode && b > 0) {
                    b--;
                    for (var p = 0; p <= l.length - 1; p++) l.eq(p).css({
                        background: "",
                        color: "black"
                    }), l.eq(p).children().eq(0).css({
                        color: "#3B99FC"
                    });
                    if (l.eq(b - 1).css({
                            background: "#3B99FC",
                            color: "white"
                        }), l.eq(b - 1).children().eq(0).css({
                            color: "white"
                        }), t("#search-input").val(l.eq(b - 1)[0].innerText), b >= 0 && b < 7) t(".search-down-list").scrollTop(0), 0 == b && (b = 1);
                    else if (6 != b && parseInt(b / 6) >= 1) {
                        var v = parseInt(b / 6) + 1,
                            g = 203.5 * (v - 1) - 30;
                        t(".search-down-list").scrollTop(g)
                    }
                    l.eq(b - 1).on("click", function() {
                        window.open(l.eq(b).attr("url"))
                    })
                }
                if (13 == e.keyCode) {
                    var m, k = t(".header-search .search-input").val();
                    if (k = k.replace(/^ +| +$/g, ""), k.length <= 0) return;
                    var D = t(".search-input").val();
                    0 == b ? (i(l.eq(0).attr("url")), m = l.eq(0).attr("url")) : (i(l.eq(b - 1).attr("url")), m = l.eq(b - 1).attr("url"));
                    for (var C = {
                            innerText: D,
                            url: m
                        }, x = "[@`~!#$^&*()=|{}':;',\\[\\].<>《》/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘’", $ = D.length, p = 0; p <= $ - 1; p++)
                        if (x.indexOf(D[p]) > -1) return;
                    c.unshift(C), r = c.slice(0, 10), s("searchHistory", JSON.stringify(r), 60), o = JSON.parse(a("searchHistory")), d = o, t(".search-input").val("")
                }
                for (var T = "", p = 0; p <= d.length - 1; p++) T += "<li url=" + d[p].url + ">" + d[p].innerText + "</li>";
                t(".search-history-list").html(T)
            }), t(".search-down .close").on("click", function() {
                t(".search-input").val(""), t(this).parent().fadeOut(), f.splice(0, f.length)
            }), i()
        }

        function i() {
            var e;
            n(), t.ajax({
                url: loginConf,
                type: "POST",
                timeout: 1e4,
                success: function(t) {
                    t.data && (window.isStudentDatas = t.data.isstudentDate, window.studentDates = t.data.studentDate, stu_control = t.data.stu_control, other_control = t.data.other_control, "Y" === t.data.is_uam_login ? s() : "Y" == t.data.is_login && (e = "Y", window.isLogin = e, window.ajaxLogin_flag = !0))
                },
                error: function(t) {
                    window.ajaxLogin_flag = !0
                }
            })
        }

        function n() {
            t("#J-header-login").show(), t("#J-header-logout").hide()
        }

        function a() {
            t("#J-header-login").hide(), t("#J-header-logout").show()
        }

        function s() {
            t.ajax({
                url: passport_apptk_static,
                data: {
                    appid: passport_appId
                },
                xhrFields: {
                    withCredentials: !0
                },
                type: "POST",
                timeout: 1e4,
                success: function(e) {
                    "0" == e.result_code && e.name ? (isLogin = "Y", window.isLogin = isLogin, window.ajaxLogin = (new Date).getTime(), a(), t("#J-header-logout a.txt-primary").html(e.name), t("#J-header-logout a.logout").attr("href", logout)) : (isLogin = "N", window.isLogin = isLogin, window.ajaxLogin = (new Date).getTime()), window.ajaxLogin_flag = !0
                },
                error: function(t) {
                    window.ajaxLogin_flag = !0
                }
            })
        }
        return window.isLogin = "N", window.ajaxLogin_flag = !1, t("#index_ads") && t("#index_ads").length > 0 ? (t("#gLink").click(function() {
            return t("html, body").animate({
                scrollTop: t("#index_ads").offset().top
            }, {
                duration: 500,
                easing: "swing"
            }), !1
        }), t("a.goGonggao").on("click", function(e) {
            return e.stopPropagation(), t("html, body").animate({
                scrollTop: t("#index_ads").offset().top
            }, {
                duration: 500,
                easing: "swing"
            }), !1
        })) : (t("#gLink").click(function() {
            t("#gLink").attr("href", "../../index.html#index_ads")
        }), t("a.goGonggao").on("click", function(e) {
            e.stopPropagation(), t(this).attr("href", "../../index.html#index_ads")
        })), {
            initialize: function() {
                e(), window.gHeader = (new Date).getTime()
            }
        }
    }), define("g/g-footer", ["jquery"], function(t) {
        function e() {
            var e = t(window).height(),
                i = t(".footer").height(),
                n = t(".content").height(),
                a = e - 109 - i;
            n <= a && t(".content").height(a)
        }
        return {
            initialize: function() {
                e(), window.gFooter = (new Date).getTime()
            }
        }
    }), define("g/g-href", ["jquery"], function(t) {
        function e() {
            t('a[name="g_href"]').click(function() {
                var e = t(this).attr("data-redirect"),
                    i = t(this).attr("data-type"),
                    n = t(this).attr("data-href"),
                    a = t(this).attr("data-target");
                "Y" == e ? "_blank" == a ? 1 == i ? window.open(href_baseUrl_1 + href_path_1 + n) : 2 == i ? window.open(href_baseUrl_2 + href_path_2 + n) : 3 == i ? window.open(href_baseUrl_3 + href_path_3 + n) : 4 == i ? window.open(href_baseUrl_4 + href_path_4 + n) : 5 == i ? window.open(href_baseUrl_5 + href_path_5 + n) : 6 == i ? window.open(href_baseUrl_6 + href_path_6 + n) : 10 == i && window.open(href_baseUrl_10 + href_path_10 + n) : 1 == i ? window.location.href = href_baseUrl_1 + href_path_1 + n : 2 == i ? window.location.href = href_baseUrl_2 + href_path_2 + n : 3 == i ? window.location.href = href_baseUrl_3 + href_path_3 + n : 4 == i ? window.location.href = href_baseUrl_4 + href_path_4 + n : 5 == i ? window.location.href = href_baseUrl_5 + href_path_5 + n : 6 == i ? window.location.href = href_baseUrl_6 + href_path_6 + n : 10 == i && (window.location.href = href_baseUrl_10 + href_path_10 + n) : "_blank" == a ? window.open(n) : window.location.href = n
            })
        }
        return {
            initialize: function() {
                e()
            }
        }
    }), define("ticket_check/ticket_check-init", ["jquery"], function(t) {
        function e() {
            function e(t) {
                t.find("li.data-selected").addClass("seleced").siblings("li").removeClass("seleced")
            }
            var a = t("div.model-select-box"),
                s = t("ul.model-select-option"),
                o = t(".input-box .typeahead"),
                r = t("div.model-select-text", a),
                l = 1;
            if (t("ul.model-select-option").on("mousedown", "li", function() {
                    return t(this).parent().siblings("div.model-select-text").text(t(this).text()).attr("data-value", t(this).attr("data-option")), t(this).parent().siblings(t("input.selected-input")).attr("data-value", t(this).attr("data-option")), t(this).addClass("seleced data-selected").siblings("li").removeClass("seleced data-selected"), s.slideUp(10, function() {}), !1
                }), t("ul.model-select-option").on("mouseover", "li", function() {
                    t(this).addClass("seleced").siblings("li").removeClass("seleced")
                }), r.click(function(i) {
                    if (t("#topicId").val()) {
                        t("#ticketEntranceSel").focus();
                        var n = t(this).siblings("ul.model-select-option");
                        return s.not(n).slideUp(10, function() {
                            e(t(this))
                        }), n.slideToggle(10, function() {
                            e(t(this))
                        }), s.find("li:first-child").addClass("seleced").siblings("li").removeClass("seleced"), !1
                    }
                }), s.find("li").each(function(e, i) {
                    t(this).hasClass("seleced") && (t(this).addClass("data-selected"), t(this).parent().siblings(t("input.selected-input")).attr("data-value", t(this).attr("data-option")))
                }).mousedown(function() {
                    return t(this).parent().siblings("div.model-select-text").text(t(this).text()).attr("data-value", t(this).attr("data-option")), t(this).parent().siblings(t("input.selected-input")).attr("data-value", t(this).attr("data-option")), t(this).addClass("seleced data-selected").siblings("li").removeClass("seleced data-selected"), s.slideUp(10, function() {}), !1
                }).mouseover(function() {
                    t(this).addClass("seleced").siblings("li").removeClass("seleced")
                }), t(document).click(function(i) {
                    s.slideUp(10, function() {
                        e(t(this))
                    })
                }), t("body").keydown(function(t) {
                    var e = t.which;
                    if (e > 36 && e < 41) return !1
                }), getStorage("ticketCheckStationList") && getUrlParms("isremoveStore")) {
                for (var c = "", d = 0, h = JSON.parse(getStorage("ticketCheckStationList")).data, u = 0; u < h.length; u++) c += "<li data-option=" + h[u][1] + ">" + h[u][0] + "</li>", h[u][2] && (d = u);
                d += 1, t(".model-select-option").html(c), s.find("li:nth-child(" + d + ")").parent().siblings("div.model-select-text").text(s.find("li:nth-child(" + d + ")").text()).attr("data-value", s.find("li:nth-child(" + d + ")").attr("data-option")), s.find("li:nth-child(" + d + ")").parent().siblings(t("input.selected-input")).attr("data-value", s.find("li:nth-child(" + d + ")").attr("data-option")), t("#station_loading").hide()
            }
            getStorage("ticketCheck") ? (t("#ticket_check_date").val(JSON.parse(getStorage("ticketCheck")).train_date), t("#ticket_check_trainNum").val(JSON.parse(getStorage("ticketCheck")).train_number), t("#ticket_check_station").val(JSON.parse(getStorage("ticketCheck")).ticket_entrance_station), t("#ticket_check_topic").val(JSON.parse(getStorage("ticketCheck")).train_no), t("#topicId").val(JSON.parse(getStorage("ticketCheck")).train_no), removeStore("ticketCheck"), removeStore("ticketCheckStationList"), i()) : t("#ticket_check_date").val(formatDate(new Date)), t(".model-select-option.train_hide").on("click", "li", function() {
                t(".model-select-option.train_hide").hide()
            }), t("#ticket_check_trainNum").on("change", function() {
                n()
            }), t("#ticket_check_trainNum").keydown(function(e) {
                o = t(".input-box .typeahead");
                var i = t(".input-box .typeahead").children().length,
                    e = e || window.target;
                if ("block" == o.css("display")) switch (e.keyCode) {
                    case 40:
                        l++, l > i && (l = 1);
                        var n = Math.floor(o.find("li:nth-child(" + l + ")").offset().top),
                            a = o.outerHeight(),
                            s = Math.floor(o.find("li:first-child").outerHeight());
                        n > a && o.scrollTop(s * (l - 4)), n < 0 && o.scrollTop(s * (l - 1));
                        break;
                    case 38:
                        l--, l <= 0 && (l = i);
                        var r = Math.floor(o.find("li:nth-child(" + l + ")").offset().bottom),
                            a = o.outerHeight(),
                            s = Math.floor(o.find("li:first-child").outerHeight());
                        r > a ? o.scrollTop(s * (l - 1)) : o.scrollTop(s * (l - 4))
                }
            }), t("#ticket_check_trainNum").typeahead({
                items: 1e4,
                source: function(e, i) {
                    l = 1, o.find("li:first-child").addClass("active").siblings("li").removeClass("active");
                    var n = t("#ticket_check_date").val().replace(/-/g, ""),
                        a = /^[GTKDCZY]{0,1}[0-9]{0,6}$/;
                    e.toUpperCase().match(a) && t.ajax({
                        url: getTrainList,
                        type: "GET",
                        timeout: 1e4,
                        dataType: "jsonp",
                        xhrFields: {
                            withCredentials: !0
                        },
                        crossDomain: !0,
                        data: {
                            keyword: e,
                            date: n
                        },
                        success: function(t) {
                            for (var e = [], n = 0; n < t.data.length; n++) {
                                var a = {
                                    id: t.data[n].train_no,
                                    name: t.data[n].station_train_code + "(" + t.data[n].from_station + "-" + t.data[n].to_station + ")",
                                    nameCode: t.data[n].station_train_code
                                };
                                a = JSON.stringify(a), e.push(a)
                            }
                            i(e)
                        },
                        error: function(t) {}
                    })
                },
                matcher: function(t) {
                    return ~JSON.parse(t).name.toLowerCase().indexOf(this.query.toLowerCase())
                },
                sorter: function(t) {
                    for (var e, i = [], n = [], a = []; aItem = t.shift();) {
                        var e = JSON.parse(aItem);
                        e.name.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.name.indexOf(this.query) ? n.push(JSON.stringify(e)) : a.push(JSON.stringify(e)) : i.push(JSON.stringify(e))
                    }
                    return i.concat(n, a)
                },
                highlighter: function(t) {
                    var e = JSON.parse(t),
                        i = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                    return e.name.replace(new RegExp("(" + i + ")", "ig"), function(t, e) {
                        return "<strong>" + e + "</strong>"
                    })
                },
                updater: function(e) {
                    var i = JSON.parse(e);
                    return t("#topicId").attr("value", i.id), l = 1, o.find("li:first-child").addClass("active").siblings("li").removeClass("active"), t("#station_loading").show(), i.nameCode
                }
            }), t(".btn-primary").on("click", function() {
                t("#ticket_check_date").val() && t("#ticket_check_trainNum").val() && "请选择车站" !== t("#ticketEntranceSel").html() && (t("#ticket_tooltip_error").hide(), t(".result-none").hide(), t(".ticket-check-box").hide(), t(".ticket-box-tips").hide(), i()), t("#ticket_check_date").val() ? t("#ticket_check_trainNum").val() ? "请选择车站" == t("#ticketEntranceSel").html() && (t("#ticket_tooltip_error").html('<i class="icon icon-plaint-fill" style="font-size:14px;">请选择乘车站</i>'), t("#ticket_tooltip_error").show()) : (t("#ticket_tooltip_error").html('<i class="icon icon-plaint-fill" style="font-size:14px;">请输入车次</i>'), t("#ticket_tooltip_error").show()) : (t("#ticket_tooltip_error").html('<i class="icon icon-plaint-fill" style="font-size:14px;">请选择日期</i>'), t("#ticket_tooltip_error").show())
            })
        }

        function i() {
            t("#loading").show(), t.ajax({
                url: getTicektCheckListpr,
                type: "POST",
                dataType: "json",
                timeout: 1e4,
                data: {
                    trainDate: t("#ticket_check_date").val(),
                    station_train_code: t("#ticket_check_trainNum").val(),
                    from_station_telecode: t("#ticketEntranceSel").attr("data-value")
                },
                success: function(e) {
                    var i = e.data;
                    t(".content").height(""), i ? (t(".ticket-check-box").show(), t(".ticket-box-tips").show(), t(".check-numnew").text(i), t(".result-none").hide()) : (t(".result-none").show(), t(".ticket-check-box").hide(), t(".ticket-box-tips").hide()), t("#loading").hide(), footerFn()
                },
                error: function(t) {}
            })
        }

        function n() {
            t.ajax({
                url: getCityStation,
                type: "GET",
                timeout: 1e4,
                dataType: "json",
                data: {
                    train_no: t("#topicId").val(),
                    depart_date: t("#ticket_check_date").val()
                },
                success: function(e) {
                    var i = [],
                        n = 0,
                        a = [],
                        s = "";
                    for (var o in e.data) a.push(o);
                    a = a.sort();
                    for (var o in e.data) n++, i[n - 1] = e.data[a[n - 1]];
                    for (var r = 0; r < i.length; r++) s += "<li data-option=" + i[r][1] + ">" + i[r][0] + "</li>";
                    t(".model-select-option").html(s), t("ul.model-select-option").find("li:first-child").parent().siblings("div.model-select-text").text(t("ul.model-select-option").find("li:first-child").text()).attr("data-value", t("ul.model-select-option").find("li:first-child").attr("data-option")), t("ul.model-select-option").find("li:first-child").parent().siblings(t("input.selected-input")).attr("data-value", t("ul.model-select-option").find("li:first-child").attr("data-option")), t("#station_loading").hide()
                },
                error: function(t) {}
            })
        }
        return {
            initialize: function() {
                e()
            }
        }
    }),
    function(t) {
        "function" == typeof define && define.amd ? define("core/common/date", ["jquery"], t) : t(jQuery)
    }(function(t) {
        function e(t, e) {
            var i = new Array,
                n = new Array;
            if (null != t && null != e) {
                i = t.split("-");
                var a = new Date(i[0], parseInt(i[1] - 1), i[2]);
                n = e.split("-");
                return a >= new Date(n[0], parseInt(n[1] - 1), n[2])
            }
        }

        function i(e, i, n, a) {
            t(e).focus(function() {
                n = GetDateStr(t(a).hasClass("active") ? stu_control - 1 : other_control - 1), t(e).jcalendar({
                    isSingle: !1,
                    startDate: i,
                    endDate: n,
                    onpicked: function() {
                        "#go_date" == e && t("#from_date").val(t("#go_date").val()), t(e).blur(), t(e).hasClass("inp-txt_select") || t(e).addClass("inp-txt_select"), t(e).hasClass("error") && t(e).removeClass("error"), "train_date" == t(e).attr("id") && (s(t(e).val(), window.studentDates) ? t("#isStudentDan").removeClass("disabled") : (t("#isStudentDan").addClass("disabled"), t("#isStudentDan").removeClass("active"))), "go_date" == t(e).attr("id") && (s(t(e).val(), window.studentDates) ? t("#isStudent").removeClass("disabled") : (t("#isStudent").addClass("disabled"), t("#isStudent").removeClass("active"))), "serial_date" == t(e).attr("id") && (s(t(e).val(), window.studentDates) ? t("#isStudentLian").removeClass("disabled") : (t("#isStudentLian").addClass("disabled"), t("#isStudentLian").removeClass("active")))
                    }
                })
            })
        }

        function n(e, i) {
            t(e).focus(function() {
                r = !0, t(e).jcalendar({
                    isSingle: !1,
                    startDate: i ? GetDateStr(-29) : formatDate(new Date),
                    endDate: i ? formatDate(new Date) : GetDateStr(29),
                    onpicked: function() {
                        if (t("#refund_start").val()) {
                            timeChangetype(t("#refund_start").val().replace(/-/g, "/")) > timeChangetype(t("#refund_end").val().replace(/-/g, "/")) && t("#refund_end").val(t("#refund_start").val())
                        }
                        t(e).blur(), t(e).hasClass("inp-txt_select") || t(e).addClass("inp-txt_select"), t(e).hasClass("error") && t(e).removeClass("error")
                    }
                })
            })
        }

        function a(e, i) {
            t(e).focus(function() {
                r = !0, t(e).jcalendar({
                    isSingle: !1,
                    startDate: i ? t("#refund_start").val() || GetDateStr(-29) : t("#refund_start").val() || formatDate(new Date),
                    endDate: i ? formatDate(new Date) : GetDateStr(29),
                    onpicked: function() {
                        t(e).blur(), t(e).hasClass("inp-txt_select") || t(e).addClass("inp-txt_select"), t(e).hasClass("error") && t(e).removeClass("error")
                    }
                })
            })
        }

        function s(t, e) {
            var i = [o(e[0]), o(e[1])],
                n = [o(e[2]), o(e[3])],
                a = [o(e[4]), o(e[5])];
            return i[0] <= o(t) && i[1] >= o(t) || (n[0] <= o(t) && n[1] >= o(t) || a[0] <= o(t) && a[1] >= o(t))
        }

        function o(t) {
            var e = new Date(t.replace(/-/g, "/"));
            return time = Date.parse(e), time
        }
        var r = !1;
        t(".cal-wrap").on("click", function() {
                r && e(t("#go_date").val(), t("#from_date").val()) && t("#from_date").val(t("#go_date").val())
            }), i("#dinner_date", formatDate(new Date), GetDateStr(29)), i("#train_date", formatDate(new Date), GetDateStr(29), "#isStudentDan"), i("#go_date", formatDate(new Date), GetDateStr(29), "#isStudent"),
            function(e, i, n, a) {
                t(e).focus(function() {
                    n = GetDateStr(t(a).hasClass("active") ? stu_control - 1 : other_control - 1), r = !1, t(e).jcalendar({
                        isSingle: !1,
                        startDate: t("#go_date").val(),
                        endDate: n,
                        onpicked: function() {
                            t(e).blur(), t(e).hasClass("inp-txt_select") || t(e).addClass("inp-txt_select"), t(e).hasClass("error") && t(e).removeClass("error")
                        }
                    })
                })
            }("#from_date", formatDate(new Date), GetDateStr(29), "#isStudent"), i("#serial_date", formatDate(new Date), GetDateStr(29), "#isStudentLian"), i("#check_in", formatDate(new Date), GetDateStr(29)), i("#ticket_check_date", formatDate(new Date), GetDateStr(29)), i("#contract_date", formatDate(new Date), GetDateStr(29)), t(".radio-list-ding").on("click", "li", function() {
                t("#dingqiaoID").hasClass("active") ? (n("#refund_start", !0), a("#refund_end", !0)) : (n("#refund_start", !1), a("#refund_end", !1))
            }), n("#refund_start", !0), a("#refund_end", !0), i("#noTripFromDate", formatDate(new Date), GetDateStr(29)), i("#noTripToDate", formatDate(new Date), GetDateStr(29)), i("#historyFromDate", formatDate(new Date), GetDateStr(29)), i("#historyToDate", formatDate(new Date), GetDateStr(29)), i("#travelFromDate", formatDate(new Date), GetDateStr(29)), i("#travelToDate", formatDate(new Date), GetDateStr(29))
    });
var static_url = "https://www.12306.cn",
    dynimic_url_ie = "https://www.12306.cn/index",
    dynimic_url = "https://kyfw.12306.cn",
    search_base_url = "https://search.12306.cn",
    send_url = "https://tj.12306.cn",
    publicName = "/otn",
    path = "/index",
    static_url_path = static_url + path,
    dynimic_url_path_ie = dynimic_url_ie + publicName,
    dynimic_url_path = dynimic_url + publicName,
    bannerUrl = dynimic_url_path_ie + "/index12306/getBanner",
    believeData = "https://www.12306.cn/index/otn/queryDishonest/query",
    weatherTitle = "http://www.weather.com.cn/weather/",
    orderDinner = "https://exservice.12306.cn/excater/list.html",
    sendDataUrl = send_url + "/m/v1/website/index",
    getSearchUrl = search_base_url + "/search/v1/h5/search",
    getTrainList = search_base_url + "/search/v1/train/search",
    getZhengWan = dynimic_url_path_ie + "/zwdch/queryCC",
    getScSnameListpr = dynimic_url_path_ie + "/index12306/queryScSname",
    getTicektCheckListpr = dynimic_url_path_ie + "/index12306/queryTicketCheck",
    getCityStation = dynimic_url_path_ie + "/index12306/queryStopStations",
    loginConf = dynimic_url_path_ie + "/login/conf",
    passport_appId = "otn",
    passport_apptk_static = dynimic_url + "/passport/web/auth/uamtk-static",
    logout = dynimic_url_path + "/login/loginOut",
    imgBan1 = static_url_path + "/images/empty.png",
    imgBan2 = static_url_path + "/images/empty.png",
    travelData = dynimic_url_path_ie + "/index12306/getTravelList",
    servicesData = dynimic_url_path_ie + "/index12306/getServiceList",
    listData = dynimic_url_path_ie + "/index12306/getNews",
    weatherData = static_url_path + "/script/core/json/weather_station.json",
    singleWayToOld = dynimic_url_path + "/leftTicket/init",
    continuityWayToOld = dynimic_url_path + "/lcQuery/init",
    zwdUrl = dynimic_url_path + "/zwdch/init",
    checkInUrl = static_url_path + "/view/infos/ticket_check.html",
    sellInUrl = static_url_path + "/view/infos/sale_time.html",
    browserForie = static_url_path + "/view/forie.html",
    stu_control = 60,
    other_control = 30,
    href_baseUrl_1 = static_url + "/",
    href_path_1 = "index/",
    href_baseUrl_2 = "https://kyfw.12306.cn/",
    href_path_2 = "otn/",
    href_baseUrl_3 = "https://cx.12306.cn/",
    href_path_3 = "tlcx/",
    href_baseUrl_4 = "https://www.12306.cn/",
    href_path_4 = "mormhweb/",
    href_baseUrl_5 = "https://travel.12306.cn/",
    href_path_5 = "portal/",
    href_baseUrl_6 = "https://dynamic.12306.cn/",
    href_path_6 = "otn/",
    href_baseUrl_10 = "https://exservice.12306.cn/",
    href_path_10 = "excater/",
    lateSpotHtml = href_baseUrl_2 + href_path_2 + "view/train_order.html";
define("core/common/url_config", function() {}),
    function(t) {
        "function" == typeof define && define.amd ? define("core/lib/bootstrap2", ["jquery"], t) : t(jQuery)
    }(function(t) {
        ! function(t) {
            "use strict";
            t(function() {
                t.support.transition = function() {
                    var t = function() {
                        var t, e = document.createElement("bootstrap"),
                            i = {
                                WebkitTransition: "webkitTransitionEnd",
                                MozTransition: "transitionend",
                                OTransition: "oTransitionEnd otransitionend",
                                transition: "transitionend"
                            };
                        for (t in i)
                            if (void 0 !== e.style[t]) return i[t]
                    }();
                    return t && {
                        end: t
                    }
                }()
            })
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = '[data-dismiss="alert"]',
                i = function(i) {
                    t(i).on("click", e, this.close)
                };
            i.prototype.close = function(e) {
                function i() {
                    n.trigger("closed").remove()
                }
                var n, a = t(this),
                    s = a.attr("data-target");
                s || (s = a.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), n = t(s), e && e.preventDefault(), n.length || (n = a.hasClass("alert") ? a : a.parent()), n.trigger(e = t.Event("close")), e.isDefaultPrevented() || (n.removeClass("in"), t.support.transition && n.hasClass("fade") ? n.on(t.support.transition.end, i) : i())
            };
            var n = t.fn.alert;
            t.fn.alert = function(e) {
                    return this.each(function() {
                        var n = t(this),
                            a = n.data("alert");
                        a || n.data("alert", a = new i(this)), "string" == typeof e && a[e].call(n)
                    })
                }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
                    return t.fn.alert = n, this
                },
                t(document).on("click.alert.data-api", e, i.prototype.close)
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(e, i) {
                this.$element = t(e), this.options = t.extend({}, t.fn.button.defaults, i)
            };
            e.prototype.setState = function(t) {
                var e = "disabled",
                    i = this.$element,
                    n = i.data(),
                    a = i.is("input") ? "val" : "html";
                t += "Text", n.resetText || i.data("resetText", i[a]()), i[a](n[t] || this.options[t]), setTimeout(function() {
                    "loadingText" == t ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
                }, 0)
            }, e.prototype.toggle = function() {
                var t = this.$element.closest('[data-toggle="buttons-radio"]');
                t && t.find(".active").removeClass("active"), this.$element.toggleClass("active")
            };
            var i = t.fn.button;
            t.fn.button = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("button"),
                        s = "object" == typeof i && i;
                    a || n.data("button", a = new e(this, s)), "toggle" == i ? a.toggle() : i && a.setState(i)
                })
            }, t.fn.button.defaults = {
                loadingText: "loading..."
            }, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
                return t.fn.button = i, this
            }, t(document).on("click.button.data-api", "[data-toggle^=button]", function(e) {
                var i = t(e.target);
                i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle")
            })
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(e, i) {
                this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
            };
            e.prototype = {
                cycle: function(e) {
                    return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
                },
                getActiveIndex: function() {
                    return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
                },
                to: function(e) {
                    var i = this.getActiveIndex(),
                        n = this;
                    if (!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid", function() {
                        n.to(e)
                    }) : i == e ? this.pause().cycle() : this.slide(e > i ? "next" : "prev", t(this.$items[e]))
                },
                pause: function(e) {
                    return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
                },
                next: function() {
                    if (!this.sliding) return this.slide("next")
                },
                prev: function() {
                    if (!this.sliding) return this.slide("prev")
                },
                slide: function(e, i) {
                    var n, a = this.$element.find(".item.active"),
                        s = i || a[e](),
                        o = this.interval,
                        r = "next" == e ? "left" : "right",
                        l = "next" == e ? "first" : "last",
                        c = this;
                    if (this.sliding = !0, o && this.pause(), s = s.length ? s : this.$element.find(".item")[l](), n = t.Event("slide", {
                            relatedTarget: s[0],
                            direction: r
                        }), !s.hasClass("active")) {
                        if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                                var e = t(c.$indicators.children()[c.getActiveIndex()]);
                                e && e.addClass("active")
                            })), t.support.transition && this.$element.hasClass("slide")) {
                            if (this.$element.trigger(n), n.isDefaultPrevented()) return;
                            s.addClass(e), s[0].offsetWidth, a.addClass(r), s.addClass(r), this.$element.one(t.support.transition.end, function() {
                                s.removeClass([e, r].join(" ")).addClass("active"), a.removeClass(["active", r].join(" ")), c.sliding = !1, setTimeout(function() {
                                    c.$element.trigger("slid")
                                }, 0)
                            })
                        } else {
                            if (this.$element.trigger(n), n.isDefaultPrevented()) return;
                            a.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
                        }
                        return o && this.cycle(), this
                    }
                }
            };
            var i = t.fn.carousel;
            t.fn.carousel = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("carousel"),
                        s = t.extend({}, t.fn.carousel.defaults, "object" == typeof i && i),
                        o = "string" == typeof i ? i : s.slide;
                    a || n.data("carousel", a = new e(this, s)), "number" == typeof i ? a.to(i) : o ? a[o]() : s.interval && a.pause().cycle()
                })
            }, t.fn.carousel.defaults = {
                interval: 5e3,
                pause: "hover"
            }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
                return t.fn.carousel = i, this
            }, t(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
                var i, n, a = t(this),
                    s = t(a.attr("data-target") || (i = a.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")),
                    o = t.extend({}, s.data(), a.data());
                s.carousel(o), (n = a.attr("data-slide-to")) && s.data("carousel").pause().to(n).cycle(), e.preventDefault()
            })
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(e, i) {
                this.$element = t(e), this.options = t.extend({}, t.fn.collapse.defaults, i), this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
            };
            e.prototype = {
                constructor: e,
                dimension: function() {
                    return this.$element.hasClass("width") ? "width" : "height"
                },
                show: function() {
                    var e, i, n, a;
                    if (!this.transitioning && !this.$element.hasClass("in")) {
                        if (e = this.dimension(), i = t.camelCase(["scroll", e].join("-")), (n = this.$parent && this.$parent.find("> .accordion-group > .in")) && n.length) {
                            if ((a = n.data("collapse")) && a.transitioning) return;
                            n.collapse("hide"), a || n.data("collapse", null)
                        }
                        this.$element[e](0), this.transition("addClass", t.Event("show"), "shown"), t.support.transition && this.$element[e](this.$element[0][i])
                    }
                },
                hide: function() {
                    var e;
                    !this.transitioning && this.$element.hasClass("in") && (e = this.dimension(), this.reset(this.$element[e]()), this.transition("removeClass", t.Event("hide"), "hidden"), this.$element[e](0))
                },
                reset: function(t) {
                    var e = this.dimension();
                    return this.$element.removeClass("collapse")[e](t || "auto")[0].offsetWidth, this.$element[null !== t ? "addClass" : "removeClass"]("collapse"), this
                },
                transition: function(e, i, n) {
                    var a = this,
                        s = function() {
                            "show" == i.type && a.reset(), a.transitioning = 0, a.$element.trigger(n)
                        };
                    this.$element.trigger(i), i.isDefaultPrevented() || (this.transitioning = 1, this.$element[e]("in"), t.support.transition && this.$element.hasClass("collapse") ? this.$element.one(t.support.transition.end, s) : s())
                },
                toggle: function() {
                    this[this.$element.hasClass("in") ? "hide" : "show"]()
                }
            };
            var i = t.fn.collapse;
            t.fn.collapse = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("collapse"),
                        s = t.extend({}, t.fn.collapse.defaults, n.data(), "object" == typeof i && i);
                    a || n.data("collapse", a = new e(this, s)), "string" == typeof i && a[i]()
                })
            }, t.fn.collapse.defaults = {
                toggle: !0
            }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function() {
                return t.fn.collapse = i, this
            }, t(document).on("click.collapse.data-api", "[data-toggle=collapse]", function(e) {
                var i, n = t(this),
                    a = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
                    s = t(a).data("collapse") ? "toggle" : n.data();
                n[t(a).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), t(a).collapse(s)
            })
        }(window.jQuery),
        function(t) {
            "use strict";

            function e() {
                t(".dropdown-backdrop").remove(), t(n).each(function() {
                    i(t(this)).removeClass("open")
                })
            }

            function i(e) {
                var i, n = e.attr("data-target");
                return n || (n = e.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), i = n && t(n), i && i.length || (i = e.parent()), i
            }
            var n = "[data-toggle=dropdown]",
                a = function(e) {
                    var i = t(e).on("click.dropdown.data-api", this.toggle);
                    t("html").on("click.dropdown.data-api", function() {
                        i.parent().removeClass("open")
                    })
                };
            a.prototype = {
                constructor: a,
                toggle: function(n) {
                    var a, s, o = t(this);
                    if (!o.is(".disabled, :disabled")) return a = i(o), s = a.hasClass("open"), e(), s || ("ontouchstart" in document.documentElement && t('<div class="dropdown-backdrop"/>').insertBefore(t(this)).on("click", e), a.toggleClass("open")), o.focus(), !1
                },
                keydown: function(e) {
                    var a, s, o, r, l;
                    if (/(38|40|27)/.test(e.keyCode) && (a = t(this), e.preventDefault(), e.stopPropagation(), !a.is(".disabled, :disabled"))) {
                        if (o = i(a), !(r = o.hasClass("open")) || r && 27 == e.keyCode) return 27 == e.which && o.find(n).focus(), a.click();
                        s = t("[role=menu] li:not(.divider):visible a", o), s.length && (l = s.index(s.filter(":focus")), 38 == e.keyCode && l > 0 && l--, 40 == e.keyCode && l < s.length - 1 && l++, ~l || (l = 0), s.eq(l).focus())
                    }
                }
            };
            var s = t.fn.dropdown;
            t.fn.dropdown = function(e) {
                return this.each(function() {
                    var i = t(this),
                        n = i.data("dropdown");
                    n || i.data("dropdown", n = new a(this)), "string" == typeof e && n[e].call(i)
                })
            }, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
                return t.fn.dropdown = s, this
            }, t(document).on("click.dropdown.data-api", e).on("click.dropdown.data-api", ".dropdown form", function(t) {
                t.stopPropagation()
            }).on("click.dropdown.data-api", n, a.prototype.toggle).on("keydown.dropdown.data-api", n + ", [role=menu]", a.prototype.keydown)
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(e, i) {
                this.options = i, this.$element = t(e).delegate('[data-dismiss="modal"]', "click.dismiss.modal", t.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
            };
            e.prototype = {
                constructor: e,
                toggle: function() {
                    return this[this.isShown ? "hide" : "show"]()
                },
                show: function() {
                    var e = this,
                        i = t.Event("show");
                    this.$element.trigger(i), this.isShown || i.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function() {
                        var i = t.support.transition && e.$element.hasClass("fade");
                        e.$element.parent().length || e.$element.appendTo(document.body), e.$element.show(), i && e.$element[0].offsetWidth, e.$element.addClass("in").attr("aria-hidden", !1), e.enforceFocus(), i ? e.$element.one(t.support.transition.end, function() {
                            e.$element.focus().trigger("shown")
                        }) : e.$element.focus().trigger("shown")
                    }))
                },
                hide: function(e) {
                    e && e.preventDefault();
                    e = t.Event("hide"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), t.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
                },
                enforceFocus: function() {
                    var e = this;
                    t(document).on("focusin.modal", function(t) {
                        e.$element[0] === t.target || e.$element.has(t.target).length || e.$element.focus()
                    })
                },
                escape: function() {
                    var t = this;
                    this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function(e) {
                        27 == e.which && t.hide()
                    }) : this.isShown || this.$element.off("keyup.dismiss.modal")
                },
                hideWithTransition: function() {
                    var e = this,
                        i = setTimeout(function() {
                            e.$element.off(t.support.transition.end), e.hideModal()
                        }, 500);
                    this.$element.one(t.support.transition.end, function() {
                        clearTimeout(i), e.hideModal()
                    })
                },
                hideModal: function() {
                    var t = this;
                    this.$element.hide(), this.backdrop(function() {
                        t.removeBackdrop(), t.$element.trigger("hidden")
                    })
                },
                removeBackdrop: function() {
                    this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
                },
                backdrop: function(e) {
                    var i = this.$element.hasClass("fade") ? "fade" : "";
                    if (this.isShown && this.options.backdrop) {
                        var n = t.support.transition && i;
                        if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? t.proxy(this.$element[0].focus, this.$element[0]) : t.proxy(this.hide, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
                        n ? this.$backdrop.one(t.support.transition.end, e) : e()
                    } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e) : e()) : e && e()
                }
            };
            var i = t.fn.modal;
            t.fn.modal = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("modal"),
                        s = t.extend({}, t.fn.modal.defaults, n.data(), "object" == typeof i && i);
                    a || n.data("modal", a = new e(this, s)), "string" == typeof i ? a[i]() : s.show && a.show()
                })
            }, t.fn.modal.defaults = {
                backdrop: !0,
                keyboard: !0,
                show: !0
            }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
                return t.fn.modal = i, this
            }, t(document).on("click.modal.data-api", '[data-toggle="modal"]', function(e) {
                var i = t(this),
                    n = i.attr("href"),
                    a = t(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
                    s = a.data("modal") ? "toggle" : t.extend({
                        remote: !/#/.test(n) && n
                    }, a.data(), i.data());
                e.preventDefault(), a.modal(s).one("hide", function() {
                    i.focus()
                })
            })
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(t, e) {
                this.init("tooltip", t, e)
            };
            e.prototype = {
                constructor: e,
                init: function(e, i, n) {
                    var a, s, o, r, l;
                    for (this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.enabled = !0, o = this.options.trigger.split(" "), l = o.length; l--;) r = o[l], "click" == r ? this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)) : "manual" != r && (a = "hover" == r ? "mouseenter" : "focus", s = "hover" == r ? "mouseleave" : "blur", this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, t.proxy(this.leave, this)));
                    this.options.selector ? this._options = t.extend({}, this.options, {
                        trigger: "manual",
                        selector: ""
                    }) : this.fixTitle()
                },
                getOptions: function(e) {
                    return e = t.extend({}, t.fn[this.type].defaults, this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
                        show: e.delay,
                        hide: e.delay
                    }), e
                },
                enter: function(e) {
                    var i, n = t.fn[this.type].defaults,
                        a = {};
                    if (this._options && t.each(this._options, function(t, e) {
                            n[t] != e && (a[t] = e)
                        }, this), i = t(e.currentTarget)[this.type](a).data(this.type), !i.options.delay || !i.options.delay.show) return i.show();
                    clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function() {
                        "in" == i.hoverState && i.show()
                    }, i.options.delay.show)
                },
                leave: function(e) {
                    var i = t(e.currentTarget)[this.type](this._options).data(this.type);
                    if (this.timeout && clearTimeout(this.timeout), !i.options.delay || !i.options.delay.hide) return i.hide();
                    i.hoverState = "out", this.timeout = setTimeout(function() {
                        "out" == i.hoverState && i.hide()
                    }, i.options.delay.hide)
                },
                show: function() {
                    var e, i, n, a, s, o, r = t.Event("show");
                    if (this.hasContent() && this.enabled) {
                        if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                        switch (e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, e.detach().css({
                            top: 0,
                            left: 0,
                            display: "block"
                        }), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element), i = this.getPosition(), n = e[0].offsetWidth, a = e[0].offsetHeight, s) {
                            case "bottom":
                                o = {
                                    top: i.top + i.height,
                                    left: i.left + i.width / 2 - n / 2
                                };
                                break;
                            case "top":
                                o = {
                                    top: i.top - a,
                                    left: i.left + i.width / 2 - n / 2
                                };
                                break;
                            case "left":
                                o = {
                                    top: i.top + i.height / 2 - a / 2,
                                    left: i.left - n
                                };
                                break;
                            case "right":
                                o = {
                                    top: i.top + i.height / 2 - a / 2,
                                    left: i.left + i.width
                                }
                        }
                        this.applyPlacement(o, s), this.$element.trigger("shown")
                    }
                },
                applyPlacement: function(t, e) {
                    var i, n, a, s, o = this.tip(),
                        r = o[0].offsetWidth,
                        l = o[0].offsetHeight;
                    o.offset(t).addClass(e).addClass("in"), i = o[0].offsetWidth, n = o[0].offsetHeight, "top" == e && n != l && (t.top = t.top + l - n, s = !0), "bottom" == e || "top" == e ? (a = 0, t.left < 0 && (a = -2 * t.left, t.left = 0, o.offset(t), i = o[0].offsetWidth, n = o[0].offsetHeight), this.replaceArrow(a - r + i, i, "left")) : this.replaceArrow(n - l, n, "top"), s && o.offset(t)
                },
                replaceArrow: function(t, e, i) {
                    this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
                },
                setContent: function() {
                    var t = this.tip(),
                        e = this.getTitle();
                    t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
                },
                hide: function() {
                    var e = this.tip(),
                        i = t.Event("hide");
                    if (this.$element.trigger(i), !i.isDefaultPrevented()) return e.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? function() {
                        var i = setTimeout(function() {
                            e.off(t.support.transition.end).detach()
                        }, 500);
                        e.one(t.support.transition.end, function() {
                            clearTimeout(i), e.detach()
                        })
                    }() : e.detach(), this.$element.trigger("hidden"), this
                },
                fixTitle: function() {
                    var t = this.$element;
                    (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
                },
                hasContent: function() {
                    return this.getTitle()
                },
                getPosition: function() {
                    var e = this.$element[0];
                    return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
                        width: e.offsetWidth,
                        height: e.offsetHeight
                    }, this.$element.offset())
                },
                getTitle: function() {
                    var t = this.$element,
                        e = this.options;
                    return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
                },
                tip: function() {
                    return this.$tip = this.$tip || t(this.options.template)
                },
                arrow: function() {
                    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
                },
                validate: function() {
                    this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
                },
                enable: function() {
                    this.enabled = !0
                },
                disable: function() {
                    this.enabled = !1
                },
                toggleEnabled: function() {
                    this.enabled = !this.enabled
                },
                toggle: function(e) {
                    var i = e ? t(e.currentTarget)[this.type](this._options).data(this.type) : this;
                    i.tip().hasClass("in") ? i.hide() : i.show()
                },
                destroy: function() {
                    this.hide().$element.off("." + this.type).removeData(this.type)
                }
            };
            var i = t.fn.tooltip;
            t.fn.tooltip = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("tooltip"),
                        s = "object" == typeof i && i;
                    a || n.data("tooltip", a = new e(this, s)), "string" == typeof i && a[i]()
                })
            }, t.fn.tooltip.Constructor = e, t.fn.tooltip.defaults = {
                animation: !0,
                placement: "top",
                selector: !1,
                template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: "hover focus",
                title: "",
                delay: 0,
                html: !1,
                container: !1
            }, t.fn.tooltip.noConflict = function() {
                return t.fn.tooltip = i, this
            }
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(t, e) {
                this.init("popover", t, e)
            };
            e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype, {
                constructor: e,
                setContent: function() {
                    var t = this.tip(),
                        e = this.getTitle(),
                        i = this.getContent();
                    t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](i), t.removeClass("fade top bottom left right in")
                },
                hasContent: function() {
                    return this.getTitle() || this.getContent()
                },
                getContent: function() {
                    var t = this.$element,
                        e = this.options;
                    return ("function" == typeof e.content ? e.content.call(t[0]) : e.content) || t.attr("data-content")
                },
                tip: function() {
                    return this.$tip || (this.$tip = t(this.options.template)), this.$tip
                },
                destroy: function() {
                    this.hide().$element.off("." + this.type).removeData(this.type)
                }
            });
            var i = t.fn.popover;
            t.fn.popover = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("popover"),
                        s = "object" == typeof i && i;
                    a || n.data("popover", a = new e(this, s)), "string" == typeof i && a[i]()
                })
            }, t.fn.popover.Constructor = e, t.fn.popover.defaults = t.extend({}, t.fn.tooltip.defaults, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }), t.fn.popover.noConflict = function() {
                return t.fn.popover = i, this
            }
        }(window.jQuery),
        function(t) {
            "use strict";

            function e(e, i) {
                var n, a = t.proxy(this.process, this),
                    s = t(t(e).is("body") ? window : e);
                this.options = t.extend({}, t.fn.scrollspy.defaults, i), this.$scrollElement = s.on("scroll.scroll-spy.data-api", a), this.selector = (this.options.target || (n = t(e).attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = t("body"), this.refresh(), this.process()
            }
            e.prototype = {
                constructor: e,
                refresh: function() {
                    var e = this;
                    this.offsets = t([]), this.targets = t([]), this.$body.find(this.selector).map(function() {
                        var i = t(this),
                            n = i.data("target") || i.attr("href"),
                            a = /^#\w/.test(n) && t(n);
                        return a && a.length && [
                            [a.position().top + (!t.isWindow(e.$scrollElement.get(0)) && e.$scrollElement.scrollTop()), n]
                        ] || null
                    }).sort(function(t, e) {
                        return t[0] - e[0]
                    }).each(function() {
                        e.offsets.push(this[0]), e.targets.push(this[1])
                    })
                },
                process: function() {
                    var t, e = this.$scrollElement.scrollTop() + this.options.offset,
                        i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                        n = i - this.$scrollElement.height(),
                        a = this.offsets,
                        s = this.targets,
                        o = this.activeTarget;
                    if (e >= n) return o != (t = s.last()[0]) && this.activate(t);
                    for (t = a.length; t--;) o != s[t] && e >= a[t] && (!a[t + 1] || e <= a[t + 1]) && this.activate(s[t])
                },
                activate: function(e) {
                    var i, n;
                    this.activeTarget = e, t(this.selector).parent(".active").removeClass("active"), n = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', i = t(n).parent("li").addClass("active"), i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate")
                }
            };
            var i = t.fn.scrollspy;
            t.fn.scrollspy = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("scrollspy"),
                        s = "object" == typeof i && i;
                    a || n.data("scrollspy", a = new e(this, s)), "string" == typeof i && a[i]()
                })
            }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.defaults = {
                offset: 10
            }, t.fn.scrollspy.noConflict = function() {
                return t.fn.scrollspy = i, this
            }, t(window).on("load", function() {
                t('[data-spy="scroll"]').each(function() {
                    var e = t(this);
                    e.scrollspy(e.data())
                })
            })
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(e) {
                this.element = t(e)
            };
            e.prototype = {
                constructor: e,
                show: function() {
                    var e, i, n, a = this.element,
                        s = a.closest("ul:not(.dropdown-menu)"),
                        o = a.attr("data-target");
                    o || (o = a.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), a.parent("li").hasClass("active") || (e = s.find(".active:last a")[0], n = t.Event("show", {
                        relatedTarget: e
                    }), a.trigger(n), n.isDefaultPrevented() || (i = t(o), this.activate(a.parent("li"), s), this.activate(i, i.parent(), function() {
                        a.trigger({
                            type: "shown",
                            relatedTarget: e
                        })
                    })))
                },
                activate: function(e, i, n) {
                    function a() {
                        s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), o ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
                    }
                    var s = i.find("> .active"),
                        o = n && t.support.transition && s.hasClass("fade");
                    o ? s.one(t.support.transition.end, a) : a(), s.removeClass("in")
                }
            };
            var i = t.fn.tab;
            t.fn.tab = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("tab");
                    a || n.data("tab", a = new e(this)), "string" == typeof i && a[i]()
                })
            }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
                return t.fn.tab = i, this
            }, t(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
                e.preventDefault(), t(this).tab("show")
            })
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(e, i) {
                this.$element = t(e), this.options = t.extend({}, t.fn.typeahead.defaults, i), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = t(this.options.menu), this.shown = !1, this.listen()
            };
            e.prototype = {
                constructor: e,
                select: function() {
                    var t = this.$menu.find(".active").attr("data-value");
                    return this.$element.val(this.updater(t)).change(), this.hide()
                },
                updater: function(t) {
                    return t
                },
                show: function() {
                    var e = t.extend({}, this.$element.position(), {
                        height: this.$element[0].offsetHeight
                    });
                    return this.$menu.insertAfter(this.$element).css({
                        top: e.top + e.height,
                        left: e.left
                    }).show(), this.shown = !0, this
                },
                hide: function() {
                    return this.$menu.hide(), this.shown = !1, this
                },
                lookup: function(e) {
                    var i;
                    return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (i = t.isFunction(this.source) ? this.source(this.query, t.proxy(this.process, this)) : this.source, i ? this.process(i) : this)
                },
                process: function(e) {
                    var i = this;
                    return e = t.grep(e, function(t) {
                        return i.matcher(t)
                    }), e = this.sorter(e), e.length ? this.render(e.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
                },
                matcher: function(t) {
                    return ~t.toLowerCase().indexOf(this.query.toLowerCase())
                },
                sorter: function(t) {
                    for (var e, i = [], n = [], a = []; e = t.shift();) e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? n.push(e) : a.push(e) : i.push(e);
                    return i.concat(n, a)
                },
                highlighter: function(t) {
                    var e = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                    return t.replace(new RegExp("(" + e + ")", "ig"), function(t, e) {
                        return "<strong>" + e + "</strong>"
                    })
                },
                render: function(e) {
                    var i = this;
                    return e = t(e).map(function(e, n) {
                        return e = t(i.options.item).attr("data-value", n), e.find("a").html(i.highlighter(n)), e[0]
                    }), e.first().addClass("active"), this.$menu.html(e), this
                },
                next: function(e) {
                    var i = this.$menu.find(".active").removeClass("active"),
                        n = i.next();
                    n.length || (n = t(this.$menu.find("li")[0])), n.addClass("active")
                },
                prev: function(t) {
                    var e = this.$menu.find(".active").removeClass("active"),
                        i = e.prev();
                    i.length || (i = this.$menu.find("li").last()), i.addClass("active")
                },
                listen: function() {
                    this.$element.on("focus", t.proxy(this.focus, this)).on("blur", t.proxy(this.blur, this)).on("keypress", t.proxy(this.keypress, this)).on("keyup", t.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", t.proxy(this.keydown, this)), this.$menu.on("click", t.proxy(this.click, this)).on("mouseenter", "li", t.proxy(this.mouseenter, this)).on("mouseleave", "li", t.proxy(this.mouseleave, this))
                },
                eventSupported: function(t) {
                    var e = t in this.$element;
                    return e || (this.$element.setAttribute(t, "return;"), e = "function" == typeof this.$element[t]), e
                },
                move: function(t) {
                    if (this.shown) {
                        switch (t.keyCode) {
                            case 9:
                            case 13:
                            case 27:
                                t.preventDefault();
                                break;
                            case 38:
                                t.preventDefault(), this.prev();
                                break;
                            case 40:
                                t.preventDefault(), this.next()
                        }
                        t.stopPropagation()
                    }
                },
                keydown: function(e) {
                    this.suppressKeyPressRepeat = ~t.inArray(e.keyCode, [40, 38, 9, 13, 27]), this.move(e)
                },
                keypress: function(t) {
                    this.suppressKeyPressRepeat || this.move(t)
                },
                keyup: function(t) {
                    switch (t.keyCode) {
                        case 40:
                        case 38:
                        case 16:
                        case 17:
                        case 18:
                            break;
                        case 9:
                        case 13:
                            if (!this.shown) return;
                            this.select();
                            break;
                        case 27:
                            if (!this.shown) return;
                            this.hide();
                            break;
                        default:
                            this.lookup()
                    }
                    t.stopPropagation(), t.preventDefault()
                },
                focus: function(t) {
                    this.focused = !0
                },
                blur: function(t) {
                    this.focused = !1, !this.mousedover && this.shown && this.hide()
                },
                click: function(t) {
                    t.stopPropagation(), t.preventDefault(), this.select(), this.$element.focus()
                },
                mouseenter: function(e) {
                    this.mousedover = !0, this.$menu.find(".active").removeClass("active"), t(e.currentTarget).addClass("active")
                },
                mouseleave: function(t) {
                    this.mousedover = !1, !this.focused && this.shown && this.hide()
                }
            };
            var i = t.fn.typeahead;
            t.fn.typeahead = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("typeahead"),
                        s = "object" == typeof i && i;
                    a || n.data("typeahead", a = new e(this, s)), "string" == typeof i && a[i]()
                })
            }, t.fn.typeahead.defaults = {
                source: [],
                items: 8,
                menu: '<ul class="typeahead dropdown-menu"></ul>',
                item: '<li><a href="#"></a></li>',
                minLength: 1
            }, t.fn.typeahead.Constructor = e, t.fn.typeahead.noConflict = function() {
                return t.fn.typeahead = i, this
            }, t(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(e) {
                var i = t(this);
                i.data("typeahead") || i.typeahead(i.data())
            })
        }(window.jQuery),
        function(t) {
            "use strict";
            var e = function(e, i) {
                this.options = t.extend({}, t.fn.affix.defaults, i), this.$window = t(window).on("scroll.affix.data-api", t.proxy(this.checkPosition, this)).on("click.affix.data-api", t.proxy(function() {
                    setTimeout(t.proxy(this.checkPosition, this), 1)
                }, this)), this.$element = t(e), this.checkPosition()
            };
            e.prototype.checkPosition = function() {
                if (this.$element.is(":visible")) {
                    var e, i = t(document).height(),
                        n = this.$window.scrollTop(),
                        a = this.$element.offset(),
                        s = this.options.offset,
                        o = s.bottom,
                        r = s.top;
                    "object" != typeof s && (o = r = s), "function" == typeof r && (r = s.top()), "function" == typeof o && (o = s.bottom()), e = !(null != this.unpin && n + this.unpin <= a.top) && (null != o && a.top + this.$element.height() >= i - o ? "bottom" : null != r && n <= r && "top"), this.affixed !== e && (this.affixed = e, this.unpin = "bottom" == e ? a.top - n : null, this.$element.removeClass("affix affix-top affix-bottom").addClass("affix" + (e ? "-" + e : "")))
                }
            };
            var i = t.fn.affix;
            t.fn.affix = function(i) {
                return this.each(function() {
                    var n = t(this),
                        a = n.data("affix"),
                        s = "object" == typeof i && i;
                    a || n.data("affix", a = new e(this, s)), "string" == typeof i && a[i]()
                })
            }, t.fn.affix.Constructor = e, t.fn.affix.defaults = {
                offset: 0
            }, t.fn.affix.noConflict = function() {
                return t.fn.affix = i, this
            }, t(window).on("load", function() {
                t('[data-spy="affix"]').each(function() {
                    var e = t(this),
                        i = e.data();
                    i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i)
                })
            })
        }(window.jQuery)
    }),
    function(t) {
        "function" == typeof define && define.amd ? define("core/common/data.jcalendar", ["jquery"], t) : t(jQuery)
    }(function(t) {
        var e = !0,
            i = t('<div class="cal-wrap" style="z-index:30000;display:none;position: absolute;left: 23px;top: 23px; "><div class="cal"><div class="cal-top"><a href="javascript:void(0);" class="first"></a><a href="javascript:void(0);" class="prev"></a><div class="month"><input type="text" value="" readonly="readonly" disabled="disabled"/><ul class="time-list"><li>一月</li><li>二月</li><li>三月</li><li>四月</li><li>五月</li><li>六月</li><li>七月</li><li>八月</li><li>九月</li><li>十月</li><li>十一月</li><li>十二月</li></ul></div><div class="year"><input type="text" value="" readonly="readonly" disabled="disabled"/><div class="time-list"><ul class="clearfix"><li>2016</li></ul><div class="time-list-ft"><a href="javascript:void(0);" class="fl">←</a><a href="javascript:void(0);" class="fr">→</a><a href="javascript:void(0);" class="close">×</a></div></div></div><a href="javascript:void(0);" class="last"></a><a href="javascript:void(0);" class="next"></a></div><ul class="cal-week"><li><b>日</b></li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li><b>六</b></li></ul><div class="cal-cm"></div></div><div class="cal cal-right"><div class="cal-top"><a href="javascript:void(0);" class="last"></a><a href="javascript:void(0);" class="next"></a><div class="year"><input type="text" value="" readonly="readonly" disabled="disabled"/><div class="time-list"><ul class="clearfix"><li>2016</li></ul><div class="time-list-ft"><a href="javascript:void(0);" class="fl">←</a><a href="javascript:void(0);" class="fr">→</a><a href="javascript:void(0);" class="close">×</a></div></div></div><div class="month"><input type="text" value="" readonly="readonly" disabled="disabled"/><ul class="time-list"><li>一月</li><li>二月</li><li>三月</li><li>四月</li><li>五月</li><li>六月</li><li>七月</li><li>八月</li><li>九月</li><li>十月</li><li>十一月</li><li>十二月</li></ul></div></div><ul class="cal-week"><li><b>日</b></li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li><b>六</b></li></ul><div class="cal-cm"></div></div><div class="cal-ft"><a href="javascript:void(0);" class="cal-btn">今天</a></div></div>'),
            n = t(i);
        t(document.body).append(n);
        var a = n.find("div"),
            s = n.find("a"),
            o = n.find("input"),
            r = n.find("ul");
        t.jcalendar = function(i, l) {
            function c(t) {
                return document.createElement(t)
            }

            function d(t, e, i, n) {
                var a = new w(new Date(t, e, 1)),
                    s = new w(new Date(i, n, 1));
                Z.init(a, 0), X.draw(1), Z.init(s, 1), X.draw(0), X.resetYM(a, s)
            }

            function h(t) {
                return t = $ ? t.replace($, "") : t, t = T ? t.replace(T, "") : t
            }

            function u() {
                Y[0] && t(Y[1]).attr("class") == Y[2] && p(n, Y[3], !1), f() ? n[0].children[2].children[0].style.color = N : n[0].children[2].children[0].style.color = "#297405", v(n, t(b).val())
            }

            function f() {
                var t = new Date(S),
                    e = new Date(M),
                    i = new Date,
                    n = new Date(i.getFullYear(), i.getMonth(), i.getDate());
                return n > e || n < t
            }

            function p(t, e, i) {
                e = h(e);
                var n = t[0].children[0].children[0].children[3].children[0].value,
                    a = g(t[0].children[0].children[0].children[2].children[0].value),
                    s = t[0].children[0].children[2].children,
                    o = t[0].children[1].children[2].children;
                for (var r in s)
                    if (s[r].children) {
                        var l = s[r].children[0].numHTML,
                            c = new Date(n, a - 1, l),
                            d = new Date(e.substring(0, 4), e.substring(5, 7) - 1, e.substring(8, 10)),
                            u = i ? c < d : c > d;
                        u && (s[r].children[0].style.color = N, "2" == H && (s[r].children[1].style.color = N), s[r].onclick = null, s[r].style.cursor = "auto")
                    } for (var r in o)
                    if (o[r].children) {
                        var l = o[r].children[0].numHTML,
                            c = new Date(n, a, l),
                            d = new Date(e.substring(0, 4), e.substring(5, 7) - 1, e.substring(8, 10)),
                            u = i ? c < d : c > d;
                        u && (o[r].children[0].style.color = N, "2" == H && (s[r].children[1].style.color = N), o[r].onclick = null, o[r].style.cursor = "auto")
                    }
            }

            function v(t, e) {
                if ((e = h(e)) && e.length >= 10) {
                    e = e.substring(0, 10);
                    var i = t[0].children[0].children[0].children[3].children[0].value,
                        n = g(t[0].children[0].children[0].children[2].children[0].value),
                        a = t[0].children[0].children[2].children,
                        s = t[0].children[1].children[2].children;
                    for (var o in a)
                        if (a[o].children) {
                            var r = a[o].children[0].numHTML,
                                l = new Date(i, n - 1, r),
                                c = new Date(e.substring(0, 4), e.substring(5, 7) - 1, e.substring(8, 10));
                            l.getTime() == c.getTime() ? (a[o].style.border = "1px solid #a5b9da", a[o].style.background = j) : (a[o].style.border = "", a[o].style.background = "")
                        } for (var o in s)
                        if (s[o].children) {
                            var r = s[o].children[0].numHTML,
                                l = new Date(i, n, r),
                                c = new Date(e.substring(0, 4), e.substring(5, 7) - 1, e.substring(8, 10));
                            l.getTime() == c.getTime() ? (s[o].style.border = "1px solid #a5b9da", s[o].style.background = j) : (s[o].style.border = "", s[o].style.background = "")
                        }
                }
            }

            function g(t) {
                return "一月" == t ? 1 : "二月" == t ? 2 : "三月" == t ? 3 : "四月" == t ? 4 : "五月" == t ? 5 : "六月" == t ? 6 : "七月" == t ? 7 : "八月" == t ? 8 : "九月" == t ? 9 : "十月" == t ? 10 : "十一月" == t ? 11 : "十二月" == t ? 12 : t
            }

            function m(t) {
                var e = r[t].children;
                for (var i in e)
                    if (e[i].innerHTML) {
                        var n = 0 == t ? o[1].value : o[2].value,
                            a = g(e[i].innerHTML),
                            s = S.substring(0, 4),
                            l = Number(S.substring(5, 7)),
                            c = M.substring(0, 4),
                            d = Number(M.substring(5, 7));
                        n < s || n > c || n == s && a < l || n == c && a > d ? (e[i].style.color = N, e[i].style.cursor = "auto") : (e[i].style.color = q, e[i].style.cursor = "pointer")
                    }
            }

            function y(t, e) {
                r[t].innerHTML = "";
                for (var i = "", n = e - 5; n <= e + 4; n++) n < S.substring(0, 4) || n > M.substring(0, 4) ? i += '<li style="color: ' + N + ';cursor:auto;">' + n + "</li>" : i += '<li style="color: ' + q + ';cursor:pointer;">' + n + "</li>";
                r[t].innerHTML = i;
                var s = 1 == t ? a[5] : a[11];
                if (Number(r[t].children[0].innerHTML) - 1 < S.substring(0, 4) ? (s.children[0].style.color = N, s.children[0].style.cursor = "auto") : (s.children[0].style.color = q, s.children[0].style.cursor = "pointer"), Number(r[t].children[9].innerHTML) + 1 > M.substring(0, 4) ? (s.children[1].style.color = N, s.children[1].style.cursor = "auto") : (s.children[1].style.color = q, s.children[1].style.cursor = "pointer"), 3 == t) var l = r[3].parentElement.getElementsByTagName("li");
                else if (1 == t) var l = a[4].getElementsByTagName("li");
                for (var c = 0; c < l.length; c++) l[c].innerHTML < S.substring(0, 4) || l[c].innerHTML > M.substring(0, 4) ? l[c].onclick = function() {
                    a[4].style.display = "none", a[10].style.display = "none"
                } : l[c].onclick = function() {
                    var e = this.innerHTML,
                        i = 3 == t ? g(o[3].value) + "" : g(o[0].value) + "";
                    i = 1 == i.length ? "0" + i : i, 3 == t ? (d(e, i - 2, e, i - 1), r[3].parentElement.style.display = "none") : 1 == t && (d(e, i - 1, e, i), a[4].style.display = "none"), u()
                }
            }

            function w(t) {
                function e(t, e) {
                    return new Date(31556925974.7 * (t - 1900) + 6e4 * G[e] + Date.UTC(1900, 0, 6, 2, 5)).getUTCDate()
                }

                function i(t) {
                    var e, i = 348;
                    for (e = 32768; e > 8; e >>= 1) i += B[t - 1900] & e ? 1 : 0;
                    return i + n(t)
                }

                function n(t) {
                    return a(t) ? 65536 & B[t - 1900] ? 30 : 29 : 0
                }

                function a(t) {
                    return 15 & B[t - 1900]
                }

                function s(t, e) {
                    return B[t - 1900] & 65536 >> e ? 30 : 29
                }

                function o(t) {
                    var e, o = 0,
                        r = 0,
                        l = new Date(1900, 0, 31),
                        c = (t - l) / 864e5;
                    for (this.dayCyl = c + 40, this.monCyl = 14, e = 1900; e < 2050 && c > 0; e++) r = i(e), c -= r, this.monCyl += 12;
                    for (c < 0 && (c += r, e--, this.monCyl -= 12), this.year = e, this.yearCyl = e - 1864, o = a(e), this.isLeap = !1, e = 1; e < 13 && c > 0; e++) o > 0 && e == o + 1 && 0 == this.isLeap ? (--e, this.isLeap = !0, r = n(this.year)) : r = s(this.year, e), 1 == this.isLeap && e == o + 1 && (this.isLeap = !1), c -= r, 0 == this.isLeap && this.monCyl++;
                    0 == c && o > 0 && e == o + 1 && (this.isLeap ? this.isLeap = !1 : (this.isLeap = !0, --e, --this.monCyl)), c < 0 && (c += r, --e, --this.monCyl), this.month = e, this.day = c + 1
                }

                function r(t) {
                    return t < 10 ? "0" + t : t
                }

                function l(t, e) {
                    var i = t;
                    return e.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g, function(t) {
                        switch (t) {
                            case "yyyy":
                                var e = "000" + i.getFullYear();
                                return e.substring(e.length - 4);
                            case "dd":
                                return r(i.getDate());
                            case "d":
                                return 1 == i.getDate().toString().length ? "0" + i.getDate().toString() : i.getDate().toString();
                            case "MM":
                                return r(i.getMonth() + 1);
                            case "M":
                                return 1 == (i.getMonth() + 1).toString().length ? "0" + (i.getMonth() + 1).toString() : (i.getMonth() + 1).toString()
                        }
                    })
                }
                this.date = t, this.isToday = !1, this.isRestDay = !1, this.solarYear = l(t, "yyyy"), this.solarMonth = l(t, "MM"), this.solarDate = l(t, "dd"), this.calendarDate = new Date(this.solarYear, this.solarMonth - 1, this.solarDate), this.solarWeekDay = t.getDay(), this.solarWeekDayInChinese = "星期" + z.charAt(this.solarWeekDay);
                var c = new o(t);
                this.lunarYear = c.year, this.lunarMonth = c.month, this.lunarIsLeapMonth = c.isLeap, this.lunarMonthInChinese = this.lunarIsLeapMonth ? "闰" + Q[c.month - 1] : Q[c.month - 1], this.lunarDate = c.day, this.showInLunar = this.lunarDateInChinese = function(t, e) {
                    var i;
                    switch (e) {
                        case 10:
                            i = "初十";
                            break;
                        case 20:
                            i = "二十";
                            break;
                        case 30:
                            i = "三十";
                            break;
                        default:
                            i = R.charAt(Math.floor(e / 10)), i += z.charAt(e % 10)
                    }
                    return i
                }(this.lunarMonth, this.lunarDate), 1 == this.lunarDate && (this.showInLunar = this.lunarMonthInChinese + "月"), this.jieqi = "", this.restDays = 0, e(this.solarYear, 2 * (this.solarMonth - 1)) == l(t, "d") && (this.showInLunar = this.jieqi = W[2 * (this.solarMonth - 1)]), e(this.solarYear, 2 * (this.solarMonth - 1) + 1) == l(t, "d") && (this.showInLunar = this.jieqi = W[2 * (this.solarMonth - 1) + 1]), "清明" == this.showInLunar && (this.showInLunar = "清明", this.restDays = 1), this.solarFestival = V[l(t, "MM") + l(t, "dd")], void 0 === this.solarFestival ? this.solarFestival = "" : /\*(\d)/.test(this.solarFestival) && (this.restDays = parseInt(RegExp.$1), this.solarFestival = this.solarFestival.replace(/\*\d/, "")), this.showInLunar = "" == this.solarFestival ? this.showInLunar : this.solarFestival, this.lunarFestival = K[this.lunarIsLeapMonth ? "00" : r(this.lunarMonth) + r(this.lunarDate)], void 0 === this.lunarFestival ? this.lunarFestival = "" : /\*(\d)/.test(this.lunarFestival) && (this.restDays = this.restDays > parseInt(RegExp.$1) ? this.restDays : parseInt(RegExp.$1), this.lunarFestival = this.lunarFestival.replace(/\*\d/, "")), 12 == this.lunarMonth && this.lunarDate == s(this.lunarYear, 12) && (this.lunarFestival = K["0100"], this.restDays = 1), this.showInLunar = "" == this.lunarFestival ? this.showInLunar : this.lunarFestival, this.showInLunar = this.showInLunar.length > 4 ? this.showInLunar.substr(0, 2) + "..." : this.showInLunar, "清明" == this.showInLunar && (this.solarFestival = "清明")
            }
            var _ = this;
            _.$el = t(i), _.el = i, _.options = t.extend({}, t.jcalendar.defaultOptions, l);
            var b = _.el.selector,
                k = {
                    closeView: _.options.closeCalendar
                },
                D = _.options.onpicked;
            t(b)[0].onchange = D;
            var C = _.options.isSingle,
                x = _.options.showFormat,
                $ = _.options.formatBeforeInfo,
                T = _.options.formatAfterInfo,
                S = _.options.startDate;
            S = S || "1901-01-01";
            var M = _.options.endDate;
            M = M || "2050-12-31", S = S.substring(0, 4) + "/" + S.substring(5, 7) + "/" + S.substring(8, 10), M = M.substring(0, 4) + "/" + M.substring(5, 7) + "/" + M.substring(8, 10);
            var L = _.options.isTodayBlock,
                j = _.options.todayClickColor,
                N = _.options.noClickColor,
                I = _.options.restColor,
                O = _.options.noRestColor,
                q = _.options.clickByYearMonth,
                F = _.options.lunarColor,
                H = _.options.isTwoRows,
                E = _.options.isYearMonthDisabled,
                Y = _.options.condition,
                U = {
                    "2018-09-29": "班",
                    "2018-09-30": "班"
                },
                J = {
                    "2018-09-22": "休",
                    "2018-09-23": "休",
                    "2018-09-24": "休",
                    "2018-10-01": "休",
                    "2018-10-02": "休",
                    "2018-10-03": "休",
                    "2018-10-04": "休",
                    "2018-10-05": "休",
                    "2018-10-06": "休",
                    "2018-10-07": "休"
                };
            document.onclick = function(t) {
                e || (n.hide(), k.closeView())
            }, t(b).mouseout(function() {
                e = !1
            }), t(b).mouseover(function() {
                e = !0
            }), n.mouseover(function() {
                t(b).unbind("blur")
            }), n.click(function(t) {
                t.stopPropagation(), e = !1
            }), n.mouseout(function() {
                t(b).bind("blur", function() {
                    n.hide()
                })
            }), a[14].onclick = function() {
                if (!f()) {
                    var e = new Date,
                        i = e.getFullYear(),
                        a = e.getMonth() + 1;
                    a >= 1 && a <= 9 && (a = "0" + a);
                    var s = e.getDate();
                    s >= 0 && s <= 9 && (s = "0" + s);
                    var o = i + "-" + a + "-" + s,
                        r = x ? o : o + " " + A[e.getDay()];
                    r = $ ? $ + r : r, r = T ? r + T : r, t(b).val(r), t(b).change(), n.hide()
                }
            }, s[0].onclick = function() {
                var t = o[1].value,
                    e = g(o[0].value),
                    i = new Date(t - 1, e, 1),
                    n = new Date(i.getTime() - 864e5);
                if (new Date(n.getFullYear(), Number(n.getMonth()), n.getDate()) >= new Date(S)) d(t - 1, e - 1, t - 1, e);
                else {
                    var i = new Date(S);
                    d(i.getFullYear(), i.getMonth(), i.getFullYear(), i.getMonth() + 1)
                }
                u()
            }, s[1].onclick = function() {
                var t = o[1].value,
                    e = g(o[0].value),
                    i = new Date(t, e - 1, 1),
                    n = new Date(i.getTime() - 864e5);
                new Date(n.getFullYear(), Number(n.getMonth()), n.getDate()) >= new Date(S) && d(t, e - 2, t, e - 1), u()
            }, s[6].onclick = function() {
                var t = o[1].value,
                    e = g(o[0].value);
                t == M.substring(0, 4) && e == M.substring(5, 7) || d(t, e, t, Number(e) + 1), u()
            }, s[5].onclick = function() {
                var t = o[1].value,
                    e = g(o[0].value);
                if (t < M.substring(0, 4)) d(Number(t) + 1, e - 1, Number(t) + 1, e);
                else {
                    var i = new Date(M);
                    d(i.getFullYear(), i.getMonth(), i.getFullYear(), i.getMonth() + 1)
                }
                u()
            }, s[8].onclick = function() {
                var t = o[2].value,
                    e = g(o[3].value);
                new Date(t, e - 1, 1) <= new Date(M) && d(t, e - 1, t, e), u()
            }, s[7].onclick = function() {
                var t = o[1].value,
                    e = g(o[0].value);
                if (t < M.substring(0, 4)) d(Number(t) + 1, e - 1, Number(t) + 1, e);
                else {
                    var i = new Date(M);
                    d(i.getFullYear(), i.getMonth(), i.getFullYear(), i.getMonth() + 1)
                }
                u()
            };
            var P = new Array("", "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "一月"),
                A = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"),
                B = (-1 != navigator.userAgent.indexOf("MSIE") && window.opera, [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42448, 83315, 21200, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46496, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448]),
                W = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
                G = [0, 21208, 43467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758],
                z = "日一二三四五六七八九十",
                Q = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"],
                R = "初十廿卅",
                V = {
                    "0101": "*1元旦",
                    "0501": "*1劳动",
                    1001: "*7国庆"
                },
                K = {
                    "0101": "*6春节",
                    "0115": "*1元宵",
                    "0505": "*1端午",
                    "0815": "*1中秋",
                    "0100": "除夕"
                },
                Z = function() {
                    function t(t) {
                        return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
                    }

                    function e(e, i) {
                        return [31, t(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][i]
                    }

                    function i(t, e) {
                        return t.setDate(t.getDate() + e), t
                    }

                    function n(t, n) {
                        var s = t.solarMonth - 2;
                        0 == t.solarMonth ? s = 11 : 1 == t.solarMonth && (s = 10);
                        var o = new w(new Date(t.solarYear, s, 1)),
                            r = o.solarWeekDay,
                            l = new w(new Date(t.solarYear, t.solarMonth, 1)),
                            c = l.solarWeekDay,
                            d = 0,
                            h = new w(new Date(t.solarYear, t.solarMonth - 1, 1)),
                            u = h.solarWeekDay;
                        if (C) a.lines = Math.ceil((u + e(t.solarYear, t.solarMonth - 1)) / 7);
                        else if (0 == n) {
                            var f = Math.ceil((u + e(t.solarYear, t.solarMonth - 1)) / 7),
                                p = Math.ceil((c + e(t.solarYear, 12 == Number(t.solarMonth) ? 0 : Number(t.solarMonth))) / 7);
                            a.lines = f > p ? f : p
                        } else if (1 == n) {
                            var f = Math.ceil((u + e(t.solarYear, t.solarMonth - 1)) / 7),
                                p = Math.ceil((r + e(t.solarYear, s)) / 7);
                            a.lines = f > p ? f : p
                        } else a.lines = 6;
                        for (var v = 0; v < a.dateArray.length; v++)
                            if (0 != h.restDays && (d = h.restDays), d > 0 && (h.isRest = !0), u-- > 0 || h.solarMonth != t.solarMonth) a.dateArray[v] = null;
                            else {
                                var n = new w(new Date);
                                h.solarYear == n.solarYear && h.solarMonth == n.solarMonth && h.solarDate == n.solarDate && (h.isToday = !0), a.dateArray[v] = h, h = new w(i(h.date, 1)), d--
                            }
                    }
                    var a = {};
                    return a.lines = 0, a.dateArray = new Array(42), {
                        init: function(t, e) {
                            n(t, e)
                        },
                        getJson: function() {
                            return a
                        }
                    }
                }(),
                X = function() {
                    function e(e) {
                        var i = 1 == e ? a[6] : a[13],
                            s = Z.getJson(),
                            o = s.dateArray,
                            r = "2" == H ? 38 : 24;
                        i.style.height = s.lines * r + 2 + "px", i.innerHTML = "";
                        for (var l = 0; l < o.length; l++)
                            if (null != o[l]) {
                                var d = o[l].solarYear + "-" + o[l].solarMonth + "-" + o[l].solarDate,
                                    h = x ? d : d + " " + o[l].solarWeekDayInChinese;
                                h = $ ? $ + h : h, h = T ? h + T : h;
                                var u = c("DIV");
                                o[l].isToday && (u.style.border = "1px solid #a5b9da", u.style.background = j), u.className = "cell", "2" == H && (u.style.height = "36px"), u.style.left = l % 7 == 0 ? "0px" : l % 7 * 42 + 3 + "px", u.style.top = Math.floor(l / 7) * r + 5 + "px", o[l].calendarDate >= new Date(S) && o[l].calendarDate <= new Date(M) && (u.onclick = function(e) {
                                    return function() {
                                        t(b).val(e), n.hide(), t(b).change()
                                    }
                                }(h), u.style.cursor = "pointer");
                                var f = c("DIV");
                                f.className = "so", f.style.color = l % 7 == 0 || l % 7 == 6 || o[l].isRest || o[l].isToday ? I : O, o[l].calendarDate >= new Date(S) && o[l].calendarDate <= new Date(M) || (f.style.color = N), "3" == H ? (o[l].solarFestival ? f.innerHTML = o[l].solarFestival : o[l].lunarFestival ? f.innerHTML = o[l].lunarFestival : o[l].isToday ? f.innerHTML = "今天" : f.innerHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate, f.numHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate) : (f.innerHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate, f.numHTML = "0" == o[l].solarDate.substring(0, 1) ? o[l].solarDate.substring(1) : o[l].solarDate);
                                var p = c("SPAN");
                                if (p.className = "holiday", U[d] ? (p.innerHTML = U[d], u.appendChild(p)) : J[d] && (p.innerHTML = J[d], u.appendChild(p)), u.appendChild(f), "2" == H) {
                                    var v = c("DIV");
                                    o[l].calendarDate >= new Date(S) && o[l].calendarDate <= new Date(M) ? v.style.color = F : v.style.color = N, v.innerHTML = o[l].showInLunar, u.appendChild(v)
                                }
                                i.appendChild(u)
                            }
                    }
                    return {
                        draw: function(t) {
                            0 == t ? e(t) : 1 == t ? e(1) : (e(t), e(1))
                        },
                        resetYM: function(t, e) {
                            o[0].value = P[Number(t.solarMonth)], o[1].value = t.solarYear, o[2].value = e.solarYear, o[3].value = P[Number(e.solarMonth)]
                        }
                    }
                }(),
                tt = new w(new Date);
            if (Z.init(tt, 0), X.draw(1), C) n[0].className = "cal-wrap cal-one";
            else {
                s[6].style.display = "none", s[5].style.display = "none";
                var et = new Date,
                    it = new w(new Date(et.getFullYear(), et.getMonth() + 1, et.getDate()));
                Z.init(it, 1), X.draw(0)
            }
            if (L || (a[14].style.display = "none"), E) {
                s[2].onclick = function() {
                    if (r[1].getElementsByTagName("li")[0].innerHTML < 1902 || "auto" == this.style.cursor) return void(a[4].style.display = "none");
                    y(1, r[1].getElementsByTagName("li")[0].innerHTML - 5)
                }, s[3].onclick = function() {
                    if (r[1].getElementsByTagName("li")[0].innerHTML > 2040 || "auto" == this.style.cursor) return void(a[4].style.display = "none");
                    y(1, Number(r[1].getElementsByTagName("li")[0].innerHTML) + 15)
                }, s[4].onclick = function() {
                    r[1].parentElement.style.display = "none"
                }, s[9].onclick = function() {
                    if (r[3].getElementsByTagName("li")[0].innerHTML < 1902 || "auto" == this.style.cursor) return void(a[10].style.display = "none");
                    y(3, r[3].getElementsByTagName("li")[0].innerHTML - 5)
                }, s[10].onclick = function() {
                    if (r[3].getElementsByTagName("li")[0].innerHTML > 2040 || "auto" == this.style.cursor) return void(a[10].style.display = "none");
                    y(3, Number(r[3].getElementsByTagName("li")[0].innerHTML) + 15)
                }, s[11].onclick = function() {
                    r[3].parentElement.style.display = "none"
                }, o[0].onfocus = function() {
                    r[0].style.display = "block", m(0), a[4].style.display = "none"
                }, o[0].onblur = function() {
                    r[0].style.display = "none"
                };
                for (var nt = r[0].getElementsByTagName("li"), at = 0; at < nt.length; at++) nt[at].onclick = function() {
                    if ("auto" == this.style.cursor) return r[0].style.display = "none", void(r[4].style.display = "none");
                    var t = o[1].value,
                        e = g(this.innerHTML) + "";
                    e = 1 == e.length ? "0" + e : e, d(t, e - 1, t, e), r[0].style.display = "none", u()
                };
                m(0), o[1].onfocus = function() {
                    y(1, Number(o[1].value)), a[4].style.display = "block"
                }, o[1].onblur = function() {
                    a[4].style.display = "none"
                }, a[4].onmouseover = function() {
                    o[1].onblur = function() {}
                }, a[4].onmouseout = function() {
                    o[1].onblur = function() {
                        a[4].style.display = "none"
                    }
                }, r[0].onmouseover = function() {
                    o[0].onblur = function() {}
                }, r[0].onmouseout = function() {
                    o[0].onblur = function() {
                        r[0].style.display = "none"
                    }
                }, o[3].onfocus = function() {
                    m(4), r[4].style.display = "block", a[10].style.display = "none"
                }, o[3].onblur = function() {
                    r[4].style.display = "none"
                };
                for (var st = r[4].getElementsByTagName("li"), at = 0; at < st.length; at++) st[at].onclick = function() {
                    if ("auto" == this.style.cursor) return r[0].style.display = "none", void(r[4].style.display = "none");
                    var t = o[2].value,
                        e = g(this.innerHTML) + "";
                    e = 1 == e.length ? "0" + e : e, d(t, e - 2, t, e - 1), r[4].style.display = "none", u()
                };
                m(4), o[2].onfocus = function() {
                    y(3, Number(o[2].value)), a[10].style.display = "block"
                }, o[2].onblur = function() {
                    a[10].style.display = "none"
                }, a[10].onmouseover = function() {
                    o[2].onblur = function() {}
                }, a[10].onmouseout = function() {
                    o[2].onblur = function() {
                        a[10].style.display = "none"
                    }
                }, r[4].onmouseover = function() {
                    o[3].onblur = function() {}
                }, r[4].onmouseout = function() {
                    o[3].onblur = function() {
                        r[4].style.display = "none"
                    }
                };
                for (var at = 0; at < 4; at++) o[at].disabled = !1, o[at].style.cursor = "pointer"
            }
            var ot = new Date;
            o[0].value = P[ot.getMonth() + 1], o[1].value = ot.getFullYear(), o[2].value = 11 == ot.getMonth() ? ot.getFullYear() + 1 : ot.getFullYear(), o[3].value = P[ot.getMonth() + 2],
                function() {
                    a[4].style.display = "none", e = !0;
                    var i = C ? 261 : 522,
                        s = document.body.clientWidth - i - 10,
                        o = t(b).offset().top,
                        r = t(b).offset().left;
                    r = r >= s ? s : r;
                    var l = t(b).innerHeight();
                    n.css("left", r), n.css("top", o + l);
                    var c = h(t(b).val());
                    c && c.length > 4 && c.substring(0, 4) > 1900 && c.substring(0, 4) < 2051 && d(c.substring(0, 4), c.substring(5, 7) - 1, c.substring(0, 4), c.substring(5, 7)), u(), n.show()
                }()
        }, t.jcalendar.defaultOptions = {
            isSingle: !0,
            showFormat: !0,
            formatBeforeInfo: "",
            formatAfterInfo: "",
            startDate: "1901-01-01",
            endDate: "2050-12-31",
            isTwoRows: "3",
            isTodayBlock: !0,
            isYearMonthDisabled: !0,
            condition: [!1, "#query_H", "active", "2050-12-31"],
            restColor: "#c60b02",
            noRestColor: "#313131",
            todayClickColor: "#c1d9ff",
            noClickColor: "#aaa",
            clickByYearMonth: "#003784",
            lunarColor: "#666",
            closeCalendar: function() {},
            onpicked: function() {}
        }, t.fn.jcalendar = function() {
            var e = Array.prototype.slice.call(arguments);
            return new t.jcalendar(this, e[0])
        }
    });
var index_messages = {
    to_station_request: "请输入目的地!",
    from_station_request: "请输入出发地!",
    same_to_from_station: "出发地与目的地不能相同!",
    jianma_hanzi: "简拼/全拼/汉字",
    trainDate_request: "请输入出发日期!",
    trainDate_error: "请输入合法的出发日期(1970-01-01)!",
    backTrainDate_request: "请输入返程日期!",
    backTrainDate_request: "请输入返程日期!",
    trainDate_not_in: "出发日期不在预售期内!",
    backTrainDate_not_in: "返程日期不在预售期内!",
    backTrainDate_error: "请输入合法的返程日期(1970-01-01)!",
    error_date: "请输入合法的往返日期(返程日期不能小于出发日期)!"
};
define("core/common/messages_index_zh_CN", function() {});
var formatDate = function(t) {
        var e = t.getFullYear(),
            i = t.getMonth() + 1;
        i = i < 10 ? "0" + i : i;
        var n = t.getDate();
        return n = n < 10 ? "0" + n : n, e + "-" + i + "-" + n
    },
    formatDateNextMonth = function(t) {
        var e = new Date,
            i = new Date(e);
        return i.setDate(e.getDate() + 29), i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate()
    };
define("core/common/mUtils", function() {}), define("ticket_check/app", ["jquery", "g/g-header", "g/g-footer", "g/g-href", "ticket_check/ticket_check-init", "core/common/date", "core/common/url_config", "core/lib/bootstrap2", "core/common/data.jcalendar", "core/common/messages_index_zh_CN", "core/common/mUtils"], function(t, e, i, n, a, s, o, r, l, c, d) {
    function h() {
        e.initialize(), t("#J-index").removeClass("active"), t("#J-xinxichaxun").addClass("active"), a.initialize(), i.initialize(), n.initialize()
    }
    return {
        initialize: h
    }
}), require.config({
    baseUrl: "../../script/",
    shim: {
        jquery: {
            exports: "$"
        }
    },
    paths: {
        jquery: "core/lib/jquery.min"
    },
    waitSeconds: 0
}), require(["ticket_check/app"], function(t) {
    new t.initialize
}), define("ticket_check/main", function() {});