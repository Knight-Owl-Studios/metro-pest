import React from 'react'
import { TextInputField } from 'evergreen-ui'
import { small } from '../typography.module.css'

const ServiceAddress = ({ errors, onInput }) => (
  <div>
    <p className={small}>Service Address</p>
    <TextInputField
      label="First Name"
      name="firstName"
      isInvalid={!!(errors.firstName || errors.all)}
      validationMessage={errors.firstName}
      onInput={onInput}
    />
    <TextInputField
      label="Last Name"
      name="lastName"
      isInvalid={!!(errors.lastName || errors.all)}
      validationMessage={errors.lastName}
      onInput={onInput}
    />
    <TextInputField
      label="Street Address"
      name="streetAddress"
      isInvalid={!!(errors.streetAddress || errors.all)}
      validationMessage={errors.streetAddress}
      onInput={onInput}
    />
    <TextInputField
      label="Zip Code"
      name="zipCode"
      isInvalid={!!(errors.zipCode || errors.all)}
      validationMessage={errors.zipCode}
      onInput={onInput}
    />
  </div>
)

export default ServiceAddress
