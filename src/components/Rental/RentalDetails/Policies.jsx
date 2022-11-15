const Policies = (props) => {
    return (
        <div id="policies" className="h-auto">
            <p className="text-2xl mb-2">Policies</p>
            <p className="mb-3">{props.data.info}</p>
            <p className="font-bold mb-2">Our rules:</p>
            <ul className="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
                {props.data.rules.map((rule) => {
                    return <li key={Math.random() * 100}>{rule}</li>;
                })}
            </ul>
        </div>
    );
};

export default Policies;
