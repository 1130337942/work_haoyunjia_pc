//部门数据处理
export function departmentDisposeFn (data){
    let nameArr = data.map(item=>{
        return item.name
    })
    return nameArr.join('>')
}