const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>The Dashboard</h1>
      <button onClick={() => (window.location.href = "/login")}>Log Out</button>
    </div>
  );
};

export default Dashboard;
