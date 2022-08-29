import React, { useEffect, useState } from 'react';
import './App.css';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import TableComponent from './components/Table';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <TableComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;
