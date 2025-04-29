import React, { useState, useEffect } from 'react';
import { firestore } from './firebase-config';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'tasks'), snapshot => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });

    return () => unsubscribe();
  }, []);

 
  const addTask = async () => {
    if (newTaskName) {
      await addDoc(collection(firestore, 'tasks'), {
        name: newTaskName,
        status: 'not-started', 
      });
      setNewTaskName('');
    }
  };

  const deleteTask = async (taskId) => {
    await deleteDoc(doc(firestore, 'tasks', taskId));
  };


  const editTask = async () => {
    if (editingTaskName) {
      await updateDoc(doc(firestore, 'tasks', editingTaskId), {
        name: editingTaskName,
      });
      setEditingTaskId(null);
      setEditingTaskName('');
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
  };


  const taskCounts = {
    completed: tasks.filter(task => task.status === 'completed').length,
    ongoing: tasks.filter(task => task.status === 'ongoing').length,
    notStarted: tasks.filter(task => task.status === 'not-started').length,
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#333', color: 'white' }}>
        <div>Task Management</div>
        <div>
          <span>Completed: {taskCounts.completed}</span> | 
          <span> Ongoing: {taskCounts.ongoing}</span> |
          <span> Not Started: {taskCounts.notStarted}</span>
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        {}
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>

        {}
        <h2>Tasks</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['not-started', 'ongoing', 'completed'].map(status => (
            <div key={status} style={{ width: '200px', border: '1px solid black', padding: '10px' }}>
              <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
              <ul
                onMouseOver={() => console.log(`Hovering over ${status} tasks`)}
              >
                {tasks.filter(task => task.status === status).map((task) => (
                  <li key={task.id}>
                    {editingTaskId === task.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingTaskName}
                          onChange={(e) => setEditingTaskName(e.target.value)}
                        />
                        <button onClick={editTask}>Save</button>
                      </div>
                    ) : (
                      <span>
                        {task.name}
                        <button onClick={() => handleEditClick(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskApp;
