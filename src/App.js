import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './components/modal/Modal';

function App() {
  // state of show modal
  const [showModal, setShowModal] = useState(false);
  // close modal  by clickin backdrop
  const handleShowModal = (e) => {
    if (e.target.id === 'backdrop') {
      setShowModal(null);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is  the better way to set up a modal in react, using portals.
        </p>
        {showModal &&
          <Modal>
            <div onClick={handleShowModal} id="backdrop" className="backdrop">
              <div className="modal">
                <h1 className="modal-title">
                  This is the Modal!
                </h1>
                <p className="modal-content">
                    This is a modal rendered on a difgferent mount point (#modal)  from #root
                </p>
                <button onClick={() => setShowModal(false)} className="btn btn-modal-close">Close Me!</button>
              </div>
            </div>
          </Modal>  
        }
        <button onClick={() => setShowModal(!showModal)} className="btn">Show modal</button>
      </header>
    </div>
  );
}

export default App;
