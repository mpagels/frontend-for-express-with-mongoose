import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [points, setPoints] = useState(0);
  const [happiness, setHappiness] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  function saveStudentToDatabase(event) {
    event.preventDefault();

    const body = {
      name,
      age,
      points,
      happiness,
    };

    fetch("http://localhost:3000/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      });
  }

  return (
    <div className="App">
      <form onSubmit={saveStudentToDatabase}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Gib name ein"
          required
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Gib age ein"
          required
          value={age}
          onChange={(event) => {
            setAge(Number(event.target.value));
          }}
        ></input>
        <label htmlFor="points">Points:</label>
        <input
          type="number"
          id="points"
          name="points"
          placeholder="Gib points ein"
          value={points}
          onChange={(event) => {
            setPoints(Number(event.target.value));
          }}
        ></input>
        <label htmlFor="happiness">Happiness:</label>
        <input
          type="number"
          id="happiness"
          name="happiness"
          placeholder="Gib name ein"
          value={happiness}
          onChange={(event) => {
            setHappiness(Number(event.target.value));
          }}
        ></input>
        <button>Speichern</button>
      </form>
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
