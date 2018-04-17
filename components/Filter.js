import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { binder } from '../../lib/_utils'

class Filter extends Component {
  constructor (props) {
    super(props)
    binder(this, [''])
  }

  componentDidMount () {}

  render () {
    return (
      <div className='outer-wrapper'>
        <div className='inner-wrapper'></div>
        <style jsx>{`
          .outer-wrapper{}
          .inner-wrapper{}
        `}</style>
      </div>
    )
  }
}

Filter.propTypes = {}

export default Filter