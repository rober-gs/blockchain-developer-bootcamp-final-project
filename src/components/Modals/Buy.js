import { Button, Modal, Result } from 'antd';
import React, { useEffect, useState } from 'react'
import useContract from '../../hooks/useContract';
import useSeller from '../../hooks/useSeller';

export const Buy = (id, price) => {


    const contract = useContract();
    const { addProduct, dataContract,  getProductList } = useSeller();
    const { addProductTxHash } = dataContract;

    const [show, setShow] = useState(true);

    useEffect(() => {
        console.log("id, price", id, price)
    }, [])


    return (
        <>


      </>
    )
}
