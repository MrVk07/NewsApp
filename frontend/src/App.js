import "./App.css";
import NavBar from "./components/Navbar";
import News from "./components/News";
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 5
  // const apiKey = process.env.REACT_APP_NEWS_API
  // const [progress, setprogress] = useState(0)
  return (
    <div>
      <Router>
        <NavBar />
        {/* <LoadingBar
          color='#f11946'
          progress={progress}
        /> */}
        <Routes>
          <Route exact path="/" element={<News key="generals" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/health" element={<News key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App