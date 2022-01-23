import React from 'react'

import {
  Wrap,
} from '@chakra-ui/react'

class Tasks extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Renderer = () => {
      return (
        <React.Fragment>
          <Wrap spacing='30px' flex='1' justify='center'>
            {this.props.children}
          </Wrap>
        </React.Fragment>
      )
    }

    return (<Renderer />)
  }
}

export default Tasks
