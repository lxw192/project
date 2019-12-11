import React,{PropTypes} from 'react';
import ReactDOM from 'react-dom';      
import cx from 'classnames';
import './MaskProgress.less';

class MaskProgress extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            percent:10
        }
    }
    static defaultProps={ 
        title:'此操作可能耗费较长时间，请等待......', 
        show:false,
        close:()=>{

        }
    }  
    componentDidMount(){  
    }  
    componentWillReceiveProps(nextProps){   
    }
    componentDidUpdate(prevProps,prevState){  
    }
    componentWillUnmount() {  
        
    }  
    render() {
        const { taskMask, show, title } = this.props;
        if (show) {
            return (
                <div className={`mask`}>
                    <div className={`box`}>
                        <div><span></span></div>
                        <div><span></span></div>
                        <div><span></span></div>
                        <div><span></span></div>
                    </div>
                </div>
            )
        } else {
            return null;
        } 
    }
}



export default MaskProgress;
