import PropTypes from 'prop-types'

export default PropTypes.shape({
  heading: PropTypes.string,
  number: PropTypes.shape({
    number: PropTypes.string
  })
})
