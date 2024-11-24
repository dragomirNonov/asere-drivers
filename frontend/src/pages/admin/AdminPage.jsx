const AdminPage = () => {
  return (
    <div>
      <DynamicBackgroundDiv backgroundImage={truckImage}>
        <UiNavbar />
        <UserInfo />
        <Routes>
          <Route path="students" element={<Students />} />
          <Route path="appointments" element={<Appointments />} />
        </Routes>
      </DynamicBackgroundDiv>
    </div>
  );
};

export default AdminPage;
