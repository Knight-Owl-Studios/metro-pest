import PropTypes from 'prop-types'

export default PropTypes.arrayOf(
  PropTypes.shape({
    _key: PropTypes.string,
    _type: PropTypes.string,
    children: PropTypes.arrayOf([
      PropTypes.shape({
        _key: PropTypes.string,
        _type: PropTypes.string,
        marks: PropTypes.arrayOf(PropTypes.shape({})),
        text: PropTypes.string
      })
    ]),
    markDefs: PropTypes.arrayOf(PropTypes.shape({})),
    style: PropTypes.string
  })
)
