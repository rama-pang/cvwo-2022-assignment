import React from 'react'

import {
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  HStack,
  VStack,
  Text,
  Center,
  Container,
  Box,
} from "@chakra-ui/react"

import axios from "axios"

import Tasks from "./Tasks"
import Task from "./Task"
import TaskForm from "./TaskForm"

import TaskFilter from './TaskFilter'

class MyTasks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      filterByTags: [],
      filterByStatus: "all",
      filterByPriority: "all",
      isLoading: true,
    }
    this.reloadTasks = this.reloadTasks.bind(this)
    this.getTasks = this.getTasks.bind(this)
    this.createTask = this.createTask.bind(this)
    this.changeFilterByStatus = this.changeFilterByStatus.bind(this)
    this.changeFilterByPriority = this.changeFilterByPriority.bind(this)
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  reloadTasks() {
    this.getTasks()
  }

  componentDidMount() {
    this.getTasks()
  }

  getTasks() {
    axios
      .get("/api/v1/tasks")
      .then(response => {
        this.setState({ isLoading: true })
        const tasks = response.data
        this.setState({ tasks })
        this.setState({ isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: true })
        console.log(error)
        this.setState({ isLoading: false })
      })
  }

  createTask(task) {
    const tasks = [task, ...this.state.tasks]
    this.setState({ tasks })
  }

  changeFilterByPriority(p) {
    this.setState({
      filterByPriority: p
    })
  }

  changeFilterByStatus(p) {
    this.setState({
      filterByStatus: p
    })
  }

  handleTagChange(filterByTags, b) {
    this.setState({filterByTags})
  }

  render() {
    return (
      <VStack spacing={6}>
        <Container>
          <Accordion allowToggle>
            <AccordionItem>
              <HStack spacing={2}>
                <TaskForm
                  reloadTasks={this.reloadTasks}
                  createTask={this.createTask}
                />
                <AccordionButton
                  as='button'
                  rounded='md'
                  fontWeight='semibold'
                  borderWidth='0px'
                  color='blue.600'
                  _hover={{
                    bg: 'blue.50'
                  }}
                  _active={{
                    bg: 'blue.100'
                  }}
                >
                  <Text align='center' flex='1' borderWidth='0px'>
                    Filter
                  </Text>
                </AccordionButton>
              </HStack>
              <AccordionPanel pb={4}>
                <TaskFilter
                  onTagChange={this.handleTagChange}
                  tags={this.state.filterByTags}
                  reloadTasks={this.reloadTasks}
                  changeFilterByPriority={this.changeFilterByPriority}
                  changeFilterByStatus={this.changeFilterByStatus}
                  filterByPriority={this.state.filterByPriority}
                  filterByStatus={this.state.filterByStatus}
                  filterByTags={this.state.filterByTags}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
        <Box w='100%'>
          {this.state.isLoading && (
          <Center>
            <Spinner
              thickness='3px'
              speed='0.6s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Center>)}
          {!this.state.isLoading && (
            <React.Fragment>
              <Tasks>
                {this.state.tasks.map((task, index) => (
                  <Task
                    reloadTasks={this.reloadTasks}
                    key={task.id}
                    task={task}
                    getTasks={this.getTasks}
                    filterByPriority={this.state.filterByPriority}
                    filterByStatus={this.state.filterByStatus}
                    filterByTags={this.state.filterByTags}
                  />
                ))}
              </Tasks>
            </React.Fragment>
          )}
        </Box>
      </VStack>
    )
  }
}

export default MyTasks
