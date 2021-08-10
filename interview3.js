//将输入的数组组装成一颗树状的数据结构，时间复杂度越小越好。
//要求程序具有侦测错误输入的能力。
//start:2021/8/10 19:30
function convert(list) {
    let arr = []
    let obj = list.reduce((res, v)=>(res[v.id]=v ,res),{})
    for(let node of list){
        if(!node.parentId){
            arr.push(node)
            continue
        }
        let father = obj[node.parentId]
        if(father){
            father.children = father.children || []
            father.children.push(node)
        }else{
            console.log('error input')
            return
        }
        
    }
    return arr
}
//end: 2021/8/10 19:46
//edit 2021/8/10 23:56 - 2021/8/11 0:30
