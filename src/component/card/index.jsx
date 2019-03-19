/*
 * @Author: 伟龙-Willon qq:1061258787 
 * @Date: 2019-03-19 14:50:30 
 * @Last Modified by: 伟龙-Willon
 * @Last Modified time: 2019-03-19 15:20:44
 */
 /* 卡片 */
import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

export default ({area_id,baseURL}) => (
    <Card
        cover={ <Link to={baseURL + area_id}> <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /> </Link>}
        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
    >
        <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="This is the description"
        />
    </Card>
)