//根据输入的数组中每项的 before/after/first/last 规则，输出一个新排好序的数组或者链表。
//要求，多解的情况可以只求一解，如果无解要求程序能检测出来。
//start 2021/8/11 0:52
class DbLinkList {
    constructor(){
        this.length = 0
        this.head = null
        this.Node = function(id){
            this.id = id
            this.prev = null
            this.next = null
        }
    }
    isEmpty() {
        return this.length === 0;
    }
    getLength() {
        return this.length;
    }
    getLast() {
        let current = this.head
        while(current.next){
            current = current.next
        }
        return current
    }
    find(id) {
        let current = this.head
        while(current && current.id !== id){
            current = current.next
        }
        return current
    }
    append(id){
        let newNode = new this.Node(id);
        if(!this.head){
            this.head = newNode
        }else{
            let current = this.getLast();
            current.next = newNode;
            newNode.prev = current
        }
        this.length++;
    }
    insertafter(item, id) {
        let itemNode = this.find(item);
        if(!itemNode) { 
            return false;
        }
        let newNode = new this.Node(id);
        newNode.next = itemNode.next; // 若currNode为最后一个节点，则currNode.next为空
        itemNode.next = newNode;
        newNode.prev = itemNode
        this.length++;
    }
    // insertbefore(item, id) {
    //     let current = this.head
    //     while(current && current.next.id !==item && current.next){
    //         current = current.next
    //     }
    //     let newNode = new this.Node(id);
    //     let beforeNode = current.prev
    //     beforeNode.next = newNode
    //     newNode.prev = beforeNode
    //     newNode.next = current
    //     current.prev = newNode
    //     this.length++;
    // }
    insertbefore(item, id) {
        let itemNode = this.find(item)
        if(!itemNode) {
            return false
        }
        let newNode = new this.Node(id);
        newNode.next = itemNode
        if(!itemNode.prev){
            this.head = newNode
        }
        itemNode.prev = newNode
    }
    remove(item) {
        if(!this.find(item)) {
            return;
        }
        // 企图删除头结点
        if (item === 'head') {
            if (!(this.isEmpty())) {
                return;
            } else {
                this.head.next = null;
                return;
            }
        }
        let current = this.head;
        while (current.next.data !== item) {
            if (!current.next) {
                return;
            }
            current = current.next;
        }
        current.next = current.next.next;
        this.length--;
    }
    display() {
        let result = '';
        let current = this.head;
        while (current) {
            result += current.id;
            current = current.next;
            if(current) {
                result += '->';
            }
        }
        console.log(result);
    }
}


function handleInput(list){
    let link = new DbLinkList()
    let firstStack, lastStack
    for(const item of list){
        if(Object.keys(item).length == 1 && item.id){
            link.append(item.id)
        }
    }
    for(const item of list){
        if(!item.id){
            console.log('error input','no id')
            return
        }
        if(Object.keys(item).length == 2 ){
            if(item.hasOwnProperty('before')){
                if(link.find(item.before)){
                    link.insertbefore(item.before,item.id)
                    continue
                }else{
                    console.log('error input',item.id)
                    return
                }
            }
            if(item.hasOwnProperty('after')){
                if(link.find(item.after)){
                    link.insertafter(item.after,item.id)
                    continue
                }else{
                    console.log('error input',item.id)
                    return
                }
            }
            if(item.hasOwnProperty('first')){
                if(firstStack){
                    console.log('error input',item.id)
                    return
                }else{
                    firstStack = item.id
                    continue
                }
            }
            if(item.hasOwnProperty('last')){
                if(lastStack){
                    console.log('error input',item.id)
                    return
                }else{
                    lastStack = item.id
                    continue
                }
            }
        }
        
    }
    if(lastStack){
        link.append(lastStack)
    }
    if(firstStack){
        link.insertbefore(link.head.id,firstStack)
    }
    link.display()
}


function test(){
    let list = [
        {id: 1},
        {id: 2, before: 1},
        {id: 3, after: 1},
        {id: 5, first: true},
        {id: 6, last: true},
        {id: 7, after: 8},
        {id: 8},
        {id: 9},
    ]
    handleInput(list)
}

//end 2021/8/11 1:37
//edit 2021/8/11 2:11 - 2:26