interface props {
    status: string;
}

const Status = ({ status }: props) => {
    return (
        <div
            className={
                'flex items-center gap-2 p-2 rounded-lg ' +
                (status === 'Approved'
                    ? 'bg-custom-green-opacity'
                    : 'bg-custom-yellow-opacity')
            }
        >
            <div
                className={
                    'h-3 w-3 rounded-full ' +
                    (status === 'Approved'
                        ? 'bg-custom-green'
                        : 'bg-custom-yellow')
                }
            ></div>
            <span>{status}</span>
        </div>
    );
};

export default Status;
