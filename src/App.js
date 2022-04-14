import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  return (
    <div className="App">
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <h2>Name: {student.name}</h2>
            <p>Age: {student.age}</p>
            <p>Points: {student.points}</p>
            <p>Happiness: {student.happiness}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
