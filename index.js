/**
 * @file index.js
 * @author liumapp
 * @email liumapp.com@gmail.com
 * @homepage http://www.liumapp.com
 * @date 2018/10/29
 */
import idcardValidator from './lib/idcardValidator';
import phoneValidator from './lib/phoneValidator';
import realnameValidator from './lib/realnameValidator';

let commonValidator = {};

commonValidator.install = function (Vue, options) {

  let opt = {
    defaultType: 'phone'
  };

  for (property in options) {
    opt[property] = options[property]
  };

  Vue.prototype.$commonValidator = function (type, rule, value, callback) {

    let curType = type ? type : opt.defaultType

    switch (curType) {
      case 'phone':
        phone(rule, value, callback);
        break;
      case 'idcard':
        idcard(rule, value, callback);
        break;
      case 'realname':
        realname(rule, value, callback);
        break;
      default:
        console.log('get the wrong type !')
    }
  };

  ['realname', 'phone', 'idcard', 'hello'].forEach(function (type) {
    Vue.prototype.$commonValidator[type] = function (rule, value, callback) {
      return Vue.prototype.$commonValidator(type, rule, value, callback)
    }
  });

  let realname = function (rule, value, callback) {
    if (!value) {
      return callback(new Error('姓名不能为空'));
    } else if (!realnameValidator.validateRealName(value)) {
      callback(new Error('姓名格式不对'));
    } else {
      callback();
    }
  };

  let phone = function (rule, value, callback) {
    if (!value) {
      return callback(new Error('手机号不能为空'));
    } else if (!phoneValidator.rule.test(value)) {
      callback(new Error('手机号格式不正确'));
    } else {
      callback();
    }
  };

  let idcard = function (rule, value, callback) {
    if (!value) {
      return callback(new Error('身份证号码不能为空'));
    } else if (!idcardValidator.idCardValidate(value)) {
      callback('身份证格式不正确');
    } else {
      callback();
    }
  };

}

export default commonValidator;
// module.exports = commonValidator;
