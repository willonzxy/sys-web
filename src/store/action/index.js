import API from '../../component/api.js'
import _fetch from '../../tool/fetch.js'
const { getOwnMenu } = API


export const getPermissions = ( data ) => ( {
    type: "STORE_DATA",
    data,
})

function fetchData() {
    return _fetch.get(getOwnMenu)
}

export const fetchData = () => ( dispatch ) => fetchData().then( res => dispatch( getPermissions(res)) );