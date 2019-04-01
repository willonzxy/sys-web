/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-18 17:07:55 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-04-01 15:32:55
 */
import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,message
} from 'antd';
import { Link } from 'react-router-dom'
import API from '../api.js';
import md5 from 'md5'
import './index.css';
const { login } = API;

class NormalLoginForm extends React.Component {
    constructor(){
        super(...arguments)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, {remember,...data}) => {
            if (!err) {
                console.log('Received values of form: ', data);
                let {path:url,method} = login.signOn;
                data.password = md5(data.password);
                fetch(`http://localhost:4000/company/login`,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
                .then(res=>res.json())
                .then(res=>{
                    if(res.status === 1){
                        message.success('登录成功')
                        this.props.history.push({
                          pathname:'/domain',
                          params:{
                            tel:data.tel
                          }
                        })
                        return
                      }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div>
            <video className="video" src="/index.mp4" autoPlay loop/>
            <div className="login-box">
                <div className="platform-name">IOT<sup>TM</sup></div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('tel', {
                            initialValue:this.props.match.params.tel,
                            rules: [{ required: true, message: 'Please input your tell!' }],
                        })(
                            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="tell" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
            <footer className="footer">IOT System ©2019 Created by Willon</footer>
        </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm