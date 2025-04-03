import { useEffect } from "react";
import DashboardStudent from "./DashboardStudent";
import './styles/student.css';
import Input from "../UI/input";
import Select from "../UI/select";
import Button from "../UI/Button";
import { useState } from "react";
import { domain } from "../utils/domain";
import useApiRequest from "../utils/useApiRequest";
import { getFromLocalStorage } from "../utils/EncryptDecrypt";


function FileIssue() {
  const { postRequest, loading } = useApiRequest()
  const [savedData, setSavedData] = useState(null)
  const [data, setData] = useState({
    course_unit: "",
    lecturer: "",
    description: "",
    file: null,
    status: "pending",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSavedData(getFromLocalStorage("authInfo").user)
  }, [])


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!data.course_unit.trim()) newErrors.course_unit = "*field required";
    if (!data.lecturer.trim()) newErrors.lecturer = "*field required";
    if (!data.description.trim()) newErrors.description = "*field required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("course_unit", data.course_unit);
      formData.append("lecturer", data.lecturer);
      formData.append("description", data.description);
      formData.append("status", data.status);
      if (data.file) {
        formData.append("file", data.file);
      }
      if (savedData) {
        formData.append("student_id", savedData.user.id)
      }

      let headers = {};
      if (savedData) {
        headers.Authorization = `Token ${savedData.accessToken}`;
      }

      const req = await postRequest(`${domain}/submissions`, formData, true)

      console.log(req);

      if (req.status === 201) {
        setSuccessMessage(`Complaint Id: ${req.body.id} submitted successfully` || "Issue submitted successfully.");
        setErrorMessage("");
        setData({
          course_unit: "",
          lecturer: "",
          description: "",
          file: null,
          status: "pending",
        })
      } else if (req.status === 400) {
        setErrorMessage(req.details.error || "An error occurred while submitting your issue.");
        setSuccessMessage("");
      } else if (req.status === 500) {
        setErrorMessage("Internal server error. Please try again later.", "error");
      } else {
        setErrorMessage("An unexpected error occurred.", "error");
      }
    } catch (error) {
      setErrorMessage("There was an error submitting your issue.");
      setSuccessMessage("");
      console.error(error);
    }
  };

  return (
    <div>

      <DashboardStudent />

      <form className="content-file" onSubmit={handleSubmit} encType="multipart/form-data">
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div style={{ width: "100%" }}>
          <label>
            Time of study
            <Select>
              <option>Day</option>
              <option>Evening</option>
            </Select>
          </label>
        </div>

        <div style={{ width: "100%" }}>
          <label>Course Unit</label>
          <Input
            type="text"
            name="course_unit"
            value={data.course_unit}
            onChange={handleChange}
            placeholder="Enter course Unit"
          />
          {errors.course_unit && <p style={{ color: "red", fontSize: 10 }}>{errors.course_unit}</p>}
        </div>

        <div style={{ width: "100%" }}>
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
        <div style={{ width: "100%" }}>
          <label>Provide a description ...</label>
          <textarea
            type="text"
            name="description"
            id="textInput"
            className="issuebox"
            placeholder="Enter description ..."
            value={data.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <p style={{ color: "red", fontSize: 10 }}>{errors.description}</p>}
        </div>
        <div style={{ width: "100%" }}>
          <label>Attach a file (optional)</label>
          <input
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleChange}
            style={{ marginBottom: "15px" }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Button type="submit">Submit</Button>
        </div>

      </form>
    </div>
  );
}

export default FileIssue;
