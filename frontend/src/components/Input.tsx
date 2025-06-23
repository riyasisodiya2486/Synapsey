
interface inputProps{
    placeholder: string;
    reference ?: any;
}

export function Input({placeholder, reference}: inputProps ){
    return <div>
        <input ref={reference} placeholder={placeholder} type={'text'} className="px-4 py-2 text-black rounded-2xl bg-transparent border border-gray-200  w-full  " />
    </div>
}