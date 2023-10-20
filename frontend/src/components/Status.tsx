interface props {
    status: string;
}

const Status = ({ status }: props) => {
    return (
        <div
            className={
                'flex items-center gap-2 p-2 rounded-lg ' +
                (status === 'approved'
                    ? 'bg-custom-green-opacity'
                    : 'bg-custom-yellow-opacity')
            }
        >
            <div
                className={
                    'h-2 w-2 rounded-full ' +
                    (status === 'approved'
                        ? 'bg-custom-green'
                        : 'bg-custom-yellow')
                }
            ></div>
            <span
                className={
                    'text-xs ' +
                    (status === 'approved'
                        ? 'text-custom-green'
                        : 'text-custom-yellow')
                }
            >
                {status}
            </span>
        </div>
    );
};

export default Status;
