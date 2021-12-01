## SWC-115
`tx.origin` is not used, instead the `msg.sender()` is used.


## SWC-118
the use of the `contructor()` is performed in the contract 

## SWC-103 

Specific compiler pragma `0.8.10` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-104

All callback values are validated, they are validated by using `require`

## Using Specific Compiler Pragma 

## Use Modifiers Only for Validation