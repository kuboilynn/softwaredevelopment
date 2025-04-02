import DashboardStudent from "./DashboardStudent";
import './styles/student.css';
import Input from "../UI/input";
import Select from "../UI/select";
import Button from "../UI/Button";
import { useState } from "react";


function FileIssue() {
  const [data, setData] = useState({
    courseUnit: "",
    lecturer: "",
    issue: "",
    timeFiled: new Date().toLocaleString(),
    resolved: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

 
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!data.courseUnit.trim()) newErrors.courseUnit = "*field required";
    if (!data.lecturer.trim()) newErrors.lecturer = "*field required";
    if (!data.issue.trim()) newErrors.issue = "*field required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

   
    try {
      const response = await fetch("https://your-backend-api-url.com/submit-issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message||"Issue submitted successfully.");
        setErrorMessage(""); 
      } else {
        const responseData = await response.json();
        setErrorMessage(responseData.message || "An error occurred while submitting your issue.");
        setSuccessMessage(""); 
      }
    } catch (error) {
      setErrorMessage("There was an error submitting your issue.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <DashboardStudent />
      <form className="content-file" onSubmit={handleSubmit}>
        <div>
          <label>
            Time of study
            <Select>
              <option>Day</option>
              <option>Evening</option>
            </Select>
          </label>
        </div>
        <br />

        <div>
          <label>Course Unit</label>
          <Input
            type="text"
            name="courseUnit"
            value={data.courseUnit}
            onChange={handleChange}
            placeholder="Enter course Unit"
          />
          {errors.courseUnit && <p style={{ color: "red", fontSize: 10 }}>{errors.courseUnit}</p>}
        </div>

        <div>
          <label>Lecturer</label>
          <Input
            type="email"
            name="lecturer"
            value={data.lecturer}
            onChange={handleChange}
            placeholder="Enter Lecturer email"
          />
          {errors.lecturer && <p style={{ color: "red", fontSize: 10 }}>{errors.lecturer}</p>}
        </div>
        <br />
        <div>
          <input
            type="text"
            name="issue"
            id="textInput"
            className="issuebox"
            placeholder="Enter issue"
            value={data.issue}
            onChange={handleChange}
          />
          {errors.issue && <p style={{ color: "red", fontSize: 10 }}>{errors.issue}</p>}
        </div>

        <Button type="submit">Submit</Button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default FileIssue;
