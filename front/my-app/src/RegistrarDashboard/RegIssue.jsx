import "../pages/styles/Dashboard.css";

function RegIssue() {
  return (
    <div className="issues-container">
      <h2>Reported Issues</h2>
      <div className="card-grid">
        {/* Dynamic placeholders */}
        <div className="card">
          <h3>Issue #1</h3>
          <p>Details from lecturer dashboard...</p>
          <span className="status pending">Pending</span>
        </div>
        <div className="card">
          <h3>Issue #2</h3>
          <p>Details from lecturer dashboard...</p>
          <span className="status resolved">Resolved</span>
        </div>
      </div>
    </div>
  );
}

export default RegIssue;
