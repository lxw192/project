import React from 'react';  
import { Carousel } from 'antd'
import moment  from 'moment'
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
    render(){
        return (
            <div>
                主页123
                {/* <div>{moment().unix()}</div>
                <div>{moment().startOf('day').unix()}</div>
                <div style={{ textAlign: 'center' }}>
                    <Carousel autoplay>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </div> */}
            </div> 
        )
    }
}
export default Index