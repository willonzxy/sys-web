/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 15:34:54 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-29 14:10:39
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Upload,message
} from 'antd';
import API from '../api.js';
import qs from 'querystring'
const { upload,register } = API;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  
/*   normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  } */

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, {confirm,prefix,...data}) => {
      if (!err) {
        if(data.licence.file.response.status === 1){
          data.licence = data.licence.file.response.path
          console.log(data)
          let { signIn:{url,method} } = register;
          fetch(url,{method,body:qs.stringify(data),headers:{'content-type':'application/x-www-form-urlencoded'}})
          .then(res=>{
            console.log(res)
            return res
          })
          .then(res=>res.json())
          .then(res=>{
            console.log(res)
            if(res.status === 1){
              message.success('注册成功')
              return
            }
          })
          return
        }
      }
      message.error('注册失败！请按照提示填入');
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className="bg">
          <Link to="/"><div className="bar">登录</div></Link>
          <div className="register-box">
            <div className="left-side">
              <h1>注册使用</h1>
              <div className="container">
                <div className="item-a"></div>
                <div className="item-b"></div>
                <div className="item-c"></div>
                <div className="item-d"></div>
                <div className="item-e"></div>
              </div>
            </div>
            <div className="input-group">
              <div className="platform-name">IOT<sup>TM</sup></div>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                  label="负责人电话"
                >
                  {getFieldDecorator('tel', {
                    rules: [{ required: true, message: '填入联系人电话!' }],
                  })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                  )}
                </Form.Item>
                <Form.Item
                  label={(
                    <span>
                      公司负责人
                    </span>
                  )}
                >
                  {getFieldDecorator('leader', {
                    rules: [{ required: true, message: '公司负责人名称!', whitespace: true }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item
                  label="密码"
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: '填入密码!',
                    }, {
                      validator: this.validateToNextPassword,
                    }],
                  })(
                    <Input type="password" />
                  )}
                </Form.Item>
                <Form.Item
                  label="确认密码"
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: '请确认好密码!',
                    }, {
                      validator: this.compareToFirstPassword,
                    }],
                  })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                  )}
                </Form.Item>
                <Form.Item
                  label="公司名称"
                >
                  {getFieldDecorator('company_name', {
                    rules: [{
                      required: true, message: '填入公司名称',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item
                  label="公司地址"
                >
                  {getFieldDecorator('site', {
                    rules: [{
                      required: true, message: '填入公司地址',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item
                  label={(<span>
                    工商执照&nbsp;
                    <Tooltip title="上传有效证件图片方便工作人员审核">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>)}
                >
                  {getFieldDecorator('licence', {
                   /*  valuePropName: 'fileList', */
                    /* getValueFromEvent: this.normFile, */
                    rules: [{
                      required: true, message: '上传工商执照',
                    }]
                  })(
                    <Upload name="licence" action={`${upload.path}?scene_id=licence`} listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                  )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">Register</Button>
                </Form.Item>
              </Form>
            </div>
        </div>
        <footer className="footer">IOT System ©2019 Created by Willon</footer>
      </div>
      
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
 export default WrappedRegistrationForm