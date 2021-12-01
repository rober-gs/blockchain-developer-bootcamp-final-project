import React, { useState } from 'react'
import {Form, Input, Button} from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import useSeller from '../../hooks/useSeller';
import useContract from '../../hooks/useContract';
import { Result, Spin } from 'antd'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

export const FormBuyer = () => {

    const contract = useContract();
    const { addProduct, dataContract,  getProductList } = useSeller();
    const { addProductTxHash } = dataContract;
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {

        setLoading(true);

        addProduct(contract, values).then(
            setLoading(false)
        );
        getProductList(contract);
    };

    return (         


      (addProductTxHash)
      ?    <Result
              status={"success" }
              title={ "Successfully!" } 
              subTitle={ JSON.stringify(addProductTxHash, "", 2 )}                        
              extra={[
                  <Button 
                      type="primary" 
                      key="check" 
                      onClick={ ()=> window.open(`https://rinkeby.etherscan.io/tx/${addProductTxHash.hash}`, "_blank") }>
                      Check transaction
                  </Button>
              ]}
          />
      : 
         loading ? <Spin  size="large" />
           : <Form {...layout} name="nest-messages" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="Name"
                  tooltip="what is the name of your product?"
                  rules={[{ required: true, message: 'Please input is required!', whitespace: true }]}
                >
                  <Input />
                </Form.Item>            
                <Form.Item
                  name="description"
                  label="Description"    
                  placeholder=" about your product"          
                >
                <Input.TextArea showCount maxLength={250} />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <Input prefix={<DollarOutlined />} style={{ width: '100%' }} />
                </Form.Item>                        
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
     
    )
}
