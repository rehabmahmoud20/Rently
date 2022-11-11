const InboxContent = () => {
    return (
        <section className="px-5 sm:px-10 py-5">
            <h2 className="text-4xl font-bold text-cyan-600 w-fit mx-auto lg:mx-0">
                Inbox
            </h2>
            <div className="w-full">
                <h3 className="text-2xl text-bold mb-3  w-fit mx-auto">
                    Your inbox is empty !
                </h3>
                <img
                    className="w-fit max-w-full mx-auto"
                    src={require('../images/inbox.gif')}
                    alt="empty inbox"
                />
            </div>
        </section>
    );
};

export default InboxContent;
