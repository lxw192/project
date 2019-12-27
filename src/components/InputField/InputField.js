import React from 'react';
import { Input, Form ,Checkbox , Radio , Select } from 'antd';
import { Field } from 'redux-form';
import { required, maxLength, number, email, mobile, startCharacter, isTelphone, } from './validate';
const { Option } = Select;
const { Search } = Input;
const FormItem = Form.Item;
const _formItemLayouts = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
 
class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            needReload : false,
            value:''
        }
    }
    static defaultProps = {
        options :[],
        defaultValue :[],
        maxLength:200,
        inputStyle:{width:200},
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
        const { formItemLayout, placeholder, allowClear, disabled, type, inputStyle, label, validate, formFiled , options ,defaultValue , defaultValues ,maxLength , dropdownMatchSelectWidth=false } = this.props
        console.log(type)

        if (type == 'checkbox') {
            return (
                    <FormItem
                        {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                        label={label}
                        required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                        help={this.showErrMessage(field)}
                        validateStatus={this.validateStatus(field)}  >
                        <Checkbox.Group options={options} defaultValue={defaultValue ? defaultValue : []} onChange={(value) => {
                            this.props.onChange ? this.props.onChange(value, field) : field.input.onChange(value);
                        }} />
                    </FormItem>
            )
        } else if (type == 'search') {
            return (
                    <FormItem
                        {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                        label={label}
                        required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                        help={this.showErrMessage(field)}
                        validateStatus={this.validateStatus(field)}  >
                       <Search {...field.input} placeholder={placeholder}  maxLength={maxLength} style={inputStyle} onSearch={this.props.onSearch} enterButton />
                    </FormItem>
            )
        } else if (type == 'select') {
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                    <Select {...field.input} showSearch style={inputStyle} placeholder={placeholder} optionFilterProp="children"
                    dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                        onChange={(value) => {
                            if (this.props.onChange) {
                                if (!value) {
                                    this.props.onChange('', field);
                                } else {
                                    this.props.onChange(value, field);
                                }
                            } else {
                                if (!value)
                                    if (value == 0) {
                                        field.input.onChange('0');
                                    } else {
                                        field.input.onChange('');
                                    }
                                else
                                    field.input.onChange(value);
                            }
                        }} onSearch={this.props.onSelect}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {
                            options&&options.length > 0 &&options.map((item , index)=>{
                                return (
                                    <Option value={item.label}>{item.value}</Option>
                                )
                            })
                        }
                        
                    </Select>
                </FormItem>
            )
        } else if(type == 'radio'){
            console.log(defaultValues , options)
            return (
                <FormItem
                    {...(formItemLayout ? formItemLayout : _formItemLayouts)}
                    label={label}
                    required={formFiled ? formFiled.is_required : this.validateRequired(validate)}
                    help={this.showErrMessage(field)}
                    validateStatus={this.validateStatus(field)}  >
                        <Radio.Group onChange={
                            (val) => {
                                this.setState({
                                    value: val.target.value
                                })
                                if (this.props.onChange) {
                                    this.props.onChange(val.target.value, field);
                                } else {
                                    field.input.onChange(val.target.value);
                                }
                            }}
                            defaultValue={defaultValues}
                            value={ this.state.value ? this.state.value : defaultValues }
                            >
                            {
                                options.map((item , index)=>{
                                    console.log(item.value)
                                    return (
                                        <Radio.Button value={item.value}>{item.value}</Radio.Button>
                                    )
                                })
                            }
                        </Radio.Group>
                </FormItem>
        )
        }else {
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
