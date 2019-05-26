/** 过滤拦截 */
// {
//     title: '指标名称',
//     dataIndex: 'warn_name',
//     key: 'warn_name',
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
            console.log('原路返回')
            return items
        }
        items = items.filter(ele => {
            return CONFIG.table_data_list.includes(ele.dataIndex) || ele.key === 'action'
        })
        items.forEach(ele => {
            if(ele.key === 'action'){
                ele.actions = CONFIG.collections[tableName].actions
                console.log('asdada')
            }
        });
        return items
    }
}