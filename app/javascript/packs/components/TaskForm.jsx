import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders'

import TagsInput from './TagsInput'

import {
  Input,
  Button,
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
  VStack,
  Spacer,
}  from "@chakra-ui/react"

import {
  Select,
} from "chakra-react-select";

class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.titleChange = ''
    this.descriptionChange = ''
    this.statusChange = ''
    this.priorityChange = ''
    this.tagsChange = []
    this.handleTagChange = this.handleTagChange.bind(this)
  }

  handleSubmit() {
    setAxiosHeaders()
    axios
      .post('/api/v1/tasks', {
        task: {
          title: this.titleChange,
          description: this.descriptionChange,
          status: this.statusChange,
          priority: this.priorityChange,
          tags: this.tagsChange
        },
      })  
      .then(response => {
        const task = response.data
        this.props.createTask(task)
        this.props.reloadTasks()
      })    
      .catch(error => {
        console.log(error)
      })
  }

  handleTagChange(newTags, b) {
    this.tagsChange = JSON.parse(JSON.stringify(newTags))
  }

  render() {
    const Renderer = () => {
      const { isOpen, onOpen, onClose } = useDisclosure('')
      const [nameInput, setNameInput] = React.useState('')
      const isNameError = nameInput == ''
      const handleNameChange = (e) => {
        this.titleChange = JSON.parse(JSON.stringify(e.target.value))
        setNameInput(e.target.value)      
      }

      const [descriptionInput, setDescriptionInput] = React.useState('')
      const handleDescriptionChange = (e) => {
        this.descriptionChange = JSON.parse(JSON.stringify(e.target.value))
        setDescriptionInput(e.target.value)
      }

      const [statusInput, setStatusInput] = React.useState({
        label: 'not-started',
        value: 'not-started',
      })
      const handleStatusChange = (e) => {
        this.statusChange = JSON.parse(JSON.stringify(e.value))
        setStatusInput(e)
      }
      
      const [priorityInput, setPriorityInput] = React.useState({
        label: 'low',
        value: 'low',
      })
      const handlePriorityChange = (e) => {
        this.priorityChange = JSON.parse(JSON.stringify(e.value))
        setPriorityInput(e)
      }

      const initialRef = React.createRef()

      return (
        <React.Fragment>
          <Button
            colorScheme="green"
            variant="ghost"
            onClick={() => {
              onOpen()          
              this.descriptionChange = ''
              this.statusChange = 'not-started'
              this.priorityChange = 'low'
              this.tagsChange = []
              this.titleChange = ''
              setNameInput('')
              setDescriptionInput('')
              setStatusInput({
                label: 'not-started',
                value: 'not-started',
              })
              setPriorityInput({
                label: 'low',
                value: 'low',
              })
            }}
            align='center'
          >
            New
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                New Task
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={8} align='stretch'>
                  <FormControl id="name" isInvalid={isNameError}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Name"
                      value={nameInput}
                      onChange={handleNameChange}
                      id={`task__title__new`}
                      ref={initialRef}
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

                  <FormControl id="desc">
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      placeholder="Description"
                      value={descriptionInput}
                      onChange={handleDescriptionChange}
                      id={`task__description__new`}
                    />
                  </FormControl>

                  <HStack spacing='6px' flex='1' align='center'>
                    <FormControl id="stat">
                      <FormLabel>Status</FormLabel>
                      <Select
                        value={statusInput}
                        onChange={handleStatusChange}
                        id={`task__status__new`}
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

                    <FormControl id="pri">
                      <FormLabel>Priority</FormLabel>
                      <Select
                        value={priorityInput}
                        onChange={handlePriorityChange}
                        id={`task__priority__new`}
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
                  <TagsInput formTitle='Tags' onTagChange={this.handleTagChange} tags={this.tagsChange} />
                </VStack>

              </ModalBody>

              <ModalFooter>
                <Spacer />
                <Button colorScheme='green' mr={3} onClick={() => {
                  if (!isNameError) {                  
                    this.handleTagChange(this.tagsChange, true)
                    this.handleSubmit()
                    this.props.reloadTasks()
                    onClose()
                  }
                }}>
                  Add
                </Button>
                <Button variant='ghost' onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </React.Fragment>
      )
    }

    return (<Renderer />) 
  }
}

export default TaskForm

TaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
}
