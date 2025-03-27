function home_page_center_content() {
  var textShadow = {
    textShadow: "5px 5px 10px rgba(80, 80, 80, 0.75)",
  };

  return (
    <div className="text-xs sm:text-base">
      <div className="flex flex-wrap items-center p-2 sm:p-10">
        <div className="sm:w-6/12 w-full px-5 sm:px-16 mt-5 sm:mt-0">
          <div
            className="text-3xl sm:text-5xl font-bold text-gray-700"
            style={textShadow}
          >
            RESOURCE BOOKING
          </div>
          <div className=" text-base sm:text-xl font-semibold text-gray-800 mt-5 sm:mt-8">
            AVAILABLE RESOURCES FOR BOOKING
          </div>
          <div className="mt-5">
            <a
              className="text-blue-600 hover:underline hover:cursor-pointer"
              href="/calendar"
            >
              Click here
            </a>
            <span> to check availability of resources</span>
          </div>
          <ol className="list-decimal ml-5 mt-5">
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
        </div>
        <div className="sm:w-6/12 w-full p-5 sm:p-10">
          <div className="bg-sky-200 p-5 sm:p-10 border border-4 border-black">
            <div className="text-gray-800 font-bold text-xl">
              STEPS FOR BOOKING
            </div>
            <ul className="list-disc ml-5 mt-5">
              <li>
                <a
                  className="text-blue-600 hover:underline hover:cursor-pointer"
                  href="/login"
                >
                  Click here
                </a>{" "}
                to login
              </li>
              <li>
                Check the calendar for availability of the resources on specific
                dates
              </li>
              <li>Click "Book Hall" and fill in the form and submit</li>
              <li>
                You will recive a email upon submitting this form and email after request is approved.
              </li>
              <li>
                Meanwhile the status of your record can be tracked from your
                dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default home_page_center_content;
