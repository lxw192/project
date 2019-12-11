import React from 'react'; 
import ReactDOM from 'react-dom'; 
import Index2 from './Index2'
import moment from 'moment'
import { file_upload } from '../store/action/menu'
import InputField from '../components/InputField/InputField'
import { reduxForm, submit, getFormValues, Form , formValueSelector} from 'redux-form'
import { Tabs , Button ,Icon } from 'antd';
import { connect } from 'react-redux'
import $ from 'jquery'
             
let area = [
    { label: '通州', value: '通州' },
    { label: '大兴', value: '大兴' },
    { label: '房山', value: '房山' },
    { label: '丰台', value: '丰台' },
    { label: '昌平', value: '昌平' },
    { label: '石景山', value: '石景山' },
    { label: '门头沟', value: '门头沟' },
    { label: '海淀', value: '海淀' },
    { label: '朝阳', value: '朝阳' },
    { label: '顺义', value: '顺义' },
    { label: '东城', value: '东城' },
    { label: '西城', value: '西城' },
    { label: '怀柔', value: '怀柔' },
    { label: '平谷', value: '平谷' },
]
class Index1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    onChange = (value , files) => {
        const { dispatch } = this.props
        
            let file = value.target.files[0];
            console.log('file', file)
            let formData = new FormData();
            formData.append('avatar', file);
            if(file.name){
                dispatch(file_upload(formData))
            }
    }
    fileCallBack=()=>{

    }
    render(){
        console.log(moment('qqq' , 'HH:mm').isValid())
        const { url } = this.props
        return (
            <div>
               {/* <input id="file" type="file" name="image" size="50" onChange={this.onChange}/>
               {url ? <img src={`./img/${url}`} /> : null} */}
                <InputField label={`昵称`} name='name' type='checkbox' options={area} placeholder={'请输入昵称'} />
            </div> 
        )
    }
}


const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
}
const selector = formValueSelector('home')
  Index1 = reduxForm ({
    form:'home',
    onSubmit:submitForm,
  })(Index1)
  
  const mapState = (state) => {
      return {
        url : selector(state , 'url')
      }
  };
  
  export default connect(mapState)(Index1);