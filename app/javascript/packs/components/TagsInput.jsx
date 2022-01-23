import React from 'react'

import { 
  Textarea, 
  InputGroup, 
  InputLeftElement, 
  Container, 
  Input, 
  Stack, 
  VStack, 
  HStack, 
  Tag, 
  TagLabel, 
  TagCloseButton, 
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage, 
} from '@chakra-ui/react'

class TagsInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isTagError: '',
      inputValue: '',
      tags: this.props.tags || [],
    }

    this.handleNewTag = this.handleNewTag.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleTagDelete = this.handleTagDelete.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
    this.notDuplicate = this.notDuplicate.bind(this)
  }

  handleNewTag(tags) {
    if (this.props.onTagChange) {
      this.props.onTagChange(tags, false)
    }
  }

  handleInputChange({target: { value: inputValue }}) {
    inputValue = inputValue == ',' ? '' : inputValue
    this.setState({inputValue})
  }

  handleKeyDown(e) {
    this.setState({ isTagError: '' })
    let { key, target: {value} } = e
    let { tags } = this.state
    switch (key) {
      case 'Tab':
        if (value) {
          e.preventDefault()
        }
      case 'Enter':
      case ',':
        value = value.trim()
        if (!value) {
          this.setState({ isTagError: 'Tag cannot be empty.' })
          this.setState({inputValue: ''})
        } else if (!this.notDuplicate(tags, value)) {
          this.setState({ isTagError: 'Tag already exists.' })
          this.setState({inputValue: ''})
        } else if (value) {
          this.addTag(value)
        }
        break
      case 'Backspace':
        if (!value) {
          this.handleTagDelete(tags.length - 1)
        }
        break
    }
  }

  handleTagDelete(index, e) {
    this.deleteTag(index, () => {
      this.props.onTagChange(this.state.tags, false)
    })
  }

  deleteTag(index, callback) {
    let tags = this.state.tags.slice()

    tags.splice(index, 1)
    this.setState({ tags }, () => {
      if (callback) callback()
    })
  }

  notDuplicate(tags, newTag) {
    return (!tags.includes(newTag) || this.props.allowDuplicates);
  }

  addTag(tag) {
    if (this.notDuplicate(this.state.tags, tag)) {
      this.setState({tags: [...this.state.tags, tag], inputValue: ''}, () => {
        this.handleNewTag(this.state.tags);
      });
    }
  }

  render() {
    return (
      <FormControl isInvalid={this.state.isTagError != ''}>
        <Container key="tag-title">
          <FormLabel>{this.props.formTitle}</FormLabel>
        </Container>
        <VStack spacing={2}>
          <Container key="tag-render">
            {this.state.tags.map((tag, index) => (
              <Tag m={0.5} size='md' key={tag} variant='subtle' >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={e => this.handleTagDelete(index, e)} />
              </Tag>
            ))}
          </Container>
          <Container key="tag-input">
            <Input 
              autoFocus
              name="tagInput"
              className="tagInput"
              placeholder="Tag" 
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
              variant='outline'  
            />
            {this.state.isTagError == '' ? (
              <FormHelperText>
              Enter tag.
            </FormHelperText>
            ) : (
              <FormErrorMessage>
                {this.state.isTagError}
              </FormErrorMessage>
            )}
          </Container>
        </VStack>
      </FormControl>
    )
  }
}

export default TagsInput
