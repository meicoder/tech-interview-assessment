interface props {
    message: string;
}

const Error = ({ message }: props) => {
    return (
        <div className="px-2 py-4 border-red-600 border bg-red-100 rounded-xl text-red-700">
            {`Error: ${message}`}
        </div>
    );
};

export default Error;
