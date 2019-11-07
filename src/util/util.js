import utility from 'utility'
export const getMd5Password = (password)=>{
    let str = '!@#lxw_wxl#@!';
    let md5Password = utility.md5(utility.md5(password + str));
    return md5Password;
}