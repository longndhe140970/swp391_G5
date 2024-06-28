import { Button } from "antd";

const RemoveButton = ({ title, ...props }) => {
    return (<>
        <Button
            className="bg-red-500 w-[150px] text-white"
            {...props}
        >
            {title}
        </Button>
    </>);
}

export default RemoveButton;