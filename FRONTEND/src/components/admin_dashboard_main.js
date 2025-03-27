function AdminDashboardMain() {
  return (
    <div className="p-5 md:p-10 md:pl-16 pb-20 bg-neutral-100 w-full text-base">
      <div className="text-4xl font-bold mb-5">HALLS BOOKING</div>
      <div>
        <a
          className="text-sky-500 hover:underline hover:cursor-pointer"
          href="/admin/dashboard/pending_requests"
        >
          Click here
        </a>{" "}
        to check the pending requests.
        <br></br>
        Following halls were assigned to you,
        <ol className="m-6 list-decimal ">
          <li>Silveria</li>
          <li>Golden Jubilee Hall</li>
          <li>Basketball Court</li>
          <li>Cricket Ground</li>
          <li>Tennis Court</li>
          <li>Student Activity Center</li>
          <li>Volleyball Court</li>
          <li>Sports Complex</li>
          <li>Gymnasium</li>
        </ol>
        <div className="font-bold mb-5">Steps to reply a request : </div>
        <ul className="ml-6 list-disc">
          <li>
            Check the calendar for the availability of the halls on specific
            dates
          </li>
          <li>Check the form submitted and Click "Approve" or "Deny"</li>
          <li>You will receive an email upon responding the form.</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboardMain;
