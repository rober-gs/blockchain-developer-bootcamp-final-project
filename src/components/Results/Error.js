import React from 'react'
import { Result } from 'antd'

export const Error = ( error ) => {    
    return (
        <Result
            status={"error" }
            title={ "Failed!" } 
            subTitle={ error }                                   
        />
    )
    
}
