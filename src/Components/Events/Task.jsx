import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../Utils/Constants';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '@clerk/clerk-react';
import getUser from '../../Utils/GetUser';
import formatDateTime from '../../Utils/FormatDate';

const Task = () => {
  const { id: eventId } = useParams();
  const { userId } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [creatorId, setCreatorId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return;
        const fetchedUser = await getUser(userId);
        setCreatorId(fetchedUser._id);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchTasksAndUsers = async () => {
      try {
        const tasksResponse = await axios.get(`${SERVER_URL}/api/tasks/event/${eventId}`);
        setTasks(tasksResponse.data);

        const eventResponse = await axios.get(`${SERVER_URL}/api/orders/rgstduser/${eventId}`);
        setUsers(eventResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTasksAndUsers();
  }, [eventId]);

  const handleTaskSubmit = async (values, { resetForm }) => {
    try {
      await axios.post(`${SERVER_URL}/api/tasks`, { ...values, event: eventId });
      resetForm();
      const response = await axios.get(`${SERVER_URL}/api/tasks/event/${eventId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${SERVER_URL}/api/tasks/${taskId}`);
      const response = await axios.get(`${SERVER_URL}/api/tasks/event/${eventId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    assignee: Yup.string().required('Assignee is required'),
    deadline: Yup.string().required('Deadline is required'),
  });

  const getTaskBorderStyle = (task) => {
    if (task.completed === true) {
      return 'border-green-500 bg-green-100';
    } else {
      return 'border-gray-200 bg-white';
    }
  };

  const getTaskWarning = (task) => {
    const now = new Date();
    const deadline = new Date(task.deadline);

    if (task.completed === true) {
      return (
        <div className="flex items-center text-green-500">
          <CheckCircleIcon />
          <span className="ml-2">Completed</span>
        </div>
      );
    } else if (deadline < now) {
      return (
        <div className="flex items-center text-red-500">
          <CloseIcon />
          <span className="ml-2">Deadline Passed</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-yellow-500">
          <PendingActionsIcon />
          <span className="ml-2">Pending...</span>
        </div>
      );
    }
  };

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex flex-wrap items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left mb-8">Manage Tasks</h3>
          <button className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-2 w-full sm:w-auto text-sm sm:text-base">
            <Link to={`/events/${eventId}`}>Back to Event</Link>
          </button>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h4 className="h5-bold my-8">Create a New Task</h4>
          <Formik
            initialValues={{ title: '', description: '', assignee: '', deadline: '' }}
            validationSchema={validationSchema}
            onSubmit={handleTaskSubmit}
          >
            {({ values, handleChange, handleSubmit, touched, errors }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <TextField
                  fullWidth
                  label="Task Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#f1f5f9',
                    '& .MuiInputBase-root': { borderRadius: '20px' },
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#f1f5f9',
                    '& .MuiInputBase-root': { borderRadius: '20px' },
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="assignee-label">Assign To</InputLabel>
                  <Select
                    labelId="assignee-label"
                    name="assignee"
                    value={values.assignee}
                    onChange={handleChange}
                    error={touched.assignee && Boolean(errors.assignee)}
                    sx={{
                      borderRadius: '20px',
                      backgroundColor: '#f1f5f9',
                      '& .MuiInputBase-root': { borderRadius: '20px' },
                    }}
                  >
                    {users?.map((user) => (
                      <MenuItem
                        key={user._id}
                        value={user._id}
                        disabled={user._id === creatorId}
                      >
                        {user.firstName + ' ' + user.lastName + ' (' + user.email + ')'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Deadline"
                  name="deadline"
                  value={values.deadline}
                  onChange={handleChange}
                  error={touched.deadline && Boolean(errors.deadline)}
                  helperText={touched.deadline && errors.deadline}
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: '#f1f5f9',
                    '& .MuiInputBase-root': { borderRadius: '20px' },
                  }}
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white rounded-full px-4 py-2 w-40 text-sm sm:text-base flex items-center gap-2"
                >
                  <AddIcon />
                  Create Task
                </button>
              </form>
            )}
          </Formik>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h4 className="h4-bold">Existing Tasks</h4>
          <div className="flex flex-col gap-4">
            {tasks?.length > 0 ? (
              tasks.map((task) => {
                const { dateOnly, timeOnly } = formatDateTime(task.deadline);
                return (
                  <div
                    key={task._id}
                    className={`flex justify-between items-center p-4 border-l-4 rounded-lg ${getTaskBorderStyle(task)} shadow-md`}
                  >
                    <div>
                      <h5 className="h5-bold">{task.title}</h5>
                      <p className="text-gray-600 mb-2">{task.description}</p>
                      <p className="text-sm text-gray-500">
                        Deadline: {dateOnly} {timeOnly}
                      </p>
                      <p className="p-regular-18 text-gray-500">
                        Assigned to: {task.assignedTo.firstName + ' ' + task.assignedTo.lastName}
                      </p>

                      {getTaskWarning(task)}
                    </div>
                    <div className="flex gap-2">
                      <IconButton component={Link} to={`/tasks/${task._id}/update`} className="text-blue-600">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-600"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center p-regular-18 text-grey-600">No tasks available for this event.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Task;
