import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LivePollResults = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);


  const navigate=useNavigate()


  const handleNavigate = () => {
    navigate('/');
  };




  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'polls'), (querySnapshot) => {
      const pollsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolls(pollsData);
    });

    

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Select a Poll</h2>

      <div className="row">
       

        <div className="col-md-12 mb-4">
          <div className="d-flex overflow-auto">
            {polls.length > 0 ? (
              polls.map((poll, index) => (
                <div
                  key={index}
                  className={`card mx-2 shadow-sm ${selectedPoll && selectedPoll.id === poll.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedPoll(poll)}
                  style={{ cursor: 'pointer', minWidth: '200px', maxWidth: '250px' }}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">{poll.title}</h5>
                    <p className="card-text text-muted">
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-100">Loading polls...</div>
            )}
          </div>
        </div>



        <div className="col-md-12">
          {selectedPoll ? (
            <div className="card shadow-sm">
              <div className="card-header bg-success text-white">
                <h3 className="h5 text-center">{selectedPoll.title}</h3>
              </div>
              <div className="card-body">
                {selectedPoll.options.map((option, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span>{option.label}</span>
                      <span>{option.votes} votes</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: `${(option.votes / selectedPoll.options.reduce((sum, opt) => sum + opt.votes, 0)) * 100 || 0}%`,
                        }}
                        aria-valuenow={(option.votes / selectedPoll.options.reduce((sum, opt) => sum + opt.votes, 0)) * 100 || 0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
             
              <p className="text-muted">Select a poll to see the results.</p>
              <br /><br /><br /><br /> 
              <button className='btn btn-info p-2' onClick={handleNavigate}>Go to dashboard</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePollResults;
