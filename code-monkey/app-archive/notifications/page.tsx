const NotificationsPage = () => {
  return (
    <div className="flex h-full flex-col justify-between gap-5 lg:flex-row">
      <div className="h-fit overflow-y-scroll rounded-md bg-cardPrimary p-10 shadow lg:h-[95%] lg:w-full">
        <h1 className="pb-5 pt-0 text-xl font-bold text-themeBrown">
          Notifications
        </h1>
      </div>
      <div className="no-scrollbar min-h-28 overflow-y-scroll rounded-md p-6 pb-4 lg:h-[95%] lg:min-w-[20rem]"></div>
    </div>
  );
};

export default NotificationsPage;
