import React from 'react';


/* Logic */

const Context = React.createContext({});

export function Accordion({ children }) {
    const [selected, setSelected] = React.useState();

    const toggleItem = React.useCallback(
        (id) => () => {
            setSelected((prevState) => (prevState !== id ? id : ''));
        },
        [],
    );
    return (
        <Context.Provider value={{ selected, toggleItem }}>
            {children}
        </Context.Provider>
    );
}

//custom hook to consume all accordion values
const useAccordion = () => React.useContext(Context);

const style = {
    item: `block focus:outline-none text-white border-b my-2 p-3`,
    panel: `overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-gray-600`,
};

export function AccordionItem({ toggle, children }) {
    const { selected, toggleItem } = useAccordion();
    return (
        <div role="button" onClick={toggleItem(toggle)} className={style.item}>
            {children}
            <div className="flex justify-center py-4">
                {selected === toggle ? <AngleUpIcon /> : <AngleDownIcon />}
            </div>
        </div>
    );
}

export function AccordionPanel({ children, id }) {
    const { selected } = useAccordion();
    const ref = React.useRef();
    const inlineStyle =
        selected === id ? { height: ref.current?.scrollHeight } : { height: 0 };

    return (
        <div ref={ref} id={id} className={style.panel} style={inlineStyle}>
            {children}
        </div>
    );
}

const AngleUpIcon = () => (
    <button className='flex flex-wrap justify-center items-center gap-2 bg-transparent border-0 cursor-pointer'>
        <div className='font-monts font-bold text-lg'>
            Core Features
        </div>
        <svg
            fill="white"
            strokeWidth="1"
            viewBox="0 0 320 512"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8"
        >
            <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
        </svg>
    </button>
);

const AngleDownIcon = () => (
    <button className='flex flex-wrap justify-center items-center gap-2 bg-transparent border-0 cursor-pointer'>
        <div className='font-monts font-bold text-lg'>
            More Features
        </div>
        <svg
            stroke="currentColor"
            fill="white"
            strokeWidth="0"
            viewBox="0 0 320 512"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 h-8"
        >
            <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
        </svg>
    </button>
);