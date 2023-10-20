interface props {
    text: string;
    disabled: boolean;
    onClickHandler: () => Promise<void>;
}
const Button = ({ text, disabled, onClickHandler }: props) => {
    return (
        <button
            disabled={disabled}
            className={
                'py-2 px-6 text-white rounded-3xl shadow-lg ' +
                (text === 'Approve'
                    ? 'bg-gray-200 text-custom-blue'
                    : 'bg-red-700') +
                (disabled ? 'opacity-50 cursor-not-allowed' : '')
            }
            onClick={onClickHandler}
        >
            {text}
        </button>
    );
};

export default Button;
