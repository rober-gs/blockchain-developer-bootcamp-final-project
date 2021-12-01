import React from 'react'
import { Button, Result } from 'antd'

export const Succes = (tx) => {
    return (
        <Result
            status={"success" }
            title={ "Successfully Register!" } 
            subTitle={ JSON.stringify(tx, "", 2 )}                        
            extra={[
                <Button 
                    type="primary" 
                    key="check" 
                    onClick={ ()=> window.open(`https://rinkeby.etherscan.io/tx/${tx.hash}`, "_blank") }>
                    Check transaction
                </Button>
            ]}
        />
    )
}
