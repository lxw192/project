import React from 'react'; 
import ReactDOM from 'react-dom'; 
import Index2 from './Index2'
import moment from 'moment'
class Index1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    
    render(){
        console.log(moment('qqq' , 'HH:mm').isValid())
        return (
            <div>
                首页sddf
                {/* <Index2>
                <div className='parent'>
                    qwe
                </div>
                </Index2>
                 */}
                
            </div> 
        )
    }
}
export default Index1