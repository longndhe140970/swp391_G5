import { Select } from "antd";

const SelectInput = ({label, placeholder, defaultValue, options, onChange,...props}) => {
    return (<>
        <div className="w-[100%]">
            <p className="w-[100%] mb-[5px]">{label}</p>
            <Select
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                options={options}
            />
        </div>
    </>);
}

export default SelectInput;