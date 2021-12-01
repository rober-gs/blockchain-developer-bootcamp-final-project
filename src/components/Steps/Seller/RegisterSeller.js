import React, { useState } from "react";
import { Button, message, Steps } from 'antd'

import { DollarOutlined } from '@ant-design/icons';
import { CoffeeOutlined } from '@ant-design/icons';

// Steps
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";


const { Step } = Steps;

const steps = [
    {
        title: 'Pay',
        description: 'Make payment', 
        content: <StepOne />,
        icon: <DollarOutlined />         
    },
    {
        title: 'Enjoy',
        description: '', 
        content: <StepTwo />,
        icon: <CoffeeOutlined />
    },

];

export const RegisterSeller = () => {
    
    const [current, setCurrent] = useState(0);
    const pay = () => {
        setCurrent(current + 1);
    };

    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step 
                        key={item.title} 
                        title={item.title} 
                        description={item.description}
                        icon={item.icon}
                    />
                ))}
            </Steps>
            <div className="steps-content">
                { steps[current].content }                                        
            </div>
            <div className="steps-action">
                {
                    current === 0 && (
                        <Button 
                            style={{ marginTop: 16}}                            
                            type="primary"                    
                            shape="round"
                            size="large"
                            onClick={() => pay()}
                        >
                            Next
                        </Button>
                    )
                }
            </div>
        </>
    );
};
