import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, getFormValues, change } from 'redux-form';
import { Row, Col, Input, Pagination } from 'antd';
const InputGroup = Input.Group;


let formName = ''
class PaginationWrop extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
        }
    }
    static defaultProps = {
        onChange: (values) => {

        },
        formName: 'search_list',
        style: {},
    }
    componentDidMount() {
        formName = this.props.formName
    }
    componentWillReceiveProps(nextProps) {
    }
    componentWillUnmount() {
    }
    onChange(page, limit) {
        console.log(page, limit)
        const { myValues = {}, dispatch, formType, formName } = this.props;
        dispatch(change(formType ? formType : formName, 'offset', ((page - 1) * limit)))
        this.props.onChange({
            ...myValues,
            offset: ((page - 1) * limit),
        })
    }
    onShowSizeChange = (current, pageSize) => {
        const { myValues = {}, dispatch, formType, formName } = this.props;
        dispatch(change(formType ? formType : formName, 'offset', ((current - 1) * pageSize)))
        dispatch(change(formType ? formType : formName, 'limit', pageSize))
        this.props.onChange({
            ...myValues,
            offset: ((current - 1) * pageSize),
            limit: pageSize,
        })
    }
    render() {
        const { myValues = {}, style = {} } = this.props;
        const { total_count } = myValues;
        return (
            <div style={{marginBottom:'20px'}}>
                <Pagination style={{ textAlign: 'right', marginTop: '15px', ...style }}
                    onChange={this.onChange}
                    current={myValues.offset ? parseInt(myValues.offset / myValues.limit) + 1 : 1}
                    pageSize={myValues.limit}
                    total={myValues.total_count}
                    showTotal={(total_count, range) => `当前： ${range[0]}-${range[1]} 条 共 ${total_count} 条`}
                />
            </div>

        )
    }
}

// export default PaginationWrop
PaginationWrop = reduxForm({
    form: formName,
})(PaginationWrop)

const mapState = (state) => {
    return {
        myValues:getFormValues(formName)(state)
    }
};

export default connect(mapState)(PaginationWrop);
