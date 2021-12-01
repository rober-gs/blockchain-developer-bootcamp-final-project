
import { Carousel } from 'antd';
import React  from 'react'
import { useAppContext } from '../AppContext';
import { ProductList } from './ProductViews/ProductList';

export const HomePage = () => {

    const { dataContract  } = useAppContext();

    const { productList } = dataContract;

    return (
        <>
            <Carousel autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <ProductList items={productList} />
        </>
    );
}

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };