import React, { useEffect, useState } from "react";
import { Divider, PageHeader, Row } from "antd";
import { ProductItem } from "./ProductItem";
import { ProductItemSkeleton } from "./ProductItemSkeleton";

export const ProductList = ( ) => {

    const [productList, setProductList] = useState(null)

    useEffect(() => {
        getItem();
    }, [])

    const getItem  = () => {
        setProductList( JSON.parse( localStorage.getItem("productList") || null  ))
    }

    return (
        <>              
            <PageHeader
                className="site-page-header"
                title="All products"                
                subTitle=""
            />
            <Divider />
            <Row>
                {
                    (productList && productList.length > 0 )
                    ? productList?.map( (i, index) => <ProductItem key={index}  item={i}/>  )
                    : [1,2,3,4,5,6].map( prod => <ProductItemSkeleton key={prod} /> )
                }
            </Row>
        </>
    );
};
