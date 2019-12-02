import React from 'react';  
import { Carousel } from 'antd'
import moment  from 'moment'
import { Calendar, Badge } from 'antd';
class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        console.log('11111111111' , this.props)
        const { dispatch } = this.props
        // dispatch(getname())
    }
    getListData(value){
        let listData=[];
        return listData || [];
      }
      onClick=(index , day)=>{
        console.log(index , day.date())
      }
      dateCellRender=(value)=>{
        const listData = this.getListData.bind(this , value )();
        return (
          <ul className="events">
            {listData.map( (item , index) => (
              <li key={item.content} onClick={this.onClick.bind(this , index , value)}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))}
          </ul>
        );
      }
      
      getMonthData=(value)=>{
        if (value.month() === 8) {
          return 1394;
        }
      }
      
      monthCellRender=(value)=>{
        const num = this.getMonthData.bind(this , value);
        return num ? (
          <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }
    render(){
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <div>
                        <Calendar dateCellRender={this.dateCellRender.bind(this)} monthCellRender={this.monthCellRender.bind(this)} />
                    </div>
                </div>
            </div> 
        )
    }
}
export default Index