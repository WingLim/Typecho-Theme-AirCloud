// Global functions and listeners
window.onresize = () => {
    // when window resize , we show remove some class that me be added
    // often for debug
    if(window.document.documentElement.clientWidth > 680){
        let aboutContent = document.getElementById('nav-content')
        aboutContent.classList.remove('hide-block')
        aboutContent.classList.remove('show-block');
    }
    reHeightToc();
};

// Nav switch function on mobile
var navToggle = document.getElementById('site-nav-toggle');
navToggle.addEventListener('click', () => {
    let aboutContent = document.getElementById('nav-content')
    if (!aboutContent.classList.contains('show-block')) {
        aboutContent.classList.add('show-block');
        aboutContent.classList.remove('hide-block')
    } else {
        aboutContent.classList.add('hide-block')
        aboutContent.classList.remove('show-block');
    }
});

// directory function in post pages
function getDistanceOfLeft(obj) {
    let left = 0;
    let top = 0;
    while (obj) {
        left += obj.offsetLeft;
        top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {
        left:left,
        top:top
    };
}

var toc = document.getElementById('toc'),
    tocToTop = getDistanceOfLeft(toc).top

function reHeightToc(){
    if(toc) { // resize toc height
        toc.style.maxHeight = ( document.documentElement.clientHeight - 10 ) + 'px';
        toc.style.overflowY = 'scroll';
    }
}

reHeightToc()

var result = [],
    nameSet = new Set();

if(!toc || !toc.children || !toc.children[0]){
    // do nothing
} else {
    if (toc.children[0].nodeName === "OL") {
        let ol = Array.from(toc.children[0].children)

        function getArrayFromOl(ol) {
            let result = []

            ol.forEach((item) => {
                if (item.children.length === 1) {
                    // TODO: need change
                    let value = item.children[0].getAttribute('href').replace(/^#/,"")
                    result.push({
                        value: [value],
                        dom: item
                    })
                    nameSet.add(value)
                } else {
                    let concatArray = getArrayFromOl(Array.from(item.children[1].children))
                    nameSet.add(item.children[0].getAttribute('href').replace(/^#/,""))
                    result.push({
                        value: [item.children[0].getAttribute('href').replace(/^#/,"")].concat(concatArray.reduce((p, n) => {
                            p = p.concat(n.value)
                            return p;
                        }, [])),
                        dom: item
                    })
                    result = result.concat(concatArray)
                }
            })
            return result
        }

        result = getArrayFromOl(ol)
    }

    var nameArray = Array.from(nameSet)

    function reLayout() {
        let scrollToTop = document.documentElement.scrollTop || window.pageYOffset // Safari is special
        if(tocToTop === 0) {
            // Fix bug that when resize window the toc layout may be wrong
            toc = document.getElementById('toc')
            toc.classList.remove('toc-fixed')
            tocToTop = getDistanceOfLeft(toc).top;
        }
        if (tocToTop <= scrollToTop + 10) {
            if (!toc.classList.contains('toc-fixed'))
                toc.classList.add('toc-fixed')
        } else {
            if (toc.classList.contains('toc-fixed'))
                    toc.classList.remove('toc-fixed')
        }

        let minTop = 9999;
        let minTopsValue = ""

        for (let item of nameArray) {
            let dom = document.getElementById(item) || document.getElementById(item.replace(/\s/g, ''))
            if (!dom) continue
            let toTop = getDistanceOfLeft(dom).top - scrollToTop;

            if (Math.abs(toTop) < minTop) {
                minTop = Math.abs(toTop)
                minTopsValue = item
            }

            //console.log(minTopsValue, minTop)
        }

        if (minTopsValue) {
            for (let item of result) {
                if (item.value.indexOf(minTopsValue) !== -1) {
                    item.dom.classList.add("active")
                } else {
                    item.dom.classList.remove("active")
                }
            }
        }
    }
    window.addEventListener('scroll', function() {
        if(toc) reLayout()
    })
}

// back to top
var topButton = document.getElementById("top"),
    threshold = 100
function toggle(){
    if (document.documentElement.scrollTop > threshold){
        topButton.style.display = 'block'
    } else {
        topButton.style.display = 'none'
    }
}
function scroll(a, b) {
	needScrollTop = b - a, _currentY = a, "undefined" == typeof window.getComputedStyle(document.documentElement).scrollBehavior ? setTimeout(function() {
		const a = Math.ceil(needScrollTop / 10);
		_currentY += a, window.scrollTo(_currentY, b), needScrollTop > 10 || -10 > needScrollTop ? scroll(_currentY, b) : window.scrollTo(_currentY, b)
	}, 1) : window.scrollTo({
		left: _currentY,
		top: b,
		behavior: "smooth"
	})
}
window.addEventListener('scroll', toggle);   
topButton.addEventListener("click",function (e) {
    e.preventDefault();
    scroll(window.pageYOffset, 0)
})

// load more articles
var load = document.getElementsByClassName('next')[0]
if (load){
load.addEventListener("click", function (e) {
    e.preventDefault() // prevent <a> default action
    let ajax = new XMLHttpRequest()
    load.innerText = "正在努力加载"
    let href = load.href
    if (href) {
        ajax.open('get', href)
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.readyState==4 && ajax.status==200){
                load.innerText = "加载更多文章"
                let data = (new DOMParser()).parseFromString(ajax.responseText, "text/html") // parse String to dom 
                let postlist = data.getElementsByClassName("post-preview")
                let container = document.getElementsByClassName("post-preview-container")[0]
                let newhref = data.getElementsByClassName('next')[0]
                if (newhref) {
                    href = newhref.href
                } else {
                    load.remove() // if no more articles, remove the button
                }
                let count = postlist.length
                for (let i=0; i < count; i++){
                    postlist[0].classList.add("post-up")
                    container.appendChild(postlist[0])
                }
            } 
        }
    }
})
}

// comment reply
window.TypechoComment = {
	dom: function(a) {
		return document.getElementById(a)
	},
	create: function(a, b) {
		var d, c = document.createElement(a);
		for (d in b) c.setAttribute(d, b[d]);
		return c
	},
	reply: function(a, b, c, d) {
		var e, g, h, i, j, k;
		return pageid = a, e = this.dom(a), e.parentNode, g = this.dom(document.getElementById("hf").innerText), h = this.dom("comment-parent"), i = "form" == g.tagName ? g : g.getElementsByTagName("form")[0], j = g.getElementsByTagName("textarea")[0], null == h && (h = this.create("input", {
			type: "hidden",
			name: "parent",
			id: "comment-parent"
		}), i.appendChild(h)), h.setAttribute("value", b), null == this.dom("comment-form-place-holder") && (k = this.create("div", {
			id: "comment-form-place-holder"
		}), g.parentNode.insertBefore(k, g)), e.appendChild(g), this.dom("cancel-comment-reply-link").parentNode.style.display = "", document.getElementsByClassName("reply-name")[0].innerText = c, null != j && "text" == j.name && j.focus(), commentPage = d.split("#")[0] + "?c=a", reply = 1, !1
	},
	cancelReply: function() {
		var a = this.dom(document.getElementById("hf").innerText),
			b = this.dom("comment-form-place-holder"),
			c = this.dom("comment-parent");
		return null != c && c.parentNode.removeChild(c), null == b ? !0 : (this.dom("cancel-comment-reply-link").parentNode.style.display = "none", b.parentNode.insertBefore(a, b), reply = 0, !1)
	}
}

// ajax submit comment
var submitButton = document.getElementById("submit")
if (submitButton){
    submitButton.addEventListener("click", function (e) {
        e.preventDefault()
        ajaxSubmit()
    })
}
function ajaxSubmit(){
    function getValue(id) {
        let dom = document.getElementById(id)
        return dom ? encodeURI(dom.value) : ""
    }
    function finish() {
        let replyform = document.getElementById(document.getElementById("hf").innerText),
            holder = document.getElementById("comment-form-place-holder")
        document.getElementById("cancel-comment-reply-link").parentNode.style.display = "none"
        holder.parentNode.insertBefore(replyform, holder)
    }
    let commentForm = document.getElementById("comment-form"),
        commentLink = commentForm.action,
        parent = "",
        ajax = new XMLHttpRequest,
        commentList = document.getElementsByClassName("comment-list")[0]
    let parentNode = document.getElementById("comment-parent")
    if (parentNode) {
        parent = parentNode.value
    }
    ajax.open("post", commentLink)
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    let submitdata = "author=" + getValue("author") + "&mail=" + getValue("mail") + "&url=" + getValue("url") + "&text=" + getValue("textarea") + "&parent=" + parent
    if(getValue("textarea") == ""){
        document.getElementById("textarea").focus()
    } else {
        ajax.send(submitdata)
        submitButton.value = "寄出中..."
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4 && ajax.status==200){
            let commentId = "comment-" + ajax.responseText.match(/id=\"?comment-\d+/g).join().match(/\d+/g).sort(function(a,b){ return b-a})[0]
            let data = (new DOMParser()).parseFromString(ajax.responseText, "text/html")
            let newComment = data.getElementById(commentId)
            if (newComment.classList.contains("comment-child")){
                parentComment = document.getElementById("comment-"+parent)
                childrenComment = parentComment.getElementsByClassName("comment-children")[0]
                if (childrenComment) {
                    childrenCommentList = childrenComment.getElementsByClassName("comment-list")[0]
                    childrenCommentList.appendChild(newComment)
                    finish()
                } else {
                    newChildrenComment = data.getElementById(commentId).parentNode.parentNode
                    parentComment.appendChild(newChildrenComment)
                    finish()
                }
            } else {
                if (commentList){
                    let first = commentList.firstChild
                    commentList.insertBefore(newComment,first)
                } else {
                    commentList = data.getElementsByClassName("comment-list")[0]
                    document.getElementById("comments").appendChild(commentList)
                }
            }
            document.getElementById("textarea").value = ""
            submitButton.value = "发射"
        }
    }
}

// instant search
var searchButton = document.getElementById('search'),
    searchField = document.getElementById('search-field'),
    searchInput = document.getElementById('search-input'),
    escSearch = document.getElementById('esc-search')
searchButton.addEventListener('click', () => {
    search_a("/usr/themes/AirCloud/caches/cache.json");
    toggleSeachField()
});
escSearch.addEventListener('click',() => {
    hideSearchField()
})
function toggleSeachField(){
    if (!searchField.classList.contains('show-flex-fade')) {
        showSearchField()
    } else {
        hideSearchField()
    }
}

window.onkeydown = (e) => {
    if (e.which === 27) {
        toggleSeachField()
    }
}

function showSearchField() {
    searchField.classList.add('show-flex-fade');
    searchField.classList.remove('hide-flex-fade');
    searchInput.focus()
}

function hideSearchField(){
    window.onkeydown = null;
    searchField.classList.add('hide-flex-fade');
    searchField.classList.remove('show-flex-fade');
}

var QueryStorage = []; // save json

var otxt = document.getElementById("search-input"), list = document.getElementById("search-result-container"), Record = list.innerHTML;

document.all ? otxt.onpropertychange = function() {
    query(QueryStorage, otxt.value, Record);
} : otxt.oninput = function() {
    query(QueryStorage, otxt.value, Record);
};

function search_a(val){
    var _xhr=new XMLHttpRequest();
    _xhr.open("GET",val,true);  // use "get" method to get information
    _xhr.setRequestHeader("Content-Type","application/json");
    _xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
    _xhr.send(val);
    _xhr.onreadystatechange=function(){
        if(_xhr.readyState==4&&_xhr.status==200){
            json=_xhr.responseText;
            if(json!=""){
                QueryStorage=JSON.parse(json);// transfer data to json
            };
        };
    };
}

// add a function filter
if (!Object.values) Object.values = function(obj) {
    if (obj !== Object(obj))
        throw new TypeError('Object.values called on a non-object');
    var val=[],key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj,key)) {
            val.push(obj[key]);
        }
    }
    return val;
}

function jumpto(a) {
    document.getElementById("Ty").href = a.getAttribute("href"), document.getElementById("Ty").click();
}

function mark(keyword, text) {
    let first = text.search(keyword)
    let position = 20 < first ? first-20 : 0
	let afterReplace = text.replace(keyword, '<mark class="search-keyword"> ' + keyword + " </mark>")
    let result = afterReplace.slice(position, position + 80)
    return result
}

function query(a, b, c) {
    var n, o, p, q, d = "", e = "", f = "", g = "", h = "", i = '<div class="ins-selectable ins-search-item" onclick="jumpto(this)" href="', j = '<section class="ins-section"><header class="ins-section-header">', k = "</header>", l = "</section>", m = Cx(a, b);
    for (n = 0; n < Object.keys(m).length; n++) switch (o = m[n].this) {
      case "post":
        e = e + i + m[n].link + '"><header><i class="iconfont icon-file"></i>' + m[n].title + '</header><p class="ins-search-preview">' + mark(b, m[n].text) + "</p></div>";
        break;
      case "tag":
        f = f + i + m[n].link + '"><header><i class="iconfont icon-tag"></i>' + m[n].title + '<span class="ins-slug">' + m[n].text + "</span></header></div>";
        break;
      case "category":
        g = g + i + m[n].link + '"><header><i class="iconfont icon-floder"></i>' + m[n].title + '<span class="ins-slug">' + m[n].text + "</span></header></div>";
        break;
      case "page":
        h = h + i + m[n].link + '"><header><i class="iconfont icon-file"></i>' + m[n].title + '</header><p class="ins-search-preview">' + mark(b, m[n].text) + "</p></div>";
    }
    e && (d = d + j + "文章" + k + e + l), h && (d = d + j + "页面" + k + h + l), g && (d = d + j + "分类" + k + g + l), 
    f && (d = d + j + "标签" + k + f + l), p = document.getElementById("search-result-container"), 
    q = document.getElementById("search-input"), p.innerHTML = "" == q.value ? c : d;
}

function Cx(arr,q){i=arr.filter(v=>Object.values(v).some(v=>new RegExp(q+'').test(v)));return i;}
