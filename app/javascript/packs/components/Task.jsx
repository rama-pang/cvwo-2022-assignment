import React from 'react'
import PropTypes from 'prop-types'

import _ from 'lodash'
import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'

import TagsInput from './TagsInput'

import {
  Container,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  Box,
  Badge,
  Button,
  Tag,
  TagLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Textarea,
  HStack,
  Stack,
  VStack,
  Wrap,
  StackDivider,
  Spacer,
  Divider,
}  from "@chakra-ui/react"

import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  Select,
} from "chakra-react-select";

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      status: this.props.task.status,
      priority: this.props.task.priority,
      tags: this.props.task.tags,
    }

    this.tagsChange = JSON.parse(JSON.stringify(this.state.tags))
    this.handleTagChange = this.handleTagChange.bind(this)

    this.statusChange = JSON.parse(JSON.stringify(this.state.status))
    this.priorityChange = JSON.parse(JSON.stringify(this.state.priority))

    this.handleChange = this.handleChange.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.inputRef = React.createRef()
    this.descriptionRef = React.createRef()

    this.handleDestroy = this.handleDestroy.bind(this)
    this.path = `/api/v1/tasks/${this.props.task.id}`
  }

  handleChange() {
    this.setState({
      status: this.statusChange,
      priority: this.priorityChange,
    })
    if (this.inputRef.current) {
      this.updateTask()
    }
  }

  updateTask() {
    setAxiosHeaders()
    axios
      .put(this.path, {
        task: {
          title: this.inputRef.current.value,
          description: this.descriptionRef.current.value,
          status: this.statusChange,
          priority: this.priorityChange,
        }
      })
      .then(response => {
        this.props.getTasks()
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleDestroy() {
    setAxiosHeaders()
    axios
      .delete(this.path)
      .then(response => {
        this.props.getTasks()
      })
      .catch(error => {
        console.log(error)
      })    
  }

  handleTagChange(newTags, b) {
    this.tagsChange = JSON.parse(JSON.stringify(newTags))
    if (b) {
      this.setState({
        tags: newTags
      })
      setAxiosHeaders()

      axios
        .put(this.path, {
          task: {
            tags: this.tagsChange,
          }
        })
        .then(response => {
          this.props.getTasks()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  isNotRendered() {
    if (this.props.filterByPriority != "all" &&
        this.props.filterByPriority != this.state.priority) {
      return true
    }

    if (this.props.filterByStatus != "all" &&
        this.props.filterByStatus != this.state.status) {
      return true
    }

    if (!this.props.filterByTags.every(tag => this.state.tags.includes(tag))) {
      return true
    }

    return false
  }

  render() {
    const { task } = this.props

    function getStatusBadgeColor(status) {
      return status == "not-started" ? 'red' : status == "in-progress" ? 'blue' : 'green'
    }

    function getPriorityBadgeColor(priority) {
      return priority == "low" ? 'cyan.400' : priority == "medium" ? 'orange' : 'red'
    }

    const RenderTask = ({ task }) => {
      const initialTitleValue = JSON.parse(JSON.stringify(task.title))
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [nameInput, setNameInput] = React.useState(task.title)
      const isNameError = nameInput == ''
      const handleNameChange = (e) => setNameInput(e.target.value)

      const initialStatusValue = {
        label: JSON.parse(JSON.stringify(task.status)),
        value: JSON.parse(JSON.stringify(task.status)),
      }
      const [statusInput, setStatusInput] = React.useState({
        label: JSON.parse(JSON.stringify(task.status)),
        value: JSON.parse(JSON.stringify(task.status)),
      })
      const handleStatusChange = (e) => {
        this.statusChange = JSON.parse(JSON.stringify(e.value))
        setStatusInput(e)
      }

      const initialPriorityValue = {
        label: JSON.parse(JSON.stringify(task.priority)),
        value: JSON.parse(JSON.stringify(task.priority)),
      }
      const [priorityInput, setPriorityInput] = React.useState({
        label: JSON.parse(JSON.stringify(task.priority)),
        value: JSON.parse(JSON.stringify(task.priority)),
      })
      const handlePriorityChange = (e) => {
        this.priorityChange = JSON.parse(JSON.stringify(e.value))
        setPriorityInput(e)
      }

      const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
      const onDeleteClose = () => setIsDeleteOpen(false)
      const cancelDeleteRef = React.useRef()

      return (
        <React.Fragment>
          <Box
            maxW='30%'
            alignContent="left"
            rounded='md'
            as='button'
            onClick={() => {
              setNameInput(initialTitleValue)
              setStatusInput(initialStatusValue)
              setPriorityInput(initialPriorityValue)
              onOpen()
            }}
            p={5}
            shadow='md'
            _hover={{
              bg: '#f7faff',
              transform: 'scale(1.02)',
            }}
            _active={{
              bg: '#ebedf0',
              transform: 'scale(0.98)',
            }}
          >
            <Stack>
              <Box align='left'>
                <Badge borderRadius='full' px={2} variant='subtle' colorScheme={getStatusBadgeColor(task.status)}>
                  {task.status}
                </Badge>
                &nbsp;&nbsp;
                <Badge borderRadius='full' px={2} variant='solid' color='white' bg={getPriorityBadgeColor(task.priority)}>
                  pri: {task.priority}
                </Badge>
              </Box>
              <Box
                align='left'
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
              >
                {initialTitleValue}
              </Box>
              <Box align='left'>
                {task.description}
              </Box>
              <Box align='left'>
                {task.tags.map((tag, index) => (
                  <React.Fragment>
                    <Tag m={0.5} size='md' key={tag} variant='subtle' >
                      <TagLabel>{tag}</TagLabel>
                    </Tag>
                  </React.Fragment>
                ))}
              </Box>
            </Stack>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={this.inputRef}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Edit Task
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={8} align='stretch'>
                  <Container>
                    <FormControl isInvalid={isNameError}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        placeholder="Name"
                        value={nameInput}
                        onChange={handleNameChange}
                        ref={this.inputRef}
                        id={`task__title-${task.id}`}
                      />
                      {!isNameError ? (
                        <FormHelperText>
                          Enter task name.
                        </FormHelperText>
                      ) : (
                        <FormErrorMessage>
                          Name cannot be empty.
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Container>
                  
                  <Container>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Textarea
                        placeholder="Description"
                        defaultValue={task.description}
                        ref={this.descriptionRef}
                        id={`task__description-${task.id}`}
                      />
                    </FormControl>
                  </Container>
                  <Container>
                    <HStack spacing='6px' flex='1' align='center'>
                      <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Select
                          value={statusInput}
                          onChange={handleStatusChange}
                          id={`task__status-${task.id}`}
                          options={[
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
                          id={`task__priority-${task.id}`}
                          options={[
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
                  <TagsInput formTitle='Tags' onTagChange={this.handleTagChange} tags={this.state.tags} />
                </VStack>

              </ModalBody>

              <ModalFooter>
                <Button colorScheme='red' onClick={() => {
                  setIsDeleteOpen(true)
                }} >Delete</Button>
                <Spacer />
                <Button colorScheme='blue' mr={3} isLoading={this.state.isLoading} onClick={() => {
                  if (this.inputRef.current && !(this.inputRef.current.value == "")) {
                    this.setState({ isLoading: true })
                    this.handleTagChange(this.tagsChange, true)
                    this.handleChange()
                    this.setState({ isLoading: false })
                    this.props.reloadTasks()
                    onClose()
                  }
                }}>
                  Save
                </Button>
                <Button variant='ghost' onClick={onClose}>
                  Cancel
                </Button>
                <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={cancelDeleteRef} onClose={onDeleteClose}>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Task
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        Are you sure? This action cannot be undone.
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelDeleteRef} onClick={onDeleteClose}>
                          Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => {
                          this.handleDestroy()
                          this.props.reloadTasks()
                          onDeleteClose()
                          onClose()
                        }} ml={3}>
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </React.Fragment>
      );
    };

    return !this.isNotRendered() && (<RenderTask task={task} />)
  }
}

export default Task

Task.propTypes = {
  task: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  filterByStatus: PropTypes.string.isRequired,
  filterByPriority: PropTypes.string.isRequired,
  filterByTags: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
}
