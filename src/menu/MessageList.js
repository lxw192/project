import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { reduxForm , submit , getFormValues , Form , change } from 'redux-form'
import { Layout, Menu, Breadcrumb, Icon , Carousel , Avatar , Badge , BackTop , Dropdown , Drawer } from 'antd';
import moment from 'moment';
class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onClose=()=>{
        console.log("11111111111")
        const { dispatch } = this.props
        dispatch(change('menu' , 'lock' , false ))
    }
    render() {
        return (
            <div>
                <Drawer
                    title={<div style={{lineHeight:'30px' , fontWeight:700}}>消息提醒</div>}
                    onClose={this.onClose}
                    width={900}
                    closable={false}
                    visible={true}
                    keyboard={true}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>
        )
    }
}
const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
}
MessageList = reduxForm({
    form: 'MessageList',
    onSubmit: submitForm,
})(MessageList)
const mapState = (state) => {
    return {}
};
export default connect(mapState)(MessageList);