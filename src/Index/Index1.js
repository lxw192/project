import React from 'react'; 
import ReactDOM from 'react-dom'; 
import Index2 from './Index2'
import moment from 'moment'
import { file_upload } from '../store/action/menu'


import { Tabs , Button } from 'antd';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import $ from 'jquery'
class Index1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    onChange = (value , files) => {
        const { dispatch } = this.props
        
            let file = value.target.files[0];
            let formData = new FormData();
            formData.append('avatar', file);
            if(file.name){
                dispatch(file_upload(formData))
            }
    }
    render(){
        console.log(moment('qqq' , 'HH:mm').isValid())
        return (
            <div>
               <input id="file" type="file" name="image" size="50" onChange={this.onChange}/>
               <img src={'./img/2bc33a5cca915c5af3d561dd52ccc279.jpg'} />
            </div> 
        )
    }
}


const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
}
  
  Index1 = reduxForm ({
    form:'home',
    onSubmit:submitForm,
  })(Index1)
  
  const mapState = (state) => {
      return {
  
      }
  };
  
  export default connect(mapState)(Index1);