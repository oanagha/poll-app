import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex flex-column">



      <header className="bg-primary text-white text-center py-4">
        <h1 className="display-4 font-weight-bold">Polling App</h1>
        <p className="lead">Create polls, vote on them, and view live results in real-time!</p>
      </header>



      <section className="container text-center my-5">
        <h2 className="display-5 text-primary mb-4">App Features</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Create Poll</h5>
                <p className="card-text">
                  Design your own polls with custom questions and options. 
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/create')}
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Vote on Polls</h5>
                <p className="card-text">
                  Participate in polls and cast your vote on your favorite options.
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate('/poll')}
                >
                  Vote Now
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Live Results</h5>
                <p className="card-text">
                  View real-time results as users vote and contribute to the polls.
                </p>
                <button
                  className="btn btn-info"
                  onClick={() => navigate('/result')}
                >
                  See Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p className="mb-0">© 2025 Polling App. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
