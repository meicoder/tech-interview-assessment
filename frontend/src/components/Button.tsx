interface props {
    text: string;
    disabled: boolean;
    onClickHandler: () => Promise<void>;
}
const Button = ({ text, disabled, onClickHandler }: props) => {
    console.log('disabled', disabled);

    return (
        <button
            disabled={disabled}
            className={
                'py-2 px-6  rounded-3xl shadow-lg ' +
                (text === 'Approve'
                    ? 'bg-gray-200 text-custom-blue'
                    : 'bg-red-700 text-white') +
                (disabled ? 'opacity-50 cursor-not-allowed text-white' : '')
            }
            onClick={onClickHandler}
        >
            {text}
        </button>
    );
};

export default Button;
