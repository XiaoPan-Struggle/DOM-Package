window.dom = {
  /* 增 */
  create(string) {
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2,node.nextSibling)
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2,node)
  },
  append(parent, node) {
    parent.appendChild(node)
  },
  wrap(node, parent){
    dom.before(node, parent)
    dom.append(parent, node)
  },
  /* 删 */
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  empty(node) {
    /* 
    childNode.length 会随着删除而改变
    */
    //  const {childNodes} = node
    // for(let i = 0; i < childNodes.length; i++) {
    //   dom.remove(childNodes[i])
    //   array.push(childNodes[i])
    // }
    const {childNodes} = node
    const array = []
    let x = node.firstChild
    while(x) {
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  /* 改 */
  attr(node, name, value) {
    if(arguments.length === 3) {
      node.setAttribute(name, value)
    }else if(arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  text(node, string) {
    if(arguments.length === 2) {
      if('innerText' in node) {
        node.innerText = string
      }else {
        node.textContent = string
      }
    }else if(arguments.length === 1) {
      if('innerText' in node) {
        return node.innerText
      }else {
        return node.textContent
      }
    }
  },
  html(node, string) {
    if(arguments.length === 2) {
      node.innerHTML = string
    }else if(arguments.length === 1) {
      return node.innerHTML
    } 
  },
  style(node, name, value) {
    // 字符串传值
    if(arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value
    }else if(arguments.length === 2) { // 对象传值
      if(typeof name === 'string') {
        // dom.style(div,'color')
        return node.style[name]
      }else if(name instanceof Object) {
        // dom.style(div, {color: 'red'})
        for(let key in name) {
          node.style[key] = object[key]
        }
      }
    } 
  },
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  /* 查 */
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  }
}