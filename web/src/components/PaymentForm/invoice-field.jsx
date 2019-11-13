import React from 'react'
import { TextInputField } from 'evergreen-ui'

const InvoiceField = props => (
  <TextInputField type="number" label="Invoice Number" name="invoiceNumber" {...props} />
)

export default InvoiceField
