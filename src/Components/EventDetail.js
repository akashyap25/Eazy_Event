import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jsonwebtoken/decode';
import Modal from 'react-modal';
import dotenv from 'dotenv';
dotenv.config();

const EventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const [category, setCategory] = useState(null);
  const [userId, setUserId] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [transactionId, setTransactionId] = useState("abc123");
  const [organizer, setOrganizer] = useState(false);
  const { eventId } = useParams();
  const [cookies] = useCookies(["jwt"]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [percentage, setPercentage] = useState(0);
  const HOST = process.env.HOST;

  useEffect(() => {
    if (cookies.jwt) {
      const decoded = jwt_decode(cookies.jwt);
      setUserId(decoded.id);
    }
  }, [cookies.jwt]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${HOST}/events/${eventId}`);
        setEvent(response.data.event[0]);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`${HOST}/categories/${event.categoryId}`);
        setCategory(response.data.category[0].name);
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    }
    if (event != null) {
      fetchCategoryDetails();
    }
  }, [event]);

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const response = await axios.get(`${HOST}/eventRegistrations/${eventId}/${userId}`);
        if (response.data != null) {
          setRegistrationStatus(true);
        }
      } catch (error) {
        console.error('Error checking registration status:', error);
      }
    };

    if (userId && eventId) {
      checkRegistrationStatus();
    }
  }, [eventId, userId]);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await axios.get(`${HOST}/eventRegistrations/${eventId}`);
        setRegisteredUsers(response.data.eventRegistrations);
      } catch (error) {
        console.error('Error fetching registered users:', error);
      }
    }
    fetchRegisteredUsers();
  }, [eventId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsPromises = registeredUsers.map(user => axios.get(`${HOST}/${user.userId}`));

        const userDetailsResponses = await Promise.all(userDetailsPromises);
        const userDetails = userDetailsResponses.map(response => response.data.user);
        setUserDetails(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (registeredUsers.length > 0) {
      fetchUserDetails();
    }
  }, [registeredUsers]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${HOST}/events/${eventId}/tasks`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (eventId) {
      fetchTasks();
    }
  }, [eventId]);

  useEffect(() => {
    if (event != null && userId !== null && event.organizerId !== null && userId === event.organizerId) {
      setOrganizer(true);
    } else {
      setOrganizer(false);
    }
  }, [event, userId]);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(`${HOST}/eventRegistrations`, {
        eventId: eventId,
        userId: userId,
        transactionId: transactionId,
      }, {
        headers: {
          'Authorization': `Bearer ${cookies.jwt}` // Assuming jwt is the cookie containing the token
        }
      });
      if (response.data.created) {
        setRegistrationStatus(true);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handleEditEvent = () => {
    // Implement logic for editing the event
    console.log("Edit Event clicked");
  };

  const handleDeleteEvent = () => {
    // Implement logic for deleting the event
    console.log("Delete Event clicked");
  };

  const handleShowRegisteredUsers = () => {
    setIsModalOpen(true);
  };

  const handleAssignTask = async (taskId, userId) => {
    try {
      await axios.put(`${HOST}/events/tasks/${taskId}`, { userId }, {
        headers: {
          'Authorization': `Bearer ${cookies.jwt}` // Assuming jwt is the cookie containing the token
        }
      });
      // Update the task list after assigning the task
      const updatedTasks = tasks.map(task => task.id === taskId ? { ...task, userId } : task);
      setTasks(updatedTasks);

      // Show notification
      const assignedUser = userDetails.find(user => user.id === userId);
      if (assignedUser) {
        showNotification('Task Assigned', `You have been assigned a task "${selectedTask.title}".`);
      }
    } catch (error) {
      console.error('Error assigning task:', error);
    }
  };

  const handleAddNewTask = async () => {
    try {
      const response = await axios.post(`${HOST}/events/tasks`, {
        title: newTaskTitle,
        description: newTaskDescription,
        userId: null,
        eventId: eventId
      },
       {
        headers: {
          'Authorization': `Bearer ${cookies.jwt}` // Assuming jwt is the cookie containing the token
        }
      });
      if (response.data) {
        const newTask = response.data.task;
        setTasks([...tasks, newTask]); 
        setNewTaskTitle('');
        setNewTaskDescription('');
        setIsNewTaskModalOpen(false);
      }
   
    } catch (error) {
      console.error('Error adding new task:', error);
    }
  };

  useEffect(() => {
    // Calculate percentage completion
    const completedTasksCount = tasks.filter(task => task.userId !== null).length;
    const tasksCount = tasks.length;
    const calculatedPercentage = tasksCount > 0 ? (completedTasksCount / tasksCount) * 100 : 0;
    const roundedPercentage = calculatedPercentage.toFixed(2);
  setPercentage(parseFloat(roundedPercentage));
  }, [tasks]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-wrap">
        {event && (
          <div className="w-full lg:w-1/3">
            <img src={event.imageUrl} alt={event.title} className="rounded-lg mx-auto" />
          </div>
        )}
        <div className="w-full lg:w-2/3 lg:pl-8 mt-8 lg:mt-0">
          {event ? (
            <div>
              <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
              <div className="mb-6">
                <p className="text-xl mb-2"><strong>Description:</strong> {event.description}</p>
                <p className="text-xl mb-2"><strong>Location:</strong> {event.location}</p>
                <p className="text-xl mb-2"><strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}</p>
                <p className="text-xl mb-2"><strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}</p>
                <p className="text-xl mb-2"><strong>Price:</strong> {event.price}</p>
                <p className="text-xl mb-2"><strong>URL:</strong> <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></p>
                <p className="text-xl mb-2"><strong>Category:</strong> {category}</p>
              </div>
              {organizer ? (
                <>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <button onClick={handleEditEvent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit Event
                    </button>
                    <button onClick={handleDeleteEvent} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                    <button onClick={handleShowRegisteredUsers} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      Show Registered Users
                    </button>
                    <button onClick={() => setIsNewTaskModalOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Add New Task
                    </button>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Tasks</h3>
                    <div className="mb-4">
                      <div className="bg-gray-200 w-full h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <p className="text-sm mt-1">{`${percentage}% Completed`}</p>
                    </div>
                    <ul className="list-disc pl-5">
                      {tasks.map(task => (
                        <li key={task.id} className={`mb-2 ${task.userId ? 'text-green-500' : 'text-red-500'}`}>
                          <span className="font-semibold cursor-pointer" onClick={() => setSelectedTask(task)}>
                            {task.title}
                          </span>
                          <p className="text-sm">{task.description}</p>
                          {task.userId && userDetails.find(user => user.id === task.userId) && (
                            <span> - Assigned to: {userDetails.find(user => user.id === task.userId).firstName}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                registrationStatus ? (
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Registered
                  </button>
                ) : (
                  <button onClick={handleRegistration} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                  </button>
                )
              )}
            </div>
          ) : (
            <p className="text-center text-xl">Loading event details...</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Registered Users"
        className="modal bg-white p-6 rounded-lg"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
        <ul className="list-disc pl-5">
          {userDetails.map(user => (
            <li key={user.id} className="mb-2">
              <span className="font-semibold">{user.firstName}</span> - {user.email}
            </li>
          ))}
        </ul>
        <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Close
        </button>
      </Modal>
      <Modal
        isOpen={!!selectedTask}
        onRequestClose={() => setSelectedTask(null)}
        contentLabel="Assign Task"
        className="modal bg-white p-6 rounded-lg"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Assign Task: {selectedTask?.title}</h2>
        <p className="text-sm mb-4">{selectedTask?.description}</p>
        <ul className="list-disc pl-5">
          {userDetails.map(user => (
            <li key={user.id} className="mb-2">
              <span className="font-semibold cursor-pointer" onClick={() => handleAssignTask(selectedTask.id, user.id)}>
                {user.firstName} - {user.email}
              </span>
            </li>
          ))}
        </ul>
        <button onClick={() => setSelectedTask(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Close
        </button>
      </Modal>
      <Modal
        isOpen={isNewTaskModalOpen}
        onRequestClose={() => setIsNewTaskModalOpen(false)}
        contentLabel="Add New Task"
        className="modal bg-white p-6 rounded-lg"
        overlayClassName="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-2 mb-4 border rounded"
        />
        <button onClick={handleAddNewTask} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Task
        </button>
        <button onClick={() => setIsNewTaskModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default EventDetailPage;
