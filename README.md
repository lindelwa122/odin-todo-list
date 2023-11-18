# Todo App

<div align='center'>

<img src='./src/images/todo-banner.png' alt='Banner'/>

<div>
    <img src='https://img.shields.io/badge/Skills Applied-Factories-blue' alt='Shield' />
    <img src='https://img.shields.io/badge/Skills Applied-Dom_Wizard-lime' alt='Shield' />
</div>

</div>

## Overview

![APP Preview](./src/images/todo-preview.png)

This is a to-do app designed to help you organize and track your daily activities. Each task is sorted into projects that you create. You can specify a due date and other properties to ensure timely completion. Easily navigate through different projects and prioritize your to-dos based on importance.

On the sidebar, you can effortlessly view completed tasks and those still pending. Additionally, check out to-dos due today and organize them by priority for a clear overview of your responsibilities.

For a live preview, click [here](https://lindelwa.github.io/odin-todo-list).

## How it Works

My project is divided into distinct modules, each responsible for a specific set of actions that collectively bring the app to life. Here's an overview of the modules:

1. **todo:** This module is in charge of creating a `todo` instance and providing all the functionalities needed to manipulate it.

2. **project:** Responsible for storing todos and offering additional functionalities for adding and removing `todo`s.

3. **displayController:** Controls the content displayed on the screen and is responsible for keeping it updated.

4. **userInterfaceAPI:** Serves as the bridge between **displayController** and **todo** and **project**, enabling seamless collaboration between different parts of the system.

I also incorporate **[dom wizard](https://github.com/lindelwa122/dom-wizard)** to facilitate DOM creation and updates. It plays a key role in managing the `currentProject`. Dom wizard is a JavaScript library that streamlines DOM manipulation without extensive implementation and includes a public store for storing variables/properties for widespread use throughout the app.

## What I Learned:

- How to use OOP design techniques like modularity, abstraction, and encapsulation to design software.
- How to use prettier and ESLint.
- How to effectively use dom wizard.
- I reinforced my knowledge of modular patterns and factory functions.

## Credits

This [project](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) is part of [The Odin Project's curriculum](https://www.theodinproject.com).

