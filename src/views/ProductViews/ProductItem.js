import { Button, Card, Col, Modal, Popconfirm, Result } from 'antd'
import React from 'react'
import { DollarOutlined, TagOutlined, LockOutlined} from '@ant-design/icons'
import { customFormat } from '../../utils/utilities';
import useContract from '../../hooks/useContract';
import useSeller from '../../hooks/useSeller';
import { Link } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';

const { Meta } = Card;

export const ProductItem = ( {item} ) => {
   
    const [id, title, description, price, status, seller, buyer ] =  item;
    console.log(item);

    const contract = useContract();
    const { buyProduct, dataContract,  getProductList } = useSeller();
    let { buyProductTxHash } = dataContract;
    
    const onBuy =  (id, price) => {
        buyProduct(contract, {id, price}).then(
            getProductList(contract)
        );
    }

    const OnSale = () => {
        return [
            <TagOutlined 
                placement="top"
                key="qualify"
                title={`${customFormat(price)} ETH`}
            />,   
            <Popconfirm placement="top" title={"Are you sure to buy?"} onConfirm={()=> { onBuy(id, price)}} okText="Yes" cancelText="No">
                <DollarOutlined  key="setting" key="buy" />
            </Popconfirm>
        ]
            
        
    }
    const Sold = () => {
        return [
            <LockOutlined 
                placement="top"
                key="qualify"
                title={`SOLD`}
            />,   
            <Popconfirm placement="top" title={"This product has already been sold"} onConfirm={()=> { console.log( "SOLD ")}} okText="Yes">
                <DollarOutlined  key="setting" key="buy" />
            </Popconfirm>]
        
    }

    return (
        <Col span={8}>
            { 
                buyProductTxHash  &&
                <Modal
                    title=" Buy Product ..."
                    visible={true}
                    closable={false}
                    // onOk={}
                    // onCancel={this.handleCancel}
                    okButtonProps={{ disabled: true }}
                    cancelButtonProps={{ disabled: true }}
                >
                    <Result
                        status="success"
                        title="Successfully Purchased!"
                        subTitle={buyProductTxHash.transactionHash}
                        extra={[
                            <Button 
                                type="link" 
                                key="check" 
                                
                                onClick={ ()=> window.open(`https://rinkeby.etherscan.io/tx/${buyProductTxHash.transactionHash}`, "_blank") }>
                                Check transaction
                            </Button>,
                            <Button
                                type="primary"
                                key="Go"
                                onClick={ ()=> window.location.reload() }
                            >
                                Done !
                                
                            </Button> 
                        ]}
                    />
                </Modal>
            }
             
        <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src="https://random.imagecdn.app/500/350" />}
                actions={[
                    status == 0 ? OnSale() :
                        status == 1 ? Sold() : null
                ]}
        >
            <Meta title={title} description={ status == 0 ? `${  customFormat(price)} ETH` : status === 1 ? <Text delete>SOLD</Text> : ""} />
        </Card>
    </Col>
    )
}
