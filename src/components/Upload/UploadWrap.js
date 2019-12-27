import React from 'react';
import ReactDOM from 'react-dom';
// import { file_upload } from '../store/action/menu'
import { Tabs, Button, Icon, Col, Row, Modal, Upload } from 'antd';
import { connect } from 'react-redux'
import { file_upload } from '../../store/action/menu'
class UploadWrap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            uploading: false,
          };
    }
    componentDidMount() {
    }
    beforeUpload=(file, fileList)=>{
        console.log('file, fileList' , file, fileList)
    }
  handleUpload = (file) => {
    const fileList = [file]
    const { dispatch } = this.props
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('avatar', file);
    });
    dispatch(file_upload(formData))
  };
  onChange = (event) => {
    event.file.name && event.fileList && event.fileList.length > 0 && this.handleUpload(event.file)
  }
    render() {
        const { fileList } = this.state;
        const props = {
            onRemove: file => {
              this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: file => {
              this.setState(state => ({
                fileList: [...state.fileList, file],
              }));
              return false;
            },
            fileList,
          }
      
        return (
          <div>
            <Upload {...props} onChange={this.onChange}>
              <Button>
                <Icon type="upload" /> 选择文件
              </Button>
            </Upload>
          </div>
        )
    }
}


const mapState = (state) => {
  return {
  }
};
export default connect(mapState)(UploadWrap)