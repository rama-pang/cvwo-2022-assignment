# CVWO 2022 Assignment - [Task Management App](https://arcane-sierra-42332.herokuapp.com/)

## About This Project

This project is an assignment for NUS Computing for Voluntary Welfare Organisations (CVWO) for 2022.

- Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Rama Aryasuta Pangestu
- Student ID&nbsp;&nbsp;: A0236444E
- [Final Writeup](https://github.com/rama-pang/cvwo-2022-assignment/blob/main/RamaAryasutaPangestu_A0236444E_FinalWriteup.pdf)
- [Heroku Link](https://arcane-sierra-42332.herokuapp.com/)


## Table of Contents

- [CVWO 2022 Assignment - Task Management App](#cvwo-2022-assignment---task-management-app)
  - [About This Project](#about-this-project)
  - [Table of Contents](#table-of-contents)
  - [Local Installation](#local-installation)
  - [User Manual](#user-manual)
    - [Getting Started](#getting-started)
    - [Navigation Bar](#navigation-bar)
    - [Sign Up](#sign-up)
    - [Sign In](#sign-in)
    - [Task List](#task-list)
    - [Add Task](#add-task)
    - [Filter Tasks](#filter-tasks)
    - [Edit Task](#edit-task)
    - [Delete Task](#delete-task)
  - [Contribution](#contribution)
  - [License](#license)

## Local Installation

1. You need the following prerequisites:
   - [Ruby 2.7.0](https://www.ruby-lang.org/en/)
   - [Rails 6.0.1](https://rubyonrails.org/)
   - [PostgreSQL](https://www.postgresql.org/)
   - [Bundler](https://bundler.io/)
   - [yarn](https://yarnpkg.com/)

2. Clone the repo:
   ```console
   $ git clone https://github.com/rama-pang/cvwo-2022-assignment.git
   ```

3. Installing dependencies:
   ```console
   $ bundle install
   ```
   ```console
   $ yarn
   ```

4. Setup the database:
   ```console
   $ rake db:migrate
   ```

5. Start the server:
   ```console
   $ rails s
   ```

6. Open the web application from the link `localhost:3000`

## User Manual

[Task Management App](https://arcane-sierra-42332.herokuapp.com/) is a web-based application for managing your tasks with a user authentication system.

### Getting Started
For new users, please read the "Sign Up" guide below. For existing users, please read the "Sign In" guide below.

### Navigation Bar
The navigation bar is on top of the page. If you are not signed in, there will be two buttons on the top-right corner of the page: the "Sign In" button and the "Sign Up" button, which will redirect you to the "Sign In" page and the "Sign Out" page respectively. If you are signed in, there will be a "Sign Out" button to sign out of your account and redirect you to the "Sign In" page.

### Sign Up

- You can click on the "Sign Up" button on the top-right corner of the page on the navigation bar.
- You will be prompted to enter your email address and password. Your password must have length at least 6 characters. Note that currently there is no way to recover your password.
- Once you enter your email address and password, you can click on the "Sign up" button below them. If successful, there will be a notification and you will be redirected to the "Sign In" page. Otherwise, there will be an error notification. An error could occur due to problems with your browser or if an identical email is already registered.

### Sign In

- You can click on the "Sign In" button on the top-right corner of the page on the navigation bar.
- You will be prompted to enter your email address and password. Your password must have length at least 6 characters.
- Once you enter your email address and password, you can click on the "Sign up" button below them. If successful, there will be a notification and you will be redirected to the "Task List" page. Otherwise, there will be an error notification. An error could occur due to problems with your browser or if the email address or password is incorrect.

### Task List

- This is where your task will be listed. There will be two buttons on the center of the page below the navigation bar – the "New" and "Filter" button. Below them are multiple "task cards", each detailing a task. You can click on a task card to edit or delete the task.

### Add Task
  - Below the navigation bar, there will be a button with the text "New". You can click on it to add a new task.
  - You will be prompted by a modal overlay to enter the name, description, status, and priority, and tags of the new task.  When entering the tags, you can use the "comma" or "enter" key to add the text currently written as a tag. You can use the "backspace" key to delete the previous tag.
  - Once you are done adding the task details, you can click on the "Add" button to add the task. Note that there might be a delay before the new task appears in the "Task List" page.

### Filter Tasks
  - Below the navigation bar, there will be a button with the text "Filter". You can click on it to filter the tasks.
  - You can specify the status, priority, and tags of the tasks that you want to search for. After changing the status, priority, or tags filter options, you will be displayed tasks that have the same status, priority, and have all tags in the filter tags list. When entering the tags, you can use the "comma" or "enter" key to add the text currently written as a tag. You can use the "backspace" key to delete the previous tag.

### Edit Task
  - You can click on the task card of the task that you want to edit.
  - You will be prompted by a modal overlay, where you can edit the task details. If you decided not to edit the task, you can click the "Cancel" button on the bottom-right of the modal overlay.
  - You can click on the "Save" button on the bottom-right of the modal overlay to save the changes made to the task. Note that there might be a delay before the changes to the task appear in the "Task List" page.

### Delete Task
  - You can click on the task card of the task that you want to delete.
  - You will be prompted by a modal overlay. Click on the "Delete" button on the bottom-left of the modal overlay.
  - You will be prompted with an alert dialog. If you decided not to delete the task, you can click the "Cancel" button on the alert dialog.
  - You can click on the "Delete" button on the alert dialog to delete the task. Note that there is no way to undo this action. Note that there might be a delay before the task is deleted in the "Task List" page.

## Contribution

If you would like to contribute to this project, you can fork the repo and create a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
