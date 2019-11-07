import React from 'react';
import axios from 'axios'
import { Tabs , Button } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import { reduxForm , submit , getFormValues , Form } from 'redux-form'
import './register.less'
import InputField from '../components/InputField/InputField'
import { required , number , mobile , password } from '../components/InputField/validate'
import { add , register } from '../store/action/register'
import utility from 'utility'
import { getMd5Password } from '../util/util'
const { TabPane } = Tabs;


class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }
  componentDidMount() {

  }
  submit=()=>{
      const { dispatch , submit } = this.props
      console.log('123123')
      dispatch(submit())
  }
  render() {
      const { handleSubmit , number } = this.props
      return (
          <div className={`bg_img`} style={{ width: '100%', height: '100%', background: `url(img/bg.jpg) center` }}>
              <div className={`Register_contenr`}>
              <InputField label={`昵称`} validate={[required]} name='name' type='text' placeholder={'请输入昵称'} />
              <InputField label={`手机号`} validate={[required, mobile]} name='phone' type='text' placeholder={'请输入手机号'} />
              <InputField label={`密码`} validate={[required, password]} name='password' type='password' placeholder={'请输入密码'} />
              <div style={{ margin: '0 auto', width: '80px' }}>
                <Button type={`primary`} onClick={this.submit}>确认</Button>
              </div>
                      
              </div>
          </div>
      );
  }

}
const submitForm =  (values, dispatch, props) => {
    console.log(values , dispatch, props)
    values.password = getMd5Password(values.password)
    console.log(values.password )
    dispatch(register(values))
}

Register = reduxForm ({
  form:'qqqq',
  onChange:()=>console.log('1233211234567'),
  onSubmit: submitForm,
})(Register)

const mapState = (state) => {
  console.log(state)
  const { register:{ number } } = state
     return {
      number,
      myValues: getFormValues('qqqq')(state),
     }
 }

export default connect(mapState)(Register);