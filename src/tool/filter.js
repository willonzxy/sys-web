/** 过滤拦截 */
// {
//     title: '指标名称',
//     dataIndex: 'warnconfig_name',
//     key: 'warnconfig_name',
//   }, 
// {
//     title: '操作',
//     key: 'action',
//     actions:['delete','update']
//   }
export default {
    tableFilter(tableName,items){
        const CONFIG = window.__CONFIGDATA__;
        if(!CONFIG){
            return items
        }
        items = items.filter(ele => {
            return CONFIG.table_data_list.includes(ele.dataIndex) || ele.key === 'action'
        })
        console.log(items)
        items.forEach(ele => {
            if(ele.key === 'action'){
                ele.actions = CONFIG.collections[tableName].actions
                console.log('asdada')
            }
        });
        console.log(items)
        return items
    }
}