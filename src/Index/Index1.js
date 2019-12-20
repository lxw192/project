import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import moment from 'moment'
import { file_upload } from '../store/action/menu'
import InputField from '../components/InputField/InputField'
import { reduxForm, submit, getFormValues, Form, formValueSelector, change } from 'redux-form'
import PaginationWrop from '../components/PaginationWrop/PaginationWrop'
import SearchForm from '../components/SearchForm/SearchForm'
import { Tabs, Button, Icon, Col, Row } from 'antd';
import { connect } from 'react-redux'
import $ from 'jquery'
import { get_house_list, creat_house_list } from './../store/action/index'
let areaData = [
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
let rateData = [
    { label: '40~70万', value: '40~70' },
    { label: '70~100万', value: '70~100' },
    { label: '100~130万', value: '100~130' },
    { label: '130~160万', value: '130~160' },
    { label: '160~190万', value: '160~190' },
    { label: '220~250万', value: '220~250' },
    { label: '250万以上', value: '250+' },
]
let acreageData = [
    { label: '50~70㎡', value: '50~70' },
    { label: '70~90㎡', value: '70~90' },
    { label: '90~110㎡', value: '90~110' },
    { label: '110~130㎡', value: '110~130' },
    { label: '130~150㎡', value: '130~150' },
    { label: '150~180㎡', value: '150~180' },
    { label: '180㎡以上', value: '180+' },
]
let orientationData = [
    { label: '东', value: '东' },
    { label: '南', value: '南' },
    { label: '西', value: '西' },
    { label: '北', value: '北' },
]
let floorData = [
    { label: '底层', value: '底层' },
    { label: '中层', value: '中层' },
    { label: '高层', value: '高层' },
    { label: '顶楼', value: '顶楼' },
]
let tower_age_Data = [
    { label: '5年', value: '5' },
    { label: '10年', value: '10' },
    { label: '15年', value: '15' },
    { label: '20年', value: '20' },
    { label: '20以上', value: '20+' },
]
let decorationData = [
    { label: '精装修', value: '精装修' },
    { label: '简装修', value: '简装修' },
    { label: '毛坯房', value: '毛坯房' },
]
let purposeData = [
    { label: '普通住宅', value: '普通住宅' },
    { label: '商业', value: '商业' },
    { label: '别墅', value: '别墅' },
    { label: '四合院', value: '四合院' },
    { label: '其他', value: '其他' },
]
let ownershipData = [
    { label: '商品房', value: '商品房' },
    { label: '公房', value: '公房' },
    { label: '经济房', value: '经济房' },
    { label: '其他', value: '其他' },
]
const formItemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 23 },
};
class Index1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        const { dispatch } = this.props
        // dispatch(get_house_list('?offset=0&limit=10'))
        setTimeout(()=>{
            dispatch(change('home_form' , 'aaa' , 0))
        })
    }
    onChange = (value, files) => {
        const { dispatch } = this.props

        let file = value.target.files[0];
        console.log('file', file)
        let formData = new FormData();
        formData.append('avatar', file);
        if (file.name) {
            dispatch(file_upload(formData))
        }
    }
    fileCallBack = () => {

    }
    searchGrid = (values) => {
        const { dispatch } = this.props;
        console.log(values)
        let parmas = []
        parmas.push("?offset=" + values.offset);
        parmas.push("&limit=" + values.limit);
        if(values.area)parmas.push("&area=" + values.area);
        if(values.orientation)parmas.push("&orientation=" + values.orientation);

        dispatch(get_house_list(parmas.join('')))
    }
    render() {
        const { house_list } = this.props;
        console.log(house_list)
        let str = '紫绶园 东南不临街两居室 精装自住装修'
        console.log(moment('qqq', 'HH:mm').isValid())
        const { url } = this.props
        return (
            <div className={`housing_information`}>
                {/* <input id="file" type="file" name="image" size="50" onChange={this.onChange}/>
               {url ? <img src={`./img/${url}`} /> : null} */}
                <SearchForm formName='home_form' enableKeys={['keysearch']} search={this.searchGrid} ref="home_ref">
                    <div className={`search`}>
                        <Row>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`位置`} name='area' type='radio' options={areaData} placeholder={'请选择位置'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`售价`} name='rate' type='radio' options={rateData} placeholder={'请选择售价'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`面积`} name='acreage' type='radio' options={acreageData} placeholder={'请选择面积'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`朝向`} name='orientation' type='radio' options={orientationData} placeholder={'请选择朝向'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`楼层`} name='floor' type='radio' options={floorData} placeholder={'请选择楼层'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`楼龄`} name='tower_age' type='radio' options={tower_age_Data} placeholder={'请选择楼龄'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`装修`} name='decoration' type='radio' options={decorationData} placeholder={'请选择装修'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`用途`} name='purpose' type='radio' options={purposeData} placeholder={'请选择用途'} />
                                </div>
                            </Col>
                            <Col>
                                <div style={{ height: '30px' }}>
                                    <InputField formItemLayout={formItemLayout} label={`权属`} name='ownership' type='radio' options={ownershipData} placeholder={'请选择权属'} />
                                </div>
                            </Col>

                        </Row>
                    </div>
                    <div className={`housing_information_list`}>
                        <Row>
                            {
                                house_list && house_list.length > 0 && house_list.map((item, index) => {
                                    return (
                                        <Col key={index} span={12}>
                                            <div className={'list'}>
                                                <div>
                                                    {console.log(`${__dirname}img/${item.img_url}`)}
                                                    <img src={`${__dirname}img/${item.img_url}`} alt="" />
                                                </div>
                                                <div>
                                                    <p title={`${str.length > 18 ? str : ''}`}>{str}</p>
                                                    <div>地址</div>
                                                    <div><img src={`${__dirname}img/icon/house.png`} />具体信息</div>
                                                    <div><img src={`${__dirname}img/icon/time.png`} />发布时间</div>
                                                </div>
                                                <div>
                                                    <div className={`price`}>252 万</div>
                                                    <div className={`univalence`}>单价59986元/平米</div>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <PaginationWrop formName='home_form' onChange={this.searchGrid}></PaginationWrop>
                    </div>
                </SearchForm>

            </div >
        )
    }
}


const submitForm = (values, dispatch, props) => {
    console.log(values, dispatch, props)
}
const selector = formValueSelector('home')
Index1 = reduxForm({
    form: 'home',
    onSubmit: submitForm,
})(Index1)

const mapState = (state) => {
    const { home: { house_list } } = state
    return {
        house_list,
        url: selector(state, 'url')
    }
};

export default connect(mapState)(Index1);