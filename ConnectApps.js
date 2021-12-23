
const express = require('express');
const app = express();
const writer = require('./writeToFile');
// const userData = require('./user.json')
const port = 1337
app.use(express.json()) // for parsing application/json
const userData = JSON.parse(writer.data)
/**
 * restful to see the data on the browser
 * @type {[type]}
 */
app.get('/', (req, res) => {
    let obj = {}
    let data = process_naming(obj)
    res.json(data)
})
/**
 * this is used to process the data inside the user_info object
 * in order to create a new formatted object
 * @return {[type]} [description]
 */
const process_naming = (obj) => {
    obj = {
        Username : userData.Username,
        UserCreateDate: userData.UserCreateDate,
        UserLastModifiedDate: userData.UserLastModifiedDate,
        Enabled: userData.Enabled,
        UserStatus: userData.UserStatus
    }
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
 * @param  {[type]} gv_name                [given name]
 * @param  {[type]} fmi_name               [family name]
 * @return this function return full name
 */
const fullName = (gv_name, fmi_name) =>{
    return gv_name + ', ' + fmi_name
}
/**
 * [data_formating description]
 * @param  {[type]} obj               [description]
 * @return {[type]}     [description]
 */
const data_formating = (obj) => {
    return {
        Username : obj.Username,
        EmailVerified : obj.EmailVerified,
        Email : obj.Email,
        DisplayName : obj.DisplayName,
        GivenName : obj.GivenName,
        FamilyName : obj.FamilyName,
        Tags : obj.Tags,
        UserCreateDate : obj.UserCreateDate,
        UserLastModifiedDate : obj.UserLastModifiedDate,
        Enabled : obj.Enabled,
        UserStatus : obj.UserStatus
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
