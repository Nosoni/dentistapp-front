import PropTypes from 'prop-types'

const Repetidor = props => {
  // ** Props
  const { count, tag, component, children, ...rest } = props
  const Tag = tag
  console.log("tag", Tag)

  const items = []

  for (let i = 0; i < count; i++) {
    items.push(children(i))
  }

  return <Tag {...rest}>{items}</Tag>
}

Repetidor.propTypes = {
  count: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired
}

Repetidor.defaultProps = {
  tag: 'div'
}

export default Repetidor
