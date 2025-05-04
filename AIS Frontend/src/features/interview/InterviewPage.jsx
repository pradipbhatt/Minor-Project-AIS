import React from 'react';

const InterviewPage = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Interview Page</h1>
            <p>Welcome to the Interview Page. This is a demo page for showcasing interview-related features.</p>
            <button 
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={() => alert('Button clicked!')}
            >
                Click Me
            </button>
        </div>
    );
};

export default InterviewPage;