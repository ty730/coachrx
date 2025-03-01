interface Props {
    currDateStr: string;
    date: Date;
    handleDateChange: (date: Date) => void;
    className?: string;
}

function DateButton(props: Props) {
    return (
        <button className={`DateButton ${props.className} 
                            ${new Date(props.currDateStr).toLocaleDateString('en-US') === props.date.toLocaleDateString('en-US') ? 'CurrDay' : ''} 
                            ${new Date().toLocaleDateString('en-US') === props.date.toLocaleDateString('en-US') ? ' Today' : ''}`}
                onClick={() => props.handleDateChange(props.date)}
        >
            <div>{props.date.getDate()}</div>
        </button>
    );
}

export default DateButton;