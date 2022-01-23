import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  FormControl,
  FormLabel,
  HStack,
  VStack,
} from '@chakra-ui/react'

import {
  Select,
} from "chakra-react-select";

import TagsInput from './TagsInput'

class TaskFilter extends React.Component {
  constructor(props) {
    super(props)
    this.filterByPriorityRef = 'all'
    this.filterByStatusRef = 'all'
  }

  render() {
    const Renderer = () => {
      const [statusInput, setStatusInput] = React.useState({
        label: this.filterByStatusRef,
        value: this.filterByStatusRef,
      })
      const handleStatusChange = (e) => {
        setStatusInput(e)
        this.filterByStatusRef = JSON.parse(JSON.stringify(e.value))
        this.props.changeFilterByStatus(e.value)
      }

      const [priorityInput, setPriorityInput] = React.useState({
        label: this.filterByPriorityRef,
        value: this.filterByPriorityRef,
      })
      const handlePriorityChange = (e) => {
        setPriorityInput(e)
        this.filterByPriorityRef = JSON.parse(JSON.stringify(e.value))
        this.props.changeFilterByPriority(e.value)
      }

      return (
        <VStack spacing={4}> 
          <Container>
            <HStack spacing='6px' flex='1' align='center'>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={statusInput}
                  onChange={handleStatusChange}
                  id="status-filter"
                  options={[
                    {
                      label: "all",
                      value: "all",
                    },
                    {
                      label: "not-started",
                      value: "not-started",
                    },
                    {
                      label: "in-progress",
                      value: "in-progress",
                    },
                    {
                      label: "complete",
                      value: "complete",
                    },
                  ]}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  value={priorityInput}
                  onChange={handlePriorityChange}
                  id="priority-filter"
                  options={[
                    {
                      label: "all",
                      value: "all",
                    },
                    {
                      label: "low",
                      value: "low",
                    },
                    {
                      label: "medium",
                      value: "medium",
                    },
                    {
                      label: "high",
                      value: "high",
                    },
                  ]}
                />
              </FormControl>
            </HStack>
          </Container>
          <TagsInput formTitle="Tags" onTagChange={this.props.onTagChange} tags={this.props.tags} />
        </VStack>
      )
    }

    return (<Renderer />)
  }
}

export default TaskFilter

TaskFilter.propTypes = {
  changeFilterByPriority: PropTypes.func.isRequired,
  changeFilterByStatus: PropTypes.func.isRequired,
  filterByPriority: PropTypes.string.isRequired,
  filterByStatus: PropTypes.string.isRequired,
}
