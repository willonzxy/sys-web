const get = url => {
    return fetch(url).then(res=>res.json()).catch(err=>console.log(err))
}
const post = (url,data)=>{
    return fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(res=>res.json()).catch(err=>console.log(err))
}
const del = url => {
    return fetch(url,{
        method:'DELETE'
    }).then(res=>res.json()).catch(err=>console.log(err))
}

const patch = (url,data) => {
    return fetch(url,{
        method:'PATCH',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(res=>res.json()).catch(err=>console.log(err))
}
const put = (url,data) => {
    return fetch(url,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(res=>res.json()).catch(err=>console.log(err))
}
export default {
    get,post,del,patch,put
}