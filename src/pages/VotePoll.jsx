import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VotePoll = () => {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/');
  };




  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'polls'));
        const pollsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPolls(pollsData);
      } catch (e) {
        console.error('Error fetching polls: ', e);
      }
    };

    fetchPolls();
  }, []);

  const submitVote = async () => {
    if (selectedPoll && selectedOptionIndex !== null) {
      try {
        const pollRef = doc(db, 'polls', selectedPoll.id);
        const updatedOptions = [...selectedPoll.options];
        updatedOptions[selectedOptionIndex].votes += 1;

        await updateDoc(pollRef, { options: updatedOptions });

        setVoteSubmitted(true);
        setSelectedPoll(null);
        setSelectedOptionIndex(null);

        toast.success('Vote submitted!');
        navigate('/');

        console.log('Vote successfully updated!');
      } catch (e) {
        console.error('Error updating vote: ', e);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cast Your Vote</h2>

      <div className="row">
       


        <div className="col-md-12 mb-4">
          <div className="d-flex overflow-auto">
            {polls.length > 0 ? (
              polls.map((poll, index) => (
                <div
                  key={index}
                  className={`card mx-2 shadow-sm ${selectedPoll && selectedPoll.id === poll.id ? 'border-primary' : ''}`}
                  onClick={() => {
                    setSelectedPoll(poll);
                    setVoteSubmitted(false);
                  }}
                  style={{ cursor: 'pointer', minWidth: '200px', maxWidth: '250px' }}
                >
                  <div className="card-body text-center">
                    <h5 className="card-title">{poll.title}</h5>
                    <p className="card-text text-muted">
                      {poll.description || 'No description available.'}
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
              <div className="card-header bg-primary text-white text-center">
                <h3 className="h5">{selectedPoll.title}</h3>
              </div>
              <div className="card-body">
                <form>
                  {selectedPoll.options.map((option, index) => (
                    <div className="form-check mb-3" key={index}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pollOption"
                        id={`option${index}`}
                        value={index}
                        onChange={() => setSelectedOptionIndex(index)}
                      />
                      <label className="form-check-label" htmlFor={`option${index}`}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-success btn-lg w-100 mt-3"
                    onClick={submitVote}
                    disabled={selectedOptionIndex === null}
                  >
                    Submit Vote
                  </button>
                </form>
                {voteSubmitted && (
                  <div className="alert alert-success mt-4 text-center">
                    Vote submitted successfully!
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted">Select a poll to cast your vote.</p>
              <br /><br /><br /><br /> 
              <button className='btn btn-info p-2' onClick={handleNavigate}>Go to dashboard</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotePoll;
