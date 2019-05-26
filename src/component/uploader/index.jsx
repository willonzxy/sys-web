/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 21:22:41 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-19 21:31:21
 */
import React from 'react'
import { Upload, message, Button, Icon,} from 'antd';
  
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
}

export { props };

export default props => (
    <Upload {...props}>
        <Button>
            <Icon type="upload" /> { props.text || `Click to Upload` }
        </Button>
    </Upload>
)