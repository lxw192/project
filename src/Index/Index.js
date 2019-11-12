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
        // switch (value.date()) {
        //   case 8:
        //     listData = [
        //       { type: 'warning', content: 'This is warning event.' },
        //       { type: 'success', content: 'This is usual event.' },
        //     ];
        //     break;
        //   case 10:
        //     listData = [
        //       { type: 'warning', content: 'This is warning event.' },
        //       { type: 'success', content: 'This is usual event.' },
        //       { type: 'error', content: 'This is error event.' },
        //     ];
        //     break;
        //   case 15:
        //     listData = [
        //       { type: 'warning', content: 'This is warning event' },
        //       { type: 'success', content: 'This is very long usual event。。....' },
        //       { type: 'error', content: 'This is error event 1.' },
        //       { type: 'error', content: 'This is error event 2.' },
        //       { type: 'error', content: 'This is error event 3.' },
        //       { type: 'error', content: 'This is error event 4.' },
        //     ];
        //     break;
        //   default:
        // }
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
                    <div style={{width:'50%'}}>
                        <Calendar dateCellRender={this.dateCellRender.bind(this)} monthCellRender={this.monthCellRender.bind(this)} />
                    </div>
                </div>
            </div> 
        )
    }
}
export default Index