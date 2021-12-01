import { Card, Col } from 'antd'
import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card;

export const ProductItem = ( {item} ) => {

   
   const [id, title, description, price, status, seller, buyer ] =  item;

    return (
        <Col span={8}>
        <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://random.imagecdn.app/500/350" />}
                actions={[

                    <SettingOutlined key="setting" key="buy" onClick={ () => console.log("object")}/>,
                    <EllipsisOutlined key="ellipsis" key="qualify"  onClick={ () => console.log("object")}/>,
                ]}
        >
            <Meta title={title} description={description} />
        </Card>
    </Col>
    )
}
