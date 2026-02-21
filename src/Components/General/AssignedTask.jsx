import { useState, useEffect } from 'react';
import apiService from '../../utils/apiService';
import { SERVER_URL } from '../../Utils/Constants';
import { Link, useParams } from 'react-router-dom';
import formatDateTime from '../../Utils/FormatDate';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const AssignedTask = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksResponse = await apiService.get(`/api/tasks/user/${id}`);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTasks();
  }, [id]);

  const handleTaskCompletionChange = (task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDialogClose = (confirmed) => {
    if (confirmed && selectedTask) {
      // Update task status to completed
      const updatedTasks = tasks.map((task) =>
        task._id === selectedTask._id ? { ...task, completed: true } : task
      );
      setTasks(updatedTasks);

      axios
        .put(`${SERVER_URL}/api/tasks/${selectedTask._id}`, { completed: true })
        .then((response) => {
        })
        .catch((error) => {
          console.error('Error updating task:', error);
        });
    }

    setDialogOpen(false);
    setSelectedTask(null);
  };

  const getTaskBorderStyle = (task) => {
    const now = new Date();
    const deadline = new Date(task.deadline);

    if (task.completed === true) {
      return 'border-green-500';
    } else if (deadline < now) {
      return 'border-red-500';
    } else if (deadline - now < 24 * 60 * 60 * 1000) {
      return 'border-yellow-500';
    }
    return 'border-gray-200';
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
    } else if (deadline - now < 24 * 60 * 60 * 1000) {
      return (
        <div className="flex items-center text-yellow-500">
          <WarningIcon />
          <span className="ml-2">Deadline Approaching</span>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="wrapper py-8 min-h-screen">
      <div className="bg-white p-5 rounded-lg shadow-lg h-full">
        <h1 className="h3-bold text-center mb-8">Assigned Tasks</h1>
        <ul className="flex flex-col gap-8">
          {tasks.length === 0 && (
            <p className="text-center text-gray-500 p-40">No tasks assigned</p>
          )}
          {tasks.map((task) => {
            const { dateOnly, timeOnly } = formatDateTime(task.deadline);
            return (
              <li
                key={task._id}
                className={`p-4 rounded-lg shadow-md border-4 ${getTaskBorderStyle(task)} mb-4`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="h4-bold flex items-center">
                      {task.title} 
                      <Link to={`/events/${task.event._id}`} className="text-blue-600 ml-2 text-lg">
                        ({task.event.title})
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-2">{task.description}</p>
                    <p className="text-sm text-gray-500">
                      Deadline: {dateOnly} {timeOnly}
                    </p>
                    {getTaskWarning(task)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={task.completed === true}
                      onChange={() => handleTaskCompletionChange(task)}
                    />
                    <label htmlFor={`task-checkbox-${task._id}`} className="text-gray-700">
                      Mark task as completed
                    </label>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
      >
        <DialogTitle>Confirm Task Completion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark the task "{selectedTask?.title}" as completed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default AssignedTask;
