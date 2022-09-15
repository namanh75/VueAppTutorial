import axios from "axios"
var res
var GetOfficer = function (url){
    axios.get(url).then(response => {
        res=response
    })
    return res
}



export { GetOfficer }