import React from 'react';

import Routes from './Routes'
import Navbar from '../components/Navbar'
import AuthProvider from "./AuthProvider";

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <div style={{display:'flex'}}>
                <Navbar/>
                <div className="container">
                    <Routes/>
                </div>
                </div>
            </AuthProvider>
        )
    }
}
export default App;
