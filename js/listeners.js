const LISTENERS = {};

LISTENERS.logout = function (e) {
  localStorage.removeItem('USER');

  window.location.pathname = createRoute('index.html');
};

LISTENERS.login = function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const errors = new Errors();

  errors.checkIfLength(name.value, 4, 'The name must be at least 4 chars long');
  errors.checkIfEmail(email.value);
  errors.checkIfLength(
    password.value,
    4,
    'The password must be at least 4 chars long'
  );

  if (errors.values.length) {
    let output = document.querySelector('.errors');
    //outputs the errors into the dom
    errors.outputErrors(output);
    //clears the values array and sets the output to an empty string
    errors.clearErrors(output);
  } else {
    USER.name = name.value;
    USER.email = email.value;
    USER.password = password.value;

    localStorage.setItem('USER', JSON.stringify(USER));

    window.location.pathname = createRoute('pages/tasks.html');
  }
};

LISTENERS.addTask = function (e) {
  e.preventDefault();

  const taskName = document.getElementById('task-name');
  const taskDuration = document.getElementById('task-duration');
  const taskDescription = document.getElementById('task-description');
  const taskDate = document.getElementById('task-date');
  const errors = new Errors();

  errors.checkIfLength(taskName.value, 4, 'Name must have at least 4 chars');
  errors.checkIfDuration(
    taskDuration.value,
    'Duration must be expressed as 12h34m || 34m || 2h. h < 24 && m < 60'
  );
  errors.checkIfLength(
    taskDescription.value,
    4,
    'Description must have at least 4 chars'
  );
  errors.checkIfEmpty(taskDate.value, 'You must select a date');

  if (errors.values.length) {
    let output = document.querySelector('.errors');
    //outputs the errors into the dom
    errors.outputErrors(output);
    //clears the values array and sets the output to an empty string
    errors.clearErrors(output);
  } else {
    let adjustedDuration = taskDuration.value;

    if (errors.checkIfMinutes(taskDuration.value)) {
      adjustedDuration = `0h${taskDuration.value}`;
    }

    if (errors.checkIfHours(taskDuration.value)) {
      adjustedDuration = `${taskDuration.value}0m`;
    }


    //computes the difficulty based on the duration
    const difficulty = Task.computeDifficulty(taskDate.value, adjustedDuration);

    const newTask = new Task(
      taskName.value,
      adjustedDuration,
      taskDescription.value,
      difficulty,
      taskDate.value,
      USER.email
    );
    //saves the task to the data array in local object and returns true if saving succeds
    const success = Task.save(newTask);

    taskName.value = '';
    taskDuration.value = '';
    taskDescription.value = '';
    taskDate.value = '';

    if (success) {
      location.reload();
    }
  }
};

LISTENERS.updateTask = function (e) {
  e.preventDefault();

  const updatedName = document.getElementById('update-name');
  const updatedDuration = document.getElementById('update-duration');
  const updatedDate = document.getElementById('update-date');
  const updatedId = document.getElementById('update-id');
  const updatedDescription = document.getElementById('update-description');
  const errors = new Errors();

  errors.checkIfLength(updatedName.value, 4, 'Name must have at least 4 chars');
  errors.checkIfDuration(
    updatedDuration.value,
    'Duration must be expressed as 12h34m || 34m || 2h'
  );
  errors.checkIfLength(
    updatedDescription.value,
    4,
    'Description must have at least 4 chars'
  );
  errors.checkIfEmpty(updatedDate.value, 'You must select a date');

  if (errors.values.length) {
    e.target.parentElement.parentElement.innerText =
      "THE DATA PROVIDED IS INVALID \n Don't forget the description";
    setTimeout(() => {
      errors.values = [];
      location.reload();
    }, 1500);
  } else {
    let adjustedDuration = updatedDuration.value;

    if (errors.checkIfMinutes(updatedDuration.value)) {
      adjustedDuration = `0h${updatedDuration.value}`;
    }

    if (errors.checkIfHours(updatedDuration.value)) {
      adjustedDuration = `${updatedDuration.value}0m`;
    }

    //computes the difficulty based on the duration
    const difficulty = Task.computeDifficulty(
      updatedDate.value,
      adjustedDuration
    );

    Task.updateTask({
      name: updatedName.value,
      duration: adjustedDuration,
      difficulty,
      date: updatedDate.value,
      id: updatedId.value,
      description: updatedDescription.value,
      belongsTo: USER.email,
    });
    location.reload();
  }
};
