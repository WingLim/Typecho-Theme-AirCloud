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
const navToggle = document.getElementById('site-nav-toggle');
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

var toc = document.getElementById('toc')

var tocToTop = getDistanceOfLeft(toc).top;

function reHeightToc(){
    if(toc) { // resize toc height
        toc.style.maxHeight = ( document.documentElement.clientHeight - 10 ) + 'px';
        toc.style.overflowY = 'scroll';
    }
}

reHeightToc();

var result = []

var nameSet = new Set();

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

    reLayout()

    window.addEventListener('scroll', function(e) {
        reLayout()
    })
}

// back to top
const topButton = document.getElementById("top");
const threshold = 100
function toggle(){
    if (document.documentElement.scrollTop > threshold){
        topButton.style.display = 'block'
    } else {
        topButton.style.display = 'none'
    }
}
function scroll(a, b) {
	needScrollTop = b - a, _currentY = a, setTimeout(function() {
		const c = Math.ceil(needScrollTop / 10);
		_currentY += c, window.scrollTo({
			left: _currentY,
			top: a,
			behavior: "smooth"
		}), needScrollTop > 10 || -10 > needScrollTop ? scroll(_currentY, b) : window.scrollTo({
			left: _currentY,
			top: b,
			behavior: "smooth"
		})
	}, 1)
}
window.addEventListener('scroll', toggle);   
topButton.addEventListener("click",function (e) {
    e.preventDefault();
    scroll(window.pageYOffset, 0)
})

// load more articles
const load = document.getElementsByClassName('next')[0]
if (load != undefined){
load.addEventListener("click", function (e) {
    e.preventDefault() // prevent <a> default action
    let ajax = new XMLHttpRequest()
    load.innerText = "正在努力加载"
    let href = load.href
    if (href != undefined) {
        ajax.open('get', href)
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.readyState==4 && ajax.status==200){
                load.innerText = "加载更多文章"
                let data = (new DOMParser()).parseFromString(ajax.responseText, "text/html") // parse String to dom 
                let postlist = data.getElementsByClassName("post-preview")
                let container = document.getElementsByClassName("post-preview-container")[0]
                let newhref = data.getElementsByClassName('next')[0]
                if (newhref != undefined) {
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

submitButton = document.getElementById("submit")
if (submitButton != undefined){
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
        holder.parentNode.insertBefore(replyform, holder)
    }
    let commentForm = document.getElementById("comment-form"),
        commentLink = commentForm.action,
        parent = "",
        ajax = new XMLHttpRequest,
        commentList = document.getElementsByClassName("comment-list")[0]
    let parentNode = document.getElementById("comment-parent")
    if (parentNode != undefined) {
        parent = parentNode.value
    }
    ajax.open("post", commentLink)
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    let submitdata = "author=" + getValue("author") + "&mail=" + getValue("mail") + "&url=" + getValue("url") + "&text=" + getValue("textarea") + "&parent=" + parent
    ajax.send(submitdata)
    submitButton.value = "寄出中..."
    ajax.onreadystatechange = function () {
        if (ajax.readyState==4 && ajax.status==200){
            let commentId = "comment-" + ajax.responseText.match(/id=\"?comment-\d+/g).join().match(/\d+/g).sort(function(a,b){ return b-a})[0]
            let data = (new DOMParser()).parseFromString(ajax.responseText, "text/html")
            let newComment = data.getElementById(commentId)
            if (newComment.classList.contains("comment-child")){
                parentComment = document.getElementById("comment-"+parent)
                childrenComment = parentComment.getElementsByClassName("comment-children")[0]
                if (childrenComment != undefined) {
                    childrenCommentList = childrenComment.getElementsByClassName("comment-list")[0]
                    childrenCommentList.appendChild(newComment)
                    finish()
                } else {
                    newChildrenComment = data.getElementById(commentId).parentNode.parentNode
                    parentComment.appendChild(newChildrenComment)
                    finish()
                }
            } else {
                if (commentList != undefined){
                    let first = commentList.firstChild
                    commentList.insertBefore(newComment,first)
                    finish()
                } else {
                    commentList = data.getElementsByClassName("comment-list")[0]
                    document.getElementById("comments").appendChild(commentList)
                    finish()
                }
            }
            document.getElementById("textarea").value = ""
            submitButton.value = "发射"
        }
    }
}