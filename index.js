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
var d = document.getElementById("top");
var threshold = 100
function toggle(){
    if (document.documentElement.scrollTop > threshold){
        d.style.display = 'block'
    } else {
        d.style.display = 'none'
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
d.addEventListener("click",function (e) {
    e.preventDefault();
    scroll(window.pageYOffset, 0)
})

// load more articles
var load = document.getElementsByClassName('next')[0]
load.addEventListener("click", function (e) {
    e.preventDefault() // prevent <a> default action
    var ajax = new XMLHttpRequest()
    var parser = new DOMParser()
    load.innerText = "正在努力加载"
    var href = load.href
    if (href != undefined) {
        ajax.open('get', href)
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.readyState==4 && ajax.status==200){
                load.innerText = "加载更多文章"
                var data = parser.parseFromString(ajax.responseText, "text/html") // parse String to dom 
                var postlist = data.getElementsByClassName("post-preview")
                var container = document.getElementsByClassName("post-preview-container")[0]
                container.appendChild(postlist[0])
                //console.log(postlist[0])
            } 
        }
    } else {
        load.remove() // if no more articles, remove the button
    }
})
