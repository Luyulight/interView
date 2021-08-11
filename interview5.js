// 设计事件总线
//难度一
//start:2021/8/10 19:00
class Bus {
  constructor() {
    this.eventContainer = this.eventContainer || new Map()
  }
  listen(type, callback) {
    if (!this.eventContainer.get(type)) {
      this.eventContainer.set(type, [callback])
    } else {
      console.log(this.eventContainer.get(type))
      this.eventContainer.get(type).push(callback)
    }
  }
  remove(type, fn) {
    if (this.eventContainer.get(type)) {
      let arr = this.eventContainer.get(type)
      let temp = -1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === fn) {
          temp = i
          break
        }
      }
      if (temp !== -1) {
        arr.splice(temp, 1)
      }
    }
  }
  trigger(type) {
    let arr = this.eventContainer.get(type)
    for (const i in arr) {
      arr[i].call(this, ...[...arguments].slice(1))
    }
  }
}

function test() {
  let ev = new Bus()
  ev.listen('e1', function () {
    console.log(arguments, 1)
  })
  ev.trigger('e1', '1', '2', '3', '4')
  ev.listen('e1', function () {
    console.log(arguments, 2)
  })
  ev.trigger('e1', '1', '2', '3', '4')
  ev.remove('e1')
  ev.trigger('e1', '1', '2', '3', '4')
}
//end: 2021/8/10 19:25

//难度二，实现listener继续触发事件并打印调用栈
//start:2021/8/10 19:53
class Bus2 {
  constructor() {
    this.eventContainer = this.eventContainer || new Map()
    this.triggerStack = this.triggerStack || []
  }
  listen(type, callback) {
    if (!this.eventContainer.get(type)) {
      this.eventContainer.set(type, [callback])
    } else {
      console.log(this.eventContainer.get(type))
      this.eventContainer.get(type).push(callback)
    }
  }
  remove(type, fn) {
    if (this.eventContainer.get(type)) {
      let arr = this.eventContainer.get(type)
      let temp = -1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === fn) {
          temp = i
          break
        }
      }
      if (temp !== -1) {
        arr.splice(temp, 1)
      }
    }
  }
  trigger(type) {
    let arr = this.eventContainer.get(type)
    this.triggerStack.push({ event: type, callback: arr })
    for (const i in arr) {
      arr[i].call(this, ...[...arguments].slice(1))
    }
    if (this.triggerStack[0].event == type) {
      this.log()
      this.triggerStack = []
    }
  }
  log() {
    console.log(this.triggerStack)
    this.triggerStack.forEach((item, index, arr) => {
      let header1 = ''.padStart(4 * index, '--')
      let header2 = ''.padStart(4 * index + 2, '--')
      console.log(`${header1}event: ${item.event}`)
      let evname = item.event
      item.callback.forEach((item, index, arr) => {
        console.log(`${header2}callback: ${evname}callback${index}`)
      })
    })
  }
}
//end:2021/8/10 21:03

//难度三，增加对 async callback 的支持，并要求仍然能够正确打印出调用栈。增加对无线循环调用事件的判断。
//start:2021/8/10 23:00
class Bus3 {
  constructor() {
    this.eventContainer = this.eventContainer || new Map()
    this.triggerStack = this.triggerStack || []
    this.typeStack = this.typeStack || []
  }
  listen(type, callback) {
    if (!this.eventContainer.get(type)) {
      this.eventContainer.set(type, [callback])
    } else {
      console.log(this.eventContainer.get(type))
      this.eventContainer.get(type).push(callback)
    }
  }
  remove(type, fn) {
    if (this.eventContainer.get(type)) {
      let arr = this.eventContainer.get(type)
      let temp = -1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === fn) {
          temp = i
          break
        }
      }
      if (temp !== -1) {
        arr.splice(temp, 1)
      }
    }
  }
  async trigger(type) {
    let arr = this.eventContainer.get(type)
    this.triggerStack.push({ event: type, callback: arr })
    this.typeStack.push(type)
    //无限循环检测
    let len1 = this.typeStack.length
    let len2 = Array.from(new Set(this.typeStack)).length
    if (len1 > len2) {
      console.log('Infinit loop')
    }
    //
    for await (const fn of arr) {
      Promise.resolve(fn.call(this, ...[...arguments].slice(1)))
    }
    if (this.triggerStack[0].event == type) {
      this.log()
      this.triggerStack = []
    }
  }
  log() {
    console.log(this.triggerStack)
    this.triggerStack.forEach((item, index, arr) => {
      let header1 = ''.padStart(4 * index, '--')
      let header2 = ''.padStart(4 * index + 2, '--')
      console.log(`${header1}event: ${item.event}`)
      let evname = item.event
      item.callback.forEach((item, index, arr) => {
        console.log(`${header2}callback: ${evname}callback${index}`)
      })
    })
  }
}
//end 2021/8/10 23:19
