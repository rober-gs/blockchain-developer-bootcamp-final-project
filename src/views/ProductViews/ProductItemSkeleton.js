import React from 'react'
import { Skeleton, Card, Avatar, Col } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

const { Meta } = Card;

export const ProductItemSkeleton = () => {
    return (
        <Col span={8}>
            <Card
                // style={{ width: 300, marginTop: 16 }}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Skeleton loading={true} avatar active>
                    <Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Skeleton>
            </Card>
        </Col>
        
    )
}
