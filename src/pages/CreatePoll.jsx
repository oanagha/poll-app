import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreatePoll = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [pollCreated, setPollCreated] = useState(false);


  const nav=useNavigate()

  const handleNavigate = () => {
    nav('/');
  };




  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const createPoll = async () => {
    try {
      const docRef = await addDoc(collection(db, 'polls'), {
        title: title,
        options: options.map(option => ({ label: option, votes: 0 })),
        createdAt: Timestamp.now()
      });
      setPollCreated(true);
      toast.success('Poll created')
      nav('/')
      console.log("Poll created with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Poll</h2>
      <div className="mb-3">
        <label htmlFor="pollTitle" className="form-label">Poll Title</label>
        <input
          type="text"
          id="pollTitle"
          className="form-control"
          placeholder="Enter poll title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        {options.map((option, index) => (
          <div className="mb-3" key={index}>
            <label htmlFor={`option${index}`} className="form-label">Option {index + 1}</label>
            <input
              type="text"
              id={`option${index}`}
              className="form-control"
              placeholder={`Enter option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
            />
          </div>
        ))}
        <button className="btn btn-secondary mb-3" onClick={addOption}>Add Option</button>
      </div>
      <button className="btn btn-primary" onClick={createPoll}>Create Poll</button>
      {pollCreated && <div className="alert alert-success mt-3">Poll Created!</div>}


      <br /><br /><br /><br /> 
      <button className='btn btn-info p-2' onClick={handleNavigate}>Go to dashboard</button>
    </div>
  );
};

export default CreatePoll;
