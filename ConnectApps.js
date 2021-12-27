
const express = require('express');
const app = express();
app.use(express.json()) // for parsing application/json
const userData = require('./user_info').data;
const port = 1337
/**
 * restful to see the data on the browser
 * @type {[json]}
 */
app.get('/', (req, res) => {
    let obj = {}
    let data = process_naming(obj)
    res.json(data)
})
/**
 * this is used to process the data inside the user_info object
 * in order to create a new formatted object
 * @return {formatted object}
 */
const process_naming = (obj) => {

    let userAttr = userData.UserAttributes;
    userAttr.map(attr => {
        checkProperties(attr, obj)
    })
    obj.DisplayName = fullName(obj.GivenName, obj.FamilyName);
    let format = data_formating(obj)
    return format
}
/**
 * /
 * @param  {[type]} gv_name
 * @param  {[type]} fam_name
 * @return this function return full name
 */
const fullName = (gv_name, fam_name) =>{
    return gv_name + ', ' + fam_name
}
/**
 * [format the entire obj]
 * @param  {object} containing properties with their value
 */
const data_formating = (obj) => {
    return {
        Username : userData.Username,
        EmailVerified : obj.EmailVerified,
        Email : obj.Email,
        DisplayName : obj.DisplayName,
        GivenName : obj.GivenName,
        FamilyName : obj.FamilyName,
        Tags : obj.Tags,
        UserCreateDate : userData.UserCreateDate,
        UserLastModifiedDate : userData.UserLastModifiedDate,
        Enabled : userData.Enabled,
        UserStatus : userData.UserStatus
    }
}
/**
 *
 * @param  item represent item in the user_info object
 * @param  obj refences the new object for formatting
 * @return this func compare properties in order to get their matching values
 */
const checkProperties = (item, obj) => {
    if(item.Name === 'email_verified')
        obj.EmailVerified = item.Value
    else if(item.Name === 'email')
        obj.Email = item.Value
    else if(item.Name === 'given_name')
        obj.GivenName = item.Value
    else if(item.Name === 'family_name')
        obj.FamilyName = item.Value
    else if(item.Name === 'custom:tags')
        obj.Tags = item.Value.split(',')
}
/**
 *
 */
app.listen(port, () => {
    console.log(`i am listening on port ${port}`);
})
