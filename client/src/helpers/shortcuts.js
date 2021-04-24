// Defined variables
const serverUrl = process.env.VUE_APP_DOMAIN

/** 
 * Shortcut class
 * @class
*/

class Shortcuts{
    /**  
    * @param {Object} params
    * @return {Object}
    */
    async run(params){
        var {id, p} = params
        let res = await axios.post(`${serverUrl}/api/${id}/${p}`)
        return res
    }
}