import React, { PropTypes, createElement, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues, destroy } from 'redux-form';
import { Row, Col, Input } from 'antd';



class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.searchList = this.searchList.bind(this);
    this.changeValues = this.changeValues.bind(this);
    this.state = {
      initload: true,
    }
  }
  static defaultProps = {
    formItemLayout: {
      labelCol: 6,
      wrapperCol: 14
    },
    label: "",
    required: true,
    rememberValue: false,
    initload: true,
    disableKeys: [],
    search: (values) => {

    }
  }
  componentDidMount() {
    // 针对分页的数目，可根据limit属性来个性化定制，默认是十条
    const { initialize, dispatch, limit = 10 } = this.props;
    this.multipleValues = false;
    dispatch(initialize({
      offset: 0,
      offsetNew: '0',
      limit: limit,
      total_count: 0
    }))
  }
  componentWillReceiveProps(nextProps) {
    const { myValues, enableKeys, change, formName, limit = 10 } = nextProps, self = this;
    const { initialize, dispatch, rememberValue } = this.props;
    let initObject = {
      offset: 0,
      offsetNew: '0', // 针对下拉框分页器添加的属性，默认取值字符串'0'，下拉选项的redux-form中的name命名为’offsetNew‘,并且搜索框的下拉option结构形如：[{id:'0,name:'0-10'},{id:'10,name:'11-20'}]     张浩-20181120
      limit: 10,
      total_count: 0
    };
    dispatch(initialize(initObject));
  }
  componentWillReceiveProps(nextProps) {
    const { myValues, enableKeys, change, formName } = nextProps, self = this;
    const { initload } = this.state;
    const afterMyValues = Object.assign({}, myValues, {
      offset: 0,
      offsetNew: '0',
      limit: myValues.limit,
      total_count: 0,
    });
    const beforeMyValues = Object.assign({}, this.props.myValues, {
      offset: 0,
      offsetNew: '0',
      limit: myValues.limit,
      total_count: 0,
    });
    console.log(JSON.stringify(beforeMyValues) != JSON.stringify(afterMyValues))
    if (JSON.stringify(beforeMyValues) != JSON.stringify(afterMyValues)) {
      let reload = true;
      enableKeys.map((key, i) => {
        if (self.props.myValues && myValues &&
          (myValues[key] && self.props.myValues && self.props.myValues[key] && myValues[key] != self.props.myValues[key]) ||
          (myValues[key] && self.props.myValues && !self.props.myValues[key])
        ) {
          reload = false;
        }
      });

      if (reload && initload && !this.multipleValues) {
        change("offset", 0);
        change("offsetNew", '0');
        change("from", 'search');
        // }
        this.props.search(afterMyValues);
      } else {
        this.setState({
          initload: true
        })
        this.multipleValues = false;
      }
    }
  }
  componentWillUnmount() {
    const { dispatch, formName, rememberValue } = this.props;
    dispatch(destroy(formName));
  }
  searchList() {
    const { myValues, change, formName } = this.props;
    change("offset", 0);
    change("offsetNew", '0');
    change("from", 'search');
    this.props.search({ ...myValues, offset: 0, offsetNew: 0 });
  }
  changeValues(newValues) {
    const { myValues, change, initialize } = this.props;
    const values = { ...myValues, ...newValues, offset: 0, offsetNew: 0 };
    this.multipleValues = true;
    initialize(values);
    this.props.search({ ...values });
  }
  render() {
    const { formItemLayout: { labelCol, wrapperCol }, label, required } = this.props;
    return (
      <div className='search-form-wrap'>
        {this.props.children}
      </div>
    )
  }
}

const submitForm = (values, dispatch, props) => {
  console.log('呵呵呵搭～～～');
  const { change, formName } = props;
  props.search({ ...values });
}


const mapState = (state, props) => {
  const { formName = 'search_list' } = props;
  return {
    myValues: getFormValues(formName)(state)
  }
};





export default class SearchFormFactory extends React.Component {
  constructor(props) {
    super(props);
    this.changeValues = this.changeValues.bind(this);
    this.state = {
      MyForm: null
    }
  }
  static defaultProps = {
    formName: 'search_list'
  }
  componentDidMount() {
    const { formName, initialValues } = this.props;
    let MySearchForm = reduxForm({
      form: formName,
      onSubmit: submitForm,
      initialValues: { offset: 0, limit: 10, total_count: 0, ...initialValues },
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true
    })(SearchForm);
    MySearchForm = connect(mapState)(MySearchForm);



    this.setState({
      MyForm: MySearchForm
    })
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUnmount() {
  }
  searchGrid() {
    const { mySearchList } = this.refs;
    if (mySearchList.getWrappedInstance().refs && mySearchList.getWrappedInstance().refs.wrapped) {
      mySearchList.getWrappedInstance().refs.wrapped.refs.wrappedInstance.refs.wrapped.searchList();
    } else {
      mySearchList.getWrappedInstance().ref.getWrappedInstance().wrapped.searchList();
    }
  }
  changeValues(values) {
    const { mySearchList } = this.refs;
    console.log('mySearchList', mySearchList);
    if (mySearchList.getWrappedInstance().refs && mySearchList.getWrappedInstance().refs.wrapped) {
      mySearchList.getWrappedInstance().refs.wrapped.refs.wrappedInstance.refs.wrapped.changeValues(values);
    } else {
      mySearchList.getWrappedInstance().ref.getWrappedInstance().wrapped.changeValues(values);
    }
  }
  render() {
    const { MyForm } = this.state;
    if (MyForm) {
      return (
        <MyForm {...this.props} ref="mySearchList" ></MyForm>
      )
    } else {
      return null;
    }
  }
}
