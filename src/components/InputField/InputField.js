import React from 'react';
import { Input, Form ,Checkbox} from 'antd';
import { Field } from 'redux-form';
import { required, maxLength, number, email, mobile, startCharacter, isTelphone, } from './validate';


const FormItem = Form.Item;
const _formItemLayouts = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
 
class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            needReload : false
        }
    }
    static defaultProps = {
        options :[],
        defaultValue :[],
      }
    componentWillReceiveProps(nextProps){
        const { needReload } = nextProps
        if (needReload && !this.props.needReload) {
            this.setState({
                needReload: true
            })
            return
        }
    }
    validateRequired = (validate = []) => {
        let isRequireFlag = false;
        validate.map((val) => {
            if (val.toString().indexOf('此项是必填项') !== -1) {
                isRequireFlag = true
            }
        });
        return isRequireFlag;
    }
    validateStatus = (field) => {
        if (field && field.meta && field.meta.touched && field.meta.error) {
            return 'error'
        } else {
            return null;
        }
    }
    showErrMessage(field){
        if(field && field.meta && field.meta.touched && field.meta.error){
            return field.meta.error
        }else {
            return '';
        }
  }
    renderField = (field) => {
        const { formItemLayout, placeholder, allowClear, disabled, type, inputStyle, label, validate, formFiled , options ,defaultValue  } = this.props
        console.log(type)

        if (type == 'checkbox') {
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                    <Checkbox.Group options={options} defaultValue={defaultValue ? defaultValue : []} onChange={(value)=>{
                        this.props.onChange ? this.props.onChange(value, field) : field.input.onChange(value);
                    }} />
                </FormItem>
            )
        } else {
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                    <Input {...field.input} value={field.input.value ? field.input.value : ''} allowClear={allowClear} disabled={disabled} placeholder={placeholder} type={type} style={inputStyle}
                        onChange={(value) => {
                            if (this.props.onChange) {
                                this.props.onChange(value, field);
                            } else {
                                field.input.onChange(value);
                            }
                        }} />
                </FormItem>
            )
        }

    }
    render() {
        const { name, label, type, formFiled, validate } = this.props;
        const tempValidate = [required], otherValidate = [];
        const { needReload } = this.state;
        if(needReload){
            return (
                <Field fieldId={'preField' + name} name={name} label={label} type={type} validate={formFiled ? formFiled.is_required ? tempValidate : otherValidate : validate} component={ (field) => { return this.renderField(field) } } />
            );
        }else{
            return (
                <Field fieldId={'nexField' + name} name={name} label={label} type={type} validate={formFiled ? formFiled.is_required ? tempValidate : otherValidate : validate} component={this.renderField} />
            );
        }
      
    }
}


export default InputField;
