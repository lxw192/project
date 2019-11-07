export const required = function required(value){
	if(Array.isArray(value)){
		return value.length >0 ? undefined : '此项是必填项'
	}else if(typeof(value) =='string'&&value&&!value.trim()){
		return value.trim() ?undefined : '此项是必填项';
	}else{
		return typeof(value) == 'number' || value ? undefined : '此项是必填项';
	}
}
export const maxLength = function maxLength(max){
	return (value) => {
  		return value && value.length > max ? `不能超过 ${max} 个字符` : undefined;
	};
}

export const minLength = function maxLength(min){
	return (value) => {
  		return value && value.length < min ? `不能少于 ${min} 个字符` : undefined;
	};
}
export const number =function number(value){
	return value && isNaN(Number(value)) ? '请输入数字' : undefined;
}
export const email = function email(value) {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  '请输入正确的Email地址' : undefined;
}

export const mobile =function mobile(value){
	return value && !/^(19[0-9]|16[0-9]|17[0-9]|13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value) ?
  '请输入正确的手机号码' : undefined;
}
export const password =function password(value){
	return value && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/i.test(value)?
	'密码必须为6-16位数字和字母的组合':undefined ;
}
export const isTelphone = function email(value) {
	return value && !/^[0-9._+/-]*$/i.test(value) ?
  '请输入正确的电话号码' : undefined;
}