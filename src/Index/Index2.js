import React,{PropTypes,createElement,Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm,formValueSelector,getFormValues,destroy} from 'redux-form';
import { Row,Col,Input } from 'antd';
import cx from 'classnames';
const InputGroup = Input.Group;



class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initload: true,
        }
    }
    render() {
        return (
            <div className='search-form-wrap'>
                123
          {this.props.children}
            </div>
        )
    }
}
export default class SearchFormFactory extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      MyForm:null
    }
  }
  static defaultProps={
    formName:'search_list'
  }
  componentDidMount(){
    const { formName,initialValues } = this.props;
    let MySearchForm = reduxForm({
          form                    : formName,
          onSubmit                : '',
          initialValues           : { offset:0, limit:10,  total_count:0,...initialValues },
          destroyOnUnmount: false,
          forceUnregisterOnUnmount: true
        })(SearchForm);
    this.setState({
      MyForm:MySearchForm
    })
  }
  searchGrid(){
    const {mySearchList}=this.refs;
    mySearchList.getWrappedInstance().refs.wrapped.refs.wrappedInstance.refs.wrapped.searchList();
  }
  render(){
    const {MyForm} = this.state;
    if(MyForm){
      return(
        <MyForm {...this.props}  ref="mySearchList" ></MyForm>
      )
    }else{
      return null;
    }
  }
}
